export type NodeCategory = 'trigger' | 'process' | 'ai' | 'integration' | 'control' | 'output'

export interface PatternDef {
  type: string
  label: string
  category: NodeCategory
  color: string
  pythonFn: string
  inputs: string[]
  outputs: string[]
}

export const PATTERNS: PatternDef[] = [
  // Triggers
  { type: 'api_trigger',      label: 'API Trigger',      category: 'trigger',     color: '#7c3aed', pythonFn: 'api_trigger',      inputs: [],       outputs: ['data'] },
  { type: 'webhook_trigger',  label: 'Webhook Trigger',  category: 'trigger',     color: '#7c3aed', pythonFn: 'webhook_trigger',  inputs: [],       outputs: ['data'] },
  { type: 'scheduler',        label: 'Scheduler',        category: 'trigger',     color: '#7c3aed', pythonFn: 'scheduler',        inputs: [],       outputs: ['data'] },
  // Processing
  { type: 'transformer',      label: 'Transformer',      category: 'process',     color: '#0891b2', pythonFn: 'transform',        inputs: ['data'], outputs: ['data'] },
  { type: 'validator',        label: 'Validator',        category: 'process',     color: '#0891b2', pythonFn: 'validate',         inputs: ['data'], outputs: ['data'] },
  { type: 'enricher',         label: 'Enricher',         category: 'process',     color: '#0891b2', pythonFn: 'enrich',           inputs: ['data'], outputs: ['data'] },
  // AI
  { type: 'llm_prompt',       label: 'LLM Prompt',       category: 'ai',          color: '#d97706', pythonFn: 'llm_prompt',       inputs: ['data'], outputs: ['result'] },
  { type: 'rag_retriever',    label: 'RAG Retriever',    category: 'ai',          color: '#d97706', pythonFn: 'rag_retrieve',     inputs: ['query'], outputs: ['context'] },
  { type: 'tool_call',        label: 'Tool Call',        category: 'ai',          color: '#d97706', pythonFn: 'tool_call',        inputs: ['data'], outputs: ['result'] },
  // Integration
  { type: 'rest_call',        label: 'REST Call',        category: 'integration', color: '#059669', pythonFn: 'rest_call',        inputs: ['data'], outputs: ['response'] },
  { type: 'event_publish',    label: 'Event Publish',    category: 'integration', color: '#059669', pythonFn: 'event_publish',    inputs: ['data'], outputs: [] },
  // Control
  { type: 'conditional',      label: 'Conditional',      category: 'control',     color: '#dc2626', pythonFn: 'conditional',      inputs: ['data'], outputs: ['true', 'false'] },
  { type: 'retry',            label: 'Retry',            category: 'control',     color: '#dc2626', pythonFn: 'with_retry',       inputs: ['data'], outputs: ['data'] },
  // Output
  { type: 'send_slack',       label: 'Send Slack',       category: 'output',      color: '#16a34a', pythonFn: 'send_slack',       inputs: ['data'], outputs: [] },
  { type: 'send_email',       label: 'Send Email',       category: 'output',      color: '#16a34a', pythonFn: 'send_email',       inputs: ['data'], outputs: [] },
  { type: 'generate_report',  label: 'Generate Report',  category: 'output',      color: '#16a34a', pythonFn: 'generate_report',  inputs: ['data'], outputs: [] },
  { type: 'return_response',  label: 'Return Response',  category: 'output',      color: '#16a34a', pythonFn: 'return_response',  inputs: ['data'], outputs: [] },
]

export const PATTERN_MAP = Object.fromEntries(PATTERNS.map(p => [p.type, p]))

export const CATEGORY_LABELS: Record<NodeCategory, string> = {
  trigger: 'Triggers',
  process: 'Processing',
  ai: 'AI',
  integration: 'Integration',
  control: 'Control',
  output: 'Output',
}
