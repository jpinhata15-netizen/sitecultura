import React, { useState } from 'react';
import {
  MessageSquare,
  Heart,
  Share2,
  FolderPlus,
  Send,
  Users,
  Sparkles,
  Lock,
  Globe,
  ThumbsUp,
  Bookmark
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';

export const CommunityView: React.FC = () => {
  const {
    currentUser,
    collections,
    createCollection,
    comments,
    likeComment,
    addComment,
    openDetailModal,
    showToast
  } = useCultural();

  const [newCollectionTitle, setNewCollectionTitle] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [creatingCol, setCreatingCol] = useState(false);

  const [discussionText, setDiscussionText] = useState('');

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionTitle.trim()) {
      showToast('Por favor, informe o título da coleção.', 'warning');
      return;
    }
    createCollection(newCollectionTitle.trim(), newCollectionDesc.trim(), isPublic);
    setNewCollectionTitle('');
    setNewCollectionDesc('');
    setCreatingCol(false);
  };

  const handleDiscussionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discussionText.trim()) return;
    addComment('community-general', 'article', discussionText.trim());
    setDiscussionText('');
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-stone-200">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B84A39]/10 text-[#B84A39] text-xs font-bold">
            <Users className="w-3.5 h-3.5" />
            <span>Mosaico Colaborativo</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-culture font-bold text-stone-900">
            Comunidade & Rotas Culturais Compartilhadas
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Crie suas próprias rotas culturais, compartilhe coleções personalizadas de festivais e participe dos debates com artistas, pesquisadores e amantes da cultura.
          </p>
        </div>
      </div>

      {/* Grid Principal: Coleções + Feed de Debates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna Esquerda: Coleções Culturais (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-culture font-bold text-2xl text-stone-900 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#B84A39]" />
              <span>Coleções Pessoais ("Rotas Culturais")</span>
            </h2>

            {currentUser ? (
              <button
                onClick={() => setCreatingCol(!creatingCol)}
                className="bg-[#B84A39] hover:bg-[#9E392A] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Nova Coleção</span>
              </button>
            ) : (
              <button
                onClick={() => openDetailModal('auth')}
                className="text-xs font-bold text-[#B84A39] hover:underline"
              >
                Faça login para criar coleções
              </button>
            )}
          </div>

          {/* Formulário de Criação de Coleção */}
          {creatingCol && (
            <form
              onSubmit={handleCreateCollection}
              className="bg-white p-6 rounded-3xl border border-stone-200 shadow-md space-y-4 animate-slideDown"
            >
              <h3 className="font-serif-culture font-bold text-lg text-stone-900">
                Criar Nova Coleção Cultural
              </h3>
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Título da Coleção *
                </label>
                <input
                  type="text"
                  value={newCollectionTitle}
                  onChange={(e) => setNewCollectionTitle(e.target.value)}
                  placeholder="Ex: Roteiro do Maracatu e Frevo em Olinda"
                  className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Descrição Curatorial
                </label>
                <textarea
                  rows={3}
                  value={newCollectionDesc}
                  onChange={(e) => setNewCollectionDesc(e.target.value)}
                  placeholder="Explique o conceito desta seleção cultural..."
                  className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B84A39]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="publicCol"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded text-[#B84A39]"
                />
                <label htmlFor="publicCol" className="text-xs text-stone-700 font-medium cursor-pointer">
                  Tornar esta coleção pública para toda a comunidade MOSAICO
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreatingCol(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#B84A39] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#9E392A] transition shadow-sm"
                >
                  Salvar Coleção
                </button>
              </div>
            </form>
          )}

          {/* Grade de Coleções */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {collections.map((col) => (
              <div
                key={col.id}
                className="group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative h-40">
                  <img
                    src={col.coverImage}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-black/70 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1">
                    {col.isPublic ? <Globe className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3" />}
                    <span>{col.isPublic ? 'Pública' : 'Privada'}</span>
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
                      <img
                        src={col.userAvatar}
                        alt={col.userName}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span>{col.userName}</span>
                    </div>

                    <h4 className="font-serif-culture font-bold text-base text-stone-900 group-hover:text-[#B84A39] transition leading-snug">
                      {col.title}
                    </h4>

                    <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                      {col.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                    <span>{col.itemsCount} itens reunidos</span>
                    <span className="text-[#B84A39] font-bold group-hover:underline">
                      Ver Itens →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna Direita: Mural de Debates da Comunidade (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-culture font-bold text-xl text-stone-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#1F4E38]" />
              <span>Mural Cultural</span>
            </h2>
            <span className="text-xs text-stone-400 font-medium">Ao vivo</span>
          </div>

          {/* Form para novo post */}
          <form onSubmit={handleDiscussionSubmit} className="space-y-2">
            <textarea
              rows={3}
              value={discussionText}
              onChange={(e) => setDiscussionText(e.target.value)}
              placeholder={
                currentUser
                  ? `Compartilhe uma dica cultural, ${currentUser.name}...`
                  : 'Faça login para publicar no mural...'
              }
              className="w-full text-xs sm:text-sm p-3 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:border-[#B84A39]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#1F4E38] hover:bg-[#183E2D] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publicar no Mural</span>
              </button>
            </div>
          </form>

          {/* Lista de Comentários Comunitários */}
          <div className="space-y-4 pt-2">
            {comments.slice(0, 5).map((cmt) => (
              <div
                key={cmt.id}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={cmt.user.avatar}
                      alt={cmt.user.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-900 block leading-tight">
                        {cmt.user.name}
                      </span>
                      <span className="text-[10px] text-stone-400 capitalize">
                        {cmt.user.role}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-400">
                    {new Date(cmt.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">{cmt.text}</p>

                <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
                  <button
                    onClick={() => likeComment(cmt.id)}
                    className="flex items-center gap-1 text-[11px] hover:text-[#B84A39] transition"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{cmt.likesCount} apoios</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
