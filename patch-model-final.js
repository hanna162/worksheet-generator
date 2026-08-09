import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');
content = content.replace(/model: 'gemini-[^']+'/g, "model: 'gemini-flash-latest'");
fs.writeFileSync('server.ts', content, 'utf8');
console.log('Fixed model in server.ts to gemini-flash-latest');
