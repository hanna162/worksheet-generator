import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf8');

// Replace Prasekolah
content = content.replace(
  /'Bahasa Cina': \\['Kemahiran Mendengar dan Bertutur \\(Cina\\)', 'Kemahiran Membaca \\(Cina\\)', 'Kemahiran Menulis \\(Cina\\)'\\],/g,
  "'Bahasa Cina': ['Kenal Huruf (认识字母)', 'Kenal Nombor (认识数字)', 'Kemahiran Mendengar dan Bertutur (Cina)', 'Kemahiran Membaca (Cina)', 'Kemahiran Menulis (Cina)'],"
);

// We need to delete Tingkatan Bahasa Cina.
const tingkatanLevels = [
  'Tingkatan 1 (KSSM)',
  'Tingkatan 2 (KSSM)',
  'Tingkatan 3 (KSSM)',
  'Tingkatan 4 (KSSM)',
  'Tingkatan 5 (KSSM)'
];

for (const level of tingkatanLevels) {
    const levelIndex = content.indexOf(`'${level}'`);
    if (levelIndex !== -1) {
        const nextLevelIndex = content.indexOf('Tingkatan', levelIndex + 20) !== -1 ? content.indexOf('Tingkatan', levelIndex + 20) : content.length;
        const levelChunk = content.substring(levelIndex, nextLevelIndex);
        
        const newLevelChunk = levelChunk.replace(/\\s*'Bahasa Cina': \\[[^\\]]*\\],/g, '');
        content = content.substring(0, levelIndex) + newLevelChunk + content.substring(nextLevelIndex);
    }
}

fs.writeFileSync('src/data.ts', content, 'utf8');
