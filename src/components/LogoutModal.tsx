import React from 'react';
import { LogOut, AlertTriangle, X } from 'lucide-react';
import { AdminUser } from '../types';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  adminUser: AdminUser;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  adminUser,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-[#0d1022] border border-rose-500/40 p-6 shadow-[0_0_30px_rgba(244,63,94,0.25)] space-y-5 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.4)]">
            <LogOut className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Deseja realmente sair?</h3>
            <p className="text-xs text-slate-400 mt-0.5">Sua sessão de administrador será encerrada</p>
          </div>
        </div>

        {/* User Card */}
        <div className="p-3 rounded-xl bg-[#11152a] border border-slate-800 flex items-center gap-3">
          <img
            src={adminUser.avatarUrl}
            alt={adminUser.name}
            className="w-10 h-10 rounded-full object-cover border border-purple-500/50"
          />
          <div className="text-xs">
            <p className="font-semibold text-white">{adminUser.name}</p>
            <p className="text-slate-400">{adminUser.email}</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Ao confirmar a saída, todos os registros não salvos serão cancelados e você precisará autenticar novamente para acessar o Painel ADM.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Permanecer Conectado
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all"
          >
            <span>Confirmar Saída</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
