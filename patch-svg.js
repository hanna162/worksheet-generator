import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');

const target = `- Output kod <svg> secara TERUS di dalam teks anda, ia akan dirender sebagai visual HTML.`;
const replacement = `- Output kod <svg> secara TERUS di dalam teks anda.
- AMARAN SVG: JANGAN letak kod <svg> di dalam blok kod (seperti \`\`\`html atau \`\`\`xml). 
- AMARAN SVG: JANGAN jarakkan (indent) kod <svg>. Tulis kod <svg> dan semua isinya rapat ke kiri (tanpa sebarang 'space' atau 'tab' di awal baris) supaya ia tidak ditafsir sebagai blok teks.`;

content = content.replace(target, replacement);
fs.writeFileSync('server.ts', content, 'utf8');
console.log('Fixed server.ts SVG prompt');
