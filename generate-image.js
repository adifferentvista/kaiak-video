const fs = require('fs');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error('Missing GOOGLE_API_KEY in .env file');
  process.exit(1);
}

async function generateImage(prompt, outputPath) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;

  const body = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: "16:9",
    }
  };

  console.log('Generating image with Imagen 4 (16:9)...');
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error(`API error: ${response.status}`, err.slice(0, 500));
    return false;
  }

  const data = await response.json();

  if (data.predictions && data.predictions[0]) {
    const imageData = data.predictions[0].bytesBase64Encoded;
    const buffer = Buffer.from(imageData, 'base64');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved to ${outputPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
    return true;
  } else {
    console.error('No predictions in response');
    return false;
  }
}

const prompt = process.argv[2];
const output = process.argv[3] || 'out/test-image.png';

if (!prompt) {
  console.error('Usage: node generate-image.js "prompt" output.png');
  process.exit(1);
}

generateImage(prompt, output);
