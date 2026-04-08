const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const WIDTH = 1280;
const HEIGHT = 720;
const BG_COLOR = '#F5F0E8';
const TEXT_COLOR_NAVY = '#0F172A';
const TEXT_COLOR_ORANGE = '#EA580C';
const LEFT_PADDING = 64;
const TEXT_ZONE_WIDTH = Math.floor(WIDTH * 0.55); // 704px
const IMAGE_ZONE_START = TEXT_ZONE_WIDTH;
const IMAGE_ZONE_WIDTH = WIDTH - TEXT_ZONE_WIDTH; // 576px
const IMAGE_PADDING = 12;

function createTextSVG(hookText, hookHighlight, fontSize = 72) {
  // Word wrap function
  function wrapText(text, maxCharsPerLine) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
      if ((currentLine + ' ' + word).trim().length > maxCharsPerLine) {
        if (currentLine) lines.push(currentLine.trim());
        currentLine = word;
      } else {
        currentLine = (currentLine + ' ' + word).trim();
      }
    }
    if (currentLine) lines.push(currentLine.trim());
    return lines;
  }

  const maxChars = Math.floor((TEXT_ZONE_WIDTH - LEFT_PADDING - 40) / (fontSize * 0.52));
  const hookLines = wrapText(hookText, maxChars);
  const highlightLines = hookHighlight ? wrapText(hookHighlight, maxChars) : [];

  const lineHeight = fontSize * 1.15;
  const totalLines = hookLines.length + highlightLines.length;
  const totalTextHeight = totalLines * lineHeight;
  const startY = (HEIGHT - totalTextHeight) / 2 + fontSize;

  let textElements = '';

  // Hook text lines (navy, bold)
  hookLines.forEach((line, i) => {
    const y = startY + i * lineHeight;
    // Escape special XML characters
    const escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    textElements += `<text x="${LEFT_PADDING}" y="${y}"
      font-family="Playfair Display, Georgia, serif"
      font-size="${fontSize}"
      font-weight="900"
      fill="${TEXT_COLOR_NAVY}">${escaped}</text>\n`;
  });

  // Highlight text lines (orange, bold italic)
  highlightLines.forEach((line, i) => {
    const y = startY + (hookLines.length + i) * lineHeight;
    const escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    textElements += `<text x="${LEFT_PADDING}" y="${y}"
      font-family="Playfair Display, Georgia, serif"
      font-size="${fontSize}"
      font-weight="900"
      font-style="italic"
      fill="${TEXT_COLOR_ORANGE}">${escaped}</text>\n`;
  });

  return `<svg width="${TEXT_ZONE_WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    ${textElements}
  </svg>`;
}

async function compositeImage(hookText, hookHighlight, imagePath, outputPath) {
  // Create base canvas with background color
  const base = sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 3,
      background: BG_COLOR,
    }
  }).png();

  // Load, trim whitespace, then resize the illustration
  const maxImageWidth = IMAGE_ZONE_WIDTH - (IMAGE_PADDING * 2);
  const maxImageHeight = HEIGHT - (IMAGE_PADDING * 2);

  // Trim surrounding whitespace/cream background first
  const trimmed = await sharp(imagePath)
    .trim({ threshold: 30 })
    .toBuffer();

  const resized = await sharp(trimmed)
    .resize(maxImageWidth, maxImageHeight, { fit: 'inside', withoutEnlargement: true })
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Replace near-cream background pixels with exact #F5F0E8
  // Target: R=245, G=240, B=232
  const { data, info } = resized;
  const channels = info.channels;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    // If pixel is close to any cream/beige/yellow background shade
    if (r > 210 && g > 200 && b > 180 &&
        Math.abs(r - g) < 35 && Math.abs(g - b) < 35) {
      data[i] = 245;     // R
      data[i + 1] = 240; // G
      data[i + 2] = 232; // B
    }
  }

  const illustration = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels }
  })
    .png()
    .toBuffer();

  const illustrationMeta = await sharp(illustration).metadata();

  // Center the illustration in the right zone
  const imgLeft = IMAGE_ZONE_START + Math.floor((IMAGE_ZONE_WIDTH - illustrationMeta.width) / 2);
  const imgTop = Math.floor((HEIGHT - illustrationMeta.height) / 2);

  // Create text overlay as SVG
  const textSvg = createTextSVG(hookText, hookHighlight);
  const textBuffer = Buffer.from(textSvg);

  // Composite everything
  const result = await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 3,
      background: BG_COLOR,
    }
  })
    .composite([
      { input: illustration, left: imgLeft, top: imgTop },
      { input: textBuffer, left: 0, top: 0 },
    ])
    .webp({ quality: 85 })
    .toBuffer();

  fs.writeFileSync(outputPath, result);
  console.log(`✓ ${path.basename(outputPath)} (${(result.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  const csvPath = path.join(__dirname, 'featured-image-data.csv');
  const imagesDir = path.join(__dirname, 'public', 'blog', 'images');
  const outputDir = path.join(__dirname, 'out', 'featured');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const csv = fs.readFileSync(csvPath, 'utf-8');
  const lines = csv.trim().split('\n').slice(1); // skip header

  console.log(`Compositing ${lines.length} featured images...\n`);

  let count = 0;
  for (const line of lines) {
    // Parse CSV line (handles quoted fields with commas)
    const match = line.match(/^([^,]+),"([^"]*)","([^"]*)","([^"]*)"$/);
    if (!match) {
      console.log(`⚠ Skipping malformed line: ${line.slice(0, 50)}...`);
      continue;
    }

    const [, slug, hookText, hookHighlight, imageFile] = match;
    const imagePath = path.join(imagesDir, imageFile);
    const outputPath = path.join(outputDir, `kaiak-${slug}.webp`);

    if (!fs.existsSync(imagePath)) {
      console.log(`⚠ Missing image: ${imageFile}`);
      continue;
    }

    try {
      await compositeImage(hookText, hookHighlight, imagePath, outputPath);
      count++;
    } catch (err) {
      console.log(`✗ ${slug}: ${err.message}`);
    }
  }

  console.log(`\nDone! ${count}/${lines.length} images composited to out/featured/`);
}

main();
