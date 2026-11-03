import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Settings2 } from 'lucide-react';
import { useCultural } from '../context/CulturalContext';

export const LGPDConsentBanner: React.FC = () => {
  const { openDetailModal } = useCultural();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mosaico_lgpd_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('mosaico_lgpd_consent', 'accepted_all');
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('mosaico_lgpd_consent', 'essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-8 md:max-w-xl z-50 bg-[#1C1917] text-stone-200 p-5 rounded-3xl shadow-2xl border border-stone-700/80 animate-slideUp backdrop-blur-md"
      role="region"
      aria-label="Consentimento de Privacidade e Cookies LGPD"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 rounded-2xl bg-[#B84A39]/20 text-[#B84A39] flex-shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <div className="flex-grow space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-serif-culture font-bold text-white text-base">
              Privacidade & Transparência Cultural
            </h4>
            <button
              onClick={() => setVisible(false)}
              className="text-stone-400 hover:text-white p-1"
              aria-label="Fechar banner de cookies"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            Utilizamos cookies e dados de navegação estritamente para personalizar sua experiência cultural, calcular métricas de público para editais e garantir a acessibilidade digital, em conformidade com a <strong>LGPD (Lei nº 13.709/2018)</strong>. Seus dados nunca serão comercializados.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={handleAcceptAll}
              className="bg-[#B84A39] hover:bg-[#9E392A] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm"
            >
              Aceitar e Continuar
            </button>
            <button
              onClick={handleEssentialOnly}
              className="bg-stone-800 hover:bg-stone-700 text-stone-300 px-3 py-1.5 rounded-xl text-xs font-medium transition"
            >
              Apenas Essenciais
            </button>
            <button
              onClick={() => openDetailModal('privacy')}
              className="text-amber-400 hover:underline text-xs font-medium inline-flex items-center gap-1 ml-auto"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Ver Política Completa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
