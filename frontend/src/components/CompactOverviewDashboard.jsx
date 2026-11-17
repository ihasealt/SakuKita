import {
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Plus,
  Search,
  Sparkles,
  Wallet
} from 'lucide-react';

const formatRupiah = (amount) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
}).format(amount || 0);

const formatDate = (date) => {
  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return date;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(parsedDate);
};

export default function CompactOverviewDashboard({
  activeTheme,
  setActiveTheme,
  wallets,
  transactions,
  onOpenAddModal,
  setActiveTab,
  searchTerm,
  setSearchTerm
}) {
  const totalBalance = Object.values(wallets).reduce((total, balance) => total + balance, 0);
  const totalExpenses = transactions.reduce((total, transaction) => total + (transaction.amount || 0), 0);
  const categoryTotals = transactions.reduce((totals, transaction) => {
    const category = transaction.category || 'Lainnya';
    totals[category] = (totals[category] || 0) + (transaction.amount || 0);
    return totals;
  }, {});
  const topCategories = Object.entries(categoryTotals)
    .sort(([, firstAmount], [, secondAmount]) => secondAmount - firstAmount)
    .slice(0, 4);
  const recentTransactions = [...transactions]
    .sort((first, second) => new Date(second.date) - new Date(first.date))
    .slice(0, 5);
  const walletPreview = Object.entries(wallets)
    .sort(([, firstBalance], [, secondBalance]) => secondBalance - firstBalance)
    .slice(0, 3);

  const isMoka = activeTheme === 'moka';
  const accentColor = 'persona-accent-text';
  const accentBackground = 'persona-accent-bg';
  const personas = [
    {
      id: 'moka',
      emoji: '🐈',
      name: 'Moka',
      role: 'Si Perencana',
      description: 'Tenang dan teliti. Membantu menyusun langkah keuangan yang jelas.',
      cardClass: 'persona-card-moka',
    },
    {
      id: 'pip',
      emoji: '🐭',
      name: 'Pip',
      role: 'Si Akal Lincah',
      description: 'Ceria dan gesit. Mengajak mulai dari kebiasaan kecil yang mudah.',
      cardClass: 'persona-card-pip',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] persona-accent-text">
            Ruang keuanganmu
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Ringkasan keuangan
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            {isMoka
              ? 'Pelan-pelan, satu langkah terencana bikin keuangan lebih jelas.'
              : 'Mulai dari yang kecil—Pip bantu bikin urusan uang terasa ringan.'}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => setActiveTab('input')}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            <Sparkles className="h-4 w-4" />
            Catat dengan AI
          </button>
          <button
            type="button"
            onClick={onOpenAddModal}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 ${accentBackground}`}
          >
            <Plus className="h-4 w-4" />
            Catat pengeluaran
          </button>
        </div>
      </header>

      <section aria-labelledby="persona-heading" className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-400">Dua gaya, satu tujuan</p>
            <h2 id="persona-heading" className="mt-1 text-lg font-extrabold text-slate-900">Pilih teman mengatur uang</h2>
          </div>
          <span className="text-xs font-medium text-slate-500">Bisa diganti kapan saja</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {personas.map((persona) => {
            const isSelected = activeTheme === persona.id;
            return (
              <button
                key={persona.id}
                type="button"
                onClick={() => setActiveTheme(persona.id)}
                aria-pressed={isSelected}
                className={`${persona.cardClass} flex min-h-32 items-center gap-4 rounded-2xl border-2 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${
                  isSelected ? 'persona-selected-card shadow-sm' : ''
                }`}
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/75 text-4xl shadow-sm" aria-hidden="true">
                  {persona.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-extrabold text-slate-900">{persona.name}</span>
                    <span className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-bold text-slate-600">{persona.role}</span>
                  </span>
                  <span className="mt-1 block max-w-md text-sm leading-5 text-slate-600">{persona.description}</span>
                </span>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
                  isSelected ? 'persona-accent-bg' : 'bg-white/70 text-slate-500'
                }`}>
                  {isSelected ? 'Dipilih' : 'Pilih'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="persona-hero relative overflow-hidden rounded-2xl p-6 shadow-sm md:p-8">
          <div className="persona-hero-decoration absolute -right-8 -top-12 h-48 w-48 rounded-full border-[28px] border-white/10" aria-hidden="true" />
          <div className="persona-hero-mascots pointer-events-none absolute bottom-2 right-5 hidden items-end sm:flex" aria-hidden="true">
            <span className="text-7xl drop-shadow-md md:text-8xl">{isMoka ? '🐈' : '🐭'}</span>
            <span className="-ml-5 mb-1 text-5xl drop-shadow-md md:text-6xl">{isMoka ? '🐭' : '🐈'}</span>
          </div>
          <div className="relative">
            <p className="persona-hero-muted text-sm font-semibold">Total saldo tersedia</p>
            <p className="mt-2 break-words text-3xl font-extrabold tracking-tight md:text-4xl">
              {formatRupiah(totalBalance)}
            </p>
            <p className="persona-hero-muted mt-2 max-w-md text-sm leading-6">
              Gabungan saldo dari {Object.keys(wallets).length} dompet yang kamu kelola.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('wallets')}
              className="persona-hero-button mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg bg-white/15 px-3 text-sm font-bold transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Lihat semua dompet <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <article className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">Total pengeluaran tercatat</p>
              <p className="mt-1 truncate text-xl font-extrabold text-slate-900">{formatRupiah(totalExpenses)}</p>
              <p className="mt-0.5 text-xs text-slate-500">{transactions.length} transaksi</p>
            </div>
          </article>
          <article className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl persona-accent-soft">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">Dompet aktif</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">{Object.keys(wallets).length} dompet</p>
              <p className="mt-0.5 text-xs text-slate-500">Tunai, bank, dan e-wallet</p>
            </div>
          </article>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">Transaksi terbaru</h2>
              <p className="mt-1 text-sm text-slate-500">Pantau catatan pengeluaranmu dengan cepat.</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="relative min-w-0 flex-1 sm:w-52 sm:flex-none">
                <span className="sr-only">Cari transaksi</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') setActiveTab('history');
                  }}
                  placeholder="Cari transaksi"
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
                />
              </label>
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`inline-flex h-10 shrink-0 items-center gap-1 rounded-lg px-3 text-sm font-bold transition hover:bg-slate-50 ${accentColor}`}
              >
                Semua <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {recentTransactions.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {recentTransactions.map((transaction) => (
                <li key={transaction.id} className="flex items-center gap-3 px-5 py-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Wallet className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-800">{transaction.detail}</p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {formatDate(transaction.date)} · {transaction.category} · {transaction.account}
                    </p>
                  </div>
                  <p className="shrink-0 text-right text-sm font-extrabold text-slate-900">
                    -{formatRupiah(transaction.amount)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-5 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Wallet className="h-5 w-5" />
              </div>
              <p className="mt-3 font-bold text-slate-800">Belum ada transaksi</p>
              <p className="mt-1 text-sm text-slate-500">Catat pengeluaran pertamamu untuk mulai melihat ringkasan.</p>
              <button
                type="button"
                onClick={onOpenAddModal}
                className={`mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg px-4 text-sm font-bold transition ${accentBackground}`}
              >
                <Plus className="h-4 w-4" /> Catat pengeluaran
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-slate-900">Pengeluaran per kategori</h2>
                <p className="mt-1 text-sm text-slate-500">Kategori dengan pengeluaran terbesar.</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                aria-label="Lihat analitik"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {topCategories.length > 0 ? (
              <ul className="mt-5 space-y-4">
                {topCategories.map(([category, amount], index) => {
                  const percentage = totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0;
                  return (
                    <li key={category}>
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                        <span className="truncate font-semibold text-slate-700">{category}</span>
                        <span className="shrink-0 font-bold text-slate-900">{formatRupiah(amount)}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${index === 0 ? 'persona-accent-bg' : 'bg-slate-400'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                Ringkasan kategori akan muncul setelah kamu mencatat transaksi.
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">Saldo dompet</h2>
                <p className="mt-1 text-sm text-slate-500">Saldo terbesar saat ini.</p>
              </div>
              <Wallet className="h-5 w-5 persona-accent-text" />
            </div>
            {walletPreview.length > 0 ? (
              <ul className="mt-3 divide-y divide-slate-100">
                {walletPreview.map(([name, balance]) => (
                  <li key={name} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <span className="truncate font-semibold text-slate-700">{name}</span>
                    <span className="shrink-0 font-bold text-slate-900">{formatRupiah(balance)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-500">Belum ada dompet.</p>
            )}
            <button
              type="button"
              onClick={() => setActiveTab('wallets')}
              className={`mt-1 inline-flex min-h-9 items-center gap-1 text-sm font-bold ${accentColor}`}
            >
              Kelola dompet <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        </div>
      </section>
    </div>
  );
}
