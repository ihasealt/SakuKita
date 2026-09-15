import React, { useState } from 'react';
import { X, Plus, Calendar, Sparkles } from 'lucide-react';

export default function AddTaskModal({ isOpen, onClose, onAddTask }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [time, setTime] = useState('02 pm');
  const [date, setDate] = useState('12');
  const [status, setStatus] = useState('Running');
  const [colorType, setColorType] = useState('lime');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    let progress = 0;
    if (status === 'Completed') progress = 100;
    if (status === 'Running') progress = 50;

    onAddTask({
      id: Date.now(),
      title,
      subtitle: subtitle || 'Personal task',
      time,
      date,
      status,
      progress,
      colorType,
      members: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
      ]
    });

    setTitle('');
    setSubtitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in font-sans">
      <div className="bg-[#152037] border border-[#273B63] w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5 text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#273B63] pb-3">
          <div className="flex items-center space-x-2 text-[#D4F67B]">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-lg font-black tracking-tight">Tambah Task / Jadwal Baru</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-[#203257] text-slate-400 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-300">
          
          {/* Title Input */}
          <div>
            <label className="block mb-1 text-slate-200">Judul Task</label>
            <input
              type="text"
              required
              placeholder="Contoh: Web Design, Market Research..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0D1527] border border-[#273B63] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D4F67B]"
            />
          </div>

          {/* Subtitle / Project Category */}
          <div>
            <label className="block mb-1 text-slate-200">Kategori / Subtitle</label>
            <input
              type="text"
              placeholder="Contoh: Client project, Family task..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-[#0D1527] border border-[#273B63] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D4F67B]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Time Marker */}
            <div>
              <label className="block mb-1 text-slate-200">Jam (Time)</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#0D1527] border border-[#273B63] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="10 am">10 am</option>
                <option value="02 pm">02 pm</option>
                <option value="03 pm">03 pm</option>
                <option value="04 pm">04 pm</option>
                <option value="06 pm">06 pm</option>
                <option value="08 pm">08 pm</option>
                <option value="10 pm">10 pm</option>
              </select>
            </div>

            {/* Date Marker */}
            <div>
              <label className="block mb-1 text-slate-200">Tanggal (Day)</label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#0D1527] border border-[#273B63] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="10">10 Mon</option>
                <option value="11">11 Tue</option>
                <option value="12">12 Wed</option>
                <option value="13">13 Thu</option>
                <option value="14">14 Fri</option>
                <option value="15">15 Sat</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Status Selector */}
            <div>
              <label className="block mb-1 text-slate-200">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#0D1527] border border-[#273B63] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="Completed">Completed</option>
                <option value="Running">Running</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Theme Card Selector */}
            <div>
              <label className="block mb-1 text-slate-200">Warna Kartu</label>
              <select
                value={colorType}
                onChange={(e) => setColorType(e.target.value)}
                className="w-full bg-[#0D1527] border border-[#273B63] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="lime">Lime Green (Aksen 1)</option>
                <option value="cyan">Bright Cyan (Aksen 2)</option>
                <option value="lavender">Pastel Lavender (Aksen 3)</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#1E2E4A] hover:bg-[#273B63] text-slate-300 py-2.5 rounded-xl font-bold transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#D4F67B] hover:bg-[#c3e668] text-[#132402] py-2.5 rounded-xl font-bold transition shadow-md flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Simpan Task
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
