import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');

const oldTarget = `SKEMA JAWAPAN: (jika diminta). WAJIB letakkan kod HTML ini <div class=\\"page-break\\"></div> sebelum tajuk Skema Jawapan supaya ia bermula di muka surat baharu apabila dicetak.`;

const newTarget = `SKEMA JAWAPAN: (jika diminta). WAJIB asingkan Skema Jawapan dari soalan menggunakan pemisah muka surat. Letakkan kod HTML <div class="page-break"></div> secara TERUS (jangan jadikan teks code block) betul-betul SEBELUM tajuk Skema Jawapan supaya skema dicetak di muka surat baharu apabila di-export ke PDF.`;

content = content.replace(oldTarget, newTarget);

fs.writeFileSync('server.ts', content, 'utf8');
console.log('Fixed server.ts again');
