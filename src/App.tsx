/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import WorksheetForm, { WorksheetParams } from './components/WorksheetForm';
import { BookOpen, Printer, Download, Copy, Check } from 'lucide-react';

export default function App() {
  const [worksheet, setWorksheet] = useState<string | null>(null);
  const [currentSubject, setCurrentSubject] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (params: WorksheetParams) => {
    setIsLoading(true);
    setError(null);
    setWorksheet(null);
    setCurrentSubject(params.subject);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate worksheet');
      }

      const data = await response.json();
      setWorksheet(data.result);
      
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (worksheet) {
      navigator.clipboard.writeText(worksheet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-sans text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0a0f1d] text-slate-300 flex flex-col border-r border-slate-800 print:hidden shrink-0 shadow-2xl z-10 relative">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/60 bg-[#0f172a]/50">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-500/20 ring-1 ring-white/10">
            P
          </div>
          <div>
            <h1 className="font-bold tracking-tight text-white text-[15px]">Penjana KPM</h1>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">AI Worksheet Builder</p>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest px-3 mb-3 block">Modul Utama</label>
            <div className="space-y-1">
              <div className="p-3 bg-gradient-to-r from-blue-600/20 to-indigo-600/10 border border-blue-500/20 rounded-xl text-sm font-semibold text-blue-100 flex items-center gap-3 shadow-inner">
                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                Penjana Lembaran Kerja
              </div>
            </div>
          </div>
          
          <div className="space-y-4 px-1">
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 rounded-2xl border border-slate-700/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="text-[11px] text-blue-300 font-bold uppercase tracking-wide">KSSR & KSSM Compliant</div>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">Selaras dengan DSKP dan tahap penguasaan PBD terkini.</p>
            </div>
          </div>
        </div>
        
        <div className="p-5 border-t border-slate-800/60 bg-[#0f172a]/30">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-700/50">
            <div className="w-10 h-10 bg-gradient-to-tr from-slate-700 to-slate-600 rounded-full flex items-center justify-center ring-2 ring-slate-800 shadow-sm">
              <span className="text-sm font-bold text-white">F</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-200">Cikgu Farhana</div>
              <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                Akaun Aktif
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 print:hidden shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Home</span>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-semibold">Worksheet Builder</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
              {copied ? 'Tersalin!' : 'Salin Text'}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow-sm shadow-blue-200 flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Export A4 PDF
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col gap-8 p-6 overflow-y-auto">
          
          {/* Top Section (Form) */}
          <section className="w-full max-w-3xl mx-auto flex flex-col gap-4 print:hidden shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded flex items-center justify-center text-xs">1</span> 
                Maklumat Asas & Tetapan
              </h3>
              <WorksheetForm onGenerate={handleGenerate} isLoading={isLoading} />
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-100">
                  {error}
                </div>
              )}
            </div>
          </section>

          {/* Bottom Section (Results) */}
          <section ref={resultRef} className="w-full max-w-4xl mx-auto bg-slate-200 rounded-2xl p-8 flex flex-col items-center justify-start print:p-0 print:bg-white print:rounded-none">
            {(worksheet) ? (
              (() => {
                const isRtl = false;
                return (

              <>
                <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-12 flex flex-col space-y-6 mx-auto print:w-full print:shadow-none print:p-0 print:min-h-0 print:mx-0">
                  <div className="prose prose-slate prose-sm max-w-none prose-headings:font-bold prose-headings:mb-4 prose-p:mb-4 prose-a:text-blue-600 hover:prose-a:text-blue-500 w-full prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-slate-300 prose-th:p-2 prose-td:border prose-td:border-slate-300 prose-td:p-2">
                    <div 
                      className={`markdown-body print:text-black ${isRtl ? 'text-right' : 'text-left'}`}
                      dir={isRtl ? 'rtl' : 'ltr'} 
                      dangerouslySetInnerHTML={{ __html: marked.parse(worksheet, { async: false }) as string }} 
                    />
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-500 font-medium print:hidden">Pratonton A4 • Skala 1:1</p>
              </>
                );
              })()
            ) : (
              <div className="bg-white border border-slate-200 border-dashed rounded-xl h-full w-full min-h-[400px] flex items-center justify-center text-slate-400 print:hidden">
                <div className="text-center max-w-sm px-6">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p className="text-sm">
                    Isi borang di sebelah untuk menjana lembaran kerja yang selaras dengan DSKP KSSR/KSSM terkini.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
