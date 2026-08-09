import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `const data = await response.json();
      setWorksheet(data.result);`;
      
const replacement = `const data = await response.json();
      let rawResult = data.result;
      
      // Remove any markdown code blocks wrapping SVGs to ensure they render as HTML
      rawResult = rawResult.replace(/\\s*\`\`\`(?:html|xml|svg)?\\s*(<svg[\\s\\S]*?<\\/svg>)\\s*\`\`\`/gi, '\\n\\n$1\\n\\n');
      
      // Also, sometimes AI indents SVG lines with spaces causing them to become code blocks.
      // We can try to un-indent SVG blocks.
      const unindentSVG = (str) => {
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
      };
      
      rawResult = unindentSVG(rawResult);
      
      setWorksheet(rawResult);`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Fixed App.tsx parsing');
