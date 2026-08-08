const fs = require('fs');

const path = 'src/data.ts';
let content = fs.readFileSync(path, 'utf8');

// Update Prasekolah
content = content.replace(
  /'Bahasa Cina': \\['Kemahiran Mendengar dan Bertutur \\(Cina\\)', 'Kemahiran Membaca \\(Cina\\)', 'Kemahiran Menulis \\(Cina\\)'\\],/,
  "'Bahasa Cina': ['Kenal Huruf (认识字母)', 'Kenal Nombor (认识数字)', 'Kemahiran Mendengar dan Bertutur (Cina)', 'Kemahiran Membaca (Cina)', 'Kemahiran Menulis (Cina)'],"
);

// Remove Bahasa Cina from Tingkatan
const tingkatanLevels = [
  'Tingkatan 1 (KSSM)',
  'Tingkatan 2 (KSSM)',
  'Tingkatan 3 (KSSM)',
  'Tingkatan 4 (KSSM)',
  'Tingkatan 5 (KSSM)'
];

for (const level of tingkatanLevels) {
    const levelRegex = new RegExp(`('${level.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}':\\s*\\{[\\s\\S]*?)\\s*'Bahasa Cina':\\s*\\[[^\\]]*\\],\\s*\\n`, 'g');
    content = content.replace(levelRegex, '$1');
}

fs.writeFileSync(path, content, 'utf8');
console.log('Done modifying data.ts 4');
