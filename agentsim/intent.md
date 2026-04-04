🚀 UPGRADED VERSION (Paste THIS into 

Claude Code

)



# Intent → Graph → Code Compiler



## Intent

Build an interactive visual compiler that maps natural language intents into:

1. A DAG (Directed Acyclic Graph) of execution patterns

2. Executable Python pipeline code



Users describe what they want (e.g., "monitor API errors and alert Slack"), and the system:

- Parses intent

- Generates a pipeline graph

- Visualizes it

- Produces working Python code



---



## UI Constraints (Learned)

- React Flow controls AND minimap must be explicitly themed via CSS overrides — default styles are invisible on dark backgrounds. Use: dark bg `#1e1e2e`, purple border `#7c3aed`, purple glow `#7c3aed55`. Apply to `.react-flow__controls`, `.react-flow__controls-button`, `.react-flow__minimap`, `.react-flow__attribution`
- All node backgrounds must use inline `style` not Tailwind classes — React Flow's own stylesheet overrides Tailwind `bg-*` utilities on nodes
- All panel `aside` elements must have explicit `background` set — Tailwind's preflight resets to white

---

## Tech Stack



- Framework: React + TypeScript (Vite preferred)

- Styling: Tailwind CSS (no custom CSS)

- Graph Rendering: React Flow

- State Management: Zustand (lightweight)

- Backend: Optional (Node.js if needed, otherwise client-side only)

- Code Output: Python 3.x (PEP8 compliant)



---



## Architecture Overview



### Core Modules



1. Intent Parser (rule-based, deterministic)

2. Pattern Library (node definitions)

3. Graph Builder (DAG generator)

4. Code Generator (Python templates)

5. UI Layer (React)



---



## Constraints



- Max 50 nodes per graph

- Lazy-load pattern definitions

- No external LLM required (deterministic first)

- WCAG 2.1 AA accessibility

- Keyboard navigable graph interactions

- Responsive layout



---



## Pattern Model



Each node must follow this interface:



```ts

type PatternNode = {

  id: string;

  type: string;

  label: string;

  inputs: string[];

  outputs: string[];

  config?: Record<string, any>;

};









Pattern Library (Initial Set)







Trigger Nodes





api_trigger
webhook_trigger
scheduler






Processing Nodes





transformer
validator
enricher






AI Nodes (stubbed)





llm_prompt
rag_retriever
tool_call






Integration Nodes





rest_call
event_publish






Control Nodes





conditional
retry






Output Nodes





send_email
send_slack
generate_report
return_response










Intent → Pattern Mapping





Implement a simple rule-based parser:



Example rules:



“monitor” → api_trigger
“error” → validator
“alert” or “slack” → send_slack
“email” → send_email
“summarize” → llm_prompt
“report” → generate_report




Example:



Input:

“monitor API errors and alert Slack”



Output Graph:

api_trigger → validator → send_slack









Graph Builder





Build a DAG (no cycles)
Auto-connect nodes in logical sequence
Allow manual editing via UI
Support:
Drag/drop nodes
Connect edges
Delete nodes
Reorder flow











Code Generator





Generate Python code from graph.



Rules:



Each node = function
Maintain execution order
Pass outputs between functions




Example Output:

def api_trigger():

    return {"data": "sample"}



def validate(data):

    return data



def send_slack(data):

    print("Sending to Slack:", data)



def pipeline():

    data = api_trigger()

    validated = validate(data)

    send_slack(validated)



if __name__ == "__main__":

    pipeline()









UI Layout







LEFT PANEL





Intent input box
Pattern palette (draggable nodes)






CENTER PANEL





React Flow canvas
Graph visualization






RIGHT PANEL





Live Python code output
Copy/export button










Interactions





Typing intent auto-generates graph
Editing graph updates code in real time
Clicking node shows config panel
...