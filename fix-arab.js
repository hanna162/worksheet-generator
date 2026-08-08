import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const target = "Untuk Bahasa Arab, gunakan teks ARAB.";
const replacement = "Untuk Bahasa Arab, gunakan teks ARAB sebagai teks utama. (Sama seperti Pendidikan Islam).";
content = content.replace(target, replacement);

fs.writeFileSync('server.ts', content, 'utf8');
