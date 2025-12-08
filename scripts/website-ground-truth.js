#!/usr/bin/env node
/**
 * WEBSITE GROUND TRUTH EXTRACTOR
 * ===============================
 * This script extracts the ACTUAL content from the website source code.
 * Run this to see what content exists and where it comes from.
 *
 * Usage: node scripts/website-ground-truth.js [section]
 *
 * Sections: hero, rooms, events, homa, all
 */

const fs = require('fs');
const path = require('path');

const section = process.argv[2] || 'all';

console.log('\n╔══════════════════════════════════════════════════════════════════╗');
console.log('║               WEBSITE GROUND TRUTH REPORT                        ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

// File paths relative to project root
const APP_DIR = path.join(__dirname, '../app');
const COMPONENTS_DIR = path.join(__dirname, '../components');

/**
 * Extract string literals from a file
 */
function extractStrings(filePath, patterns) {
  if (!fs.existsSync(filePath)) {
    return { file: filePath, error: 'File not found' };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const results = {};

  patterns.forEach(({ name, regex, lineSearch }) => {
    if (lineSearch) {
      // Search for specific line content
      const lines = content.split('\n');
      const matchingLine = lines.find(line => line.includes(lineSearch));
      if (matchingLine) {
        const match = matchingLine.match(regex);
        results[name] = match ? match[1] : `Found line but no match: ${matchingLine.trim()}`;
      } else {
        results[name] = 'NOT FOUND';
      }
    } else {
      const match = content.match(regex);
      results[name] = match ? match[1] : 'NOT FOUND';
    }
  });

  return results;
}

/**
 * Extract image paths from a file
 */
function extractImages(filePath) {
  if (!fs.existsSync(filePath)) return [];

  const content = fs.readFileSync(filePath, 'utf-8');
  const imageRegex = /['"`](\/images\/[^'"`]+)['"`]/g;
  const images = [];
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    if (!images.includes(match[1])) {
      images.push(match[1]);
    }
  }

  return images;
}

// ============================================================================
// HOMEPAGE HERO
// ============================================================================
if (section === 'hero' || section === 'all') {
  console.log('🏠 HOMEPAGE HERO SECTION\n');
  console.log('   Source: components/home/HeroHome.tsx\n');

  const heroFile = path.join(COMPONENTS_DIR, 'home/HeroHome.tsx');
  const heroData = extractStrings(heroFile, [
    { name: 'title', regex: /className="[^"]*font-heading[^"]*"[^>]*>\s*([^<]+)</s },
    { name: 'videoSrc', regex: /src=["']([^"']+\.mp4)["']/},
    { name: 'fallbackImage', regex: /heroFallback.*?["']([^"']+)["']/s }
  ]);

  const heroImages = extractImages(heroFile);

  console.log('   Content:');
  Object.entries(heroData).forEach(([key, value]) => {
    console.log(`   - ${key}: "${value}"`);
  });

  if (heroImages.length > 0) {
    console.log('\n   Images found:');
    heroImages.forEach(img => console.log(`   - ${img}`));
  }
}

// ============================================================================
// ROOMS SECTION
// ============================================================================
if (section === 'rooms' || section === 'all') {
  console.log('\n\n🛏️  ROOMS SECTION\n');
  console.log('   Source: components/home/RoomsGridEnhanced.tsx (original)\n');

  const roomsFile = path.join(COMPONENTS_DIR, 'home/RoomsGridEnhanced.tsx');

  if (fs.existsSync(roomsFile)) {
    const content = fs.readFileSync(roomsFile, 'utf-8');

    // Extract section title
    const titleMatch = content.match(/Find Your Perfect Room/);
    console.log(`   Section Title: "${titleMatch ? 'Find Your Perfect Room' : 'NOT FOUND'}"`);

    // Extract room categories
    const categoryMatches = content.match(/title:\s*['"]([^'"]+)['"]/g);
    if (categoryMatches) {
      console.log('\n   Room Categories:');
      const uniqueCategories = [...new Set(categoryMatches.map(m => m.match(/['"]([^'"]+)['"]/)[1]))];
      uniqueCategories.forEach(cat => console.log(`   - ${cat}`));
    }

    // Extract room data structure
    console.log('\n   Room Data (from fallbackRoomsByType):');

    // Check for room types
    const roomTypes = ['king', 'queen', 'family', 'campDeck'];
    roomTypes.forEach(type => {
      const typeRegex = new RegExp(`${type}:\\s*\\[([\\s\\S]*?)\\]\\s*,?\\s*(?:${roomTypes.join('|')}:|\\})`);
      const typeMatch = content.match(typeRegex);
      if (typeMatch) {
        const roomsInType = typeMatch[1].match(/name:\s*['"]([^'"]+)['"]/g);
        if (roomsInType) {
          console.log(`\n   ${type.toUpperCase()}:`);
          roomsInType.forEach(r => {
            const name = r.match(/['"]([^'"]+)['"]/)[1];
            console.log(`      - ${name}`);
          });
        }
      }
    });
  }
}

// ============================================================================
// SUMMARY
// ============================================================================
console.log('\n\n═══════════════════════════════════════════════════════════════════');
console.log('   GROUND TRUTH PRINCIPLE: Website source code is the ONLY truth.');
console.log('   Sanity content MUST match what exists in the actual components.');
console.log('   Never invent content. Never assume. Extract and verify.');
console.log('═══════════════════════════════════════════════════════════════════\n');
