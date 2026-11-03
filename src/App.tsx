import React, { useState } from 'react';
import { CulturalProvider, useCultural } from './context/CulturalContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { LGPDConsentBanner } from './components/LGPDConsentBanner';
import { ToastContainer } from './components/ToastContainer';

// Views
import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { AgendaView } from './views/AgendaView';
import { MapView } from './views/MapView';
import { ArtistsView } from './views/ArtistsView';
import { SpacesView } from './views/SpacesView';
import { ProjectsView } from './views/ProjectsView';
import { EditorialView } from './views/EditorialView';
import { OpportunitiesView } from './views/OpportunitiesView';
import { CommunityView } from './views/CommunityView';
import { AdminDashboardView } from './views/AdminDashboardView';

// Modais
import { EventDetailModal } from './components/Modals/EventDetailModal';
import { ArtistDetailModal } from './components/Modals/ArtistDetailModal';
import { SpaceDetailModal } from './components/Modals/SpaceDetailModal';
import { OpportunityDetailModal } from './components/Modals/OpportunityDetailModal';
import { CreateEventModal } from './components/Modals/CreateEventModal';
import { AuthModal } from './components/Modals/AuthModal';
import { PrivacyPolicyModal } from './components/Modals/PrivacyPolicyModal';

const MainAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { activeModal, closeDetailModal } = useCultural();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} />;
      case 'explore':
        return <ExploreView />;
      case 'agenda':
        return <AgendaView />;
      case 'map':
        return <MapView />;
      case 'artists':
        return <ArtistsView />;
      case 'spaces':
        return <SpacesView />;
      case 'projects':
        return <ProjectsView />;
      case 'editorial':
        return <EditorialView />;
      case 'opportunities':
        return <OpportunitiesView />;
      case 'community':
        return <CommunityView />;
      case 'admin':
        return <AdminDashboardView />;
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] selection:bg-[#B84A39] selection:text-white transition-colors">
      {/* Barra de Navegação Principal */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conteúdo Dinâmico da View */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full">
        {renderActiveView()}
      </main>

      {/* Rodapé Institucional */}
      <Footer setActiveTab={setActiveTab} />

      {/* Pesquisa Global Interativa */}
      <GlobalSearchModal setActiveTab={setActiveTab} />

      {/* Banner de Consentimento LGPD */}
      <LGPDConsentBanner />

      {/* Container de Notificações Toast */}
      <ToastContainer />

      {/* Modais de Detalhes Ativos */}
      {activeModal && (
        <>
          {activeModal.type === 'event' && activeModal.id && (
            <EventDetailModal eventId={activeModal.id} onClose={closeDetailModal} />
          )}

          {activeModal.type === 'artist' && activeModal.id && (
            <ArtistDetailModal artistId={activeModal.id} onClose={closeDetailModal} />
          )}

          {activeModal.type === 'space' && activeModal.id && (
            <SpaceDetailModal spaceId={activeModal.id} onClose={closeDetailModal} />
          )}

          {activeModal.type === 'opportunity' && activeModal.id && (
            <OpportunityDetailModal opportunityId={activeModal.id} onClose={closeDetailModal} />
          )}

          {activeModal.type === 'createEvent' && (
            <CreateEventModal onClose={closeDetailModal} />
          )}

          {activeModal.type === 'auth' && (
            <AuthModal onClose={closeDetailModal} />
          )}

          {activeModal.type === 'privacy' && (
            <PrivacyPolicyModal onClose={closeDetailModal} />
          )}
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <CulturalProvider>
      <MainAppContent />
    </CulturalProvider>
  );
}
