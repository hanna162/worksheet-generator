import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { KPM_DATA } from '../data';

export interface WorksheetParams {
  subject: string;
  level: string;
  topic: string;
  count: number;
  type: string;
  difficulty: string;
  language: string;
  answerScheme: boolean;
  answerSpace: boolean;
  format: string;
  instructions?: string;
}

interface WorksheetFormProps {
  onGenerate: (params: WorksheetParams) => void;
  isLoading: boolean;
  onStop?: () => void;
}

const WORKSHEET_TYPES = [
  'Aneka pilihan',
  'Isi tempat kosong',
  'Betul atau Salah',
  'Padankan',
  'Bulatkan jawapan',
  'Gariskan jawapan',
  'Susun perkataan',
  'Susun ayat',
  'Bina ayat',
  'Pemahaman',
  'Struktur',
  'KBAT',
  'Aktiviti visual',
  'Aktiviti mewarna',
  'Maze',
  'Crossword',
  'Word Search',
  'Color by Number',
  'Gunting dan tampal',
  'Aktiviti PBD'
];

const LEVELS = Object.keys(KPM_DATA);

const DIFFICULTIES = ['Pemulihan', 'Asas', 'Sederhana', 'Pengayaan', 'KBAT'];
const LANGUAGES = ['Bahasa Melayu', 'Bahasa Inggeris', 'Lain-lain'];
const FORMATS = ['Hitam putih', 'Berwarna', 'Mesra cetakan'];
const COUNTS = [5, 10, 15, 20, 25, 30, 40, 50];

export default function WorksheetForm({ onGenerate, isLoading, onStop }: WorksheetFormProps) {
  const defaultLevel = LEVELS[3]; // Tahun 3
  const defaultSubjects = Object.keys(KPM_DATA[defaultLevel as keyof typeof KPM_DATA] || {});
  const defaultSubject = defaultSubjects[0] || '';
  
  const [params, setParams] = useState<WorksheetParams>({
    subject: '',
    level: '',
    topic: '',
    count: 5,
    type: WORKSHEET_TYPES[0],
    difficulty: 'Sederhana',
    language: 'Bahasa Melayu',
    answerScheme: true,
    answerSpace: true,
    format: 'Hitam putih',
    instructions: '',
  });

  const [customTopic, setCustomTopic] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    if (name === 'level') {
      const newSubjects = Object.keys(KPM_DATA[value as keyof typeof KPM_DATA] || {});
      const newSubject = newSubjects.includes(params.subject) ? params.subject : (newSubjects[0] || '');
      setParams({ ...params, level: value, subject: newSubject, topic: '' });
      return;
    }

    if (name === 'subject') {
      setParams({ ...params, subject: value, topic: '' });
      return;
    }

    setParams({ ...params, [name]: val });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTopic = params.topic === 'Lain-lain' ? customTopic : params.topic;
    onGenerate({ ...params, topic: finalTopic });
  };

  // Get available subjects and topics based on current selection
  const currentGroup = params.level as keyof typeof KPM_DATA;
  const availableSubjects = currentGroup ? Object.keys(KPM_DATA[currentGroup]) : [];
  const availableTopics = (currentGroup && params.subject && KPM_DATA[currentGroup][params.subject as keyof (typeof KPM_DATA)[typeof currentGroup]]) 
    ? KPM_DATA[currentGroup][params.subject as keyof (typeof KPM_DATA)[typeof currentGroup]] 
    : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Tahun/Tingkatan *</label>
            <select
              required
              name="level"
              value={params.level}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
            >
              <option value="" disabled>Pilih Tahun/Tingkatan</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Mata Pelajaran *</label>
            <select
              required
              name="subject"
              value={params.subject}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
            >
              <option value="" disabled>Pilih Mata Pelajaran</option>
              {availableSubjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500">Topik / Tajuk *</label>
          <select
            required
            name="topic"
            value={params.topic}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
          >
            <option value="" disabled>Pilih Topik Pembelajaran</option>
            {availableTopics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
            <option value="Lain-lain">Lain-lain (Nyatakan)</option>
          </select>
        </div>

        {params.topic === 'Lain-lain' && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Nyatakan Topik *</label>
            <input
              required
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Cth: Masa dan Waktu"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
           <div className="space-y-1">
             <label className="text-xs font-bold text-slate-500">Tahap Kesukaran</label>
             <select
               name="difficulty"
               value={params.difficulty}
               onChange={handleChange}
               className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
             >
               {DIFFICULTIES.map((d) => (
                 <option key={d} value={d}>{d}</option>
               ))}
             </select>
           </div>
           <div className="space-y-1">
             <label className="text-xs font-bold text-slate-500">Bil. Soalan *</label>
             <select
               required
               name="count"
               value={params.count}
               onChange={handleChange}
               className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
             >
               {COUNTS.map((c) => (
                 <option key={c} value={c}>{c}</option>
               ))}
             </select>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
           <div className="space-y-1">
             <label className="text-xs font-bold text-slate-500">Jenis Latihan</label>
             <select
               name="type"
               value={params.type}
               onChange={handleChange}
               className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
             >
               {WORKSHEET_TYPES.map((t) => (
                 <option key={t} value={t}>{t}</option>
               ))}
             </select>
           </div>
           <div className="space-y-1">
             <label className="text-xs font-bold text-slate-500">Bahasa</label>
             <select
               name="language"
               value={params.language}
               onChange={handleChange}
               className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
             >
               {LANGUAGES.map((l) => (
                 <option key={l} value={l}>{l}</option>
               ))}
             </select>
           </div>
        </div>

        <div className="space-y-1">
           <label className="text-xs font-bold text-slate-500">Format Visual</label>
           <select
             name="format"
             value={params.format}
             onChange={handleChange}
             className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
           >
             {FORMATS.map((f) => (
               <option key={f} value={f}>{f}</option>
             ))}
           </select>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${params.answerSpace ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:bg-slate-50'}`}>
            <input
              type="checkbox"
              name="answerSpace"
              checked={params.answerSpace}
              onChange={handleChange}
              className="accent-blue-600 w-4 h-4"
            />
            <div className="flex-1">
              <div className={`text-sm font-bold ${params.answerSpace ? 'text-blue-900' : 'text-slate-700'}`}>Sediakan Ruang Jawapan</div>
              <div className={`text-[10px] ${params.answerSpace ? 'text-blue-700' : 'text-slate-500'}`}>Sesuai untuk dicetak dan dijawab terus</div>
            </div>
          </label>
          
          <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${params.answerScheme ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:bg-slate-50'}`}>
            <input
              type="checkbox"
              name="answerScheme"
              checked={params.answerScheme}
              onChange={handleChange}
              className="accent-blue-600 w-4 h-4"
            />
            <div className="flex-1">
              <div className={`text-sm font-bold ${params.answerScheme ? 'text-blue-900' : 'text-slate-700'}`}>Sertakan Skema Jawapan</div>
              <div className={`text-[10px] ${params.answerScheme ? 'text-blue-700' : 'text-slate-500'}`}>Skema akan diasingkan di bahagian bawah</div>
            </div>
          </label>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500">Arahan Khas (Pilihan)</label>
          <textarea
            name="instructions"
            value={params.instructions}
            onChange={handleChange}
            placeholder="Cth: Gunakan gambar rajah..."
            rows={2}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
          />
        </div>

      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50 flex justify-center items-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Menjana...
            </>
          ) : (
            'Jana Worksheet Sekarang'
          )}
        </button>
        {isLoading && onStop && (
          <button
            type="button"
            onClick={onStop}
            className="px-6 py-4 bg-red-100 text-red-600 rounded-xl font-bold hover:bg-red-200 transition-colors flex justify-center items-center"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
