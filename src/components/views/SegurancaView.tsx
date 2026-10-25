import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Smartphone, 
  Laptop, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  History 
} from 'lucide-react';

export const SegurancaView: React.FC = () => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [passChanged, setPassChanged] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });

  const sessions = [
    { id: 'sess-01', device: 'MacBook Pro 16" - Chrome 129', ip: '189.40.12.84', location: 'São Paulo, Brasil', status: 'Sessão Atual', current: true },
    { id: 'sess-02', device: 'iPhone 15 Pro - Safari Mobile', ip: '177.18.230.15', location: 'São Paulo, Brasil', status: 'Ativo há 2 horas', current: false },
    { id: 'sess-03', device: 'Terminal PDV Caixa #01 (Linux)', ip: '192.168.1.105', location: 'Rede Local LAN', status: 'Conectado Contínuo', current: false }
  ];

  const auditLogs = [
    { id: 'aud-1', time: 'Hoje às 15:42', action: 'Autenticação com 2FA bem-sucedida', user: 'Oziel Souza', ip: '189.40.12.84' },
    { id: 'aud-2', time: 'Hoje às 15:00', action: 'Exportação de relatório financeiro DRE', user: 'Oziel Souza', ip: '189.40.12.84' },
    { id: 'aud-3', time: 'Ontem às 18:30', action: 'Fechamento de Caixa diário conferido', user: 'Camila Duarte', ip: '192.168.1.105' },
    { id: 'aud-4', time: 'Ontem às 08:30', action: 'Abertura de Caixa e emissão de saldo', user: 'Camila Duarte', ip: '192.168.1.105' },
  ];

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.next || passwords.next !== passwords.confirm) {
      alert('As novas senhas não coincidem!');
      return;
    }
    setPassChanged(true);
    setPasswords({ current: '', next: '', confirm: '' });
    setTimeout(() => setPassChanged(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-purple-400" />
          Segurança, 2FA & Sessões
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Proteção de credenciais, auditoria de acessos e gerenciamento de dispositivos autorizados
        </p>
      </div>

      {/* 2FA Card */}
      <div className="p-6 rounded-2xl bg-[#0d1022]/90 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Autenticação em Duas Etapas (2FA)</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Exige código temporário via aplicativo autenticador a cada novo login
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
            ATIVADO
          </span>
          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Configurar 2FA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Sessions */}
        <div className="p-6 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Laptop className="w-4 h-4 text-cyan-400" />
            Sessões e Dispositivos Conectados
          </h2>

          <div className="space-y-3">
            {sessions.map((s) => (
              <div key={s.id} className="p-3.5 rounded-xl bg-[#11152a] border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-white">{s.device}</p>
                    {s.current && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/40">
                        Esta sessão
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">{s.ip} · {s.location}</p>
                </div>
                <span className="text-[11px] text-slate-400">{s.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Change Password Form */}
        <div className="p-6 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            Alterar Senha do Administrador
          </h2>

          <form onSubmit={handlePasswordSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Senha Atual</label>
              <input
                type="password"
                required
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Nova Senha Forte</label>
              <input
                type="password"
                required
                value={passwords.next}
                onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Confirmar Nova Senha</label>
              <input
                type="password"
                required
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              {passChanged && (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Senha atualizada!
                </span>
              )}
              <button
                type="submit"
                className="ml-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.4)] transition-all"
              >
                Atualizar Senha
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="p-6 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-400" />
          Registro de Auditoria de Acessos Recentes
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#11152a] text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Horário</th>
                <th className="px-4 py-3 font-semibold">Ação Registrada</th>
                <th className="px-4 py-3 font-semibold">Usuário</th>
                <th className="px-4 py-3 font-semibold">Endereço IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/20">
                  <td className="px-4 py-3 font-mono text-slate-400">{log.time}</td>
                  <td className="px-4 py-3 font-semibold text-white">{log.action}</td>
                  <td className="px-4 py-3 text-purple-300">{log.user}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
