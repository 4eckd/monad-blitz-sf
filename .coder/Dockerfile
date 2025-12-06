# MACHUPS Development Environment
# Optimized for Modal.com + Coder hyper-speed development

FROM node:18-bullseye

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    postgresql-client \
    python3.11 \
    python3-pip \
    chromium \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm

# Install Modal CLI for parallel processing
RUN pip3 install modal modal-client

# Install Playwright for logo generation
RUN npx playwright install chromium --with-deps

# Install global TypeScript tools
RUN npm install -g typescript tsx ts-node

# Setup workspace directory
WORKDIR /workspace

# Pre-install common dependencies (for layer caching)
# This speeds up workspace creation significantly
RUN npm install -g \
    @anthropic-ai/sdk \
    @thirdweb-dev/sdk \
    html-to-image \
    puppeteer

# Setup git configuration
RUN git config --global init.defaultBranch main && \
    git config --global core.editor "code --wait"

# Create directories
RUN mkdir -p /workspace/lib/ai /workspace/lib/generators /workspace/lib/modal_functions

# Expose ports for Next.js and Modal
EXPOSE 3000 8000 8080

# Environment setup script
COPY .coder/setup.sh /usr/local/bin/setup-machups
RUN chmod +x /usr/local/bin/setup-machups

# Set default shell
SHELL ["/bin/bash", "-c"]

# Default command
CMD ["bash"]
