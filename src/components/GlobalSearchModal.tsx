import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Calendar,
  Users,
  Landmark,
  Layers,
  BookOpen,
  Award,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';

interface GlobalSearchModalProps {
  setActiveTab: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ setActiveTab }) => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    events,
    artists,
    spaces,
    projects,
    articles,
    opportunities,
    openDetailModal
  } = useCultural();

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('todos');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on open and keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Results calculation
  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(q) ||
    e.city.toLowerCase().includes(q) ||
    e.category.toLowerCase().includes(q) ||
    e.tags.some((t) => t.toLowerCase().includes(q))
  );

  const filteredArtists = artists.filter((a) =>
    a.name.toLowerCase().includes(q) ||
    a.artisticName.toLowerCase().includes(q) ||
    a.city.toLowerCase().includes(q) ||
    a.categories.some((c) => c.toLowerCase().includes(q))
  );

  const filteredSpaces = spaces.filter((s) =>
    s.name.toLowerCase().includes(q) ||
    s.city.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q)
  );

  const filteredOpportunities = opportunities.filter((o) =>
    o.title.toLowerCase().includes(q) ||
    o.organization.toLowerCase().includes(q) ||
    o.type.toLowerCase().includes(q)
  );

  const filteredArticles = articles.filter((ar) =>
    ar.title.toLowerCase().includes(q) ||
    ar.tags.some((t) => t.toLowerCase().includes(q))
  );

  const handleSelect = (type: 'event' | 'artist' | 'space' | 'opportunity' | 'article', id: string) => {
    setIsSearchOpen(false);
    openDetailModal(type, id);
  };

  const totalResults =
    filteredEvents.length +
    filteredArtists.length +
    filteredSpaces.length +
    filteredOpportunities.length +
    filteredArticles.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Pesquisa global cultural"
      >
        {/* Campo de Busca */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3 bg-white">
          <Search className="w-6 h-6 text-[#B84A39] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquise por manifestações culturais, artistas, cidades, editais ou museus..."
            className="w-full text-base sm:text-lg bg-transparent border-none text-stone-900 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition"
              aria-label="Limpar termo digitado"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-semibold text-stone-500 hover:text-stone-800 bg-stone-100 rounded-lg transition"
          >
            ESC
          </button>
        </div>

        {/* Filtros por Tipo de Conteúdo */}
        <div className="px-5 py-2.5 border-b border-stone-200 bg-stone-50 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-400 font-medium">Filtrar:</span>
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'eventos', label: `Eventos (${filteredEvents.length})` },
            { id: 'artistas', label: `Artistas (${filteredArtists.length})` },
            { id: 'espacos', label: `Espaços (${filteredSpaces.length})` },
            { id: 'editais', label: `Editais (${filteredOpportunities.length})` },
            { id: 'artigos', label: `Artigos (${filteredArticles.length})` }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition ${
                filterType === f.id
                  ? 'bg-[#B84A39] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Lista de Resultados */}
        <div className="overflow-y-auto p-5 space-y-6">
          {totalResults === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="text-stone-600 font-medium">
                Nenhum resultado cultural encontrado para "{query}".
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Tente buscar por "Maracatu", "Parintins", "Belém", "Dança", "Inhotim" ou "Edital".
              </p>
            </div>
          ) : (
            <>
              {/* Eventos */}
              {(filterType === 'todos' || filterType === 'eventos') && filteredEvents.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B84A39]" />
                      Eventos e Festejos
                    </span>
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setActiveTab('agenda');
                      }}
                      className="text-xs text-[#B84A39] hover:underline flex items-center gap-0.5"
                    >
                      Ver todos na agenda <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {filteredEvents.map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => handleSelect('event', evt.id)}
                        className="flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-stone-100/80 cursor-pointer border border-transparent hover:border-stone-200 transition"
                      >
                        <img
                          src={evt.coverImage}
                          alt={evt.title}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 className="text-sm font-bold text-stone-900 truncate">
                            {evt.title}
                          </h4>
                          <p className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#D97706]" />
                              {evt.city}, {evt.state}
                            </span>
                            <span>•</span>
                            <span className="text-[#B84A39] font-medium">{evt.category}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Artistas */}
              {(filterType === 'todos' || filterType === 'artistas') && filteredArtists.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#1F4E38]" />
                      Artistas, Mestres e Coletivos
                    </span>
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setActiveTab('artists');
                      }}
                      className="text-xs text-[#1F4E38] hover:underline flex items-center gap-0.5"
                    >
                      Ver todos os artistas <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {filteredArtists.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => handleSelect('artist', art.id)}
                        className="flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-stone-100/80 cursor-pointer border border-transparent hover:border-stone-200 transition"
                      >
                        <img
                          src={art.avatar}
                          alt={art.artisticName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-stone-200"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 className="text-sm font-bold text-stone-900 truncate">
                            {art.artisticName}
                          </h4>
                          <p className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                            <span>{art.city}, {art.state}</span>
                            <span>•</span>
                            <span className="text-stone-600">{art.categories.join(', ')}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Espaços Culturais */}
              {(filterType === 'todos' || filterType === 'espacos') && filteredSpaces.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-[#D97706]" />
                      Espaços Culturais e Museus
                    </span>
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setActiveTab('spaces');
                      }}
                      className="text-xs text-[#D97706] hover:underline flex items-center gap-0.5"
                    >
                      Ver todos os espaços <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {filteredSpaces.map((spc) => (
                      <div
                        key={spc.id}
                        onClick={() => handleSelect('space', spc.id)}
                        className="flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-stone-100/80 cursor-pointer border border-transparent hover:border-stone-200 transition"
                      >
                        <img
                          src={spc.coverImage}
                          alt={spc.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 className="text-sm font-bold text-stone-900 truncate">
                            {spc.name}
                          </h4>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {spc.city}, {spc.state} • {spc.admissionFee}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Editais e Oportunidades */}
              {(filterType === 'todos' || filterType === 'editais') && filteredOpportunities.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      Editais e Chamadas de Fomento
                    </span>
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setActiveTab('opportunities');
                      }}
                      className="text-xs text-amber-600 hover:underline flex items-center gap-0.5"
                    >
                      Ver todos os editais <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {filteredOpportunities.map((opp) => (
                      <div
                        key={opp.id}
                        onClick={() => handleSelect('opportunity', opp.id)}
                        className="p-3 rounded-2xl hover:bg-stone-100/80 cursor-pointer border border-stone-200 bg-white transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                            Prazo: {opp.deadline}
                          </span>
                          <span className="text-xs text-stone-500 font-medium">
                            {opp.budgetOrValue}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-900 mt-1">
                          {opp.title}
                        </h4>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {opp.organization}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
          <span className="flex items-center gap-1">
            Dica: use <kbd className="bg-white px-1.5 py-0.5 rounded border border-stone-300 font-mono text-[10px]">↑</kbd> <kbd className="bg-white px-1.5 py-0.5 rounded border border-stone-300 font-mono text-[10px]">↓</kbd> para navegar
          </span>
          <span>{totalResults} resultados encontrados</span>
        </div>
      </div>
    </div>
  );
};
