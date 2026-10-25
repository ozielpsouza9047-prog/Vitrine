import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  PieChart, 
  FileText, 
  Calendar,
  CheckCircle
} from 'lucide-react';

export const FinanceiroView: React.FC = () => {
  const financialRecords = [
    { id: 'fin-01', desc: 'Receita Operacional Consolidada', date: '25/10/2026', cat: 'Faturamento', type: 'in', val: 84920.00, status: 'Liquidado' },
    { id: 'fin-02', desc: 'Despesas com Infraestrutura e Servidores', date: '24/10/2026', cat: 'Operacional', type: 'out', val: 4250.00, status: 'Liquidado' },
    { id: 'fin-03', desc: 'Folha e Comissões de Atendimento', date: '20/10/2026', cat: 'Pessoal', type: 'out', val: 14800.00, status: 'Liquidado' },
    { id: 'fin-04', desc: 'Contrato Anual Corporativo (Parcela 1/12)', date: '18/10/2026', cat: 'Contratos', type: 'in', val: 12500.00, status: 'Liquidado' },
    { id: 'fin-05', desc: 'Manutenção de Hardware e Soquetes', date: '15/10/2026', cat: 'Tecnologia', type: 'out', val: 2290.00, status: 'Liquidado' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            Demonstrativo Financeiro & Lucro
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Balanço consolidado, receitas brutas, custos operacionais e margem líquida
          </p>
        </div>

        <button
          onClick={() => alert('Relatório financeiro exportado com sucesso em formato PDF.')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Exportar DRE (PDF)</span>
        </button>
      </div>

      {/* Top Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Receita Bruta */}
        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <span className="text-xs text-slate-400 font-medium">Receita Bruta Total</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2 tabular-nums">
            R$ 84.920,00
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400">
            <ArrowUpRight className="w-4 h-4" />
            <span>+18.4% vs mês anterior</span>
          </div>
        </div>

        {/* Despesas Operacionais */}
        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 font-medium">Custos & Despesas</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono mt-2 tabular-nums">
            R$ 21.340,00
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
            <span>Dentro do orçamento previsto</span>
          </div>
        </div>

        {/* Lucro Líquido Real */}
        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <span className="text-xs text-slate-400 font-medium">Lucro Líquido Real</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-purple-300 font-mono mt-2 tabular-nums">
            R$ 63.580,00
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-purple-400 font-semibold">
            <span>Margem Líquida: 74.8%</span>
          </div>
        </div>

        {/* A Receber */}
        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span className="text-xs text-slate-400 font-medium">Contas a Receber (30d)</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono mt-2 tabular-nums">
            R$ 14.800,00
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-cyan-400">
            <span>97% com garantia contratual</span>
          </div>
        </div>
      </div>

      {/* Financial Ledger Table */}
      <div className="p-6 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          Extrato Consolidado de Contabilidade
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#11152a] text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Data</th>
                <th className="px-5 py-3.5 font-semibold">Descrição</th>
                <th className="px-5 py-3.5 font-semibold">Categoria</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold text-right">Valor Líquido (R$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {financialRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/20">
                  <td className="px-5 py-3.5 font-mono text-slate-400">{r.date}</td>
                  <td className="px-5 py-3.5 font-semibold text-white">{r.desc}</td>
                  <td className="px-5 py-3.5 text-slate-400">{r.cat}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
                      {r.status}
                    </span>
                  </td>
                  <td className={`px-5 py-3.5 text-right font-mono font-bold tabular-nums ${
                    r.type === 'in' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {r.type === 'in' ? '+' : '-'} R$ {r.val.toFixed(2)}
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
