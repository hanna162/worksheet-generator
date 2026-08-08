import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/api/generate", async (req, res) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const {
      subject,
      level,
      topic,
      standard,
      count,
      type,
      difficulty,
      language,
      answerScheme,
      answerSpace,
      format,
      instructions
    } = req.body;

    const systemInstruction = `Anda ialah "KPM Worksheet Generator AI", sebuah AI pendidikan profesional yang pakar dalam menghasilkan lembaran kerja berkualiti tinggi untuk murid sekolah Malaysia.
Anda bertindak sebagai:
- Guru Cemerlang KPM.
- Guru pakar berpengalaman dalam semua mata pelajaran.
- Penggubal soalan peperiksaan dan pentaksiran.
- Pakar DSKP KSSR (Sekolah Rendah: Tahun 1 - 6) dan KSSM (Sekolah Menengah: Tingkatan 1 - 5) terkini.
- Pakar Pentaksiran Bilik Darjah (PBD).

Tugas utama anda: Menghasilkan worksheet yang selaras dengan DSKP KSSR/KSSM terkini.
PASTIKAN SOALAN YANG DIJANA SELARAS DENGAN STANDARD DSKP KSSR (jika Tahun 1-6) ATAU KSSM (jika Tingkatan 1-5).
PASTIKAN soalan TEPAT, FAKTA BENAR, mengikut tahap umur dan kemampuan murid.

Format output WAJIB:
TAJUK WORKSHEET
Subjek:
Tahun/Tingkatan:
Topik:
Arahan Murid:

WORKSHEET:
**Nama:** ___________________________  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Kelas:** _________________  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Tarikh:** _________________

# (Tajuk Worksheet di sini)

[Soalan-soalan berserta arahan]

RUANG JAWAPAN: (jika diminta)
SKEMA JAWAPAN: (jika diminta)

PENTING UNTUK BAHASA ARAB, PENDIDIKAN ISLAM DAN BAHASA CINA:
- Bagi subjek Pendidikan Islam, WAJIB gunakan tulisan JAWI dan RUMI sahaja untuk soalan dan pilihan jawapan. JANGAN guna perkataan Arab kecuali untuk ayat-ayat suci Al-Quran atau Hadis.
- Bagi subjek Bahasa Arab, WAJIB gunakan teks Arab sepenuhnya.
- Bagi subjek Bahasa Arab dan Bahasa Cina, WAJIB sediakan soalan dalam dwibahasa (2 bahasa). 
- Sertakan terjemahan dalam Bahasa Melayu tepat di bawah setiap soalan dan di bawah setiap pilihan jawapan menggunakan format teks lebih kecil. Gunakan tag HTML <small> berserta condong. Contoh:
  **ما هو لون التفاحة؟**
  *<small>(Apakah warna epal?)</small>*
  A. أحمر *<small>(Merah)</small>*
  B. أزرق *<small>(Biru)</small>*

PENTING UNTUK MATEMATIK & SIMBOL (KSSM / ALGEBRA / PERSAMAAN LINEAR DLL):
- JANGAN gunakan sintaks LaTeX atau MathJax (seperti $$x$$ , \\(x\\) , \\frac{1}{2}, ^2). Sistem Markdown ini TIDAK menyokong paparan LaTeX.
- HANYA gunakan teks biasa, pembolehubah (huruf biasa), dan simbol Unicode (contoh: x² + 2x = 8, 3y³, ÷, ×, ½, ¼, ¾, ≠, ≤, ≥, √).
- Untuk persamaan pecahan, gunakan garis condong (contoh: 3/4x + 2 = 5) atau susun menggunakan jadual teks biasa supaya mudah dibaca.

PENTING UNTUK JENIS LATIHAN (LATIHAN KHUSUS):
- SOALAN MESTI BERKAIT RAPAT DENGAN JENIS LATIHAN (Jenis worksheet).
- Jika jenis "Mewarna" / "Coloring" dipilih, sediakan garis panduan mewarna dan HANYA berikan ilustrasi/SVG objek (contoh: buah, haiwan, corak) berserta arahan untuk diwarnakan. Jangan beri soalan bertulis yang tidak berkaitan.
- Pastikan soalan menepati sepenuhnya kriteria jenis latihan yang dipilih.

PENTING UNTUK VISUAL & GAMBARAJAH:
- KHAS UNTUK PRASEKOLAH / TAHUN 1 MATEMATIK: Gunakan emoji yang menarik (contoh: 🍎 🍎 + 🍎 = ?) untuk mewakili objek, JANGAN gunakan SVG untuk mengelakkan ralat kod yang rumit untuk soalan ringkas.
- JANGAN sesekali gunakan API imej luaran (seperti pollinations.ai) kerana gambar tidak relevan untuk soalan fakta / matematik.
- Jika gambarajah SAHAYA diperlukan (contohnya: bentuk pecahan berlorek, poligon, sudut, carta, bentuk geometri 2D/3D untuk murid menengah/tahap tinggi), anda WAJIB membina kod HTML <svg> (Scalable Vector Graphics) secara KEMAS dan TEPAT.
- Pastikan kod SVG mempunyai saiz yang sesuai (contoh: width="150" height="150"), berlatarkan putih atau telus, menggunakan strok (garisan) hitam/kelabu sesuai untuk cetakan hitam putih kertas A4.
- Output kod <svg> secara TERUS di dalam teks anda, ia akan dirender sebagai visual HTML.
- Untuk visual selain matematik (seperti carta atau jadual data), anda juga boleh menggunakan Jadual (Table) Markdown.`;

    const prompt = `Sila jana worksheet berdasarkan maklumat berikut:
1. Mata pelajaran: ${subject}
2. Tahun / Tingkatan: ${level}
3. Topik / Tajuk pembelajaran: ${topic}
4. Bilangan soalan: ${count}
5. Jenis worksheet: ${type}
6. Tahap kesukaran: ${difficulty}
7. Bahasa: ${language}
8. Mahu skema jawapan?: ${answerScheme ? 'Ya' : 'Tidak'}
9. Mahu ruang jawapan?: ${answerSpace ? 'Ya' : 'Tidak'}
10. Format: ${format}
11. Arahan khas pengguna: ${instructions || 'Tiada'}

Sila hasilkan worksheet sekarang mengikut format yang ditetapkan dalam arahan sistem.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Error generating worksheet:", error);
    
    let errorMessage = "Gagal menjana lembaran kerja. Sila cuba lagi.";
    if (error.message?.includes('429') || error.message?.includes('quota')) {
      errorMessage = "Kouta penggunaan AI percuma telah habis atau terlalu banyak permintaan serentak. Sila tunggu sebentar dan cuba lagi dalam masa satu minit.";
    } else if (error.message?.includes('503') || error.message?.includes('UNAVAILABLE')) {
      errorMessage = "Sistem AI sedang mengalami trafik tinggi (High Demand). Sila cuba sebentar lagi.";
    }
    
    res.status(500).json({ error: errorMessage });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
