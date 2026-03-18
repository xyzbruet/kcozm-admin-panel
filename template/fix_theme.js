const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'pages', 'ui-features');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Font unification
  content = content.replace(/family=Syne:wght@600;700;800/g, 'family=Cormorant+Garamond:wght@500;600;700');
  content = content.replace(/font-family:\s*'Syne'\s*,\s*sans-serif/g, "font-family:'Cormorant Garamond',serif");

  // CSS Variable Definitions unification (Pink -> Gold)
  content = content.replace(/--pink:#e91e63/g, '--gold:#c8a040');
  content = content.replace(/--pink-dark:#c2185b/g, '--gold-dk:#a07828');
  content = content.replace(/--pink-soft:#fce4ec/g, '--gold-lt:#fdf6e4');
  content = content.replace(/--pink-glow:rgba\(233,30,99,\.13\)/g, '--gold-glow:rgba(200,160,64,.15)');

  // CSS Variable Usage Unification
  content = content.replace(/var\(--pink\)/g, 'var(--gold)');
  content = content.replace(/var\(--pink-dark\)/g, 'var(--gold-dk)');
  content = content.replace(/var\(--pink-soft\)/g, 'var(--gold-lt)');
  content = content.replace(/var\(--pink-glow\)/g, 'var(--gold-glow)');

  // Replace Hex Codes and RGBA to simulate "Appointments" Gold hover shadows and backgrounds
  content = content.replace(/rgba\(233,30,99,(\.[0-9]+)\)/g, 'rgba(200,160,64,$1)');
  
  // Fix specific hardcoded pink linear-gradients if any exist in elements
  // The contact_admin.html has a pv-hero background: linear-gradient(135deg,#1a1a2e 0%,#2d1b4e 52%,#c2185b 100%)
  content = content.replace(/#c2185b\s*100%/g, '#a07828 100%');
  
  // Fix ink body font color definitions matching appointments
  // contact_admin defines --ink:#1a1a2e; but appointments defines --ink:#1a1410
  // leaving ink variables alone is fine, but font-family Syne -> Cormorant is most important

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log(`Successfully processed ${files.length} UI-feature HTML pages for consistency!`);
