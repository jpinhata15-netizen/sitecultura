import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  List,
  Clock,
  MapPin,
  Heart,
  Share2,
  Ticket,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';

export const AgendaView: React.FC = () => {
  const { events, favorites, toggleFavoriteEvent, openDetailModal, showToast } = useCultural();
  const [viewMode, setViewMode] = useState<'lista' | 'calendario' | 'destaques'>('lista');
  const [selectedMonth, setSelectedMonth] = useState('2026-06'); // padrão

  const months = [
    { value: '2026-02', label: 'Fevereiro 2026 (Carnaval & Tambores)' },
    { value: '2026-05', label: 'Maio 2026 (Festas Tradicionais)' },
    { value: '2026-06', label: 'Junho 2026 (Festivais & Parintins)' },
    { value: '2026-07', label: 'Julho 2026 (Festivais de Inverno & Dança)' },
    { value: '2026-08', label: 'Agosto 2026 (Cultura Caiçara & Fandango)' },
    { value: '2026-09', label: 'Setembro 2026 (Bienais & Primavera)' }
  ];

  const handleShare = (title: string) => {
    navigator.clipboard.writeText(window.location.href);
    showToast(`Link para "${title}" copiado com sucesso!`, 'success');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-stone-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B84A39]/10 text-[#B84A39] text-xs font-bold">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Programação Cultural Unificada</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-culture font-bold text-stone-900">
              Agenda Cultural Brasileira
            </h1>
            <p className="text-stone-600 text-sm sm:text-base">
              Acompanhe a temporada de festivais, estreias teatrais, mostras de cinema e celebrações tradicionais.
            </p>
          </div>

          {/* Alternância de Modo de Visualização */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-stone-200 shadow-xs self-start md:self-auto">
            <button
              onClick={() => setViewMode('lista')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                viewMode === 'lista'
                  ? 'bg-[#B84A39] text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <List className="w-4 h-4" />
              <span>Lista Editorial</span>
            </button>
            <button
              onClick={() => setViewMode('calendario')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                viewMode === 'calendario'
                  ? 'bg-[#B84A39] text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Visão Calendário</span>
            </button>
            <button
              onClick={() => setViewMode('destaques')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                viewMode === 'destaques'
                  ? 'bg-[#B84A39] text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Destaques</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODO 1: LISTA EDITORIAL COMPLETA */}
      {viewMode === 'lista' && (
        <div className="space-y-4">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 hover:border-[#B84A39]/60 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="flex items-start sm:items-center gap-5 w-full sm:w-auto">
                {/* Data Badge */}
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-amber-800 uppercase">
                    {new Date(evt.startDate).toLocaleString('pt-BR', { month: 'short' })}
                  </span>
                  <span className="text-xl font-bold font-serif-culture text-stone-900">
                    {evt.startDate.split('-')[2]}
                  </span>
                </div>

                {/* Imagem do Evento */}
                <img
                  src={evt.coverImage}
                  alt={evt.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover flex-shrink-0"
                />

                {/* Textos */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#B84A39] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {evt.category}
                    </span>
                    <span className="text-xs text-stone-500">
                      Região {evt.region}
                    </span>
                  </div>

                  <h3
                    onClick={() => openDetailModal('event', evt.id)}
                    className="font-serif-culture font-bold text-lg text-stone-900 hover:text-[#B84A39] cursor-pointer transition leading-snug"
                  >
                    {evt.title}
                  </h3>

                  <p className="text-xs text-stone-500 flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {evt.time}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                      {evt.venueName} — {evt.city}/{evt.state}
                    </span>
                  </p>
                </div>
              </div>

              {/* Ações Rápidas */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                <button
                  onClick={() => toggleFavoriteEvent(evt.id)}
                  className={`p-2.5 rounded-xl border transition ${
                    favorites.includes(evt.id)
                      ? 'bg-[#B84A39] border-[#B84A39] text-white'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-600'
                  }`}
                  aria-label="Salvar evento"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(evt.id) ? 'fill-white' : ''}`} />
                </button>

                <button
                  onClick={() => handleShare(evt.title)}
                  className="p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-600 transition"
                  aria-label="Compartilhar"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openDetailModal('event', evt.id)}
                  className="bg-[#1C1917] hover:bg-[#B84A39] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODO 2: VISÃO CALENDÁRIO */}
      {viewMode === 'calendario' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="font-serif-culture font-bold text-xl text-stone-900">
              Grade Mensal de Programação
            </h3>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-xs font-bold bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-none"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Grid de Dias */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((evt) => (
              <div
                key={evt.id}
                onClick={() => openDetailModal('event', evt.id)}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 hover:border-[#B84A39] transition cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#B84A39] bg-[#FFF1EE] px-2.5 py-0.5 rounded-md">
                    {evt.startDate}
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">
                    {evt.time}
                  </span>
                </div>
                <h4 className="font-serif-culture font-bold text-base text-stone-900 group-hover:text-[#B84A39] transition">
                  {evt.title}
                </h4>
                <p className="text-xs text-stone-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                  {evt.venueName} ({evt.city})
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODO 3: EVENTOS EM DESTAQUE */}
      {viewMode === 'destaques' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.filter((e) => e.featured).map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-md flex flex-col"
            >
              <div className="relative h-60">
                <img
                  src={evt.coverImage}
                  alt={evt.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#B84A39] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {evt.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>{evt.startDate}</span>
                  <span>•</span>
                  <span>{evt.city}, {evt.state}</span>
                </div>
                <h3 className="font-serif-culture font-bold text-xl text-stone-900">
                  {evt.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed flex-grow">
                  {evt.description}
                </p>
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">
                    {evt.ticketType === 'gratuito' ? 'Entrada Livre' : evt.ticketType}
                  </span>
                  <button
                    onClick={() => openDetailModal('event', evt.id)}
                    className="bg-[#B84A39] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#9E392A] transition"
                  >
                    Ver Tudo
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
