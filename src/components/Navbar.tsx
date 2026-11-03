import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  MapPin,
  Users,
  Landmark,
  Layers,
  BookOpen,
  Award,
  MessageSquare,
  Search,
  Heart,
  ShieldCheck,
  Menu,
  X,
  Volume2,
  VolumeX,
  Type,
  Eye,
  UserCheck,
  ChevronDown,
  Sparkles,
  PlusCircle
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';
import { UserRole } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const {
    currentUser,
    currentRole,
    switchUserRole,
    favorites,
    setIsSearchOpen,
    highContrast,
    toggleHighContrast,
    fontSizeScale,
    cycleFontSize,
    isSpeaking,
    stopSpeech,
    openDetailModal
  } = useCultural();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Vitrine', icon: Sparkles },
    { id: 'explore', label: 'Explorar', icon: Compass },
    { id: 'agenda', label: 'Agenda Cultural', icon: Calendar },
    { id: 'map', label: 'Mapa do Brasil', icon: MapPin },
    { id: 'artists', label: 'Artistas & Mestres', icon: Users },
    { id: 'spaces', label: 'Espaços & Patrimônio', icon: Landmark },
    { id: 'projects', label: 'Projetos', icon: Layers },
    { id: 'editorial', label: 'Editorial', icon: BookOpen },
    { id: 'opportunities', label: 'Editais & Vagas', icon: Award },
    { id: 'community', label: 'Comunidade', icon: MessageSquare }
  ];

  const roleLabels: Record<UserRole, { title: string; badge: string; color: string }> = {
    visitor: { title: 'Visitante (Público Geral)', badge: 'Visitante', color: 'bg-stone-200 text-stone-700' },
    user: { title: 'Cidadão / Usuário Cadastrado', badge: 'Cidadão', color: 'bg-amber-100 text-amber-900' },
    artist: { title: 'Artista / Agente Cultural', badge: 'Artista', color: 'bg-rose-100 text-rose-900' },
    producer: { title: 'Produtor(a) Cultural', badge: 'Produtor', color: 'bg-emerald-100 text-emerald-900' },
    institution: { title: 'Espaço / Instituição', badge: 'Instituição', color: 'bg-blue-100 text-blue-900' },
    editor: { title: 'Editor(a) Jornalístico', badge: 'Editor', color: 'bg-purple-100 text-purple-900' },
    admin: { title: 'Administrador & Curador', badge: 'Super Admin', color: 'bg-[#B84A39] text-white' }
  };

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7DFD5] transition-colors">
      {/* Barra Superior de Acessibilidade & Simulação de Papel RBAC */}
      <div className="bg-[#1C1917] text-stone-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-3">
        {/* Acessibilidade */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline font-medium text-stone-400">Acessibilidade:</span>
          
          <button
            onClick={toggleHighContrast}
            aria-label="Alternar modo de alto contraste"
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition ${
              highContrast ? 'bg-amber-400 text-black font-semibold' : 'hover:text-white hover:bg-stone-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{highContrast ? 'Contraste Alto (Ativo)' : 'Alto Contraste'}</span>
          </button>

          <button
            onClick={cycleFontSize}
            aria-label="Alterar tamanho da fonte"
            className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:text-white hover:bg-stone-800 transition"
          >
            <Type className="w-3.5 h-3.5" />
            <span>Fonte: {fontSizeScale.toUpperCase()}</span>
          </button>

          {isSpeaking && (
            <button
              onClick={stopSpeech}
              aria-label="Parar leitura em voz alta"
              className="flex items-center gap-1 text-rose-300 hover:text-rose-100 bg-rose-950/60 px-2 py-0.5 rounded animate-pulse"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>Parar Áudio</span>
            </button>
          )}
        </div>

        {/* Simulador de Perfis RBAC para o Avaliador / Usuário */}
        <div className="relative flex items-center gap-2">
          <span className="hidden md:inline text-stone-400">Simulador de Acesso:</span>
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 px-2.5 py-1 rounded border border-stone-700 transition"
              aria-expanded={roleDropdownOpen}
              aria-haspopup="true"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#E65100]" />
              <span className="font-medium">{roleLabels[currentRole].badge}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-white text-stone-900 rounded-lg shadow-xl border border-stone-200 py-1.5 z-50 animate-fadeIn">
                <div className="px-3 py-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                  Alternar Papel de Teste (RBAC):
                </div>
                {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchUserRole(r);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-50 transition ${
                      currentRole === r ? 'bg-amber-50 font-bold text-[#B84A39]' : 'text-stone-700'
                    }`}
                  >
                    <span>{roleLabels[r].title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${roleLabels[r].color}`}>
                      {roleLabels[r].badge}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navegação Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logotipo Editorial */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-center gap-3 focus:outline-none"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#B84A39] via-[#D97706] to-[#1F4E38] flex items-center justify-center shadow-md shadow-[#B84A39]/20 group-hover:scale-105 transition transform">
                <span className="text-white text-xl font-bold font-serif-culture">M</span>
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-[#1C1917] font-serif-culture flex items-center gap-1.5">
                  MOSAICO
                  <span className="inline-block w-2 h-2 rounded-full bg-[#B84A39]" />
                </span>
                <span className="block text-[11px] uppercase tracking-widest text-stone-500 font-medium">
                  Cultura Brasileira Viva
                </span>
              </div>
            </button>
          </div>

          {/* Links Desktop (Principais) */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-stone-700" aria-label="Navegação principal">
            {navLinks.slice(0, 6).map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#B84A39]/10 text-[#B84A39] font-bold shadow-sm'
                      : 'hover:text-[#B84A39] hover:bg-stone-100/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}

            {/* Dropdown Mais Módulos */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-stone-100/70 text-stone-700 transition">
                <span>Mais</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-stone-200 py-2 hidden group-hover:block transition-all">
                {navLinks.slice(6).map((link) => {
                  const Icon = link.icon;
                  const isActive = activeTab === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm transition ${
                        isActive
                          ? 'bg-[#B84A39]/10 text-[#B84A39] font-semibold'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-[#B84A39]'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-stone-400" />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Ações Rápidas (Pesquisa, Favoritos, Publicar Evento, Admin & Perfil) */}
          <div className="flex items-center gap-2.5">
            {/* Pesquisa Global */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200/70 text-stone-600 px-3 py-2 rounded-xl text-xs font-medium border border-stone-200/80 transition"
              title="Pesquisa Global Cultural (Ctrl + K)"
              aria-label="Abrir pesquisa global"
            >
              <Search className="w-4 h-4 text-stone-500" />
              <span className="hidden sm:inline">Buscar manifestação...</span>
              <kbd className="hidden md:inline bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded text-[10px] font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Favoritos */}
            <button
              onClick={() => handleNavClick('explore')}
              className="relative p-2 rounded-xl text-stone-700 hover:text-[#B84A39] hover:bg-stone-100 transition"
              title="Eventos e Lugares Salvos"
              aria-label="Ver favoritos"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-[#B84A39] fill-[#B84A39]' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B84A39] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Botão Novo Evento (se produtor, artista ou admin) */}
            {(currentRole === 'admin' || currentRole === 'producer' || currentRole === 'artist' || currentRole === 'institution') && (
              <button
                onClick={() => openDetailModal('createEvent')}
                className="hidden md:flex items-center gap-1.5 bg-[#1F4E38] hover:bg-[#183E2D] text-white px-3.5 py-2 rounded-xl text-xs font-medium shadow-sm transition transform hover:-translate-y-0.5"
                title="Cadastrar Novo Evento Cultural"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Divulgar Evento</span>
              </button>
            )}

            {/* Link Painel de Controle (Admin / Editor / Produtor) */}
            {(currentRole === 'admin' || currentRole === 'editor' || currentRole === 'producer') && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'admin'
                    ? 'bg-[#B84A39] text-white shadow-md shadow-[#B84A39]/25'
                    : 'bg-stone-900 text-stone-100 hover:bg-stone-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Painel de Gestão</span>
              </button>
            )}

            {/* Perfil / Login */}
            {currentUser ? (
              <button
                onClick={() => handleNavClick('community')}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-stone-100 transition"
                title={`Logado como: ${currentUser.name}`}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#B84A39]"
                />
              </button>
            ) : (
              <button
                onClick={() => openDetailModal('auth')}
                className="bg-[#B84A39] hover:bg-[#9E392A] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition"
              >
                Entrar
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition"
              aria-label="Abrir menu mobile"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E7DFD5] px-4 pt-2 pb-6 space-y-1 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-left transition ${
                    isActive
                      ? 'bg-[#B84A39] text-white font-bold'
                      : 'bg-stone-100/70 text-stone-800 hover:bg-stone-200/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-stone-200 pt-3 flex flex-col gap-2">
            {(currentRole === 'admin' || currentRole === 'editor' || currentRole === 'producer') && (
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 bg-stone-900 text-stone-100 p-2.5 rounded-xl text-xs font-bold"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Acessar Painel de Gestão & Curadoria</span>
              </button>
            )}

            <button
              onClick={() => {
                openDetailModal('createEvent');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#1F4E38] text-white p-2.5 rounded-xl text-xs font-bold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Divulgar Nova Manifestação Cultural</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
