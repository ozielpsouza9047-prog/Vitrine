import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Star, 
  MapPin, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck,
  Check,
  Search
} from 'lucide-react';
import { BrandStore, StoreProduct } from '../../types';

interface StoreShowcaseViewProps {
  store: BrandStore;
  onBack: () => void;
  onAddToCart: (product: StoreProduct) => void;
  onBuyNow: (product: StoreProduct) => void;
}

export const StoreShowcaseView: React.FC<StoreShowcaseViewProps> = ({
  store,
  onBack,
  onAddToCart,
  onBuyNow,
}) => {
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [search, setSearch] = useState<string>('');

  // Auto carousel for store's banners
  useEffect(() => {
    if (store.banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBannerIdx((prev) => (prev + 1) % store.banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [store.banners.length]);

  const categories = ['todos', ...Array.from(new Set(store.products.map(p => p.category)))];

  const filteredProducts = store.products.filter(p => {
    const matchCat = selectedCategory === 'todos' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                        p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAdd = (product: StoreProduct) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar a todas as Vitrines</span>
        </button>

        <span className="text-xs text-slate-400 font-mono">
          Vitrine Oficial #{store.id.toUpperCase()}
        </span>
      </div>

      {/* Brand Identity Header */}
      <div 
        className="relative overflow-hidden rounded-3xl bg-[#0d1022] border p-6 sm:p-8 shadow-xl"
        style={{ borderColor: `${store.primaryColor}55` }}
      >
        <div 
          className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: store.primaryColor }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            {/* Store Logo with Brand Color Glow */}
            <div 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden p-1 shrink-0 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${store.primaryColor}, ${store.accentColor})` }}
            >
              <img
                src={store.logoUrl}
                alt={store.name}
                className="w-full h-full object-cover rounded-[12px]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {store.name}
                </h1>
                {store.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    OFICIAL
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                {store.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {store.rating.toFixed(1)} / 5.0
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {store.city}
                </span>
                <span>·</span>
                <span className="text-slate-400 font-mono">
                  {store.products.length} Produtos na vitrine
                </span>
              </div>
            </div>
          </div>

          {/* Guarantee Pill */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <ShieldCheck className="w-6 h-6 shrink-0" style={{ color: store.primaryColor }} />
            <div className="text-xs">
              <p className="font-semibold text-white">Garantia Direta da Marca</p>
              <p className="text-[11px] text-slate-400">Envio segurado com pagamento via PIX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand-Specific Carousel Banner */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/7] sm:aspect-[21/8] max-h-[380px] bg-slate-950 border border-slate-800/80 shadow-2xl group">
        <img
          src={store.banners[currentBannerIdx] || store.banners[0]}
          alt={store.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-[#08090f]/50 to-transparent" />

        <div className="absolute bottom-4 left-5 sm:left-8 z-10">
          <span 
            className="text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md"
            style={{ color: store.accentColor }}
          >
            Coleção Oficial · {store.category}
          </span>
        </div>

        {store.banners.length > 1 && (
          <>
            <button
              onClick={() => setCurrentBannerIdx(prev => (prev - 1 + store.banners.length) % store.banners.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-sm z-20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentBannerIdx(prev => (prev + 1) % store.banners.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-sm z-20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Search and Category Filter */}
      <div className="p-4 rounded-2xl bg-[#0d1022]/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Buscar em ${store.name}...`}
            className="w-full bg-[#11152a] border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none"
            style={{ borderColor: search ? store.primaryColor : undefined }}
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-slate-900 rounded-xl border border-slate-800 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              style={{
                backgroundColor: selectedCategory === cat ? store.primaryColor : 'transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Product Grid with Continuous Scrolling */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: store.primaryColor }} />
            Catálogo de Produtos ({filteredProducts.length})
          </h2>
          <span className="text-xs text-slate-400">Rolagem contínua</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const isJustAdded = addedProductId === product.id;

            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-[#0d1022]/90 border border-slate-800 hover:border-slate-700 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span 
                      className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-md"
                      style={{ backgroundColor: store.primaryColor }}
                    >
                      {product.badge}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-600 text-white shadow-md">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1.5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price Row */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-white font-mono tabular-nums tracking-tight">
                      R$ {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons: Comprar (Instant Buy with PIX) and Adicionar à Sacola */}
                <div className="grid grid-cols-2 gap-2 mt-3.5 pt-1">
                  <button
                    onClick={() => handleAdd(product)}
                    className="py-2.5 px-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                    title="Adicionar à Sacola"
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Adicionado</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                        <span>Sacola</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onBuyNow(product)}
                    className="py-2.5 px-2 rounded-xl text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1"
                    style={{ backgroundColor: store.primaryColor }}
                    title="Comprar via PIX Instantâneo"
                  >
                    <span>Comprar</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
