import React, { useState } from 'react';
import {
  Landmark,
  MapPin,
  Clock,
  Ticket,
  Search,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';

export const SpacesView: React.FC = () => {
  const { spaces, openDetailModal } = useCultural();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('todos');

  const filtered = spaces.filter((spc) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        spc.name.toLowerCase().includes(q) ||
        spc.city.toLowerCase().includes(q) ||
        spc.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (typeFilter !== 'todos' && spc.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-stone-200">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706]/10 text-[#D97706] text-xs font-bold">
            <Landmark className="w-3.5 h-3.5" />
            <span>Guia Nacional de Espaços e Patrimônio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-culture font-bold text-stone-900">
            Museus, Teatros e Territórios de Memória
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Consulte horários de visitação, taxas de admissão, acessibilidade universal e acervos dos templos da arquitetura e das artes no Brasil.
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
            placeholder="Buscar por museu, teatro, cidade ou monumento..."
            className="w-full text-sm pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:border-[#B84A39]"
          />
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: 'todos', label: 'Todos os Espaços' },
            { id: 'museu', label: 'Museus & Galerias' },
            { id: 'teatro', label: 'Teatros Históricos' },
            { id: 'centro_cultural', label: 'Centros Culturais' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTypeFilter(item.id)}
              className={`px-3.5 py-2 rounded-xl font-medium transition ${
                typeFilter === item.id
                  ? 'bg-[#1F4E38] text-white font-bold shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Espaços */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((space) => (
          <div
            key={space.id}
            onClick={() => openDetailModal('space', space.id)}
            className="group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col sm:flex-row"
          >
            <div className="sm:w-2/5 relative h-52 sm:h-auto overflow-hidden flex-shrink-0">
              <img
                src={space.coverImage}
                alt={space.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#1F4E38] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                {space.type}
              </span>
            </div>

            <div className="p-6 flex flex-col justify-between flex-grow space-y-3">
              <div>
                <p className="text-xs text-stone-500 flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                  {space.city}, {space.state} ({space.region})
                </p>

                <h3 className="font-serif-culture font-bold text-lg text-stone-900 group-hover:text-[#B84A39] transition leading-snug">
                  {space.name}
                </h3>

                <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                  {space.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-800">
                  {space.admissionFee}
                </span>
                <span className="font-bold text-[#B84A39] group-hover:underline flex items-center gap-1">
                  Informações de Visita <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
