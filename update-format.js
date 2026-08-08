import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const oldFormatString = `[Arahan kepada murid]

[Soalan-soalan berserta arahan]`;

const newFormatString = `[Arahan kepada murid]

[Soalan-soalan berserta arahan]

PENTING UNTUK SUSUNAN SOALAN OBJEKTIF:
- WAJIB letakkan setiap pilihan jawapan (A, B, C, D) di baris yang baharu (new line) di bawah soalan yang ditanya.
- JANGAN letakkan pilihan jawapan sebaris dengan soalan atau sebaris antara satu sama lain.
Contoh susunan yang BETUL:
1. Soalan ditanya di sini?
A. Jawapan 1
B. Jawapan 2
C. Jawapan 3

PENTING UNTUK PANJANG LEMBARAN KERJA:
- Panjang lembaran kerja TIDAK terhad kepada 1 muka surat. Jana jumlah soalan yang diminta sepenuhnya walaupun jawapannya panjang dan melebihi satu muka surat. Asalkan format output betul, panjang tidak menjadi masalah.`;

content = content.replace(oldFormatString, newFormatString);

fs.writeFileSync('server.ts', content, 'utf8');
