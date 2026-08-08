import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const oldFormatObjektifStart = "PENTING UNTUK SUSUNAN SOALAN OBJEKTIF:";
const oldFormatObjektifEnd = "PENTING UNTUK PANJANG LEMBARAN KERJA:";
const startIndex = content.indexOf(oldFormatObjektifStart);
const endIndex = content.indexOf(oldFormatObjektifEnd);

if(startIndex !== -1 && endIndex !== -1) {
  const newFormatObjektif = `PENTING UNTUK SUSUNAN SOALAN OBJEKTIF:
- WAJIB letakkan setiap pilihan jawapan (A, B, C, D dll) di baris yang baharu (new line) di bawah soalan yang ditanya. Gunakan format A), B), C), D).
- JANGAN letakkan pilihan jawapan sebaris dengan soalan atau sebaris antara satu sama lain.
- Pastikan ada SATU BARIS KOSONG (blank line) di antara soalan dan setiap pilihan jawapan supaya lebih kemas.

Contoh susunan yang BETUL:
1. Apakah nama ibu negara Malaysia?

A) Kuala Lumpur

B) Putrajaya

C) Johor Bahru

`;
  content = content.substring(0, startIndex) + newFormatObjektif + content.substring(endIndex);
}

const oldIslamicStart = "PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:";
const oldIslamicEnd = "PENTING UNTUK MATEMATIK & SIMBOL";
const islamicStartIdx = content.indexOf(oldIslamicStart);
const islamicEndIdx = content.indexOf(oldIslamicEnd);

if(islamicStartIdx !== -1 && islamicEndIdx !== -1) {
  const newIslamic = `PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:
- Bagi subjek Pendidikan Islam DAN Bahasa Arab, anda WAJIB menyediakan soalan dalam DWIBAHASA.
- Teks UTAMA bagi Pendidikan Islam WAJIB menggunakan tulisan JAWI yang TEPAT tanpa campur Rumi/Asing. Untuk Bahasa Arab, gunakan teks ARAB.
- Anda WAJIB menyertakan terjemahan Bahasa Melayu (RUMI) di bahagian BAWAH setiap soalan dan di BAWAH setiap pilihan jawapan.
- Gunakan tag HTML <small> berserta condong untuk teks terjemahan Rumi.
- Susun secara baris baru dengan jarak (blank line) yang kemas.

Contoh susunan Dwibahasa yang BETUL:
1. **سياڤاكه نبي كيت؟**
*<small>(Siapakah nabi kita?)</small>*

A) **نبي محمد**
*<small>(Nabi Muhammad)</small>*

B) **نبي عيسى**
*<small>(Nabi Isa)</small>*

- Untuk Pendidikan Islam yang mengandungi ayat Al-Quran, MASUKKAN ayat Al-Quran berserta baris.

`;
  content = content.substring(0, islamicStartIdx) + newIslamic + content.substring(islamicEndIdx);
}

fs.writeFileSync('server.ts', content, 'utf8');
