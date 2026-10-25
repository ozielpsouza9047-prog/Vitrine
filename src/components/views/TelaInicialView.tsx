import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Wallet, 
  Cpu, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import { NavigationTab, AdminUser } from '../../types';

interface TelaInicialViewProps {
  onEnterDashboard: (tab?: NavigationTab) => void;
  adminUser: AdminUser;
  onSwitchToMarketplace?: () => void;
}

export const TelaInicialView: React.FC<TelaInicialViewProps> = ({ 
  onEnterDashboard, 
  adminUser,
  onSwitchToMarketplace
}) => {
  const modules = [
    { id: 'painel' as NavigationTab, title: 'Painel ADM', desc: 'Métricas em tempo real, faturamento e resumo diário', icon: LayoutDashboard, color: 'purple' },
    { id: 'clientes' as NavigationTab, title: 'Clientes', desc: 'Diretório completo de clientes e histórico de consumo', icon: Users, color: 'cyan' },
    { id: 'agenda' as NavigationTab, title: 'Agenda', desc: 'Controle de compromissos, agendamentos e horários', icon: Calendar, color: 'green' },
    { id: 'caixa' as NavigationTab, title: 'Caixa & PDV', desc: 'Lançamentos, entradas, saídas e fechamento diário', icon: Wallet, color: 'green' },
    { id: 'soquete' as NavigationTab, title: 'Central de Soquetes', desc: 'Monitoramento TCP/IP, WebSockets e periféricos', icon: Cpu, color: 'cyan' },
    { id: 'financeiro' as NavigationTab, title: 'Financeiro', desc: 'DRE, margens de lucro, extratos e relatórios', icon: TrendingUp, color: 'purple' },
  ];

  return (
    <div className="min-h-[85vh] flex flex-col justify-between space-y-10 py-6">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e1228] via-[#090b16] to-[#070912] border border-purple-500/30 p-8 sm:p-12 shadow-[0_0_40px_rgba(168,85,247,0.18)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold shadow-[0_0_12px_rgba(168,85,247,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sistema Administrativo Master</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Bem-vindo à Tela Inicial do{' '}
            <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Painel ADM
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Ambiente centralizado de controle operacional, inteligência financeira, gestão de clientes e monitoramento de soquetes de hardware em tempo real.
          </p>

          {/* User info bar + Primary CTA button */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => onEnterDashboard('painel')}
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(168,85,247,0.45)] transition-all"
            >
              <span>Acessar Painel ADM Completo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {onSwitchToMarketplace && (
              <button
                onClick={onSwitchToMarketplace}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all"
              >
                <span>Explorar Vitrines Multimarcas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <img
                src={adminUser.avatarUrl}
                alt={adminUser.name}
                className="w-8 h-8 rounded-full object-cover border border-purple-400"
              />
              <div className="text-left">
                <p className="text-xs font-semibold text-white">{adminUser.name}</p>
                <p className="text-[10px] text-slate-400">{adminUser.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Módulos de Acesso Rápido</h2>
          <span className="text-xs text-slate-400">Clique para abrir diretamente</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => onEnterDashboard(m.id)}
                className="group p-5 rounded-2xl bg-[#0d1022]/90 border border-slate-800 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${
                    m.color === 'purple' ? 'bg-purple-950/60 border-purple-500/40 text-purple-400' :
                    m.color === 'cyan' ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400' :
                    'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 rounded-xl bg-[#0b0d18] border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Status do Servidor: Operacional (99.8% Uptime)</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Soquetes Ativos: 4</span>
          <span>·</span>
          <span>Caixa: Aberto</span>
          <span>·</span>
          <span>Versão: ADM Core v2.4</span>
        </div>
      </div>
    </div>
  );
};
