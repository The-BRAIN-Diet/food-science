const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateSocialCard() {
  const width = 1200;
  const height = 630;
  const outputPath = path.join(__dirname, '../static/img/brain-diet-social-card.jpg');
  const logoPath = path.join(__dirname, '../static/site-icon/white.png');

  // Check if logo exists
  if (!fs.existsSync(logoPath)) {
    console.error('Logo file not found:', logoPath);
    process.exit(1);
  }

  try {
    // Create a gradient background (light grey to match the site)
    const background = sharp({
      create: {
        width,
        height,
        channels: 3,
        background: { r: 209, g: 213, b: 219 } // #d1d5db - light grey from hero banner
      }
    });

    // Load and resize logo
    const logo = await sharp(logoPath)
      .resize(400, 400, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer();

    // Create SVG for text
    const textSvg = `
      <svg width="${width}" height="${height}">
        <text
          x="${width / 2}"
          y="${height / 2 + 250}"
          font-family="Arial, sans-serif"
          font-size="32"
          font-weight="bold"
          fill="#1a1a1a"
          text-anchor="middle"
        >The BRAIN Diet</text>
        <text
          x="${width / 2}"
          y="${height / 2 + 290}"
          font-family="Arial, sans-serif"
          font-size="20"
          fill="#4a4a4a"
          text-anchor="middle"
        >Bio Regulation Algorithm and Integrated Neuronutrition</text>
      </svg>
    `;

    // Composite everything together
    await background
      .composite([
        {
          input: logo,
          top: Math.round((height - 400) / 2) - 50,
          left: Math.round((width - 400) / 2)
        },
        {
          input: Buffer.from(textSvg),
          top: 0,
          left: 0
        }
      ])
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log(`Social card generated successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating social card:', error);
    process.exit(1);
  }
}

generateSocialCard();
