from llama_index.core import StorageContext, load_index_from_storage
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.core.settings import Settings
import os

# Configure local models — no API keys required
Settings.llm = Ollama(model="llama3")
Settings.embed_model = OllamaEmbedding(model_name="nomic-embed-text")

if not os.path.exists("./storage"):
    print("No index found. Run ingest.py first to build the knowledge index.")
    exit(1)

# Load the persisted vector index
storage_context = StorageContext.from_defaults(persist_dir="./storage")
index = load_index_from_storage(storage_context)

query_engine = index.as_query_engine()

print("\nTeamBrain Engineering Assistant Ready")
print("Type 'exit' or 'quit' to stop.\n")

while True:
    question = input("Ask a question: ").strip()

    if not question:
        continue

    if question.lower() in ["exit", "quit"]:
        print("Goodbye.")
        break

    response = query_engine.query(question)

    print("\nAnswer:\n")
    print(response)
    print()
