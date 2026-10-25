import React, { useState } from 'react';
import { 
  Cpu, 
  Activity, 
  RefreshCw, 
  Terminal, 
  Wifi, 
  CheckCircle, 
  AlertTriangle, 
  Send, 
  Play, 
  Trash2,
  Zap
} from 'lucide-react';
import { SocketConnection, SocketLog } from '../../types';

interface SoqueteViewProps {
  sockets: SocketConnection[];
  logs: SocketLog[];
  onAddLog: (log: SocketLog) => void;
}

export const SoqueteView: React.FC<SoqueteViewProps> = ({ sockets, logs, onAddLog }) => {
  const [activeTab, setActiveTab] = useState<'ativos' | 'logs'>('ativos');
  const [isPinging, setIsPinging] = useState(false);

  const handleTestPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      onAddLog({
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('pt-BR'),
        level: 'success',
        message: 'Ping de teste concluído em todos os soquetes ativos: ACK médio 11ms',
        source: 'Console ADM'
      });
      setIsPinging(false);
    }, 600);
  };

  const handleSimulatePacket = () => {
    onAddLog({
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      level: 'info',
      message: 'Pacote de telemetria emitido via TCP Socket porta 8080 (Payload: 256 bytes)',
      source: 'Socket Gateway'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            Central de Soquetes & Hardware
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitoramento de conexões TCP/IP, WebSockets, portas e telemetria de dispositivos
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTestPing}
            disabled={isPinging}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isPinging ? 'animate-spin' : ''}`} />
            <span>{isPinging ? 'Testando...' : 'Testar Ping'}</span>
          </button>
          <button
            onClick={handleSimulatePacket}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/50 text-purple-300 font-semibold text-xs transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Emitir Pacote</span>
          </button>
        </div>
      </div>

      {/* Top 4 Telemetry Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0d1022]/90 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Soquetes Conectados</span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
          </div>
          <p className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">4 / 4 Ativos</p>
          <span className="text-[11px] text-cyan-400 mt-1 block">100% de disponibilidade</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0d1022]/90 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Latência Média</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400 font-mono mt-1 tabular-nums">14 ms</p>
          <span className="text-[11px] text-emerald-400 mt-1 block">Conexão ultrarrápida</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0d1022]/90 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Total Pacotes</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">1.02M</p>
          <span className="text-[11px] text-purple-400 mt-1 block">0 erros / 0 descartes</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0d1022]/90 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Taxa de Dados</span>
            <Wifi className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">1.02 MB/s</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Throughput contínuo</span>
        </div>
      </div>

      {/* Main Sockets Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Wifi className="w-4 h-4 text-cyan-400" />
          Terminais e Soquetes Ativos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sockets.map((sock) => (
            <div
              key={sock.id}
              className="p-5 rounded-2xl bg-[#0d1022]/90 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full ${
                    sock.status === 'conectado'
                      ? 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]'
                      : 'bg-amber-400'
                  }`} />
                  <h3 className="text-sm font-bold text-white">{sock.name}</h3>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  {sock.deviceType}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs flex items-center justify-between">
                <span className="text-cyan-300">{sock.endpoint}</span>
                <span className="text-slate-400 font-bold">Porta: {sock.port}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2 rounded-lg bg-[#11152a] border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Latência</span>
                  <span className="text-xs font-mono font-bold text-emerald-400 tabular-nums">{sock.ping}ms</span>
                </div>
                <div className="p-2 rounded-lg bg-[#11152a] border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Enviados</span>
                  <span className="text-xs font-mono font-bold text-white tabular-nums">{sock.packetsSent.toLocaleString()}</span>
                </div>
                <div className="p-2 rounded-lg bg-[#11152a] border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Uptime</span>
                  <span className="text-xs font-mono font-bold text-purple-400">{sock.uptime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Socket Console Logs */}
      <div className="p-5 rounded-2xl bg-[#090b14] border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-mono font-bold text-white">Log de Eventos do Soquete (Terminal Live)</h2>
          </div>
          <span className="text-[11px] font-mono text-cyan-400">Stream ativo</span>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-black/60 font-mono text-xs space-y-2 max-h-56 overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2">
              <span className="text-slate-500 tabular-nums shrink-0">[{log.timestamp}]</span>
              <span className={`uppercase font-bold text-[10px] px-1 rounded ${
                log.level === 'success' ? 'bg-emerald-950 text-emerald-400' :
                log.level === 'warn' ? 'bg-amber-950 text-amber-400' :
                log.level === 'error' ? 'bg-rose-950 text-rose-400' :
                'bg-cyan-950 text-cyan-400'
              }`}>
                {log.level}
              </span>
              <span className="text-slate-400 font-semibold shrink-0">[{log.source}]:</span>
              <span className="text-slate-200">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
