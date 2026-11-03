import React from 'react';
import {
  X,
  MapPin,
  Clock,
  Ticket,
  Phone,
  Globe,
  Landmark,
  ShieldCheck,
  Calendar,
  Share2
} from 'lucide-react';
import { useCultural } from '../../context/CulturalContext';

interface SpaceDetailModalProps {
  spaceId: string;
  onClose: () => void;
}

export const SpaceDetailModal: React.FC<SpaceDetailModalProps> = ({ spaceId, onClose }) => {
  const { spaces, events, openDetailModal, showToast } = useCultural();
  const space = spaces.find((s) => s.id === spaceId);

  if (!space) return null;

  // Eventos programados no local
  const spaceEvents = events.filter((e) =>
    e.venueName.toLowerCase().includes(space.name.toLowerCase()) ||
    e.address.toLowerCase().includes(space.city.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        role="dialog"
        aria-labelledby="space-modal-title"
      >
        {/* Capa */}
        <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
          <img
            src={space.coverImage}
            alt={space.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="bg-[#1F4E38] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
              {space.type.replace('_', ' ')}
            </span>
            <h2
              id="space-modal-title"
              className="text-2xl sm:text-3xl font-serif-culture font-bold"
            >
              {space.name}
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
              {space.address} — {space.city}, {space.state} ({space.region})
            </p>
          </div>
        </div>

        {/* Informações Práticas e Históricas */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Grade de Informações de Visitação */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Clock className="w-4 h-4 text-[#B84A39]" />
                Horários de Visita
              </span>
              <p className="text-xs sm:text-sm font-semibold text-stone-900">
                {space.openingHours}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Ticket className="w-4 h-4 text-[#1F4E38]" />
                Ingressos / Tarifas
              </span>
              <p className="text-xs sm:text-sm font-semibold text-stone-900">
                {space.admissionFee}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Phone className="w-4 h-4 text-[#D97706]" />
                Canais e Contato
              </span>
              <p className="text-xs text-stone-700">
                {space.phone || 'Atendimento presencial'}
              </p>
              {space.website && (
                <a
                  href={space.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#B84A39] font-medium hover:underline flex items-center gap-1 mt-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Site Oficial</span>
                </a>
              )}
            </div>
          </div>

          {/* Sobre e Memória Histórica */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-serif-culture font-bold text-stone-900 mb-1.5">
                Apresentação do Espaço
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                {space.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200">
              <h3 className="text-sm font-serif-culture font-bold text-stone-900 mb-1.5 flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-[#B84A39]" />
                Memória e Importância Histórica
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {space.history}
              </p>
            </div>
          </div>

          {/* Acessibilidade */}
          {space.accessibilityFeatures && space.accessibilityFeatures.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#1F4E38]" />
                Acessibilidade Universal no Espaço:
              </h4>
              <div className="flex flex-wrap gap-2">
                {space.accessibilityFeatures.map((feat, idx) => (
                  <span
                    key={idx}
                    className="bg-emerald-50 text-emerald-900 text-xs px-3 py-1 rounded-lg border border-emerald-200 font-medium"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Galeria de Fotos */}
          {space.gallery && space.gallery.length > 0 && (
            <div>
              <h4 className="text-sm font-serif-culture font-bold text-stone-900 mb-2">
                Imagens do Espaço
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {space.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${space.name} ${idx + 1}`}
                    className="w-full h-28 object-cover rounded-xl border border-stone-200"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Eventos Programados */}
          {spaceEvents.length > 0 && (
            <div className="pt-4 border-t border-stone-200">
              <h4 className="text-sm font-serif-culture font-bold text-stone-900 mb-3 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#B84A39]" />
                Programação Cultural em Cartaz neste Espaço
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {spaceEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => {
                      onClose();
                      openDetailModal('event', evt.id);
                    }}
                    className="p-3 bg-[#FAF8F5] border border-stone-200 rounded-xl cursor-pointer hover:border-[#B84A39] transition flex items-center gap-3"
                  >
                    <img
                      src={evt.coverImage}
                      alt={evt.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-stone-900 line-clamp-1">{evt.title}</h5>
                      <span className="text-[11px] text-stone-500">{evt.startDate} • {evt.ticketType}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
