import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Wallet, 
  ReceiptText, 
  BarChart3, 
  PhoneCall, 
  Flame,
  Zap
} from 'lucide-react';

export default function SidebarNav({ activeTab, setActiveTab, activeTheme, setActiveTheme }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'input', label: 'AI Catat', icon: Sparkles },
    { id: 'wallets', label: 'Dompet', icon: Wallet },
    { id: 'history', label: 'Histori', icon: ReceiptText },
    { id: 'analytics', label: 'Analitik', icon: BarChart3 },
  ];

  return (
    <aside className="w-16 md:w-52 h-full flex flex-col justify-between py-5 px-2 md:px-4 border-r border-slate-200/80 bg-white text-slate-700 flex-shrink-0">
      
      {/* Top Logo & Pokemon Branding */}
      <div>
        <div className="flex items-center space-x-2.5 px-2 mb-6">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-xs transition-all ${
            activeTheme === 'lumi'
              ? 'bg-[#38C7B4] text-white'
              : 'bg-[#EF4444] text-white'
          }`}>
            {/* Custom Pokéball Vector Icon */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white stroke-[2.2]">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <circle cx="12" cy="12" r="3.5" className="fill-white" />
              <circle cx="12" cy="12" r="1.5" className="fill-slate-800" />
            </svg>
          </div>

          <div className="hidden md:block">
            <span className="text-base font-black tracking-tight text-slate-800 block" style={{ fontFamily: 'var(--font-accent)' }}>
              SakuKita
            </span>
            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.2 rounded-md ${
              activeTheme === 'lumi' ? 'bg-teal-50 text-teal-700' : 'bg-rose-50 text-rose-700'
            }`}>
              {activeTheme === 'lumi' ? '⚡ Lumi' : '🔥 Raka'}
            </span>
          </div>
        </div>

        {/* Navigation Tab Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-center md:justify-start space-x-3 px-3 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all duration-150 ${
                  isActive
                    ? activeTheme === 'lumi'
                      ? 'bg-[#38C7B4] text-white shadow-xs font-black'
                      : 'bg-[#EF4444] text-white shadow-xs font-black'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
                title={item.label}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="hidden md:inline font-semibold">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Mascot Theme Switcher & Support */}
      <div className="pt-3 border-t border-slate-100 space-y-3">
        {/* Quick Pokemon Mascot Switcher */}
        <div className="hidden md:block">
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 px-1 tracking-wider">
            Tema Pokemon
          </p>
          <div className="p-1 rounded-xl bg-slate-100 flex items-center gap-1">
            <button
              onClick={() => setActiveTheme('lumi')}
              className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTheme === 'lumi' 
                  ? 'bg-white text-slate-800 shadow-xs font-black' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>Lumi</span>
            </button>
            <button
              onClick={() => setActiveTheme('raka')}
              className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTheme === 'raka' 
                  ? 'bg-white text-slate-800 shadow-xs font-black' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
              <span>Raka</span>
            </button>
          </div>
        </div>

        {/* Bottom icon like in reference image */}
        <div className="flex items-center justify-center md:justify-start">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              activeTheme === 'lumi'
                ? 'bg-teal-50 text-teal-600 hover:bg-teal-100'
                : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
            }`}
            title="Overview"
          >
            <PhoneCall className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
