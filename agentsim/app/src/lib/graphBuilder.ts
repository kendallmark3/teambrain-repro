import { Node, Edge } from '@xyflow/react'
import { PatternDef } from '../data/patterns'

const NODE_WIDTH = 160
const H_GAP = 80
const V_OFFSET = 200

export function buildGraph(patterns: PatternDef[]): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = patterns.map((p, i) => ({
    id: `node-${i}`,
    type: 'patternNode',
    position: { x: i * (NODE_WIDTH + H_GAP) + 40, y: V_OFFSET },
    data: { label: p.label, nodeType: p.type, color: p.color, category: p.category },
  }))

  const edges: Edge[] = []
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      id: `edge-${i}`,
      source: nodes[i].id,
      target: nodes[i + 1].id,
      animated: true,
      style: { stroke: '#7c3aed', strokeWidth: 2 },
    })
  }

  return { nodes, edges }
}
