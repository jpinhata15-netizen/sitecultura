import React, { useState } from 'react';
import {
  Users,
  BadgeCheck,
  MapPin,
  Award,
  Search,
  Filter,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';
import { BrazilianRegion } from '../types';

export const ArtistsView: React.FC = () => {
  const { artists, openDetailModal } = useCultural();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('todos');
  const [regionFilter, setRegionFilter] = useState<string>('todas');

  const filtered = artists.filter((art) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        art.name.toLowerCase().includes(q) ||
        art.artisticName.toLowerCase().includes(q) ||
        art.bio.toLowerCase().includes(q) ||
        art.city.toLowerCase().includes(q) ||
        art.categories.some((c) => c.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (roleFilter !== 'todos' && art.roleType !== roleFilter) return false;
    if (regionFilter !== 'todas' && art.region !== regionFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-stone-200">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F4E38]/10 text-[#1F4E38] text-xs font-bold">
            <Users className="w-3.5 h-3.5" />
            <span>Rede Nacional de Agentes Culturais</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-culture font-bold text-stone-900">
            Artistas, Mestres dos Saberes e Coletivos
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Valorizamos as trajetórias dos criadores independentes, dos mestres de tradição oral e dos coletivos periféricos que moldam a identidade estética brasileira.
          </p>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-grow">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por artista, mestre, coletivo ou técnica..."
            className="w-full text-sm pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:border-[#B84A39]"
          />
        </div>

        {/* Pílulas de Papel */}
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: 'todos', label: 'Todos os Perfis' },
            { id: 'mestre_tradicional', label: 'Mestres Tradicionais' },
            { id: 'individual', label: 'Artistas Individuais' },
            { id: 'coletivo', label: 'Coletivos Culturais' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setRoleFilter(item.id)}
              className={`px-3.5 py-2 rounded-xl font-medium transition ${
                roleFilter === item.id
                  ? 'bg-[#1F4E38] text-white font-bold shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Artistas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((art) => (
          <div
            key={art.id}
            onClick={() => openDetailModal('artist', art.id)}
            className="group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Capa e Avatar */}
            <div className="relative h-28 bg-stone-900">
              <img
                src={art.coverImage}
                alt={art.artisticName}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                <img
                  src={art.avatar}
                  alt={art.artisticName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md bg-stone-100"
                />
              </div>
            </div>

            <div className="pt-10 p-5 flex flex-col flex-grow text-center items-center">
              <div className="flex items-center gap-1.5 justify-center">
                <h3 className="font-serif-culture font-bold text-lg text-stone-900 group-hover:text-[#B84A39] transition line-clamp-1">
                  {art.artisticName}
                </h3>
                {art.verified && (
                  <BadgeCheck className="w-5 h-5 text-[#1F4E38] fill-emerald-100 flex-shrink-0" />
                )}
              </div>

              <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 mt-0.5">
                {art.roleType.replace('_', ' ')}
              </span>

              <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                {art.city}, {art.state} ({art.region})
              </p>

              <div className="flex flex-wrap justify-center gap-1 mt-2.5">
                {art.categories.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed flex-grow">
                {art.bio}
              </p>

              <div className="pt-4 mt-4 border-t border-stone-100 w-full flex items-center justify-between text-xs">
                <span className="text-stone-400">
                  {art.followersCount.toLocaleString('pt-BR')} conexões
                </span>
                <span className="font-bold text-[#B84A39] group-hover:underline flex items-center gap-1">
                  Conhecer <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
