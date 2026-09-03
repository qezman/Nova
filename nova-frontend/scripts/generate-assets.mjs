import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public");
const FRAMES_DIR = path.join(ROOT, "frames");
const IMAGES_DIR = path.join(ROOT, "images");

const TOTAL_FRAMES = 90;
const WIDTH = 960;
const HEIGHT = 720;

async function generateFrames() {
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const angle = ((i - 1) / TOTAL_FRAMES) * 360;
    const rad = (angle * Math.PI) / 180;

    const scaleX = Math.cos(rad);
    const perspectiveWidth = Math.max(12, Math.abs(scaleX) * 280);
    const sideDepth = Math.sin(rad) * 48;
    const isBackFacing = scaleX < 0;

    const cx = WIDTH / 2;
    const cy = HEIGHT / 2;

    const svg = `
      <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${WIDTH}" height="${HEIGHT}" fill="#0e0d0b"/>
        
        <defs>
          <radialGradient id="ambience" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#1f1e1a" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#0e0d0b" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2a2824"/>
            <stop offset="50%" stop-color="#191815"/>
            <stop offset="100%" stop-color="#13120f"/>
          </linearGradient>
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#555249"/>
            <stop offset="50%" stop-color="#2a2824"/>
            <stop offset="100%" stop-color="#13120f"/>
          </linearGradient>
        </defs>

        <ellipse cx="${cx}" cy="${cy + 180}" rx="240" ry="30" fill="black" opacity="0.4"/>
        <circle cx="${cx}" cy="${cy}" r="320" fill="url(#ambience)"/>

        <!-- Device body -->
        <g transform="translate(${cx}, ${cy})">
          <!-- Shadow side profile -->
          <rect
            x="${-perspectiveWidth / 2 + sideDepth * 0.3}"
            y="-180"
            width="${perspectiveWidth}"
            height="360"
            rx="56"
            fill="url(#rimGrad)"
            stroke="#3a3832"
            stroke-width="1.5"
          />

          <!-- Main face -->
          <rect
            x="${-perspectiveWidth / 2}"
            y="-176"
            width="${perspectiveWidth}"
            height="352"
            rx="52"
            fill="${isBackFacing ? "#151411" : "url(#bodyGrad)"}"
            stroke="#2e2c26"
            stroke-width="1"
          />

          <!-- Optical aperture or rear sensors -->
          ${
            !isBackFacing && perspectiveWidth > 60
              ? `
            <circle cx="0" cy="-60" r="${Math.min(32, perspectiveWidth * 0.22)}" fill="#0a0a08" stroke="#33312a" stroke-width="1.5"/>
            <circle cx="0" cy="-60" r="${Math.min(16, perspectiveWidth * 0.11)}" fill="#000" stroke="#d5451b" stroke-width="1.5" opacity="0.8"/>
            <circle cx="0" cy="50" r="${Math.min(24, perspectiveWidth * 0.16)}" fill="#0a0a08" stroke="#2a2822" stroke-width="1"/>
            <rect x="${-perspectiveWidth * 0.25}" y="110" width="${perspectiveWidth * 0.5}" height="2" fill="#5c5a52" opacity="0.5"/>
          `
              : ""
          }

          <!-- Subtle indicator dot -->
          <circle cx="${perspectiveWidth * 0.32}" cy="-140" r="2.5" fill="#ff5a2b" opacity="0.9"/>
        </g>
      </svg>
    `;

    const padIndex = String(i).padStart(3, "0");
    const outputPath = path.join(FRAMES_DIR, `frame_${padIndex}.webp`);
    await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(outputPath);
  }
}

async function generateProductImages() {
  const images = [
    {
      name: "hero-device.webp",
      bg: "#f4f2ee",
      svg: `
        <svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg">
          <rect width="1200" height="900" fill="#f4f2ee"/>
          <ellipse cx="680" cy="620" rx="360" ry="40" fill="#17160f" opacity="0.08"/>
          <g transform="translate(640, 420) rotate(-3)">
            <rect x="-170" y="-260" width="340" height="520" rx="64" fill="#17160f" stroke="rgba(23,22,15,0.2)" stroke-width="2"/>
            <rect x="-162" y="-252" width="324" height="504" rx="58" fill="#1e1d17"/>
            <circle cx="0" cy="-90" r="56" fill="#12110c" stroke="#333128" stroke-width="2"/>
            <circle cx="0" cy="-90" r="28" fill="#0c0b08" stroke="#d5451b" stroke-width="2"/>
            <circle cx="0" cy="80" r="38" fill="#12110c" stroke="#2c2a22" stroke-width="1.5"/>
            <circle cx="110" cy="-210" r="4" fill="#d5451b"/>
          </g>
        </svg>
      `,
    },
    {
      name: "feature-battery.webp",
      bg: "#f4f2ee",
      svg: `
        <svg width="900" height="700" viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
          <rect width="900" height="700" fill="#ffffff"/>
          <rect x="120" y="100" width="660" height="500" rx="0" fill="#f9f8f6" stroke="rgba(23,22,15,0.08)" stroke-width="1"/>
          <g transform="translate(450, 350)">
            <rect x="-180" y="-130" width="360" height="260" rx="8" fill="#17160f"/>
            <rect x="-160" y="-110" width="320" height="220" rx="4" fill="#24231c"/>
            <path d="M -110 0 L 110 0" stroke="#d5451b" stroke-width="2"/>
            <circle cx="0" cy="0" r="24" fill="#17160f" stroke="#d5451b" stroke-width="2"/>
            <text x="0" y="5" font-family="sans-serif" font-size="11" font-weight="500" fill="#f4f2ee" text-anchor="middle">18H</text>
          </g>
        </svg>
      `,
    },
    {
      name: "feature-haptics.webp",
      bg: "#f4f2ee",
      svg: `
        <svg width="900" height="700" viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
          <rect width="900" height="700" fill="#ffffff"/>
          <rect x="120" y="100" width="660" height="500" rx="0" fill="#f9f8f6" stroke="rgba(23,22,15,0.08)" stroke-width="1"/>
          <g transform="translate(450, 350)">
            <circle cx="0" cy="0" r="160" fill="none" stroke="rgba(23,22,15,0.08)" stroke-width="1"/>
            <circle cx="0" cy="0" r="120" fill="none" stroke="rgba(23,22,15,0.12)" stroke-width="1"/>
            <circle cx="0" cy="0" r="80" fill="none" stroke="#d5451b" stroke-width="1.5" stroke-dasharray="4 4"/>
            <circle cx="0" cy="0" r="44" fill="#17160f"/>
            <circle cx="0" cy="0" r="8" fill="#d5451b"/>
          </g>
        </svg>
      `,
    },
    {
      name: "feature-materials.webp",
      bg: "#f4f2ee",
      svg: `
        <svg width="900" height="700" viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
          <rect width="900" height="700" fill="#ffffff"/>
          <rect x="120" y="100" width="660" height="500" rx="0" fill="#f9f8f6" stroke="rgba(23,22,15,0.08)" stroke-width="1"/>
          <g transform="translate(450, 350)">
            <rect x="-180" y="-120" width="160" height="240" rx="2" fill="#2c2b26" stroke="#44423b" stroke-width="1"/>
            <rect x="20" y="-120" width="160" height="240" rx="2" fill="#1a1915" stroke="#33312a" stroke-width="1"/>
            <line x1="0" y1="-140" x2="0" y2="140" stroke="#d5451b" stroke-width="1.5"/>
          </g>
        </svg>
      `,
    },
  ];

  for (const img of images) {
    const out = path.join(IMAGES_DIR, img.name);
    await sharp(Buffer.from(img.svg)).webp({ quality: 90 }).toFile(out);
  }
}

async function run() {
  console.log("Generating 90 rotating frames...");
  await generateFrames();
  console.log("Generating product images...");
  await generateProductImages();
  console.log("Done.");
}

run().catch(console.error);
