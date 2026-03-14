Perfect. What you want is a single intent artifact that Claude Code can read, create a plan from, generate the files, install dependencies, and run the agent.

So the markdown needs to contain:

• clear goal
• project structure
• exact files Claude should generate
• code for those files
• commands to run

This works very well with Claude Code’s “Create Plan → Run Plan” workflow.

Below is a single markdown file you can drop into a repo (for example teambrain-intent.md) and paste directly into Claude Code.

⸻

Claude Code Intent File

# Intent: Build a Local AI Engineering Knowledge Agent

## Objective

Create a lightweight Python AI agent that allows developers to query engineering documentation using natural language.

The system must implement **Retrieval Augmented Generation (RAG)** using:

- LlamaIndex
- Ollama local LLM
- Local markdown documentation

The assistant will index markdown files in a `/data` directory and allow a developer to ask questions about the documentation.

This must run **completely locally with no API keys required.**

---

# Expected Outcome

After generation and setup, the developer should be able to run:

python ingest.py
python app.py

Then interact with the assistant like:

Ask a question: How does the Nautobot to Salesforce integration work?

The assistant should search documentation and generate a contextual answer.

---

# System Requirements

The system must:

- use Python
- use LlamaIndex for RAG
- use Ollama for the LLM
- store vector index locally
- support markdown ingestion
- provide a CLI interactive assistant
- run fully locally

---

# Project Structure

Create the following structure:

teambrain-agent/
    app.py
    ingest.py
    requirements.txt
    data/
        architecture.md

---

# Dependency File

Create `requirements.txt`

llama-index
llama-index-llms-ollama
llama-index-embeddings-ollama
ollama

---

# Document Ingestion Script

Create `ingest.py`

Purpose:
- load markdown files
- create vector embeddings
- build the knowledge index
- store the index locally

Python implementation:

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.core.settings import Settings

# configure models
Settings.llm = Ollama(model="llama3")
Settings.embed_model = OllamaEmbedding(model_name="nomic-embed-text")

print("Loading documents...")

documents = SimpleDirectoryReader("data").load_data()

print("Building knowledge index...")

index = VectorStoreIndex.from_documents(documents)

index.storage_context.persist(persist_dir="./storage")

print("Knowledge index created successfully.")


⸻

AI Assistant Application

Create app.py

Purpose:
	•	load the stored vector index
	•	allow a developer to ask questions interactively
	•	retrieve relevant context
	•	generate answers

Python implementation:

from llama_index.core import StorageContext, load_index_from_storage
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.core.settings import Settings

# configure models
Settings.llm = Ollama(model="llama3")
Settings.embed_model = OllamaEmbedding(model_name="nomic-embed-text")

# load index
storage_context = StorageContext.from_defaults(persist_dir="./storage")
index = load_index_from_storage(storage_context)

query_engine = index.as_query_engine()

print("\nTeamBrain Engineering Assistant Ready\n")

while True:

    question = input("Ask a question: ")

    if question.lower() in ["exit", "quit"]:
        break

    response = query_engine.query(question)

    print("\nAnswer:\n")
    print(response)
    print("\n")


⸻

Example Engineering Document

Create data/architecture.md

# Nautobot to Salesforce Integration

The Nautobot to Salesforce integration is implemented as a Spring Boot microservice.

The service receives webhook events from Nautobot when location data changes.

The microservice transforms the Nautobot data model into the Salesforce location schema.

Kafka is used as the transport layer to guarantee delivery and reliability.

A dead letter queue handles message failures.

Observability is implemented using structured logging and metrics.


⸻

Runtime Instructions

Install Ollama

Install Ollama if not already installed.

https://ollama.ai

Start the model:

ollama run llama3

⸻

Install Python Dependencies

pip install -r requirements.txt

⸻

Build the Knowledge Index

python ingest.py

⸻

Run the AI Assistant

python app.py

⸻

Example Interaction

Ask a question:

How does the Nautobot to Salesforce integration work?

Expected behavior:

The assistant retrieves the relevant document section and produces an explanation grounded in the documentation.

⸻

Success Criteria

The system is successful if:
	1.	Markdown files placed in /data can be indexed
	2.	Developers can ask questions in natural language
	3.	The assistant produces answers based on the documentation
	4.	The system runs locally without external APIs

⸻

Implementation Instructions for Claude Code
	1.	Generate the project structure.
	2.	Create all required files.
	3.	Install dependencies.
	4.	Confirm Ollama connectivity.
	5.	Run ingest.py to build the index.
	6.	Launch the assistant with app.py.

---

# Why This Will Impress in Your Demo

When you run the demo you can say:

> “This entire AI knowledge assistant was generated from one intent file using Claude Code.”

Then run:

python ingest.py
python app.py

Then ask:

How does the Nautobot integration work?

And the system **reasons over documentation in real time**.

That’s the moment where people go:

**“Oh… wow.”**

---

If you want, I can also give you a **10x stronger demo version** that will make the room absolutely silent — because it will:

• index Git repos  
• index Jira tickets  
• answer architecture questions  
• generate code from docs  

…but still run locally.
