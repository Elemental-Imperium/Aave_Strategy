#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Error handling
set -e
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
trap 'echo -e "${RED}\"${last_command}\" command failed with exit code $?.${NC}"' EXIT

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo -e "${YELLOW}Starting project setup...${NC}"

# Check for Node.js
if ! command_exists node; then
    echo -e "${RED}Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check for cURL
if ! command_exists curl; then
    echo -e "${RED}curl is not installed. Please install curl first.${NC}"
    exit 1
fi

# Create necessary directories
echo -e "${YELLOW}Creating project directories...${NC}"
mkdir -p .yarn/releases

# Download and set up Yarn Berry
echo -e "${YELLOW}Setting up Yarn Berry...${NC}"
curl -fsSL -o .yarn/releases/yarn-4.5.3.cjs https://repo.yarnpkg.com/4.5.3/packages/yarnpkg-cli/bin/yarn.js
chmod +x .yarn/releases/yarn-4.5.3.cjs

# Verify the download
if [ ! -f .yarn/releases/yarn-4.5.3.cjs ]; then
    echo -e "${RED}Failed to download Yarn. Please check your internet connection and try again.${NC}"
    exit 1
fi

# Create .yarnrc.yml if it doesn't exist
if [ ! -f .yarnrc.yml ]; then
    echo -e "${YELLOW}Creating Yarn configuration...${NC}"
    cat > .yarnrc.yml << EOL
nodeLinker: pnp
pnpMode: loose
enableGlobalCache: true

supportedArchitectures:
  os: [darwin, linux, win32]
  cpu: [x64, arm64]

packageExtensions:
  "@prisma/client@*":
    dependencies:
      "@prisma/engines-version": "*"
  "@testing-library/react@*":
    peerDependencies:
      react: "*"
      react-dom: "*"

yarnPath: .yarn/releases/yarn-4.5.3.cjs
EOL
fi

# Create .npmrc if it doesn't exist
if [ ! -f .npmrc ]; then
    echo -e "${YELLOW}Creating NPM configuration...${NC}"
    cat > .npmrc << EOL
public-hoist-pattern[]=*prisma*
public-hoist-pattern[]=*@prisma/*
node-linker=hoisted
EOL
fi

# Initialize Yarn
echo -e "${YELLOW}Initializing Yarn...${NC}"
corepack enable
corepack prepare yarn@4.5.3 --activate

# Clean install
echo -e "${YELLOW}Installing dependencies...${NC}"
yarn install

# Install Prisma globally
echo -e "${YELLOW}Installing Prisma CLI...${NC}"
npm install -g prisma@5.10.2

# Set up Prisma
echo -e "${YELLOW}Setting up Prisma...${NC}"
yarn prisma generate

# Initialize database if it doesn't exist
if [ ! -f "prisma/migrations/migration_lock.toml" ]; then
    echo -e "${YELLOW}Initializing database...${NC}"
    yarn prisma migrate dev --name init
fi

# Make scripts executable
chmod +x scripts/*.sh

echo -e "${GREEN}Setup completed successfully!${NC}"
trap - EXIT 