import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const oldIslamicStart = "PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:";
const oldIslamicEnd = "PENTING UNTUK MATEMATIK & SIMBOL";
const islamicStartIdx = content.indexOf(oldIslamicStart);
const islamicEndIdx = content.indexOf(oldIslamicEnd);

if(islamicStartIdx !== -1 && islamicEndIdx !== -1) {
  const newIslamic = `PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:
- Bagi subjek Pendidikan Islam DAN Bahasa Arab, anda WAJIB menyediakan soalan dalam DWIBAHASA.
- Teks UTAMA bagi Pendidikan Islam WAJIB menggunakan tulisan JAWI yang TEPAT tanpa campur Rumi/Asing. Untuk Bahasa Arab, gunakan teks ARAB.
- AWAS: JANGAN SESEKALI MENGGUNAKAN SIMBOL ATAU HURUF CINA/ASING DALAM TULISAN JAWI. PASTIKAN EJAAN JAWI BETUL-BETUL TEPAT BERDASARKAN DEWAN BAHASA PUSTAKA (DBP).
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

// Decrease temperature for more accurate spelling
content = content.replace("temperature: 0.7", "temperature: 0.2");
// Use a better model for Jawi if possible (I'll stick to flash-lite, maybe try gemini-2.5-flash)
content = content.replace("gemini-3.5-flash-lite", "gemini-2.5-flash");

fs.writeFileSync('server.ts', content, 'utf8');
