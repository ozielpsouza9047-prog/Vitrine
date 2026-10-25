import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Home, 
  LogOut, 
  ShieldCheck, 
  Cpu, 
  ExternalLink,
  ChevronDown,
  Check
} from 'lucide-react';
import { NavigationTab, AdminUser } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onToggleSidebar: () => void;
  adminUser: AdminUser;
  onGoHome: () => void;
  onOpenLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSwitchToMarketplace?: () => void;
}

const tabTitles: Record<NavigationTab, { title: string; subtitle: string; neonColor: 'purple' | 'cyan' | 'green' }> = {
  painel: { title: 'Painel ADM', subtitle: 'Visão Geral e Indicadores em Tempo Real', neonColor: 'purple' },
  clientes: { title: 'Clientes', subtitle: 'Diretório e Cadastro de Clientes', neonColor: 'cyan' },
  agenda: { title: 'Agenda', subtitle: 'Controle de Horários e Atendimentos', neonColor: 'green' },
  gestao: { title: 'Gestão', subtitle: 'Operações, Metas e Performance', neonColor: 'purple' },
  caixa: { title: 'Caixa', subtitle: 'Fluxo Diário, Lançamentos e PDV', neonColor: 'green' },
  soquete: { title: 'Soquete', subtitle: 'Telemetria, Conexões e Hardware', neonColor: 'cyan' },
  financeiro: { title: 'Financeiro', subtitle: 'Demonstrativos e Fluxo de Receitas', neonColor: 'green' },
  perfil: { title: 'Perfil com foto', subtitle: 'Credenciais e Dados do Administrador', neonColor: 'purple' },
  configuracao: { title: 'Configuração', subtitle: 'Preferências do Sistema e Parâmetros', neonColor: 'cyan' },
  seguranca: { title: 'Segurança', subtitle: 'Autenticação, 2FA e Auditoria', neonColor: 'purple' },
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onToggleSidebar,
  adminUser,
  onGoHome,
  onOpenLogout,
  searchQuery,
  onSearchChange,
  onSwitchToMarketplace,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const currentInfo = tabTitles[currentTab];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-[76px] px-4 sm:px-6 bg-[#080a14]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Left Zone: Sidebar Hamburger Toggle + Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all shadow-sm focus:outline-none"
          title="Alternar Menu Lateral"
          aria-label="Abrir ou fechar menu"
        >
          <Menu className="w-5 h-5 text-purple-400" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold text-white tracking-tight">
              {currentInfo.title}
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
              currentInfo.neonColor === 'purple'
                ? 'bg-purple-950/60 text-purple-300 border-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.3)]'
                : currentInfo.neonColor === 'cyan'
                ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
            }`}>
              ONLINE
            </span>
          </div>
          <span className="hidden sm:inline text-xs text-slate-400 font-normal">
            {currentInfo.subtitle}
          </span>
        </div>
      </div>

      {/* Middle Zone: Search Bar */}
      <div className="hidden md:flex items-center max-w-xs xl:max-w-md w-full mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar no painel..."
            className="w-full bg-[#0d1020] border border-slate-800/80 hover:border-slate-700 focus:border-purple-500/60 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/40 transition-all"
          />
        </div>
      </div>

      {/* Right Zone: System Status + Voltar ao Início + Sair + Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Soquete Live Status Indicator */}
        <div 
          onClick={() => onSelectTab('soquete')}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-300 text-xs font-mono cursor-pointer hover:border-cyan-400/60 transition-colors"
          title="Clique para ver detalhes do Soquete"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold tabular-nums">Soquete: 14ms</span>
        </div>

        {/* Notifications Icon with simulated popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
            title="Notificações do Sistema"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_6px_#a855f7]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0d1124] border border-slate-700/80 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-semibold text-xs text-white">Notificações Recentes</span>
                <span className="text-[10px] text-purple-400 font-mono">3 Novas</span>
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-purple-950/20 border border-purple-500/20">
                  <p className="font-medium text-slate-200">Novo agendamento confirmado</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Mariana Duarte às 14:00</p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                  <p className="font-medium text-slate-200">Entrada no Caixa registrada</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">+ R$ 350,00 via PIX</p>
                </div>
                <div className="p-2 rounded-lg bg-cyan-950/20 border border-cyan-500/20">
                  <p className="font-medium text-slate-200">Soquete sincronizado</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">PDV Caixa respondendo normalmente</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botão: Ver Vitrines Multimarcas */}
        {onSwitchToMarketplace && (
          <button
            onClick={onSwitchToMarketplace}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-semibold transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            title="Ver Plataforma de Vitrines"
          >
            <span className="hidden sm:inline">Ver Vitrines</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        )}

        {/* Botão: Voltar à Tela Inicial */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-950/30 text-slate-300 hover:text-cyan-300 text-xs font-semibold transition-all shadow-sm"
          title="Voltar à Tela Inicial"
        >
          <Home className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Tela Inicial</span>
        </button>

        {/* Botão: Sair com ícone de seta */}
        <button
          onClick={onOpenLogout}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/30 border border-rose-500/40 hover:border-rose-400 hover:bg-rose-950/60 text-rose-300 hover:text-rose-100 text-xs font-semibold transition-all shadow-[0_0_10px_rgba(244,63,94,0.2)]"
          title="Sair do Painel ADM"
        >
          <span className="hidden sm:inline">Sair</span>
          <LogOut className="w-3.5 h-3.5 text-rose-400" />
        </button>

        {/* Profile Avatar Quick Trigger */}
        <button
          onClick={() => onSelectTab('perfil')}
          className="relative ml-1 shrink-0 group focus:outline-none"
          title="Abrir Perfil com foto"
        >
          <img
            src={adminUser.avatarUrl}
            alt={adminUser.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-purple-500/70 group-hover:border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#080a14]" />
        </button>
      </div>
    </header>
  );
};
