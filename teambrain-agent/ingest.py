from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.core.settings import Settings

# Configure local models — no API keys required
Settings.llm = Ollama(model="llama3")
Settings.embed_model = OllamaEmbedding(model_name="nomic-embed-text")

print("Loading documents...")

documents = SimpleDirectoryReader("data").load_data()

print(f"Loaded {len(documents)} document(s).")
print("Building knowledge index...")

index = VectorStoreIndex.from_documents(documents)

index.storage_context.persist(persist_dir="./storage")

print("Knowledge index created successfully. Run app.py to start the assistant.")
