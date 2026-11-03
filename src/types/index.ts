export type UserRole = 
  | 'visitor' 
  | 'user' 
  | 'artist' 
  | 'producer' 
  | 'institution' 
  | 'editor' 
  | 'admin';

export type BrazilianRegion = 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';

export interface User {
  id: string;
  name: string;
  artisticName?: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  city: string;
  state: string;
  verified: boolean;
  institutionName?: string;
  followersCount: number;
  followingCount: number;
}

export type CulturalCategory = 
  | 'Música'
  | 'Teatro'
  | 'Cinema'
  | 'Literatura'
  | 'Artes Visuais'
  | 'Dança'
  | 'Fotografia'
  | 'Cultura Popular'
  | 'Patrimônio Histórico'
  | 'Museus'
  | 'Gastronomia Cultural'
  | 'Artesanato'
  | 'Cultura Urbana'
  | 'Cultura Digital'
  | 'Festivais & Celebrações'
  | 'Cultura Tradicional e Regional';

export interface EventItem {
  id: string;
  title: string;
  subtitle?: string;
  coverImage: string;
  galleryImages?: string[];
  description: string;
  category: CulturalCategory;
  startDate: string; // YYYY-MM-DD
  endDate?: string;
  time: string;
  venueName: string;
  address: string;
  city: string;
  state: string;
  region: BrazilianRegion;
  organizer: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  ticketType: 'gratuito' | 'pago' | 'colaborativo';
  price?: string;
  ticketUrl?: string;
  ratingClass?: 'Livre' | '10+' | '12+' | '14+' | '16+' | '18+';
  accessibilityFeatures?: string[];
  lat: number;
  lng: number;
  featured: boolean;
  tags: string[];
  favoritesCount: number;
  viewsCount: number;
}

export interface ArtistItem {
  id: string;
  name: string;
  artisticName: string;
  avatar: string;
  coverImage: string;
  bio: string;
  city: string;
  state: string;
  region: BrazilianRegion;
  categories: CulturalCategory[];
  roleType: 'individual' | 'coletivo' | 'mestre_tradicional' | 'produtor';
  portfolio: {
    title: string;
    image: string;
    type: 'musica' | 'artes_visuais' | 'audiovisual' | 'performance' | 'escrita';
    description?: string;
  }[];
  socialLinks: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
    website?: string;
  };
  contactEmail: string;
  verified: boolean;
  followersCount: number;
  recognition?: string[]; // Prêmios, Comendas, Títulos de Mestre
}

export interface CulturalSpace {
  id: string;
  name: string;
  type: 'museu' | 'teatro' | 'biblioteca' | 'centro_cultural' | 'cinema' | 'galeria' | 'quilombo_historico' | 'espaco_independente';
  coverImage: string;
  gallery: string[];
  description: string;
  history: string;
  address: string;
  city: string;
  state: string;
  region: BrazilianRegion;
  openingHours: string;
  admissionFee: string;
  website?: string;
  phone?: string;
  lat: number;
  lng: number;
  accessibilityFeatures: string[];
  upcomingEventsCount: number;
}

export interface CulturalProject {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  description: string;
  objectives: string[];
  leads: string;
  culturalArea: CulturalCategory;
  location: string;
  state: string;
  region: BrazilianRegion;
  status: 'planejamento' | 'em_andamento' | 'concluido' | 'permanente';
  fundingSource?: string; // Ex: Lei Aldir Blanc, Rouanet, Fundo Setorial
  budget?: string;
  impactReport: string;
  beneficiariesCount?: number;
  media: {
    type: 'image' | 'video';
    url: string;
    caption: string;
  }[];
}

export interface ArticleItem {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  publishedAt: string;
  category: CulturalCategory | 'Editorial' | 'Memória & Patrimônio' | 'Políticas Culturais';
  excerpt: string;
  content: string; // Markdown or rich text
  tags: string[];
  likesCount: number;
}

export interface OpportunityItem {
  id: string;
  title: string;
  organization: string;
  type: 'edital' | 'lei_incentivo' | 'chamada_publica' | 'bolsa' | 'residencia' | 'curso_oficina' | 'festival_inscricoes';
  deadline: string; // YYYY-MM-DD
  budgetOrValue: string;
  scope: 'Nacional' | 'Estadual' | 'Municipal' | 'Regional';
  regionTarget?: BrazilianRegion;
  description: string;
  targetAudience: string;
  requirements: string[];
  officialLink: string;
  status: 'aberto' | 'em_breve' | 'encerrado';
}

export interface CommentItem {
  id: string;
  entityId: string;
  entityType: 'event' | 'artist' | 'space' | 'article' | 'project';
  user: {
    id: string;
    name: string;
    avatar: string;
    role: UserRole;
  };
  text: string;
  createdAt: string;
  likesCount: number;
  reported: boolean;
}

export interface CollectionItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  title: string;
  description: string;
  isPublic: boolean;
  itemsCount: number;
  coverImage: string;
  createdAt: string;
}

export interface ReportItem {
  id: string;
  entityId: string;
  entityType: string;
  entityTitle: string;
  reportedBy: string;
  reason: string;
  details: string;
  status: 'pendente' | 'analisado' | 'resolvido';
  createdAt: string;
}
