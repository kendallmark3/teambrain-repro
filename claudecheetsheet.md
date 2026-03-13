

Claude Code CLI Cheat Sheet

Intent-Driven Engineering Demo Guide

This cheat sheet shows how to use Claude Code inside the VS Code terminal to generate, run, and interact with applications using intent-driven prompts.

⸻

1. Open Claude in VS Code

Open the VS Code terminal.

Run:

claude

You are now in the Claude interactive CLI session.

⸻

2. Ask Claude to Analyze the Project

Claude can immediately understand the repository.

analyze this repository and explain the architecture

or

summarize the project structure


⸻

3. Generate a New Application from Intent

Example prompt:

create a simple React application that simulates rolling dice

Claude will:
	•	create project files
	•	generate components
	•	configure dependencies

⸻

4. Generate a Backend API

Example:

create a Node.js TypeScript REST API that returns sample customer data

Claude will generate:

server/
  src/
    routes/
    controllers/
    models/
  package.json
  tsconfig.json


⸻

5. Install Dependencies

Ask Claude to run installs:

install dependencies

or manually run:

npm install


⸻

6. Run the Backend

npm run dev

or

npm start

Expected output:

Server running on http://localhost:3000


⸻

7. Run the React Frontend

Navigate to the client folder:

cd client

Run:

npm install
npm run dev

Open browser:

http://localhost:5173


⸻

8. Ask Claude to Run the App

Claude can execute commands.

Example:

run the React app and open it in a browser

or

start the backend server


⸻

9. Modify the Application

Example prompts:

add a button to roll two dice instead of one

connect the React app to the backend API


⸻

10. Debug with Claude

Example:

fix any TypeScript errors

or

why is the API not returning data


⸻

11. Generate Documentation

Example:

create README documentation for this project

or

explain how to run this application


⸻

12. Clean Up and Refactor

Example prompts:

refactor this project for better structure

add logging and error handling


⸻

13. Bonus Demo Challenge

Run the Dice Roller app.

If you can capture a screenshot of the dice rolling in the browser, you get bonus points.

⸻

Key Takeaway

Intent-Driven Engineering allows developers to move from:

Manual Coding
     ↓
Intent Definition
     ↓
AI-Generated Working Systems

We didn’t just generate code.
We generated a working system.

⸻

If you’d like, I can also give you a much stronger version engineers LOVE, like:

Claude Power Cheat Sheet

20 Claude CLI commands
10 debugging prompts
10 architecture prompts
10 refactoring prompts

Basically a 1-page “Claude for Engineers” survival guide you could hand to all 50+ repos in your org. 🚀
