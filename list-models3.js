import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  const models = await ai.models.list();
  const names = Array.from(models).map(m => m.name);
  console.log(names.join('\n'));
}
run().catch(console.error);
