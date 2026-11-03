import React, { useState } from 'react';
import {
  Award,
  Calendar,
  DollarSign,
  Building,
  Search,
  ExternalLink,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';

export const OpportunitiesView: React.FC = () => {
  const { opportunities, openDetailModal } = useCultural();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('todos');

  const filtered = opportunities.filter((opp) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        opp.title.toLowerCase().includes(q) ||
        opp.organization.toLowerCase().includes(q) ||
        opp.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (typeFilter !== 'todos' && opp.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-stone-200">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-900 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>Painel Nacional de Financiamento & Convocatórias</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-culture font-bold text-stone-900">
            Editais, Bolsas, Leis de Incentivo e Residências
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Centralizamos as principais oportunidades abertas por secretarias estaduais, órgãos federais, fundações e institutos internacionais para financiar sua produção artística.
          </p>
        </div>
      </div>

      {/* Busca e Filtros */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-grow">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por edital, lei, instituição ou tema..."
            className="w-full text-sm pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:border-[#B84A39]"
          />
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: 'todos', label: 'Todas as Modalidades' },
            { id: 'edital', label: 'Editais Públicos' },
            { id: 'residencia', label: 'Residências Artísticas' },
            { id: 'chamada_publica', label: 'Chamadas de Circulação' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTypeFilter(item.id)}
              className={`px-3.5 py-2 rounded-xl font-medium transition ${
                typeFilter === item.id
                  ? 'bg-amber-800 text-white font-bold shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Oportunidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((opp) => (
          <div
            key={opp.id}
            onClick={() => openDetailModal('opportunity', opp.id)}
            className="group bg-white p-6 rounded-3xl border border-stone-200 hover:border-amber-600 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-amber-50 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">
                  {opp.type.replace('_', ' ')}
                </span>
                <span className="bg-stone-100 text-stone-600 text-[11px] font-medium px-2 py-0.5 rounded">
                  {opp.scope}
                </span>
              </div>

              <h3 className="font-serif-culture font-bold text-lg text-stone-900 group-hover:text-amber-800 transition leading-snug">
                {opp.title}
              </h3>

              <p className="text-xs text-stone-500 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-stone-400" />
                {opp.organization}
              </p>

              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                {opp.description}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-stone-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Prazo:</span>
                  <span className="font-bold text-stone-900 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    {opp.deadline}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Aporte:</span>
                  <span className="font-bold text-emerald-800">{opp.budgetOrValue}</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openDetailModal('opportunity', opp.id);
                }}
                className="w-full bg-[#FAF8F5] group-hover:bg-[#B84A39] group-hover:text-white text-stone-800 border border-stone-200 group-hover:border-transparent py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>Ver Requisitos & Inscrição</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
