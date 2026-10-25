import React, { useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  Wallet, 
  Cpu, 
  TrendingUp, 
  Settings, 
  ShieldCheck, 
  Home, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  Sparkles
} from 'lucide-react';
import { NavigationTab, AdminUser } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  onClose: () => void;
  adminUser: AdminUser;
  onGoHome: () => void;
  onOpenLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen,
  onToggleOpen,
  onClose,
  adminUser,
  onGoHome,
  onOpenLogout,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside (as requested: "Ao clicar fora, deve fechar")
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }>; neonColor: 'purple' | 'cyan' | 'green' }[] = [
    { id: 'painel', label: 'Painel ADM', icon: LayoutDashboard, neonColor: 'purple' },
    { id: 'clientes', label: 'Clientes', icon: Users, neonColor: 'cyan' },
    { id: 'agenda', label: 'Agenda', icon: Calendar, neonColor: 'green' },
    { id: 'gestao', label: 'Gestão', icon: BarChart3, neonColor: 'purple' },
    { id: 'caixa', label: 'Caixa', icon: Wallet, neonColor: 'green' },
    { id: 'soquete', label: 'Soquete', icon: Cpu, neonColor: 'cyan' },
    { id: 'financeiro', label: 'Financeiro', icon: TrendingUp, neonColor: 'green' },
    { id: 'perfil', label: 'Perfil com foto', icon: Users, neonColor: 'purple' },
    { id: 'configuracao', label: 'Configuração', icon: Settings, neonColor: 'cyan' },
    { id: 'seguranca', label: 'Segurança', icon: ShieldCheck, neonColor: 'purple' },
  ];

  const getNeonStyles = (color: 'purple' | 'cyan' | 'green', isActive: boolean) => {
    if (!isActive) {
      return 'text-slate-400 hover:text-white hover:bg-slate-800/50 hover:border-slate-700/60 border border-transparent';
    }

    switch (color) {
      case 'purple':
        return 'text-purple-300 bg-purple-950/40 border border-purple-500/60 shadow-[0_0_18px_rgba(168,85,247,0.35)]';
      case 'cyan':
        return 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/60 shadow-[0_0_18px_rgba(6,182,212,0.35)]';
      case 'green':
        return 'text-emerald-300 bg-emerald-950/40 border border-emerald-500/60 shadow-[0_0_18px_rgba(16,185,129,0.35)]';
      default:
        return 'text-purple-300 bg-purple-950/40 border border-purple-500/60 shadow-[0_0_18px_rgba(168,85,247,0.35)]';
    }
  };

  const getNeonIconColor = (color: 'purple' | 'cyan' | 'green', isActive: boolean) => {
    if (!isActive) return 'text-slate-400 group-hover:text-slate-200';
    switch (color) {
      case 'purple': return 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]';
      case 'cyan': return 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]';
      case 'green': return 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]';
      default: return 'text-purple-400';
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay - closes on click */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Vertical Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full z-50 flex flex-col bg-[#0b0e1a]/95 backdrop-blur-xl border-r border-slate-800/80 transition-all duration-300 ease-in-out shadow-2xl ${
          isOpen 
            ? 'w-72 translate-x-0' 
            : 'w-20 -translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header / Brand Logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800/80 min-h-[76px]">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Logo Icon with Neon Purple Glow */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.45)]">
              <div className="w-full h-full bg-[#090b14] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            
            {isOpen && (
              <div className="flex flex-col whitespace-nowrap overflow-hidden transition-opacity duration-200">
                <span className="font-extrabold text-base tracking-wider bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                  PAINEL ADM
                </span>
                <span className="text-[11px] text-slate-400 tracking-wider">
                  SISTEMA DE GESTÃO
                </span>
              </div>
            )}
          </div>

          {/* Toggle / Collapse Button */}
          <button
            onClick={onToggleOpen}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors focus:outline-none focus:ring-1 focus:ring-purple-500"
            title={isOpen ? "Recolher menu lateral" : "Expandir menu lateral"}
            aria-label={isOpen ? "Recolher menu" : "Expandir menu"}
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5 text-slate-300" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-300" />
            )}
          </button>
        </div>

        {/* User Profile Snippet in Sidebar (Perfil com foto) */}
        <div className="px-3 py-3 border-b border-slate-800/80">
          <button
            onClick={() => onSelectTab('perfil')}
            className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-200 text-left ${
              currentTab === 'perfil'
                ? 'bg-purple-950/40 border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'hover:bg-slate-800/50 border border-transparent'
            }`}
            title="Acessar Perfil com foto"
          >
            <div className="relative shrink-0">
              <img
                src={adminUser.avatarUrl}
                alt={adminUser.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0b0e1a] shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
            </div>

            {isOpen && (
              <div className="flex flex-col min-w-0 overflow-hidden">
                <span className="text-sm font-semibold text-white truncate">
                  {adminUser.name}
                </span>
                <span className="text-[11px] text-purple-400 font-medium truncate">
                  {adminUser.role}
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Navigation Menu List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            
            // Perfil com foto is also highlighted in the user profile block above, but keeping explicit item in list as requested
            if (item.id === 'perfil') {
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab('perfil')}
                  className={`w-full group flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${getNeonStyles(
                    item.neonColor,
                    isActive
                  )}`}
                  title={item.label}
                >
                  <div className="relative shrink-0">
                    <img 
                      src={adminUser.avatarUrl} 
                      alt="Perfil" 
                      className={`w-6 h-6 rounded-full object-cover border ${
                        isActive ? 'border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'border-slate-600'
                      }`}
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  
                  {isOpen && (
                    <span className="truncate whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full group flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${getNeonStyles(
                  item.neonColor,
                  isActive
                )}`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-colors ${getNeonIconColor(item.neonColor, isActive)}`} />
                
                {isOpen && (
                  <span className="truncate whitespace-nowrap">
                    {item.label}
                  </span>
                )}

                {/* Subtle active neon dot indicator when collapsed */}
                {!isOpen && isActive && (
                  <span className={`w-1.5 h-1.5 rounded-full absolute right-2 ${
                    item.neonColor === 'purple' ? 'bg-purple-400 shadow-[0_0_6px_#c084fc]' :
                    item.neonColor === 'cyan' ? 'bg-cyan-400 shadow-[0_0_6px_#38bdf8]' :
                    'bg-emerald-400 shadow-[0_0_6px_#4ade80]'
                  }`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions: Voltar à Tela Inicial & Sair com ícone de seta */}
        <div className="p-3 border-t border-slate-800/80 space-y-1.5 bg-[#080a14]/60">
          {/* Botão: Voltar à Tela Inicial */}
          <button
            onClick={onGoHome}
            className="w-full group flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/30 hover:border-cyan-500/40 border border-transparent transition-all duration-200"
            title="Voltar à Tela Inicial"
          >
            <Home className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
            {isOpen && (
              <span className="truncate whitespace-nowrap">
                Voltar à Tela Inicial
              </span>
            )}
          </button>

          {/* Botão: Sair com ícone de seta */}
          <button
            onClick={onOpenLogout}
            className="w-full group flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 hover:border-rose-500/50 border border-transparent transition-all duration-200"
            title="Sair do Sistema"
          >
            <LogOut className="w-5 h-5 shrink-0 text-rose-400 group-hover:text-rose-300 group-hover:drop-shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
            {isOpen && (
              <span className="truncate whitespace-nowrap font-medium">
                Sair
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
