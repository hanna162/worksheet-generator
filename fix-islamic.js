import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const oldIslamicString = `PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:
- Bagi subjek Pendidikan Islam, WAJIB gunakan tulisan JAWI untuk soalan dan pilihan jawapan. Anda WAJIB menyertakan terjemahan tulisan RUMI di bahagian bawah soalan yang ditanya dan di bawah pilihan jawapan dengan saiz font yang lebih kecil (gunakan tag HTML <small> berserta condong).
- Untuk soalan Pendidikan Islam yang mengandungi ayat Al-Quran, MASUKKAN ayat Al-Quran yang betul beserta baris (harakat).
- Bagi subjek Bahasa Arab, WAJIB gunakan teks Arab sepenuhnya. JANGAN letak sebarang terjemahan Bahasa Melayu.`;

const newIslamicString = `PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:
- Bagi subjek Pendidikan Islam, anda WAJIB menyediakan soalan dalam DWIBAHASA (Jawi dan Rumi). Teks UTAMA bagi semua soalan dan pilihan jawapan WAJIB menggunakan tulisan JAWI (Bukan tulisan Rumi). Kemudian, anda WAJIB letakkan terjemahan RUMI (Bahasa Melayu) di bahagian bawah soalan yang ditanya dan juga di bawah setiap pilihan jawapan. Gunakan tag HTML <small> berserta condong untuk teks Rumi. Contoh:
  **سياڤاكه نبي كيت؟**
  *<small>(Siapakah nabi kita?)</small>*
  A. نبي محمد *<small>(Nabi Muhammad)</small>*
  B. نبي عيسى *<small>(Nabi Isa)</small>*
- Untuk soalan Pendidikan Islam yang mengandungi ayat Al-Quran, MASUKKAN ayat Al-Quran yang betul beserta baris (harakat).
- Bagi subjek Bahasa Arab, WAJIB gunakan teks Arab sepenuhnya. JANGAN letak sebarang terjemahan Bahasa Melayu.`;

content = content.replace(oldIslamicString, newIslamicString);

fs.writeFileSync('server.ts', content, 'utf8');
