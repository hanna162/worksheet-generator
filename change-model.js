import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace("model: 'gemini-2.5-flash'", "model: 'gemini-3.5-flash-lite'");
content = content.replace("temperature: 0.2", "temperature: 0.7");

fs.writeFileSync('server.ts', content, 'utf8');
