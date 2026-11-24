import { useState } from 'react';
import { Plus, Wallet, X } from 'lucide-react';

const getToday = () => {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

export default function AddExpenseModal({ isOpen, onClose, onAddExpense, accounts }) {
  const [date, setDate] = useState(getToday);
  const [detail, setDetail] = useState('');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState(accounts[0] || '');
  const [category, setCategory] = useState('Living');

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const numericAmount = Number(amount);
    if (!detail.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0 || !date || !account) return;

    onAddExpense({
      id: Date.now(),
      checked: false,
      date,
      detail: detail.trim(),
      amount: numericAmount,
      account,
      category,
    });

    setDetail('');
    setAmount('');
    setDate(getToday());
    onClose();
  };

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-expense-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl persona-accent-soft">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <h2 id="add-expense-title" className="text-lg font-extrabold text-slate-900">
                Catat pengeluaran
              </h2>
              <p className="mt-1 text-sm text-slate-500">Isi detail sederhana agar catatanmu tetap rapi.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup form"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="expense-detail" className="mb-1.5 block text-sm font-bold text-slate-700">
              Untuk apa pengeluaran ini?
            </label>
            <input
              id="expense-detail"
              type="text"
              required
              autoFocus
              maxLength={100}
              placeholder="Contoh: Makan siang"
              value={detail}
              onChange={(event) => setDetail(event.target.value)}
              className="persona-focus h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="expense-amount" className="mb-1.5 block text-sm font-bold text-slate-700">
                Nominal (Rp)
              </label>
              <input
                id="expense-amount"
                type="number"
                required
                min="1"
                step="1"
                inputMode="numeric"
                placeholder="15000"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="persona-focus h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400"
              />
            </div>
            <div>
              <label htmlFor="expense-date" className="mb-1.5 block text-sm font-bold text-slate-700">
                Tanggal
              </label>
              <input
                id="expense-date"
                type="date"
                required
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="persona-focus h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none transition"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="expense-account" className="mb-1.5 block text-sm font-bold text-slate-700">
                Sumber dana
              </label>
              <select
                id="expense-account"
                value={account}
                onChange={(event) => setAccount(event.target.value)}
                required
                className="persona-focus h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition"
              >
                {accounts.map((walletName) => <option key={walletName} value={walletName}>{walletName}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="expense-category" className="mb-1.5 block text-sm font-bold text-slate-700">
                Kategori
              </label>
              <select
                id="expense-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="persona-focus h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition"
              >
                <option value="Living">Kebutuhan</option>
                <option value="Playing">Hiburan</option>
                <option value="Savings">Tabungan</option>
                <option value="Giving">Berbagi</option>
                <option value="Makanan & Minuman">Makanan & Minuman</option>
                <option value="Kebutuhan Harian">Kebutuhan Harian</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="persona-accent-bg inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            >
              <Plus className="h-4 w-4" />
              Simpan pengeluaran
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

// Detailed 24 Nov 2026