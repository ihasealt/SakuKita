import { ArrowRight, Check, Sparkles } from 'lucide-react';

const themes = [
  {
    id: 'moka',
    emoji: '🐈',
    name: 'Moka',
    role: 'Si Perencana',
    description: 'Tenang dan teliti. Membantu menyusun langkah keuangan yang jelas.',
    palette: 'border-[#cbd8e4] bg-[#eaf0f5]',
  },
  {
    id: 'pip',
    emoji: '🐭',
    name: 'Pip',
    role: 'Si Akal Lincah',
    description: 'Ceria dan gesit. Mengajak mulai dari kebiasaan kecil yang mudah.',
    palette: 'border-[#eddda9] bg-[#fff1c8]',
  },
];

export default function ThemeSelectionPage({ activeTheme, setActiveTheme, setActiveTab }) {
  return (
    <section className="mx-auto max-w-5xl py-8 sm:py-12">
      <p className="inline-flex items-center gap-2 rounded-full bg-[#f8e9ba] px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#725b1b]">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        Make it yours
      </p>
      <h1 className="mt-4 font-[var(--font-accent)] text-4xl font-black tracking-tight text-[#252a30] sm:text-5xl">
        Temukan gaya ceritamu.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#666a70] sm:text-base">
        Pilih teman dan suasana yang paling cocok untuk menemani perjalanan keuanganmu. Kamu bisa menggantinya kapan saja.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {themes.map((theme) => {
          const isSelected = activeTheme === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => setActiveTheme(theme.id)}
              aria-pressed={isSelected}
              className={`flex min-h-52 items-center gap-5 rounded-3xl border-2 p-5 text-left transition hover:-translate-y-1 hover:shadow-lg sm:p-7 ${theme.palette} ${
                isSelected ? 'border-[#b38d2d] shadow-md ring-2 ring-[#b38d2d]/20' : ''
              }`}
            >
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/80 text-5xl shadow-sm" aria-hidden="true">
                {theme.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-xl font-extrabold text-[#29323b]">{theme.name}</span>
                  <span className="rounded-full bg-white/75 px-2.5 py-1 text-[11px] font-bold text-[#5b6065]">{theme.role}</span>
                </span>
                <span className="mt-2 block text-sm leading-6 text-[#5d6267]">{theme.description}</span>
                <span className={`mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold ${isSelected ? 'text-[#587149]' : 'text-[#62666b]'}`}>
                  {isSelected ? <><Check className="h-4 w-4" aria-hidden="true" /> Sedang dipakai</> : 'Pilih gaya ini'}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setActiveTab('overview')}
        className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#29323b] px-5 text-sm font-bold text-white transition hover:bg-[#161d24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29323b]"
      >
        Kembali ke beranda <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </section>
  );
}
