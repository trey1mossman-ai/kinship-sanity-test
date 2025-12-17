const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function checkDocStructure() {
  // Check Homa document fields
  console.log('=== HOMA PAGE DOCUMENT ===');
  const homaDoc = await client.fetch('*[_type == "homaPage"][0]');
  const homaKeys = Object.keys(homaDoc || {}).filter(k => !k.startsWith('_'));
  console.log('Fields present:', homaKeys.join(', '));
  
  // Check Gallery document fields  
  console.log('\n=== GALLERY PAGE DOCUMENT ===');
  const galleryDoc = await client.fetch('*[_type == "galleryPage"][0]');
  const galleryKeys = Object.keys(galleryDoc || {}).filter(k => !k.startsWith('_'));
  console.log('Fields present:', galleryKeys.join(', '));
  if (galleryDoc && galleryDoc.images) {
    console.log('Images array length:', galleryDoc.images.length);
    if (galleryDoc.images.length > 0) {
      console.log('First image structure:', JSON.stringify(galleryDoc.images[0], null, 2));
    }
  }
}

checkDocStructure().catch(err => console.error('Error:', err.message));
