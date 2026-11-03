import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useCultural } from '../context/CulturalContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCultural();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border text-sm transition-all duration-300 animate-slideUp ${
              isSuccess
                ? 'bg-emerald-950/95 border-emerald-500/50 text-emerald-100'
                : isWarning
                ? 'bg-amber-950/95 border-amber-500/50 text-amber-100'
                : 'bg-stone-900/95 border-stone-700 text-stone-100'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />}
            {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />}
            {!isSuccess && !isWarning && <Info className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />}

            <p className="flex-grow font-medium leading-snug">{toast.message}</p>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white p-1 -mr-1 -mt-1 transition"
              aria-label="Dispensar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
