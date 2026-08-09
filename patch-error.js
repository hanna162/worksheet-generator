import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');

const target = `    if (error.message?.includes('429') || error.message?.includes('quota')) {
      errorMessage = "Kouta penggunaan AI percuma telah habis atau terlalu banyak permintaan serentak. Sila tunggu sebentar dan cuba lagi dalam masa satu minit.";
    } else if (error.message?.includes('503') || error.message?.includes('UNAVAILABLE')) {
      errorMessage = "Sistem AI sedang mengalami trafik tinggi (High Demand). Sila cuba sebentar lagi.";
    }`;

const replacement = `    const errStr = (error.message || error.toString() || JSON.stringify(error)).toLowerCase();
    if (errStr.includes('429') || errStr.includes('quota') || errStr.includes('resource_exhausted')) {
      errorMessage = "Kouta penggunaan AI percuma telah habis atau terlalu banyak permintaan serentak. Sila tunggu seketika (sekitar 1-2 minit) dan cuba lagi.";
    } else if (errStr.includes('503') || errStr.includes('unavailable') || errStr.includes('overloaded')) {
      errorMessage = "Sistem AI sedang mengalami trafik tinggi (High Demand). Sila cuba sebentar lagi.";
    }`;

content = content.replace(target, replacement);
fs.writeFileSync('server.ts', content, 'utf8');
console.log('Fixed server.ts error handling');
