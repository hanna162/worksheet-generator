import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');

const target1 = `SKEMA JAWAPAN: (jika diminta)`;
const rep1 = `SKEMA JAWAPAN: (jika diminta). WAJIB letakkan kod HTML ini \`<div class="page-break"></div>\` sebelum tajuk Skema Jawapan supaya ia bermula di muka surat baharu apabila dicetak.`;

const target2 = `PENTING UNTUK SUSUNAN SOALAN OBJEKTIF:`;
const rep2 = `PENTING UNTUK JARAK/SPACING ANTARA SOALAN:
- Sila pastikan ada JARAK YANG MENCUKUPI (spacing) antara soalan 1, soalan 2, dan seterusnya. Gunakan double spacing atau tag \`<br><br>\` di antara soalan jika perlu ruang jawapan.

PENTING UNTUK SUSUNAN SOALAN OBJEKTIF:`;

content = content.replace(target1, rep1);
content = content.replace(target2, rep2);

fs.writeFileSync('server.ts', content, 'utf8');
console.log('Fixed server.ts');
