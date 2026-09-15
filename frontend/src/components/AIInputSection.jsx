import React, { useState } from 'react';
import { Sparkles, Camera, Check, ArrowRight, Zap, RefreshCw, CheckCircle2, ShieldCheck, FileText, Send, User, Tag, Wallet, Award, FileSpreadsheet, PlusCircle } from 'lucide-react';

export default function AIInputSection({ activeTheme, onConfirmTransaction }) {
  const [nlpInput, setNlpInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [activeTabMode, setActiveTabMode] = useState('text'); // 'text' | 'ocr'

  const [selectedWallet, setSelectedWallet] = useState('Gopay');
  const [selectedCategory, setSelectedCategory] = useState('Makanan & Minuman');

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
      let category = selectedCategory || 'Makanan & Minuman';
      let wallet = selectedWallet || 'Gopay';

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
    }, 500);
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
    }, 600);
  };

  const handleConfirm1Tap = () => {
    if (!parsedData) return;

    onConfirmTransaction({
      id: Date.now(),
      checked: false,
      date: parsedData.date,
      detail: parsedData.merchant,
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
    <div className="space-y-7">

      {/* ========================================================================= */}
      {/* GREETING HEADER */}
      {/* ========================================================================= */}
      <div className="space-y-1.5">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2" style={{ fontFamily: 'var(--font-accent)' }}>
          Helaur, User SakuKita! 👋
        </h2>
        <p className="text-sm sm:text-base font-semibold opacity-80 leading-relaxed">
          Mulailah dengan mencatat pencapaian & pengeluaran terbaru Anda untuk membangun rekam jejak keuangan yang terstruktur dan bermakna.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* DUAL BOX FORM CARDS */}
      {/* ========================================================================= */}

      {/* ------------------------------------------------------------------------- */}
      {/* BOX 1: KATEGORI DAN DOMPET UTAMA */}
      {/* ------------------------------------------------------------------------- */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 transition-all ${activeTheme === 'lumi'
          ? 'bg-white border-orange-200 text-slate-900'
          : 'bg-[#1E293B] border-slate-700 text-white'
        }`}>

        {/* Section Header */}
        <div className="flex items-center space-x-3.5 border-b pb-4 border-slate-100 dark:border-slate-800">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xl shadow-xs ${activeTheme === 'lumi' ? 'bg-orange-100 text-orange-600' : 'bg-slate-700 text-slate-200'
            }`}>
            🟡
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight">Kategori dan Level Dompet</h3>
            <p className="text-xs sm:text-sm font-bold opacity-70">Pilih moda input data dan dompet transaksi yang digunakan</p>
          </div>
        </div>

        {/* Dual Box Row 1: Segmented Switcher */}
        <div>
          <label className="block text-xs sm:text-sm font-black uppercase tracking-wider opacity-80 mb-2.5">
            Mode Transaksi (NLP AI vs Vision OCR)
          </label>
          <div className={`p-1.5 rounded-2xl border flex items-center gap-2 ${activeTheme === 'lumi' ? 'bg-orange-50 border-orange-200' : 'bg-slate-900 border-slate-700'
            }`}>
            <button
              type="button"
              onClick={() => setActiveTabMode('text')}
              className={`flex-1 py-3 px-5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${activeTabMode === 'text'
                  ? activeTheme === 'lumi'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-300'
                    : 'bg-slate-700 text-white shadow-md border border-slate-600'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
            >
              <Zap className="w-4 h-4" />
              <span>Input Teks AI (NLP Parser)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTabMode('ocr')}
              className={`flex-1 py-3 px-5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${activeTabMode === 'ocr'
                  ? activeTheme === 'lumi'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-300'
                    : 'bg-slate-700 text-white shadow-md border border-slate-600'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
            >
              <Camera className="w-4 h-4" />
              <span>Smart Receipt OCR</span>
            </button>
          </div>
        </div>

        {/* Dual Box Row 2: 2 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Level / Dompet Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-black uppercase tracking-wider opacity-80 mb-2 flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-orange-500" /> Dompet Utama
            </label>
            <select
              value={selectedWallet}
              onChange={(e) => setSelectedWallet(e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl text-sm sm:text-base font-extrabold border focus:outline-none transition ${activeTheme === 'lumi'
                  ? 'bg-orange-50/40 border-orange-200 focus:border-orange-500 text-slate-900'
                  : 'bg-slate-900 border-slate-700 focus:border-slate-500 text-white'
                }`}
            >
              <option value="Gopay">Gopay (E-Wallet)</option>
              <option value="Tunai">Tunai (Cash)</option>
              <option value="Bank BCA">Bank BCA</option>
              <option value="Bank Mandiri">Bank Mandiri</option>
              <option value="QRIS">QRIS Standar</option>
              <option value="Ovo">Ovo E-Money</option>
            </select>
          </div>

          {/* Kategori Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-black uppercase tracking-wider opacity-80 mb-2 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-orange-500" /> Kategori Default
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl text-sm sm:text-base font-extrabold border focus:outline-none transition ${activeTheme === 'lumi'
                  ? 'bg-orange-50/40 border-orange-200 focus:border-orange-500 text-slate-900'
                  : 'bg-slate-900 border-slate-700 focus:border-slate-500 text-white'
                }`}
            >
              <option value="Makanan & Minuman">Makanan & Minuman</option>
              <option value="Kebutuhan Harian">Kebutuhan Harian</option>
              <option value="Transportasi">Transportasi</option>
              <option value="Giving">Giving / Sedekah</option>
              <option value="Living">Living / Gaya Hidup</option>
              <option value="Savings">Savings / Tabungan</option>
            </select>
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------------------- */}
      {/* BOX 2: INFORMASI TRANSAKSI (NLP Natural Language Input) */}
      {/* ------------------------------------------------------------------------- */}
      {activeTabMode === 'text' && (
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 transition-all ${activeTheme === 'lumi'
            ? 'bg-white border-orange-200 text-slate-900'
            : 'bg-[#1E293B] border-slate-700 text-white'
          }`}>

          {/* Section Header */}
          <div className="flex items-center space-x-3.5 border-b pb-4 border-slate-100 dark:border-slate-800">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xl shadow-xs ${activeTheme === 'lumi' ? 'bg-orange-100 text-orange-600' : 'bg-slate-700 text-slate-200'
              }`}>
              👤
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">Informasi Transaksi Teks AI</h3>
              <p className="text-xs sm:text-sm font-bold opacity-70">Ketik deskripsi santai, AI akan mengekstrak nominal, dompet & kategori secara otomatis</p>
            </div>
          </div>

          {/* Dual Box Input Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-black uppercase tracking-wider opacity-80 mb-2">
                Kalimat / Catatan Bebas Transaksi
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  placeholder="Contoh: soto ayam 18rb gopay, bensin 50rb bca..."
                  value={nlpInput}
                  onChange={(e) => setNlpInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleProcessNLP()}
                  className={`w-full px-5 py-3.5 rounded-2xl text-base sm:text-lg font-bold border focus:outline-none transition ${activeTheme === 'lumi'
                      ? 'bg-orange-50/40 border-orange-200 focus:ring-2 focus:ring-orange-400 text-slate-900'
                      : 'bg-slate-900 border-slate-700 focus:ring-2 focus:ring-slate-500 text-white'
                    }`}
                />

                <button
                  type="button"
                  onClick={() => handleProcessNLP()}
                  disabled={isProcessing}
                  className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-black text-sm sm:text-base whitespace-nowrap transition flex items-center justify-center gap-2 shadow-md ${activeTheme === 'lumi'
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-300'
                      : 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600'
                    }`}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Memproses AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Proses AI (&lt; 3 dtk)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex items-center flex-wrap gap-2.5 pt-2">
              <span className="text-xs sm:text-sm font-extrabold opacity-75">Contoh Cepat:</span>
              {[
                "soto 18rb gopay",
                "bensin 50rb bca",
                "jajan kopi 25rb qris",
                "gaji 5000rb mandiri"
              ].map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setNlpInput(chip);
                    handleProcessNLP(chip);
                  }}
                  className={`text-xs sm:text-sm font-bold px-4 py-1.5 rounded-xl border transition ${activeTheme === 'lumi'
                      ? 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-950'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                >
                  + "{chip}"
                </button>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* BOX 3: DOKUMENTASI KEGIATAN / SMART VISION OCR */}
      {/* ------------------------------------------------------------------------- */}
      {activeTabMode === 'ocr' && (
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 transition-all ${activeTheme === 'lumi'
            ? 'bg-white border-orange-200 text-slate-900'
            : 'bg-[#1E293B] border-slate-700 text-white'
          }`}>

          {/* Section Header */}
          <div className="flex items-center space-x-3.5 border-b pb-4 border-slate-100 dark:border-slate-800">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xl shadow-xs ${activeTheme === 'lumi' ? 'bg-orange-100 text-orange-600' : 'bg-slate-700 text-slate-200'
              }`}>
              📄
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">Dokumentasi Kegiatan & Smart OCR</h3>
              <p className="text-xs sm:text-sm font-bold opacity-70">Unggah foto bukti fisik struk atau gunakan sampel simulasi AI Vision</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Dashed Upload Box */}
            <div className={`border-2 border-dashed rounded-3xl p-7 text-center flex flex-col items-center justify-center space-y-3.5 cursor-pointer transition ${activeTheme === 'lumi'
                ? 'border-orange-300 hover:border-orange-500 bg-orange-50/30 hover:bg-orange-50'
                : 'border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-900'
              }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${activeTheme === 'lumi' ? 'bg-orange-100 text-orange-600' : 'bg-slate-700 text-white'
                }`}>
                <Camera className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100">
                  Upload Bukti Struk
                </p>
                <p className="text-xs font-semibold opacity-70 mt-1">
                  kegiatan berupa foto dokumentasi atau sertifikat struk (JPG, PNG)
                </p>
              </div>
              <button
                type="button"
                className="mt-2 px-5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-black bg-white dark:bg-slate-800 shadow-xs hover:bg-slate-100"
              >
                Upload File
              </button>
            </div>

            {/* Quick Test Receipt Presets */}
            <div className="space-y-3.5">
              <span className="text-xs sm:text-sm font-black opacity-80 block">Atau Pilih Contoh Struk Simulasi Vision AI:</span>

              {sampleReceipts.map((sample, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSimulateOCR(sample)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${activeTheme === 'lumi'
                      ? 'bg-orange-50/40 hover:bg-orange-100/60 border-orange-200'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-700'
                    }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <FileText className={`w-6 h-6 ${activeTheme === 'lumi' ? 'text-orange-600' : 'text-slate-300'}`} />
                    <div>
                      <h4 className="text-sm font-black">{sample.merchant}</h4>
                      <p className="text-xs font-semibold opacity-70">{sample.items.join(', ')}</p>
                    </div>
                  </div>

                  <span className="text-sm font-black text-orange-600 dark:text-slate-200">
                    {formatRupiah(sample.amount)}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* BOX 4: DETAIL PRESTASI & VALIDASI 1-TAP */}
      {/* ------------------------------------------------------------------------- */}
      {parsedData && (
        <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl animate-fade-in space-y-6 transition-all ${activeTheme === 'lumi'
            ? 'bg-white border-orange-400 text-slate-900'
            : 'bg-[#1E293B] border-slate-600 text-white'
          }`}>

          {/* Section Header */}
          <div className="flex items-center justify-between border-b pb-4 border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-3.5">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xl shadow-xs ${activeTheme === 'lumi' ? 'bg-orange-100 text-orange-600' : 'bg-slate-700 text-slate-200'
                }`}>
                🏅
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black tracking-tight">Detail Validasi AI (1-Tap Confirmation)</h3>
                <p className="text-xs sm:text-sm font-bold opacity-70">Review hasil ekstraksi data sebelum dimasukkan ke dalam buku kas</p>
              </div>
            </div>

            {/* AI Confidence Badge */}
            <span className={`text-xs font-black px-4 py-1.5 rounded-full border flex items-center gap-1.5 ${activeTheme === 'lumi'
                ? 'bg-orange-100 text-orange-900 border-orange-300'
                : 'bg-slate-800 text-slate-200 border-slate-700'
              }`}>
              <Sparkles className="w-4 h-4" />
              {(parsedData.confidence * 100).toFixed(0)}% Confidence Score
            </span>
          </div>

          {/* Dual Box 2-Column Grid Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Merchant / Detail */}
            <div>
              <label className="block text-xs sm:text-sm font-black uppercase tracking-wider opacity-80 mb-2">
                Nama Detail / Merchant
              </label>
              <input
                type="text"
                value={parsedData.merchant}
                onChange={(e) => setParsedData({ ...parsedData, merchant: e.target.value })}
                className={`w-full px-4 py-3 rounded-2xl text-sm sm:text-base font-extrabold border focus:outline-none transition ${activeTheme === 'lumi'
                    ? 'bg-orange-50/40 border-orange-200 text-slate-900'
                    : 'bg-slate-900 border-slate-700 text-white'
                  }`}
              />
            </div>

            {/* Nominal */}
            <div>
              <label className="block text-xs sm:text-sm font-black uppercase tracking-wider opacity-80 mb-2">
                Nominal Transaksi (IDR)
              </label>
              <input
                type="number"
                value={parsedData.amount}
                onChange={(e) => setParsedData({ ...parsedData, amount: parseFloat(e.target.value) || 0 })}
                className={`w-full px-4 py-3 rounded-2xl text-sm sm:text-base font-black border focus:outline-none transition text-rose-600 dark:text-rose-400 ${activeTheme === 'lumi'
                    ? 'bg-orange-50/40 border-orange-200'
                    : 'bg-slate-900 border-slate-700'
                  }`}
              />
            </div>

            {/* Status Kategori */}
            <div>
              <label className="block text-xs sm:text-sm font-black uppercase tracking-wider opacity-80 mb-2">
                Status Kategori
              </label>
              <select
                value={parsedData.category}
                onChange={(e) => setParsedData({ ...parsedData, category: e.target.value })}
                className={`w-full px-4 py-3 rounded-2xl text-sm sm:text-base font-extrabold border focus:outline-none transition ${activeTheme === 'lumi'
                    ? 'bg-orange-50/40 border-orange-200 text-slate-900'
                    : 'bg-slate-900 border-slate-700 text-white'
                  }`}
              >
                <option value="Makanan & Minuman">Makanan & Minuman</option>
                <option value="Kebutuhan Harian">Kebutuhan Harian</option>
                <option value="Transportasi">Transportasi</option>
                <option value="Giving">Giving</option>
                <option value="Living">Living</option>
                <option value="Pemasukan">Pemasukan</option>
              </select>
            </div>

            {/* Dompet Tujuan */}
            <div>
              <label className="block text-xs sm:text-sm font-black uppercase tracking-wider opacity-80 mb-2">
                Dompet Tujuan (Account)
              </label>
              <select
                value={parsedData.wallet}
                onChange={(e) => setParsedData({ ...parsedData, wallet: e.target.value })}
                className={`w-full px-4 py-3 rounded-2xl text-sm sm:text-base font-extrabold border focus:outline-none transition ${activeTheme === 'lumi'
                    ? 'bg-orange-50/40 border-orange-200 text-slate-900'
                    : 'bg-slate-900 border-slate-700 text-white'
                  }`}
              >
                <option value="Gopay">Gopay</option>
                <option value="Tunai">Tunai</option>
                <option value="Bank BCA">Bank BCA</option>
                <option value="Bank Mandiri">Bank Mandiri</option>
                <option value="QRIS">QRIS</option>
                <option value="Ovo">Ovo</option>
              </select>
            </div>

          </div>

          {/* Itemized list if OCR */}
          {parsedData.items && parsedData.items.length > 0 && (
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1.5 ${activeTheme === 'lumi' ? 'bg-orange-50 border-orange-200' : 'bg-slate-900 border-slate-700'
              }`}>
              <span className="font-black block">Rincian Barang (OCR Vision):</span>
              <ul className="list-disc list-inside font-bold opacity-85">
                {parsedData.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* PROMINENT BOTTOM CTA BUTTON */}
          <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={() => setParsedData(null)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={handleConfirm1Tap}
              className={`w-full py-4 px-7 rounded-2xl font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg ${activeTheme === 'lumi'
                  ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-300'
                  : 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 shadow-slate-900'
                }`}
            >
              <Send className="w-5 h-5 fill-current" />
              <span>Kirim Verifikasi 1-Tap</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

