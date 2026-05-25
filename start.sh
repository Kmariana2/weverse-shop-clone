#!/bin/bash

echo "🚀 Starting Weverse Shop (Frontend + Backend)"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we have two terminals or need to prompt user
if [ "$1" == "--help" ]; then
    echo "Usage: ./start.sh"
    echo ""
    echo "This script will start both the frontend and backend servers."
    echo "You need to run this in two separate terminal windows:"
    echo ""
    echo "Terminal 1: cd backend && npm run dev"
    echo "Terminal 2: cd frontend && npm run dev"
    echo ""
    echo "Or start them manually:"
    echo "  Terminal 1: cd backend && npm install && npm run seed && npm run dev"
    echo "  Terminal 2: cd frontend && npm install && npm run dev"
    exit 0
fi

# Function to start backend
start_backend() {
    echo -e "${BLUE}📦 Starting Backend on http://localhost:3001${NC}"
    cd backend
    if [ ! -d "node_modules" ]; then
        echo "Installing backend dependencies..."
        npm install
    fi
    if [ ! -f "dev.db" ]; then
        echo "Setting up database..."
        npx prisma migrate dev --name init
        npm run seed
    fi
    npm run dev
}

# Function to start frontend
start_frontend() {
    echo -e "${BLUE}⚛️  Starting Frontend on http://localhost:3000${NC}"
    cd frontend
    if [ ! -d "node_modules" ]; then
        echo "Installing frontend dependencies..."
        npm install
    fi
    npm run dev
}

# Check if both backend and frontend directories exist
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${YELLOW}Error: backend/ and frontend/ directories not found${NC}"
    echo "Make sure you're in the root directory of the project"
    exit 1
fi

echo -e "${GREEN}Weverse Shop - Full Stack Setup${NC}"
echo ""
echo "Please run these commands in separate terminal windows:"
echo ""
echo -e "${YELLOW}Terminal 1 (Backend):${NC}"
echo "cd backend && npm install && npm run seed && npm run dev"
echo ""
echo -e "${YELLOW}Terminal 2 (Frontend):${NC}"
echo "cd frontend && npm install && npm run dev"
echo ""
echo -e "${GREEN}Then open: http://localhost:3000${NC}"
echo ""
