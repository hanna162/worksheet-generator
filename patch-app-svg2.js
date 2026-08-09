import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `      const unindentSVG = (str) => {
        let inSVG = false;
        return str.split('\\n').map(line => {
          if (line.includes('<svg')) inSVG = true;
          let result = line;
          if (inSVG) {
            result = line.trimStart();
          }
          if (line.includes('</svg>')) inSVG = false;
          return result;
        }).join('\\n');
      };`;

const replacement = `      const unindentSVG = (str) => {
        let inSVG = false;
        // First pass: remove empty lines inside SVG
        const lines = str.split('\\n').filter(line => {
          if (line.includes('<svg')) inSVG = true;
          if (inSVG && line.trim() === '') return false;
          if (line.includes('</svg>')) inSVG = false;
          return true;
        });
        
        inSVG = false;
        return lines.map(line => {
          if (line.includes('<svg')) inSVG = true;
          let result = line;
          if (inSVG) {
            result = line.trimStart();
            // Remove inline HTML comments which can mess up Markdown parsers
            result = result.replace(/<!--[\\s\\S]*?-->/g, '');
          }
          if (line.includes('</svg>')) inSVG = false;
          return result;
        }).join('\\n');
      };`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Fixed App.tsx unindentSVG');
