Now we’re stepping into enterprise-grade intent — this is exactly the right move.



You’re not demoing a toy anymore…

You’re showing:



“Given intent → a production-style backend emerges.”









🔥 Your 

JAVA SPRING BOOT INTENT FILE (Claude-ready)





This is a single markdown file you paste into Claude Code.

It will generate + run a layered Spring Boot API.







# 🎯 INTENT: Enterprise Customer API (Spring Boot, Java 21)



## 🧠 Objective

Create a **production-style Spring Boot REST API** that demonstrates layered enterprise architecture generated entirely from intent.



This is a **demo artifact** to showcase:

- Intent-driven engineering

- Enterprise backend generation

- Clean architecture (Controller → Service → Repository → DTO)



---



## ⚙️ Tech Stack



- Java 21 (fallback: Java 17 if needed)

- Spring Boot (latest stable)

- Maven project

- REST API

- Runs on port 8080



---



## 🧱 Architecture Requirements



Generate a clean layered structure:

com.example.customerapi

├── controller

│     └── CustomerController.java

├── service

│     └── CustomerService.java

├── repository

│     └── CustomerRepository.java

├── model

│     └── Customer.java

├── dto

│     └── CustomerDTO.java

├── config

│     └── AppConfig.java

└── CustomerApiApplication.java

---



## 📦 Domain Model



### Customer

Fields:

- id (Long)

- firstName (String)

- lastName (String)

- email (String)



---



## 🔁 DTO Mapping



- Create `CustomerDTO`

- Do NOT expose entity directly

- Map:

  - id

  - fullName (firstName + lastName)

  - email



---



## 🗄️ Repository Layer (Mocked)



- No database required

- Use in-memory list



Example behavior:

- Preload 3–5 customers

- Return all customers

- Optional: findById



---



## ⚙️ Service Layer



Responsibilities:

- Fetch data from repository

- Transform to DTO

- Apply clean separation of concerns



---



## 🌐 Controller Layer



Expose endpoints:



### 1. Get All Customers

GET /api/customers

### 2. Get Customer by ID

GET /api/customers/{id}

Return JSON responses



---



## ⚙️ Configuration



- Use `application.properties`

- Set server port = 8080

- Basic app name config



---



## 🚀 Build & Run Requirements



Ensure the system supports:



```bash

mvn clean install

mvn spring-boot:run

App runs at:

👉 http://localhost:8080









🧪 Test Endpoint





After startup:



👉 http://localhost:8080/api/customers



Expected:



JSON array of customers
Clean DTO format










🎤 Demo Narrative (CRITICAL)





This system must support this explanation:



“We are not scaffolding manually anymore.”



“We define intent — structure, layers, behavior…”



“And the system generates a production-ready API.”



After running:



“Controller, service, repository, DTO — all created from intent.”



“This is enterprise acceleration — not just code generation.”









🧠 Design Principles





This is NOT:



A quick script
A flat controller




This IS:



Layered architecture
Enterprise-ready structure
Clean separation of concerns










🔥 Output Requirements





Generate:



Full Maven project
All Java classes implemented
Proper package structure
Mock data included
DTO mapping logic implemented
Clean, readable code










🧨 Stretch Goal (if capable)





Add basic logging
Add @Configuration class
Add simple exception handling










✅ Definition of Done





Project builds successfully
App starts without errors
Endpoints return expected JSON
Code structure reflects enterprise standards










🚀 Final Instruction





Create the full project now.



Generate all files
Install dependencies
Run the application




Do not ask questions.

Do not simplify.



Build the system.

---



# ⚡ How you use this (exact flow)



### In Claude Code:



1. Paste this file

2. Say:

   > **“Execute this intent”**



3. It will:

   - Generate full Spring Boot project

   - Build it