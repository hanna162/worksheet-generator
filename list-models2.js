import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  const models = await ai.models.list();
  console.log(JSON.stringify(models, null, 2));
}
run().catch(console.error);
