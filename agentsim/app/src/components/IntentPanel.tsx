import { useGraphStore } from '../store/graphStore'
import { PATTERNS, CATEGORY_LABELS, NodeCategory } from '../data/patterns'

const CATEGORY_ORDER: NodeCategory[] = ['trigger', 'process', 'ai', 'integration', 'control', 'output']

const CATEGORY_COLORS: Record<NodeCategory, string> = {
  trigger: '#7c3aed',
  process: '#0891b2',
  ai: '#d97706',
  integration: '#059669',
  control: '#dc2626',
  output: '#16a34a',
}

export function IntentPanel() {
  const { intent, setIntent, addNode } = useGraphStore()

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-2">Intent</h2>
        <textarea
          value={intent}
          onChange={e => setIntent(e.target.value)}
          placeholder={`e.g. "monitor API errors and alert Slack"\n"schedule report and send email"\n"webhook → validate → LLM → respond"`}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-gray-100 placeholder-gray-600 resize-none focus:outline-none focus:border-purple-500"
          rows={4}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Pattern Palette</h2>
        <p className="text-xs text-gray-600 mb-3">Click to add to canvas</p>
        {CATEGORY_ORDER.map(cat => (
          <div key={cat} className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{CATEGORY_LABELS[cat]}</div>
            <div className="flex flex-col gap-1">
              {PATTERNS.filter(p => p.category === cat).map(p => (
                <button
                  key={p.type}
                  onClick={() => addNode(p.type)}
                  style={{ borderLeftColor: CATEGORY_COLORS[cat], borderLeftWidth: 4, background: '#1e1e2e' }}
                  className="text-left px-4 py-3 rounded border border-gray-600 text-sm text-white font-semibold hover:brightness-125 transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
