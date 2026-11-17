import {
  BarChart3,
  LayoutDashboard,
  ReceiptText,
  Sparkles,
  Wallet
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
  { id: 'input', label: 'Catat transaksi', icon: Sparkles },
  { id: 'wallets', label: 'Dompet', icon: Wallet },
  { id: 'history', label: 'Riwayat', icon: ReceiptText },
  { id: 'analytics', label: 'Analitik', icon: BarChart3 },
];

export default function SidebarNav({ activeTab, setActiveTab, activeTheme, setActiveTheme }) {
  const isMoka = activeTheme === 'moka';

  return (
    <aside className="flex h-full w-16 shrink-0 flex-col justify-between border-r border-[var(--surface-border)] bg-[var(--surface-bg)] px-2 py-4 text-[var(--text-main)] md:w-56 md:px-4 md:py-5">
      <div>
        <div className="mb-6 flex items-center justify-center gap-3 px-1 md:justify-start md:px-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl persona-accent-bg shadow-sm">
            <Wallet className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="hidden min-w-0 md:block">
            <span className="block text-base font-black tracking-tight">SakuKita</span>
            <span className="text-xs text-[var(--text-muted)]">Keuangan lebih ringan</span>
          </div>
        </div>

        <nav aria-label="Navigasi utama" className="space-y-1.5">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                aria-current={isActive ? 'page' : undefined}
                title={label}
                className={`flex w-full items-center justify-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition md:justify-start md:text-sm ${
                  isActive
                    ? 'persona-accent-bg shadow-sm'
                    : 'text-[var(--text-sub)] hover:bg-[var(--page-bg)] hover:text-[var(--text-main)]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="hidden md:inline">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <section className="border-t border-[var(--surface-border)] pt-3">
        <p className="mb-2 hidden px-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] md:block">
          Pilih gaya pendamping
        </p>
        <div className="flex flex-col gap-1 rounded-xl bg-[var(--page-bg)] p-1 md:flex-row">
          <button
            type="button"
            onClick={() => setActiveTheme('moka')}
            aria-pressed={isMoka}
            title="Moka — tenang dan terarah"
            className={`flex min-h-10 flex-1 items-center justify-center gap-1 rounded-lg px-1 text-xs font-bold transition md:px-2 ${
              isMoka
                ? 'persona-accent-soft shadow-sm'
                : 'text-[var(--text-sub)] hover:bg-white'
            }`}
          >
            <span aria-hidden="true">🐈</span>
            <span className="hidden md:inline">Moka</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTheme('pip')}
            aria-pressed={!isMoka}
            title="Pip — ceria dan lincah"
            className={`flex min-h-10 flex-1 items-center justify-center gap-1 rounded-lg px-1 text-xs font-bold transition md:px-2 ${
              !isMoka
                ? 'persona-accent-soft shadow-sm'
                : 'text-[var(--text-sub)] hover:bg-white'
            }`}
          >
            <span aria-hidden="true">🐭</span>
            <span className="hidden md:inline">Pip</span>
          </button>
        </div>
        <p className="mt-2 hidden text-center text-[10px] leading-4 text-[var(--text-muted)] md:block">
          {isMoka ? 'Tenang, teliti, fokus pada rencana.' : 'Ceria, lincah, jago cari cara.'}
        </p>
      </section>
    </aside>
  );
}
