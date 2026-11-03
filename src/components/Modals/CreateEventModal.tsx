import React, { useState } from 'react';
import {
  X,
  Calendar,
  MapPin,
  Clock,
  Tag,
  DollarSign,
  ShieldCheck,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { useCultural } from '../../context/CulturalContext';
import { BrazilianRegion, CulturalCategory } from '../../types';

interface CreateEventModalProps {
  onClose: () => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ onClose }) => {
  const { addEvent, currentUser, showToast } = useCultural();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<CulturalCategory>('Música');
  const [region, setRegion] = useState<BrazilianRegion>('Nordeste');
  const [city, setCity] = useState('');
  const [state, setState] = useState('PE');
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [time, setTime] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [description, setDescription] = useState('');
  const [ticketType, setTicketType] = useState<'gratuito' | 'pago' | 'colaborativo'>('gratuito');
  const [price, setPrice] = useState('');
  const [ratingClass, setRatingClass] = useState<'Livre' | '10+' | '12+' | '14+' | '16+' | '18+'>('Livre');
  const [tagsInput, setTagsInput] = useState('');
  const [hasLibras, setHasLibras] = useState(false);
  const [hasRampa, setHasRampa] = useState(false);
  const [hasAudioDesc, setHasAudioDesc] = useState(false);

  // Coordenadas aproximadas para capitais brasileiras
  const regionCoordinates: Record<BrazilianRegion, { lat: number; lng: number }> = {
    Norte: { lat: -3.119, lng: -60.0217 }, // Manaus
    Nordeste: { lat: -8.0476, lng: -34.877 }, // Recife
    'Centro-Oeste': { lat: -15.7975, lng: -47.8919 }, // Brasília
    Sudeste: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    Sul: { lat: -30.0346, lng: -51.2177 } // Porto Alegre
  };

  const categoriesList: CulturalCategory[] = [
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !city.trim() || !startDate.trim() || !description.trim()) {
      showToast('Por favor, preencha todos os campos obrigatórios (*).', 'warning');
      return;
    }

    const accessibilityList: string[] = [];
    if (hasLibras) accessibilityList.push('Intérpretes de Libras');
    if (hasRampa) accessibilityList.push('Acesso para cadeirantes / rampas');
    if (hasAudioDesc) accessibilityList.push('Audiodescrição');

    const defaultImg =
      coverImage.trim() ||
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80';

    const coords = regionCoordinates[region] || { lat: -14.235, lng: -51.9253 };

    addEvent({
      title: title.trim(),
      subtitle: subtitle.trim(),
      coverImage: defaultImg,
      description: description.trim(),
      category,
      startDate,
      endDate: endDate.trim() || undefined,
      time: time.trim() || 'Horário a confirmar',
      venueName: venueName.trim() || 'Local Público',
      address: address.trim() || city,
      city: city.trim(),
      state,
      region,
      organizer: {
        id: currentUser ? currentUser.id : 'org-auto',
        name: currentUser ? (currentUser.artisticName || currentUser.name) : 'Agente Cultural Independente',
        avatar: currentUser ? currentUser.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: currentUser ? currentUser.role : 'Produtor'
      },
      ticketType,
      price: ticketType === 'gratuito' ? 'Entrada Franca' : price.trim(),
      ratingClass,
      accessibilityFeatures: accessibilityList,
      lat: coords.lat + (Math.random() - 0.5) * 0.1,
      lng: coords.lng + (Math.random() - 0.5) * 0.1,
      featured: true,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-labelledby="create-event-title"
      >
        {/* Header */}
        <div className="bg-[#1C1917] p-6 text-white flex items-center justify-between flex-shrink-0">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">
              Difusão Cultural Brasileira
            </span>
            <h2 id="create-event-title" className="text-xl sm:text-2xl font-serif-culture font-bold">
              Cadastrar Nova Manifestação Cultural
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário com Persistência */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Título & Subtítulo */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Nome do Evento / Manifestação *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Cortejo dos Tambores de Crioula do Maranhão"
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Subtítulo Poético ou Chamada Curta
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex: Encontro de toadas e mestres de tradição oral no centro histórico"
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
              />
            </div>
          </div>

          {/* Categoria & Região */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Linguagem / Categoria Cultural *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CulturalCategory)}
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Macrorregião do Brasil *
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as BrazilianRegion)}
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
              >
                <option value="Norte">Região Norte</option>
                <option value="Nordeste">Região Nordeste</option>
                <option value="Centro-Oeste">Região Centro-Oeste</option>
                <option value="Sudeste">Região Sudeste</option>
                <option value="Sul">Região Sul</option>
              </select>
            </div>
          </div>

          {/* Localização */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Cidade *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: Salvador, Olinda, Belém"
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Estado (UF) *
              </label>
              <input
                type="text"
                maxLength={2}
                value={state}
                onChange={(e) => setState(e.target.value.toUpperCase())}
                placeholder="Ex: BA, PE, PA, SP"
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Nome do Espaço / Local
              </label>
              <input
                type="text"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                placeholder="Ex: Praça do Carmo, Theatro da Paz"
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
              />
            </div>
          </div>

          {/* Datas e Horários */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Data de Início *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Data de Término
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Horário
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Ex: 19:30 às 22:00"
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
              />
            </div>
          </div>

          {/* Ingressos & Classificação Indicativa */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Tipo de Ingresso
              </label>
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value as any)}
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
              >
                <option value="gratuito">Gratuito / Entrada Franca</option>
                <option value="pago">Pago / Bilheteria</option>
                <option value="colaborativo">Colaborativo / Chapéu</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Valores ou Detalhes
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: R$ 30 (inteira) / Grátis para estudantes"
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Classificação Indicativa
              </label>
              <select
                value={ratingClass}
                onChange={(e) => setRatingClass(e.target.value as any)}
                className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
              >
                <option value="Livre">Livre para todos os públicos</option>
                <option value="10+">10 anos</option>
                <option value="12+">12 anos</option>
                <option value="14+">14 anos</option>
                <option value="16+">16 anos</option>
                <option value="18+">18 anos</option>
              </select>
            </div>
          </div>

          {/* Imagem de Capa */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              URL da Imagem de Capa (Deixe em branco para usar arte padrão)
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
            />
          </div>

          {/* Descrição Detalhada */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Descrição Editorial & Programação *
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a história da manifestação, artistas participantes, tradição e relevância para o público..."
              className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
              required
            />
          </div>

          {/* Acessibilidade */}
          <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl">
            <span className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
              Recursos de Acessibilidade no Local:
            </span>
            <div className="flex flex-wrap gap-4 text-xs text-stone-800">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasLibras}
                  onChange={(e) => setHasLibras(e.target.checked)}
                  className="rounded text-[#B84A39]"
                />
                <span>Intérprete de Libras</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasRampa}
                  onChange={(e) => setHasRampa(e.target.checked)}
                  className="rounded text-[#B84A39]"
                />
                <span>Acesso para cadeirantes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasAudioDesc}
                  onChange={(e) => setHasAudioDesc(e.target.checked)}
                  className="rounded text-[#B84A39]"
                />
                <span>Audiodescrição</span>
              </label>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Tags Separadas por Vírgula
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Música, Tradição, Gratuito, Pará"
              className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
            />
          </div>

          {/* Botões do Rodapé */}
          <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#B84A39] hover:bg-[#9E392A] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition transform hover:-translate-y-0.5"
            >
              Publicar Manifestação Cultural
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
