import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const target = `PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:
- Bagi subjek Pendidikan Islam, HANYA gunakan tulisan RUMI (Bahasa Melayu) untuk teks biasa. JANGAN gunakan tulisan Jawi.
- Bagi subjek Bahasa Arab, anda WAJIB menyediakan soalan dalam teks ARAB sebagai teks utama, dan menyertakan terjemahan Bahasa Melayu (RUMI) di bahagian BAWAH setiap soalan dan di BAWAH setiap pilihan jawapan.
- Gunakan tag HTML <small> berserta condong untuk teks terjemahan Rumi.
- Susun secara baris baru dengan jarak (blank line) yang kemas.

Contoh susunan Dwibahasa bagi subjek Bahasa Arab yang BETUL:
1. **مَنْ هُوَ نَبِيُّنَا؟**
*<small>(Siapakah nabi kita?)</small>*

A) **نَبِيُّ مُحَمَّد**
*<small>(Nabi Muhammad)</small>*

B) **نَبِيُّ عِيسَى**
*<small>(Nabi Isa)</small>*

- AWAS: Untuk Pendidikan Islam yang mengandungi ayat Al-Quran atau Hadis, anda WAJIB menggunakan teks ARAB berserta baris yang lengkap. JANGAN sesekali merumikan ayat Al-Quran.`;

const replacement = `PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:
- Bagi subjek Pendidikan Islam, HANYA gunakan tulisan RUMI (Bahasa Melayu) untuk teks biasa. JANGAN gunakan tulisan Jawi.
- Bagi subjek Bahasa Arab, SOALAN KEMBALIKAN SEPERTI BIASA. Gunakan perkataan ARAB (berserta baris) HANYA pada bahagian yang perlu sahaja (contohnya perkataan yang diuji). JANGAN berikan terjemahan untuk pilihan jawapan. Jelas-jelas terus jawapan.
- AWAS: Untuk Pendidikan Islam yang mengandungi ayat Al-Quran atau Hadis, anda WAJIB menggunakan teks ARAB berserta baris yang lengkap. JANGAN sesekali merumikan ayat Al-Quran.`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('server.ts', content, 'utf8');
    console.log("Updated Bahasa Arab format successfully");
} else {
    console.log("Target string for Bahasa Arab not found.");
}

const visualTarget = `PENTING UNTUK VISUAL & GAMBARAJAH:
- KHAS UNTUK PRASEKOLAH / TAHUN 1 MATEMATIK: Gunakan emoji yang menarik (contoh: 🍎 🍎 + 🍎 = ?) untuk mewakili objek, JANGAN gunakan SVG untuk mengelakkan ralat kod yang rumit untuk soalan ringkas.
- JANGAN sesekali gunakan API imej luaran (seperti pollinations.ai) kerana gambar tidak relevan untuk soalan fakta / matematik.`;

const visualReplacement = `PENTING UNTUK VISUAL & GAMBARAJAH:
- KHAS UNTUK PRASEKOLAH / TAHUN 1 MATEMATIK / BAHASA ARAB: Gunakan emoji yang menarik dan TEPAT (contoh: 🍎, 👨‍👩‍👦, 🚗) untuk mewakili objek, JANGAN gunakan SVG untuk mengelakkan ralat kod yang rumit untuk soalan ringkas. Pastikan imej/emoji itu wujud, betul, dan padan dengan soalan (contohnya gambar ayah untuk soalan berkaitan ayah).
- JANGAN sesekali gunakan API imej luaran (seperti pollinations.ai) kerana gambar tidak relevan untuk soalan fakta / matematik.`;

if (content.includes(visualTarget)) {
    content = content.replace(visualTarget, visualReplacement);
    fs.writeFileSync('server.ts', content, 'utf8');
    console.log("Updated Visual format successfully");
} else {
    console.log("Target string for Visual not found.");
}

