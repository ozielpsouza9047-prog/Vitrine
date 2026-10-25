import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { Appointment } from '../../types';

interface AgendaViewProps {
  appointments: Appointment[];
  onAddAppointment: (apt: Appointment) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({ appointments, onAddAppointment }) => {
  const [selectedDay, setSelectedDay] = useState<'hoje' | 'amanha' | 'semana'>('hoje');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    service: 'Consultoria Especializada',
    time: '10:00 - 11:00',
    date: 'Hoje',
    staff: 'Oziel Souza',
    price: 350,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName) return;

    onAddAppointment({
      id: `apt-${Date.now()}`,
      clientName: formData.clientName,
      service: formData.service,
      time: formData.time,
      date: formData.date,
      duration: '60 min',
      status: 'Confirmado',
      price: Number(formData.price) || 250,
      staff: formData.staff,
    });

    setFormData({
      clientName: '',
      service: 'Consultoria Especializada',
      time: '10:00 - 11:00',
      date: 'Hoje',
      staff: 'Oziel Souza',
      price: 350,
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-emerald-400" />
            Agenda e Horários
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Controle de compromissos, atendimentos técnicos e distribuição de horários
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setSelectedDay('hoje')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedDay === 'hoje'
                  ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hoje
            </button>
            <button
              onClick={() => setSelectedDay('amanha')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedDay === 'amanha'
                  ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Amanhã
            </button>
            <button
              onClick={() => setSelectedDay('semana')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedDay === 'semana'
                  ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Esta Semana
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Agendar</span>
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0d1022]/90 border border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400">Total do Dia</span>
          <p className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">{appointments.length}</p>
          <span className="text-[11px] text-emerald-400 mt-1 block">5 Horários preenchidos</span>
        </div>
        <div className="p-4 rounded-xl bg-[#0d1022]/90 border border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400">Confirmados</span>
          <p className="text-2xl font-bold text-cyan-400 font-mono mt-1 tabular-nums">
            {appointments.filter(a => a.status === 'Confirmado').length}
          </p>
          <span className="text-[11px] text-cyan-400 mt-1 block">Em dia para atendimento</span>
        </div>
        <div className="p-4 rounded-xl bg-[#0d1022]/90 border border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400">Concluídos</span>
          <p className="text-2xl font-bold text-emerald-400 font-mono mt-1 tabular-nums">
            {appointments.filter(a => a.status === 'Concluído').length}
          </p>
          <span className="text-[11px] text-emerald-400 mt-1 block">Atendimentos finalizados</span>
        </div>
        <div className="p-4 rounded-xl bg-[#0d1022]/90 border border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400">Receita Prevista</span>
          <p className="text-2xl font-bold text-purple-400 font-mono mt-1 tabular-nums">
            R$ {appointments.reduce((acc, a) => acc + a.price, 0).toFixed(2)}
          </p>
          <span className="text-[11px] text-purple-400 mt-1 block">Projeção diária</span>
        </div>
      </div>

      {/* Timeline Schedule Cards */}
      <div className="grid grid-cols-1 gap-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="p-5 rounded-2xl bg-[#0d1022]/90 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start sm:items-center gap-4">
              {/* Time Block */}
              <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-center shrink-0">
                <span className="text-xs font-bold text-emerald-400 font-mono block">
                  {apt.time.split(' - ')[0]}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {apt.duration}
                </span>
              </div>

              {/* Client & Service Info */}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{apt.clientName}</h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    apt.status === 'Concluído'
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                      : apt.status === 'Confirmado'
                      ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40'
                      : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                  }`}>
                    {apt.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{apt.service}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1.5">
                  <span className="flex items-center gap-1 text-slate-400">
                    <User className="w-3 h-3 text-emerald-400" />
                    Responsável: {apt.staff}
                  </span>
                  <span>·</span>
                  <span>Data: {apt.date}</span>
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800/80">
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block uppercase">Valor</span>
                <span className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                  R$ {apt.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  className="px-3 py-1.5 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium transition-colors"
                  title="Marcar como Concluído"
                >
                  Concluir
                </button>
                <button 
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                >
                  Remarcar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#0d1022] border border-emerald-500/40 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <h2 className="text-lg font-bold text-white mb-4">Novo Horário na Agenda</h2>
            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Nome do Cliente</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Nome do cliente cadastrado"
                  className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Serviço / Atendimento</label>
                <input
                  type="text"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Horário</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Valor (R$)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Profissional Responsável</label>
                <input
                  type="text"
                  value={formData.staff}
                  onChange={(e) => setFormData({ ...formData, staff: e.target.value })}
                  className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
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
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
