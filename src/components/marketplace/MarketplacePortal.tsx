import React, { useState } from 'react';
import { 
  MarketplaceNavTab, 
  BrandStore, 
  StoreProduct, 
  CartItem, 
  CustomerProfile, 
  CustomerOrder 
} from '../../types';
import { MarketplaceHeader } from './MarketplaceHeader';
import { FixedBottomNav } from './FixedBottomNav';
import { CarouselBanner } from './CarouselBanner';
import { BrandMiniCards } from './BrandMiniCards';
import { StoreShowcaseView } from './StoreShowcaseView';
import { CartDrawer } from './CartDrawer';
import { PixPaymentModal } from './PixPaymentModal';
import { CustomerAreaView } from './CustomerAreaView';
import { Sparkles, ArrowRight, Store, ShoppingBag } from 'lucide-react';

interface MarketplacePortalProps {
  stores: BrandStore[];
  customer: CustomerProfile;
  orders: CustomerOrder[];
  cart: CartItem[];
  onAddToCart: (product: StoreProduct) => void;
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
  onRemoveCartItem: (productId: string) => void;
  onSwitchToAdmin: () => void;
}

export const MarketplacePortal: React.FC<MarketplacePortalProps> = ({
  stores,
  customer,
  orders,
  cart,
  onAddToCart,
  onUpdateCartQuantity,
  onRemoveCartItem,
  onSwitchToAdmin,
}) => {
  const [currentTab, setCurrentTab] = useState<MarketplaceNavTab>('inicio');
  const [selectedStore, setSelectedStore] = useState<BrandStore | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [pixCheckoutItems, setPixCheckoutItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleOpenStore = (store: BrandStore) => {
    setSelectedStore(store);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStores = () => {
    setSelectedStore(null);
  };

  const handleTabChange = (tab: MarketplaceNavTab) => {
    setCurrentTab(tab);
    if (tab === 'sacola') {
      setIsCartOpen(true);
    } else {
      setIsCartOpen(false);
      setSelectedStore(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyNow = (product: StoreProduct) => {
    onAddToCart(product);
    setPixCheckoutItems([{ product, quantity: 1 }]);
    setIsPixModalOpen(true);
  };

  const handleProceedCartToPix = () => {
    if (cart.length === 0) return;
    setPixCheckoutItems([...cart]);
    setIsCartOpen(false);
    setIsPixModalOpen(true);
  };

  // Filtered stores or products based on search query
  const filteredStores = stores.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#08090f] text-slate-100 flex flex-col font-sans pb-24">
      {/* Marketplace Header */}
      <MarketplaceHeader
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSwitchToAdmin={onSwitchToAdmin}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* If a store is selected, render its individual showcase */}
        {selectedStore ? (
          <StoreShowcaseView
            store={selectedStore}
            onBack={handleBackToStores}
            onAddToCart={onAddToCart}
            onBuyNow={handleBuyNow}
          />
        ) : (
          <>
            {/* Tab: Início (Home) */}
            {currentTab === 'inicio' && (
              <div className="space-y-8">
                {/* Auto-Rotating Carousel Banner */}
                <CarouselBanner
                  stores={stores}
                  onOpenStore={handleOpenStore}
                />

                {/* Company Miniature Cards preserving their visual identities */}
                <BrandMiniCards
                  stores={filteredStores}
                  onOpenStore={handleOpenStore}
                />

                {/* Featured Products Across Stores with Continuous Scroll */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        Lançamentos & Destaques das Vitrines
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Produtos exclusivos das marcas parceiras disponíveis para pronta entrega via PIX
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stores.flatMap(s => s.products.slice(0, 1)).map(product => (
                      <div
                        key={product.id}
                        className="group rounded-2xl bg-[#0d1022]/90 border border-slate-800 hover:border-purple-500/50 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
                      >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40">
                            {product.storeName}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                            {product.category}
                          </span>
                          <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-cyan-300">
                            {product.name}
                          </h3>
                          <div className="pt-2 flex items-baseline justify-between">
                            <span className="text-base font-extrabold text-emerald-400 font-mono tabular-nums">
                              R$ {product.price.toFixed(2)}
                            </span>
                            <button
                              onClick={() => handleBuyNow(product)}
                              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all"
                            >
                              Comprar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Vitrines */}
            {currentTab === 'vitrines' && (
              <div className="space-y-6">
                <div className="pb-2 border-b border-slate-800">
                  <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
                    <Store className="w-6 h-6 text-cyan-400" />
                    Todas as Vitrines Oficiais
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Explore os universos exclusivos de cada empresa parceira
                  </p>
                </div>

                <BrandMiniCards
                  stores={filteredStores}
                  onOpenStore={handleOpenStore}
                />
              </div>
            )}

            {/* Tab: Área do Cliente */}
            {currentTab === 'cliente' && (
              <CustomerAreaView
                customer={customer}
                orders={orders}
                onOpenStoreShowcase={(storeId) => {
                  const found = stores.find(s => s.id === storeId);
                  if (found) handleOpenStore(found);
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Cart Drawer (Sacola) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={onUpdateCartQuantity}
        onRemoveItem={onRemoveCartItem}
        onProceedToPix={handleProceedCartToPix}
        onExplore={() => {
          setSelectedStore(null);
          setCurrentTab('vitrines');
        }}
      />

      {/* PIX Payment Modal with Non-Simulated Verification */}
      <PixPaymentModal
        isOpen={isPixModalOpen}
        onClose={() => setIsPixModalOpen(false)}
        items={pixCheckoutItems}
        totalAmount={
          pixCheckoutItems.reduce((acc, it) => acc + it.product.price * it.quantity, 0) || cartTotal
        }
      />

      {/* Fixed Bottom Navigation (Item 5) */}
      <FixedBottomNav
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        cartCount={cartCount}
        userAvatarUrl={customer.avatarUrl}
      />
    </div>
  );
};
