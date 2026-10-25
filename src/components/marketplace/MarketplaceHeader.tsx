import React from 'react';
import { ShoppingBag, Search, Store, LayoutDashboard, Sparkles } from 'lucide-react';
import { MarketplaceNavTab, MasterMode } from '../../types';
import { PWAInstallButton } from '../pwa/PWAInstallButton';

interface MarketplaceHeaderProps {
  currentTab: MarketplaceNavTab;
  onSelectTab: (tab: MarketplaceNavTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onSwitchToAdmin: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onSwitchToAdmin,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#08090f]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={() => onSelectTab('inicio')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <div className="w-full h-full bg-[#08090f] rounded-[10px] flex items-center justify-center">
              <Store className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
              VITRINES MULTIMARCAS
            </span>
            <span className="text-[10px] text-purple-400 font-semibold tracking-wider">
              SHOPPING DIGITAL
            </span>
          </div>
        </div>

        {/* Search Bar (Desktop/Tablet) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar produtos, marcas ou categorias..."
              className="w-full bg-[#0d1022] border border-slate-800 hover:border-slate-700 focus:border-cyan-500/60 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </div>
        </div>

        {/* Actions Zone: PWA Install + Cart Button + Admin Switch */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* In-app PWA install button */}
          <PWAInstallButton />

          {/* Cart / Sacola Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-purple-950/30 text-slate-200 transition-all flex items-center gap-2"
            title="Abrir Sacola de Compras"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-purple-400" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-mono font-bold text-[10px] flex items-center justify-center shadow-[0_0_8px_rgba(168,85,247,0.8)]">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold">Sacola</span>
          </button>

          {/* Switch to Painel ADM */}
          <button
            onClick={onSwitchToAdmin}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-950/70 to-indigo-950/70 border border-purple-500/40 text-purple-300 hover:text-white hover:border-purple-400 text-xs font-semibold shadow-[0_0_12px_rgba(168,85,247,0.25)] transition-all"
            title="Acessar o Painel ADM"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">Painel ADM</span>
          </button>
        </div>
      </div>
    </header>
  );
};
