import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf8');

// Replace Prasekolah
content = content.replace(
  "'Bahasa Cina': ['Kemahiran Mendengar dan Bertutur (Cina)', 'Kemahiran Membaca (Cina)', 'Kemahiran Menulis (Cina)']",
  "'Bahasa Cina': ['Kenal Huruf (认识字母)', 'Kenal Nombor (认识数字)', 'Kemahiran Mendengar dan Bertutur (Cina)', 'Kemahiran Membaca (Cina)', 'Kemahiran Menulis (Cina)']"
);

// Remove Tingkatan
content = content.replace(/\s*'Bahasa Cina': \['Kebudayaan \(文化\)', 'Kesusasteraan \(文学\)', 'Sejarah \(历史\)', 'Nilai Murni \(道德价值\)'\],/g, '');
content = content.replace(/\s*'Bahasa Cina': \['Alam Remaja \(青春期\)', 'Teknologi \(科技\)', 'Sukan dan Rekreasi \(运动与休闲\)'\],/g, '');
content = content.replace(/\s*'Bahasa Cina': \['Kerjaya \(职业\)', 'Sains dan Inovasi \(科学与创新\)', 'Kesihatan \(健康\)'\],/g, '');
content = content.replace(/\s*'Bahasa Cina': \['Pendidikan \(教育\)', 'Sastera Klasik \(古典文学\)', 'Isu Semasa \(时事\)'\],/g, '');
content = content.replace(/\s*'Bahasa Cina': \['Ekonomi \(经济\)', 'Politik \(政治\)', 'Masyarakat Global \(全球社会\)'\],/g, '');

fs.writeFileSync('src/data.ts', content, 'utf8');
