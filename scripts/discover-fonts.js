const https = require('https');

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function discoverFonts() {
  console.log('Fetching Kinship Landing homepage...');
  const html = await fetchUrl('https://www.kinshiplanding.com');
  
  // Find Google Fonts links
  const googleFontLinks = [];
  const linkRegex = /<link[^>]*href=["']([^"']*fonts\.googleapis\.com[^"']*)/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    googleFontLinks.push(match[1].replace(/&amp;/g, '&'));
  }
  
  // Find inline styles
  const styleBlocks = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  while ((match = styleRegex.exec(html)) !== null) {
    styleBlocks.push(match[1]);
  }
  
  console.log('\n=== DISCOVERED GOOGLE FONTS LINKS ===');
  googleFontLinks.forEach(link => console.log(link));
  
  // Fetch Google Fonts CSS to get exact font details
  const fontDetails = [];
  for (const fontLink of googleFontLinks) {
    console.log(`\nFetching font details from: ${fontLink}`);
    try {
      const fontCss = await fetchUrl(fontLink);
      
      // Parse font families and weights
      const fontFaceRegex = /@font-face\s*{([^}]+)}/g;
      while ((match = fontFaceRegex.exec(fontCss)) !== null) {
        const block = match[1];
        const family = block.match(/font-family:\s*['"]([^'"]+)/)?.[1];
        const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
        const style = block.match(/font-style:\s*([^;]+)/)?.[1]?.trim() || 'normal';
        const src = block.match(/src:\s*url\(([^)]+)\)/)?.[1];
        
        if (family && weight) {
          fontDetails.push({ family, weight, style, src });
        }
      }
    } catch (err) {
      console.error(`Error fetching font CSS: ${err.message}`);
    }
  }
  
  // Group by family
  const families = {};
  fontDetails.forEach(font => {
    if (!families[font.family]) {
      families[font.family] = [];
    }
    families[font.family].push({
      weight: font.weight,
      style: font.style,
      src: font.src
    });
  });
  
  console.log('\n=== DISCOVERED FONT FAMILIES ===');
  console.log(JSON.stringify(families, null, 2));
  
  // Search for font usage in inline styles
  console.log('\n=== FONT USAGE IN INLINE STYLES ===');
  styleBlocks.forEach(style => {
    const fontFamilyMatches = style.match(/font-family:\s*([^;]+)/g);
    if (fontFamilyMatches) {
      fontFamilyMatches.forEach(match => {
        console.log(match);
      });
    }
  });
  
  // Try to find CSS files
  const cssLinks = [];
  const cssLinkRegex = /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+\.css[^"']*)/gi;
  while ((match = cssLinkRegex.exec(html)) !== null) {
    if (!match[1].includes('fonts.googleapis')) {
      cssLinks.push(match[1]);
    }
  }
  
  console.log('\n=== CSS FILES ===');
  cssLinks.forEach(link => console.log(link));
  
  // Output summary
  console.log('\n=== SUMMARY ===');
  console.log('Font families found:');
  Object.keys(families).forEach(family => {
    const weights = [...new Set(families[family].map(f => f.weight))].sort();
    console.log(`  ${family}: weights ${weights.join(', ')}`);
  });
  
  // Save to JSON
  const output = {
    googleFontLinks,
    families,
    timestamp: new Date().toISOString()
  };
  
  require('fs').writeFileSync('/tmp/kinship-fonts.json', JSON.stringify(output, null, 2));
  console.log('\nSaved font data to /tmp/kinship-fonts.json');
}

discoverFonts().catch(console.error);