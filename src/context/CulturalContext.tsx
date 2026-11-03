import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  EventItem,
  ArtistItem,
  CulturalSpace,
  CulturalProject,
  ArticleItem,
  OpportunityItem,
  CollectionItem,
  CommentItem,
  ReportItem,
  User,
  UserRole
} from '../types';
import {
  mockEvents,
  mockArtists,
  mockSpaces,
  mockProjects,
  mockArticles,
  mockOpportunities,
  mockCollections,
  mockUsers,
  mockReports
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface ActiveModal {
  type: 'event' | 'artist' | 'space' | 'project' | 'article' | 'opportunity' | 'auth' | 'createEvent' | 'privacy' | 'collection';
  id?: string;
}

interface CulturalContextType {
  // Current user & Auth
  currentUser: User | null;
  currentRole: UserRole;
  switchUserRole: (role: UserRole) => void;
  users: User[];
  
  // Entities
  events: EventItem[];
  artists: ArtistItem[];
  spaces: CulturalSpace[];
  projects: CulturalProject[];
  articles: ArticleItem[];
  opportunities: OpportunityItem[];
  collections: CollectionItem[];
  comments: CommentItem[];
  reports: ReportItem[];
  favorites: string[]; // Event IDs
  
  // Actions
  toggleFavoriteEvent: (eventId: string) => void;
  addEvent: (event: Omit<EventItem, 'id' | 'favoritesCount' | 'viewsCount'>) => void;
  updateEvent: (id: string, event: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
  
  addArtist: (artist: Omit<ArtistItem, 'id' | 'followersCount' | 'verified'>) => void;
  toggleVerifyArtist: (artistId: string) => void;
  
  addSpace: (space: Omit<CulturalSpace, 'id' | 'upcomingEventsCount'>) => void;
  addProject: (project: Omit<CulturalProject, 'id'>) => void;
  addArticle: (article: Omit<ArticleItem, 'id' | 'likesCount'>) => void;
  likeArticle: (articleId: string) => void;
  
  addOpportunity: (opportunity: Omit<OpportunityItem, 'id'>) => void;
  
  addComment: (entityId: string, entityType: CommentItem['entityType'], text: string) => void;
  likeComment: (commentId: string) => void;
  
  createCollection: (title: string, description: string, isPublic: boolean) => void;
  
  reportContent: (entityId: string, entityType: string, entityTitle: string, reason: string, details: string) => void;
  resolveReport: (reportId: string, resolution: 'resolvido' | 'analisado') => void;
  
  // Acessibilidade
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSizeScale: 'normal' | 'large' | 'xlarge';
  cycleFontSize: () => void;
  speakText: (text: string) => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
  
  // Modais e UI
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  activeModal: ActiveModal | null;
  openDetailModal: (type: ActiveModal['type'], id?: string) => void;
  closeDetailModal: () => void;
  
  // Notificações / Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const CulturalContext = createContext<CulturalContextType | undefined>(undefined);

export const CulturalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicialização com dados do LocalStorage ou mock
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('mosaico_events');
    return saved ? JSON.parse(saved) : mockEvents;
  });

  const [artists, setArtists] = useState<ArtistItem[]>(() => {
    const saved = localStorage.getItem('mosaico_artists');
    return saved ? JSON.parse(saved) : mockArtists;
  });

  const [spaces, setSpaces] = useState<CulturalSpace[]>(() => {
    const saved = localStorage.getItem('mosaico_spaces');
    return saved ? JSON.parse(saved) : mockSpaces;
  });

  const [projects, setProjects] = useState<CulturalProject[]>(() => {
    const saved = localStorage.getItem('mosaico_projects');
    return saved ? JSON.parse(saved) : mockProjects;
  });

  const [articles, setArticles] = useState<ArticleItem[]>(() => {
    const saved = localStorage.getItem('mosaico_articles');
    return saved ? JSON.parse(saved) : mockArticles;
  });

  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(() => {
    const saved = localStorage.getItem('mosaico_opportunities');
    return saved ? JSON.parse(saved) : mockOpportunities;
  });

  const [collections, setCollections] = useState<CollectionItem[]>(() => {
    const saved = localStorage.getItem('mosaico_collections');
    return saved ? JSON.parse(saved) : mockCollections;
  });

  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('mosaico_reports');
    return saved ? JSON.parse(saved) : mockReports;
  });

  const [comments, setComments] = useState<CommentItem[]>(() => {
    const saved = localStorage.getItem('mosaico_comments');
    return saved ? JSON.parse(saved) : [
      {
        id: 'cmt-1',
        entityId: 'evt-1',
        entityType: 'event',
        user: {
          id: 'user-common-1',
          name: 'Rodrigo Santoro Ramos',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
          role: 'user'
        },
        text: 'A emoção de ver a evolução do Garantido e do Caprichoso no Bumbódromo é indescritível! Quem puder ir uma vez na vida, não hesite.',
        createdAt: '2026-10-18T14:30:00Z',
        likesCount: 19,
        reported: false
      }
    ];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('mosaico_favorites');
    return saved ? JSON.parse(saved) : ['evt-1', 'evt-4'];
  });

  // Usuário atual e controle de papel (RBAC)
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]); // Padrão: Curador/Admin para permitir testes de todas as telas
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');

  // Acessibilidade
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontSizeScale, setFontSizeScale] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Modais e UI
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistência automática
  useEffect(() => {
    localStorage.setItem('mosaico_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('mosaico_artists', JSON.stringify(artists));
  }, [artists]);

  useEffect(() => {
    localStorage.setItem('mosaico_spaces', JSON.stringify(spaces));
  }, [spaces]);

  useEffect(() => {
    localStorage.setItem('mosaico_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('mosaico_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('mosaico_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('mosaico_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('mosaico_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('mosaico_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('mosaico_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Acessibilidade no Document Element
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.remove('font-size-large', 'font-size-xlarge');
    if (fontSizeScale === 'large') {
      document.documentElement.classList.add('font-size-large');
    } else if (fontSizeScale === 'xlarge') {
      document.documentElement.classList.add('font-size-xlarge');
    }
  }, [fontSizeScale]);

  // Toasts
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Alternar papel de usuário (RBAC)
  const switchUserRole = (newRole: UserRole) => {
    setCurrentRole(newRole);
    if (newRole === 'visitor') {
      setCurrentUser(null);
      showToast('Visualizando como Visitante não autenticado.', 'info');
      return;
    }
    const found = mockUsers.find((u) => u.role === newRole) || {
      ...mockUsers[0],
      role: newRole,
      name: `Usuário (${newRole.toUpperCase()})`
    };
    setCurrentUser(found);
    showToast(`Papel alternado para: ${newRole.toUpperCase()}`, 'success');
  };

  // Favoritos
  const toggleFavoriteEvent = (eventId: string) => {
    if (!currentUser) {
      showToast('Faça login para salvar eventos nos seus favoritos!', 'warning');
      setActiveModal({ type: 'auth' });
      return;
    }
    setFavorites((prev) => {
      const exists = prev.includes(eventId);
      if (exists) {
        showToast('Evento removido dos seus salvos.', 'info');
        return prev.filter((id) => id !== eventId);
      } else {
        showToast('Evento salvo com sucesso nos seus favoritos!', 'success');
        return [...prev, eventId];
      }
    });

    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const isFav = favorites.includes(eventId);
          return {
            ...evt,
            favoritesCount: isFav ? Math.max(0, evt.favoritesCount - 1) : evt.favoritesCount + 1
          };
        }
        return evt;
      })
    );
  };

  // Eventos CRUD
  const addEvent = (eventData: Omit<EventItem, 'id' | 'favoritesCount' | 'viewsCount'>) => {
    const newEvent: EventItem = {
      ...eventData,
      id: `evt-${Date.now()}`,
      favoritesCount: 0,
      viewsCount: 1
    };
    setEvents((prev) => [newEvent, ...prev]);
    showToast('Novo evento cultural publicado com sucesso!', 'success');
  };

  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
    showToast('Evento atualizado com sucesso.', 'success');
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Evento removido com sucesso.', 'info');
  };

  // Artistas
  const addArtist = (artistData: Omit<ArtistItem, 'id' | 'followersCount' | 'verified'>) => {
    const newArtist: ArtistItem = {
      ...artistData,
      id: `art-${Date.now()}`,
      followersCount: 0,
      verified: false
    };
    setArtists((prev) => [newArtist, ...prev]);
    showToast('Cadastro de agente cultural submetido para validação!', 'success');
  };

  const toggleVerifyArtist = (artistId: string) => {
    setArtists((prev) =>
      prev.map((art) => {
        if (art.id === artistId) {
          const updated = !art.verified;
          showToast(`Selo de verificação ${updated ? 'concedido' : 'revogado'} para ${art.artisticName}`, 'info');
          return { ...art, verified: updated };
        }
        return art;
      })
    );
  };

  // Espaços
  const addSpace = (spaceData: Omit<CulturalSpace, 'id' | 'upcomingEventsCount'>) => {
    const newSpace: CulturalSpace = {
      ...spaceData,
      id: `spc-${Date.now()}`,
      upcomingEventsCount: 0
    };
    setSpaces((prev) => [newSpace, ...prev]);
    showToast('Espaço cultural catalogado com sucesso!', 'success');
  };

  // Projetos
  const addProject = (projectData: Omit<CulturalProject, 'id'>) => {
    const newProj: CulturalProject = {
      ...projectData,
      id: `prj-${Date.now()}`
    };
    setProjects((prev) => [newProj, ...prev]);
    showToast('Projeto cultural cadastrado com sucesso!', 'success');
  };

  // Artigos
  const addArticle = (articleData: Omit<ArticleItem, 'id' | 'likesCount'>) => {
    const newArticle: ArticleItem = {
      ...articleData,
      id: `art-edit-${Date.now()}`,
      likesCount: 0
    };
    setArticles((prev) => [newArticle, ...prev]);
    showToast('Artigo editorial publicado no acervo!', 'success');
  };

  const likeArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, likesCount: a.likesCount + 1 } : a))
    );
    showToast('Você curtiu esta publicação cultural!', 'success');
  };

  // Oportunidades
  const addOpportunity = (oppData: Omit<OpportunityItem, 'id'>) => {
    const newOpp: OpportunityItem = {
      ...oppData,
      id: `opp-${Date.now()}`
    };
    setOpportunities((prev) => [newOpp, ...prev]);
    showToast('Oportunidade/Edital cadastrado com sucesso!', 'success');
  };

  // Comentários
  const addComment = (entityId: string, entityType: CommentItem['entityType'], text: string) => {
    if (!currentUser) {
      showToast('Você precisa estar logado para comentar.', 'warning');
      setActiveModal({ type: 'auth' });
      return;
    }
    const newCmt: CommentItem = {
      id: `cmt-${Date.now()}`,
      entityId,
      entityType,
      user: {
        id: currentUser.id,
        name: currentUser.artisticName || currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.role
      },
      text,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      reported: false
    };
    setComments((prev) => [newCmt, ...prev]);
    showToast('Comentário publicado!', 'success');
  };

  const likeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, likesCount: c.likesCount + 1 } : c))
    );
  };

  // Coleções
  const createCollection = (title: string, description: string, isPublic: boolean) => {
    if (!currentUser) return;
    const newCol: CollectionItem = {
      id: `col-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      title,
      description,
      isPublic,
      itemsCount: 0,
      coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCollections((prev) => [newCol, ...prev]);
    showToast('Coleção cultural criada com sucesso!', 'success');
  };

  // Denúncias e Moderação
  const reportContent = (entityId: string, entityType: string, entityTitle: string, reason: string, details: string) => {
    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      entityId,
      entityType,
      entityTitle,
      reportedBy: currentUser ? currentUser.name : 'Visitante Anônimo',
      reason,
      details,
      status: 'pendente',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReports((prev) => [newReport, ...prev]);
    showToast('Denúncia enviada à comissão de moderação.', 'info');
  };

  const resolveReport = (reportId: string, resolution: 'resolvido' | 'analisado') => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: resolution } : r))
    );
    showToast(`Denúncia atualizada para status: ${resolution}`, 'success');
  };

  // Acessibilidade
  const toggleHighContrast = () => setHighContrast((p) => !p);

  const cycleFontSize = () => {
    setFontSizeScale((prev) => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'xlarge';
      return 'normal';
    });
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      showToast('Seu navegador não suporta síntese de voz nativa.', 'warning');
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const openDetailModal = (type: ActiveModal['type'], id?: string) => {
    setActiveModal({ type, id });
  };

  const closeDetailModal = () => {
    setActiveModal(null);
  };

  return (
    <CulturalContext.Provider
      value={{
        currentUser,
        currentRole,
        switchUserRole,
        users: mockUsers,
        events,
        artists,
        spaces,
        projects,
        articles,
        opportunities,
        collections,
        comments,
        reports,
        favorites,
        toggleFavoriteEvent,
        addEvent,
        updateEvent,
        deleteEvent,
        addArtist,
        toggleVerifyArtist,
        addSpace,
        addProject,
        addArticle,
        likeArticle,
        addOpportunity,
        addComment,
        likeComment,
        createCollection,
        reportContent,
        resolveReport,
        highContrast,
        toggleHighContrast,
        fontSizeScale,
        cycleFontSize,
        speakText,
        stopSpeech,
        isSpeaking,
        isSearchOpen,
        setIsSearchOpen,
        activeModal,
        openDetailModal,
        closeDetailModal,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </CulturalContext.Provider>
  );
};

export const useCultural = () => {
  const context = useContext(CulturalContext);
  if (!context) {
    throw new Error('useCultural must be used within a CulturalProvider');
  }
  return context;
};
