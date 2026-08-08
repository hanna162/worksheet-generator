import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace("model: 'gemini-2.5-pro'", "model: 'gemini-2.5-flash'");
content = content.replace("model: 'gemini-3.5-flash-lite'", "model: 'gemini-2.5-flash'");

fs.writeFileSync('server.ts', content, 'utf8');
