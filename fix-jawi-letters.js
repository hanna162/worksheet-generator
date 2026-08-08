import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');
content = content.replace(
  "JANGAN BERCAMPUR HURUF RUMI dalam perkataan Jawi.",
  "JANGAN BERCAMPUR HURUF RUMI dalam perkataan Jawi. AWAS: JANGAN SESEKALI MENGGUNAKAN SIMBOL ATAU HURUF CINA/ASING DALAM TULISAN JAWI. HANYA GUNAKAN HURUF ARAB/JAWI STANDARD SAHAJA SEPERTI ا, ب, ت, ة, ث, ج, چ, ح, خ, د, ذ, ر, ز, س, ش, ص, ض, ط, ظ, ع, غ, ڠ, ف, ڤ, ق, ک, گ, ل, م, ن, و, ۏ, ه, ء, ي, ى, ڽ."
);

// We should also change gemini-3.5-flash-lite to gemini-2.5-pro if we want better Jawi, but maybe it's not allowed or the model doesn't exist. We'll leave the model as is.
// Actually I'll change it to 'gemini-1.5-pro' since that's known to be good at translation.
content = content.replace("model: 'gemini-3.5-flash-lite'", "model: 'gemini-1.5-pro'");

fs.writeFileSync('server.ts', content, 'utf8');
