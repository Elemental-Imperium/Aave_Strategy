#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found"
  exit 1
fi

# Load environment variables
source .env

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL not set in .env file"
  exit 1
fi

# Run database migrations
echo "Running database migrations..."
npx prisma migrate dev

# Seed the database
echo "Seeding database..."
npx prisma db seed

echo "Database initialization completed successfully" 