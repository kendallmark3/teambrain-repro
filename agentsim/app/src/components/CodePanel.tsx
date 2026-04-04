import { useState } from 'react'
import { useGraphStore } from '../store/graphStore'

export function CodePanel() {
  const { pythonCode } = useGraphStore()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(pythonCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Python Output</h2>
        <button
          onClick={copy}
          className="text-xs px-3 py-1 rounded bg-purple-700 hover:bg-purple-600 text-white transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <pre className="p-4 text-xs text-green-300 font-mono whitespace-pre leading-5">{pythonCode}</pre>
      </div>
    </div>
  )
}
