import { useState } from 'react';
import { BarChart3, Home, Palette, Play, ReceiptText, Search, Sparkles, Wallet, X } from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Beranda', icon: Home },
  { id: 'input', label: 'Catat AI', icon: Sparkles },
  { id: 'wallets', label: 'Multi-Dompet', icon: Wallet },
  { id: 'history', label: 'Riwayat', icon: ReceiptText },
  { id: 'analytics', label: 'Analitik', icon: BarChart3 },
];

export default function SidebarNav({ activeTab, setActiveTab, searchTerm, setSearchTerm }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setActiveTab('history');
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#E8DFD0] bg-[#FAF3EB]/95 text-[#1F2226] shadow-[0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="flex min-h-[72px] items-center justify-between gap-4 lg:gap-8">
          {/* BRAND LOGO (CLEAN & BOLD MATCHING DESIGN REFERENCE) */}
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className="flex shrink-0 items-center gap-2 text-left group"
            aria-label="SakuKita - Beranda"
          >
            <span className="font-[var(--font-accent)] text-2xl font-black tracking-tight text-[#1F2226] group-hover:text-black transition">
              SakuKita<span className="text-sm font-extrabold text-amber-500 ml-0.5">™</span>
            </span>
          </button>

          {/* DESKTOP NAV TABS (PILL ACTIVE STATE AS IN DESIGN REFERENCE) */}
          <nav aria-label="Navigasi utama" className="hidden items-center gap-1.5 md:flex">
            {navItems.map(({ id, label }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-flex min-h-10 items-center justify-center rounded-full px-5 text-sm transition-all ${
                    isActive
                      ? 'bg-[#FDE293] font-bold text-[#2A2312] shadow-sm'
                      : 'font-semibold text-[#545B66] hover:bg-[#F2E8DC] hover:text-[#181B1F]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS: SEARCH & BLACK CTA PILL BUTTON */}
          <div className="flex shrink-0 items-center gap-2.5">
            {/* SEARCH ICON BUTTON */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSearchOpen((isOpen) => !isOpen)}
                aria-label={isSearchOpen ? 'Tutup pencarian' : 'Cari transaksi'}
                aria-expanded={isSearchOpen}
                aria-controls="global-search"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#383D45] transition hover:bg-[#F2E8DC]"
              >
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>
              {isSearchOpen && (
                <form
                  id="global-search"
                  onSubmit={handleSearchSubmit}
                  className="absolute right-0 top-full z-40 mt-2 w-[min(85vw,320px)] rounded-2xl border border-[#E8DFD0] bg-white p-2.5 shadow-xl animate-fade-in"
                >
                  <label className="sr-only" htmlFor="global-search-input">Cari transaksi</label>
                  <input
                    id="global-search-input"
                    type="search"
                    autoFocus
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Cari transaksi, nominal, dompet..."
                    className="h-10 w-full rounded-xl bg-[#FAF6F0] px-3.5 text-sm text-[#1F2226] outline-none focus:ring-2 focus:ring-[#E5BE55]"
                  />
                </form>
              )}
            </div>

            {/* THEME TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => setActiveTab('themes')}
              aria-label="Pilih tema tampilan"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#525761] transition hover:bg-[#F2E8DC] hover:text-[#181B1F]"
              title="Kustomisasi Tema"
            >
              <Palette className="h-5 w-5" />
            </button>

            {/* BLACK CTA PILL BUTTON MATCHING DESIGN REFERENCE (WATCH NOW -> CATAT CEPAT) */}
            <button
              type="button"
              onClick={() => setActiveTab('input')}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#1E2024] px-5 text-xs sm:text-sm font-extrabold text-white shadow-sm transition hover:bg-black hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="h-3.5 w-3.5 fill-current text-white" aria-hidden="true" />
              <span>Catat Cepat</span>
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION BAR */}
        <nav aria-label="Navigasi mobile" className="flex gap-1.5 overflow-x-auto pb-2.5 pt-1 md:hidden">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-xs transition ${
                  isActive
                    ? 'bg-[#FDE293] font-bold text-[#2A2312]'
                    : 'font-semibold text-[#545B66] hover:bg-[#F2E8DC]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
