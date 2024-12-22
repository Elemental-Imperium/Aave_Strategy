#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}Starting update process...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Are you in the project root?${NC}"
    exit 1
fi

# Backup important files
echo -e "${YELLOW}Creating backups...${NC}"
mkdir -p .backups/$(date +%Y%m%d_%H%M%S)
cp .env .backups/$(date +%Y%m%d_%H%M%S)/.env.backup
cp package.json .backups/$(date +%Y%m%d_%H%M%S)/package.json.backup

# Update dependencies
echo -e "${YELLOW}Updating dependencies...${NC}"
yarn up '*' '@*/*'

# Clean cache and node_modules
echo -e "${YELLOW}Cleaning cache...${NC}"
yarn cache clean
rm -rf node_modules/.cache

# Reinstall dependencies
echo -e "${YELLOW}Reinstalling dependencies...${NC}"
yarn install

# Run database migrations if they exist
if [ -d "server/prisma" ]; then
    echo -e "${YELLOW}Running database migrations...${NC}"
    yarn prisma migrate deploy
fi

# Build the project
echo -e "${YELLOW}Building project...${NC}"
yarn build

# Run tests if they exist
if [ -f "vitest.config.js" ]; then
    echo -e "${YELLOW}Running tests...${NC}"
    yarn test
fi

echo -e "${GREEN}Update completed successfully!${NC}" 