import React from 'react';
import {
  Layers,
  MapPin,
  CheckCircle2,
  Users,
  DollarSign,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';

export const ProjectsView: React.FC = () => {
  const { projects, openDetailModal } = useCultural();

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-stone-200">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B84A39]/10 text-[#B84A39] text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>Fomento & Transformação Social</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-culture font-bold text-stone-900">
            Projetos Culturais & Impacto Comunitário
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Conheça as ações apoiadas por leis de incentivo, editais públicos e mobilizações da sociedade civil que transformam territórios vulneráveis em polos de criação artística.
          </p>
        </div>
      </div>

      {/* Lista de Projetos com Relatórios de Impacto */}
      <div className="space-y-8">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden">
              <img
                src={proj.coverImage}
                alt={proj.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-black/75 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                {proj.culturalArea}
              </span>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-md uppercase">
                    Status: {proj.status.replace('_', ' ')}
                  </span>
                  <span className="text-stone-500">•</span>
                  <span className="text-stone-500 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                    {proj.location} ({proj.state})
                  </span>
                </div>

                <h3 className="text-2xl font-serif-culture font-bold text-stone-900 leading-tight">
                  {proj.title}
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm italic">
                  {proj.subtitle}
                </p>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                  {proj.description}
                </p>

                {/* Objetivos */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                    Metas e Entregas Culturais:
                  </h4>
                  <ul className="space-y-1.5">
                    {proj.objectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Caixa de Impacto e Recursos */}
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-stone-200/90 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-stone-400 font-medium block">Fonte de Financiamento:</span>
                  <span className="font-bold text-stone-900">{proj.fundingSource || 'Independente'}</span>
                </div>
                {proj.budget && (
                  <div>
                    <span className="text-stone-400 font-medium block">Orçamento Investido:</span>
                    <span className="font-bold text-[#1F4E38]">{proj.budget}</span>
                  </div>
                )}
                {proj.beneficiariesCount && (
                  <div>
                    <span className="text-stone-400 font-medium block">Pessoas Alcançadas:</span>
                    <span className="font-bold text-[#B84A39]">
                      +{proj.beneficiariesCount} beneficiários
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
