import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');
content = content.replace("model: 'gemini-1.5-flash'", "model: 'gemini-3.6-flash'");
content = content.replace("model: 'gemini-2.5-flash'", "model: 'gemini-3.6-flash'");
content = content.replace("model: 'gemini-2.0-flash'", "model: 'gemini-3.6-flash'");
fs.writeFileSync('server.ts', content, 'utf8');
