import React from 'react';
import { 
  BarChart3, 
  Target, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  TrendingUp, 
  Users2, 
  ArrowUpRight 
} from 'lucide-react';

export const GestaoView: React.FC = () => {
  const goals = [
    { name: 'Meta de Faturamento Mensal', current: 84920, target: 100000, color: 'from-purple-500 to-indigo-500', percent: 84.9 },
    { name: 'Novos Clientes Ativos', current: 42, target: 50, color: 'from-cyan-400 to-blue-500', percent: 84.0 },
    { name: 'Horários Realizados na Agenda', current: 184, target: 200, color: 'from-emerald-400 to-teal-500', percent: 92.0 },
    { name: 'Índice de Eficiência de Soquetes', current: 99.8, target: 99.9, color: 'from-purple-400 to-pink-500', percent: 99.8 }
  ];

  const team = [
    { name: 'Oziel Souza', role: 'Gestor & Administrador Master', tasks: 38, rating: '5.0', status: 'Ativo' },
    { name: 'Dra. Vanessa', role: 'Consultora Especialista', tasks: 29, rating: '4.9', status: 'Ativo' },
    { name: 'Felipe Rocha', role: 'Analista de Processos', tasks: 22, rating: '4.8', status: 'Ativo' },
    { name: 'Camila Duarte', role: 'Operadora de Caixa & Atendimento', tasks: 45, rating: '4.9', status: 'Ativo' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            Gestão Operacional & Estratégica
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Acompanhamento de metas, produtividade da equipe e indicadores de desempenho
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-purple-950/50 border border-purple-500/40 text-purple-300 text-xs font-semibold">
            Ciclo Atual: Outubro / 2026
          </span>
        </div>
      </div>

      {/* Top 3 Strategic Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Índice Geral de Produtividade</span>
            <Target className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-mono mt-3 tabular-nums">94.8%</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400">
            <ArrowUpRight className="w-4 h-4" />
            <span>+3.2% acima da média</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Tarefas e Demandas Concluídas</span>
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-mono mt-3 tabular-nums">134</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-cyan-400">
            <span>98% entregues no prazo</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Satisfação do Cliente (CSAT)</span>
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-mono mt-3 tabular-nums">4.9 / 5.0</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400">
            <span>Classificação Excelente</span>
          </div>
        </div>
      </div>

      {/* Metas Progress Bars */}
      <div className="p-6 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-400" />
          Progresso das Metas do Mês
        </h2>

        <div className="space-y-5">
          {goals.map((g, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{g.name}</span>
                <span className="font-mono font-bold text-purple-300 tabular-nums">
                  {g.percent}% ({typeof g.current === 'number' && g.current > 1000 ? `R$ ${g.current.toLocaleString('pt-BR')}` : g.current} / {typeof g.target === 'number' && g.target > 1000 ? `R$ ${g.target.toLocaleString('pt-BR')}` : g.target})
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800 p-0.5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${g.color} transition-all duration-500 shadow-sm`}
                  style={{ width: `${Math.min(g.percent, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Productivity Table */}
      <div className="p-6 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Users2 className="w-4 h-4 text-cyan-400" />
            Produtividade da Equipe
          </h2>
          <span className="text-xs text-slate-400">4 Colaboradores</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#11152a] text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Colaborador</th>
                <th className="px-4 py-3 font-semibold">Função</th>
                <th className="px-4 py-3 font-semibold text-center">Atendimentos</th>
                <th className="px-4 py-3 font-semibold text-center">Avaliação</th>
                <th className="px-4 py-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {team.map((member, i) => (
                <tr key={i} className="hover:bg-slate-800/20">
                  <td className="px-4 py-3 font-semibold text-white">{member.name}</td>
                  <td className="px-4 py-3 text-slate-400">{member.role}</td>
                  <td className="px-4 py-3 text-center font-mono font-bold text-cyan-400 tabular-nums">{member.tasks}</td>
                  <td className="px-4 py-3 text-center font-mono font-bold text-emerald-400 tabular-nums">★ {member.rating}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
