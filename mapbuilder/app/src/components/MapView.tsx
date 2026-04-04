import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { haversineDistance } from '../utils/distance'
import { fetchCafes, fetchGolfCourses, fetchCarDealers, fetchLuxuryHomes, OverpassNode } from '../services/overpass'

const CENTER: [number, number] = [41.8885, -87.6354]

function makeIcon(color: string, symbol: string) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:28px;height:28px;border-radius:50%;
      background:${color};border:2px solid white;
      display:flex;align-items:center;justify-content:center;
      font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,0.4);
      cursor:pointer;
    ">${symbol}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  })
}

const ICONS = {
  starbucks:  makeIcon('#16a34a', '☕'),
  golf:       makeIcon('#14532d', '⛳'),
  car:        makeIcon('#1e293b', '🚗'),
  home:       makeIcon('#b45309', '🏠'),
  custom:     makeIcon('#2563eb', '📍'),
  center:     makeIcon('#dc2626', '★'),
}

function popupContent(name: string, type: string, lat: number, lon: number) {
  const dist = haversineDistance(CENTER[0], CENTER[1], lat, lon).toFixed(2)
  return `
    <div>
      <div style="font-weight:700;font-size:14px;margin-bottom:4px">${name}</div>
      <div style="color:#94a3b8;font-size:12px">${type}</div>
      <div style="color:#7c3aed;font-size:12px;margin-top:4px">${dist} mi from Trump Tower</div>
    </div>`
}

export interface LayerVisibility {
  starbucks: boolean
  golf: boolean
  car: boolean
  home: boolean
  custom: boolean
}

export interface LayerCounts {
  starbucks: number
  golf: number
  car: number
  home: number
}

export interface LayerLoading {
  starbucks: boolean
  golf: boolean
  car: boolean
  home: boolean
}

interface Props {
  visibility: LayerVisibility
  onCounts: (c: LayerCounts) => void
  onLoading: (l: LayerLoading) => void
}

export function MapView({ visibility, onCounts, onLoading }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const layersRef = useRef<Record<string, L.LayerGroup>>({})
  const onCountsRef = useRef(onCounts)
  const onLoadingRef = useRef(onLoading)
  const [customPoints, setCustomPoints] = useState<Array<{ lat: number; lon: number; label: string }>>([])

  // Keep refs up to date so the init effect can call latest callbacks without re-running
  useEffect(() => { onCountsRef.current = onCounts }, [onCounts])
  useEffect(() => { onLoadingRef.current = onLoading }, [onLoading])

  // Init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    const map = L.map(containerRef.current, { center: CENTER, zoom: 13 })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Center marker
    L.marker(CENTER, { icon: ICONS.center })
      .addTo(map)
      .bindPopup('<div style="font-weight:700">Trump Tower Chicago</div><div style="color:#94a3b8;font-size:12px">41.8885° N, 87.6354° W</div>')

    mapRef.current = map

    // Click to add custom point
    map.on('click', (e: L.LeafletMouseEvent) => {
      const label = window.prompt('Label for this point:')
      if (!label) return
      setCustomPoints(prev => [...prev, { lat: e.latlng.lat, lon: e.latlng.lng, label }])
    })

    // Init layer groups
    layersRef.current = {
      starbucks: L.layerGroup().addTo(map),
      golf:      L.layerGroup().addTo(map),
      car:       L.layerGroup().addTo(map),
      home:      L.layerGroup().addTo(map),
      custom:    L.layerGroup().addTo(map),
    }

    // Fetch all layers
    const loadLayer = async (
      key: keyof LayerCounts,
      fetcher: () => Promise<OverpassNode[]>,
      icon: L.DivIcon,
      typeLabel: string
    ) => {
      onLoadingRef.current({ starbucks: false, golf: false, car: false, home: false, [key]: true } as LayerLoading)
      try {
        const nodes = await fetcher()
        const group = layersRef.current[key]
        group.clearLayers()
        nodes.forEach(n => {
          const name = n.tags?.name ?? typeLabel
          L.marker([n.lat, n.lon], { icon })
            .bindPopup(popupContent(name, typeLabel, n.lat, n.lon))
            .addTo(group)
        })
        onCountsRef.current({ starbucks: 0, golf: 0, car: 0, home: 0, [key]: nodes.length } as LayerCounts)
      } catch {
        // silently fail — Overpass may rate-limit
      } finally {
        onLoadingRef.current({ starbucks: false, golf: false, car: false, home: false, [key]: false } as LayerLoading)
      }
    }

    loadLayer('starbucks', fetchCafes,        ICONS.starbucks, 'Coffee / Starbucks')
    loadLayer('golf',      fetchGolfCourses,  ICONS.golf,      'Golf Course')
    loadLayer('car',       fetchCarDealers,   ICONS.car,       'Car Dealer')
    loadLayer('home',      fetchLuxuryHomes,  ICONS.home,      'Luxury Home')

    return () => { map.remove(); mapRef.current = null }
  }, [])

  // Sync visibility
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    Object.entries(visibility).forEach(([key, visible]) => {
      const layer = layersRef.current[key]
      if (!layer) return
      if (visible) map.addLayer(layer)
      else map.removeLayer(layer)
    })
  }, [visibility])

  // Custom points
  useEffect(() => {
    const group = layersRef.current['custom']
    if (!group) return
    group.clearLayers()
    customPoints.forEach(p => {
      L.marker([p.lat, p.lon], { icon: ICONS.custom })
        .bindPopup(popupContent(p.label, 'Custom Point', p.lat, p.lon))
        .addTo(group)
    })
  }, [customPoints])

  return <div ref={containerRef} className="w-full h-full" />
}
