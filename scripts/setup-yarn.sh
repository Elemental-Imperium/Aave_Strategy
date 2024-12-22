#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}Setting up Yarn...${NC}"

# Create necessary directories
mkdir -p .yarn/releases

# Download Yarn binary
echo -e "${YELLOW}Downloading Yarn...${NC}"
curl -L -o .yarn/releases/yarn-4.5.3.cjs https://github.com/yarnpkg/berry/releases/download/4.5.3/yarn-4.5.3.cjs

# Set up Yarn
echo -e "${YELLOW}Setting up Yarn...${NC}"
node .yarn/releases/yarn-4.5.3.cjs set version 4.5.3

echo -e "${GREEN}Yarn setup completed!${NC}" 