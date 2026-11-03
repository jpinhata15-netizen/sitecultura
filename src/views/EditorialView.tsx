import React, { useState } from 'react';
import {
  BookOpen,
  ThumbsUp,
  Share2,
  Clock,
  Calendar,
  Tag,
  ArrowRight,
  MessageCircle,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';
import { ArticleItem } from '../types';

export const EditorialView: React.FC = () => {
  const { articles, likeArticle, speakText, stopSpeech, isSpeaking, showToast } = useCultural();
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  const handleShare = (title: string) => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link do ensaio cultural copiado!', 'success');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-stone-200">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-100 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Caderno de Jornalismo & Crítica Cultural</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-culture font-bold text-stone-900">
            Ensaios, Memória Viva e Leituras do Brasil Profundo
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Uma redação dedicada a desvendar as raízes estéticas, a história do patrimônio e os grandes manifestos artísticos do país com rigor editorial e profundidade reflexiva.
          </p>
        </div>
      </div>

      {/* Se um artigo estiver aberto para leitura completa */}
      {selectedArticle ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-12 shadow-sm space-y-8 max-w-4xl mx-auto animate-fadeIn">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-xs font-bold text-[#B84A39] hover:underline flex items-center gap-1.5"
          >
            ← Voltar para todos os artigos
          </button>

          {/* Cabeçalho do Artigo */}
          <div className="space-y-4">
            <span className="bg-[#B84A39] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {selectedArticle.category}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-culture font-bold text-stone-900 leading-tight">
              {selectedArticle.title}
            </h2>
            <p className="text-lg text-stone-600 font-light leading-relaxed">
              {selectedArticle.subtitle}
            </p>

            {/* Autor e Metadados */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-stone-100 py-3 text-xs text-stone-500">
              <div className="flex items-center gap-3">
                <img
                  src={selectedArticle.author.avatar}
                  alt={selectedArticle.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <span className="font-bold text-stone-900 block">{selectedArticle.author.name}</span>
                  <span>{selectedArticle.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedArticle.readTime}
                </span>
                <span>•</span>
                <span>{new Date(selectedArticle.publishedAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>

          {/* Imagem de Capa do Artigo */}
          <div className="rounded-3xl overflow-hidden h-72 sm:h-96">
            <img
              src={selectedArticle.coverImage}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Ferramentas de Leitura (Voz, Curtir, Compartilhar) */}
          <div className="flex items-center justify-between gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  isSpeaking ? stopSpeech() : speakText(`${selectedArticle.title}. ${selectedArticle.content}`)
                }
                className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-stone-200 hover:bg-stone-100 font-medium text-stone-700 transition"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-[#B84A39]" />}
                <span>{isSpeaking ? 'Pausar Áudio' : 'Ouvir Artigo Completo'}</span>
              </button>

              <button
                onClick={() => likeArticle(selectedArticle.id)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-stone-200 hover:bg-stone-100 font-medium text-stone-700 transition"
              >
                <ThumbsUp className="w-4 h-4 text-[#B84A39]" />
                <span>Curtir ({selectedArticle.likesCount})</span>
              </button>
            </div>

            <button
              onClick={() => handleShare(selectedArticle.title)}
              className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-semibold"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>

          {/* Conteúdo Tipográfico Editorial */}
          <div className="prose prose-stone max-w-none text-stone-800 text-base sm:text-lg leading-relaxed space-y-4 whitespace-pre-line font-serif-culture">
            {selectedArticle.content}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-stone-200">
            <span className="text-xs font-bold text-stone-400">Temas relacionados:</span>
            {selectedArticle.tags.map((t) => (
              <span key={t} className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-full">
                #{t}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* Lista de Artigos */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-black/75 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                  {art.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-stone-800">{art.author.name}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="font-serif-culture font-bold text-xl text-stone-900 group-hover:text-[#B84A39] transition leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm mt-3 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5 text-[#B84A39]" />
                    {art.likesCount} curtidas
                  </span>
                  <span className="font-bold text-[#B84A39] group-hover:underline flex items-center gap-1">
                    Ler Ensaio <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
