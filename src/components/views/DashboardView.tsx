import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Wallet, 
  Cpu, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Clock, 
  Activity, 
  Plus, 
  ExternalLink,
  Zap,
  Sparkles
} from 'lucide-react';
import { NavigationTab, Client, Appointment, CashTransaction, SocketConnection } from '../../types';

interface DashboardViewProps {
  onNavigate: (tab: NavigationTab) => void;
  clients: Client[];
  appointments: Appointment[];
  transactions: CashTransaction[];
  sockets: SocketConnection[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  clients,
  appointments,
  transactions,
  sockets,
}) => {
  const [chartPeriod, setChartPeriod] = useState<'semana' | 'mes' | 'ano'>('mes');

  // Chart SVG paths
  const chartPoints = {
    semana: [
      { x: 0, y: 70, label: 'Seg', val: 'R$ 8.2k' },
      { x: 100, y: 55, label: 'Ter', val: 'R$ 11.4k' },
      { x: 200, y: 40, label: 'Qua', val: 'R$ 14.8k' },
      { x: 300, y: 60, label: 'Qui', val: 'R$ 9.6k' },
      { x: 400, y: 25, label: 'Sex', val: 'R$ 18.2k' },
      { x: 500, y: 35, label: 'Sáb', val: 'R$ 16.0k' },
      { x: 600, y: 15, label: 'Dom', val: 'R$ 21.5k' },
    ],
    mes: [
      { x: 0, y: 80, label: 'Sem 1', val: 'R$ 18.2k' },
      { x: 200, y: 45, label: 'Sem 2', val: 'R$ 24.5k' },
      { x: 400, y: 30, label: 'Sem 3', val: 'R$ 28.1k' },
      { x: 600, y: 15, label: 'Sem 4', val: 'R$ 34.1k' },
    ],
    ano: [
      { x: 0, y: 75, label: 'T1', val: 'R$ 180k' },
      { x: 200, y: 50, label: 'T2', val: 'R$ 240k' },
      { x: 400, y: 35, label: 'T3', val: 'R$ 310k' },
      { x: 600, y: 15, label: 'T4', val: 'R$ 420k' },
    ]
  };

  const points = chartPoints[chartPeriod];
  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');
  const areaPoints = `0,100 ${polylinePoints} 600,100`;

  return (
    <div className="space-y-6">
      {/* Welcome Banner with Neon Multi-glow */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-cyan-950/40 border border-purple-500/30 p-6 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs uppercase tracking-widest font-semibold text-purple-400">
                Painel Administrativo Master
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Visão Geral do Sistema
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Monitore faturamento, clientes, agenda, fluxo de caixa e status de conexões em tempo real com controle total.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('agenda')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Ver Agenda Hoje</span>
            </button>
            <button
              onClick={() => onNavigate('caixa')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-300 font-semibold text-xs tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all"
            >
              <Wallet className="w-4 h-4" />
              <span>Abrir Caixa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Cards with Neon Purple, Blue, Green Accents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Neon Purple - Faturamento */}
        <div 
          onClick={() => onNavigate('financeiro')}
          className="relative group p-5 rounded-2xl bg-[#0d1022]/90 border border-purple-500/30 hover:border-purple-500/70 shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Faturamento Mensal</span>
            <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums tracking-tight">
            R$ 84.920,00
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 text-xs text-purple-300 font-medium">
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">+18.4%</span>
            <span className="text-slate-400">vs. mês passado</span>
          </div>
        </div>

        {/* Card 2: Neon Cyan/Blue - Clientes Ativos */}
        <div 
          onClick={() => onNavigate('clientes')}
          className="relative group p-5 rounded-2xl bg-[#0d1022]/90 border border-cyan-500/30 hover:border-cyan-500/70 shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Clientes Ativos</span>
            <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums tracking-tight">
            1.428
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 text-xs text-cyan-300 font-medium">
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">+42 novos</span>
            <span className="text-slate-400">neste ciclo</span>
          </div>
        </div>

        {/* Card 3: Neon Green - Saldo Caixa */}
        <div 
          onClick={() => onNavigate('caixa')}
          className="relative group p-5 rounded-2xl bg-[#0d1022]/90 border border-emerald-500/30 hover:border-emerald-500/70 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Saldo Caixa Diário</span>
            <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums tracking-tight">
            R$ 29.450,00
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 text-xs text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">Caixa Aberto</span>
            <span className="text-slate-400">· 6 movimentações</span>
          </div>
        </div>

        {/* Card 4: Neon Cyan/Green - Soquetes & Terminais */}
        <div 
          onClick={() => onNavigate('soquete')}
          className="relative group p-5 rounded-2xl bg-[#0d1022]/90 border border-cyan-500/30 hover:border-cyan-500/70 shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Soquetes & Conexões</span>
            <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums tracking-tight">
            4 / 4 Ativos
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 text-xs text-cyan-300 font-medium">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-semibold font-mono">Ping 14ms</span>
            <span className="text-slate-400">· 99.8% uptime</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Performance Chart + Live Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Interactive Neon Area Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                Desempenho e Fluxo de Receita
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Crescimento financeiro e volume de transações consolidadas
              </p>
            </div>

            {/* Segmented Period Filter */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setChartPeriod('semana')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  chartPeriod === 'semana'
                    ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                7 Dias
              </button>
              <button
                onClick={() => setChartPeriod('mes')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  chartPeriod === 'mes'
                    ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setChartPeriod('ano')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  chartPeriod === 'ano'
                    ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Anual
              </button>
            </div>
          </div>

          {/* SVG Glow Area Chart */}
          <div className="py-6 relative">
            <svg viewBox="0 0 600 110" className="w-full h-44 overflow-visible">
              <defs>
                <linearGradient id="neonGradientArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="neonStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <filter id="neonGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="20" x2="600" y2="20" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="50" x2="600" y2="50" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="80" x2="600" y2="80" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />

              {/* Filled Area with Gradient */}
              <polygon points={areaPoints} fill="url(#neonGradientArea)" />

              {/* Glowing Line */}
              <polyline
                fill="none"
                stroke="url(#neonStroke)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={polylinePoints}
                filter="url(#neonGlowFilter)"
              />

              {/* Data points */}
              {points.map((pt, idx) => (
                <g key={idx} className="cursor-pointer group">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="4.5"
                    className="fill-[#08090f] stroke-cyan-400 stroke-2 group-hover:r-6 transition-all"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 10}
                    textAnchor="middle"
                    className="text-[10px] fill-slate-300 font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {pt.val}
                  </text>
                  <text
                    x={pt.x}
                    y="108"
                    textAnchor="middle"
                    className="text-[10px] fill-slate-500 font-sans"
                  >
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Quick Metrics Footer */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-center">
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400">Média Diária</span>
              <p className="text-sm font-bold text-white font-mono tabular-nums">R$ 2.830</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400">Conversão</span>
              <p className="text-sm font-bold text-emerald-400 font-mono tabular-nums">94.2%</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400">Projeção Mês</span>
              <p className="text-sm font-bold text-purple-400 font-mono tabular-nums">R$ 102k</p>
            </div>
          </div>
        </div>

        {/* Right Column (1 span): Próximos Atendimentos da Agenda */}
        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <h2 className="text-base font-bold text-white">Agenda de Hoje</h2>
              </div>
              <button
                onClick={() => onNavigate('agenda')}
                className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
              >
                <span>Ver todos</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {appointments.slice(0, 4).map((apt) => (
                <div
                  key={apt.id}
                  className="p-3 rounded-xl bg-[#11152a] border border-slate-800/80 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">
                      {apt.clientName}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      apt.status === 'Concluído'
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                        : apt.status === 'Confirmado'
                        ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/40'
                        : 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-1">
                    {apt.service}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {apt.time}
                    </span>
                    <span className="font-mono font-semibold text-emerald-400 tabular-nums">
                      R$ {apt.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('agenda')}
            className="w-full mt-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-emerald-500/60 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Adicionar Novo Horário</span>
          </button>
        </div>
      </div>

      {/* Bottom Section: Caixa Recente & Status do Soquete */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Movimentações do Caixa */}
        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <h2 className="text-base font-bold text-white">Últimos Lançamentos do Caixa</h2>
            </div>
            <button
              onClick={() => onNavigate('caixa')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
            >
              <span>Fluxo completo</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="mt-3 divide-y divide-slate-800/60">
            {transactions.slice(0, 4).map((tx) => (
              <div key={tx.id} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    tx.type === 'entrada'
                      ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-950/50 text-rose-400 border border-rose-500/30'
                  }`}>
                    {tx.type === 'entrada' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{tx.description}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{tx.time}</span>
                      <span>·</span>
                      <span className="text-slate-300">{tx.method}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-bold font-mono tabular-nums ${
                    tx.type === 'entrada' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {tx.type === 'entrada' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Soquetes & Telemetria em Tempo Real */}
        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base font-bold text-white">Soquetes de Rede & Hardware</h2>
            </div>
            <button
              onClick={() => onNavigate('soquete')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              <span>Gerenciar</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="mt-3 space-y-2.5">
            {sockets.map((sock) => (
              <div 
                key={sock.id}
                className="p-3 rounded-xl bg-[#11152a] border border-slate-800/80 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    sock.status === 'conectado'
                      ? 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]'
                      : 'bg-amber-400'
                  }`} />
                  <div>
                    <p className="text-xs font-semibold text-white">{sock.name}</p>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">{sock.endpoint}:{sock.port}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Latência</span>
                    <span className="text-xs font-mono font-bold text-cyan-300 tabular-nums">{sock.ping}ms</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
                    {sock.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
