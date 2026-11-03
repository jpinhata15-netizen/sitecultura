# 🎭 MOSAICO — Plataforma Digital da Cultura Brasileira

> **Ecossistema digital de descoberta, valorização, difusão e conexão cultural.**

---

## 📖 Visão Geral

O **MOSAICO** conecta cidadãos, artistas independentes, mestres de saberes tradicionais, produtoras culturais, museus e centros históricos em todas as cinco macrorregiões brasileiras (**Norte, Nordeste, Centro-Oeste, Sudeste e Sul**).

A plataforma conta com:
- **Design Editorial Contemporâneo**: Tipografia de alto impacto (*Playfair Display*, *Fraunces* e *Plus Jakarta Sans*), paleta de cores terrosa e orgânica (*Terracota*, *Ocre Urucum*, *Verde Cerrado*, *Grafite Noite* e *Areia Marfim*).
- **Acessibilidade Universal**: Modos nativos de **Alto Contraste**, **Escala de Fontes (A- / A+)** e **Leitor de Tela por Síntese de Voz** (Web Speech API).
- **Cartografia Cultural**: Mapa georreferenciado interativo com **Leaflet** e OpenStreetMap.
- **Sistema de Perfis RBAC**: Alternador rápido entre Visitante, Cidadão, Artista, Produtor, Instituição, Editor e Administrador Geral.
- **Conformidade LGPD**: Gestão granular de privacidade e exportação de dados em JSON.

---

## 🚀 Módulos da Aplicação

1. **Vitrine Cultural (Home)**: Destaques editoriais das 5 regiões, radar semanal, busca global e carrossel de 16 linguagens culturais.
2. **Explorador Multifacetado**: Filtros por 16 categorias, regiões geográficas, UF e ingressos gratuitos/pagos.
3. **Agenda Cultural**: Visualizações em Lista Editorial, Grade de Calendário e Destaques.
4. **Mapa do Brasil**: Cartografia com pins categorizados e cards dinâmicos.
5. **Artistas & Mestres**: Catálogo de agentes culturais com selo de verificação oficial, prêmios e portfólio.
6. **Espaços & Patrimônio**: Guia de museus, teatros neoclássicos e centros culturais com acessibilidade e visitação.
7. **Projetos de Fomento**: Ações comunitárias com prestação de contas (Lei Paulo Gustavo, Aldir Blanc, Rouanet).
8. **Caderno Editorial**: Ensaios antropológicos e reportagens com tipografia editorial e síntese de voz.
9. **Editais & Oportunidades**: Painel com prazos, orçamentos e formulário de inscrição.
10. **Comunidade & Rotas Culturais**: Criação de coleções pessoais de patrimônio e feed de debates.
11. **Painel de Gestão & Curadoria**: Backoffice com indicadores gráficos, moderação de denúncias e validação de agentes.

---

## 🛠️ Tecnologias

- **Frontend:** React 19, TypeScript, Vite
- **Estilização:** Tailwind CSS v4 com tokens autorais
- **Mapas:** Leaflet, OpenStreetMap
- **Ícones:** Lucide React
- **Armazenamento:** LocalStorage & IndexedDB com conector compatível com Supabase / PostgreSQL

---

## 💻 Como Executar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Compilar para produção
npm run build
```

---

© 2025 MOSAICO — Ecossistema Digital da Cultura Brasileira. Criado em 2025.
