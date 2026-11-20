import { ArrowRight, BarChart3, Play, Sparkles, Wallet } from 'lucide-react';
import tomAndJerryArt from '../assets/tom_and_jerry_clean.png';

export default function CompactOverviewDashboard({ setActiveTab }) {
  return (
    <div className="space-y-6">
      {/* HERO SECTION MATCHING DESIGN REFERENCE */}
      <section className="welcome-dashboard relative isolate mx-auto flex min-h-[min(680px,calc(100dvh-160px))] w-full max-w-[1440px] items-center overflow-hidden rounded-[2rem] bg-[#FAF3EB] px-6 py-12 sm:px-10 lg:px-16 border border-[#E9DFD0] shadow-sm">
        {/* SWEEPING GOLDEN WAVE BACKGROUND */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-44 sm:h-56 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="#F3C648"
            d="M0,260 C260,220 480,265 720,235 C970,200 1160,118 1440,128 L1440,320 L0,320 Z"
          />
        </svg>

        <div className="relative z-10 grid w-full items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          {/* LEFT CONTENT */}
          <div className="max-w-2xl">
            {/* EYEBROW WITH HORIZONTAL ACCENT LINE */}
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.24em] text-[#797367]">
                THE ORIGINAL SMART WALLET
              </span>
              <span className="h-[2px] w-12 bg-[#EDB82E] rounded-full inline-block" aria-hidden="true" />
            </div>

            {/* HEADLINE WITH EXPRESSIVE ACCENT & SPARKS */}
            <h1 className="font-[var(--font-accent)] text-[clamp(2.9rem,6vw,5.5rem)] font-black leading-[0.96] tracking-[-0.04em] text-[#1F2226]">
              Every Rupiah
              <span className="mt-1 block">
                <span className="text-[#1F2226]">Has a </span>
                <span className="relative inline-block text-[#EDB82E] font-[var(--font-cute)] font-bold italic tracking-tight">
                  Story!
                  {/* Action spark accents above exclamation */}
                  <span className="absolute -top-3.5 right-0.5 flex gap-1 pointer-events-none" aria-hidden="true">
                    <span className="h-2 w-0.5 rotate-[-28deg] rounded-full bg-[#EDB82E]" />
                    <span className="h-3.5 w-0.5 rounded-full bg-[#EDB82E]" />
                    <span className="h-2 w-0.5 rotate-[28deg] rounded-full bg-[#EDB82E]" />
                  </span>
                </span>
              </span>
            </h1>

            {/* PROFESSIONAL EXCITING COPY */}
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#565C66]">
              Kelola keuangan harian jadi petualangan seru tanpa ribet — dari catat cepat berbasis AI, pantau arus kas multi-dompet, hingga kebiasaan finansial sehat yang siap membantumu mencapai financial freedom!
            </p>

            {/* CTA PILL BUTTONS */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => setActiveTab('input')}
                className="inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-full bg-[#F3C544] px-7 py-3 text-sm font-extrabold text-[#1E2024] shadow-md shadow-amber-400/25 transition-all hover:-translate-y-0.5 hover:bg-[#E8B52E] active:translate-y-0"
              >
                <Play className="h-4 w-4 fill-current text-[#1E2024]" aria-hidden="true" />
                Mulai Catat Sekarang
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('wallets')}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-[#DDD3C4] bg-white/80 px-6 py-3 text-sm font-extrabold text-[#292D32] shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#D19B27] hover:bg-white active:translate-y-0"
              >
                Kelola Dompet
              </button>
            </div>
          </div>

          {/* RIGHT HERO ARTWORK (NO TILTED CARDS, CLEAN DYNAMIC VISUAL) */}
          <div className="relative z-10 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px]">
              <img
                src={tomAndJerryArt}
                alt="Petualangan SakuKita"
                className="w-full h-auto object-contain drop-shadow-md select-none pointer-events-none transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL QUICK FEATURE CARDS (CLEAN & STRAIGHT, ZERO TILT) */}
      <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => setActiveTab('input')}
          className="group flex flex-col justify-between rounded-2xl border border-[#EBE3D5] bg-white/85 p-5 text-left shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[#D8B44A] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF6D6] text-[#A67812]">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold text-stone-400 group-hover:text-amber-600 transition flex items-center gap-1">
              Buka <ArrowRight className="h-3 w-3" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="font-[var(--font-accent)] text-base font-extrabold text-[#1F2226]">
              Catat Cepat & Struk AI
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
              Tulis transaksi dengan bahasa sehari-hari atau scan foto struk fisik secara otomatis.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('wallets')}
          className="group flex flex-col justify-between rounded-2xl border border-[#EBE3D5] bg-white/85 p-5 text-left shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[#D8B44A] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#2563EB]">
              <Wallet className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold text-stone-400 group-hover:text-blue-600 transition flex items-center gap-1">
              Buka <ArrowRight className="h-3 w-3" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="font-[var(--font-accent)] text-base font-extrabold text-[#1F2226]">
              Multi-Wallet Terpadu
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
              Sinkronisasi saldo Tunai, Gopay, QRIS, BCA, dan Mandiri dalam satu pandangan rapi.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          className="group flex flex-col justify-between rounded-2xl border border-[#EBE3D5] bg-white/85 p-5 text-left shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[#D8B44A] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#059669]">
              <BarChart3 className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold text-stone-400 group-hover:text-emerald-600 transition flex items-center gap-1">
              Buka <ArrowRight className="h-3 w-3" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="font-[var(--font-accent)] text-base font-extrabold text-[#1F2226]">
              Grafik & Evaluasi Budget
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
              Visualisasi pengeluaran dan arus kas berkala untuk menjaga stabilitas tabunganmu.
            </p>
          </div>
        </button>
      </section>
    </div>
  );
}
