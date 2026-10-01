import React, { useState } from 'react';
import { 
  MoreHorizontal, 
  Plus, 
  Receipt, 
  Scale, 
  ArrowRight, 
  X
} from 'lucide-react';
import trainerAvatar from '../assets/trainer_avatar.jpg';
import lumiMascot from '../assets/lumi_pokemon.jpg';
import rakaMascot from '../assets/raka_pokemon.jpg';

export default function RightTrainerPanel({ 
  activeTheme, 
  setActiveTheme, 
  totalSpent, 
  totalBudget,
  onOpenAddModal
}) {
  const [adviceIndex, setAdviceIndex] = useState(0);
  const [notificationVisible, setNotificationVisible] = useState(true);

  const budgetUsagePercent = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  // Pokemon Lumi personality quotes
  const lumiQuotes = [
    "Pika-pika! ⚡ Alokasi Pokédollar kamu aman banget, baru terpakai " + budgetUsagePercent + "%. Lumi bangga sama kamu! 💖",
    "Tips hemat Lumi: Kalahkan godaan jajan impulsif di Indomaret dengan 1-Tap Catat SakuKita! ✨",
    "Target Finansial: Tabungan Pokemon Gym BNI & Mandiri sudah tercapai 78%! Keep it up, Trainer! 🍀",
    "Hebat! Dompet cash dan Gopay kamu terkelola rapi minggu ini. Ayo pertahankan badge Trainer Hemat! 🌟"
  ];

  // Pokemon Raka personality quotes
  const rakaQuotes = [
    "PERINGATAN TRAINER! 🔥 Rasio anggaranmu sudah " + budgetUsagePercent + "%! Jangan sampai Pokédollar habis sebelum akhir bulan!",
    "DISIPLIN ADALAH KUNCI! Hentikan checkout tidak perlu di e-commerce atau dompet kasmu akan defisit!",
    "Gunakan AI Vision OCR atau Voice Parser sekarang! Champion sejati selalu mencatat setiap keping pengeluaran! ⚡",
    "Fokus pada target dana darurat! Jangan banyak alasan, evaluasi pengeluaran kategori Living hari ini! 🛡️"
  ];

  const activeQuotes = activeTheme === 'lumi' ? lumiQuotes : rakaQuotes;
  const currentQuote = activeQuotes[adviceIndex % activeQuotes.length];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tagihan Listrik & WiFi',
      time: '10 Okt · 11:00 AM',
      location: 'Auto-debit BCA',
      amount: 'Rp 385.000',
      icon: Receipt,
      iconBg: activeTheme === 'lumi' ? 'bg-teal-50 text-teal-600' : 'bg-rose-50 text-rose-600'
    },
    {
      id: 2,
      title: 'Auto-debit Pokemon Gym',
      time: '25 Okt · 09:00 AM',
      location: 'Tabungan BNI',
      amount: 'Rp 250.000',
      icon: Scale,
      iconBg: activeTheme === 'lumi' ? 'bg-amber-50 text-amber-600' : 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <aside className="w-72 lg:w-80 h-full p-5 flex flex-col justify-between border-l border-slate-200/80 bg-white text-slate-800 flex-shrink-0 overflow-y-auto">
      <div className="space-y-5">

        {/* Top Control Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              activeTheme === 'lumi' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500 animate-pulse'
            }`}></span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Pokemon Trainer Live
            </span>
          </div>

          <button 
            onClick={() => setActiveTheme(activeTheme === 'lumi' ? 'raka' : 'lumi')}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition"
            title="Ganti Tema Karakter Pokemon"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card: Circle Avatar with Arc Ring */}
        <div className="flex flex-col items-center text-center pt-1">
          <div className="relative group cursor-pointer" onClick={() => setActiveTheme(activeTheme === 'lumi' ? 'raka' : 'lumi')}>
            {/* Gradient Arc Ring around Avatar */}
            <div className={`w-24 h-24 rounded-full p-1 transition-all duration-300 ${
              activeTheme === 'lumi'
                ? 'bg-gradient-to-tr from-[#38C7B4] via-amber-300 to-[#FF7D7D]'
                : 'bg-gradient-to-tr from-rose-500 via-amber-400 to-cyan-500'
            }`}>
              <img 
                src={trainerAvatar} 
                alt="Trainer Jennifer" 
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>

            {/* Mascot Mini Badge Overlay */}
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-xs flex items-center justify-center bg-slate-100">
              <img 
                src={activeTheme === 'lumi' ? lumiMascot : rakaMascot} 
                alt="Active Mascot" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h3 className="text-base font-black tracking-tight text-slate-800 mt-2.5" style={{ fontFamily: 'var(--font-accent)' }}>
            Jennifer Turner
          </h3>
          <p className="text-xs font-semibold text-slate-400">
            {activeTheme === 'lumi' ? '⚡ Trainer Elektrik & Finansial' : '🔥 Fire Champion & Fin-Officer'}
          </p>

          {/* Quick Level & Budget Badge */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
              activeTheme === 'lumi' 
                ? 'bg-teal-50 text-teal-700 border border-teal-200' 
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              Level 18 Master
            </span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {100 - budgetUsagePercent}% Anggaran Sisa
            </span>
          </div>
        </div>

        {/* Section: Next Events */}
        <div>
          <div className="flex items-center justify-between mb-2 px-0.5">
            <h4 className="text-[11px] font-black tracking-tight uppercase text-slate-400">
              Next events
            </h4>
            <button 
              onClick={onOpenAddModal}
              className={`text-[11px] font-bold flex items-center gap-0.5 transition ${
                activeTheme === 'lumi' ? 'text-teal-600 hover:text-teal-700' : 'text-rose-600 hover:text-rose-700'
              }`}
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-2">
            {upcomingEvents.map(evt => {
              const Icon = evt.icon;
              return (
                <div 
                  key={evt.id}
                  className="p-3 rounded-xl flex items-center justify-between border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-all"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${evt.iconBg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 leading-snug">{evt.title}</h5>
                      <p className="text-[10px] text-slate-400 font-medium">{evt.time}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-slate-700">{evt.amount}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: New Notifications */}
        {notificationVisible && (
          <div>
            <div className="flex items-center justify-between mb-2 px-0.5">
              <h4 className="text-[11px] font-black tracking-tight uppercase text-slate-400">
                New notifications
              </h4>
            </div>

            <div className={`p-3.5 rounded-2xl relative border shadow-xs transition-all duration-300 ${
              activeTheme === 'lumi'
                ? 'bg-gradient-to-br from-[#38C7B4] to-[#2BA998] text-white border-teal-300'
                : 'bg-gradient-to-br from-[#EF4444] to-[#DC2626] text-white border-rose-400'
            }`}>
              <button 
                onClick={() => setNotificationVisible(false)}
                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xs transition"
                title="Tutup pesan"
              >
                <X className="w-3 h-3" />
              </button>

              <div className="flex items-center space-x-2 mb-2 pr-6">
                <img 
                  src={activeTheme === 'lumi' ? lumiMascot : rakaMascot} 
                  alt="Mascot"
                  className="w-7 h-7 rounded-lg object-cover border border-white/50"
                />
                <div>
                  <span className="text-xs font-black block leading-tight">
                    {activeTheme === 'lumi' ? '⚡ Lumi Pokemon' : '🔥 Raka Champion'}
                  </span>
                  <span className="text-[9px] font-semibold opacity-90">
                    {activeTheme === 'lumi' ? 'Asisten Ramah & Penghemat' : 'Disiplin & Tanpa Toleransi'}
                  </span>
                </div>
              </div>

              <p className="text-xs font-medium leading-relaxed opacity-95">
                "{currentQuote}"
              </p>

              <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/20">
                <span className="text-[9px] font-bold opacity-80">
                  FR-07 AI Mascot
                </span>
                <button
                  onClick={() => setAdviceIndex(prev => prev + 1)}
                  className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition flex items-center gap-1"
                >
                  <span>Saran Lain</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Info */}
      <div className="pt-3 text-center border-t border-slate-100">
        <p className="text-[10px] font-semibold text-slate-400">
          SakuKita PWA · Pokemon Edition
        </p>
      </div>
    </aside>
  );
}
