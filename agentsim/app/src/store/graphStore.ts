import { create } from 'zustand'
import { Node, Edge, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from '@xyflow/react'
import { PATTERN_MAP } from '../data/patterns'
import { parseIntent } from '../lib/intentParser'
import { buildGraph } from '../lib/graphBuilder'
import { generatePython } from '../lib/codeGenerator'

interface GraphState {
  intent: string
  nodes: Node[]
  edges: Edge[]
  pythonCode: string
  setIntent: (intent: string) => void
  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  addNode: (nodeType: string) => void
}

export const useGraphStore = create<GraphState>((set, get) => ({
  intent: '',
  nodes: [],
  edges: [],
  pythonCode: '# Type an intent above to generate a pipeline.',

  setIntent: (intent) => {
    const patterns = parseIntent(intent)
    const { nodes, edges } = buildGraph(patterns)
    const pythonCode = generatePython(nodes)
    set({ intent, nodes, edges, pythonCode })
  },

  onNodesChange: (changes) => {
    const nodes = applyNodeChanges(changes, get().nodes)
    set({ nodes, pythonCode: generatePython(nodes) })
  },

  onEdgesChange: (changes) => {
    const edges = applyEdgeChanges(changes, get().edges)
    set({ edges })
  },

  addNode: (nodeType) => {
    const { nodes, edges } = get()
    const newId = `node-${Date.now()}`
    const x = nodes.length * 240 + 40
    const y = 200

    const pattern = PATTERN_MAP[nodeType]
    if (!pattern) return

    const newNode: Node = {
      id: newId,
      type: 'patternNode',
      position: { x, y },
      data: { label: pattern.label, nodeType, color: pattern.color, category: pattern.category },
    }
    const newNodes = [...nodes, newNode]
    const newEdge: Edge | null = nodes.length > 0 ? {
      id: `edge-${Date.now()}`,
      source: nodes[nodes.length - 1].id,
      target: newId,
      animated: true,
      style: { stroke: '#7c3aed', strokeWidth: 2 },
    } : null
    const newEdges = newEdge ? [...edges, newEdge] : edges
    set({ nodes: newNodes, edges: newEdges, pythonCode: generatePython(newNodes) })
  },
}))
