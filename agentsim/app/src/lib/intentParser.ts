import { PATTERNS, PatternDef } from '../data/patterns'

interface Rule {
  keywords: string[]
  type: string
}

const RULES: Rule[] = [
  { keywords: ['schedule', 'cron', 'every', 'interval', 'periodic'], type: 'scheduler' },
  { keywords: ['webhook'], type: 'webhook_trigger' },
  { keywords: ['monitor', 'watch', 'observe', 'poll', 'api', 'trigger', 'start', 'receive'], type: 'api_trigger' },
  { keywords: ['enrich', 'lookup', 'augment', 'additional data'], type: 'enricher' },
  { keywords: ['transform', 'convert', 'parse', 'format', 'map', 'normalize'], type: 'transformer' },
  { keywords: ['error', 'validate', 'check', 'filter', 'verify', 'sanitize'], type: 'validator' },
  { keywords: ['rag', 'retrieve', 'search', 'knowledge', 'vector', 'embed'], type: 'rag_retriever' },
  { keywords: ['summarize', 'analyze', 'classify', 'generate', 'predict', 'ai', 'llm', 'gpt', 'claude', 'intelligent'], type: 'llm_prompt' },
  { keywords: ['tool', 'function call', 'agent tool'], type: 'tool_call' },
  { keywords: ['condition', 'if ', 'when ', 'branch', 'route based', 'switch'], type: 'conditional' },
  { keywords: ['retry', 'fallback', 'resilience', 'backoff'], type: 'retry' },
  { keywords: ['publish', 'emit', 'broadcast', 'kafka', 'event bus'], type: 'event_publish' },
  { keywords: ['call', 'http', 'request', 'endpoint', 'invoke'], type: 'rest_call' },
  { keywords: ['slack', 'alert', 'notify', 'notification', 'message'], type: 'send_slack' },
  { keywords: ['email', 'mail', 'smtp'], type: 'send_email' },
  { keywords: ['report', 'dashboard', 'document'], type: 'generate_report' },
  { keywords: ['respond', 'return', 'response', 'reply', 'output'], type: 'return_response' },
]

export function parseIntent(intent: string): PatternDef[] {
  if (!intent.trim()) return []
  const lower = intent.toLowerCase()
  const seen = new Set<string>()
  const result: PatternDef[] = []

  for (const rule of RULES) {
    if (seen.has(rule.type)) continue
    const matched = rule.keywords.some(kw => lower.includes(kw))
    if (matched) {
      const def = PATTERNS.find(p => p.type === rule.type)
      if (def) {
        seen.add(rule.type)
        result.push(def)
      }
    }
  }

  // Ensure there's always a trigger at the start
  const hasTrigger = result.some(p => p.category === 'trigger')
  if (!hasTrigger && result.length > 0) {
    const trigger = PATTERNS.find(p => p.type === 'api_trigger')!
    result.unshift(trigger)
  }

  return result
}
