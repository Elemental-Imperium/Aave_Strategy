#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}Setting up Prisma...${NC}"

# Install Prisma globally
echo -e "${YELLOW}Installing Prisma...${NC}"
yarn global add prisma@5.10.2

# Generate Prisma Client
echo -e "${YELLOW}Generating Prisma Client...${NC}"
yarn prisma generate

# Initialize database if it doesn't exist
if [ ! -f "prisma/migrations/migration_lock.toml" ]; then
  echo -e "${YELLOW}Initializing database...${NC}"
  yarn prisma migrate dev --name init
fi

echo -e "${GREEN}Prisma setup completed!${NC}" 