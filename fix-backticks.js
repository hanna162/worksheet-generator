import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');

// Replace the unescaped backticks
content = content.replace(/seperti \`\`\`html atau \`\`\`xml/g, "seperti \\`\\`\\`html atau \\`\\`\\`xml");

fs.writeFileSync('server.ts', content, 'utf8');
console.log('Fixed backticks in server.ts');
