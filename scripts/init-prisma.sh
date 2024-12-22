#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}Initializing Prisma...${NC}"

# Generate Prisma Client
echo -e "${YELLOW}Generating Prisma Client...${NC}"
yarn prisma generate

# Run migrations
echo -e "${YELLOW}Running migrations...${NC}"
yarn prisma migrate dev

# Seed database
echo -e "${YELLOW}Seeding database...${NC}"
yarn prisma db seed

echo -e "${GREEN}Prisma initialization completed!${NC}" 