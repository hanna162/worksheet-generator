import fs from 'fs';

let serverContent = fs.readFileSync('server.ts', 'utf8');

const oldIslamicStart = "PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:";
const oldIslamicEnd = "PENTING UNTUK MATEMATIK & SIMBOL";
const islamicStartIdx = serverContent.indexOf(oldIslamicStart);
const islamicEndIdx = serverContent.indexOf(oldIslamicEnd);

if(islamicStartIdx !== -1 && islamicEndIdx !== -1) {
  const newIslamic = `PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:
- Bagi subjek Pendidikan Islam, HANYA gunakan tulisan RUMI (Bahasa Melayu). JANGAN gunakan tulisan Jawi.
- Bagi subjek Bahasa Arab, anda WAJIB menyediakan soalan dalam teks ARAB dan menyertakan terjemahan Bahasa Melayu (RUMI) di bahagian BAWAH setiap soalan dan di BAWAH setiap pilihan jawapan. Gunakan tag HTML <small> berserta condong untuk teks terjemahan Rumi.
- Untuk Pendidikan Islam yang mengandungi ayat Al-Quran, MASUKKAN ayat Al-Quran berserta baris.

`;
  serverContent = serverContent.substring(0, islamicStartIdx) + newIslamic + serverContent.substring(islamicEndIdx);
}

fs.writeFileSync('server.ts', serverContent, 'utf8');

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace("const isRtl = currentSubject === 'Pendidikan Islam' || currentSubject === 'Bahasa Arab';", "const isRtl = currentSubject === 'Bahasa Arab';");
fs.writeFileSync('src/App.tsx', appContent, 'utf8');

