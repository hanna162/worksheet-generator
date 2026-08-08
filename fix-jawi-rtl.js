import fs from 'fs';

// --- Fix server.ts ---
let serverContent = fs.readFileSync('server.ts', 'utf8');

const oldIslamicString = `PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:
- Bagi subjek Pendidikan Islam, anda WAJIB menyediakan soalan dalam DWIBAHASA (Jawi dan Rumi). Teks UTAMA bagi semua soalan dan pilihan jawapan WAJIB menggunakan tulisan JAWI (Bukan tulisan Rumi). Kemudian, anda WAJIB letakkan terjemahan RUMI (Bahasa Melayu) di bahagian bawah soalan yang ditanya dan juga di bawah setiap pilihan jawapan. Gunakan tag HTML <small> berserta condong untuk teks Rumi. Contoh:
  **سياڤاكه نبي كيت؟**
  *<small>(Siapakah nabi kita?)</small>*
  A. نبي محمد *<small>(Nabi Muhammad)</small>*
  B. نبي عيسى *<small>(Nabi Isa)</small>*
- Untuk soalan Pendidikan Islam yang mengandungi ayat Al-Quran, MASUKKAN ayat Al-Quran yang betul beserta baris (harakat).
- Bagi subjek Bahasa Arab, WAJIB gunakan teks Arab sepenuhnya. JANGAN letak sebarang terjemahan Bahasa Melayu.`;

const newIslamicString = `PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:
- Bagi subjek Pendidikan Islam, anda WAJIB menyediakan soalan dalam DWIBAHASA (Jawi dan Rumi). Teks UTAMA bagi semua soalan dan pilihan jawapan WAJIB menggunakan tulisan JAWI (Bukan tulisan Rumi). Anda WAJIB memastikan EJAAN JAWI adalah TEPAT dan BETUL mengikut kaedah Jawi standard, dan JANGAN BERCAMPUR HURUF RUMI dalam perkataan Jawi. Kemudian, anda WAJIB letakkan terjemahan RUMI (Bahasa Melayu) di bahagian bawah soalan yang ditanya dan juga di bawah setiap pilihan jawapan. Gunakan tag HTML <small> berserta condong untuk teks Rumi. Contoh:
  **سياڤاكه نبي كيت؟**
  *<small>(Siapakah nabi kita?)</small>*
  A. نبي محمد *<small>(Nabi Muhammad)</small>*
  B. نبي عيسى *<small>(Nabi Isa)</small>*
- Untuk soalan Pendidikan Islam yang mengandungi ayat Al-Quran, MASUKKAN ayat Al-Quran yang betul beserta baris (harakat).
- Bagi subjek Bahasa Arab, WAJIB gunakan teks Arab sepenuhnya. JANGAN letak sebarang terjemahan Bahasa Melayu.`;

serverContent = serverContent.replace(oldIslamicString, newIslamicString);
fs.writeFileSync('server.ts', serverContent, 'utf8');

// --- Fix App.tsx ---
let appContent = fs.readFileSync('src/App.tsx', 'utf8');

// Add currentSubject state
if (!appContent.includes('const [currentSubject, setCurrentSubject]')) {
    appContent = appContent.replace(
        'const [worksheet, setWorksheet] = useState<string | null>(null);',
        'const [worksheet, setWorksheet] = useState<string | null>(null);\n  const [currentSubject, setCurrentSubject] = useState<string>(\'\');'
    );
    appContent = appContent.replace(
        'setWorksheet(null);',
        'setWorksheet(null);\n    setCurrentSubject(params.subject);'
    );
}

// Add dir and text-right logic
if (!appContent.includes('const isRtl')) {
    appContent = appContent.replace(
        '{worksheet ? (',
        '{(worksheet) ? (\n              (() => {\n                const isRtl = currentSubject === \'Pendidikan Islam\' || currentSubject === \'Bahasa Arab\';\n                return (\n'
    );
    appContent = appContent.replace(
        'className="markdown-body print:text-black"',
        'className={`markdown-body print:text-black ${isRtl ? \'text-right\' : \'text-left\'}`}\n                      dir={isRtl ? \'rtl\' : \'ltr\'}'
    );
    appContent = appContent.replace(
        '                <p className="mt-4 text-xs text-slate-500 font-medium print:hidden">Pratonton A4 • Skala 1:1</p>\n              </>',
        '                <p className="mt-4 text-xs text-slate-500 font-medium print:hidden">Pratonton A4 • Skala 1:1</p>\n              </>\n                );\n              })()'
    );
}


fs.writeFileSync('src/App.tsx', appContent, 'utf8');
