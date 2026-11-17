import { useState } from 'react';
import { Sparkles, Check, RefreshCw, CheckCircle2, FileText, Send } from 'lucide-react';

export default function AIInputSection({ onConfirmTransaction }) {
  const [nlpInput, setNlpInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [activeTabMode, setActiveTabMode] = useState('text'); // 'text' | 'ocr'

  // Simulated Receipt OCR presets
  const sampleReceipts = [
    {
      merchant: 'Indomaret Minimal',
      amount: 84500,
      category: 'Kebutuhan Harian',
      wallet: 'QRIS',
      date: '2026-09-10',
      items: ['Susu UHT 1L', 'Roti Tawar', 'Air Mineral 600ml'],
      notes: 'Belanja struk Indomaret',
      confidence: 0.95
    },
    {
      merchant: 'Starbucks Coffee',
      amount: 58000,
      category: 'Makanan & Minuman',
      wallet: 'Gopay',
      date: '2026-09-11',
      items: ['Iced Caramel Macchiato', 'Croissant Chocolate'],
      notes: 'Ngopi kerja pagi',
      confidence: 0.98
    }
  ];

  const handleProcessNLP = (textToParse) => {
    const query = textToParse || nlpInput;
    if (!query.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      let amount = 18000;
      let category = 'Makanan & Minuman';
      let wallet = 'Gopay';

      const lower = query.toLowerCase();

      const numMatch = lower.match(/(\d+)\s*(rb|k)?/);
      if (numMatch) {
        let val = parseInt(numMatch[1], 10);
        if (numMatch[2] === 'rb' || numMatch[2] === 'k') val *= 1000;
        amount = val;
      }

      if (lower.includes('bca')) wallet = 'Bank BCA';
      else if (lower.includes('gopay')) wallet = 'Gopay';
      else if (lower.includes('ovo')) wallet = 'Ovo';
      else if (lower.includes('qris')) wallet = 'QRIS';
      else if (lower.includes('mandiri')) wallet = 'Bank Mandiri';
      else if (lower.includes('cash') || lower.includes('tunai')) wallet = 'Tunai';

      if (lower.includes('soto') || lower.includes('makan') || lower.includes('kopi') || lower.includes('jajan')) {
        category = 'Makanan & Minuman';
      } else if (lower.includes('bensin') || lower.includes('gojek') || lower.includes('grab')) {
        category = 'Transportasi';
      } else if (lower.includes('gaji') || lower.includes('bonus')) {
        category = 'Pemasukan';
      }

      setParsedData({
        type: lower.includes('gaji') ? 'income' : 'expense',
        amount,
        category,
        wallet,
        merchant: query.split(/\d+/)[0].trim() || query,
        date: new Date().toISOString().split('T')[0],
        notes: query,
        confidence: 0.95
      });

      setIsProcessing(false);
    }, 400);
  };

  const handleSimulateOCR = (receiptSample) => {
    setIsProcessing(true);
    setTimeout(() => {
      setParsedData({
        type: 'expense',
        amount: receiptSample.amount,
        category: receiptSample.category,
        wallet: receiptSample.wallet,
        merchant: receiptSample.merchant,
        date: receiptSample.date,
        items: receiptSample.items,
        notes: receiptSample.notes,
        confidence: receiptSample.confidence
      });
      setIsProcessing(false);
    }, 400);
  };

  const handleConfirmAndSave = () => {
    if (!parsedData) return;

    onConfirmTransaction({
      id: Date.now(),
      checked: false,
      date: parsedData.date,
      detail: parsedData.merchant || parsedData.notes,
      amount: parsedData.amount,
      account: parsedData.wallet,
      category: parsedData.category,
      items: parsedData.items || []
    });

    setParsedData(null);
    setNlpInput('');
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="space-y-4 animate-fade-in">

      {/* Main Form Card */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs space-y-4">
        
        {/* Mode Switcher */}
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 persona-accent-text" />
            <h3 className="text-sm font-black text-slate-800">
              Metode Input Transaksi Otomatis
            </h3>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTabMode('text')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                activeTabMode === 'text' ? 'persona-accent-soft shadow-xs font-black' : 'text-slate-500'
              }`}
            >
              Natural Language (Teks)
            </button>
            <button
              onClick={() => setActiveTabMode('ocr')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                activeTabMode === 'ocr' ? 'persona-accent-soft shadow-xs font-black' : 'text-slate-500'
              }`}
            >
              Scan Struk (Vision OCR)
            </button>
          </div>
        </div>

        {/* Option 1: NLP Text Input */}
        {activeTabMode === 'text' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nlpInput}
                onChange={(e) => setNlpInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleProcessNLP()}
                placeholder="Contoh: 'Beli soto ayam 18rb pake gopay' atau 'Jajan kopi 25k BCA'..."
                className="persona-focus flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none placeholder:text-slate-400 focus:bg-white"
              />
              <button
                onClick={() => handleProcessNLP()}
                disabled={isProcessing || !nlpInput.trim()}
                className="persona-accent-bg flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black transition disabled:opacity-50"
              >
                {isProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Ekstrak AI</span>
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="flex items-center flex-wrap gap-1.5 text-[11px]">
              <span className="text-slate-400 font-bold">Coba prompt:</span>
              {[
                'Makan siang padang 28rb Tunai',
                'Isi bensin pertamax 50rb BCA',
                'Jajan boba 24rb Gopay',
                'Beli susu indomaret 19k QRIS'
              ].map((sample) => (
                <button
                  key={sample}
                  onClick={() => {
                    setNlpInput(sample);
                    handleProcessNLP(sample);
                  }}
                  className="persona-accent-hover rounded-lg bg-slate-100 px-2.5 py-0.5 font-semibold text-slate-600 transition"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Option 2: OCR Struk Input */}
        {activeTabMode === 'ocr' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 font-semibold">
              Pilih sampel struk belanja di bawah ini untuk simulasi ekstraksi Vision AI otomatis:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sampleReceipts.map((sample, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSimulateOCR(sample)}
                  className="persona-accent-hover flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition"
                >
                  <div className="flex items-center space-x-2.5">
                    <FileText className="w-5 h-5 persona-accent-text" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{sample.merchant}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">{sample.items.join(', ')}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-slate-800">
                    {formatRupiah(sample.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 1-Tap AI Confirmation Card */}
      {parsedData && (
        <div className="persona-accent-border animate-fade-in space-y-3 rounded-2xl border-2 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between border-b pb-2.5 border-slate-100">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 persona-accent-text" />
              <h4 className="text-sm font-black text-slate-800">Hasil Parsing AI (1-Tap Konfirmasi)</h4>
            </div>
            <span className="persona-accent-soft rounded-full border border-[var(--surface-border)] px-2.5 py-0.5 text-[10px] font-extrabold">
              Confidence: {Math.round(parsedData.confidence * 100)}%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Detail</span>
              <span className="font-black text-slate-800">{parsedData.merchant}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Nominal</span>
              <span className="font-black text-rose-600">{formatRupiah(parsedData.amount)}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Dompet</span>
              <span className="font-black text-slate-800">{parsedData.wallet}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Kategori</span>
              <span className="font-black text-slate-800">{parsedData.category}</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={() => setParsedData(null)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              Batal
            </button>
            <button
              onClick={handleConfirmAndSave}
              className="persona-accent-bg flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-black shadow-xs transition"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Konfirmasi & Simpan Buku Kas</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
