import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const target = `PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:
- Bagi subjek Pendidikan Islam, HANYA gunakan tulisan RUMI (Bahasa Melayu). JANGAN gunakan tulisan Jawi.
- Bagi subjek Bahasa Arab, anda WAJIB menyediakan soalan dalam teks ARAB dan menyertakan terjemahan Bahasa Melayu (RUMI) di bahagian BAWAH setiap soalan dan di BAWAH setiap pilihan jawapan. Gunakan tag HTML <small> berserta condong untuk teks terjemahan Rumi.
- Untuk Pendidikan Islam yang mengandungi ayat Al-Quran, MASUKKAN ayat Al-Quran berserta baris.`;

const replacement = `PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:
- Bagi subjek Pendidikan Islam, HANYA gunakan tulisan RUMI (Bahasa Melayu) untuk teks biasa. JANGAN gunakan tulisan Jawi.
- Bagi subjek Bahasa Arab, anda WAJIB menyediakan soalan dalam teks ARAB dan menyertakan terjemahan Bahasa Melayu (RUMI) di bahagian BAWAH setiap soalan dan di BAWAH setiap pilihan jawapan. Gunakan tag HTML <small> berserta condong untuk teks terjemahan Rumi.
- AWAS: Untuk Pendidikan Islam yang mengandungi ayat Al-Quran atau Hadis, anda WAJIB menggunakan teks ARAB berserta baris yang lengkap. JANGAN sesekali merumikan ayat Al-Quran.`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('server.ts', content, 'utf8');
    console.log("Updated server.ts successfully");
} else {
    console.log("Target string not found. Please check exact match.");
}
