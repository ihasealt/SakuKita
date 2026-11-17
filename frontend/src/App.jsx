import { useState, useEffect } from 'react';
import SidebarNav from './components/SidebarNav';
import CompactOverviewDashboard from './components/CompactOverviewDashboard';
import AIMascotAdvisor from './components/AIMascotAdvisor';
import AIInputSection from './components/AIInputSection';
import MultiWalletGrid from './components/MultiWalletGrid';
import AnalyticsCharts from './components/AnalyticsCharts';
import FinanceView from './components/FinanceView';
import AddExpenseModal from './components/AddExpenseModal';
import './App.css';

export default function App() {
  const [activeTheme, setActiveTheme] = useState('moka');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'input' | 'wallets' | 'history' | 'analytics'
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

  // Initial Transactions matching PRD
  const [transactions, setTransactions] = useState([
    { id: 1, checked: false, date: '2026-09-10', detail: 'Soto Ayam Pak Man', amount: 18000, account: 'Gopay', category: 'Makanan & Minuman' },
    { id: 2, checked: false, date: '2026-09-10', detail: 'Indomaret Belanja Struk', amount: 84500, account: 'QRIS', category: 'Kebutuhan Harian', items: ['Susu UHT 1L', 'Roti Tawar', 'Air Mineral 600ml'] },
    { id: 3, checked: false, date: '2026-09-01', detail: 'Sedekah subuh', amount: 1000, account: 'Gopay', category: 'Giving' },
    { id: 4, checked: false, date: '2026-09-01', detail: 'Jajan es kopi', amount: 5000, account: 'Tunai', category: 'Playing' },
    { id: 5, checked: false, date: '2026-09-01', detail: 'Savings BNI', amount: 200000, account: 'Bank BNI', category: 'Savings' },
    { id: 6, checked: false, date: '2026-09-01', detail: 'Savings Mandiri', amount: 300000, account: 'Bank Mandiri', category: 'Savings' },
    { id: 7, checked: false, date: '2026-09-01', detail: 'Kasih ibu', amount: 500000, account: 'Tunai', category: 'Giving' },
    { id: 8, checked: false, date: '2026-09-03', detail: 'Beli camilan', amount: 20331, account: 'Bank Seabank', category: 'Giving' },
    { id: 9, checked: false, date: '2026-09-03', detail: 'Facial Wash + Moist', amount: 92857, account: 'Bank Seabank', category: 'Living' },
    { id: 10, checked: false, date: '2026-09-03', detail: 'Liptint', amount: 64128, account: 'Bank Seabank', category: 'Living' },
    { id: 11, checked: false, date: '2026-09-03', detail: 'Sarung tangan mandi', amount: 23595, account: 'Bank Seabank', category: 'Living' },
    { id: 12, checked: false, date: '2026-09-03', detail: 'Makan siang', amount: 42000, account: 'Tunai', category: 'Living' },
  ]);

  // Apply theme class to root
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
  return (
    <div className="flex h-dvh w-full flex-row overflow-hidden bg-[var(--page-bg)] font-sans text-[var(--text-main)] antialiased">

      {/* 1. LEFT SIDEBAR NAVIGATION (Full height edge-to-edge) */}
      <SidebarNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
      />

      {/* 2. CENTER MAIN DASHBOARD VIEW (Full height scrollable) */}
      <main className="min-w-0 flex-1 overflow-y-auto bg-[var(--page-bg)] p-3 sm:p-4 md:p-6 lg:p-7">

        {/* VIEW: OVERVIEW (Replicating Compact Reference Image) */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            <CompactOverviewDashboard
              activeTheme={activeTheme}
              setActiveTheme={setActiveTheme}
              wallets={wallets}
              transactions={transactions}
              onOpenAddModal={() => setIsExpenseModalOpen(true)}
              setActiveTab={setActiveTab}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        )}

        {/* VIEW: AI CATAT (FR-02 Natural Language + FR-03 Vision OCR + FR-04 1-Tap) */}
        {activeTab === 'input' && (
          <div className="space-y-4 animate-fade-in">
            <AIMascotAdvisor
              activeTheme={activeTheme}
              totalSpent={totalExpensesSum}
            />

            <AIInputSection
              onConfirmTransaction={handleConfirmTransaction}
            />
          </div>
        )}

        {/* VIEW: DOMPET (FR-05 Manajemen Multi-Wallet) */}
        {activeTab === 'wallets' && (
          <div className="animate-fade-in">
            <MultiWalletGrid
              wallets={wallets}
              setWallets={setWallets}
              transactions={transactions}
            />
          </div>
        )}

        {/* VIEW: HISTORI (FR-01 Riwayat Transaksi & Filter) */}
        {activeTab === 'history' && (
          <div className="animate-fade-in">
            <FinanceView
              transactions={transactions}
              setTransactions={setTransactions}
              onOpenAddModal={() => setIsExpenseModalOpen(true)}
              searchTerm={searchTerm}
            />
          </div>
        )}

        {/* VIEW: ANALITIK (FR-06 Visualisasi Arus Kas & Analisis) */}
        {activeTab === 'analytics' && (
          <div className="animate-fade-in">
            <AnalyticsCharts
              activeTheme={activeTheme}
              transactions={transactions}
            />
          </div>
        )}

      </main>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onAddExpense={handleConfirmTransaction}
        accounts={Object.keys(wallets)}
      />

    </div>
  );
}
