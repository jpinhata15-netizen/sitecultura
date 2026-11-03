import React, { useState } from 'react';
import {
  X,
  Award,
  Calendar,
  DollarSign,
  Globe,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Send,
  Building
} from 'lucide-react';
import { useCultural } from '../../context/CulturalContext';

interface OpportunityDetailModalProps {
  opportunityId: string;
  onClose: () => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunityId,
  onClose
}) => {
  const { opportunities, currentUser, showToast, openDetailModal } = useCultural();
  const opp = opportunities.find((o) => o.id === opportunityId);
  const [applied, setApplied] = useState(false);

  if (!opp) return null;

  const handleApply = () => {
    if (!currentUser) {
      showToast('Por favor, faça login ou cadastre-se para submeter sua inscrição!', 'warning');
      openDetailModal('auth');
      return;
    }
    setApplied(true);
    showToast('Inscrição prévia registrada no sistema da MOSAICO!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        role="dialog"
        aria-labelledby="opp-modal-title"
      >
        {/* Topo do Edital */}
        <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-[#1F4E38] p-6 text-white relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-stone-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {opp.type.replace('_', ' ')}
            </span>
            <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full">
              Abrangência: {opp.scope}
            </span>
          </div>

          <h2
            id="opp-modal-title"
            className="text-xl sm:text-2xl font-serif-culture font-bold leading-tight"
          >
            {opp.title}
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm flex items-center gap-1.5 mt-2">
            <Building className="w-4 h-4 text-amber-400" />
            {opp.organization}
          </p>
        </div>

        {/* Corpo do Edital */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Destaques: Prazo e Valor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Calendar className="w-4 h-4 text-amber-700" />
                Prazo Limite de Inscrição
              </span>
              <p className="text-base font-bold text-stone-900">
                {opp.deadline}
              </p>
              <p className="text-xs text-amber-800 mt-0.5">
                Status: Inscrições Abertas
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <DollarSign className="w-4 h-4 text-emerald-700" />
                Aporte Financeiro / Bolsa
              </span>
              <p className="text-base font-bold text-stone-900">
                {opp.budgetOrValue}
              </p>
              <p className="text-xs text-emerald-800 mt-0.5">
                Recursos para fomento e produção
              </p>
            </div>
          </div>

          {/* Descrição do Objeto */}
          <div>
            <h3 className="text-base font-serif-culture font-bold text-stone-900 mb-2">
              Objeto da Convocatória
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed">
              {opp.description}
            </p>
          </div>

          {/* Público Alvo */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
              Público-Alvo e Proponentes Elegíveis:
            </h4>
            <p className="text-sm font-semibold text-stone-900">
              {opp.targetAudience}
            </p>
          </div>

          {/* Requisitos */}
          {opp.requirements && opp.requirements.length > 0 && (
            <div>
              <h4 className="text-sm font-serif-culture font-bold text-stone-900 mb-2">
                Critérios e Documentos Necessários:
              </h4>
              <ul className="space-y-2">
                {opp.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1F4E38] flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ações de Inscrição */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <a
              href={opp.officialLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Acessar Diário Oficial / Plataforma Externa</span>
            </a>

            {applied ? (
              <div className="flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-2.5 rounded-xl text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Interesse Registrado no Portfólio</span>
              </div>
            ) : (
              <button
                onClick={handleApply}
                className="bg-[#B84A39] hover:bg-[#9E392A] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Inscrever Meu Perfil / Projeto</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
