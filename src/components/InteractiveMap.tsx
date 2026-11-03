import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  MapPin,
  Filter,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { useCultural } from '../context/CulturalContext';
import { BrazilianRegion, CulturalCategory } from '../types';

export const InteractiveMap: React.FC = () => {
  const { events, spaces, openDetailModal } = useCultural();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [selectedRegion, setSelectedRegion] = useState<string>('todas');
  const [selectedType, setSelectedType] = useState<string>('todos');

  // Inicializar Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Evita re-inicialização duplicada

    // Coordenadas centrais do Brasil
    const map = L.map(mapContainerRef.current, {
      center: [-14.235, -51.9253],
      zoom: 4,
      minZoom: 3,
      maxZoom: 18,
      scrollWheelZoom: true
    });

    // Camada de Azulejos com estilo cartográfico elegante (CartoDB Positron / OSM)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Atualizar marcadores conforme os filtros
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // Marcadores de Eventos
    const filteredEvents = events.filter((e) => {
      if (selectedRegion !== 'todas' && e.region !== selectedRegion) return false;
      if (selectedType === 'espacos') return false;
      return true;
    });

    filteredEvents.forEach((evt) => {
      const iconHtml = `
        <div style="background-color: #B84A39; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(184, 74, 57, 0.4); border: 2px solid white; cursor: pointer;">
          <span style="font-size: 14px;">🎭</span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-culture-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([evt.lat, evt.lng], { icon: customIcon });

      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 font-sans';
      popupContent.innerHTML = `
        <div style="width: 220px; font-family: system-ui, sans-serif;">
          <img src="${evt.coverImage}" alt="${evt.title}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <span style="background: #FFF1EE; color: #B84A39; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">
            ${evt.category}
          </span>
          <h4 style="margin: 4px 0 2px 0; font-size: 14px; font-weight: 700; color: #1C1917; line-height: 1.2;">
            ${evt.title}
          </h4>
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #666;">
            📍 ${evt.venueName} — ${evt.city}/${evt.state}
          </p>
          <button id="btn-map-${evt.id}" style="width: 100%; background: #B84A39; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer;">
            Ver Detalhes do Evento
          </button>
        </div>
      `;

      popupContent.querySelector(`#btn-map-${evt.id}`)?.addEventListener('click', () => {
        openDetailModal('event', evt.id);
      });

      marker.bindPopup(popupContent);
      markersGroup.addLayer(marker);
    });

    // Marcadores de Espaços Culturais
    const filteredSpaces = spaces.filter((s) => {
      if (selectedRegion !== 'todas' && s.region !== selectedRegion) return false;
      if (selectedType === 'eventos') return false;
      return true;
    });

    filteredSpaces.forEach((spc) => {
      const iconHtml = `
        <div style="background-color: #1F4E38; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(31, 78, 56, 0.4); border: 2px solid white; cursor: pointer;">
          <span style="font-size: 14px;">🏛️</span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-space-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([spc.lat, spc.lng], { icon: customIcon });

      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 font-sans';
      popupContent.innerHTML = `
        <div style="width: 220px; font-family: system-ui, sans-serif;">
          <img src="${spc.coverImage}" alt="${spc.name}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <span style="background: #E8F5E9; color: #1F4E38; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">
            ${spc.type.toUpperCase()}
          </span>
          <h4 style="margin: 4px 0 2px 0; font-size: 14px; font-weight: 700; color: #1C1917; line-height: 1.2;">
            ${spc.name}
          </h4>
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #666;">
            📍 ${spc.city}/${spc.state} • ${spc.admissionFee}
          </p>
          <button id="btn-spc-${spc.id}" style="width: 100%; background: #1F4E38; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer;">
            Conhecer Espaço Cultural
          </button>
        </div>
      `;

      popupContent.querySelector(`#btn-spc-${spc.id}`)?.addEventListener('click', () => {
        openDetailModal('space', spc.id);
      });

      marker.bindPopup(popupContent);
      markersGroup.addLayer(marker);
    });
  }, [events, spaces, selectedRegion, selectedType, openDetailModal]);

  const resetView = () => {
    mapInstanceRef.current?.setView([-14.235, -51.9253], 4);
  };

  return (
    <div className="space-y-4">
      {/* Barra de Filtros e Legendas do Mapa */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 flex flex-wrap items-center justify-between gap-4">
        {/* Filtro de Regiões */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Região:
          </span>
          {['todas', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'].map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                selectedRegion === reg
                  ? 'bg-[#B84A39] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {reg === 'todas' ? 'Brasil Inteiro' : reg}
            </button>
          ))}
        </div>

        {/* Filtro de Tipo e Botão Centralizar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setSelectedType('todos')}
              className={`px-3 py-1.5 rounded-xl transition ${selectedType === 'todos' ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-100'}`}
            >
              Tudo
            </button>
            <button
              onClick={() => setSelectedType('eventos')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition ${selectedType === 'eventos' ? 'bg-[#B84A39] text-white font-bold' : 'text-stone-600 hover:bg-stone-100'}`}
            >
              <span>🎭 Eventos</span>
            </button>
            <button
              onClick={() => setSelectedType('espacos')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition ${selectedType === 'espacos' ? 'bg-[#1F4E38] text-white font-bold' : 'text-stone-600 hover:bg-stone-100'}`}
            >
              <span>🏛️ Espaços & Museus</span>
            </button>
          </div>

          <button
            onClick={resetView}
            className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 border border-stone-200 transition"
            title="Recentralizar Mapa no Brasil"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Container Leaflet */}
      <div className="relative w-full h-[620px] rounded-3xl overflow-hidden shadow-md border border-stone-300">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating Legend */}
        <div className="absolute bottom-5 left-5 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-stone-200 text-xs space-y-2 pointer-events-auto">
          <span className="font-bold text-stone-700 block font-serif-culture">Legenda do Mapa:</span>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#B84A39] inline-block shadow-xs" />
            <span className="text-stone-600">Eventos & Festejos Populares</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#1F4E38] inline-block shadow-xs" />
            <span className="text-stone-600">Museus, Teatros & Centros Culturais</span>
          </div>
        </div>
      </div>
    </div>
  );
};
