import React, { useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  Users,
  Award,
  AlertTriangle,
  PlusCircle,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  BarChart3,
  Layers,
  Sparkles,
  FileText,
  BadgeCheck
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';
import { BrazilianRegion } from '../types';

export const AdminDashboardView: React.FC = () => {
  const {
    events,
    deleteEvent,
    updateEvent,
    artists,
    toggleVerifyArtist,
    reports,
    resolveReport,
    opportunities,
    openDetailModal,
    showToast
  } = useCultural();

  const [activeTab, setActiveTab] = useState<'kpis' | 'eventos' | 'artistas' | 'moderacao' | 'logs'>('kpis');

  // Métricas calculadas
  const pendingReports = reports.filter((r) => r.status === 'pendente');
  const verifiedArtistsCount = artists.filter((a) => a.verified).length;

  // Distribuição por região
  const regionCount: Record<BrazilianRegion, number> = {
    Norte: events.filter((e) => e.region === 'Norte').length,
    Nordeste: events.filter((e) => e.region === 'Nordeste').length,
    'Centro-Oeste': events.filter((e) => e.region === 'Centro-Oeste').length,
    Sudeste: events.filter((e) => e.region === 'Sudeste').length,
    Sul: events.filter((e) => e.region === 'Sul').length
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner Administrativo */}
      <div className="bg-[#1C1917] text-white p-8 sm:p-10 rounded-3xl border border-stone-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>Módulo de Gestão & Governança Cultural</span>
          </div>
          <h1 className="text-3xl font-serif-culture font-bold">
            Painel de Curadoria & Administração
          </h1>
          <p className="text-stone-400 text-sm max-w-xl">
            Acompanhe métricas em tempo real, modere manifestações cadastradas, conceda selos de validação de mestres e audite solicitações da comunidade.
          </p>
        </div>

        <button
          onClick={() => openDetailModal('createEvent')}
          className="bg-[#B84A39] hover:bg-[#9E392A] text-white px-5 py-3 rounded-2xl text-xs font-bold transition shadow-lg shadow-[#B84A39]/30 flex items-center gap-2 flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Cadastrar Nova Manifestação</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Eventos em Cartaz</span>
            <Calendar className="w-5 h-5 text-[#B84A39]" />
          </div>
          <p className="text-3xl font-bold font-serif-culture text-stone-900">{events.length}</p>
          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
            100% georreferenciados no mapa
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Agentes & Mestres</span>
            <Users className="w-5 h-5 text-[#1F4E38]" />
          </div>
          <p className="text-3xl font-bold font-serif-culture text-stone-900">{artists.length}</p>
          <span className="text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded font-medium">
            {verifiedArtistsCount} com selo de verificação
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Editais Ativos</span>
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold font-serif-culture text-stone-900">{opportunities.length}</p>
          <span className="text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded font-medium">
            Com inscrições abertas
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Denúncias Pendentes</span>
            <AlertTriangle className="w-5 h-5 text-rose-600" />
          </div>
          <p className="text-3xl font-bold font-serif-culture text-stone-900">{pendingReports.length}</p>
          <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
            pendingReports.length > 0 ? 'bg-rose-50 text-rose-800' : 'bg-stone-100 text-stone-600'
          }`}>
            {pendingReports.length > 0 ? 'Atenção requerida' : 'Nenhuma pendência'}
          </span>
        </div>
      </div>

      {/* Navegação entre Abas do Painel */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('kpis')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
            activeTab === 'kpis' ? 'bg-[#1C1917] text-white' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Indicadores & Gráficos</span>
        </button>

        <button
          onClick={() => setActiveTab('eventos')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
            activeTab === 'eventos' ? 'bg-[#1C1917] text-white' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Gerenciar Eventos ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('artistas')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
            activeTab === 'artistas' ? 'bg-[#1C1917] text-white' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Validar Artistas ({artists.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('moderacao')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
            activeTab === 'moderacao' ? 'bg-[#1C1917] text-white' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Moderação & Denúncias ({pendingReports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
            activeTab === 'logs' ? 'bg-[#1C1917] text-white' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Auditoria & LGPD</span>
        </button>
      </div>

      {/* ABA 1: INDICADORES E GRÁFICOS */}
      {activeTab === 'kpis' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Distribuição por Região */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif-culture font-bold text-lg text-stone-900">
              Distribuição Geográfica de Manifestações
            </h3>
            <div className="space-y-3">
              {(Object.keys(regionCount) as BrazilianRegion[]).map((reg) => {
                const count = regionCount[reg];
                const pct = Math.round((count / (events.length || 1)) * 100);
                return (
                  <div key={reg} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-stone-700">
                      <span>Região {reg}</span>
                      <span>{count} eventos ({pct}%)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#B84A39] to-[#D97706] rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estatísticas de Fomento */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif-culture font-bold text-lg text-stone-900">
              Métricas de Participação Social
            </h3>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-400 text-xs font-medium block">Interações & Curtidas</span>
                <span className="text-2xl font-bold font-serif-culture text-stone-900">+4.820</span>
                <span className="text-[10px] text-emerald-700 block mt-1">+18% esta semana</span>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-400 text-xs font-medium block">Rotas Criadas</span>
                <span className="text-2xl font-bold font-serif-culture text-stone-900">128</span>
                <span className="text-[10px] text-stone-500 block mt-1">Coleções públicas</span>
              </div>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed pt-2">
              Os dados são anonimizados e preservam a privacidade dos usuários em total conformidade com a LGPD e a Lei Federal 14.129/2021 de Governo Digital.
            </p>
          </div>
        </div>
      )}

      {/* ABA 2: GERENCIAR EVENTOS */}
      {activeTab === 'eventos' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-serif-culture font-bold text-lg text-stone-900">
              Lista de Manifestações Cadastradas
            </h3>
            <button
              onClick={() => openDetailModal('createEvent')}
              className="bg-[#1F4E38] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-[#183E2D] transition flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Novo Evento</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider border-b border-stone-200">
                <tr>
                  <th className="p-4">Evento</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Local</th>
                  <th className="p-4">Data</th>
                  <th className="p-4">Destaque</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-stone-50 transition">
                    <td className="p-4 font-bold text-stone-900 flex items-center gap-3">
                      <img
                        src={evt.coverImage}
                        alt={evt.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="line-clamp-1">{evt.title}</span>
                    </td>
                    <td className="p-4 text-stone-600">{evt.category}</td>
                    <td className="p-4 text-stone-600">{evt.city}/{evt.state}</td>
                    <td className="p-4 text-stone-600">{evt.startDate}</td>
                    <td className="p-4">
                      <button
                        onClick={() => updateEvent(evt.id, { featured: !evt.featured })}
                        className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                          evt.featured ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {evt.featured ? '★ Em Destaque' : 'Normal'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openDetailModal('event', evt.id)}
                        className="p-1.5 text-stone-500 hover:text-stone-900"
                        title="Ver página"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteEvent(evt.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600"
                        title="Excluir evento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ABA 3: VALIDAR ARTISTAS */}
      {activeTab === 'artistas' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-stone-200">
            <h3 className="font-serif-culture font-bold text-lg text-stone-900">
              Validação de Agentes & Mestres Culturais
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Conceda ou revogue o selo de autenticação oficial para agentes e mestres certificados.
            </p>
          </div>

          <div className="divide-y divide-stone-100">
            {artists.map((art) => (
              <div key={art.id} className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={art.avatar}
                    alt={art.artisticName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-stone-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-stone-900 text-sm">{art.artisticName}</h4>
                      {art.verified && (
                        <BadgeCheck className="w-4 h-4 text-[#1F4E38] fill-emerald-100" />
                      )}
                    </div>
                    <p className="text-xs text-stone-500">
                      {art.name} • {art.city}/{art.state} • {art.categories.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleVerifyArtist(art.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      art.verified
                        ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    {art.verified ? (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Revogar Selo</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Conceder Selo Oficial</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => openDetailModal('artist', art.id)}
                    className="p-2 text-stone-500 hover:text-stone-800"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA 4: MODERAÇÃO DE DENÚNCIAS */}
      {activeTab === 'moderacao' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm space-y-4">
          <div className="p-5 border-b border-stone-200">
            <h3 className="font-serif-culture font-bold text-lg text-stone-900">
              Fila de Moderação e Denúncias de Conteúdo
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Analise relatos da comunidade referentes a eventos falsos, spam ou irregularidades.
            </p>
          </div>

          <div className="p-5 space-y-4">
            {reports.length === 0 ? (
              <p className="text-xs text-stone-500 italic text-center py-8">
                Nenhuma denúncia na fila de moderação no momento.
              </p>
            ) : (
              reports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        rep.status === 'pendente' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {rep.status}
                      </span>
                      <span className="text-xs text-stone-400">Em {rep.createdAt}</span>
                    </div>
                    <h4 className="font-bold text-sm text-stone-900">{rep.entityTitle}</h4>
                    <p className="text-xs text-stone-600">
                      <strong>Motivo:</strong> {rep.reason}
                    </p>
                    <p className="text-xs text-stone-500 italic">{rep.details}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {rep.status === 'pendente' ? (
                      <>
                        <button
                          onClick={() => resolveReport(rep.id, 'resolvido')}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Marcar Resolvido</span>
                        </button>
                        <button
                          onClick={() => resolveReport(rep.id, 'analisado')}
                          className="bg-stone-200 hover:bg-stone-300 text-stone-800 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
                        >
                          Dispensar
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Caso Finalizado
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ABA 5: AUDITORIA E LGPD */}
      {activeTab === 'logs' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif-culture font-bold text-lg text-stone-900">
            Registro de Atividades & Conformidade LGPD
          </h3>
          <div className="space-y-3 font-mono text-xs text-stone-600">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <span>[2026-11-02 20:15:00] Inicialização do Sistema MOSAICO v2.4.0 (Schema v2)</span>
              <span className="text-emerald-700 font-bold">OK</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <span>[2026-11-02 20:20:12] Backup automático do LocalStorage / IndexedDB persistido</span>
              <span className="text-emerald-700 font-bold">OK</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <span>[2026-11-02 20:22:45] Verificação de integridade dos tokens de acessibilidade (WCAG 2.1 AA)</span>
              <span className="text-emerald-700 font-bold">100% PASS</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
