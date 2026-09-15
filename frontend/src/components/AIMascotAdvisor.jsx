import React, { useState } from 'react';
import { Heart, Flame, ShieldAlert, Sparkles, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';

export default function AIMascotAdvisor({ activeTheme, totalSpent, totalBudget }) {
  const [adviceIndex, setAdviceIndex] = useState(0);

  const budgetUsagePercent = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  // Lumi personality quotes (Lembut, Warm, Caring, Sweet, Supportive)
  const lumiAdviceList = [
    "Halo kakak manis~ 🌸 Lumi udah bantu rapiin catatannya ya! Jangan lupa istirahat & tetap hemat yaa, Lumi bangga sama kamu 💖",
    `Yuhuu~ Alokasi anggaran kamu baru terpakai ${budgetUsagePercent}%. Masih aman kok kakak, Lumi selalu ada di samping kamu 🍀`,
    "Trik hemat dari Lumi: Setiap kali abis jajan, langsung bisikin ke AI Lumi yaa biar catatan kas kamu rapi dan nggak pusing ✨",
    "Pencapaian hebat! Kamu berhasil menyisihkan dana ke Tabungan BNI & Mandiri, Lumi seneng banget! 💖"
  ];

  // Raka personality quotes (Galak, Strict, Aggressive, Disiplin Keras)
  const rakaAdviceList = [
    `HEI KAKAK! Kenapa pengeluaranmu berantakan begini?! ⚡ Rasio anggaranmu sudah menyentuh ${budgetUsagePercent}%! Duitmu bisa ludes kalau kamu tidak disiplin!`,
    "PERINGATAN KERAS! Transaksi dompet Gopay sudah melampaui batas wajar! Hentikan jajan impulsif sekarang atau saya bekukan kasmu!",
    "Jangan banyak alasan! Gunakan AI parser atau Vision OCR ini sekarang juga! Saya tidak toleransi kelalaian dalam catatan keuangan!",
    "Target Finansial: Batasi pengeluaran harian di bawah limit! Jangan sampai saya tegur lagi!"
  ];

  const currentAdvice = activeTheme === 'lumi'
    ? lumiAdviceList[adviceIndex % lumiAdviceList.length]
    : rakaAdviceList[adviceIndex % rakaAdviceList.length];

  return (
    <div className={`rounded-3xl p-6 sm:p-7 transition-all duration-300 border shadow-md relative overflow-hidden ${activeTheme === 'lumi'
        ? 'bg-white border-orange-200 text-slate-900'
        : 'bg-[#1E293B] border-slate-700 text-white'
      }`}>

      {/* Background Decorative Emitters */}
      <div className={`absolute -right-8 -bottom-8 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none ${activeTheme === 'lumi' ? 'bg-orange-400' : 'bg-slate-400'
        }`}></div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">

        {/* Mascot Avatar & Name */}
        <div className="flex items-center space-x-4">

          {/* Avatar Container */}
          <div className="relative flex-shrink-0">
            {activeTheme === 'lumi' ? (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-300 border-2 border-orange-200 flex items-center justify-center text-4xl shadow-md">
                🌸
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-900 border-2 border-slate-600 flex items-center justify-center text-4xl shadow-xl">
                ⚡
              </div>
            )}

            {/* Status Indicator Chip */}
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-black ${activeTheme === 'lumi' ? 'bg-orange-500 text-white' : 'bg-rose-600 text-white'
              }`}>
              {activeTheme === 'lumi' ? '♥' : '!'}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-black tracking-tight" style={{ fontFamily: 'var(--font-accent)' }}>
                {activeTheme === 'lumi' ? 'Lumi (Asisten Lembut & Ramah)' : 'Raka (AI Officer Galak & Strict)'}
              </h3>

              <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${activeTheme === 'lumi'
                  ? 'bg-orange-100 text-orange-900 border-orange-300'
                  : 'bg-rose-950 text-rose-300 border-rose-800'
                }`}>
                {activeTheme === 'lumi' ? '🌸 Lembut & Supportive' : '⚡ Galak & No Tolerance'}
              </span>
            </div>

            <p className="text-xs font-bold opacity-80 mt-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Nasihat Real-Time Karakter AI (FR-07)
            </p>
          </div>

        </div>

        {/* Financial Health Meter Pill */}
        <div className={`px-5 py-2.5 rounded-2xl border flex items-center space-x-3.5 ${activeTheme === 'lumi'
            ? 'bg-orange-50/80 border-orange-200 text-slate-900'
            : 'bg-slate-900/90 border-slate-700 text-white'
          }`}>
          <div className="text-right">
            <span className="block text-xs font-extrabold opacity-75 uppercase">Kesehatan Anggaran</span>
            <span className="text-sm font-black">
              {budgetUsagePercent <= 50 ? 'Sangat Sehat 🟢' : budgetUsagePercent <= 85 ? 'Waspada 🟡' : 'Bahaya! 🔴'}
            </span>
          </div>

          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shadow-2xs ${activeTheme === 'lumi' ? 'bg-orange-500 text-white' : 'bg-slate-700 text-white border border-slate-600'
            }`}>
            {budgetUsagePercent}%
          </div>
        </div>

      </div>

      {/* Speech Bubble / Insight Text */}
      <div className={`mt-5 p-4 sm:p-5 rounded-2xl border relative text-sm sm:text-base font-bold transition-all ${activeTheme === 'lumi'
          ? 'bg-orange-50/60 border-orange-200 text-orange-950 shadow-xs'
          : 'bg-slate-900/90 border-slate-700 text-slate-100 shadow-xs'
        }`}>
        <div className="flex items-start space-x-3">
          {activeTheme === 'lumi' ? (
            <MessageSquare className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-600" />
          ) : (
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-rose-500" />
          )}
          <p className="flex-1 leading-relaxed">
            "{currentAdvice}"
          </p>
        </div>

        {/* Next Advice Button */}
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => setAdviceIndex(prev => prev + 1)}
            className={`text-xs font-black px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-2xs ${activeTheme === 'lumi'
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
          >
            <span>Saran Berikutnya &rarr;</span>
          </button>
        </div>
      </div>

    </div>
  );
}
