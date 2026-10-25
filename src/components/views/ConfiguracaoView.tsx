import React, { useState } from 'react';
import { 
  Settings, 
  Palette, 
  Bell, 
  Building2, 
  Monitor, 
  Save, 
  CheckCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const ConfiguracaoView: React.FC = () => {
  const [autoCloseMenu, setAutoCloseMenu] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [notifyTransactions, setNotifyTransactions] = useState(true);
  const [notifySockets, setNotifySockets] = useState(true);
  const [themeGlow, setThemeGlow] = useState<'alto' | 'medio' | 'suave'>('alto');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-cyan-400" />
          Configurações do Sistema
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Parâmetros operacionais, preferências do menu lateral e personalização de tema
        </p>
      </div>

      {/* Section 1: Menu Lateral & Comportamento */}
      <div className="p-6 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Monitor className="w-4 h-4 text-cyan-400" />
          Comportamento do Menu Lateral
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-[#11152a] border border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Fechar menu automaticamente ao clicar fora</p>
              <p className="text-slate-400 mt-0.5">Recolhe a barra lateral quando o usuário clica na área principal</p>
            </div>
            <button
              onClick={() => setAutoCloseMenu(!autoCloseMenu)}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {autoCloseMenu ? (
                <ToggleRight className="w-8 h-8 text-cyan-400" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-600" />
              )}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#11152a] border border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Intensidade do Brilho Neon (Roxo, Azul, Verde)</p>
              <p className="text-slate-400 mt-0.5">Define a força dos efeitos de iluminação nos cards e botões</p>
            </div>
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
              {(['alto', 'medio', 'suave'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setThemeGlow(lvl)}
                  className={`px-3 py-1 rounded text-xs capitalize font-medium transition-colors ${
                    themeGlow === lvl ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Notificações */}
      <div className="p-6 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-purple-400" />
          Alertas e Notificações
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-[#11152a] border border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Notificar movimentações financeiras no Caixa</p>
              <p className="text-slate-400 mt-0.5">Dispara alerta sonoro e popup a cada entrada registrada</p>
            </div>
            <button
              onClick={() => setNotifyTransactions(!notifyTransactions)}
              className="text-purple-400 hover:text-purple-300"
            >
              {notifyTransactions ? (
                <ToggleRight className="w-8 h-8 text-purple-400" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-600" />
              )}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#11152a] border border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Alertas de oscilação em Soquetes de Rede</p>
              <p className="text-slate-400 mt-0.5">Alerta se a latência subir acima de 50ms ou se houver perda de pacote</p>
            </div>
            <button
              onClick={() => setNotifySockets(!notifySockets)}
              className="text-purple-400 hover:text-purple-300"
            >
              {notifySockets ? (
                <ToggleRight className="w-8 h-8 text-purple-400" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-2">
        {saved ? (
          <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
            <CheckCircle className="w-4 h-4" />
            Configurações salvas com sucesso!
          </span>
        ) : <div />}

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Salvar Configurações</span>
        </button>
      </div>
    </div>
  );
};
