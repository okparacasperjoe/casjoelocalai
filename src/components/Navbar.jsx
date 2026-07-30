import React from 'react';
import { Menu, Sun, Moon, Search } from 'lucide-react';

export default function Navbar({ onOpenSettings, ollamaConnected, isDarkMode, toggleTheme }) {
  return (
    <header className="w-full bg-[#070B15] border-b border-white/10 px-4 lg:px-8 py-3 flex items-center justify-between sticky top-0 z-50 transition-colors">
      {/* Left: Brand Logo & Title matching Image 1 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 cursor-pointer">
          {/* Logo vector icon */}
          <div className="w-10 h-10 rounded-xl bg-[#090E1B] border border-[#FF9F00]/30 flex items-center justify-center p-1.5 shadow-md shadow-orange-500/10 transition-colors">
            <svg className="w-full h-full text-[#FF9F00]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <path d="M50 12 A 38 38 0 1 0 88 50" strokeWidth="8" strokeLinecap="round" stroke="#FF9F00" />
              <path d="M50 28 A 22 22 0 1 0 72 50" strokeWidth="8" strokeLinecap="round" stroke="#FF6B00" />
              <circle cx="50" cy="50" r="8" fill="#FF9F00" />
              <path d="M85 50 L95 50" strokeWidth="6" strokeLinecap="round" stroke="#FF9F00" />
            </svg>
          </div>

          <div>
            <h1 className="text-xl font-extrabold font-['Outfit'] text-white tracking-tight leading-none transition-colors">
              Casjoe Local AI
            </h1>
            <span className="text-[11px] font-semibold text-[#FF9F00] tracking-wide block mt-0.5">
              Offline Business AI
            </span>
          </div>
        </div>

        {/* Center Hamburger Menu icon matching Image 1 */}
        <button className="p-2 text-slate-400 hover:text-white transition-colors ml-4 hidden md:block">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Right Controls matching Image 1 */}
      <div className="flex items-center gap-4">
        <div className="offline-status-pill">
          <span className={ollamaConnected ? "green-pulse-dot" : "w-2 h-2 rounded-full bg-amber-500"} />
          <span className="text-xs font-bold text-white tracking-wide">
            {ollamaConnected ? "🟢 AI Online" : "⚡ Offline Mode"}
          </span>
        </div>

        {/* Download App Button */}
        <a 
          href="https://github.com/okparacasperjoe/casjoelocalai/releases/latest" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-[#1F2937] hover:bg-[#374151] border border-gray-700 rounded-lg text-sm font-semibold text-white transition-colors"
          title="Download the full offline desktop app from GitHub"
        >
          <svg className="w-4 h-4 text-[#FF9F00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download App
        </a>

        {/* Theme sun/moon icon */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-300 hover:text-amber-400 transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* User Profile Avatar "CJ" matching Image 1 */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF9F00] to-[#FF6B00] text-black font-extrabold flex items-center justify-center text-xs shadow-md shadow-orange-500/20">
          CJ
        </div>
      </div>
    </header>
  );
}
