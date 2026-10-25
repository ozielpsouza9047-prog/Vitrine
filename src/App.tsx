import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LogoutModal } from './components/LogoutModal';
import { DashboardView } from './components/views/DashboardView';
import { ClientesView } from './components/views/ClientesView';
import { AgendaView } from './components/views/AgendaView';
import { GestaoView } from './components/views/GestaoView';
import { CaixaView } from './components/views/CaixaView';
import { SoqueteView } from './components/views/SoqueteView';
import { FinanceiroView } from './components/views/FinanceiroView';
import { PerfilView } from './components/views/PerfilView';
import { ConfiguracaoView } from './components/views/ConfiguracaoView';
import { SegurancaView } from './components/views/SegurancaView';
import { TelaInicialView } from './components/views/TelaInicialView';
import { MarketplacePortal } from './components/marketplace/MarketplacePortal';

import { 
  NavigationTab, 
  AppViewMode, 
  MasterMode,
  AdminUser, 
  Client, 
  Appointment, 
  CashTransaction, 
  SocketConnection, 
  SocketLog,
  BrandStore,
  StoreProduct,
  CartItem,
  CustomerProfile,
  CustomerOrder
} from './types';

import { 
  initialAdminUser, 
  mockClients, 
  mockAppointments, 
  mockTransactions, 
  mockSockets, 
  mockSocketLogs 
} from './data/mockData';

import { 
  mockBrandStores, 
  mockCustomer, 
  mockOrders 
} from './data/storeData';

export default function App() {
  // Master mode: 'marketplace' (storefront) or 'admin' (management panel)
  const [masterMode, setMasterMode] = useState<MasterMode>('marketplace');

  // Admin Dashboard navigation states
  const [currentTab, setCurrentTab] = useState<NavigationTab>('painel');
  const [viewMode, setViewMode] = useState<AppViewMode>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Domain states - Admin
  const [adminUser, setAdminUser] = useState<AdminUser>(initialAdminUser);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [transactions, setTransactions] = useState<CashTransaction[]>(mockTransactions);
  const [sockets, setSockets] = useState<SocketConnection[]>(mockSockets);
  const [socketLogs, setSocketLogs] = useState<SocketLog[]>(mockSocketLogs);

  // Domain states - Multi-Brand Marketplace
  const [stores, setStores] = useState<BrandStore[]>(mockBrandStores);
  const [customer, setCustomer] = useState<CustomerProfile>(mockCustomer);
  const [orders, setOrders] = useState<CustomerOrder[]>(mockOrders);
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: mockBrandStores[0].products[0],
      quantity: 1,
    },
  ]);

  // Shopping Bag Handlers
  const handleAddToCart = (product: StoreProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Admin Tab Selection
  const handleSelectTab = useCallback((tab: NavigationTab) => {
    setCurrentTab(tab);
    setViewMode('dashboard');
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  // Admin Handlers
  const handleAddClient = (client: Client) => setClients((prev) => [client, ...prev]);
  const handleAddAppointment = (apt: Appointment) => setAppointments((prev) => [apt, ...prev]);
  const handleAddTransaction = (tx: CashTransaction) => setTransactions((prev) => [tx, ...prev]);
  const handleAddLog = (log: SocketLog) => setSocketLogs((prev) => [log, ...prev]);
  const handleUpdateUser = (updatedUser: AdminUser) => setAdminUser(updatedUser);
  const handleGoHome = () => setViewMode('home');
  const handleEnterDashboard = (tab?: NavigationTab) => {
    if (tab) setCurrentTab(tab);
    setViewMode('dashboard');
  };
  const handleConfirmLogout = () => {
    setIsLogoutOpen(false);
    setMasterMode('marketplace');
  };

  // If in Multi-Brand Marketplace Mode
  if (masterMode === 'marketplace') {
    return (
      <MarketplacePortal
        stores={stores}
        customer={customer}
        orders={orders}
        cart={cart}
        onAddToCart={handleAddToCart}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onRemoveCartItem={handleRemoveCartItem}
        onSwitchToAdmin={() => setMasterMode('admin')}
      />
    );
  }

  // If in Admin Dashboard Mode (Preserves 100% of the visual admin system and navigation)
  return (
    <div className="min-h-screen bg-[#08090f] text-slate-100 flex flex-col font-sans selection:bg-purple-600/30 selection:text-purple-200">
      {/* Background Neon Subtle Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-900/15 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-900/15 rounded-full blur-[128px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-900/15 rounded-full blur-[128px]" />
      </div>

      {/* Vertical Sidebar with automatic expand/collapse and click-outside close */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        isOpen={sidebarOpen}
        onToggleOpen={() => setSidebarOpen((prev) => !prev)}
        onClose={() => setSidebarOpen(false)}
        adminUser={adminUser}
        onGoHome={handleGoHome}
        onOpenLogout={() => setIsLogoutOpen(true)}
      />

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out relative z-10 ${
          sidebarOpen ? 'lg:pl-72' : 'lg:pl-20'
        }`}
      >
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          adminUser={adminUser}
          onGoHome={handleGoHome}
          onOpenLogout={() => setIsLogoutOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSwitchToMarketplace={() => setMasterMode('marketplace')}
        />

        {/* View Content Port */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {viewMode === 'home' ? (
            <TelaInicialView
              onEnterDashboard={handleEnterDashboard}
              adminUser={adminUser}
              onSwitchToMarketplace={() => setMasterMode('marketplace')}
            />
          ) : (
            <>
              {currentTab === 'painel' && (
                <DashboardView
                  onNavigate={handleSelectTab}
                  clients={clients}
                  appointments={appointments}
                  transactions={transactions}
                  sockets={sockets}
                />
              )}

              {currentTab === 'clientes' && (
                <ClientesView
                  clients={clients}
                  onAddClient={handleAddClient}
                />
              )}

              {currentTab === 'agenda' && (
                <AgendaView
                  appointments={appointments}
                  onAddAppointment={handleAddAppointment}
                />
              )}

              {currentTab === 'gestao' && (
                <GestaoView />
              )}

              {currentTab === 'caixa' && (
                <CaixaView
                  transactions={transactions}
                  onAddTransaction={handleAddTransaction}
                />
              )}

              {currentTab === 'soquete' && (
                <SoqueteView
                  sockets={sockets}
                  logs={socketLogs}
                  onAddLog={handleAddLog}
                />
              )}

              {currentTab === 'financeiro' && (
                <FinanceiroView />
              )}

              {currentTab === 'perfil' && (
                <PerfilView
                  adminUser={adminUser}
                  onUpdateUser={handleUpdateUser}
                />
              )}

              {currentTab === 'configuracao' && (
                <ConfiguracaoView />
              )}

              {currentTab === 'seguranca' && (
                <SegurancaView />
              )}
            </>
          )}
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
        adminUser={adminUser}
      />
    </div>
  );
}
