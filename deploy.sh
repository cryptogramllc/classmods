#!/bin/bash

echo "🚀 Deploying ClassMods website to S3..."

# Navigate to the project directory
cd homeschooling-platform

# Build the project
echo "📦 Building project..."
npm run build

# Sync with S3
echo "☁️ Uploading to S3..."
aws s3 sync dist/ s3://classmods-website --delete

echo "✅ Deployment complete!"
echo "🌐 Website URL: http://www.classmods.com"
echo "📝 Note: DNS changes may take a few minutes to propagate"
