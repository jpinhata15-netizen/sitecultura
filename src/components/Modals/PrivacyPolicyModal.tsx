import React from 'react';
import { X, ShieldCheck, Download, Trash2, CheckCircle2 } from 'lucide-react';
import { useCultural } from '../../context/CulturalContext';

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {
  const { showToast, currentUser } = useCultural();

  const handleExportData = () => {
    const backup = {
      user: currentUser,
      exportDate: new Date().toISOString(),
      platform: 'MOSAICO — Plataforma Digital da Cultura Brasileira',
      privacyStatement: 'Conforme Art. 18 da Lei Federal nº 13.709/2018 (LGPD)'
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mosaico_dados_titular_${Date.now()}.json`;
    a.click();
    showToast('Cópia dos seus dados gerada e descarregada em formato JSON.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        role="dialog"
        aria-labelledby="privacy-modal-title"
      >
        <div className="bg-[#1C1917] p-6 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h2 id="privacy-modal-title" className="text-xl sm:text-2xl font-serif-culture font-bold">
              Transparência & Governança LGPD
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-stone-700 text-sm leading-relaxed flex-grow">
          <div>
            <h3 className="text-base font-serif-culture font-bold text-stone-900 mb-2">
              1. Princípio da Salvaguarda Pública dos Dados
            </h3>
            <p>
              A plataforma <strong>MOSAICO</strong> opera sob estrita obediência à Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018). Os dados cadastrais de artistas, produtores culturais e cidadãos são utilizados unicamente para:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs sm:text-sm text-stone-600">
              <li>Mapeamento geográfico de manifestações culturais e patrimônio;</li>
              <li>Acesso a editais de fomento e chamadas públicas da cultura;</li>
              <li>Aferição estatística para formulação de políticas públicas do setor;</li>
              <li>Comunicação institucional sobre programações e eventos de interesse.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-serif-culture font-bold text-stone-900 mb-2">
              2. Direitos do Titular (Art. 18 da LGPD)
            </h3>
            <p>
              A qualquer momento, o titular tem direito de solicitar a confirmação da existência de tratamento, o acesso aos dados, a correção de dados incompletos ou a revogação de seu consentimento.
            </p>
          </div>

          {/* Ferramentas de Autonomia do Usuário */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Painel de Autonomia do Titular:
            </h4>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleExportData}
                className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Exportar Meus Dados (JSON)</span>
              </button>
              <button
                onClick={() => showToast('Solicitação de exclusão encaminhada ao DPO.', 'info')}
                className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2 rounded-xl text-xs font-bold transition"
              >
                <Trash2 className="w-4 h-4" />
                <span>Solicitar Anonimização Total</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#B84A39] hover:bg-[#9E392A] text-white px-5 py-2 rounded-xl text-xs font-bold transition"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
