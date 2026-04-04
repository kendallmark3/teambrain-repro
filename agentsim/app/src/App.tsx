import { IntentPanel } from './components/IntentPanel'
import { GraphCanvas } from './components/GraphCanvas'
import { CodePanel } from './components/CodePanel'

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-[#0f0f1a] text-gray-100">
      <header className="flex items-center gap-3 px-5 py-3 border-b border-gray-800 shrink-0">
        <span className="text-purple-400 font-bold tracking-tight">AgentSim</span>
        <span className="text-gray-600 text-xs">Intent → Graph → Code</span>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 shrink-0 border-r border-gray-800 overflow-hidden flex flex-col bg-[#0f0f1a]">
          <IntentPanel />
        </aside>
        <main className="flex-1 overflow-hidden">
          <GraphCanvas />
        </main>
        <aside className="w-80 shrink-0 border-l border-gray-800 overflow-hidden flex flex-col bg-[#0f0f1a]">
          <CodePanel />
        </aside>
      </div>
    </div>
  )
}
