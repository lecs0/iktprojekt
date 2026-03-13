#!/bin/bash

# RatZ Streaming Platform - Start Script
# This script starts the Node.js server

cd "$(dirname "$0")"

echo "🎬 Starting RatZ Streaming Platform..."
echo ""

# Try different ways to find/run node
if command -v node &> /dev/null; then
    echo "✅ Using system Node.js"
    node backend/server.js
elif command -v npm &> /dev/null; then
    echo "✅ Using npm to start"
    npm start
else
    echo "❌ Error: Node.js is not installed!"
    echo ""
    echo "Please install Node.js from https://nodejs.org/"
    echo "Or run: npm install && npm start"
    exit 1
fi
