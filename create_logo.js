const fs = require('fs');
const execSync = require('child_process').execSync;

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 480" width="1000" height="480">
  <defs>
    <!-- Text Gradient: Orange -> Pink -> Purple -> Blue -->
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F35637" />
      <stop offset="22%" stop-color="#E62562" />
      <stop offset="48%" stop-color="#9C3A9B" />
      <stop offset="72%" stop-color="#5558B6" />
      <stop offset="100%" stop-color="#3B7EC7" />
    </linearGradient>

    <!-- Cap Gradient: Yellow -> Orange -> Crimson -->
    <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2B705" />
      <stop offset="40%" stop-color="#E84338" />
      <stop offset="100%" stop-color="#B2185B" />
    </linearGradient>

    <!-- Head Profile Gradient: Violet -> Indigo -> Blue -->
    <linearGradient id="headGrad" x1="20%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#804192" />
      <stop offset="50%" stop-color="#4B56B2" />
      <stop offset="100%" stop-color="#2D72C0" />
    </linearGradient>
  </defs>

  <g id="logo-group">
    <!-- DELFI Text -->
    <text x="0" y="440" font-family="'Trebuchet MS', 'Arial Black', sans-serif" font-weight="900" font-size="310" letter-spacing="10" fill="url(#textGrad)">DELFI</text>

    <!-- Mortarboard Cap -->
    <!-- Diamond Cap Top -->
    <path d="M 620,20 L 890,20 Q 910,21 890,32 L 610,190 Q 595,200 605,185 Z" fill="url(#capGrad)" />
    <!-- Tilted Top Board -->
    <polygon points="440,160 650,15 890,22 570,195" fill="url(#capGrad)" />

    <!-- Head & Cap Profile -->
    <path d="M 570,190 
             C 610,130 720,110 820,120 
             C 870,125 930,150 950,200 
             C 970,240 940,290 980,300 
             C 1000,305 980,325 980,340 
             C 980,350 990,360 980,370 
             C 960,380 970,410 900,420 
             C 870,425 810,430 780,480 
             L 860,480 
             C 890,440 910,410 900,380 
             C 920,360 920,340 910,325 
             C 930,300 950,280 940,240 
             C 920,180 870,150 810,145 
             C 740,140 640,160 570,190 Z" fill="url(#headGrad)" />
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
  console.log('PNG successfully created at public/logo.png and src/assets/logo.png');
} catch(err) {
  console.error('Convert failed:', err.message);
}
