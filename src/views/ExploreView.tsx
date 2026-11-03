import React, { useState } from 'react';
import {
  Compass,
  Filter,
  Search,
  MapPin,
  Calendar,
  Heart,
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';
import { CulturalCategory, BrazilianRegion } from '../types';

export const ExploreView: React.FC = () => {
  const { events, favorites, toggleFavoriteEvent, openDetailModal } = useCultural();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [selectedRegion, setSelectedRegion] = useState<string>('todas');
  const [selectedTicket, setSelectedTicket] = useState<string>('todos');

  const categories: CulturalCategory[] = [
    'Música',
    'Teatro',
    'Cinema',
    'Literatura',
    'Artes Visuais',
    'Dança',
    'Fotografia',
    'Cultura Popular',
    'Patrimônio Histórico',
    'Museus',
    'Gastronomia Cultural',
    'Artesanato',
    'Cultura Urbana',
    'Cultura Digital',
    'Festivais & Celebrações',
    'Cultura Tradicional e Regional'
  ];

  const regions: BrazilianRegion[] = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

  const filteredEvents = events.filter((evt) => {
    // Busca por texto
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText =
        evt.title.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.city.toLowerCase().includes(q) ||
        evt.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchText) return false;
    }

    // Filtro por Categoria
    if (selectedCategory !== 'todas' && evt.category !== selectedCategory) {
      return false;
    }

    // Filtro por Região
    if (selectedRegion !== 'todas' && evt.region !== selectedRegion) {
      return false;
    }

    // Filtro por Ingresso
    if (selectedTicket === 'gratis' && evt.ticketType !== 'gratuito') return false;
    if (selectedTicket === 'pago' && evt.ticketType === 'gratuito') return false;

    return true;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('todas');
    setSelectedRegion('todas');
    setSelectedTicket('todos');
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Cabeçalho da Seção */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-stone-200">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B84A39]/10 text-[#B84A39] text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>Explorador Cultural do Brasil</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-culture font-bold text-stone-900 leading-tight">
            Descubra as manifestações que pulsam em cada canto do país
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Utilize os filtros multifacetados por linguagem artística, macrorregião geográfica e gratuidade para planejar sua jornada cultural.
          </p>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        {/* Campo de Busca Rápida */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por nome, cidade ou tema..."
              className="w-full text-sm pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:border-[#B84A39]"
            />
          </div>

          {(searchQuery || selectedCategory !== 'todas' || selectedRegion !== 'todas' || selectedTicket !== 'todos') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-2xl transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar Filtros</span>
            </button>
          )}
        </div>

        {/* Filtros em Pílulas */}
        <div className="space-y-4 pt-2 border-t border-stone-100">
          {/* Regiões */}
          <div>
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-2">
              Região Geográfica:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRegion('todas')}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition ${
                  selectedRegion === 'todas'
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Todas as Regiões
              </button>
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition ${
                    selectedRegion === reg
                      ? 'bg-[#B84A39] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* Categorias */}
          <div>
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-2">
              Linguagem Artística & Categoria Cultural:
            </span>
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('todas')}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                  selectedCategory === 'todas'
                    ? 'bg-[#B84A39] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Todas as Categorias
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-[#B84A39] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gratuidade */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Ingresso:
            </span>
            <div className="flex gap-2">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'gratis', label: 'Somente Gratuitos' },
                { id: 'pago', label: 'Com Ingressos / Colaborativo' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedTicket(opt.id)}
                  className={`text-xs px-3 py-1 rounded-lg font-medium transition ${
                    selectedTicket === opt.id
                      ? 'bg-[#1F4E38] text-white font-bold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contagem de Resultados */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
        <span>Exibindo {filteredEvents.length} manifestações culturais encontradas</span>
        <span>Atualizado em tempo real</span>
      </div>

      {/* Grade de Resultados */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl border border-stone-200 text-center space-y-4">
          <Compass className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-serif-culture font-bold text-stone-800">
            Nenhuma manifestação encontrada para os critérios selecionados
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Experimente remover alguns filtros ou buscar por termos mais abrangentes.
          </p>
          <button
            onClick={handleResetFilters}
            className="bg-[#B84A39] text-white px-5 py-2 rounded-xl text-xs font-bold transition shadow-sm"
          >
            Redefinir Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={evt.coverImage}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#B84A39] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {evt.category}
                </span>
                <button
                  onClick={() => toggleFavoriteEvent(evt.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition ${
                    favorites.includes(evt.id)
                      ? 'bg-[#B84A39] text-white'
                      : 'bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm'
                  }`}
                  aria-label="Favoritar"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(evt.id) ? 'fill-white' : ''}`} />
                </button>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#B84A39]" />
                    {evt.startDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                    {evt.city}, {evt.state}
                  </span>
                </div>

                <h3
                  onClick={() => openDetailModal('event', evt.id)}
                  className="font-serif-culture font-bold text-lg text-stone-900 group-hover:text-[#B84A39] transition cursor-pointer line-clamp-2 leading-snug"
                >
                  {evt.title}
                </h3>

                <p className="text-xs text-stone-600 mt-2 line-clamp-2 flex-grow leading-relaxed">
                  {evt.description}
                </p>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800">
                    {evt.ticketType === 'gratuito' ? 'Entrada Gratuita' : evt.ticketType}
                  </span>
                  <button
                    onClick={() => openDetailModal('event', evt.id)}
                    className="text-[#B84A39] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Ver Detalhes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
