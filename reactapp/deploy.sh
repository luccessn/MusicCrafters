#!/bin/bash
set -e  # გაჩერდება თუ რამე არასწორად წავა

echo "🔀 Switching to branch main"
git checkout main

echo "📥 Pulling latest changes..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🔧 Building app..."
npm run build

echo "🚀 Deploying files to server..."
scp -r build/. luk@62.233.53.70:/var/www/musicrafters.store/

echo "🔁 Restarting Nginx..."
ssh luk@62.233.53.70 "sudo systemctl restart nginx"

echo "✅ Done!"