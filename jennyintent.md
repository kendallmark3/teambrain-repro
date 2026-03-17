Perfect — here is your clean, copy-ready markdown file exactly as you should save it.

👉 Save this as: intent.md
👉 Drop it in your jenny/ folder
👉 Feed it directly into Claude Code

⸻


# Jenny v1 — Autonomous Content Assistant (LearnTeachMaster)

## Objective

Build a simple Python-based local application called "Jenny" that:

1. Pulls trending topics from the internet (via RSS feeds)
2. Analyzes them in context of Intent-Driven Engineering (IDE)
3. Identifies a relevant article idea for LearnTeachMaster
4. Generates a markdown article in Mark Kendall’s voice and structure
5. Saves the article locally to `/output`
6. (Optional) prints or emails the article for approval

This is a **simple POC**. No overengineering.

---

## Constraints

- Must run locally via Python (3.10+)
- Must be executable from VS Code terminal
- Use minimal dependencies
- Use OpenAI API (user will provide key via environment variable)
- No databases — use files only
- Keep code clean, readable, and modular

---

## Project Structure

Create the following structure:

jenny/
├── main.py
├── config.py
├── agents/
│   ├── research_agent.py
│   ├── insight_agent.py
│   ├── article_agent.py
├── services/
│   ├── rss_service.py
│   ├── llm_service.py
├── memory/
│   ├── jenny.intent.md
│   ├── mark.voice.md
│   ├── site.memory.json
├── output/
│   └── (generated articles)
├── requirements.txt
└── README.md

---

## Functional Requirements

### 1. RSS Research (Research Agent)

Fetch trending topics using RSS feeds:

- https://news.google.com/rss/search?q=AI+software+engineering
- https://news.google.com/rss/search?q=developer+tools
- https://news.google.com/rss/search?q=AI+agents

Extract:
- Title
- Summary
- Link

Return top 10–15 items.

---

### 2. Insight Generation (Insight Agent)

Using LLM:

Input:
- RSS topics
- site.memory.json
- jenny.intent.md

Output:
- Key trend
- Gap/opportunity
- Recommended article title

Prompt should emphasize:
- Intent-Driven Engineering
- Thought leadership
- Differentiation (not generic summaries)

---

### 3. Article Generation (Article Agent)

Generate markdown article using:

Structure:

Title

Intro

What Is X?

Main Explanation

Why It Matters

Key Takeaways

Tone:
- Grounded
- Experienced
- No hype
- Reflective
- Practical

Must sound like Mark Kendall.

---

### 4. Output

- Save article as:

output/YYYY-MM-DD-article.md

- Also print to console

---

### 5. Optional Email (Stub)

Add placeholder function:

```python
def send_email(article_text):
    print("Email sending not configured yet.")


⸻

LLM Integration

Use OpenAI API.

Environment variable:

OPENAI_API_KEY=your_key_here

Model:
	•	gpt-4o-mini (or equivalent lightweight model)

Create reusable LLM service.

⸻

Memory Files

memory/jenny.intent.md

You are Jenny, assistant to Mark Kendall.

Your mission:
- Monitor industry trends
- Strengthen LearnTeachMaster authority
- Identify gaps in thinking
- Propose meaningful articles

Rules:
- Avoid generic AI content
- Focus on insight, not summaries
- Think like an architect, not a marketer


⸻

memory/mark.voice.md

Writing Style:

- Grounded and experienced
- No hype or buzzwords
- Clear and structured thinking
- Reflective and practical
- Speaks to engineers, Scrum Masters, and leaders

Structure:

Title → Intro → What Is X → Explanation → Why It Matters → Key Takeaways

Philosophy:

- Intent > Prompt
- Architecture > Code
- Thinking > Tools


⸻

memory/site.memory.json

{
  "topics_written": [
    "Intent-Driven Engineering",
    "Agentic Workflows",
    "Cognitive Delivery"
  ],
  "positions": [
    "Intent over prompts",
    "Architecture drives outcomes",
    "AI accelerates but does not replace thinking"
  ]
}


⸻

Main Execution Flow

In main.py:

1. Fetch RSS topics
2. Generate insight
3. Generate article
4. Save article
5. Print result


⸻

Requirements

Create requirements.txt:

openai
feedparser
python-dotenv


⸻

README Instructions

Setup

pip install -r requirements.txt

Set API key:

export OPENAI_API_KEY=your_key_here

Run:

python main.py


⸻

Success Criteria
	•	Running python main.py generates a full markdown article
	•	Article reflects current trends
	•	Article matches Mark Kendall voice and structure
	•	File saved in /output

⸻

Keep It Simple

Do NOT:
	•	Add databases
	•	Add frameworks
	•	Add UI
	•	Add scheduling yet

Just make it work.

⸻

Final Instruction

Generate all files with working code.

Ensure:
	•	No missing imports
	•	Clean modular structure
	•	Runs without errors

This is Jenny v1.

Build it.

---

# 🔥 That’s it

No fluff. No gaps. This will **actually run**.

---

# ⚡ What to do right now

1. Create folder: `jenny`
2. Save this as `intent.md`
3. Open Claude Code
4. Say:

> “Build this project from intent.md”

---

When it runs and generates your **first article**, come back.

That’s when we:
- tighten Jenny’s brain  
- improve signal quality  
- make her sound *exactly like you*

You’re about to flip the switch on something big.
