import React, { useState } from 'react';
import {
  Compass,
  Heart,
  Shield,
  FileText,
  Mail,
  ExternalLink,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { openDetailModal, showToast } = useCultural();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Por favor, informe um e-mail válido.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Inscrição confirmada na Mala Cultural Brasileira!', 'success');
  };

  const regions = [
    { name: 'Região Norte', desc: 'Toadas, carimbó, floresta, saberes marajoaras' },
    { name: 'Região Nordeste', desc: 'Maracatus, frevo, cordel, cangaço e sertão' },
    { name: 'Região Centro-Oeste', desc: 'Cavalhadas, pantanal, siriri e modernismo' },
    { name: 'Região Sudeste', desc: 'Teatros municipais, bienais, jongo e periferias' },
    { name: 'Região Sul', desc: 'Fandango caiçara, dança, tradições missioneiras' }
  ];

  return (
    <footer className="bg-[#141216] text-stone-300 pt-16 pb-12 border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Superior da Newsletter Editorial */}
        <div className="bg-gradient-to-r from-[#B84A39]/30 via-stone-900 to-[#1F4E38]/30 border border-stone-700/60 rounded-3xl p-8 mb-16 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-3 border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curadoria Semanal Gratuita</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-culture font-bold text-white mb-2">
                Receba as joias da cultura brasileira toda sexta-feira
              </h3>
              <p className="text-stone-300 text-sm max-w-xl">
                Editais recém-abertos, estreias de cinema independente, espetáculos de teatro e festivais populares selecionados a dedo pela nossa redação.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="bg-[#1F4E38]/40 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3 text-emerald-300">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    Pronto! Você receberá a próxima edição do Mosaico Semanal no seu e-mail.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-grow">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Seu melhor e-mail..."
                      className="w-full bg-stone-900/90 border border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-[#B84A39] transition"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#B84A39] hover:bg-[#9E392A] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-[#B84A39]/30 transition transform hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    Inscrever-se
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Grade de Navegação Institucional */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Coluna 1: Marca & Missão */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B84A39] via-[#D97706] to-[#1F4E38] flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold font-serif-culture">M</span>
              </div>
              <span className="text-2xl font-serif-culture font-bold text-white tracking-wide">
                MOSAICO
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Uma plataforma pública e colaborativa dedicada a mapear, preservar e celebrar a pluralidade inestimável das expressões artísticas, do patrimônio material e imaterial e das vozes ancestrais do Brasil.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-stone-400">
              <span className="flex items-center gap-1.5 bg-stone-900 px-3 py-1.5 rounded-lg border border-stone-800">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Em conformidade com a LGPD (Lei 13.709)</span>
              </span>
            </div>
          </div>

          {/* Coluna 2: Módulos da Plataforma */}
          <div>
            <h4 className="text-white font-serif-culture font-bold text-base mb-4">
              Navegar
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <button onClick={() => setActiveTab('explore')} className="hover:text-amber-400 transition">
                  Explorar por Categorias
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('agenda')} className="hover:text-amber-400 transition">
                  Agenda Cultural Completa
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-amber-400 transition">
                  Mapa Cultural Interativo
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('artists')} className="hover:text-amber-400 transition">
                  Catálogo de Artistas e Mestres
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('spaces')} className="hover:text-amber-400 transition">
                  Guia de Museus & Espaços
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('opportunities')} className="hover:text-amber-400 transition">
                  Painel de Editais & Fomento
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Regiões do Brasil */}
          <div>
            <h4 className="text-white font-serif-culture font-bold text-base mb-4 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#D97706]" />
              <span>Rotas Regionais</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              {regions.map((reg) => (
                <li key={reg.name}>
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="hover:text-amber-400 transition text-left"
                  >
                    <span className="font-semibold block text-stone-300">{reg.name}</span>
                    <span className="text-xs text-stone-500">{reg.desc}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Governança, Acessibilidade e Transparência */}
          <div>
            <h4 className="text-white font-serif-culture font-bold text-base mb-4">
              Transparência
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <button onClick={() => openDetailModal('privacy')} className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-stone-500" />
                  <span>Termos e Privacidade</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('editorial')} className="hover:text-amber-400 transition">
                  Manifesto Editorial
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-amber-400 transition">
                  Relatório de Impacto Cultural
                </button>
              </li>
              <li>
                <span className="text-xs text-stone-500 block pt-2">
                  Acessibilidade: Desenvolvido segundo critérios WCAG 2.1 nível AA e Lei Brasileira de Inclusão (LBI).
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>
            © 2026 MOSAICO — Ecossistema Digital da Cultura Brasileira. Criado em 2026. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span>Desenvolvido com carinho para valorização da identidade cultural nacional</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
