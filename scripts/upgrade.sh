#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Version to upgrade to (if provided)
VERSION=$1

echo -e "${YELLOW}Starting upgrade process...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Are you in the project root?${NC}"
    exit 1
fi

# Create backup directory
BACKUP_DIR=".backups/$(date +%Y%m%d_%H%M%S)_upgrade"
echo -e "${YELLOW}Creating backup in ${BACKUP_DIR}...${NC}"
mkdir -p $BACKUP_DIR

# Backup current state
cp -r src $BACKUP_DIR/
cp -r server $BACKUP_DIR/
cp package.json $BACKUP_DIR/
cp yarn.lock $BACKUP_DIR/
cp .env $BACKUP_DIR/

# Update core dependencies
echo -e "${YELLOW}Upgrading core dependencies...${NC}"
yarn up vite@latest react@latest react-dom@latest @vitejs/plugin-react@latest

# Update development dependencies
echo -e "${YELLOW}Upgrading development dependencies...${NC}"
yarn up -D typescript@latest @types/react@latest @types/react-dom@latest

# Update UI dependencies
echo -e "${YELLOW}Upgrading UI dependencies...${NC}"
yarn up tailwindcss@latest postcss@latest autoprefixer@latest framer-motion@latest @heroicons/react@latest

# Update backend dependencies if they exist
if [ -d "server" ]; then
    echo -e "${YELLOW}Upgrading backend dependencies...${NC}"
    yarn up express@latest prisma@latest @prisma/client@latest
fi

# Clean installation
echo -e "${YELLOW}Cleaning installation...${NC}"
rm -rf node_modules
yarn cache clean

# Reinstall dependencies
echo -e "${YELLOW}Reinstalling dependencies...${NC}"
yarn install

# Run database migrations if they exist
if [ -d "server/prisma" ]; then
    echo -e "${YELLOW}Running database migrations...${NC}"
    yarn prisma generate
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

echo -e "${GREEN}Upgrade completed successfully!${NC}" 