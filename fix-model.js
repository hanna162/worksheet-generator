import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace("model: 'gemini-3.5-flash-lite'", "model: 'gemini-2.5-pro'");
content = content.replace("temperature: 0.7", "temperature: 0.2");

fs.writeFileSync('server.ts', content, 'utf8');
