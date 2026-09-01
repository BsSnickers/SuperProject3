const fs = require('fs');
const execSync = require('child_process').execSync;

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 480" width="1100" height="480">
  <defs>
    <!-- Text Gradient: Orange -> Pink -> Purple -> Blue -->
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F25332" />
      <stop offset="22%" stop-color="#E91E63" />
      <stop offset="48%" stop-color="#9C27B0" />
      <stop offset="72%" stop-color="#673AB7" />
      <stop offset="100%" stop-color="#3F51B5" />
    </linearGradient>

    <!-- Cap Gradient: Gold -> Orange -> Crimson -->
    <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFC107" />
      <stop offset="40%" stop-color="#FF5722" />
      <stop offset="100%" stop-color="#E91E63" />
    </linearGradient>

    <!-- Head Profile Gradient: Purple -> Indigo -> Blue -->
    <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9C27B0" />
      <stop offset="50%" stop-color="#673AB7" />
      <stop offset="100%" stop-color="#3F51B5" />
    </linearGradient>
  </defs>

  <g id="logo-group">
    <!-- DELFI Text -->
    <text x="0" y="430" font-family="'Trebuchet MS', 'Arial Black', sans-serif" font-weight="900" font-size="320" letter-spacing="12" fill="url(#textGrad)">DELFI</text>

    <!-- Cap & Head Profile SVG Paths -->
    <g transform="translate(430, -20)">
      <!-- Mortarboard Cap Top -->
      <polygon points="40,165 240,15 520,30 200,195" fill="url(#capGrad)" />
      
      <!-- Head Profile facing right -->
      <path d="M 200,195
               C 240,135 340,115 420,125
               C 470,130 520,150 535,200
               C 545,230 525,270 550,290
               C 560,295 550,310 545,320
               C 540,330 545,340 540,350
               C 525,360 530,380 480,400
               C 450,410 400,415 370,470
               L 420,470
               C 450,430 480,405 490,375
               C 505,355 500,340 495,330
               C 510,310 525,290 515,250
               C 500,195 460,165 410,160
               C 340,155 250,170 200,195 Z" fill="url(#headGrad)" />
    </g>
  </g>
</svg>`;

fs.mkdirSync('public', { recursive: true });
fs.mkdirSync('src/assets', { recursive: true });

fs.writeFileSync('public/logo.svg', svgContent);
fs.writeFileSync('src/assets/logo.svg', svgContent);

console.log('SVG created. Converting to PNG using ImageMagick...');
try {
  execSync('convert -background none public/logo.svg public/logo.png');
  execSync('convert -background none src/assets/logo.svg src/assets/logo.png');
  console.log('PNG successfully created!');
} catch(err) {
  console.error('Convert error:', err.message);
}
