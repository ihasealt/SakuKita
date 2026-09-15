import React from 'react';
import { Sparkles, Heart, Flame, ShieldAlert, Cpu, Zap, Wallet, BarChart3, Receipt } from 'lucide-react';

export default function ThemeSwitcherBar({ activeTheme, setActiveTheme, activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-40 transition-colors duration-300 shadow-sm border-b border-black/10 dark:border-slate-800">

      {/* Top Banner Theme Indicator Bar */}
      <div className={`py-1.5 px-4 text-center text-xs font-bold transition-colors ${activeTheme === 'lumi'
          ? 'bg-[#FFEDD5] text-[#9A3412] border-b border-[#FDBA74]'
          : 'bg-[#1E293B] text-[#CBD5E1] border-b border-[#475569]'
        }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {activeTheme === 'lumi' ? (
              <span className="flex items-center gap-1.5 font-black text-orange-900">
                <Heart className="w-4 h-4 fill-orange-500 text-orange-600" />
                Tema Karakter: Lumi (Asisten Lembut, Ramah & Pengasih 🌸)
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-black text-slate-100">
                <Flame className="w-4 h-4 text-rose-400 fill-rose-500/20" />
                Tema Karakter: Raka (Karakter Galak, Disiplin & Strict ⚡)
              </span>
            )}
          </div>

          <span className="hidden sm:inline-block text-xs font-semibold opacity-85">
            SakuKita AI Financial Tracker PWA v1.0
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`px-4 sm:px-6 lg:px-8 py-3.5 transition-colors backdrop-blur-md ${activeTheme === 'lumi'
          ? 'bg-white/95 border-b border-orange-200 text-slate-900'
          : 'bg-[#0F172A]/95 border-b border-slate-800 text-white'
        }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Brand Logo & Character Identity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md transition-all ${activeTheme === 'lumi'
                  ? 'bg-gradient-to-tr from-orange-500 to-amber-400 text-white shadow-orange-200'
                  : 'bg-gradient-to-tr from-slate-700 to-slate-900 text-white shadow-slate-950 border border-slate-700'
                }`}>
                {activeTheme === 'lumi' ? (
                  <Sparkles className="w-6 h-6 animate-pulse" />
                ) : (
                  <Flame className="w-6 h-6 text-rose-400" />
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-black tracking-tight" style={{ fontFamily: 'var(--font-accent)' }}>
                    SakuKita <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border border-current opacity-80">AI PWA</span>
                  </h1>
                </div>
                <p className="text-xs font-bold opacity-75">
                  {activeTheme === 'lumi' ? '🌸 Lumi: Lembut, Sayang & Penghemat' : '⚡ Raka: Galak, Strict & Tanpa Toleransi'}
                </p>
              </div>
            </div>

            {/* Mobile Character Toggle */}
            <div className="md:hidden flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setActiveTheme('lumi')}
                className={`px-3 py-1.5 text-xs font-black rounded-lg transition ${activeTheme === 'lumi' ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-600'}`}
              >
                Lumi 🌸
              </button>
              <button
                onClick={() => setActiveTheme('raka')}
                className={`px-3 py-1.5 text-xs font-black rounded-lg transition ${activeTheme === 'raka' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-400'}`}
              >
                Raka ⚡
              </button>
            </div>
          </div>

          {/* Navigation View Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('input')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap shadow-2xs ${activeTab === 'input'
                  ? activeTheme === 'lumi'
                    ? 'bg-orange-500 text-white shadow-orange-300'
                    : 'bg-slate-700 text-white border border-slate-600 shadow-slate-900'
                  : activeTheme === 'lumi'
                    ? 'bg-orange-50 text-orange-900 hover:bg-orange-100'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
            >
              <Zap className="w-4 h-4" />
              <span>AI Input & OCR</span>
            </button>

            <button
              onClick={() => setActiveTab('wallets')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap shadow-2xs ${activeTab === 'wallets'
                  ? activeTheme === 'lumi'
                    ? 'bg-orange-500 text-white shadow-orange-300'
                    : 'bg-slate-700 text-white border border-slate-600 shadow-slate-900'
                  : activeTheme === 'lumi'
                    ? 'bg-orange-50 text-orange-900 hover:bg-orange-100'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Multi-Dompet</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap shadow-2xs ${activeTab === 'analytics'
                  ? activeTheme === 'lumi'
                    ? 'bg-orange-500 text-white shadow-orange-300'
                    : 'bg-slate-700 text-white border border-slate-600 shadow-slate-900'
                  : activeTheme === 'lumi'
                    ? 'bg-orange-50 text-orange-900 hover:bg-orange-100'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analitik PRD</span>
            </button>
          </div>

          {/* Desktop Character Theme Switcher Pill */}
          <div className={`hidden md:flex items-center p-1 rounded-2xl border transition-colors ${activeTheme === 'lumi' ? 'bg-orange-50 border-orange-200' : 'bg-slate-800 border-slate-700'
            }`}>
            <button
              onClick={() => setActiveTheme('lumi')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${activeTheme === 'lumi'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-orange-700'
                }`}
            >
              <span>🌸 Lumi (Lembut)</span>
            </button>

            <button
              onClick={() => setActiveTheme('raka')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${activeTheme === 'raka'
                  ? 'bg-slate-700 text-white shadow-sm border border-slate-600'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              <span>⚡ Raka (Galak)</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
