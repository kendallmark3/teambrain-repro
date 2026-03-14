Good question — and I want to be very clear here so it works perfectly with Claude Code.

You create exactly ONE markdown file, and paste everything I gave you into that file.

So yes — the entire thing goes into one file.

⸻

Step 1 — Create This File

In your repo create:

CREATE_LTM_CONTENT_ENGINE.md

Paste everything I gave you into that file.

The markdown file is basically instructions for Claude Code to build the project.

⸻

Step 2 — Open Claude Code

Navigate to your repo folder.

Then say to Claude Code:

Read CREATE_LTM_CONTENT_ENGINE.md and implement the project.

Claude Code will then:
	1.	Create folders
	2.	Create Python files
	3.	Install dependencies
	4.	Build the crawler
	5.	Build the index
	6.	Create the article generator

⸻

Step 3 — Run It

Once Claude finishes creating the files, run:

python src/content_engine.py

And it will generate your first article.

Output will appear in:

/articles/

Example:

articles/2026-03-15-intent-driven-devops.md


⸻

What You Do Daily

Every morning:

python src/content_engine.py

Read article → tweak → paste into Wix.

Total time:

2 minutes.

⸻

One Important Fix (Before You Run)

The crawler assumes your blog URLs include:

learnteachmaster.org/blog

If Wix uses a slightly different path, Claude Code will adjust it.

⸻

Why This System Is Actually Powerful

Because the AI will:
	•	read your entire site
	•	understand your terminology
	•	avoid repeating topics
	•	generate SEO-aligned articles

You’re basically building a developer publishing engine.

⸻

One Thing I Recommend Adding Later (Huge SEO Boost)

After version 1 works, we add a Topic Discovery Agent that checks:
	•	Google developer searches
	•	Reddit programming discussions
	•	StackOverflow questions

Then it writes articles answering real developer questions.

That’s how sites get 10k–100k monthly traffic.

⸻

One Last Thing (Important)

Claude Code might slightly improve the code structure when it builds it.

That’s good — let it.

The markdown file is just the blueprint.

⸻

If you want, I can also show you something even better for LearnTeachMaster:

How to turn this into a true AI publishing pipeline where one command generates:

article
diagram
LinkedIn post
Teams announcement
SEO keywords

So one idea becomes 5 pieces of content automatically.

That’s when the site really starts growing fast. 🚀
