import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Building, 
  Camera, 
  CheckCircle2, 
  Key, 
  Clock, 
  Lock
} from 'lucide-react';
import { AdminUser } from '../../types';

interface PerfilViewProps {
  adminUser: AdminUser;
  onUpdateUser: (user: AdminUser) => void;
}

export const PerfilView: React.FC<PerfilViewProps> = ({ adminUser, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    name: adminUser.name,
    email: adminUser.email,
    phone: adminUser.phone,
    department: adminUser.department,
    role: adminUser.role,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...adminUser,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      role: formData.role
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <User className="w-6 h-6 text-purple-400" />
          Perfil do Administrador
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Visualização da foto de perfil, credenciais de acesso e privilégios administrativos
        </p>
      </div>

      {/* Main Profile Showcase Card */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-[#0d1022]/90 border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.2)]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar Photo with Glowing Neon Purple Halo */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_25px_rgba(168,85,247,0.5)]">
              <img
                src={adminUser.avatarUrl}
                alt={adminUser.name}
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <button 
              className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg border border-purple-400/50 transition-colors"
              title="Trocar Foto de Perfil"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                {adminUser.name}
              </h2>
              <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-purple-950/70 border border-purple-500/50 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                {adminUser.role}
              </span>
            </div>

            <p className="text-xs text-slate-300">
              {adminUser.department}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                <span className="text-emerald-400 font-semibold">Online agora</span>
              </span>
              <span>·</span>
              <span className="font-mono text-slate-300">{adminUser.email}</span>
              <span>·</span>
              <span className="font-mono text-slate-300">{adminUser.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form: Edit Profile (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            Informações Pessoais & Contato
          </h3>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Nome Completo</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Email de Acesso</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Telefone / WhatsApp</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Cargo / Função</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Departamento / Setor</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-[#11152a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {savedSuccess ? (
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Perfil atualizado com sucesso!
                </span>
              ) : (
                <span className="text-[11px] text-slate-500">Última atualização registrada no log</span>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>

        {/* Right Card: Privileges & Security (1 col) */}
        <div className="p-6 rounded-2xl bg-[#0d1022]/90 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Privilégios Administrativos
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center justify-between">
              <span className="text-slate-200">Painel ADM Completo</span>
              <span className="text-emerald-400 font-bold">Autorizado</span>
            </div>
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between">
              <span className="text-slate-200">Acesso a Clientes & CRM</span>
              <span className="text-emerald-400 font-bold">Autorizado</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between">
              <span className="text-slate-200">Fluxo de Caixa & Sangria</span>
              <span className="text-emerald-400 font-bold">Autorizado</span>
            </div>
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between">
              <span className="text-slate-200">Central de Soquetes & Rede</span>
              <span className="text-emerald-400 font-bold">Autorizado</span>
            </div>
            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center justify-between">
              <span className="text-slate-200">Módulo Financeiro & DRE</span>
              <span className="text-emerald-400 font-bold">Autorizado</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span>Nível de Segurança: Nível 5 (Irrestrito)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
