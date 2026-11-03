import React from 'react';
import { MapPin, Compass, Landmark, Calendar, Sparkles } from 'lucide-react';
import { InteractiveMap } from '../components/InteractiveMap';
import { useCultural } from '../context/CulturalContext';

export const MapView: React.FC = () => {
  const { events, spaces, openDetailModal } = useCultural();

  return (
    <div className="space-y-8 pb-16">
      {/* Cabeçalho */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-stone-200">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F4E38]/10 text-[#1F4E38] text-xs font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Cartografia Cultural Brasileira</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-culture font-bold text-stone-900">
            Mapa Interativo da Cultura Nacional
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Navegue pelas cinco regiões do Brasil e localize pontos de salvaguarda, grandes teatros, museus, festejos de rua e centros históricos. Clique nos pontos para ver programações e horários de funcionamento.
          </p>
        </div>
      </div>

      {/* Componente Leaflet do Mapa */}
      <InteractiveMap />

      {/* Espaços e Pontos Georreferenciados em Destaque */}
      <div className="space-y-4 pt-4">
        <h3 className="font-serif-culture font-bold text-2xl text-stone-900">
          Pontos e Territórios Culturais Georreferenciados
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {spaces.map((spc) => (
            <div
              key={spc.id}
              onClick={() => openDetailModal('space', spc.id)}
              className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-[#1F4E38] shadow-sm cursor-pointer transition flex items-center gap-3.5 group"
            >
              <img
                src={spc.coverImage}
                alt={spc.name}
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#1F4E38] tracking-wider block">
                  {spc.type}
                </span>
                <h4 className="font-bold text-sm text-stone-900 truncate group-hover:text-[#1F4E38] transition">
                  {spc.name}
                </h4>
                <p className="text-xs text-stone-500 truncate">
                  {spc.city}, {spc.state}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
