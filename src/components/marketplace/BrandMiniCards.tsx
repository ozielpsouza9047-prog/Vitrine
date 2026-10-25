import React from 'react';
import { CheckCircle2, Star, ArrowRight, Store, MapPin, Package } from 'lucide-react';
import { BrandStore } from '../../types';

interface BrandMiniCardsProps {
  stores: BrandStore[];
  onOpenStore: (store: BrandStore) => void;
}

export const BrandMiniCards: React.FC<BrandMiniCardsProps> = ({ stores, onOpenStore }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-cyan-400" />
            Vitrines Oficiais Multimarcas
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Lojas certificadas com identidades visuais exclusivas e produtos originais
          </p>
        </div>
      </div>

      {/* Grid of Mini-Cards for each Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stores.map((store) => {
          return (
            <div
              key={store.id}
              onClick={() => onOpenStore(store)}
              className={`group relative rounded-2xl bg-[#0d1022]/90 border p-5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between space-y-4 ${store.themeStyle.borderGlow} hover:shadow-2xl`}
            >
              {/* Subtle Ambient Radial Lighting for Brand Identity */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none"
                style={{ backgroundColor: store.primaryColor }}
              />

              {/* Brand Top Lockup: Logo + Verified + Category */}
              <div className="flex items-start gap-3.5 relative z-10">
                <div 
                  className="w-13 h-13 rounded-2xl overflow-hidden p-0.5 shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${store.primaryColor}, ${store.accentColor})` }}
                >
                  <img
                    src={store.logoUrl}
                    alt={store.name}
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                      {store.name}
                    </h3>
                    {store.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    )}
                  </div>
                  
                  <span className="text-[11px] text-slate-400 block truncate mt-0.5">
                    {store.category}
                  </span>

                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-amber-400 font-mono font-semibold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {store.rating.toFixed(1)}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {store.city.split(',')[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tagline / Teaser */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed relative z-10">
                {store.tagline}
              </p>

              {/* Brand Bottom Info & CTA */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs relative z-10">
                <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-slate-500" />
                  {store.totalProducts} produtos
                </span>

                <span 
                  className="font-semibold text-xs flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  style={{ color: store.primaryColor }}
                >
                  Ver Vitrine
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
