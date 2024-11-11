#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Pull git
git pull

# Navigate to the frontend directory and install dependencies
echo "Navigating to frontend directory and installing dependencies..."
cd frontend
npm install --force

# Build the frontend
echo "Building frontend..."
npm run build

# Navigate to the backend directory, install dependencies, and run the build
echo "Navigating to backend directory and installing dependencies..."
cd ../backend
npm install

# Start the backend (modify 'npm run' based on your start command)
echo "Starting backend..."
npm run build

# Navigate back to the main directory
cd ..

# Restart the application with PM2
echo "Restarting application with PM2..."
pm2 restart BiciKlik

echo "Setup complete!"
