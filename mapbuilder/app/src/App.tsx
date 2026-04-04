import { useState, useCallback } from 'react'
import { MapView, LayerVisibility, LayerCounts, LayerLoading } from './components/MapView'
import { LayerToggle } from './components/LayerToggle'
import { Legend } from './components/Legend'

const DEFAULT_VISIBILITY: LayerVisibility = {
  starbucks: true,
  golf: true,
  car: true,
  home: true,
  custom: true,
}

const DEFAULT_COUNTS: LayerCounts = { starbucks: 0, golf: 0, car: 0, home: 0 }
const DEFAULT_LOADING: LayerLoading = { starbucks: true, golf: true, car: true, home: true }

export default function App() {
  const [visibility, setVisibility] = useState<LayerVisibility>(DEFAULT_VISIBILITY)
  const [counts, setCounts] = useState<LayerCounts>(DEFAULT_COUNTS)
  const [loading, setLoading] = useState<LayerLoading>(DEFAULT_LOADING)

  const toggle = (key: keyof LayerVisibility) =>
    setVisibility(v => ({ ...v, [key]: !v[key] }))

  const handleCounts = useCallback((incoming: LayerCounts) => {
    setCounts(prev => ({ ...prev, ...incoming }))
  }, [])

  const handleLoading = useCallback((incoming: LayerLoading) => {
    setLoading(prev => ({ ...prev, ...incoming }))
  }, [])

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-700 shrink-0">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">Luxury Location Intelligence</h1>
          <p className="text-xs text-slate-400">Trump Tower · Chicago, IL · 41.8885° N, 87.6354° W</p>
        </div>
        <div className="text-xs text-slate-500 italic">Intent-Driven Mapping</div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 bg-slate-800 border-r border-slate-700 flex flex-col p-4 gap-2 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Layers</div>
          <LayerToggle label="Starbucks"     color="#16a34a" count={counts.starbucks} enabled={visibility.starbucks} loading={loading.starbucks} onToggle={() => toggle('starbucks')} />
          <LayerToggle label="Golf Courses"  color="#14532d" count={counts.golf}      enabled={visibility.golf}      loading={loading.golf}      onToggle={() => toggle('golf')} />
          <LayerToggle label="Car Dealers"   color="#94a3b8" count={counts.car}       enabled={visibility.car}       loading={loading.car}       onToggle={() => toggle('car')} />
          <LayerToggle label="Luxury Homes"  color="#b45309" count={counts.home}      enabled={visibility.home}      loading={loading.home}      onToggle={() => toggle('home')} />
          <LayerToggle label="Custom Points" color="#2563eb" count={0}               enabled={visibility.custom}    loading={false}             onToggle={() => toggle('custom')} />
          <Legend />
          <div className="mt-auto pt-4 text-[10px] text-slate-600 leading-relaxed">
            Click anywhere on the map to add a custom marker.
          </div>
        </aside>

        {/* Map */}
        <main className="flex-1 relative">
          <MapView
            visibility={visibility}
            onCounts={handleCounts}
            onLoading={handleLoading}
          />
          {/* Footer overlay */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/80 text-slate-400 text-[10px] px-3 py-1 rounded-full backdrop-blur pointer-events-none z-[1000]">
            Generated via Intent-Driven Mapping · Data © OpenStreetMap
          </div>
        </main>
      </div>
    </div>
  )
}
