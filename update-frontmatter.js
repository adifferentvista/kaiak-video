const fs = require('fs');
const path = require('path');

const POSTS_DIR = 'E:/App Projects/Kaiak/Kaiak-v4/kaiak-v4/content/posts';
const CSV_PATH = 'e:/kaiak-video/featured-image-data.csv';
const CUTOFF_DATE = '2026-02-13'; // Only update posts on or before this date

// Read CSV to get hook texts for imageAlt
const csvLines = fs.readFileSync(CSV_PATH, 'utf-8').trim().split('\n').slice(1);
const hookData = {};
for (const line of csvLines) {
  const match = line.match(/^([^,]+),"([^"]*)","([^"]*)","([^"]*)"$/);
  if (match) {
    hookData[match[1]] = { hookText: match[2], hookHighlight: match[3] };
  }
}

// Process each MDX file
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'));
let updated = 0;
let skipped = 0;

for (const file of files) {
  const slug = file.replace('.mdx', '');
  const filePath = path.join(POSTS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check if already has image field
  if (content.match(/^image:/m)) {
    console.log(`⏭ ${slug} — already has image`);
    skipped++;
    continue;
  }

  // Extract date from frontmatter
  const dateMatch = content.match(/^date:\s*"([^"]+)"/m);
  if (!dateMatch) {
    console.log(`⏭ ${slug} — no date found`);
    skipped++;
    continue;
  }

  const postDate = dateMatch[1];

  // Check if hook data exists
  const hook = hookData[slug];
  if (!hook) {
    console.log(`⏭ ${slug} — no hook data in CSV`);
    skipped++;
    continue;
  }

  const imageAlt = `Illustration for: ${hook.hookText} ${hook.hookHighlight}`;
  const imagePath = `/blog/headers/kaiak-${slug}.webp`;

  // Only mark as needing date changes if after cutoff
  const needsDateChange = postDate > CUTOFF_DATE;

  // Insert image and imageAlt after featured line (or after readTime if no featured)
  let newContent;
  if (content.match(/^featured:/m)) {
    newContent = content.replace(
      /^(featured:\s*.+)$/m,
      `$1\nimage: "${imagePath}"\nimageAlt: "${imageAlt.replace(/"/g, '\\"')}"`
    );
  } else if (content.match(/^readTime:/m)) {
    newContent = content.replace(
      /^(readTime:\s*.+)$/m,
      `$1\nimage: "${imagePath}"\nimageAlt: "${imageAlt.replace(/"/g, '\\"')}"`
    );
  } else {
    console.log(`⏭ ${slug} — can't find insertion point`);
    skipped++;
    continue;
  }

  fs.writeFileSync(filePath, newContent);
  const label = needsDateChange ? '(UNPUBLISHED — needs date update)' : '';
  console.log(`✓ ${slug} ${label}`);
  updated++;
}

console.log(`\nDone! ${updated} updated, ${skipped} skipped`);
