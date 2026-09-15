import React, { useState, useMemo } from 'react';
import { ChevronDown, MoreVertical, Plus, CheckCircle2, Clock, XCircle, PlayCircle, Users, Sparkles, Calendar as CalendarIcon } from 'lucide-react';

export default function TaskView({ tasks, setTasks, onOpenAddModal, searchTerm }) {
  const [selectedDate, setSelectedDate] = useState('12');
  const [selectedMonth, setSelectedMonth] = useState('September 2026');

  // Days list matching Reference 2 slider
  const daysList = [
    { dayNum: '10', dayName: 'Mon', fullDate: '2026-09-10' },
    { dayNum: '11', dayName: 'Tue', fullDate: '2026-09-11' },
    { dayNum: '12', dayName: 'Wed', fullDate: '2026-09-12' },
    { dayNum: '13', dayName: 'Thu', fullDate: '2026-09-13' },
    { dayNum: '14', dayName: 'Fri', fullDate: '2026-09-14' },
    { dayNum: '15', dayName: 'Sat', fullDate: '2026-09-15' },
    { dayNum: '16', dayName: 'Sun', fullDate: '2026-09-16' },
  ];

  // Filter tasks based on search & date
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            task.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            task.status.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDate = task.date === selectedDate || task.date === 'All';
      return matchesSearch && matchesDate;
    });
  }, [tasks, searchTerm, selectedDate]);

  // Handle Status Toggle
  const updateTaskStatus = (id, newStatus) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          let newProgress = t.progress;
          if (newStatus === 'Completed') newProgress = 100;
          if (newStatus === 'Rejected') newProgress = 0;
          if (newStatus === 'Upcoming') newProgress = 0;
          if (newStatus === 'Running' && t.progress === 100) newProgress = 50;
          return { ...t, status: newStatus, progress: newProgress };
        }
        return t;
      })
    );
  };

  // Card Color Configurations (Reference 2 Aesthetics)
  const getCardStyle = (colorType) => {
    switch (colorType) {
      case 'lime':
        return {
          cardBg: 'bg-[#D4F67B]',
          textColor: 'text-[#162703]',
          subtextColor: 'text-[#2D4507]',
          iconBg: 'bg-[#182C05]',
          iconColor: 'text-[#D4F67B]',
          notchBg: 'bg-[#182C05]',
          notchText: 'text-[#D4F67B]',
          progressTrack: 'bg-[#182C05]/20',
          progressBar: 'bg-[#182C05]',
        };
      case 'cyan':
        return {
          cardBg: 'bg-[#32D5ED]',
          textColor: 'text-[#04333D]',
          subtextColor: 'text-[#0B4A57]',
          iconBg: 'bg-[#04333D]',
          iconColor: 'text-[#32D5ED]',
          notchBg: 'bg-[#04333D]',
          notchText: 'text-[#32D5ED]',
          progressTrack: 'bg-[#04333D]/20',
          progressBar: 'bg-[#04333D]',
        };
      case 'lavender':
        return {
          cardBg: 'bg-[#D8C3FF]',
          textColor: 'text-[#26104C]',
          subtextColor: 'text-[#3D1E70]',
          iconBg: 'bg-[#26104C]',
          iconColor: 'text-[#D8C3FF]',
          notchBg: 'bg-[#26104C]',
          notchText: 'text-[#D8C3FF]',
          progressTrack: 'bg-[#26104C]/20',
          progressBar: 'bg-[#26104C]',
        };
      default:
        return {
          cardBg: 'bg-[#D4F67B]',
          textColor: 'text-[#162703]',
          subtextColor: 'text-[#2D4507]',
          iconBg: 'bg-[#182C05]',
          iconColor: 'text-[#D4F67B]',
          notchBg: 'bg-[#182C05]',
          notchText: 'text-[#D4F67B]',
          progressTrack: 'bg-[#182C05]/20',
          progressBar: 'bg-[#182C05]',
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1527] text-white p-4 sm:p-6 lg:p-8 animate-fade-in font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* ========================================================================= */}
        {/* 1. HEADER & MONTH SELECTOR (Reference 2 Top Navigation) */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#1E2E4A] pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-[#182744] text-[#D4F67B] border border-[#273B63]">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-accent)' }}>
                My Tasks
              </h1>
              <p className="text-xs text-slate-400 font-medium">Jadwal Tugas & Timeline Proyek SakuKita</p>
            </div>
          </div>

          {/* Month Selector Dropdown */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button className="flex items-center space-x-2 bg-[#182744] hover:bg-[#203257] border border-[#273B63] px-4 py-2 rounded-2xl text-sm font-bold text-slate-200 transition">
                <span>{selectedMonth}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <button
              onClick={onOpenAddModal}
              className="bg-[#D4F67B] hover:bg-[#c3e668] text-[#132402] px-4 py-2 rounded-2xl text-sm font-bold transition flex items-center gap-1.5 shadow-md shadow-lime-950/40"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Tambah Task</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. HORIZONTAL CALENDAR DAY SELECTOR (Reference 2 Day Slider) */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto py-3 px-1 no-scrollbar">
          {daysList.map((item) => {
            const isActive = selectedDate === item.dayNum;
            return (
              <button
                key={item.dayNum}
                onClick={() => setSelectedDate(item.dayNum)}
                className={`flex-1 min-w-[64px] sm:min-w-[76px] py-4 px-2 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-[#D4F67B] text-[#132402] shadow-lg shadow-lime-950/60 scale-105 font-black'
                    : 'bg-[#16233B] text-slate-400 hover:bg-[#1E2E4A] border border-[#233557] font-semibold'
                }`}
              >
                <span className={`text-xl sm:text-2xl font-black ${isActive ? 'text-[#132402]' : 'text-slate-200'}`}>
                  {item.dayNum}
                </span>
                <span className="text-xs uppercase tracking-wider mt-0.5">
                  {item.dayName}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. TIMELINE & TASK CARDS GRID (Reference 2 Timeline Layout) */}
        {/* ========================================================================= */}
        <div className="space-y-6 pt-4 relative">
          
          {filteredTasks.length === 0 ? (
            <div className="bg-[#16233B] border border-[#233557] rounded-3xl p-8 text-center text-slate-400">
              <p className="text-sm font-semibold">Tidak ada tugas pada tanggal {selectedDate} ini.</p>
              <button
                onClick={onOpenAddModal}
                className="mt-3 bg-[#D4F67B] text-[#132402] px-4 py-2 rounded-xl text-xs font-bold"
              >
                + Buat Tugas Baru
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const style = getCardStyle(task.colorType);

              return (
                <div key={task.id} className="flex gap-4 sm:gap-6 items-start group">
                  
                  {/* Left Time Marker (Reference 2 Time Label) */}
                  <div className="w-16 sm:w-20 pt-4 text-right flex-shrink-0">
                    <span className="text-sm sm:text-base font-extrabold text-slate-400 font-mono">
                      {task.time}
                    </span>
                  </div>

                  {/* Vertical Dotted Connector Line */}
                  <div className="relative flex flex-col items-center self-stretch">
                    <div className="w-3 h-3 rounded-full bg-[#D4F67B] ring-4 ring-[#182744] mt-5 z-10"></div>
                    <div className="w-0.5 bg-dashed border-r-2 border-dashed border-[#283C61] flex-1 my-1"></div>
                  </div>

                  {/* Task Notch Card (Reference 2 Curved Badge Style) */}
                  <div className={`flex-1 ${style.cardBg} rounded-3xl p-5 sm:p-6 shadow-xl relative transition-all duration-300 transform group-hover:-translate-y-1`}>
                    
                    {/* Top Notch Row: Status Badge (Left) & Avatars + Progress (Right) */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      
                      {/* Status Badge Notch */}
                      <div className={`${style.notchBg} ${style.notchText} px-3.5 py-1.5 rounded-2xl text-xs font-black tracking-wide flex items-center gap-1.5 shadow-sm`}>
                        {task.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {task.status === 'Running' && <PlayCircle className="w-3.5 h-3.5 animate-spin" />}
                        {task.status === 'Rejected' && <XCircle className="w-3.5 h-3.5" />}
                        {task.status === 'Upcoming' && <Clock className="w-3.5 h-3.5" />}
                        <span>{task.status}</span>
                      </div>

                      {/* Right Side: Avatar Stack + Progress % */}
                      <div className="flex items-center space-x-3">
                        {/* Avatar Stack */}
                        <div className="flex items-center -space-x-2 overflow-hidden">
                          {task.members && task.members.map((avatar, idx) => (
                            <img
                              key={idx}
                              src={avatar}
                              alt="member"
                              className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover"
                            />
                          ))}
                          <div className={`w-7 h-7 rounded-full ${style.notchBg} ${style.notchText} border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold`}>
                            +
                          </div>
                        </div>

                        {/* Progress Line & Percentage */}
                        <div className="flex items-center space-x-2">
                          <div className={`w-14 sm:w-20 h-2 rounded-full ${style.progressTrack} overflow-hidden`}>
                            <div
                              className={`h-full ${style.progressBar} transition-all duration-500`}
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-black font-mono ${style.textColor}`}>
                            {task.progress < 10 ? `0${task.progress}%` : `${task.progress}%`}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Card Content Row: Icon + Title + Menu */}
                    <div className="flex items-start justify-between gap-3 pt-2">
                      <div className="flex items-start space-x-3.5">
                        
                        {/* Square Rounded Icon */}
                        <div className={`p-3 rounded-2xl ${style.iconBg} ${style.iconColor} shadow-md`}>
                          <Sparkles className="w-5 h-5" />
                        </div>

                        <div>
                          <h3 className={`text-lg sm:text-xl font-black ${style.textColor} leading-tight`}>
                            {task.title}
                          </h3>
                          <p className={`text-xs sm:text-sm font-bold ${style.subtextColor} mt-0.5`}>
                            {task.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Dropdown Menu for Task Actions */}
                      <div className="relative group/menu">
                        <button className={`p-1.5 rounded-xl hover:bg-black/10 ${style.textColor} transition`}>
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        
                        {/* Status Change Dropdown Menu */}
                        <div className="absolute right-0 top-8 w-40 bg-[#16233B] border border-[#283C61] text-slate-200 rounded-2xl shadow-2xl p-1.5 hidden group-hover/menu:block z-30">
                          <span className="block px-3 py-1 text-[10px] font-bold text-slate-400 uppercase">Ubah Status:</span>
                          <button
                            onClick={() => updateTaskStatus(task.id, 'Completed')}
                            className="w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-[#D4F67B] hover:text-[#132402] rounded-xl transition"
                          >
                            ✓ Completed
                          </button>
                          <button
                            onClick={() => updateTaskStatus(task.id, 'Running')}
                            className="w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-[#D8C3FF] hover:text-[#26104C] rounded-xl transition"
                          >
                            ▶ Running
                          </button>
                          <button
                            onClick={() => updateTaskStatus(task.id, 'Upcoming')}
                            className="w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-amber-300 hover:text-amber-950 rounded-xl transition"
                          >
                            ⏱ Upcoming
                          </button>
                          <button
                            onClick={() => updateTaskStatus(task.id, 'Rejected')}
                            className="w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-[#32D5ED] hover:text-[#04333D] rounded-xl transition"
                          >
                            ✕ Rejected
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })
          )}

        </div>

      </div>
    </div>
  );
}
