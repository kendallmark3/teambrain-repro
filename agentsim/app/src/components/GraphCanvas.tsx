import { ReactFlow, Background, Controls, MiniMap, NodeTypes } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useGraphStore } from '../store/graphStore'
import { PatternNode } from './PatternNode'

const nodeTypes: NodeTypes = {
  patternNode: PatternNode as unknown as NodeTypes[string],
}

export function GraphCanvas() {
  const { nodes, edges, onNodesChange, onEdgesChange } = useGraphStore()

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        style={{ background: '#0f0f1a' }}
      >
        <Background color="#1e1e2e" gap={20} />
        <Controls style={{ background: '#1e1e2e', border: '1px solid #2d2d44' }} />
        <MiniMap style={{ background: '#1e1e2e' }} nodeColor={(n) => (n.data as { color: string }).color ?? '#7c3aed'} />
      </ReactFlow>
    </div>
  )
}
