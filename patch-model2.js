import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');
content = content.replace(/model: 'gemini-1.5-pro'/g, "model: 'gemini-2.0-flash'");
fs.writeFileSync('server.ts', content, 'utf8');
console.log('Fixed model in server.ts to gemini-2.0-flash');
