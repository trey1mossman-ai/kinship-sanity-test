# RICH TEXT MIGRATION PLAYBOOK

> **Purpose:** Step-by-step guide to convert any Sanity page from plain text to rich text (Portable Text)
> **Designed for:** Sub-agents and developers following a repeatable process
> **Last Updated:** December 2024

---

## OVERVIEW

This playbook converts plain text fields to Sanity's Portable Text format, enabling rich formatting (bold, italic, links, lists) in the CMS while maintaining backwards compatibility.

**Time Estimate:** 30-60 minutes per page depending on field count

**Success Criteria:**
- [ ] Migration script runs without errors
- [ ] Schema deploys without errors
- [ ] Components render both old (string) and new (array) formats
- [ ] Build passes
- [ ] Sanity Studio shows rich text editors for all converted fields

---

## THE GOLDEN RULE

**ALWAYS migrate data BEFORE deploying schema changes.**

```
CORRECT ORDER:
1. Create migration script
2. Run migration script
3. Verify data in Sanity Vision
4. THEN deploy schema changes
5. THEN update components

WRONG ORDER (causes "Invalid property value" errors):
1. Change schema ❌
2. Deploy schema ❌
3. Sanity Studio breaks!
```

---

## PHASE 1: AUDIT (Sub-Agent Safe)

### Step 1.1: Identify the Schema File

**Location:** `/sanity-test-sandbox/schemaTypes/singletons/[pageName]Page.ts`

### Step 1.2: List All Text Fields

Search for fields with these types that could benefit from rich formatting:
- `type: 'text'` - Multi-line text (CONVERT THESE)
- `type: 'string'` - Single line (usually titles, leave as-is)

**Fields to Convert:**
- Descriptions
- Paragraphs
- Welcome text
- Mission statements
- Any multi-line content

**Fields to Leave as String:**
- Titles
- Labels
- Button text
- Single-line items

### Step 1.3: Document Fields to Migrate

Create a list like this:

```
Page: [pageName]
Document Type: [pageName]Page

Fields to Convert:
1. heroSubtitle (text -> richText)
2. sectionDescription (text -> richText)
3. introText (text -> richText)
...
```

---

## PHASE 2: CREATE MIGRATION SCRIPT (Sub-Agent Safe)

### Step 2.1: Create Script File

**Location:** `/sanity-hostinger-test/scripts/migrate-[pagename]-to-richtext.js`

### Step 2.2: Use This Template

```javascript
#!/usr/bin/env node
/**
 * [PAGE NAME] PAGE - RICH TEXT MIGRATION SCRIPT
 *
 * This script converts plain text fields to Portable Text format
 * RUN THIS BEFORE deploying schema changes to avoid Sanity Studio errors
 *
 * Usage:
 *   cd sanity-hostinger-test
 *   SANITY_API_TOKEN=$SANITY_API_TOKEN node scripts/migrate-[pagename]-to-richtext.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// =====================================================
// FIELDS TO MIGRATE - UPDATE THIS LIST FOR EACH PAGE
// =====================================================
const FIELDS_TO_MIGRATE = [
  'heroSubtitle',
  'sectionDescription',
  // Add all fields identified in Phase 1
];

/**
 * Convert plain text to Portable Text block format
 */
function textToPortableText(text) {
  if (!text || typeof text !== 'string') return null;

  // Split by double newlines to create paragraphs
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());

  return paragraphs.map((paragraph, index) => ({
    _type: 'block',
    _key: `block-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
    style: 'normal',
    markDefs: [],
    children: [{
      _type: 'span',
      _key: `span-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      text: paragraph.trim(),
      marks: [],
    }],
  }));
}

async function migrate() {
  console.log('🔄 Starting [Page Name] migration to Rich Text...\n');

  // Check for API token
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN environment variable is required');
    console.error('   Run with: SANITY_API_TOKEN=your_token node scripts/migrate-[pagename]-to-richtext.js');
    process.exit(1);
  }

  // Fetch the document
  const doc = await client.fetch(`*[_type == "[pageName]Page"][0]`);

  if (!doc) {
    console.error('❌ Error: No [pageName]Page document found in Sanity');
    process.exit(1);
  }

  console.log(`📄 Found [pageName]Page document: ${doc._id}\n`);

  // Build the patch with converted fields
  const updates = {};
  let convertedCount = 0;
  let skippedCount = 0;

  for (const field of FIELDS_TO_MIGRATE) {
    const value = doc[field];

    if (typeof value === 'string' && value.trim()) {
      // Convert string to Portable Text
      const portableText = textToPortableText(value);
      updates[field] = portableText;
      console.log(`   ✅ ${field}: Converting from string`);
      convertedCount++;
    } else if (Array.isArray(value)) {
      console.log(`   ⏭️  ${field}: Already Portable Text, skipping`);
      skippedCount++;
    } else if (!value) {
      console.log(`   ⚪ ${field}: Empty/null, skipping`);
      skippedCount++;
    }
  }

  console.log(`\n📊 Summary: ${convertedCount} fields to convert, ${skippedCount} skipped\n`);

  if (Object.keys(updates).length === 0) {
    console.log('✅ No migrations needed - all fields are already Portable Text or empty');
    return;
  }

  // Apply the patch
  console.log('💾 Applying updates to Sanity...');

  try {
    await client
      .patch(doc._id)
      .set(updates)
      .commit();

    console.log('\n✅ Migration complete!');
    console.log(`   Converted ${convertedCount} fields to Portable Text format`);
    console.log('\n📋 Next steps:');
    console.log('   1. Verify data in Sanity Vision: *[_type == "[pageName]Page"][0]');
    console.log('   2. Deploy schema: cd sanity-test-sandbox && npx sanity deploy');
    console.log('   3. Update frontend components to use RichTextRenderer');
    console.log('   4. Build and push: npm run build && git push origin main');
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate().catch(console.error);
```

---

## PHASE 3: RUN MIGRATION (Requires Human Oversight)

### Step 3.1: Get API Token

The token is stored in:
- `/sanity-test-sandbox/.env.local`
- `/sanity-hostinger-test/.env.local`

### Step 3.2: Run the Script

```bash
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-hostinger-test"
SANITY_API_TOKEN=<token> node scripts/migrate-[pagename]-to-richtext.js
```

### Step 3.3: Verify Migration

In Sanity Vision (https://kinship-landing.sanity.studio/vision):

```groq
*[_type == "[pageName]Page"][0] {
  fieldName1,
  fieldName2,
  // List all migrated fields
}
```

Each field should now be an array of blocks, not a string.

---

## PHASE 4: UPDATE SCHEMA (Requires Human Oversight)

### Step 4.1: Edit Schema File

**Location:** `/sanity-test-sandbox/schemaTypes/singletons/[pageName]Page.ts`

**For each field, change:**

```typescript
// BEFORE
defineField({
  name: 'heroSubtitle',
  title: 'Hero Subtitle',
  type: 'text',
  rows: 3,
  group: 'hero'
}),

// AFTER
defineField({
  name: 'heroSubtitle',
  title: 'Hero Subtitle',
  type: 'richText',
  group: 'hero'
}),
```

**Remove:** `rows` property (not used by richText)

### Step 4.2: Deploy Schema

```bash
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-test-sandbox"
npx sanity deploy
```

### Step 4.3: Verify in Studio

Open Sanity Studio and check that fields now show rich text editor (not plain text area).

---

## PHASE 5: UPDATE COMPONENTS (Sub-Agent Safe)

### Step 5.1: Import Requirements

At the top of the component file:

```typescript
import { RichTextRenderer, textToPortableText } from '@/components/ui/RichTextRenderer';
```

### Step 5.2: Replace Text Rendering

**BEFORE:**
```tsx
<p className="text-lg">
  {pageData?.heroSubtitle || 'Default subtitle text'}
</p>
```

**AFTER:**
```tsx
<div className="text-lg">
  {Array.isArray(pageData?.heroSubtitle) ? (
    <RichTextRenderer value={pageData.heroSubtitle} />
  ) : (
    <p>{pageData?.heroSubtitle || 'Default subtitle text'}</p>
  )}
</div>
```

### Step 5.3: Update Child Components (if applicable)

If data is passed to child components, update their interfaces:

```typescript
import type { PortableTextBlock } from '@portabletext/types';

interface ChildComponentProps {
  description?: string | PortableTextBlock[];
}
```

And their rendering:

```tsx
const description = props.description;
const fallback = 'Default text...';

<div>
  {Array.isArray(description) ? (
    <RichTextRenderer value={description} />
  ) : (
    <p>{description || fallback}</p>
  )}
</div>
```

---

## PHASE 6: BUILD & DEPLOY (Requires Human Oversight)

### Step 6.1: Run Build

```bash
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-hostinger-test"
npm run build
```

**Must pass with no errors.**

### Step 6.2: Commit and Push

```bash
git add -A
git commit -m "feat: implement rich text (Portable Text) for [Page] page

- Migrate X text fields to Portable Text
- Add migration script
- Update [PageName]PageClient.tsx to use RichTextRenderer
- Update child components as needed"
git push origin main
```

### Step 6.3: Verify Deployment

- Check that page renders correctly
- Verify rich text displays properly
- Test editing in Sanity Studio

---

## SUB-AGENT TASK TEMPLATES

### Task 1: Audit Page for Rich Text Migration

```
TASK: Audit [PAGE NAME] page for rich text migration

INSTRUCTIONS:
1. Read the schema file: /sanity-test-sandbox/schemaTypes/singletons/[pageName]Page.ts
2. List all fields with type: 'text' that should support rich formatting
3. Skip fields that are titles, labels, or single-line values
4. Output a list of field names to migrate

EXPECTED OUTPUT:
- Field name list
- Any child components that receive these fields
```

### Task 2: Generate Migration Script

```
TASK: Generate migration script for [PAGE NAME] page

INPUTS:
- Fields to migrate: [list from Task 1]
- Document type: [pageName]Page

INSTRUCTIONS:
1. Use the template from RICH_TEXT_MIGRATION_PLAYBOOK.md
2. Replace placeholders with actual page name and fields
3. Save to: /sanity-hostinger-test/scripts/migrate-[pagename]-to-richtext.js

DO NOT RUN THE SCRIPT - just create it.
```

### Task 3: Update Components for Rich Text

```
TASK: Update [PAGE NAME] components to render rich text

INPUTS:
- Fields converted: [list]
- Main component: /sanity-hostinger-test/app/[page]/[PageName]PageClient.tsx
- Child components: [list if any]

INSTRUCTIONS:
1. Import RichTextRenderer at top of file
2. For each field, replace <p>{field}</p> with the Array.isArray pattern
3. Update child component interfaces to use union type
4. Keep fallback text for backwards compatibility

DO NOT change schema or run migrations - only update component rendering.
```

---

## COMPLETED MIGRATIONS

| Page | Fields Converted | Date | Notes |
|------|-----------------|------|-------|
| Offers | 2 (introText, description) | Dec 2024 | Ground zero - first implementation |
| Events | 18 (hero, gatherings, weddings, meetings, roomBlocks, takeover, venues) | Dec 2024 | Includes 5 venue section components |

---

## TROUBLESHOOTING

### "Invalid property value" in Sanity Studio

**Cause:** Schema changed before data was migrated.
**Fix:** Run migration script, or manually update field in Sanity Vision.

### RichTextRenderer shows nothing

**Cause:** Data is still a string, not an array.
**Fix:** Check Array.isArray() is working correctly, verify migration ran.

### Build fails with type errors

**Cause:** Interface doesn't match new data structure.
**Fix:** Update interface to use union type: `string | PortableTextBlock[]`

### "Unknown block type undefined" warning

**Cause:** Null/undefined data passed to RichTextRenderer.
**Impact:** Non-critical, just a warning. Fallback will render.
**Fix:** Ensure proper null checks before rendering.
