import { useState, useEffect } from 'react';
import ThemeSwitcherBar from './components/ThemeSwitcherBar';
import AIMascotAdvisor from './components/AIMascotAdvisor';
import AIInputSection from './components/AIInputSection';
import MultiWalletGrid from './components/MultiWalletGrid';
import AnalyticsCharts from './components/AnalyticsCharts';
import FinanceView from './components/FinanceView';
import AddExpenseModal from './components/AddExpenseModal';
import './App.css';

export default function App() {
  const [activeTheme, setActiveTheme] = useState('lumi'); // 'lumi' | 'raka'
  const [activeTab, setActiveTab] = useState('input'); // 'input' | 'wallets' | 'analytics'

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Initial Multi-Wallet Balances (PRD FR-05)
  const [wallets, setWallets] = useState({
    'Tunai': 1041000,
    'Gopay': 350000,
    'Bank BCA': 2500000,
    'Bank Mandiri': 3500000,
    'Bank Seabank': 1200000,
    'QRIS': 450000,
    'Ovo': 200000
  });

  // Initial Transactions matching PRD and Reference 1
  const [transactions, setTransactions] = useState([
    { id: 1, checked: false, date: '2026-09-10', detail: 'Soto Ayam Pak Man', amount: 18000, account: 'Gopay', category: 'Makanan & Minuman' },
    { id: 2, checked: false, date: '2026-09-10', detail: 'Indomaret Belanja Struk', amount: 84500, account: 'QRIS', category: 'Kebutuhan Harian', items: ['Susu UHT 1L', 'Roti Tawar', 'Air Mineral 600ml'] },
    { id: 3, checked: false, date: '2026-09-01', detail: 'Sedekah subuh', amount: 1000, account: 'Gopay', category: 'Giving' },
    { id: 4, checked: false, date: '2026-09-01', detail: 'Jajan es kopi', amount: 5000, account: 'Tunai', category: 'Playing' },
    { id: 5, checked: false, date: '2026-09-01', detail: 'Savings BNI', amount: 200000, account: 'Bank BNI', category: 'Savings' },
    { id: 6, checked: false, date: '2026-09-01', detail: 'Savings Mandiri', amount: 300000, account: 'Bank Mandiri', category: 'Savings' },
    { id: 7, checked: false, date: '2026-09-01', detail: 'Kasih ibu', amount: 500000, account: 'Tunai', category: 'Giving' },
    { id: 8, checked: false, date: '2026-09-03', detail: 'Beli Cat Choize', amount: 20331, account: 'Bank Seabank', category: 'Giving' },
    { id: 9, checked: false, date: '2026-09-03', detail: 'Facial Wash + Moist', amount: 92857, account: 'Bank Seabank', category: 'Living' },
    { id: 10, checked: false, date: '2026-09-03', detail: 'Liptint', amount: 64128, account: 'Bank Seabank', category: 'Living' },
    { id: 11, checked: false, date: '2026-09-03', detail: 'Sarung tangan mandi', amount: 23595, account: 'Bank Seabank', category: 'Living' },
    { id: 12, checked: false, date: '2026-09-03', detail: 'Makan siang', amount: 42000, account: 'Tunai', category: 'Living' },
  ]);

  // Set theme class on root body
  useEffect(() => {
    document.documentElement.className = `theme-${activeTheme}`;
  }, [activeTheme]);

  // Handle 1-Tap Transaction Confirmation (PRD FR-04)
  const handleConfirmTransaction = (newTx) => {
    setTransactions(prev => [newTx, ...prev]);

    // Update wallet balance automatically
    const targetWallet = newTx.account;
    if (wallets[targetWallet] !== undefined) {
      setWallets(prev => ({
        ...prev,
        [targetWallet]: Math.max(0, prev[targetWallet] - newTx.amount)
      }));
    }
  };

  const totalExpensesSum = transactions.reduce((a, b) => a + (b.amount || 0), 0);
  const totalBudgetSum = Object.values(wallets).reduce((a, b) => a + b, 0) + totalExpensesSum;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${activeTheme === 'lumi' ? 'bg-[#F3F6FA] text-slate-900' : 'bg-[#0B1120] text-white'
      }`}>

      {/* 1. TOP THEME SWITCHER & NAVIGATION BAR */}
      <ThemeSwitcherBar
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* MAIN BODY CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fade-in">

        {/* 2. FR-07 AI MASCOT & CONTEXTUAL ADVISOR (Lumi vs Raka) */}
        <AIMascotAdvisor
          activeTheme={activeTheme}
          totalSpent={totalExpensesSum}
          totalBudget={totalBudgetSum}
        />

        {/* 3. DYNAMIC CONTENT BASED ON ACTIVE NAVIGATION TAB */}
        {activeTab === 'input' && (
          <div className="space-y-8">
            {/* AI Input Section (FR-02 Natural Language + FR-03 OCR + FR-04 1-Tap) */}
            <AIInputSection
              activeTheme={activeTheme}
              onConfirmTransaction={handleConfirmTransaction}
            />

            {/* Transaction History Log Table */}
            <FinanceView
              transactions={transactions}
              setTransactions={setTransactions}
              onOpenAddModal={() => setIsExpenseModalOpen(true)}
              searchTerm={searchTerm}
            />
          </div>
        )}

        {activeTab === 'wallets' && (
          <MultiWalletGrid
            activeTheme={activeTheme}
            wallets={wallets}
            setWallets={setWallets}
            transactions={transactions}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsCharts
            activeTheme={activeTheme}
            transactions={transactions}
          />
        )}

      </main>

      {/* Add Expense Dialog Modal */}
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onAddExpense={handleConfirmTransaction}
      />

      {/* Footer */}
      <footer className={`py-6 border-t text-center text-xs font-semibold transition-colors ${activeTheme === 'lumi'
          ? 'bg-white border-[#CBE3D3] text-[#476650]'
          : 'bg-[#0F172A] border-slate-800 text-slate-400'
        }`}>
        <p>SakuKita PWA &copy; 2026 — AI Financial Tracker (Lumi & Raka Character Themes)</p>
      </footer>

    </div>
  );
}
