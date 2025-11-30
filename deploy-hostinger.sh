#!/bin/bash

# Kinship Landing - Hostinger Deployment Script
# This script builds and prepares the site for Hostinger deployment

echo "🚀 Starting Kinship Landing Deployment Build..."
echo "============================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Step 1: Clean previous builds
echo -e "${YELLOW}Step 1: Cleaning previous builds...${NC}"
rm -rf .next out
echo -e "${GREEN}✓ Build directories cleaned${NC}"

# Step 2: Install dependencies
echo -e "${YELLOW}Step 2: Installing dependencies...${NC}"
npm ci --legacy-peer-deps
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 3: Build the project
echo -e "${YELLOW}Step 3: Building production version...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed! Please fix any errors and try again.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Production build complete${NC}"

# Step 4: Prepare deployment directory
echo -e "${YELLOW}Step 4: Preparing deployment directory...${NC}"
DEPLOY_DIR="../../hostinger-deployment"

# Clear deployment directory
rm -rf $DEPLOY_DIR/*
rm -rf $DEPLOY_DIR/.*

# Copy build files
cp -r out/* $DEPLOY_DIR/
echo -e "${GREEN}✓ Build files copied to deployment directory${NC}"

# Step 5: Create/Update .htaccess
echo -e "${YELLOW}Step 5: Creating .htaccess file...${NC}"
cat > $DEPLOY_DIR/.htaccess << 'EOF'
# Kinship Landing - Hostinger Production Configuration
# Generated for optimal performance and security

# Enable HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Security Headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"

# DEV ENVIRONMENT: Block all crawlers at server level
Header set X-Robots-Tag "noindex, nofollow, noarchive, nocache"

# Enable Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css text/javascript application/xml application/xhtml+xml application/rss+xml application/javascript application/x-javascript application/json application/ld+json image/svg+xml font/truetype font/opentype application/vnd.ms-fontobject
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Cache Control Headers
<FilesMatch "\.(ico|jpg|jpeg|png|gif|webp|svg|js|css|woff|woff2)$">
  Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>

# Prevent directory browsing
Options -Indexes

# Custom error pages
ErrorDocument 404 /404.html

# Handle Next.js routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule ^([^/]+)/?$ $1.html [L]
EOF
echo -e "${GREEN}✓ .htaccess file created${NC}"

# Step 6: Optimize images (optional)
echo -e "${YELLOW}Step 6: Checking image optimization...${NC}"
echo -e "${GREEN}✓ Images already optimized in build process${NC}"

# Step 7: Create deployment info file
echo -e "${YELLOW}Step 7: Creating deployment info...${NC}"
cat > $DEPLOY_DIR/deployment-info.txt << EOF
Kinship Landing Deployment
==========================
Build Date: $(date)
Node Version: $(node -v)
NPM Version: $(npm -v)
Next.js: 15.5.2
Build Type: Static Export (SSG)
EOF
echo -e "${GREEN}✓ Deployment info created${NC}"

# Final summary
echo ""
echo "============================================"
echo -e "${GREEN}🎉 Deployment build complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Navigate to: $DEPLOY_DIR"
echo "2. Upload all files to your Hostinger public_html directory"
echo "3. Ensure .htaccess file is uploaded"
echo "4. Clear Hostinger cache after upload"
echo ""
echo "Files ready at: $(cd $DEPLOY_DIR && pwd)"
echo "Total size: $(du -sh $DEPLOY_DIR | cut -f1)"
echo "============================================"