interface Props {
  label: string
  color: string
  count: number
  enabled: boolean
  loading: boolean
  onToggle: () => void
}

export function LayerToggle({ label, color, count, enabled, loading, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      style={{ borderLeftColor: color, borderLeftWidth: 3 }}
      className={`w-full text-left px-3 py-2.5 rounded border border-slate-700 text-sm font-medium transition-all ${
        enabled ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400'
      } hover:bg-slate-600`}
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <span className="text-xs">
          {loading ? (
            <span className="text-slate-500">loading…</span>
          ) : (
            <span style={{ color }} className="font-bold">{count}</span>
          )}
        </span>
      </div>
    </button>
  )
}
