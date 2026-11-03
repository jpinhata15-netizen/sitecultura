import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Compass,
  MapPin,
  Users,
  Landmark,
  ArrowRight,
  Heart,
  Award,
  BookOpen,
  Volume2,
  Clock,
  Ticket,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';
import { CulturalCategory, BrazilianRegion } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const {
    events,
    artists,
    spaces,
    articles,
    opportunities,
    collections,
    favorites,
    toggleFavoriteEvent,
    openDetailModal,
    setIsSearchOpen
  } = useCultural();

  const [heroIndex, setHeroIndex] = useState(0);
  const featuredEvents = events.filter((e) => e.featured);

  const categories: { name: CulturalCategory; icon: string; count: number }[] = [
    { name: 'Música', icon: '🎵', count: 42 },
    { name: 'Cultura Popular', icon: '🪘', count: 58 },
    { name: 'Teatro', icon: '🎭', count: 31 },
    { name: 'Festivais & Celebrações', icon: '🎉', count: 24 },
    { name: 'Artes Visuais', icon: '🎨', count: 39 },
    { name: 'Patrimônio Histórico', icon: '🏛️', count: 47 },
    { name: 'Cinema', icon: '🎬', count: 28 },
    { name: 'Literatura', icon: '📜', count: 35 },
    { name: 'Dança', icon: '🩰', count: 22 },
    { name: 'Gastronomia Cultural', icon: '🍲', count: 19 },
    { name: 'Artesanato', icon: '🏺', count: 33 },
    { name: 'Cultura Tradicional e Regional', icon: '🪶', count: 41 },
    { name: 'Cultura Urbana', icon: '🛹', count: 26 },
    { name: 'Museus', icon: '🖼️', count: 52 },
    { name: 'Fotografia', icon: '📷', count: 18 },
    { name: 'Cultura Digital', icon: '💻', count: 15 }
  ];

  const currentHero = featuredEvents[heroIndex] || events[0];

  const handleNextHero = () => {
    setHeroIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  const handlePrevHero = () => {
    setHeroIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO EDITORIAL COM SLIDER DE MANIFESTAÇÕES */}
      <section className="relative overflow-hidden rounded-3xl bg-stone-950 text-white border border-stone-800 shadow-2xl">
        <div className="relative min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] flex flex-col justify-end p-6 sm:p-10 lg:p-16">
          {/* Imagem de Fundo com Transição Suave */}
          <img
            key={currentHero.id}
            src={currentHero.coverImage}
            alt={currentHero.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60 transform scale-105 transition-all duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141216] via-[#141216]/50 to-black/30" />

          {/* Conteúdo do Destaque */}
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-[#B84A39] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {currentHero.category}
              </span>
              <span className="bg-black/60 text-stone-200 text-xs px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                Região {currentHero.region} • {currentHero.city}/{currentHero.state}
              </span>
              <span className="bg-amber-400 text-stone-950 text-xs font-extrabold px-2.5 py-0.5 rounded-md">
                Destaque Nacional
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-culture font-extrabold text-white leading-tight">
              {currentHero.title}
            </h1>

            {currentHero.subtitle && (
              <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                {currentHero.subtitle}
              </p>
            )}

            {/* Metadados Práticos */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-300 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#D97706]" />
                {currentHero.startDate} {currentHero.endDate ? `a ${currentHero.endDate}` : ''}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                {currentHero.venueName}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">
                {currentHero.ticketType === 'gratuito' ? 'Entrada Franca' : currentHero.ticketType}
              </span>
            </div>

            {/* Botões de Ação */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openDetailModal('event', currentHero.id)}
                className="bg-[#B84A39] hover:bg-[#9E392A] text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-[#B84A39]/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Explorar Esta Manifestação</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleFavoriteEvent(currentHero.id)}
                className={`p-3 rounded-2xl border transition ${
                  favorites.includes(currentHero.id)
                    ? 'bg-[#B84A39] border-[#B84A39] text-white'
                    : 'bg-black/40 hover:bg-black/60 border-white/20 text-white backdrop-blur-md'
                }`}
                aria-label="Salvar nos favoritos"
              >
                <Heart className={`w-5 h-5 ${favorites.includes(currentHero.id) ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Navegação de Slides */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
            <button
              onClick={handlePrevHero}
              className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 transition"
              aria-label="Manifestação anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-stone-300 font-mono px-2">
              0{heroIndex + 1} / 0{featuredEvents.length}
            </span>
            <button
              onClick={handleNextHero}
              className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 transition"
              aria-label="Próxima manifestação"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. BARRA DE BUSCA GLOBAL RÁPIDA & DESCOBERTA */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold text-[#B84A39] uppercase tracking-wider block mb-1">
              Descoberta Cultural Ativa
            </span>
            <h2 className="text-2xl font-serif-culture font-bold text-stone-900 leading-snug">
              O que você deseja vivenciar na cultura brasileira hoje?
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex-grow flex items-center justify-between bg-stone-100 hover:bg-stone-200/70 text-stone-500 px-5 py-3.5 rounded-2xl text-sm border border-stone-200 transition text-left"
            >
              <span className="flex items-center gap-3">
                <Search className="w-5 h-5 text-[#B84A39]" />
                <span>Busque por cidade, ritmo, festival, mestre ou museu...</span>
              </span>
              <kbd className="hidden sm:inline bg-white px-2 py-1 rounded text-xs font-mono text-stone-400 border border-stone-200">
                Ctrl + K
              </kbd>
            </button>

            <button
              onClick={() => setActiveTab('explore')}
              className="bg-[#1F4E38] hover:bg-[#173D2C] text-white px-5 py-3.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Filter className="w-4 h-4" />
              <span>Filtros Avançados</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. LINGUAGENS & CATEGORIAS CULTURAIS */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider block mb-1">
              Territórios de Expressão
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-culture font-bold text-stone-900">
              Navegue pelas Linguagens Culturais
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="text-xs font-bold text-[#B84A39] hover:underline flex items-center gap-1"
          >
            Ver todas as categorias <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab('explore')}
              className="group p-4 bg-white hover:bg-[#FAF8F5] border border-stone-200/90 hover:border-[#B84A39] rounded-2xl text-center transition-all duration-300 transform hover:-translate-y-1 shadow-xs"
            >
              <span className="text-2xl block mb-1.5 group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-xs font-bold text-stone-900 group-hover:text-[#B84A39] block truncate">
                {cat.name}
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5 block">
                {cat.count} manifestações
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. RADAR DA SEMANA (AGENDA EM DESTAQUE) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-[#B84A39] uppercase tracking-wider block mb-1">
              Em Cartaz & Festejos
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-culture font-bold text-stone-900">
              Agenda Cultural em Evidência
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('agenda')}
            className="text-xs font-bold text-[#B84A39] hover:underline flex items-center gap-1"
          >
            Ver programação completa <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((evt) => (
            <div
              key={evt.id}
              className="group bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={evt.coverImage}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#B84A39] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {evt.category}
                </div>
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
                    {evt.city}/{evt.state}
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
                    <span>Detalhes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. VOZES & MESTRES EM EVIDÊNCIA (ARTISTAS) */}
      <section className="bg-gradient-to-br from-[#1F4E38]/10 via-stone-50 to-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-stone-200">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#1F4E38] uppercase tracking-wider block mb-1">
              Guardiões dos Saberes & Criadores
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-culture font-bold text-stone-900">
              Artistas e Agentes Culturais em Destaque
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('artists')}
            className="text-xs font-bold text-[#1F4E38] hover:underline flex items-center gap-1"
          >
            Ver todos os agentes <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.map((art) => (
            <div
              key={art.id}
              onClick={() => openDetailModal('artist', art.id)}
              className="group bg-white p-5 rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer text-center flex flex-col items-center"
            >
              <div className="relative mb-3">
                <img
                  src={art.avatar}
                  alt={art.artisticName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-stone-100 group-hover:border-[#1F4E38] transition"
                />
                {art.verified && (
                  <span className="absolute bottom-0 right-0 bg-[#1F4E38] text-white p-1 rounded-full shadow">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <h4 className="font-serif-culture font-bold text-base text-stone-900 group-hover:text-[#1F4E38] transition line-clamp-1">
                {art.artisticName}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                {art.city}, {art.state} ({art.region})
              </p>

              <div className="flex flex-wrap justify-center gap-1 mt-2.5">
                {art.categories.slice(0, 2).map((cat) => (
                  <span
                    key={cat}
                    className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full font-medium"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed">
                {art.bio}
              </p>

              <span className="mt-4 text-xs font-bold text-[#1F4E38] group-hover:underline flex items-center gap-1">
                Ver Portfólio <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BANNER DO MAPA CULTURAL DO BRASIL */}
      <section className="bg-gradient-to-r from-[#B84A39] via-stone-900 to-[#1F4E38] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>Georreferenciamento Cultural</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-culture font-bold leading-tight">
            Explore o Mapa Cultural Interativo das Cinco Regiões
          </h2>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
            Localize museus, teatros neoclássicos, festejos populares e pontos de patrimônio material e imaterial perto de você com coordenadas em tempo real.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('map')}
              className="bg-white hover:bg-stone-100 text-stone-900 px-6 py-3 rounded-2xl text-xs font-bold shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Abrir Mapa do Brasil</span>
              <ArrowRight className="w-4 h-4 text-[#B84A39]" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. RADAR DE EDITAIS & OPORTUNIDADES URGENTES */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
              Fomento & Convocatórias
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-culture font-bold text-stone-900">
              Oportunidades e Editais Abertos
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('opportunities')}
            className="text-xs font-bold text-[#B84A39] hover:underline flex items-center gap-1"
          >
            Ver todos os editais <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              onClick={() => openDetailModal('opportunity', opp.id)}
              className="group bg-white p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-amber-50 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">
                    {opp.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    Prazo: {opp.deadline}
                  </span>
                </div>

                <h3 className="font-serif-culture font-bold text-base text-stone-900 group-hover:text-[#B84A39] transition leading-snug">
                  {opp.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1">{opp.organization}</p>
                <p className="text-xs text-stone-600 mt-3 line-clamp-3 leading-relaxed">
                  {opp.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">{opp.budgetOrValue}</span>
                <span className="text-[#B84A39] font-bold group-hover:underline flex items-center gap-1">
                  Inscrições <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. JORNALISMO & ENSAIOS EDITORIAIS */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Crítica & Memória Viva
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-culture font-bold text-stone-900">
              Reportagens e Ensaios Culturais
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('editorial')}
            className="text-xs font-bold text-[#B84A39] hover:underline flex items-center gap-1"
          >
            Acessar Caderno Editorial <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              onClick={() => setActiveTab('editorial')}
              className="group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                  {art.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                  <span>Por {art.author.name}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="font-serif-culture font-bold text-xl text-stone-900 group-hover:text-[#B84A39] transition leading-snug">
                  {art.title}
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm mt-3 line-clamp-3 leading-relaxed flex-grow">
                  {art.excerpt}
                </p>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-medium">
                    Publicado em {new Date(art.publishedAt).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="text-[#B84A39] font-bold group-hover:underline flex items-center gap-1">
                    Ler Ensaio Completo <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
