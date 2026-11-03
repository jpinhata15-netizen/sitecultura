import React from 'react';
import {
  X,
  BadgeCheck,
  MapPin,
  Mail,
  Award,
  Globe,
  Camera,
  Video,
  Radio,
  ExternalLink,
  Calendar,
  Share2
} from 'lucide-react';
import { useCultural } from '../../context/CulturalContext';

interface ArtistDetailModalProps {
  artistId: string;
  onClose: () => void;
}

export const ArtistDetailModal: React.FC<ArtistDetailModalProps> = ({ artistId, onClose }) => {
  const { artists, events, openDetailModal, showToast } = useCultural();
  const artist = artists.find((a) => a.id === artistId);

  if (!artist) return null;

  // Eventos relacionados a este artista
  const artistEvents = events.filter((e) =>
    e.title.toLowerCase().includes(artist.artisticName.toLowerCase()) ||
    e.organizer.name.toLowerCase().includes(artist.artisticName.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        role="dialog"
        aria-labelledby="artist-modal-title"
      >
        {/* Capa e Avatar */}
        <div className="relative h-44 sm:h-56 w-full flex-shrink-0 bg-stone-900">
          <img
            src={artist.coverImage}
            alt={artist.artisticName}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute -bottom-10 left-6 flex items-end gap-4">
            <img
              src={artist.avatar}
              alt={artist.artisticName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-xl bg-stone-100"
            />
          </div>
        </div>

        {/* Informações do Artista */}
        <div className="pt-14 px-6 pb-6 overflow-y-auto space-y-6 flex-grow">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="artist-modal-title"
                  className="text-2xl sm:text-3xl font-serif-culture font-bold text-stone-900"
                >
                  {artist.artisticName}
                </h2>
                {artist.verified && (
                  <span title="Agente Cultural Verificado">
                    <BadgeCheck className="w-6 h-6 text-[#1F4E38] fill-emerald-100" />
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Nome de registro: {artist.name} • {artist.roleType.replace('_', ' ').toUpperCase()}
              </p>
              <p className="text-xs text-stone-600 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                {artist.city}, {artist.state} (Região {artist.region})
              </p>
            </div>

            {/* Ação de Contato */}
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${artist.contactEmail}?subject=Contato Profissional via Plataforma MOSAICO`}
                className="inline-flex items-center gap-2 bg-[#B84A39] hover:bg-[#9E392A] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Contato Profissional</span>
              </a>
            </div>
          </div>

          {/* Categorias / Linguagens */}
          <div className="flex flex-wrap gap-2">
            {artist.categories.map((cat) => (
              <span
                key={cat}
                className="bg-[#FAF8F5] text-stone-800 text-xs px-3 py-1 rounded-full border border-stone-200 font-medium"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Biografia */}
          <div>
            <h3 className="text-base font-serif-culture font-bold text-stone-900 mb-2">
              Trajetória e Saberes
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
              {artist.bio}
            </p>
          </div>

          {/* Reconhecimentos / Prêmios */}
          {artist.recognition && artist.recognition.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-700" />
                Comendas, Títulos & Prêmios Culturais:
              </h4>
              <ul className="space-y-1">
                {artist.recognition.map((rec, idx) => (
                  <li key={idx} className="text-xs text-stone-800 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Portfólio em Destaque */}
          {artist.portfolio && artist.portfolio.length > 0 && (
            <div>
              <h3 className="text-base font-serif-culture font-bold text-stone-900 mb-3">
                Portfólio & Produções
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {artist.portfolio.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-2"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-36 object-cover rounded-xl"
                    />
                    <h4 className="text-sm font-bold text-stone-900">{item.title}</h4>
                    {item.description && (
                      <p className="text-xs text-stone-600">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Redes e Links Externos */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-3">
            <span className="text-xs text-stone-500 font-semibold">Canais Oficiais:</span>
            {artist.socialLinks.instagram && (
              <a
                href={artist.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-rose-600 bg-stone-100 px-3 py-1.5 rounded-lg transition"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            )}
            {artist.socialLinks.youtube && (
              <a
                href={artist.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-red-600 bg-stone-100 px-3 py-1.5 rounded-lg transition"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Canal YouTube</span>
              </a>
            )}
            {artist.socialLinks.website && (
              <a
                href={artist.socialLinks.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-amber-600 bg-stone-100 px-3 py-1.5 rounded-lg transition"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Website Oficial</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
