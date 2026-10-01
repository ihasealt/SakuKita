import React, { useState } from 'react';
import { Sparkles, Zap, Flame } from 'lucide-react';
import lumiMascot from '../assets/lumi_pokemon.jpg';
import rakaMascot from '../assets/raka_pokemon.jpg';

export default function AIMascotAdvisor({ activeTheme, totalSpent, totalBudget }) {
  const [adviceIndex, setAdviceIndex] = useState(0);

  const budgetUsagePercent = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  // Lumi Pokemon personality quotes
  const lumiAdviceList = [
    "Pika-pika! 🌸 Lumi udah bantu rapiin catatan Pokédollar kamu ya! Jangan lupa istirahat & tetap hemat yaa, Lumi bangga sama kamu 💖",
    `Yuhuu~ Alokasi anggaran kamu baru terpakai ${budgetUsagePercent}%. Masih aman kok Trainer, Lumi selalu ada di samping kamu 🍀`,
    "Trik hemat dari Lumi: Setiap kali abis beli potion atau jajan, langsung catat ke SakuKita yaa biar keuangan rapi ✨",
    "Pencapaian hebat! Kamu berhasil menyisihkan Pokédollar ke Tabungan BNI & Mandiri, Lumi seneng banget! 💖"
  ];

  // Raka Pokemon personality quotes
  const rakaAdviceList = [
    `HEI TRAINER! Kenapa pengeluaranmu berantakan begini?! 🔥 Rasio anggaranmu sudah menyentuh ${budgetUsagePercent}%! Pokédollar-mu bisa ludes kalau kamu tidak disiplin!`,
    "PERINGATAN KERAS! Transaksi dompet Gopay sudah melampaui batas wajar! Hentikan jajan impulsif sekarang atau saya bekukan kasmu!",
    "Jangan banyak alasan! Gunakan AI parser atau Vision OCR ini sekarang juga! Saya tidak toleransi kelalaian dalam catatan keuangan!",
    "Target Finansial: Batasi pengeluaran harian di bawah limit! Disiplin adalah kunci menjadi Pokemon Champion! ⚡"
  ];

  const currentAdvice = activeTheme === 'lumi'
    ? lumiAdviceList[adviceIndex % lumiAdviceList.length]
    : rakaAdviceList[adviceIndex % rakaAdviceList.length];

  return (
    <div className={`rounded-2xl p-4 sm:p-5 transition-all border shadow-xs bg-white ${
      activeTheme === 'lumi' ? 'border-teal-200' : 'border-rose-200'
    }`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

        {/* Mascot Avatar & Name */}
        <div className="flex items-center space-x-3">
          <div className="relative flex-shrink-0">
            <div className={`w-12 h-12 rounded-xl overflow-hidden border-2 shadow-xs ${
              activeTheme === 'lumi' ? 'border-amber-300' : 'border-rose-400'
            }`}>
              <img 
                src={activeTheme === 'lumi' ? lumiMascot : rakaMascot} 
                alt="Pokemon Mascot" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black ${
              activeTheme === 'lumi' ? 'bg-amber-400 text-slate-900' : 'bg-rose-500 text-white'
            }`}>
              {activeTheme === 'lumi' ? '⚡' : '🔥'}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-black tracking-tight text-slate-800" style={{ fontFamily: 'var(--font-accent)' }}>
                {activeTheme === 'lumi' ? 'Lumi (Pokemon Electric & Fairy)' : 'Raka (Pokemon Fire Champion)'}
              </h3>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                activeTheme === 'lumi'
                  ? 'bg-amber-50 text-amber-900 border-amber-200'
                  : 'bg-rose-50 text-rose-900 border-rose-200'
              }`}>
                {activeTheme === 'lumi' ? '🌸 Lembut & Supportive' : '⚡ Galak & No Tolerance'}
              </span>
            </div>

            <p className="text-[11px] font-semibold text-slate-400 mt-0.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Nasihat Real-Time Karakter Pokemon (FR-07)
            </p>
          </div>
        </div>

        {/* Financial Health Meter Pill */}
        <div className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center space-x-2.5">
          <div className="text-right">
            <span className="block text-[9px] font-extrabold text-slate-400 uppercase">Status Anggaran</span>
            <span className="text-xs font-black text-slate-700">
              {budgetUsagePercent <= 50 ? 'Sangat Sehat 🟢' : budgetUsagePercent <= 85 ? 'Waspada 🟡' : 'Bahaya! 🔴'}
            </span>
          </div>

          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs text-white ${
            activeTheme === 'lumi' ? 'bg-[#38C7B4]' : 'bg-[#EF4444]'
          }`}>
            {budgetUsagePercent}%
          </div>
        </div>

      </div>

      {/* Speech Bubble */}
      <div className={`mt-3 p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-start justify-between gap-3 ${
        activeTheme === 'lumi'
          ? 'bg-amber-50/50 border-amber-200 text-amber-950'
          : 'bg-rose-50/50 border-rose-200 text-rose-950'
      }`}>
        <div className="flex items-start space-x-2">
          {activeTheme === 'lumi' ? (
            <Zap className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600 fill-amber-500/20" />
          ) : (
            <Flame className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-600 fill-rose-500/20" />
          )}
          <p className="leading-relaxed">
            "{currentAdvice}"
          </p>
        </div>

        <button
          onClick={() => setAdviceIndex(prev => prev + 1)}
          className={`flex-shrink-0 text-[11px] font-black px-2.5 py-1 rounded-lg text-white transition ${
            activeTheme === 'lumi' ? 'bg-[#38C7B4] hover:bg-[#2DAE9C]' : 'bg-[#EF4444] hover:bg-[#DC2626]'
          }`}
        >
          Saran Lain &rarr;
        </button>
      </div>

    </div>
  );
}
