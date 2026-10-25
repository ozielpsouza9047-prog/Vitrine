import React, { useState } from 'react';
import { 
  User, 
  ShoppingBag, 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  QrCode, 
  ExternalLink, 
  MapPin, 
  Phone, 
  Mail, 
  Award,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { CustomerProfile, CustomerOrder, StoreProduct } from '../../types';

interface CustomerAreaViewProps {
  customer: CustomerProfile;
  orders: CustomerOrder[];
  onOpenStoreShowcase?: (storeId: string) => void;
}

export const CustomerAreaView: React.FC<CustomerAreaViewProps> = ({
  customer,
  orders,
  onOpenStoreShowcase,
}) => {
  const [activeTab, setActiveTab] = useState<'pedidos' | 'produtos' | 'perfil'>('pedidos');
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(orders[0] || null);

  // Extract all acquired products across all orders
  const allAcquiredProducts = orders.flatMap(order => 
    order.items.map(item => ({
      ...item,
      orderId: order.id,
      orderDate: order.date,
      storeName: order.storeName
    }))
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Customer Profile Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950/50 via-[#0d1022] to-cyan-950/40 border border-purple-500/30 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Neon Ring */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <img
                src={customer.avatarUrl}
                alt={customer.name}
                className="w-full h-full object-cover rounded-[12px]"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#08090f] shadow-[0_0_6px_#34d399]" />
          </div>

          {/* Customer Metadata */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                {customer.name}
              </h1>
              <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-purple-950/70 border border-purple-500/50 text-purple-300">
                Cliente VIP · {customer.loyaltyPoints} Pontos
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Membro desde {customer.memberSince} · {orders.length} Pedidos Realizados
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                {customer.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-mono">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                {customer.phone}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {customer.city}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher: Histórico de Pedidos, Produtos Adquiridos, Meus Dados */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('pedidos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'pedidos'
              ? 'bg-purple-950/60 border border-purple-500/50 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Histórico & Status dos Pedidos ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('produtos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'produtos'
              ? 'bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Produtos Adquiridos ({allAcquiredProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('perfil')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'perfil'
              ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Dados do Cliente & Endereço</span>
        </button>
      </div>

      {/* Content 1: Histórico de Compras & Status dos Pedidos & Andamento dos Pagamentos */}
      {activeTab === 'pedidos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Cards List (1 col) */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" />
              Selecione um Pedido
            </h2>

            {orders.map((ord) => {
              const isSelected = selectedOrder?.id === ord.id;
              return (
                <div
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  className={`p-4 rounded-2xl bg-[#0d1022]/90 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-purple-500/80 shadow-[0_0_18px_rgba(168,85,247,0.25)] bg-[#11152a]'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white font-mono">{ord.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      ord.orderStatus === 'Entregue'
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                        : 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40'
                    }`}>
                      {ord.orderStatus}
                    </span>
                  </div>

                  <p className="text-xs text-purple-300 font-semibold">{ord.storeName}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{ord.date} · {ord.items.length} itens</p>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800/80 text-xs">
                    <span className="text-slate-400">Total Pago:</span>
                    <span className="font-mono font-bold text-emerald-400 tabular-nums">
                      R$ {ord.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Order Detailed Status & Payment Progress (2 cols) */}
          {selectedOrder && (
            <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0d1022]/90 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white font-mono">
                      Detalhes do Pedido #{selectedOrder.id}
                    </h3>
                    <span className="text-xs text-slate-400">({selectedOrder.storeName})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Realizado em {selectedOrder.date}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Pagamento {selectedOrder.paymentStatus} (PIX)
                  </span>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  Andamento do Pedido e Rastreamento
                </h4>

                <div className="p-4 rounded-2xl bg-[#11152a] border border-slate-800">
                  <div className="grid grid-cols-4 gap-2 text-center text-xs relative">
                    <div className="space-y-1">
                      <div className="w-8 h-8 rounded-full mx-auto bg-emerald-600 text-white flex items-center justify-center font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                        ✓
                      </div>
                      <p className="font-semibold text-white text-[11px]">Pagamento</p>
                      <span className="text-[10px] text-emerald-400 block font-mono">Aprovado</span>
                    </div>

                    <div className="space-y-1">
                      <div className="w-8 h-8 rounded-full mx-auto bg-emerald-600 text-white flex items-center justify-center font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                        ✓
                      </div>
                      <p className="font-semibold text-white text-[11px]">Preparação</p>
                      <span className="text-[10px] text-emerald-400 block font-mono">Concluída</span>
                    </div>

                    <div className="space-y-1">
                      <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold ${
                        selectedOrder.orderStatus === 'Em Trânsito'
                          ? 'bg-cyan-600 text-white animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                          : selectedOrder.orderStatus === 'Entregue'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {selectedOrder.orderStatus === 'Entregue' ? '✓' : '3'}
                      </div>
                      <p className="font-semibold text-white text-[11px]">Em Trânsito</p>
                      <span className="text-[10px] text-cyan-300 block font-mono">Transportadora</span>
                    </div>

                    <div className="space-y-1">
                      <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold ${
                        selectedOrder.orderStatus === 'Entregue'
                          ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {selectedOrder.orderStatus === 'Entregue' ? '✓' : '4'}
                      </div>
                      <p className="font-semibold text-white text-[11px]">Entrega</p>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {selectedOrder.orderStatus === 'Entregue' ? 'Concluída' : 'Previsão 2 dias'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items in this order */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Itens do Pedido
                </h4>

                <div className="divide-y divide-slate-800/80 rounded-2xl bg-[#11152a] border border-slate-800 p-3">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="w-12 h-12 rounded-lg object-cover bg-slate-900"
                        />
                        <div>
                          <p className="text-xs font-bold text-white">{it.name}</p>
                          <p className="text-[11px] text-slate-400">Qtd: {it.quantity} un</p>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-emerald-400 tabular-nums">
                        R$ {(it.price * it.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Details Card */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Método: PIX Instantâneo BACEN</p>
                    <p className="text-[11px] text-slate-400 font-mono">Autenticação: 89a2-44f1-902c-7b19</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Total Liquidado</span>
                  <span className="text-base font-bold text-emerald-400 font-mono tabular-nums">
                    R$ {selectedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content 2: Produtos Adquiridos (Gallery) */}
      {activeTab === 'produtos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              Todos os Produtos que Você Já Adquiriu
            </h2>
            <span className="text-xs text-slate-400">{allAcquiredProducts.length} itens</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allAcquiredProducts.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#0d1022]/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center gap-4"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-20 h-20 rounded-xl object-cover bg-slate-900 shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block truncate">
                    {p.storeName}
                  </span>
                  <h3 className="text-xs font-bold text-white truncate">
                    {p.name}
                  </h3>
                  <p className="text-xs font-mono font-bold text-emerald-400 tabular-nums">
                    R$ {p.price.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Comprado em {p.orderDate} ({p.orderId})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content 3: Dados do Cliente & Endereço */}
      {activeTab === 'perfil' && (
        <div className="max-w-2xl p-6 rounded-3xl bg-[#0d1022]/90 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" />
            Dados Cadastrais do Cliente
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#11152a] border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Nome Completo</span>
              <span className="font-semibold text-white mt-1 block">{customer.name}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#11152a] border border-slate-800">
              <span className="text-[11px] text-slate-400 block">CPF Cadastrado</span>
              <span className="font-mono text-white mt-1 block">{customer.cpf}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#11152a] border border-slate-800">
              <span className="text-[11px] text-slate-400 block">E-mail Principal</span>
              <span className="font-mono text-white mt-1 block">{customer.email}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#11152a] border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Telefone de Contato</span>
              <span className="font-mono text-white mt-1 block">{customer.phone}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#11152a] border border-slate-800 text-xs">
            <span className="text-[11px] text-slate-400 block">Endereço de Entrega Padrão</span>
            <p className="font-semibold text-white mt-1">{customer.address}</p>
            <p className="text-slate-400 text-[11px]">{customer.city} · CEP 01310-200</p>
          </div>
        </div>
      )}
    </div>
  );
};
