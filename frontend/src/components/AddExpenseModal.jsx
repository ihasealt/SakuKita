import React, { useState } from 'react';
import { X, Plus, Wallet, Tag } from 'lucide-react';

export default function AddExpenseModal({ isOpen, onClose, onAddExpense }) {
  const [date, setDate] = useState('4-Sep-2026');
  const [detail, setDetail] = useState('');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('Gopay');
  const [category, setCategory] = useState('Giving');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!detail || !amount) return;

    onAddExpense({
      id: Date.now(),
      checked: false,
      date: date || '4-Sep-2026',
      detail,
      amount: parseFloat(amount),
      account,
      category,
    });

    setDetail('');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
      <div className="bg-[#FAFDF7] border-2 border-[#A8C782] w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#D0E5BC] pb-3">
          <div className="flex items-center space-x-2 text-[#243B1A]">
            <Wallet className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg font-black font-sans">Tambah Pengeluaran Baru</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-[#E2F0CE] text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-[#2C4222]">
          
          {/* Detail Input */}
          <div>
            <label className="block mb-1">Detail Transaksi</label>
            <input
              type="text"
              required
              placeholder="Contoh: Beli Kopi, Sedekah, Jajan..."
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="w-full bg-white border border-[#A5C87D] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800"
            />
          </div>

          {/* Nominal Input */}
          <div>
            <label className="block mb-1">Nominal (Rp)</label>
            <input
              type="number"
              required
              placeholder="Contoh: 15000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white border border-[#A5C87D] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Account Selector */}
            <div>
              <label className="block mb-1">Akun</label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full bg-white border border-[#A5C87D] rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-800"
              >
                <option value="Cash">Cash</option>
                <option value="Gopay">Gopay</option>
                <option value="Bank BNI">Bank BNI</option>
                <option value="Bank Mandiri">Bank Mandiri</option>
                <option value="Bank Seabank">Bank Seabank</option>
              </select>
            </div>

            {/* Category Selector */}
            <div>
              <label className="block mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-[#A5C87D] rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-800"
              >
                <option value="Giving">Giving</option>
                <option value="Playing">Playing</option>
                <option value="Savings">Savings</option>
                <option value="Living">Living</option>
              </select>
            </div>
          </div>

          {/* Tanggal Input */}
          <div>
            <label className="block mb-1">Tanggal</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="4-Sep-2026"
              className="w-full bg-white border border-[#A5C87D] rounded-xl px-3 py-2 text-xs text-slate-800"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-xl font-bold transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#2D4521] hover:bg-[#1E3016] text-white py-2.5 rounded-xl font-bold transition shadow-md flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Simpan Transaksi
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
