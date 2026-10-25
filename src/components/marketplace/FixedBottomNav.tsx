import React from 'react';
import { Home, Store, ShoppingBag, User } from 'lucide-react';
import { MarketplaceNavTab } from '../../types';

interface FixedBottomNavProps {
  currentTab: MarketplaceNavTab;
  onSelectTab: (tab: MarketplaceNavTab) => void;
  cartCount: number;
  userAvatarUrl: string;
}

export const FixedBottomNav: React.FC<FixedBottomNavProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  userAvatarUrl,
}) => {
  const navButtons: {
    id: MarketplaceNavTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    neonColor: 'purple' | 'cyan' | 'green';
  }[] = [
    { id: 'inicio', label: 'Início', icon: Home, neonColor: 'purple' },
    { id: 'vitrines', label: 'Vitrines', icon: Store, neonColor: 'cyan' },
    { id: 'sacola', label: 'Sacola', icon: ShoppingBag, neonColor: 'green' },
    { id: 'cliente', label: 'Área do Cliente', icon: User, neonColor: 'purple' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#080a14]/95 backdrop-blur-xl border-t border-slate-800/80 shadow-[0_-5px_25px_rgba(0,0,0,0.5)] safe-area-bottom">
      <div className="max-w-md mx-auto grid grid-cols-4 h-16 px-2">
        {navButtons.map((btn) => {
          const Icon = btn.icon;
          const isActive = currentTab === btn.id;

          return (
            <button
              key={btn.id}
              onClick={() => onSelectTab(btn.id)}
              className="relative flex flex-col items-center justify-center py-1 transition-all duration-200 group"
              title={btn.label}
              aria-label={btn.label}
            >
              {/* Active Top Glowing Accent Line */}
              {isActive && (
                <div 
                  className={`absolute top-0 w-12 h-0.5 rounded-full ${
                    btn.neonColor === 'purple' ? 'bg-purple-400 shadow-[0_0_8px_#c084fc]' :
                    btn.neonColor === 'cyan' ? 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]' :
                    'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                  }`} 
                />
              )}

              {/* Icon / Avatar with Badge */}
              <div className="relative">
                {btn.id === 'cliente' ? (
                  <div className={`w-5 h-5 rounded-full overflow-hidden border transition-all ${
                    isActive ? 'border-purple-400 ring-2 ring-purple-500/40' : 'border-slate-600'
                  }`}>
                    <img src={userAvatarUrl} alt="Cliente" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <Icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive
                        ? btn.neonColor === 'purple'
                          ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]'
                          : btn.neonColor === 'cyan'
                          ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.7)]'
                          : 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                )}

                {/* Shopping Bag Badge */}
                {btn.id === 'sacola' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] flex items-center justify-center font-mono shadow-[0_0_8px_rgba(16,185,129,0.9)]">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] tracking-tight font-medium mt-1 truncate transition-colors duration-200 ${
                  isActive
                    ? btn.neonColor === 'purple' ? 'text-purple-300 font-semibold' :
                      btn.neonColor === 'cyan' ? 'text-cyan-300 font-semibold' :
                      'text-emerald-300 font-semibold'
                    : 'text-slate-400 group-hover:text-slate-300'
                }`}
              >
                {btn.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
