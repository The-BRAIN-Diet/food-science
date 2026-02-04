const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateSocialCard() {
  const width = 1200;
  const height = 630;
  const outputPath = path.join(__dirname, '../static/img/brain-diet-social-card.jpg');
  const logoSvgPath = path.join(__dirname, '../static/site-icon/white.svg');
  const logoPngPath = path.join(__dirname, '../static/site-icon/white.png');

  // Try SVG first (no background), fallback to PNG
  let logoPath = logoSvgPath;
  if (!fs.existsSync(logoPath)) {
    logoPath = logoPngPath;
  }

  // Check if logo exists
  if (!fs.existsSync(logoPath)) {
    console.error('Logo file not found:', logoPath);
    process.exit(1);
  }

  try {
    // Create a black background
    const background = sharp({
      create: {
        width,
        height,
        channels: 3,
        background: { r: 0, g: 0, b: 0 } // Black background
      }
    });

    // Load and resize logo - if PNG, remove grey background by making it transparent
    let logo;
    if (logoPath.endsWith('.svg')) {
      // SVG should have transparent background
      logo = await sharp(logoPath)
        .resize(400, 400, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();
    } else {
      // For PNG, use composite to remove grey background
      // First, create a mask to identify grey pixels and make them transparent
      const logoData = await sharp(logoPath)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      
      // Process pixels to make grey background transparent
      const pixels = logoData.data;
      const { width: logoWidth, height: logoHeight } = logoData.info;
      
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        // If pixel is grey-ish (similar RGB values around 200-220), make it transparent
        if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && r > 180 && r < 240) {
          pixels[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }
      
      logo = await sharp(Buffer.from(pixels), {
        raw: {
          width: logoWidth,
          height: logoHeight,
          channels: 4
        }
      })
        .resize(400, 400, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();
    }

    // Create SVG for text (white text for black background)
    const textSvg = `
      <svg width="${width}" height="${height}">
        <text
          x="${width / 2}"
          y="${height / 2 + 250}"
          font-family="Arial, sans-serif"
          font-size="32"
          font-weight="bold"
          fill="#ffffff"
          text-anchor="middle"
        >The BRAIN Diet</text>
        <text
          x="${width / 2}"
          y="${height / 2 + 290}"
          font-family="Arial, sans-serif"
          font-size="20"
          fill="#e0e0e0"
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
