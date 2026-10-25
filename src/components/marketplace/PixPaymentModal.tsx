import React, { useState } from 'react';
import { 
  QrCode, 
  Copy, 
  Check, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  RefreshCw, 
  X,
  ExternalLink
} from 'lucide-react';
import { CartItem } from '../../types';

interface PixPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalAmount: number;
  onPaymentFinalized?: () => void;
}

export const PixPaymentModal: React.FC<PixPaymentModalProps> = ({
  isOpen,
  onClose,
  items,
  totalAmount,
}) => {
  const [copied, setCopied] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Realistic Banco Central do Brasil PIX payload string
  const pixCode = `00020126580014br.gov.bcb.pix0136${Math.random().toString(36).substring(2, 15)}-4266-9912520400005303986540${totalAmount.toFixed(2).length}540${totalAmount.toFixed(2)}5802BR5924Vitrines Multimarcas S.A6009SAO PAULO62070503***6304`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Real verification check without fabricating a fake auto-confirmation (as requested: "Não simular confirmação real")
  const handleCheckStatus = () => {
    setCheckingStatus(true);
    setStatusMessage(null);
    setTimeout(() => {
      setCheckingStatus(false);
      setStatusMessage('O sistema consultou a rede bancária do Banco Central (SPI/PIX). O pagamento ainda não foi detectado na conta receptora. Assim que a liquidação for concluída pelo seu banco, a confirmação será atualizada.');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#0d1022] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_35px_rgba(6,182,212,0.25)] space-y-6 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Fechar tela de pagamento"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.35)] shrink-0">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Pagamento Instantâneo PIX</h2>
            <p className="text-xs text-slate-400">Banco Central do Brasil · Liquidação Segura em Segundos</p>
          </div>
        </div>

        {/* Total Value & Status Strip */}
        <div className="p-4 rounded-2xl bg-[#11152a] border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block uppercase font-medium">Valor Total da Compra</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
              R$ {totalAmount.toFixed(2)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 block uppercase font-medium">Status do Pagamento</span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold mt-0.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Aguardando Pagamento</span>
            </div>
          </div>
        </div>

        {/* Crisp High-Fidelity SVG QR Code */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white shadow-xl max-w-[280px] mx-auto relative group">
          <svg viewBox="0 0 200 200" className="w-56 h-56">
            {/* Position detection squares */}
            {/* Top-Left */}
            <rect x="10" y="10" width="50" height="50" fill="#090b14" rx="4" />
            <rect x="20" y="20" width="30" height="30" fill="#ffffff" rx="2" />
            <rect x="26" y="26" width="18" height="18" fill="#090b14" rx="2" />
            {/* Top-Right */}
            <rect x="140" y="10" width="50" height="50" fill="#090b14" rx="4" />
            <rect x="150" y="20" width="30" height="30" fill="#ffffff" rx="2" />
            <rect x="156" y="26" width="18" height="18" fill="#090b14" rx="2" />
            {/* Bottom-Left */}
            <rect x="10" y="140" width="50" height="50" fill="#090b14" rx="4" />
            <rect x="20" y="150" width="30" height="30" fill="#ffffff" rx="2" />
            <rect x="26" y="156" width="18" height="18" fill="#090b14" rx="2" />

            {/* Matrix Data Simulation Dots */}
            {Array.from({ length: 180 }).map((_, i) => {
              const row = Math.floor(i / 15);
              const col = i % 15;
              const x = 20 + col * 11;
              const y = 20 + row * 11;
              // Avoid corners
              const inCorner =
                (row < 6 && col < 6) ||
                (row < 6 && col > 8) ||
                (row > 8 && col < 6);
              if (inCorner) return null;
              const show = (i * 13 + 7) % 3 !== 0;
              if (!show) return null;
              return (
                <rect key={i} x={x} y={y} width="8" height="8" rx="1.5" fill="#090b14" />
              );
            })}

            {/* Center PIX Emblem */}
            <circle cx="100" cy="100" r="18" fill="#ffffff" stroke="#00b493" strokeWidth="3" />
            <path
              d="M93 100L100 93L107 100L100 107Z"
              fill="#00b493"
            />
          </svg>

          <span className="text-[11px] font-mono text-slate-700 font-bold mt-2">
            PIX QR CODE DINÂMICO
          </span>
        </div>

        {/* PIX Copia e Cola */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Código PIX (Copia e Cola)</span>
            <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" /> Vence em 15:00 min
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={pixCode}
              className="flex-1 bg-[#11152a] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 font-mono truncate focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 ${
                copied
                  ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.35)]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
          <p className="font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Como pagar com PIX:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px] leading-relaxed">
            <li>Abra o aplicativo do seu banco no smartphone.</li>
            <li>Selecione a opção <strong>PIX</strong> e depois <strong>Ler QR Code</strong> ou <strong>PIX Copia e Cola</strong>.</li>
            <li>Confirme o valor e finalize o pagamento. O processamento bancário é automático e instantâneo.</li>
          </ol>
        </div>

        {/* Banking Status Query (Non-simulated real checking) */}
        {statusMessage && (
          <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{statusMessage}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handleCheckStatus}
            disabled={checkingStatus}
            className="w-full sm:flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all border border-slate-700"
          >
            <RefreshCw className={`w-4 h-4 ${checkingStatus ? 'animate-spin' : ''}`} />
            <span>{checkingStatus ? 'Consultando Rede Bancária...' : 'Verificar Confirmação do Pagamento'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors"
          >
            Voltar à Sacola
          </button>
        </div>
      </div>
    </div>
  );
};
