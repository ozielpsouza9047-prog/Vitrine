import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  DollarSign, 
  MoreVertical,
  Check,
  Star,
  MessageSquare
} from 'lucide-react';
import { Client } from '../../types';

interface ClientesViewProps {
  clients: Client[];
  onAddClient: (client: Client) => void;
}

export const ClientesView: React.FC<ClientesViewProps> = ({ clients, onAddClient }) => {
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [search, setSearch] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'São Paulo, SP',
    status: 'Ativo' as const
  });

  const filteredClients = clients.filter(c => {
    const matchesFilter = filterStatus === 'todos' || c.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.email.toLowerCase().includes(search.toLowerCase()) ||
                          c.phone.includes(search);
    return matchesFilter && matchesSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name) return;
    onAddClient({
      id: `cli-${Date.now()}`,
      name: newClient.name,
      email: newClient.email || 'contato@cliente.com',
      phone: newClient.phone || '(11) 99999-0000',
      city: newClient.city,
      status: newClient.status,
      totalSpent: 0,
      lastVisit: 'Hoje',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    });
    setNewClient({ name: '', email: '', phone: '', city: 'São Paulo, SP', status: 'Ativo' });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            Gestão de Clientes
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Cadastro de clientes, histórico de consumo e fidelização
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs tracking-wide shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Cliente</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0d1022]/90 border border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400">Total na Base</span>
          <p className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">1.428</p>
          <span className="text-[11px] text-cyan-400 mt-1 block">+12 essa semana</span>
        </div>
        <div className="p-4 rounded-xl bg-[#0d1022]/90 border border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400">Clientes VIP</span>
          <p className="text-2xl font-bold text-purple-400 font-mono mt-1 tabular-nums">184</p>
          <span className="text-[11px] text-purple-400 mt-1 block">Ticket Médio R$ 3.8k</span>
        </div>
        <div className="p-4 rounded-xl bg-[#0d1022]/90 border border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400">Ativos no Mês</span>
          <p className="text-2xl font-bold text-emerald-400 font-mono mt-1 tabular-nums">892</p>
          <span className="text-[11px] text-emerald-400 mt-1 block">Frequência alta</span>
        </div>
        <div className="p-4 rounded-xl bg-[#0d1022]/90 border border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400">Taxa de Retenção</span>
          <p className="text-2xl font-bold text-cyan-300 font-mono mt-1 tabular-nums">91.4%</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Excelente fidelidade</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-[#0d1022]/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, email ou telefone..."
            className="w-full bg-[#11152a] border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-slate-900 rounded-xl border border-slate-800">
          {['todos', 'ativo', 'vip', 'pendente', 'inativo'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-colors ${
                filterStatus === status
                  ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Table */}
      <div className="rounded-2xl bg-[#0d1022]/90 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#11152a] text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Cliente</th>
                <th className="px-5 py-3.5 font-semibold">Contato</th>
                <th className="px-5 py-3.5 font-semibold">Localização</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold text-right">Total Investido</th>
                <th className="px-5 py-3.5 font-semibold">Último Acesso</th>
                <th className="px-5 py-3.5 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
                        <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{client.name}</p>
                        <p className="text-[11px] text-slate-400">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-300">
                    {client.phone}
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">
                    {client.city}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                      client.status === 'VIP'
                        ? 'bg-purple-950/60 text-purple-300 border-purple-500/50 shadow-[0_0_8px_rgba(168,85,247,0.3)]'
                        : client.status === 'Ativo'
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50'
                        : client.status === 'Pendente'
                        ? 'bg-amber-950/60 text-amber-300 border-amber-500/50'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-emerald-400 tabular-nums">
                    R$ {client.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">
                    {client.lastVisit}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-950/60 hover:text-cyan-400 text-slate-400 transition-colors"
                        title="Enviar mensagem"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 transition-colors"
                        title="Ver opções"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#0d1022] border border-cyan-500/40 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <h2 className="text-lg font-bold text-white mb-4">Cadastrar Novo Cliente</h2>
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  placeholder="Ex: Amanda Silva"
                  className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Email</label>
                <input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  placeholder="amanda@email.com"
                  className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Telefone</label>
                <input
                  type="text"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  placeholder="(11) 98765-4321"
                  className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Cidade/UF</label>
                <input
                  type="text"
                  value={newClient.city}
                  onChange={(e) => setNewClient({ ...newClient, city: e.target.value })}
                  className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                >
                  Salvar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
