import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const formatRupiah = (amount) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
}).format(amount || 0);

export default function AIMascotAdvisor({ activeTheme, totalSpent }) {
  const [adviceIndex, setAdviceIndex] = useState(0);
  const isMoka = activeTheme === 'moka';
  const persona = isMoka
    ? {
      name: 'Moka',
      role: 'Si Perencana',
      emoji: '🐈',
      description: 'Tenang, teliti, dan suka langkah yang jelas.',
      advice: [
        `Tercatat ${formatRupiah(totalSpent)} sejauh ini. Coba lihat kategori terbesar dulu, lalu tentukan satu hal kecil yang ingin kamu atur.`,
        'Biar tidak menebak-nebak, catat transaksi segera setelah membayar. Nanti lebih mudah mengecek pola pengeluaran.',
        'Rencana sederhana lebih mudah dijalankan: pilih satu prioritas keuangan untuk minggu ini.',
      ],
    }
    : {
      name: 'Pip',
      role: 'Si Akal Lincah',
      emoji: '🐭',
      description: 'Ceria, gesit, dan jago memulai dari hal kecil.',
      advice: [
        `Sudah ada ${formatRupiah(totalSpent)} yang tercatat! Satu langkah cepat: masukkan transaksi terakhir, lalu lihat apa yang paling sering muncul.`,
        'Tidak perlu langsung merapikan semuanya. Catat satu pengeluaran hari ini—sedikit-sedikit jadi kebiasaan.',
        'Trik Pip: pakai kolom pencarian untuk menemukan transaksi lama tanpa perlu menggulir panjang.',
      ],
    };

  const currentAdvice = persona.advice[adviceIndex % persona.advice.length];

  return (
    <section className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-bg)] p-4 shadow-sm sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl persona-accent-soft text-2xl" aria-hidden="true">
          {persona.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h2 className="font-extrabold text-[var(--text-main)]">
              {persona.name} <span className="font-semibold text-[var(--text-sub)]">· {persona.role}</span>
            </h2>
            <span className="rounded-full persona-accent-soft px-2.5 py-0.5 text-[11px] font-bold">
              {isMoka ? 'Terarah' : 'Santai'}
            </span>
          </div>
          <p className="mt-1 text-sm text-[var(--text-sub)]">{persona.description}</p>
        </div>
        <Sparkles className="mt-1 h-4 w-4 shrink-0 persona-accent-text" aria-hidden="true" />
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-xl bg-[var(--page-bg)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-[var(--text-main)]">{currentAdvice}</p>
        <button
          type="button"
          onClick={() => setAdviceIndex((index) => index + 1)}
          className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1 self-start rounded-lg px-3 text-xs font-bold persona-accent-text transition hover:bg-[var(--surface-bg)] sm:self-auto"
        >
          Ide lain <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
}
