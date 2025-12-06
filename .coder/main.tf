terraform {
  required_providers {
    coder = {
      source  = "coder/coder"
      version = "~> 0.12"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

# Workspace information
data "coder_workspace" "me" {}

# Parameters
data "coder_parameter" "branch" {
  name         = "Git Branch"
  display_name = "Git Branch"
  description  = "Which branch to checkout"
  default      = "main"
  mutable      = true
}

data "coder_parameter" "task" {
  name         = "Development Task"
  display_name = "Task"
  description  = "What task is this workspace for?"
  default      = "general"
  option {
    name  = "Claude AI Integration"
    value = "claude-ai"
  }
  option {
    name  = "Generator Modules"
    value = "generators"
  }
  option {
    name  = "Modal.com Integration"
    value = "modal"
  }
  option {
    name  = "Testing & QA"
    value = "testing"
  }
  option {
    name  = "General Development"
    value = "general"
  }
}

data "coder_parameter" "enable_gpu" {
  name         = "GPU Access"
  display_name = "Enable GPU"
  description  = "Enable GPU for Modal.com logo rendering"
  default      = "false"
  type         = "bool"
}

# Docker provider
provider "docker" {}

# Build MACHUPS development image
resource "docker_image" "machups_dev" {
  name = "machups-dev:latest"
  build {
    context    = "${path.module}/.."
    dockerfile = ".coder/Dockerfile"
    tag        = ["machups-dev:latest"]
  }
}

# Workspace container
resource "docker_container" "workspace" {
  image = docker_image.machups_dev.image_id
  name  = "machups-${data.coder_workspace.me.owner}-${data.coder_workspace.me.name}"

  # DNS for hostname resolution
  dns = ["8.8.8.8", "8.8.4.4"]

  # Environment variables
  env = [
    "CODER_WORKSPACE_NAME=${data.coder_workspace.me.name}",
    "CODER_WORKSPACE_OWNER=${data.coder_workspace.me.owner}",
    "GIT_BRANCH=${data.coder_parameter.branch.value}",
    "TASK=${data.coder_parameter.task.value}",
    # Modal.com
    "MODAL_TOKEN_ID=${var.modal_token_id}",
    "MODAL_TOKEN_SECRET=${var.modal_token_secret}",
    # Claude AI
    "CLAUDE_API_KEY=${var.claude_api_key}",
    "ANTHROPIC_API_KEY=${var.claude_api_key}",
    # Penpot MCP
    "PENPOT_SERVER_URL=${var.penpot_server_url}",
    "PENPOT_API_KEY=${var.penpot_api_key}",
    # Cloudflare
    "CLOUDFLARE_API_TOKEN=${var.cloudflare_api_token}",
    "CLOUDFLARE_ACCOUNT_ID=${var.cloudflare_account_id}",
    "CLOUDFLARE_ZONE_ID=${var.cloudflare_zone_id}",
    # Vercel
    "VERCEL_TOKEN=${var.vercel_token}",
    # Thirdweb (for NFTs)
    "THIRDWEB_SECRET_KEY=${var.thirdweb_secret_key}",
    # App config
    "NEXT_PUBLIC_APP_URL=https://machups.com",
    "NODE_ENV=development",
  ]

  # GPU support for Modal.com workloads
  dynamic "gpus" {
    for_each = data.coder_parameter.enable_gpu.value == "true" ? [1] : []
    content {
      device_ids = ["0"]
    }
  }

  # Volume for persistent workspace data
  volumes {
    container_path = "/workspace"
    host_path      = "${path.cwd}/workspaces/${data.coder_workspace.me.owner}/${data.coder_workspace.me.name}"
  }

  # Volume for git credentials
  volumes {
    container_path = "/root/.gitconfig"
    host_path      = "${path.home}/.gitconfig"
    read_only      = true
  }

  # Ports
  ports {
    internal = 3000
    external = 3000 + data.coder_workspace.me.id
  }

  ports {
    internal = 8000
    external = 8000 + data.coder_workspace.me.id
  }

  # Healthcheck
  healthcheck {
    test     = ["CMD", "test", "-f", "/workspace/.ready"]
    interval = "10s"
    timeout  = "5s"
    retries  = 3
  }

  # Startup command
  command = [
    "/bin/bash",
    "-c",
    <<-EOT
      # Setup workspace
      cd /workspace

      # Clone repo if not exists
      if [ ! -d ".git" ]; then
        git clone https://github.com/4eckd/monad-blitz-sf.git .
      fi

      # Checkout branch
      git fetch origin
      git checkout $${GIT_BRANCH} || git checkout -b $${GIT_BRANCH}

      # Install dependencies
      pnpm install

      # Authenticate Modal
      modal token set --token-id $${MODAL_TOKEN_ID} --token-secret $${MODAL_TOKEN_SECRET}

      # Mark as ready
      touch .ready

      # Keep container running
      tail -f /dev/null
    EOT
  ]

  # Auto-remove on stop
  rm = false

  # Restart policy (restart unless stopped)
  restart = "unless-stopped"
}

# Coder agent
resource "coder_agent" "main" {
  os   = "linux"
  arch = "amd64"

  # Startup script
  startup_script = <<-EOT
    #!/bin/bash
    set -e

    echo "🚀 Starting MACHUPS development workspace..."
    echo "Task: ${data.coder_parameter.task.value}"
    echo "Branch: ${data.coder_parameter.branch.value}"

    # Wait for dependencies
    cd /workspace

    # Show status
    echo "✅ Workspace ready!"
    echo "📝 Next steps:"
    case "${data.coder_parameter.task.value}" in
      claude-ai)
        echo "  - Implement Claude AI integration in lib/ai/"
        echo "  - See BUILDER_ASSIGNMENT_CLAUDE_AI.md"
        ;;
      generators)
        echo "  - Implement generators in lib/generators/"
        echo "  - See BUILDER_ASSIGNMENT_GENERATORS.md"
        ;;
      modal)
        echo "  - Setup Modal.com functions"
        echo "  - See MODAL_INTEGRATION_PLAN.md"
        ;;
      testing)
        echo "  - Run integration tests"
        echo "  - pnpm test"
        ;;
      *)
        echo "  - Start development: pnpm dev"
        ;;
    esac
  EOT

  # Metadata
  metadata {
    key          = "cpu"
    display_name = "CPU Usage"
    interval     = 10
    timeout      = 1
    script       = "top -bn1 | grep 'Cpu(s)' | awk '{print $2}'"
  }

  metadata {
    key          = "memory"
    display_name = "Memory Usage"
    interval     = 10
    timeout      = 1
    script       = "free -h | awk '/^Mem:/ {print $3 \"/\" $2}'"
  }
}

# VS Code Server
resource "coder_app" "code-server" {
  agent_id     = coder_agent.main.id
  slug         = "code-server"
  display_name = "VS Code"
  url          = "http://localhost:3000"
  icon         = "/icon/code.svg"
  subdomain    = true
  share        = "owner"

  healthcheck {
    url       = "http://localhost:3000/healthz"
    interval  = 3
    threshold = 10
  }
}

# Next.js dev server
resource "coder_app" "nextjs" {
  agent_id     = coder_agent.main.id
  slug         = "nextjs"
  display_name = "Next.js Dev Server"
  url          = "http://localhost:3000"
  icon         = "/icon/next.svg"
  subdomain    = true
  share        = "owner"
}

# Variables
variable "modal_token_id" {
  description = "Modal.com Token ID"
  sensitive   = true
}

variable "modal_token_secret" {
  description = "Modal.com Token Secret"
  sensitive   = true
}

variable "claude_api_key" {
  description = "Anthropic Claude API Key"
  sensitive   = true
}

variable "penpot_server_url" {
  description = "Penpot MCP Server URL"
  default     = "http://localhost:9001"
}

variable "penpot_api_key" {
  description = "Penpot API Key"
  sensitive   = true
  default     = ""
}

variable "cloudflare_api_token" {
  description = "Cloudflare API Token"
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare Account ID"
}

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID"
  default     = ""
}

variable "vercel_token" {
  description = "Vercel API Token"
  sensitive   = true
  default     = ""
}

variable "thirdweb_secret_key" {
  description = "Thirdweb Secret Key for NFT minting"
  sensitive   = true
  default     = ""
}
