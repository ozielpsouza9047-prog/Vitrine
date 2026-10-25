import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Minus, 
  Lock, 
  Receipt, 
  QrCode, 
  CreditCard, 
  Banknote 
} from 'lucide-react';
import { CashTransaction } from '../../types';

interface CaixaViewProps {
  transactions: CashTransaction[];
  onAddTransaction: (tx: CashTransaction) => void;
}

export const CaixaView: React.FC<CaixaViewProps> = ({ transactions, onAddTransaction }) => {
  const [filterType, setFilterType] = useState<'todos' | 'entrada' | 'saida'>('todos');
  const [showModal, setShowModal] = useState(false);
  const [txType, setTxType] = useState<'entrada' | 'saida'>('entrada');
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    method: 'PIX' as const,
    category: 'Vendas'
  });

  const totalEntradas = transactions
    .filter(t => t.type === 'entrada')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalSaidas = transactions
    .filter(t => t.type === 'saida')
    .reduce((acc, t) => acc + t.amount, 0);

  const saldoAtual = totalEntradas - totalSaidas;

  const filtered = transactions.filter(t => {
    if (filterType === 'todos') return true;
    return t.type === filterType;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    onAddTransaction({
      id: `tx-${Date.now()}`,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      description: formData.description,
      type: txType,
      method: formData.method,
      amount: parseFloat(formData.amount),
      category: formData.category
    });

    setFormData({ description: '', amount: '', method: 'PIX', category: 'Vendas' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Wallet className="w-6 h-6 text-emerald-400" />
            Controle de Caixa & PDV
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gestão de fluxo diário de entradas, saídas, fechamento de caixa e pagamentos
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setTxType('entrada'); setShowModal(true); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-[0_0_12px_rgba(16,185,129,0.35)] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Lançar Entrada</span>
          </button>
          <button
            onClick={() => { setTxType('saida'); setShowModal(true); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/50 text-rose-300 font-semibold text-xs transition-all"
          >
            <Minus className="w-4 h-4" />
            <span>Lançar Saída</span>
          </button>
        </div>
      </div>

      {/* Caixa Status & 4 Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card Saldo Atual (Neon Green) */}
        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.18)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Saldo Atual em Caixa</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
            R$ {saldoAtual.toFixed(2)}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-300 font-medium">
            <span className="font-semibold">Caixa Aberto</span>
            <span className="text-slate-400">· Operador: Camila D.</span>
          </div>
        </div>

        {/* Card Total Entradas */}
        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Total Entradas Hoje</span>
            <div className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white font-mono tabular-nums">
            R$ {totalEntradas.toFixed(2)}
          </p>
          <span className="text-[11px] text-emerald-400 mt-2 block">
            {transactions.filter(t => t.type === 'entrada').length} recebimentos
          </span>
        </div>

        {/* Card Total Saídas */}
        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Total Saídas / Custos</span>
            <div className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-500/30">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-rose-400 font-mono tabular-nums">
            R$ {totalSaidas.toFixed(2)}
          </p>
          <span className="text-[11px] text-rose-400 mt-2 block">
            {transactions.filter(t => t.type === 'saida').length} despesas registradas
          </span>
        </div>

        {/* Card Saldo Inicial */}
        <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Fundo de Troco Inicial</span>
            <Receipt className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-slate-200 font-mono tabular-nums">
            R$ 500,00
          </p>
          <span className="text-[11px] text-slate-400 mt-2 block">
            Aberto às 08:30
          </span>
        </div>
      </div>

      {/* Payment Methods Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[#0d1022]/80 border border-cyan-500/30 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-500/40">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">PIX</span>
            <span className="text-sm font-bold text-white font-mono tabular-nums">54%</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0d1022]/80 border border-purple-500/30 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-500/40">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Crédito</span>
            <span className="text-sm font-bold text-white font-mono tabular-nums">28%</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0d1022]/80 border border-emerald-500/30 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/40">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Débito</span>
            <span className="text-sm font-bold text-white font-mono tabular-nums">12%</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0d1022]/80 border border-amber-500/30 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-500/40">
            <Banknote className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Dinheiro Físico</span>
            <span className="text-sm font-bold text-white font-mono tabular-nums">6%</span>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="p-5 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Receipt className="w-4 h-4 text-emerald-400" />
            Movimentações do Caixa Hoje
          </h2>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setFilterType('todos')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                filterType === 'todos'
                  ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilterType('entrada')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                filterType === 'entrada'
                  ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Entradas
            </button>
            <button
              onClick={() => setFilterType('saida')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                filterType === 'saida'
                  ? 'bg-rose-600 text-white shadow-[0_0_10px_rgba(244,63,94,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Saídas
            </button>
          </div>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#11152a] text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Horário</th>
                <th className="px-4 py-3 font-semibold">Descrição</th>
                <th className="px-4 py-3 font-semibold">Categoria</th>
                <th className="px-4 py-3 font-semibold">Forma de Pagamento</th>
                <th className="px-4 py-3 font-semibold text-right">Valor (R$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/20">
                  <td className="px-4 py-3 font-mono text-slate-400">{t.time}</td>
                  <td className="px-4 py-3 font-medium text-white">{t.description}</td>
                  <td className="px-4 py-3 text-slate-400">{t.category}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {t.method}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-right font-mono font-bold tabular-nums ${
                    t.type === 'entrada' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {t.type === 'entrada' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#0d1022] border border-slate-700 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <h2 className="text-lg font-bold text-white mb-4">
              {txType === 'entrada' ? 'Lançar Entrada no Caixa' : 'Lançar Saída do Caixa'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Descrição</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ex: Recebimento consulta / Pagamento fornecedor"
                  className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Método</label>
                  <select
                    value={formData.method}
                    onChange={(e) => setFormData({ ...formData, method: e.target.value as any })}
                    className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="PIX">PIX</option>
                    <option value="Cartão Crédito">Cartão Crédito</option>
                    <option value="Cartão Débito">Cartão Débito</option>
                    <option value="Dinheiro">Dinheiro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Categoria</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-xl text-white font-semibold ${
                    txType === 'entrada' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'
                  }`}
                >
                  Salvar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
