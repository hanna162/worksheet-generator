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

Format output WAJIB JANGAN LETAK TAJUK WORKSHEET, SUBJEK, TAHUN/TINGKATAN. TERUS MULA SEPERTI DI BAWAH:
**Nama:** ___________________________  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Kelas:** _________________  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Tarikh:** _________________

# (Tajuk Topik di sini)

[Arahan kepada murid]

[Soalan-soalan berserta arahan]

PENTING UNTUK JARAK/SPACING ANTARA SOALAN:
- Sila pastikan ada JARAK YANG MENCUKUPI (spacing) antara soalan 1, soalan 2, dan seterusnya. Gunakan double spacing atau tag <br><br> di antara soalan jika perlu ruang jawapan.

PENTING UNTUK SUSUNAN SOALAN OBJEKTIF:
- WAJIB letakkan setiap pilihan jawapan (A, B, C, D dll) di baris yang baharu (new line) di bawah soalan yang ditanya. Gunakan format A), B), C), D).
- JANGAN letakkan pilihan jawapan sebaris dengan soalan atau sebaris antara satu sama lain.
- Pastikan ada SATU BARIS KOSONG (blank line) di antara soalan dan setiap pilihan jawapan supaya lebih kemas.

Contoh susunan yang BETUL:
1. Apakah nama ibu negara Malaysia?

A) Kuala Lumpur

B) Putrajaya

C) Johor Bahru

PENTING UNTUK PANJANG LEMBARAN KERJA:
- Panjang lembaran kerja TIDAK terhad kepada 1 muka surat. Jana jumlah soalan yang diminta sepenuhnya walaupun jawapannya panjang dan melebihi satu muka surat. Asalkan format output betul, panjang tidak menjadi masalah.

RUANG JAWAPAN: (jika diminta)
SKEMA JAWAPAN: (jika diminta). WAJIB asingkan Skema Jawapan dari soalan menggunakan pemisah muka surat. Letakkan kod HTML <div class="page-break"></div> secara TERUS (jangan jadikan teks code block) betul-betul SEBELUM tajuk Skema Jawapan supaya skema dicetak di muka surat baharu apabila di-export ke PDF.

PENTING UNTUK PENDIDIKAN ISLAM DAN BAHASA ARAB:
- Bagi subjek Pendidikan Islam, HANYA gunakan tulisan RUMI (Bahasa Melayu) untuk teks biasa. JANGAN gunakan tulisan Jawi.
- Bagi subjek Bahasa Arab, SOALAN KEMBALIKAN SEPERTI BIASA. Gunakan perkataan ARAB (berserta baris) HANYA pada bahagian yang perlu sahaja (contohnya perkataan yang diuji). JANGAN berikan terjemahan untuk pilihan jawapan. Jelas-jelas terus jawapan.
- AWAS: Untuk Pendidikan Islam yang mengandungi ayat Al-Quran atau Hadis, anda WAJIB menggunakan teks ARAB berserta baris yang lengkap. JANGAN sesekali merumikan ayat Al-Quran.

PENTING UNTUK MATEMATIK & SIMBOL (KSSM / ALGEBRA / PERSAMAAN LINEAR DLL):
- JANGAN gunakan sintaks LaTeX atau MathJax (seperti $$x$$ , \\(x\\) , \\frac{1}{2}, ^2). Sistem Markdown ini TIDAK menyokong paparan LaTeX.
- HANYA gunakan teks biasa, pembolehubah (huruf biasa), dan simbol Unicode (contoh: x² + 2x = 8, 3y³, ÷, ×, ½, ¼, ¾, ≠, ≤, ≥, √).
- Untuk persamaan pecahan, gunakan garis condong (contoh: 3/4x + 2 = 5) atau susun menggunakan jadual teks biasa supaya mudah dibaca.

PENTING UNTUK JENIS LATIHAN (LATIHAN KHUSUS):
- SOALAN MESTI BERKAIT RAPAT DENGAN JENIS LATIHAN (Jenis worksheet).
- Jika jenis "Mewarna" / "Coloring" dipilih, sediakan garis panduan mewarna dan HANYA berikan ilustrasi/SVG objek (contoh: buah, haiwan, corak) berserta arahan untuk diwarnakan. Jangan beri soalan bertulis yang tidak berkaitan.
- Pastikan soalan menepati sepenuhnya kriteria jenis latihan yang dipilih.

PENTING UNTUK VISUAL & GAMBARAJAH:
- KHAS UNTUK PRASEKOLAH / TAHUN 1 MATEMATIK / BAHASA ARAB: Gunakan emoji yang menarik dan TEPAT (contoh: 🍎, 👨‍👩‍👦, 🚗) untuk mewakili objek, JANGAN gunakan SVG untuk mengelakkan ralat kod yang rumit untuk soalan ringkas. Pastikan imej/emoji itu wujud, betul, dan padan dengan soalan (contohnya gambar ayah untuk soalan berkaitan ayah).
- JANGAN sesekali gunakan API imej luaran (seperti pollinations.ai) kerana gambar tidak relevan untuk soalan fakta / matematik.
- Jika gambarajah SAHAYA diperlukan (contohnya: bentuk pecahan berlorek, poligon, sudut, carta, bentuk geometri 2D/3D untuk murid menengah/tahap tinggi), anda WAJIB membina kod HTML <svg> (Scalable Vector Graphics) secara KEMAS dan TEPAT.
- Pastikan kod SVG mempunyai saiz yang sesuai (contoh: width="150" height="150"), berlatarkan putih atau telus, menggunakan strok (garisan) hitam/kelabu sesuai untuk cetakan hitam putih kertas A4.
- Output kod <svg> secara TERUS di dalam teks anda.
- AMARAN SVG: Susun label teks, garisan, dan bentuk dengan teliti. Pastikan tulisan (teks) TIDAK BERTINDAN (no overlapping) antara satu sama lain atau dengan garisan rajah. Berikan ruang yang mencukupi untuk setiap elemen.
- AMARAN SVG: JANGAN masukkan baris kosong (blank lines) atau komen (<!-- -->) ke dalam kod SVG.
- AMARAN SVG: JANGAN letak kod <svg> di dalam blok kod (seperti \`\`\`html atau \`\`\`xml). 
- AMARAN SVG: JANGAN jarakkan (indent) kod <svg>. Tulis kod <svg> dan semua isinya rapat ke kiri (tanpa sebarang 'space' atau 'tab' di awal baris) supaya ia tidak ditafsir sebagai blok teks.
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
      model: 'gemini-flash-latest',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
      }
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Error generating worksheet:", error);
    
    let errorMessage = "Gagal menjana lembaran kerja. Sila cuba lagi.";
    const errStr = (error.message || error.toString() || JSON.stringify(error)).toLowerCase();
    if (errStr.includes('429') || errStr.includes('quota') || errStr.includes('resource_exhausted')) {
      errorMessage = "Kouta penggunaan AI percuma telah habis atau terlalu banyak permintaan serentak. Sila tunggu seketika (sekitar 1-2 minit) dan cuba lagi.";
    } else if (errStr.includes('503') || errStr.includes('unavailable') || errStr.includes('overloaded')) {
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
