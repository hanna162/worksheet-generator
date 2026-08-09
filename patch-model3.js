import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');
content = content.replace(/model: 'gemini-[^']+'/g, "model: 'gemini-2.5-flash-lite'");
fs.writeFileSync('server.ts', content, 'utf8');
console.log('Fixed model in server.ts to gemini-2.5-flash-lite');
