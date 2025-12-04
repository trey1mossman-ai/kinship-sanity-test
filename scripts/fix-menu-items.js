// Fix Menu Items in Sanity
// Deletes fake items and creates real ones from homa-menu-data.ts
// Run with: SANITY_TOKEN="your_token" node scripts/fix-menu-items.js

const { createClient } = require('@sanity/client');

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('ERROR: SANITY_TOKEN environment variable is required');
  process.exit(1);
}

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: token,
  useCdn: false,
});

// Real menu data from homa-menu-data.ts (copied exactly)
const homaMenuData = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    subtitle: 'Served until 3pm',
    items: [
      { name: 'The "Homie" Breakfast Sandwich*', description: 'Fresh baked rosemary and caramelized onion focaccia, pasture raised eggs your style, local sunflower sprouts, avocado, swiss, lemongrass sambal aioli, crispy potatoes, grilled tomato', price: '$15' },
      { name: 'Colorado Burrito*', description: 'Flour tortilla, pasture raised eggs, black bean-corn salsa, potatoes, colby cheese', price: '$13' },
      { name: 'Veggie Hash*', description: 'two pasture raised eggs your style, seasonal veggies, potatoes, baby arugula', price: '$14' },
      { name: 'Rambler Toast*', description: 'locally made Japanese milk bread, spiced custard, berry compote, pure maple syrup', price: '$15' },
      { name: 'Breakfast Street Tacos*', description: 'corn tortillas, griddled cotija, fresh corn salsa, scrambled eggs, potato, salsa roja', price: '$15' },
      { name: 'The Usual*', description: 'three pasture raised eggs your style, honey cured bacon, crispy potatoes', price: '$14' },
      { name: 'Buttermilk Pancakes*', description: 'house-made buttermilk pancakes, honey cured bacon, two pasture raised eggs your style, butter, maple syrup', price: '$16' },
      { name: "Rise 'N Shine Hand Pie*", description: 'scrambled eggs, bacon, potato, peppers and onion, muenster', price: '$9' },
      { name: 'Steak + Eggs*', description: 'grilled skirt steak, two pasture raised eggs your way, crispy potatoes', price: '$21' }
    ]
  },
  {
    id: 'bowls',
    title: 'Bowls',
    subtitle: "hearty bowls with locally grown sprouted lentils, farro, quinoa & organic leafy greens served half 'n' half or salad style",
    items: [
      { name: 'Med Fresh', description: 'chickpeas, artichokes, cucumber, kalamata, sweet peppers, onions, tomato, avocado, roasted tomato vinaigrette', price: '$15' },
      { name: 'Fried Cauli', description: 'avocado, cashew, sunflower sprouts, lemongrass sambal aioli', price: '$15' },
      { name: 'Caesar*', description: 'greens, arugula, tomatoes, cucumber, parmesan, garlic crouton', price: '$15' },
      { name: 'Beets', description: 'greens, arugula, goat cheese, orange, roasted cashew, balsamic vinaigrette', price: '$17' },
      { name: 'Pork Belly Banh Mi', description: 'ginger-soy glazed pork belly, pickled veggies, cilantro, green onion, lemongrass-sambal aioli', price: '$16' },
      { name: 'Steak*', description: 'greens, tomato, corn, red onion, avocado, cucumber, goat cheese, basil buttermilk dressing', price: '$21' }
    ]
  },
  {
    id: 'snacks',
    title: 'Snacks',
    items: [
      { name: 'St. Ives Hand Pie', description: 'braised beef, swiss, potato, peppers and onion, dijon w/ garlic aioli', price: '$9' },
      { name: 'The Momo Hand Pie', description: 'lemongrass chicken, muenster, coconut milk, lime, sweet potato w/ lemongrass aioli', price: '$9' },
      { name: 'Cauli Pop', description: 'fried cauliflower popcorn with lemongrass sambal aioli', price: '$10' },
      { name: 'Cutting Board', description: "chef's selection of cheese, cured meats, pickles and spreads", price: '$19' },
      { name: 'Hummus', description: 'veggie and pita', price: '$11' },
      { name: 'Tostadas', description: 'grilled cotija, marinated mushrooms, corn-black bean salsa, sunflower sprouts, chile rojo', price: '$10' },
      { name: 'Local Mushroom Flatbread', description: 'parmesan, arugula, red onion, olive oil', price: '$14' },
      { name: 'Calabrese Flatbread', description: 'calabrian chili, san marzano tomatoes, calabrese salami, fresh mozzarella', price: '$14' },
      { name: 'Grilled Steak Skewers*', description: 'thai peanut dipping sauce', price: '$10' },
      { name: 'Grilled Salmon Skewers*', description: 'vietnamese dipping sauce', price: '$10' },
      { name: 'Shoestring Fries', description: 'with lemongrass sambal aioli', price: '$7' },
      { name: 'Pork Green Chili', description: 'braised pork shoulder, pueblo chilies, crema, cotija', price: '$5/8' },
      { name: 'Baked Goat Cheese + Basil Pesto', description: 'Local Goat Cheese, Basil-Cashew Pesto, Red Wine Caramelized Onion, Roasted Garlic, Crostini', price: '$14' }
    ]
  },
  {
    id: 'sandwiches',
    title: 'Sandwiches',
    subtitle: 'darn good sammies served with shoestring fries, kettle chips, chickpea salad or a side salad',
    items: [
      { name: 'North Park', description: 'roasted pork, caramelized onions, banana peppers, swiss, cilantro, roasted garlic aioli, locally made rustic sourdough', price: '$16' },
      { name: 'Club Scout', description: 'turkey, bacon, avocado, muenster, mayo, leafy greens, tomatoes, locally made japanese milk bread', price: '$17' },
      { name: 'Ascent Burger*', description: 'leafy greens, tomatoes, pickles, red onion, longhorn colby cheese and roasted garlic aioli, nigella seed kaiser roll', price: '$17' },
      { name: 'The Local', description: 'organic veggies, avocado, goat cheese spread, mediterranean vinaigrette, locally made rustic sourdough', price: '$16' },
      { name: 'Salmon*', description: 'lemon caper aioli, arugula, red onion, rustic sourdough', price: '$19' },
      { name: 'Steak*', description: 'skirt steak, roasted garlic aioli, arugula, red wine caramelized onions, blue cheese, rustic sourdough', price: '$21' }
    ]
  },
  {
    id: 'entrees',
    title: 'Entrées',
    subtitle: 'Served after 4pm',
    items: [
      { name: 'Skirt Steak Frites*', description: 'garlic-parmesan fries, gremolata, roasted garlic aioli', price: '$24' },
      { name: 'Chicken Agrodolce', description: 'tomatoes, zucchini, basil cream, prosciutto, creamy polenta', price: '$24' },
      { name: 'Butternut Squash Pappardelle', description: 'cashews, sage, brown butter, parmesan', price: '$19' },
      { name: 'Sugar Spiced Salmon*', description: 'herbed quinoa, corn-black bean succotash, sunflower sprout salad', price: '$27' },
      { name: 'Roasted Local Mushrooms', description: 'parmesan polenta, grilled zucchini, herbs, roasted tomatoes', price: '$21' }
    ]
  },
  {
    id: 'sweet-things',
    title: 'Sweet Things',
    items: [
      { name: 'Cheesecake Brownie Sundae', description: 'chocolate sauce, cashews, vanilla ice cream', price: '$9' },
      { name: 'Ice Cream Sandwich', description: 'double chocolate cookie, vanilla ice cream', price: '$8' },
      { name: 'Seasonal Dessert', price: '$11' }
    ]
  },
  {
    id: 'kids',
    title: 'Kids',
    subtitle: 'Children 8 & under',
    items: [
      { name: 'Pancake', description: 'pure maple syrup, butter', price: '$9' },
      { name: 'French Toast Strips', description: 'pure maple syrup, berries', price: '$9' },
      { name: 'Turkey + Colby', description: 'white bread, mayo, potato chips', price: '$9' },
      { name: 'Chicken Strips', description: 'fries, ranch', price: '$11' },
      { name: "PB 'N' J", description: 'potato chips', price: '$8' },
      { name: "Mac 'N' Cheese", description: 'white cheddar + cavatappi', price: '$9' },
      { name: 'Cheese or Pepperoni Pizza', price: '$12' }
    ]
  },
  {
    id: 'cocktails',
    title: 'Cocktails',
    items: [
      { name: 'Smoke & Soul', description: 'Doña Loca Mezcal, Apertivo, lime, maraschino liqueur, agave', price: '$14' },
      { name: 'Ranch Water', description: 'Tequila, lime, jalapeño, cilantro, topo chico', price: '$14' },
      { name: 'Drunken Botanist', description: 'Ketel One Botanical Grapefruit & Rose, lemon, ginger, prosecco', price: '$14' },
      { name: 'Twisted & Fermented', description: "Tito's Vodka, hard kombucha, lemon", price: '$14' },
      { name: 'Garden Party', description: "Ford's gin, cucumber, lime, mint, elderflower liqueur", price: '$14' },
      { name: 'Silent Lucidity', description: 'Gin, lime, honey, absinthe rinse, aquafaba', price: '$14' },
      { name: 'Mexicali Blues', description: 'Milagro Tequila, pineapple, jalapeño, lime, chile lime salt, agave', price: '$14' },
      { name: 'Okinawa Old Fashioned', description: 'Japanese whiskey, maraschino liqueur, unami & shiso bitters', price: '$14' }
    ]
  },
  {
    id: 'mocktails',
    title: 'Mocktails',
    items: [
      { name: 'Earthen & Ginger', description: 'Wilderton Botanical, lemon, simple syrup, ginger ale', price: '$10' },
      { name: 'Italian Orange Spritz', description: "Lyre's Orange, lemon, ginger, orange bitters, club soda", price: '$10' },
      { name: 'Juniper Berry & Tonic', description: 'Seed Lip Spice 94, fire bitters, lemon, tonic, cucumber', price: '$10' },
      { name: 'Maple New Fashioned', description: 'Botanical Spirit, maple, orange bitters, smoked bitters, cherry', price: '$10' },
      { name: 'Lively Polly', description: 'Three Spirit Livener, lime, simple syrup, grapefruit soda', price: '$10' },
      { name: 'Cali Blues', description: 'Pineapple, lime, agave, jalapeño, fire bitters', price: '$10' }
    ]
  },
  {
    id: 'draft-beer',
    title: 'Draft Beer',
    items: [
      { name: "Kinship Lager (Odell's)", description: 'Crispy Lager (5.0% ABV) / Fort Collins, CO', price: '$6' },
      { name: 'Avery White Rascal', description: 'Belgian-Style White Ale (5.6% ABV) / Boulder, CO', price: '$6' },
      { name: "Odell's Sippin' Pretty", description: 'Guava & Elderberry Fruited Sour (4.5% ABV) / Fort Collins, CO', price: '$6' },
      { name: "Odell's IPA", description: 'Traditional IPA (7.0% ABV) / Fort Collins, CO', price: '$6' },
      { name: 'LH French Toast Milk Stout', description: 'Spiced Milk Stout (6.0% ABV) / Longmont, CO', price: '$6' },
      { name: 'Goat Patch Hazy IPA', description: 'New England Hazy IPA (6.4% ABV) / Colorado Springs, CO', price: '$6' },
      { name: 'Goat Patch Tiger Tail Blonde', description: 'Blonde Ale (4.9% ABV) / Colorado Springs, CO', price: '$6' }
    ]
  },
  {
    id: 'cans',
    title: 'Cans',
    items: [
      { name: "Ellie's Brown Ale", description: 'American Brown Ale (5.5% ABV) / Boulder, CO', price: '$6' },
      { name: 'Patrol Dog Pale', description: 'American Pale Ale (5.7% ABV) / Boulder, CO', price: '$6' },
      { name: 'Denver Beer Co. Seltzer', description: 'Passion Fruit Orange Guava Punch (5.0% ABV) / Denver, CO', price: '$6' },
      { name: 'JuneShine', description: 'Hard Kombucha - Assorted Flavors / San Diego, CA', price: '$7' },
      { name: 'Stem Ciders', description: 'Cider - Assorted Flavors / Lafayette, CO', price: '$7' },
      { name: 'Coors Light', description: 'Lager (4.2% ABV) / Golden, CO', price: '$5' },
      { name: '90 Shillings', description: 'Amber Ale (5.3% ABV) / Fort Collins, CO', price: '$6' },
      { name: 'Snake River Earned It', description: 'Hazy IPA (6.0% ABV) / Jackson, WY', price: '$6' },
      { name: 'Dominga Grapefruit Paloma', description: 'Fruit Paloma-style ale (8.0% ABV) / Fort Collins, CO', price: '$6' },
      { name: 'Horse & Dragon Silver Lion', description: 'Czech-Style Pilsner (5.1% ABV) / Fort Collins, CO', price: '$6' },
      { name: 'Woods Boss Coastal Companion', description: 'West Coast IPA (6.2% ABV) / Denver, CO', price: '$6' },
      { name: 'New Belgium Mountain Time', description: 'Lager (4.4% ABV) / Fort Collins, CO', price: '$5' },
      { name: 'FH Beerworks Sticky Paws', description: 'Honey Wheat Ale (7.5% ABV) / Colorado Springs, CO', price: '$6' },
      { name: 'Living The Dream Fly Reel Amber', description: 'Amber Ale (4.1% ABV) / Highlands Ranch, CO', price: '$6' },
      { name: 'Snake River La Cerveza', description: 'Mexican Lager (4.5% ABV) / Jackson, WY', price: '$6' },
      { name: 'Finkle & Garf', description: 'IPA (6.5% ABV) / Boulder, CO', price: '$7' }
    ]
  },
  {
    id: 'na-beer',
    title: 'N/A Beer',
    items: [
      { name: 'Athletic Brewing Athletica', description: 'Non-Alcoholic Mexican-style Copper', price: '$6' },
      { name: 'Athletic Brewing Run Wild', description: 'Non-Alcoholic IPA', price: '$6' },
      { name: 'RationAle Mexican Cerveza', description: 'Non-Alcoholic Mexican Lager', price: '$6' },
      { name: 'Partake Brewing', description: 'Non-Alcoholic IPA', price: '$6' }
    ]
  },
  {
    id: 'white-wine',
    title: 'White Wine',
    items: [
      { name: 'Borgo Margedo Prosecco', description: 'Extra Dry / Italy', price: '10 / 38' },
      { name: 'The Seeker', description: 'Sauvignon Blanc (2022) / Acampo, CA', price: '12 / 46' },
      { name: 'La Nuda', description: 'Pinot Grigio (2023) / Cortina, Italy', price: '11 / 42' },
      { name: 'Tinto Rey', description: 'Rosé (2023) / Zamora, CA', price: '12 / 46' },
      { name: 'Los Vascos', description: 'Chardonnay (2022) / Valle De Cholchagua Chile', price: '11 / 42' }
    ]
  },
  {
    id: 'red-wine',
    title: 'Red Wine',
    items: [
      { name: 'Dehesa La Granja', description: 'Temperanilla (2018) / Spain', price: '15 / 55' },
      { name: 'Amalaya', description: 'Malbec (2022) / Salta, Argentina', price: '15 / 56' },
      { name: 'Lyric', description: 'Pinot Noir (2022) / Sonoma, CA', price: '18 / 66' },
      { name: 'Pavette', description: 'Pinot Noir (2022) / Healdburg, CA', price: '10 / 38' }
    ]
  },
  {
    id: 'espresso',
    title: 'Espresso',
    subtitle: 'Reg / Dbl | served hot or iced | milk alternatives +1.00 | add espresso shot +2.25',
    items: [
      { name: 'Espresso', price: '4.25' },
      { name: 'Doppio', price: '7.50' },
      { name: 'Cappuccino', price: '4.95 / 6.95' },
      { name: 'Latté', price: '5.15 / 7.15' },
      { name: 'Latté w/ Flavor', price: '4.95 / 6.95' },
      { name: 'Mocha', price: '5.25 / 7.25' },
      { name: 'Americano', price: '4.25 / 6.25' },
      { name: 'Cortado', price: '4.95' },
      { name: 'Macchiato', price: '4.95' }
    ]
  },
  {
    id: 'coffee',
    title: 'Coffee',
    items: [
      { name: 'Drip Coffee', price: '$4' },
      { name: 'Nitro Brew', description: 'Served over ice', price: '$5' },
      { name: 'Oat Milk Draft Latté', description: 'Served over ice', price: '$7' }
    ]
  },
  {
    id: 'non-coffee',
    title: 'Non-Coffee',
    subtitle: 'Reg / Lg | served hot or iced | milk alternatives +1.00',
    items: [
      { name: 'Matcha Latté', price: '5.50 / 7.50' },
      { name: 'Chai Latté', price: '5.25 / 7.25' },
      { name: 'Organic Hot Tea', price: '4.00' },
      { name: 'Hot Cocoa', price: '4.25 / 6.25' }
    ]
  },
  {
    id: 'soft-drinks',
    title: 'Soft Drinks',
    items: [
      { name: 'Lemonade', price: '$4.00' },
      { name: 'Iced Tea', price: '$4.00' },
      { name: 'Topo Chico', price: '$4.50' },
      { name: 'Boylans Craft Soda', price: '$5.00' },
      { name: 'Fountain Soda', price: '$3.50' }
    ]
  }
];

async function fixMenuItems() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║           FIXING MENU ITEMS IN SANITY                      ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Step 1: Delete all existing fake menu items
  console.log('STEP 1: Deleting fake menu items...');
  const existingItems = await client.fetch(`*[_type == "menuItem"] { _id, name }`);
  console.log(`   Found ${existingItems.length} fake items to delete`);

  for (const item of existingItems) {
    await client.delete(item._id);
    console.log(`   ✅ Deleted: ${item.name}`);
  }

  // Step 2: Create all real menu items
  console.log('\nSTEP 2: Creating real menu items from website...');

  let totalCreated = 0;
  let displayOrder = 1;

  for (const category of homaMenuData) {
    console.log(`\n   📂 ${category.title} (${category.items.length} items)`);

    for (const item of category.items) {
      try {
        await client.create({
          _type: 'menuItem',
          name: item.name,
          description: item.description || null,
          price: item.price,
          category: category.id,
          categoryTitle: category.title,
          displayOrder: displayOrder++,
          isAvailable: true,
        });
        process.stdout.write('.');
        totalCreated++;
      } catch (error) {
        console.log(`\n   ❌ Failed: ${item.name} - ${error.message}`);
      }
    }
  }

  console.log(`\n\n✅ Created ${totalCreated} menu items from ${homaMenuData.length} categories`);

  // Step 3: Verify
  console.log('\nSTEP 3: Verifying...');
  const finalCount = await client.fetch(`count(*[_type == "menuItem"])`);
  console.log(`   Total menu items in Sanity: ${finalCount}`);

  const categoryBreakdown = await client.fetch(`
    *[_type == "menuItem"] {category} | order(category asc)
  `);
  const counts = {};
  categoryBreakdown.forEach(item => {
    counts[item.category] = (counts[item.category] || 0) + 1;
  });
  console.log('\n   By category:');
  Object.entries(counts).forEach(([cat, count]) => {
    console.log(`     - ${cat}: ${count}`);
  });

  console.log('\n');
}

fixMenuItems().catch(console.error);
