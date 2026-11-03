import {
  EventItem,
  ArtistItem,
  CulturalSpace,
  CulturalProject,
  ArticleItem,
  OpportunityItem,
  CollectionItem,
  User,
  ReportItem
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-admin',
    name: 'Helena Buarque',
    email: 'helena.curadoria@cultura.gov.br',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Curadora cultural, pesquisadora de patrimônio imaterial e administradora da plataforma.',
    city: 'Brasília',
    state: 'DF',
    verified: true,
    followersCount: 1420,
    followingCount: 380
  },
  {
    id: 'user-artist-1',
    name: 'Mestre Curica de Belém',
    artisticName: 'Mestre Curica',
    email: 'curica.guitarrada@cultura.pa.br',
    role: 'artist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Pioneiro da guitarrada paraense, compositor e mestre da cultura popular amazônica com 50 anos de trajetória.',
    city: 'Belém',
    state: 'PA',
    verified: true,
    followersCount: 8900,
    followingCount: 215
  },
  {
    id: 'user-producer-1',
    name: 'Clara Meirelles',
    email: 'clara@ventaniaeventos.com.br',
    role: 'producer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Produtora executiva independente focada em festivais de música popular e artes cênicas.',
    city: 'Recife',
    state: 'PE',
    verified: true,
    followersCount: 3200,
    followingCount: 890
  },
  {
    id: 'user-inst-1',
    name: 'Instituto Inhotim',
    institutionName: 'Instituto de Arte Contemporânea e Jardim Botânico Inhotim',
    email: 'programacao@inhotim.org.br',
    role: 'institution',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'O maior museu a céu aberto da América Latina, unindo arte contemporânea de ponta e conservação botânica.',
    city: 'Brumadinho',
    state: 'MG',
    verified: true,
    followersCount: 34100,
    followingCount: 120
  },
  {
    id: 'user-common-1',
    name: 'Rodrigo Santoro Ramos',
    email: 'rodrigo.ramos@gmail.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Entusiasta de teatro de rua, literatura de cordel e festivais de cinema brasileiro.',
    city: 'Salvador',
    state: 'BA',
    verified: false,
    followersCount: 145,
    followingCount: 310
  }
];

export const mockEvents: EventItem[] = [
  {
    id: 'evt-1',
    title: '58º Festival Folclórico de Parintins',
    subtitle: 'O duelo ancestral e poético entre os Bois Garantido e Caprichoso',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Patrimônio Cultural do Brasil, o Festival de Parintins reúne mais de 100 mil espectadores no Bumbódromo para celebrar as lendas, os rituais indígenas e o auto do boi-bumbá através de toadas, alegorias monumentais e coreografias de tirar o fôlego.',
    category: 'Festivais & Celebrações',
    startDate: '2026-06-26',
    endDate: '2026-06-28',
    time: '20:00 às 02:30',
    venueName: 'Bumbódromo de Parintins',
    address: 'Av. Paraíba, s/n - Centro',
    city: 'Parintins',
    state: 'AM',
    region: 'Norte',
    organizer: {
      id: 'org-am',
      name: 'Comissão Parintins Viva',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Instituição de Fomento'
    },
    ticketType: 'colaborativo',
    price: 'Acesso às arquibancadas populares gratuito; camarotes sob consulta',
    ticketUrl: 'https://festivaldeparintins.am.gov.br',
    ratingClass: 'Livre',
    accessibilityFeatures: ['Audiodescrição nos camarotes de acessibilidade', 'Intérpretes de Libras', 'Acesso para cadeirantes'],
    lat: -2.6288,
    lng: -56.7358,
    featured: true,
    tags: ['Boi-Bumbá', 'Amazônia', 'Folclore', 'Música Tradicional'],
    favoritesCount: 3840,
    viewsCount: 29500
  },
  {
    id: 'evt-2',
    title: 'Noite dos Tambores Silenciosos de Olinda',
    subtitle: 'Encontro centenário dos Maracatus de Baque Virado em louvor aos ancestrais',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'À meia-noite da segunda-feira de Carnaval, as luzes da Cidade Alta se apagam e mais de trinta nações de Maracatu entoam orações e toques sagrados aos orixás e à memória do povo negro escravizado. Uma das vivências rituais mais profundas das Américas.',
    category: 'Cultura Popular',
    startDate: '2026-02-16',
    time: '23:30',
    venueName: 'Pátio da Igreja do Rosário dos Pretos',
    address: 'Largo do Amparo, s/n',
    city: 'Olinda',
    state: 'PE',
    region: 'Nordeste',
    organizer: {
      id: 'org-maracatu',
      name: 'Associação das Nações de Maracatu de PE',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Coletivo Tradicional'
    },
    ticketType: 'gratuito',
    ratingClass: 'Livre',
    accessibilityFeatures: ['Espaço reservado para pessoas com mobilidade reduzida'],
    lat: -7.9984,
    lng: -34.8456,
    featured: true,
    tags: ['Maracatu', 'Afro-brasileiro', 'Patrimônio Imaterial', 'Pernambuco'],
    favoritesCount: 2410,
    viewsCount: 18200
  },
  {
    id: 'evt-3',
    title: 'Cavalhadas Tradicionais de Pirenópolis',
    subtitle: 'Cores, cavalos paramentados e a dramaturgia épica do cerrado goiano',
    coverImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Durante a Festa do Divino Espírito Santo, cavaleiros mascarados de Mouros e Cristãos encenam três dias de combates, desfiles e carreiras na arena do Cavalhódromo, preservando uma tradição que remonta ao século XVIII.',
    category: 'Cultura Tradicional e Regional',
    startDate: '2026-05-24',
    endDate: '2026-05-26',
    time: '14:00 às 18:00',
    venueName: 'Cavalhódromo Municipal de Pirenópolis',
    address: 'Rua Direita, s/n - Centro Histórico',
    city: 'Pirenópolis',
    state: 'GO',
    region: 'Centro-Oeste',
    organizer: {
      id: 'org-cavalhadas',
      name: 'Irmandade do Santíssimo Sacramento',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      role: 'Produtores Comunitários'
    },
    ticketType: 'gratuito',
    ratingClass: 'Livre',
    accessibilityFeatures: ['Rampas de acesso', 'Banheiros adaptados'],
    lat: -15.8523,
    lng: -48.9592,
    featured: true,
    tags: ['Cavalhadas', 'Cerrado', 'Patrimônio Histórico', 'Goiás'],
    favoritesCount: 1540,
    viewsCount: 11400
  },
  {
    id: 'evt-4',
    title: 'Bienal Internacional de Arte Contemporânea & Tradição',
    subtitle: 'Conexões entre a ancestralidade indígena e as novas mídias digitais',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Mais de 120 artistas de todas as regiões brasileiras e do sul global ocupam o Pavilhão Ciccillo Matarazzo com instalações imersivas, pinturas monumentais e performances sonoras com curadoria coletiva.',
    category: 'Artes Visuais',
    startDate: '2026-09-12',
    endDate: '2026-11-20',
    time: 'Terça a Domingo, das 10h às 19h',
    venueName: 'Pavilhão da Bienal - Parque Ibirapuera',
    address: 'Av. Pedro Álvares Cabral, s/n - Portão 3',
    city: 'São Paulo',
    state: 'SP',
    region: 'Sudeste',
    organizer: {
      id: 'org-bienal',
      name: 'Fundação Bienal de SP',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: 'Fundação Cultural'
    },
    ticketType: 'gratuito',
    price: 'Entrada Franca mediante agendamento prévio online',
    ratingClass: 'Livre',
    accessibilityFeatures: ['Visitas guiadas em Libras', 'Textos em Braille', 'Maquetes táteis', 'Elevadores acessíveis'],
    lat: -23.5874,
    lng: -46.6576,
    featured: true,
    tags: ['Artes Visuais', 'Bienal', 'São Paulo', 'Contemporâneo'],
    favoritesCount: 4210,
    viewsCount: 38200
  },
  {
    id: 'evt-5',
    title: '43º Festival de Dança de Joinville',
    subtitle: 'O maior festival de dança do mundo em número de participantes segundo o Guinness',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    description: 'Milhares de bailarinos de balé clássico, dança contemporânea, danças urbanas, sapateado e folclore sobem ao palco principal do Centreventos Cau Hansen e palcos abertos espalhados por praças da cidade.',
    category: 'Dança',
    startDate: '2026-07-15',
    endDate: '2026-07-25',
    time: '19:00',
    venueName: 'Centreventos Cau Hansen',
    address: 'Av. José Vieira, 315 - América',
    city: 'Joinville',
    state: 'SC',
    region: 'Sul',
    organizer: {
      id: 'org-joinville',
      name: 'Instituto Festival de Dança',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Instituto Cultural'
    },
    ticketType: 'pago',
    price: 'A partir de R$ 40,00 (meia-entrada social)',
    ticketUrl: 'https://festivaldedancadejoinville.com.br',
    ratingClass: 'Livre',
    accessibilityFeatures: ['Audiodescrição', 'Lugares reservados para mobilidade reduzida'],
    lat: -26.2974,
    lng: -48.8475,
    featured: false,
    tags: ['Dança', 'Balé', 'Joinville', 'Santa Catarina'],
    favoritesCount: 1980,
    viewsCount: 14200
  },
  {
    id: 'evt-6',
    title: 'Fandango Caiçara na Ilha dos Valadares',
    subtitle: 'Rabecas afinadas, tamancos de madeira batidos no tablado e cantos do mar',
    coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    description: 'Celebração comunitária do Fandango Caiçara, patrimônio cultural imaterial registrado pelo IPHAN. Músicos e tocadores de viola caiçara, adufe e machete tocam até o amanhecer celebrando a cultura da pesca e da mata atlântica.',
    category: 'Música',
    startDate: '2026-08-08',
    time: '21:00 às 04:00',
    venueName: 'Casa Fandanguista da Ilha dos Valadares',
    address: 'Rua da Praia, 42 - Ilha dos Valadares',
    city: 'Paranaguá',
    state: 'PR',
    region: 'Sul',
    organizer: {
      id: 'org-fandango',
      name: 'Coletivo Mestre Brasílio',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Mestres Tradicionais'
    },
    ticketType: 'gratuito',
    ratingClass: 'Livre',
    accessibilityFeatures: ['Acesso térreo'],
    lat: -25.5204,
    lng: -48.5097,
    featured: false,
    tags: ['Fandango', 'Caiçara', 'Paraná', 'Rabeca'],
    favoritesCount: 890,
    viewsCount: 7100
  }
];

export const mockArtists: ArtistItem[] = [
  {
    id: 'art-1',
    name: 'José Ribeiro Coutinho',
    artisticName: 'Mestre Curica de Belém',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    bio: 'Nascido às margens da Baía do Guajará, Mestre Curica é um dos fundadores da estética da Guitarrada Paraense, mesclando ritmos caribenhos como cúmbia e merengue ao carimbó ancestral e choro caboclo. Recebeu a Ordem do Mérito Cultural.',
    city: 'Belém',
    state: 'PA',
    region: 'Norte',
    categories: ['Música', 'Cultura Popular', 'Cultura Tradicional e Regional'],
    roleType: 'mestre_tradicional',
    portfolio: [
      {
        title: 'Disco "Guitarradas da Amazônia Profunda"',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
        type: 'musica',
        description: 'Álbum gravado ao vivo no Teatro da Paz acompanhado de músicos ribeirinhos.'
      },
      {
        title: 'Turnê Europeia "Vozes do Igarapé"',
        image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
        type: 'performance',
        description: 'Apresentações em festivais mundiais de etnomusicologia em Portugal e França.'
      }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/mestrecurica',
      youtube: 'https://youtube.com/c/mestrecurica',
      spotify: 'https://spotify.com/artist/mestrecurica'
    },
    contactEmail: 'contato@mestrecurica.com.br',
    verified: true,
    followersCount: 14200,
    recognition: ['Mestre dos Saberes da Amazônia (IPHAN)', 'Ordem do Mérito Cultural Brasileiro', 'Prêmio da Música Brasileira']
  },
  {
    id: 'art-2',
    name: 'Dandara Ketuani Barbosa',
    artisticName: 'Dandara Ketuani',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    bio: 'Artista visual, muralista e gravurista de Salvador. Suas obras de grande escala investigam a memória da diáspora africana nas Américas, resgatando símbolos dos orixás, tecidos adinkra e as histórias de lideranças femininas dos quilombos.',
    city: 'Salvador',
    state: 'BA',
    region: 'Nordeste',
    categories: ['Artes Visuais', 'Cultura Urbana', 'Cultura Popular'],
    roleType: 'individual',
    portfolio: [
      {
        title: 'Mural "Iansã das Tempestades Verdes"',
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
        type: 'artes_visuais',
        description: 'Mural de 28 metros no bairro do Pelourinho homenageando as quitandeiras históricas.'
      },
      {
        title: 'Série de Xilogravuras "Raízes de Cobre"',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
        type: 'artes_visuais',
        description: 'Exposição individual no Museu de Arte Moderna da Bahia (MAM-BA).'
      }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/dandara_artes',
      website: 'https://dandaraketuani.com.br'
    },
    contactEmail: 'producao@dandaraketuani.com.br',
    verified: true,
    followersCount: 28900,
    recognition: ['Prêmio Pipa Revelação', 'Residência Artística Vila Sul - Goethe-Institut']
  },
  {
    id: 'art-3',
    name: 'Coletivo Teatro Kambeba do Xingu',
    artisticName: 'Coletivo Cênico Kambeba',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    bio: 'Grupo de dramaturgia e performance formado por jovens indígenas das etnias Kambeba, Xavante e Terena no Centro-Oeste brasileiro. Utilizam mitologias orais, canto ancestral e cenografia com sementes e fibras naturais.',
    city: 'Cuiabá',
    state: 'MT',
    region: 'Centro-Oeste',
    categories: ['Teatro', 'Cultura Tradicional e Regional', 'Dança'],
    roleType: 'coletivo',
    portfolio: [
      {
        title: 'Espetáculo "O Rio que Respira"',
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
        type: 'performance',
        description: 'Vencedor do Prêmio Shell de Teatro de Rua e circulação nacional pelo Palco Giratório.'
      }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/teatrokambeba',
      youtube: 'https://youtube.com/c/kambebaxingu'
    },
    contactEmail: 'coletivo.kambeba@indigenas.art.br',
    verified: true,
    followersCount: 16400,
    recognition: ['Prêmio Shell de Teatro', 'Prêmio Jabuti - Roteiro Dramatúrgico']
  },
  {
    id: 'art-4',
    name: 'Thiago Bento de Queiróz',
    artisticName: 'Thiago do Cordel',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    bio: 'Poeta cordelista, xilógrafo e declamador do Cariri cearense. Publicou mais de 70 folhetos rimados em sextilhas e martelo agalopado, registrando lendas sertanejas e crônicas do Brasil profundo.',
    city: 'Juazeiro do Norte',
    state: 'CE',
    region: 'Nordeste',
    categories: ['Literatura', 'Cultura Popular', 'Artesanato'],
    roleType: 'individual',
    portfolio: [
      {
        title: 'Folheto "A Peleja do Ciberespaço com o Diabo"',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
        type: 'escrita',
        description: 'Mais de 15 mil exemplares impressos artesanalmente em tipografia de tipos móveis.'
      }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/thiagocordel'
    },
    contactEmail: 'cordel.cariri@gmail.com',
    verified: true,
    followersCount: 9300,
    recognition: ['Membro da Academia Brasileira de Literatura de Cordel (ABLC)']
  }
];

export const mockSpaces: CulturalSpace[] = [
  {
    id: 'spc-1',
    name: 'Instituto Inhotim',
    type: 'museu',
    coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Com uma área de mais de 140 hectares de jardins botânicos e galerias permanentes de nomes como Cildo Meireles, Tunga, Adriana Varejão e Yayoi Kusama, Inhotim redefine a experiência sensorial do visitante com a arte moderna e o meio ambiente.',
    history: 'Iniciado nos anos 1980 como propriedade particular e aberto ao público em 2006, Inhotim tornou-se referência global na interlocução entre arquitetura de pavilhões, acervo de arte contemporânea de ponta e preservação botânica com mais de 4,5 mil espécies.',
    address: 'Rua B, 20 - Fazenda Inhotim',
    city: 'Brumadinho',
    state: 'MG',
    region: 'Sudeste',
    openingHours: 'Quarta a Sexta: 09h30 às 16h30; Sábados e Domingos: 09h30 às 17h30',
    admissionFee: 'R$ 50 (inteira) / Quartas-feiras gratuitas para todos',
    website: 'https://www.inhotim.org.br',
    phone: '(31) 3571-9700',
    lat: -20.1246,
    lng: -44.2206,
    accessibilityFeatures: ['Carrinhos elétricos adaptados', 'Monitores treinados em Libras', 'Banheiros acessíveis', 'Trilhas pavimentadas'],
    upcomingEventsCount: 6
  },
  {
    id: 'spc-2',
    name: 'Theatro da Paz',
    type: 'teatro',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Construído em 1878 no auge do Ciclo da Borracha, o Theatro da Paz é um dos mais suntuosos monumentos neoclássicos da América Latina, com afrescos de Domenico de Angelis e acústica perfeita para ópera e concertos líricos.',
    history: 'Tombado pelo IPHAN em 1963, o teatro sobreviveu como polo de difusão de arte amazônica, abrigando o tradicional Festival de Ópera do Theatro da Paz e apresentações da Orquestra Sinfônica do Theatro da Paz.',
    address: 'Praça da República, s/n - Campina',
    city: 'Belém',
    state: 'PA',
    region: 'Norte',
    openingHours: 'Visitas guiadas de Terça a Domingo, das 09h às 17h',
    admissionFee: 'R$ 20 (inteira) / Visitas escolares gratuitas',
    website: 'https://theatrodapaz.pa.gov.br',
    phone: '(91) 4009-8750',
    lat: -1.4528,
    lng: -48.4907,
    accessibilityFeatures: ['Elevador histórico adaptado', 'Audioguia descritivo', 'Rampa de acesso frontal'],
    upcomingEventsCount: 4
  },
  {
    id: 'spc-3',
    name: 'Museu de Arte Moderna da Bahia (MAM-BA)',
    type: 'museu',
    coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Instalado no histórico Solar do Unhão, debruçado sobre as águas da Baía de Todos os Santos, o MAM-BA une o casario colonial restaurado por Lina Bo Bardi ao famoso pôr do sol com Jam Sessions de Jazz ao vivo.',
    history: 'O complexo arquitetônico do século XVII foi transformado na década de 1960 por Lina Bo Bardi, que idealizou a lendária escadaria helicoidal de madeira encaixada sem um único prego de ferro.',
    address: 'Av. Contorno, s/n - Dois de Julho',
    city: 'Salvador',
    state: 'BA',
    region: 'Nordeste',
    openingHours: 'Terça a Domingo: 10h às 18h (Sábados até às 21h com Jam no MAM)',
    admissionFee: 'Entrada Gratuita (contribuição voluntária na Jam no MAM)',
    website: 'http://www.mam.ba.gov.br',
    phone: '(71) 3117-6137',
    lat: -12.9842,
    lng: -38.5204,
    accessibilityFeatures: ['Rampas de acesso ao cais', 'Plataforma elevatória', 'Banheiros acessíveis'],
    upcomingEventsCount: 5
  },
  {
    id: 'spc-4',
    name: 'Theatro São Pedro de Porto Alegre',
    type: 'teatro',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    description: 'Inaugurado em 1858, o Theatro São Pedro é a mais antiga instituição cultural de Porto Alegre, guardando memórias das grandes peças do teatro brasileiro e da música de câmara.',
    history: 'Sob a liderança histórica de Eva Sopher, o teatro tornou-se símbolo de preservação do patrimônio no Rio Grande do Sul e hoje conta com o moderno Multipalco Eva Sopher anexo.',
    address: 'Praça Marechal Deodoro, s/n - Centro Histórico',
    city: 'Porto Alegre',
    state: 'RS',
    region: 'Sul',
    openingHours: 'Bilheteria: Terça a Domingo, das 13h até o início do espetáculo',
    admissionFee: 'Varia por espetáculo / Visitas históricas R$ 15',
    website: 'https://teatrosaopedro.com.br',
    phone: '(51) 3227-5100',
    lat: -30.0336,
    lng: -51.2312,
    accessibilityFeatures: ['Elevadores', 'Lugares especiais para PCR', 'Fones para audiodescrição'],
    upcomingEventsCount: 8
  }
];

export const mockProjects: CulturalProject[] = [
  {
    id: 'prj-1',
    title: 'Salvaguarda da Cerâmica Marajoara e Tapajônica',
    subtitle: 'Capacitação comunitária de novas gerações de artesãos ribeirinhos na Ilha do Marajó',
    coverImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    description: 'Iniciativa que resgata os métodos pré-colombianos de queima de argila em fornos de barro na floresta, catalogando mais de 300 padrões iconográficos marajoaras e capacitando 80 famílias em geração de renda sustentável.',
    objectives: [
      'Construção de 4 centros comunitários de olaria tradicional em Cachoeira do Arari',
      'Elaboração do Guia Digital de Padrões Iconográficos Abertos',
      'Certificação de Indicação Geográfica de Origem Artesanal'
    ],
    leads: 'Associação dos Artesãos do Marajó & IPHAN Pará',
    culturalArea: 'Artesanato',
    location: 'Cachoeira do Arari e Soure',
    state: 'PA',
    region: 'Norte',
    status: 'em_andamento',
    fundingSource: 'Lei Paulo Gustavo & Fundo Amazônia',
    budget: 'R$ 480.000,00',
    impactReport: 'Mais de 120 peças catalogadas em 3D, renda média familiar das cooperadas aumentada em 45%, e realização da I Feira Nacional do Barro Marajoara.',
    beneficiariesCount: 420,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
        caption: 'Modelagem manual da argila vermelha com pintura de urucum e caulim.'
      }
    ]
  },
  {
    id: 'prj-2',
    title: 'Circuito Periférico de Audiovisual e Memória Viva',
    subtitle: 'Laboratório itinerante de cinema digital e podcast comunitário em 12 favelas e periferias',
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    description: 'Projeto de formação técnica e exibição pública que leva câmeras cinematográficas 4K, iluminação e mesas de edição de som para jovens de coletivos comunitários, produzindo documentários sobre os mestres e griôs locais.',
    objectives: [
      'Produção e finalização de 12 curtas-metragens documentais autorais',
      'Criação da Mostra Itinerante com tela inflável gigante em praças públicas',
      'Disponibilização de todo o acervo em plataforma de streaming cultural livre'
    ],
    leads: 'Coletivo CineFavela em parceria com a Spcine',
    culturalArea: 'Cinema',
    location: 'Brasilândia, Capão Redondo e Heliópolis',
    state: 'SP',
    region: 'Sudeste',
    status: 'concluido',
    fundingSource: 'Edital de Fomento ao Audiovisual SP / Lei Aldir Blanc',
    budget: 'R$ 350.000,00',
    impactReport: '210 jovens formados com certificado técnico, 12 filmes selecionados para festivais internacionais e audiência estimada de 18 mil pessoas nas praças.',
    beneficiariesCount: 850,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
        caption: 'Exibição ao ar livre de curta-metragem na Praça do Samba.'
      }
    ]
  }
];

export const mockArticles: ArticleItem[] = [
  {
    id: 'art-edit-1',
    title: 'A Poética do Barro: Como os Mestres de Caruaru e do Marajó Transformam a Terra em Memória',
    subtitle: 'Uma imersão antropológica e estética na cerâmica figurativa brasileira que atravessa séculos de resistência',
    coverImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Dr. Tiago Arcoverde',
      role: 'Antropólogo e Crítico Cultural',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    readTime: '7 min de leitura',
    publishedAt: '2026-10-28',
    category: 'Memória & Patrimônio',
    excerpt: 'Da herança dos ceramistas marajoaras até a revolução de Mestre Vitalino no Alto do Moura, a argila é mais do que matéria-prima: é a própria carne da identidade brasileira moldada com água de rio e calor de fogo.',
    content: `
O Brasil é um país que se desdobra em camadas geológicas de cultura. Quando Mestre Vitalino (1909-1963) começou a modelar seus pequenos bois de barro e suas cenas do cotidiano nordestino — os retirantes, a rezadeira, o médico do sertão, o trio de pífanos —, ele não estava apenas criando brinquedos de argila: estava forjando um espelho límpido para um povo que a história oficial tantas vezes insistiu em calar.

No outro extremo do país, nas florestas alagadas do arquipélago do Marajó, arqueólogos e artesãos contemporâneos continuam a desenterrar e reinterpretar as urnas funerárias e tangas de cerâmica polícroma das civilizações pré-colombianas. Os desenhos labirínticos, geométricos e rítmicos da cerâmica marajoara anteciparam em séculos a abstração geométrica moderna do século XX.

Hoje, quando visitamos os ateliês de Cachoeira do Arari no Pará ou os becos do Alto do Moura em Caruaru — considerado pela UNESCO o maior centro de artes figurativas das Américas —, encontramos mestres e mestras jovens trabalhando no mesmo torno rústico, mantendo viva a chama de que a terra nos sustenta e a arte nos eterniza.
    `,
    tags: ['Cerâmica', 'Patrimônio', 'Marajó', 'Caruaru', 'Mestres da Cultura'],
    likesCount: 382
  },
  {
    id: 'art-edit-2',
    title: 'O Som que Emerge do Mangue: 30 Anos do Manifesto Caranguejos com Cérebro',
    subtitle: 'Como o Manguebeat conectou a lama do Capibaribe às redes de dados do mundo inteiro',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Mariana Drummond',
      role: 'Pesquisadora de Música Popular Brasileira',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    readTime: '9 min de leitura',
    publishedAt: '2026-10-15',
    category: 'Música',
    excerpt: 'Engatar uma antena parabólica na lama. A imagem que Chico Science e Fred Zero Quatro projetaram nos anos 90 continua a ser a mais poderosa metáfora de inovação e cosmopolitismo da música brasileira contemporânea.',
    content: `
Em 1992, Recife sangrava econômica e socialmente, rotulada por organismos internacionais como uma das cidades mais estagnadas do continente. Mas debaixo da maré, no lodo fecundo dos manguezais cortados pelos rios Capibaribe e Beberibe, fermentava uma resposta elétrica e furiosa: o movimento Manguebeat.

Ao fundir o toque pesado dos tambores alfaias do maracatu com o peso das guitarras do heavy metal, o balanço do funk de James Brown e a atitude punk, bandas como Nação Zumbi e Mundo Livre S/A sacudiram as estruturas da indústria fonográfica. 

A lição primordial que o mangue nos ensinou — e que ressoa hoje na era dos algoritmos e da inteligência artificial — é que a verdadeira vanguarda nasce da radical fidelidade às próprias raízes.
    `,
    tags: ['Manguebeat', 'Chico Science', 'Música', 'Recife', 'Inovação Cultural'],
    likesCount: 512
  }
];

export const mockOpportunities: OpportunityItem[] = [
  {
    id: 'opp-1',
    title: 'Edital Nacional de Salvaguarda de Mestres e Mestras dos Saberes Tradicionais',
    organization: 'Ministério da Cultura (MinC) & Secretaria de Cidadania e Diversidade Cultural',
    type: 'edital',
    deadline: '2026-12-15',
    budgetOrValue: 'R$ 100.000,00 por mestre selecionado (Total: R$ 15 Milhões)',
    scope: 'Nacional',
    description: 'Reconhecimento formal e apoio financeiro direto a 150 mestres, mestras e griôs de tradição oral das culturas indígena, quilombola, cigana, ribeirinha e popular de todo o território brasileiro.',
    targetAudience: 'Detentores comprovados de saberes tradicionais orais com mais de 25 anos de atuação comunitária.',
    requirements: [
      'Indicação subscrita por comunidade ou coletivo cultural representativo',
      'Histórico de atuação, fotos ou registros audiovisuais dos saberes',
      'Plano de partilha de conhecimento com novas gerações'
    ],
    officialLink: 'https://mapas.cultura.gov.br/editais/mestres-2026',
    status: 'aberto'
  },
  {
    id: 'opp-2',
    title: 'Residência Artística Amazônia Viva & Novas Mídias',
    organization: 'Instituto Goethe & Museu Paraense Emílio Goeldi',
    type: 'residencia',
    deadline: '2026-11-30',
    budgetOrValue: 'Bolsa mensal de R$ 6.500,00 + Passagens e Hospedagem em Belém',
    scope: 'Regional',
    regionTarget: 'Norte',
    description: 'Imersão de 3 meses em Belém e no Parque Nacional do Tapajós para artistas visuais, pesquisadores e programadores criativos que queiram desenvolver obras integrando arte ecológica e tecnologias livres.',
    targetAudience: 'Artistas emergentes e consolidados residentes nos estados da Amazônia Legal.',
    requirements: [
      'Portfólio com até 5 trabalhos anteriores',
      'Carta de intenção de projeto de pesquisa e criação ecológica',
      'Disponibilidade presencial integral de janeiro a março de 2027'
    ],
    officialLink: 'https://goethe.de/brasil/amazonia-viva-residencia',
    status: 'aberto'
  },
  {
    id: 'opp-3',
    title: 'Chamada Pública de Circulação Cênica Nordeste & Centro-Oeste',
    organization: 'Fundação Nacional das Artes (FUNARTE)',
    type: 'chamada_publica',
    deadline: '2026-12-05',
    budgetOrValue: 'Até R$ 180.000,00 por espetáculo selecionado',
    scope: 'Regional',
    regionTarget: 'Nordeste',
    description: 'Apoio à circulação de espetáculos teatrais, circenses e de dança de grupos independentes por pelo menos 6 municípios com menos de 100 mil habitantes.',
    targetAudience: 'Companhias e coletivos cênicos com CNPJ cultural ativo.',
    requirements: [
      'Espetáculo já estreado e com comprovação de crítica/público',
      'Plano pedagógico de oficinas e bate-papos após as apresentações',
      'Acessibilidade em todas as sessões (Libras ou audiodescrição)'
    ],
    officialLink: 'https://funarte.gov.br/editais/circulacao-cenica-2026',
    status: 'aberto'
  }
];

export const mockCollections: CollectionItem[] = [
  {
    id: 'col-1',
    userId: 'user-admin',
    userName: 'Helena Buarque',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    title: 'Rota dos Grandes Teatros Neoclássicos Brasileiros',
    description: 'Um roteiro pelos templos líricos erguidos no século XIX entre a floresta amazônica, o litoral sul e o recife pernambucano.',
    isPublic: true,
    itemsCount: 5,
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-10-20'
  },
  {
    id: 'col-2',
    userId: 'user-common-1',
    userName: 'Rodrigo Santoro Ramos',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    title: 'Celebrações Afro-Brasileiras & Tambores de Resistência',
    description: 'Minha curadoria de cortejos, afoxés, maracatus e congadas imperdíveis de norte a sul.',
    isPublic: true,
    itemsCount: 8,
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-10-25'
  }
];

export const mockReports: ReportItem[] = [
  {
    id: 'rep-1',
    entityId: 'evt-test-spam',
    entityType: 'event',
    entityTitle: 'Festa Privada Comercial em Área de Preservação',
    reportedBy: 'Cidadão Vigilante',
    reason: 'Informações comerciais enganosas / Descumpre as diretrizes culturais',
    details: 'Evento cadastrado como oficina cultural gratuita, mas cobrando ingressos no portão sem alvará.',
    status: 'pendente',
    createdAt: '2026-11-01'
  }
];
