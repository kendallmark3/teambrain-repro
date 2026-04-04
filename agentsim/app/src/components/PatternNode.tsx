import { Handle, Position } from '@xyflow/react'

interface PatternNodeData {
  label: string
  nodeType: string
  color: string
  category: string
}

export function PatternNode({ data }: { data: PatternNodeData }) {
  return (
    <div
      style={{
        borderColor: data.color,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10,
        background: '#1e1e2e',
        color: '#ffffff',
        padding: '10px 16px',
        minWidth: 150,
        textAlign: 'center',
        boxShadow: `0 0 12px ${data.color}55`,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: data.color, width: 10, height: 10 }} />
      <div style={{ color: data.color, fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4, fontWeight: 600 }}>
        {data.category}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{data.label}</div>
      <Handle type="source" position={Position.Right} style={{ background: data.color, width: 10, height: 10 }} />
    </div>
  )
}
