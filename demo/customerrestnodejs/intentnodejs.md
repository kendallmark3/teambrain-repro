Here is a Claude Code Intent Markdown file you can drop directly into a repo (for example: intent/create-node-api.md).

It is designed so Claude Code can execute it and generate a fully runnable project with proper Node.js + TypeScript + Express layered architecture and LearnTeachMaster governance cues.



You can paste this exactly as-is.

# Intent: Generate Fully Runnable Node.js TypeScript REST API (Layered Architecture)

## Source Governance
This repository follows governance and architectural guidance from:

- https://www.learnteachmaster.org/
- Intent-driven development model
- Clean layered architecture principles

Claude Code should generate the project in a **production-quality structure** that reflects **enterprise best practices** while remaining **simple enough to run immediately**.

The code must compile and run **without manual fixes**.

---

# Objective

Generate a **fully runnable Node.js REST API using TypeScript and Express** with a **clean layered architecture**.

The API should expose **employee data including skillsets** using **mock data**.

The service must run locally from this directory using:
npm install

npm run dev

And return data from:
GET /api/employees

GET /api/employees/:id

---

# Technical Requirements

## Stack

- Node.js
- TypeScript
- Express
- ts-node-dev
- cors
- dotenv

No databases are required.

Mock data must be used.

---

# Architecture

The project must follow a **layered architecture**:
src/

controllers/

services/

repositories/

dtos/

models/

routes/

config/

data/

middleware/

utils/

Each layer must have **a clear responsibility**.

### Controller Layer
Responsible for:

- handling HTTP requests
- validating parameters
- returning responses

### Service Layer
Responsible for:

- business logic
- orchestration

### Repository Layer
Responsible for:

- retrieving data from mock sources

### DTO Layer
Responsible for:

- defining API response contracts

---

# Folder Structure

Claude Code must generate the following:
.

├── package.json

├── tsconfig.json

├── .env

├── README.md

└── src

├── app.ts

├── server.ts

├── routes

│   └── employeeRoutes.ts

├── controllers

│   └── employeeController.ts

├── services

│   └── employeeService.ts

├── repositories

│   └── employeeRepository.ts

├── dtos

│   └── employeeDto.ts

├── models

│   └── employee.ts

├── data

│   └── mockEmployees.ts

├── config

│   └── env.ts

└── middleware

└── errorHandler.ts

---

# Employee Domain

## Model

Employee should contain:
id

name

title

department

skillsets[]

yearsExperience

location

Example:
{

id: “1”,

name: “Jane Doe”,

title: “Senior Software Engineer”,

department: “Platform Engineering”,

skillsets: [“Node.js”, “TypeScript”, “Kubernetes”, “AWS”],

yearsExperience: 8,

location: “Remote”

}

---

# DTO Contract

Return DTO:
EmployeeDTO

Fields:
id

name

title

department

skillsets

The DTO should **not expose internal model details** beyond what the API needs.

---

# Endpoints

## Get All Employees
GET /api/employees

Response:
[

{

id,

name,

title,

department,

skillsets

}

]

---

## Get Employee By ID
GET /api/employees/:id

Returns single employee DTO.

---

# Mock Data

Mock data should live in:
src/data/mockEmployees.ts

Provide at least **5 employees with different skillsets**.

Example skillsets:
Node.js

React

Java

Spring Boot

Kafka

Kubernetes

AWS

Terraform

Python

AI/ML

---

# Express Application

The Express app must include:
/api/employees

And use:

- JSON middleware
- CORS
- centralized error handler

---

# Scripts

Package.json must include:
dev

build

start

Example:
npm run dev

should start server with:
ts-node-dev

---

# Server Configuration

Default port:
3000

Environment config should support:
PORT

---

# README

Generate a README that explains:

- project architecture
- how to run the server
- API endpoints
- layered architecture overview
- reference to LearnTeachMaster governance model

---

# Success Criteria

Claude Code must generate code that:

1. installs dependencies successfully
2. compiles TypeScript
3. runs locally
4. returns employee mock data
5. follows layered architecture
6. uses DTO mapping
7. requires no manual corrections

---

# Final Instruction to Claude Code

Generate the **entire project structure and all files** in this directory so the API runs immediately.

Do not skip any files.

Ensure code compiles and executes successfully.
