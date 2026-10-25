import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, QrCode } from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToPix: () => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToPix,
  onExplore,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-[#0d1022] border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-400" />
              <h2 className="text-base font-bold text-white">Sua Sacola de Compras</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 font-mono">
                {cart.reduce((a, b) => a + b.quantity, 0)} itens
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white">Sua sacola está vazia</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Navegue pelas vitrines oficiais das marcas e adicione produtos exclusivos.
                </p>
                <button
                  onClick={() => { onClose(); onExplore(); }}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md transition-all"
                >
                  Explorar Vitrines
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl bg-[#11152a] border border-slate-800 flex items-center gap-3.5"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-900 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-purple-400 uppercase font-semibold block truncate">
                      {item.product.storeName}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs font-mono font-bold text-emerald-400 tabular-nums mt-0.5">
                      R$ {item.product.price.toFixed(2)}
                    </p>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors ml-auto"
                        title="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-[#090b14] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Frete para todo o Brasil</span>
                  <span className="text-emerald-400 font-semibold uppercase">Grátis</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-slate-800/80">
                  <span>Total a Pagar</span>
                  <span className="font-mono text-emerald-400 tabular-nums text-base">
                    R$ {subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToPix}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:brightness-110 text-white font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 transition-all"
              >
                <QrCode className="w-4 h-4 text-emerald-200" />
                <span>Pagar com PIX Instantâneo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
