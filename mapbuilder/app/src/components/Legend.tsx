const ITEMS = [
  { color: '#16a34a', label: 'Starbucks' },
  { color: '#14532d', label: 'Golf Course' },
  { color: '#1e293b', label: 'Car Dealer' },
  { color: '#b45309', label: 'Luxury Home' },
  { color: '#2563eb', label: 'Custom Point' },
  { color: '#dc2626', label: 'Center (Trump Tower)' },
]

export function Legend() {
  return (
    <div className="mt-4">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Legend</div>
      <div className="flex flex-col gap-1.5">
        {ITEMS.map(item => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-slate-300">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ background: item.color }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
