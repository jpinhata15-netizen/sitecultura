import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  Volume2,
  VolumeX,
  Ticket,
  ShieldCheck,
  Send,
  ThumbsUp,
  AlertOctagon,
  Check,
  Users
} from 'lucide-react';
import { useCultural } from '../../context/CulturalContext';

interface EventDetailModalProps {
  eventId: string;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ eventId, onClose }) => {
  const {
    events,
    favorites,
    toggleFavoriteEvent,
    currentUser,
    comments,
    addComment,
    likeComment,
    reportContent,
    speakText,
    stopSpeech,
    isSpeaking,
    showToast,
    openDetailModal
  } = useCultural();

  const event = events.find((e) => e.id === eventId);
  const [newCommentText, setNewCommentText] = useState('');
  const [copied, setCopied] = useState(false);
  const [reportingOpen, setReportingOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');

  if (!event) return null;

  const isFav = favorites.includes(event.id);
  const eventComments = comments.filter((c) => c.entityId === event.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast('Link do evento copiado para a área de transferência!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(event.id, 'event', newCommentText.trim());
    setNewCommentText('');
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason) return;
    reportContent(event.id, 'event', event.title, 'Denúncia de Conteúdo', reportReason);
    setReportingOpen(false);
    setReportReason('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-labelledby="event-modal-title"
      >
        {/* Header com Imagem de Capa e Ações Rápidas */}
        <div className="relative h-64 sm:h-80 w-full flex-shrink-0">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges e Título */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="bg-[#B84A39] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {event.category}
              </span>
              <span className="bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-md">
                Região {event.region}
              </span>
              {event.ratingClass && (
                <span className="bg-amber-500/90 text-stone-950 text-xs font-bold px-2 py-0.5 rounded-md">
                  Classificação: {event.ratingClass}
                </span>
              )}
            </div>

            <h2
              id="event-modal-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-serif-culture font-bold leading-tight"
            >
              {event.title}
            </h2>
            {event.subtitle && (
              <p className="text-stone-200 text-sm sm:text-base mt-1 line-clamp-2">
                {event.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Corpo do Conteúdo */}
        <div className="p-6 overflow-y-auto space-y-8 flex-grow">
          {/* Barra de Ações Principais: Favoritar, Ouvir, Compartilhar, Ingressos */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavoriteEvent(event.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition ${
                  isFav
                    ? 'bg-[#B84A39] text-white shadow-md'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                <span>{isFav ? 'Salvo nos Favoritos' : 'Salvar Evento'}</span>
                <span className="text-[11px] opacity-80">({event.favoritesCount})</span>
              </button>

              <button
                onClick={() => (isSpeaking ? stopSpeech() : speakText(`${event.title}. ${event.description}`))}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition"
                title="Ouvir descrição por síntese de voz acessível"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4 text-rose-600" />
                    <span>Pausar Leitura</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#B84A39]" />
                    <span>Ouvir Texto</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copiado!' : 'Compartilhar'}</span>
              </button>
            </div>

            {/* Ingressos / Acesso */}
            <div>
              {event.ticketUrl ? (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1F4E38] hover:bg-[#173D2C] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition transform hover:-translate-y-0.5"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Garantir Ingresso Oficial</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold">
                  Entrada Franca / Livre Acesso
                </span>
              )}
            </div>
          </div>

          {/* Informações Práticas: Data, Hora, Local, Ingressos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Calendar className="w-4 h-4 text-[#B84A39]" />
                Datas e Horários
              </span>
              <p className="text-sm font-bold text-stone-900">
                {event.startDate} {event.endDate ? `até ${event.endDate}` : ''}
              </p>
              <p className="text-xs text-stone-600 mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {event.time}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                Localização
              </span>
              <p className="text-sm font-bold text-stone-900 truncate">
                {event.venueName}
              </p>
              <p className="text-xs text-stone-600 mt-0.5">
                {event.address} — {event.city}, {event.state}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Ticket className="w-4 h-4 text-[#1F4E38]" />
                Acesso & Ingressos
              </span>
              <p className="text-sm font-bold text-stone-900 capitalize">
                {event.ticketType === 'gratuito' ? 'Entrada Gratuita' : event.ticketType}
              </p>
              <p className="text-xs text-stone-600 mt-0.5">
                {event.price || 'Acesso livre e sem necessidade de reserva'}
              </p>
            </div>
          </div>

          {/* Descrição Editorial */}
          <div>
            <h3 className="text-xl font-serif-culture font-bold text-stone-900 mb-3">
              Sobre a Manifestação Cultural
            </h3>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Recursos de Acessibilidade */}
          {event.accessibilityFeatures && event.accessibilityFeatures.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                Recursos de Acessibilidade Disponíveis no Local:
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.accessibilityFeatures.map((feat, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-stone-800 text-xs px-3 py-1 rounded-lg border border-amber-200/80 font-medium"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Galeria de Fotos */}
          {event.galleryImages && event.galleryImages.length > 0 && (
            <div>
              <h4 className="text-base font-serif-culture font-bold text-stone-900 mb-3">
                Registros Visuais
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {event.galleryImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Registro ${idx + 1}`}
                    className="w-full h-32 object-cover rounded-2xl border border-stone-200 hover:scale-[1.02] transition"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-stone-400 font-semibold">Tags:</span>
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="bg-stone-100 text-stone-600 text-xs px-2.5 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Seção de Comentários e Comunidade */}
          <div className="pt-6 border-t border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif-culture font-bold text-stone-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#B84A39]" />
                Comentários da Comunidade ({eventComments.length})
              </h3>

              <button
                onClick={() => setReportingOpen(!reportingOpen)}
                className="text-stone-400 hover:text-rose-600 text-xs flex items-center gap-1 transition"
                title="Denunciar evento inadequado"
              >
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>Denunciar</span>
              </button>
            </div>

            {/* Modal/Formulário de Denúncia */}
            {reportingOpen && (
              <form onSubmit={handleReportSubmit} className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-3">
                <p className="text-xs text-rose-900 font-semibold">
                  Relatar inconformidade nas informações deste evento:
                </p>
                <textarea
                  rows={2}
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Explique o motivo (ex: cancelamento sem aviso, taxas ocultas, dados inverídicos)..."
                  className="w-full text-xs p-2.5 bg-white border border-rose-300 rounded-xl focus:outline-none"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setReportingOpen(false)}
                    className="px-3 py-1 text-xs text-stone-600"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold"
                  >
                    Enviar Denúncia
                  </button>
                </div>
              </form>
            )}

            {/* Escrever Comentário */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder={
                  currentUser
                    ? 'Compartilhe sua vivência cultural ou tire dúvidas...'
                    : 'Faça login para participar dos comentários...'
                }
                className="flex-grow text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#B84A39]"
              />
              <button
                type="submit"
                className="bg-[#B84A39] hover:bg-[#9E392A] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar</span>
              </button>
            </form>

            {/* Lista de Comentários */}
            <div className="space-y-3 pt-2">
              {eventComments.length === 0 ? (
                <p className="text-xs text-stone-400 italic">
                  Seja a primeira pessoa a compartilhar impressões sobre este evento!
                </p>
              ) : (
                eventComments.map((cmt) => (
                  <div key={cmt.id} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
                    <img
                      src={cmt.user.avatar}
                      alt={cmt.user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">{cmt.user.name}</span>
                        <span className="text-[10px] text-stone-400">
                          {new Date(cmt.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-xs text-stone-700 mt-1">{cmt.text}</p>
                      <button
                        onClick={() => likeComment(cmt.id)}
                        className="mt-2 text-[11px] text-stone-500 hover:text-[#B84A39] flex items-center gap-1"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{cmt.likesCount} curtidas</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
