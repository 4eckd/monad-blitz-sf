"""
Simple Hello World Modal Function

This is the simplest possible Modal function.
Run with: modal run modal_functions/examples/hello_modal.py
"""

import modal

# Create a stub (app)
stub = modal.Stub("hello-machups")


@stub.function()
def greet(name: str) -> str:
    """Simple greeting function"""
    return f"Hello {name} from Modal! 🚀"


@stub.function()
def analyze_text(text: str) -> dict:
    """Analyze text and return stats"""
    return {
        "length": len(text),
        "words": len(text.split()),
        "uppercase": sum(1 for c in text if c.isupper()),
        "lowercase": sum(1 for c in text if c.islower()),
    }


@stub.local_entrypoint()
def main():
    """Entry point when running locally"""
    # Call functions remotely (runs in Modal's cloud)
    result1 = greet.remote("MACHUPS")
    print(result1)

    result2 = analyze_text.remote("Hello World from Modal!")
    print(f"Text stats: {result2}")


# To run: modal run modal_functions/examples/hello_modal.py
# To deploy: modal deploy modal_functions/examples/hello_modal.py
