"""
GPU Accelerated Modal Function Example

This demonstrates how to use GPU acceleration in Modal.
Run with: modal run modal_functions/examples/gpu_example.py
"""

import modal

# Create stub
stub = modal.Stub("machups-gpu-example")

# Define container image with PyTorch and dependencies
image = modal.Image.debian_slim().pip_install(
    "torch>=2.0.0",
    "torchvision>=0.15.0",
    "pillow>=10.0.0"
)


@stub.function(
    image=image,
    gpu="T4",  # Use NVIDIA T4 GPU (cheapest option)
    timeout=300  # 5 minute timeout
)
def matrix_multiply_gpu(size: int = 1000):
    """Perform matrix multiplication on GPU"""
    import torch

    # Create random matrices
    a = torch.rand(size, size, device="cuda")
    b = torch.rand(size, size, device="cuda")

    # Multiply on GPU
    c = torch.matmul(a, b)

    return {
        "size": size,
        "device": str(c.device),
        "result_sum": float(c.sum()),
        "gpu_available": torch.cuda.is_available(),
        "gpu_name": torch.cuda.get_device_name(0) if torch.cuda.is_available() else None
    }


@stub.function(
    image=image,
    cpu=2.0,  # CPU only (no GPU)
    memory=4096  # 4GB RAM
)
def matrix_multiply_cpu(size: int = 1000):
    """Perform matrix multiplication on CPU"""
    import torch

    # Create random matrices on CPU
    a = torch.rand(size, size)
    b = torch.rand(size, size)

    # Multiply on CPU
    c = torch.matmul(a, b)

    return {
        "size": size,
        "device": str(c.device),
        "result_sum": float(c.sum()),
        "gpu_available": torch.cuda.is_available()
    }


@stub.local_entrypoint()
def main():
    """Compare GPU vs CPU performance"""
    import time

    size = 2000

    # GPU computation
    print(f"Running {size}x{size} matrix multiplication on GPU...")
    start = time.time()
    gpu_result = matrix_multiply_gpu.remote(size)
    gpu_time = time.time() - start
    print(f"GPU Result: {gpu_result}")
    print(f"GPU Time: {gpu_time:.3f}s")

    # CPU computation
    print(f"\nRunning {size}x{size} matrix multiplication on CPU...")
    start = time.time()
    cpu_result = matrix_multiply_cpu.remote(size)
    cpu_time = time.time() - start
    print(f"CPU Result: {cpu_result}")
    print(f"CPU Time: {cpu_time:.3f}s")

    # Speedup
    if cpu_time > 0:
        speedup = cpu_time / gpu_time
        print(f"\nGPU Speedup: {speedup:.2f}x faster")


# To run: modal run modal_functions/examples/gpu_example.py
# To deploy: modal deploy modal_functions/examples/gpu_example.py
