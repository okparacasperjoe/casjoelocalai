import React, { useState } from 'react';
import { FileText, Search, Upload, BookOpen, ShieldCheck, Lock, Sparkles, Send, FileSpreadsheet, Plus, Laptop } from 'lucide-react';
import { RAG_DOCUMENTS, PRESET_QNA } from '../data/mockData';

export default function DocumentsView({ documents = [], onOpenUploadModal }) {
  const [searchQuery, setSearchQuery] = useState("What are the key terms of the payment policy?");
  const [activeQna, setActiveQna] = useState(PRESET_QNA[0]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    const lower = searchQuery.toLowerCase();
    let matched = PRESET_QNA.find(q => lower.includes(q.question.toLowerCase().slice(0, 15)));
    if (!matched) matched = PRESET_QNA[0];
    setActiveQna(matched);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Banner matching Image 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#070B15] border border-white/10 p-6 lg:p-8 rounded-2xl relative overflow-hidden">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-3xl lg:text-5xl font-extrabold font-['Outfit'] text-white leading-tight">
            Find Answers <br />
            <span className="text-[#FF9F00]">Instantly.</span>
          </h2>
          <p className="text-sm lg:text-base font-medium text-slate-300">
            Search Your Documents with AI
          </p>
          <p className="text-xs lg:text-sm text-slate-400 max-w-xl">
            Upload your documents. Ask questions. Get accurate answers with references.
          </p>

          {/* 4 Feature Cards matching Image 3 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-[#0C1222] border border-white/10 p-3 rounded-xl flex flex-col items-center justify-center text-center space-y-1">
              <FileText className="w-5 h-5 text-rose-500" />
              <span className="text-[11px] font-bold text-white">PDF Support</span>
            </div>
            <div className="bg-[#0C1222] border border-white/10 p-3 rounded-xl flex flex-col items-center justify-center text-center space-y-1">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span className="text-[11px] font-bold text-white">Knowledge Base</span>
            </div>
            <div className="bg-[#0C1222] border border-white/10 p-3 rounded-xl flex flex-col items-center justify-center text-center space-y-1">
              <Search className="w-5 h-5 text-amber-400" />
              <span className="text-[11px] font-bold text-white">Smart Search</span>
            </div>
            <div className="bg-[#0C1222] border border-white/10 p-3 rounded-xl flex flex-col items-center justify-center text-center space-y-1">
              <Lock className="w-5 h-5 text-amber-500" />
              <span className="text-[11px] font-bold text-white">Private & Secure</span>
            </div>
          </div>
        </div>

        {/* Top Right Offline Lock Pill matching Image 3 */}
        <div className="lg:col-span-5 flex justify-end items-start">
          <div className="offline-status-pill">
            <Lock className="w-3.5 h-3.5 text-[#FF9F00]" />
            <span className="text-xs font-bold text-white">100% OFFLINE</span>
          </div>
        </div>
      </div>

      {/* Main RAG Laptop Container matching Image 3 */}
      <div className="bg-[#090E1B] border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Documents Stack (4 cols) matching Image 3 */}
          <div className="lg:col-span-4 space-y-4 bg-[#070B15] p-4 rounded-xl border border-white/5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white font-['Outfit'] text-sm">Documents</h3>
              <button
                onClick={onOpenUploadModal}
                className="w-6 h-6 rounded-md bg-[#FF9F00] text-black font-bold flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-[#0C1222] border border-white/5 hover:border-amber-500/30 p-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FileText className={`w-5 h-5 ${doc.type === 'pdf' ? 'text-rose-400' : doc.type === 'docx' ? 'text-sky-400' : 'text-emerald-400'}`} />
                    <div>
                      <h4 className="text-xs font-bold text-white">{doc.name}</h4>
                      <span className="text-[10px] text-slate-400">{doc.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Zone matching Image 3 */}
            <div
              onClick={onOpenUploadModal}
              className="border-2 border-dashed border-white/10 hover:border-amber-500/40 rounded-xl p-4 text-center cursor-pointer bg-[#090E1B] space-y-1"
            >
              <Upload className="w-5 h-5 text-amber-500 mx-auto" />
              <h4 className="text-xs font-bold text-white">Upload Documents</h4>
              <p className="text-[10px] text-slate-400">PDF, DOCX, XLSX, TXT</p>
            </div>
          </div>

          {/* Right Search & AI Answer Area (8 cols) matching Image 3 */}
          <div className="lg:col-span-8 space-y-5">
            {/* Search Input Bar */}
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center bg-[#070B15] border border-white/10 rounded-2xl p-2">
                <Search className="w-4 h-4 text-slate-400 ml-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are the key terms of the payment policy?"
                  className="w-full bg-transparent border-none outline-none px-3 text-xs text-white placeholder-slate-500"
                />
                <button type="submit" className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF9F00] to-[#FF6B00] text-black flex items-center justify-center shrink-0">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Glowing Orange Border AI Answer Box matching Image 3 */}
            <div className="bg-[#0C1222] border-2 border-[#FF9F00] rounded-2xl p-6 space-y-3 relative shadow-xl shadow-orange-500/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FF9F00] text-black font-bold flex items-center justify-center text-xs">
                  AI
                </div>
                <span className="text-xs font-bold text-[#FF9F00]">Offline AI Answer</span>
              </div>
              <p className="text-sm text-slate-100 leading-relaxed font-medium">
                {activeQna?.answer}
              </p>
            </div>

            {/* Cited Sources Box matching Image 3 */}
            <div className="bg-[#070B15] border border-white/10 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs font-bold text-white">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Sources</span>
              </div>

              <div className="space-y-2">
                {activeQna?.sources?.map((src, index) => (
                  <div key={index} className="bg-[#0C1222] border border-white/5 p-3 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#FF9F00]" />
                      <span className="font-bold text-white">{src.doc}</span>
                      <span className="text-slate-400 text-[11px]">— {src.snippet}</span>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-500/10 text-[#FF9F00] px-2 py-0.5 rounded-md border border-amber-500/20">
                      {src.page}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip matching Image 3 */}
      <div className="bg-[#070B15] border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Private AI. Instant Knowledge.</h4>
            <p className="text-xs text-slate-400">Transform documents into intelligence. Ask anything. Get trusted answers. All offline.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
          <span>🚫 No Internet Required</span>
          <span>🔒 Data Stays Local</span>
          <span>⚡ Faster Results</span>
          <span>📈 Boost Productivity</span>
        </div>
      </div>
    </div>
  );
}
