import { Node } from '@xyflow/react'
import { PATTERN_MAP } from '../data/patterns'

export function generatePython(nodes: Node[]): string {
  if (nodes.length === 0) return '# No pipeline defined yet.\n# Type an intent to get started.'

  const lines: string[] = [
    '# Auto-generated pipeline',
    '# Intent → Graph → Code Compiler',
    '',
  ]

  const fnNames: string[] = []

  for (const node of nodes) {
    const nodeType = node.data.nodeType as string
    const pattern = PATTERN_MAP[nodeType]
    if (!pattern) continue
    const fn = pattern.pythonFn
    fnNames.push(fn)
    const hasInput = pattern.inputs.length > 0
    const param = hasInput ? 'data' : ''

    lines.push(`def ${fn}(${param}):`)

    switch (nodeType) {
      case 'api_trigger':
        lines.push(`    """Trigger: poll or receive from an API."""`)
        lines.push(`    return {"event": "api_event", "data": {}}`)
        break
      case 'webhook_trigger':
        lines.push(`    """Trigger: receive an inbound webhook payload."""`)
        lines.push(`    return {"event": "webhook_event", "data": {}}`)
        break
      case 'scheduler':
        lines.push(`    """Trigger: fire on a schedule (cron-style)."""`)
        lines.push(`    return {"event": "scheduled_run", "data": {}}`)
        break
      case 'transformer':
        lines.push(`    """Transform: reshape or normalize the data."""`)
        lines.push(`    return {**data, "transformed": True}`)
        break
      case 'validator':
        lines.push(`    """Validate: assert data meets expected shape."""`)
        lines.push(`    assert data is not None, "Validation failed: data is None"`)
        lines.push(`    return data`)
        break
      case 'enricher':
        lines.push(`    """Enrich: add context from an external lookup."""`)
        lines.push(`    return {**data, "enriched": True}`)
        break
      case 'llm_prompt':
        lines.push(`    """AI: send data to an LLM for analysis or generation."""`)
        lines.push(`    # Replace with real LLM client (e.g. Anthropic, OpenAI)`)
        lines.push(`    return {"result": f"LLM response for: {data}"}`)
        break
      case 'rag_retriever':
        lines.push(`    """AI: retrieve relevant context from a vector store."""`)
        lines.push(`    return {"context": [], "query": data}`)
        break
      case 'tool_call':
        lines.push(`    """AI: invoke a tool/function via an agent."""`)
        lines.push(`    return {"tool_result": None, "input": data}`)
        break
      case 'rest_call':
        lines.push(`    """Integration: make an outbound HTTP request."""`)
        lines.push(`    import urllib.request, json`)
        lines.push(`    # Replace with real endpoint`)
        lines.push(`    return {"status": 200, "body": data}`)
        break
      case 'event_publish':
        lines.push(`    """Integration: publish event to the event bus."""`)
        lines.push(`    print(f"Publishing event: {data}")`)
        break
      case 'conditional':
        lines.push(`    """Control: branch based on a condition."""`)
        lines.push(`    if data.get("condition"):`)
        lines.push(`        return {**data, "branch": "true"}`)
        lines.push(`    return {**data, "branch": "false"}`)
        break
      case 'retry':
        lines.push(`    """Control: retry with exponential backoff."""`)
        lines.push(`    import time`)
        lines.push(`    for attempt in range(3):`)
        lines.push(`        try:`)
        lines.push(`            return data`)
        lines.push(`        except Exception as e:`)
        lines.push(`            time.sleep(2 ** attempt)`)
        lines.push(`    raise RuntimeError("Max retries exceeded")`)
        break
      case 'send_slack':
        lines.push(`    """Output: send a Slack message."""`)
        lines.push(`    print(f"[Slack] {data}")`)
        break
      case 'send_email':
        lines.push(`    """Output: send an email."""`)
        lines.push(`    print(f"[Email] {data}")`)
        break
      case 'generate_report':
        lines.push(`    """Output: generate a structured report."""`)
        lines.push(`    print(f"[Report]\\n{data}")`)
        break
      case 'return_response':
        lines.push(`    """Output: return the final response."""`)
        lines.push(`    return data`)
        break
      default:
        lines.push(`    return data`)
    }
    lines.push('')
  }

  // Pipeline function
  lines.push('')
  lines.push('def pipeline():')
  lines.push('    """Execute the full pipeline in order."""')

  const triggerFns = fnNames.filter((_, i) => nodes[i]?.data.category === 'trigger')
  const nonTriggerFns = fnNames.filter((_, i) => nodes[i]?.data.category !== 'trigger')

  if (triggerFns.length > 0) {
    lines.push(`    data = ${triggerFns[0]}()`)
    for (const fn of nonTriggerFns) {
      const pattern = Object.values(PATTERN_MAP).find(p => p.pythonFn === fn)
      if (pattern && pattern.outputs.length === 0) {
        lines.push(`    ${fn}(data)`)
      } else {
        lines.push(`    data = ${fn}(data)`)
      }
    }
  }

  lines.push('')
  lines.push('')
  lines.push('if __name__ == "__main__":')
  lines.push('    pipeline()')
  lines.push('')

  return lines.join('\n')
}
