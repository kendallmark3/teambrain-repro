# Claude Code Cheat Sheet



A quick reference guide for developers using **Claude Code CLI** inside repositories and development workflows.



---



# 1. Starting Claude Code



Start an interactive session:



```bash

claude

Run a single prompt and exit:

claude -p "Explain this file"

Continue your previous session:

claude -c









2. Core CLI Commands



Command

Description

claude

Start a new interactive Claude session

claude -p "prompt"

Execute a prompt and exit

claude -c

Continue most recent session

claude --model opus

Select the AI model

claude --append-system-prompt "..."

Add instructions to the default system prompt

claude --system-prompt "..."

Replace the system prompt entirely

claude --allowedTools "Read,Write"

Allow only specific tools

claude --disallowedTools "Write"

Disable specific tools

claude --dangerously-skip-permissions

Skip permission confirmation (use cautiously)

claude --permission-mode plan

Start session in planning mode

claude --remote "Add dark mode"

Start a remote Claude Code session









3. Crucial In-Session Commands





Commands used inside a running Claude session.

Command

Purpose

/help

Show available commands

/model

Change the current AI model

/clear

Clear session context

/compact

Compress context to save tokens

/config

Open settings menu

/context

View context usage

/usage

View plan usage

/init

Analyze project and generate CLAUDE.md

/mcp

View and manage MCP servers

/permissions

View or update permissions

/rewind

Undo to earlier prompt

/statusline

Configure CLI status display

/teleport

Resume a remote Claude session









4. Project Initialization





Initialize Claude for a repository:

/init

This analyzes the repository and creates:

CLAUDE.md

Example generated file:

# CLAUDE.md



Project: Spring Boot Service

Languages: Java, Maven



Structure

- controller/

- service/

- repository/

- config/



Guidelines

- Follow layered architecture

- Use Lombok

- Use REST naming conventions

This file acts as persistent AI context for the project.









5. Keyboard Shortcuts



Shortcut

Function

Shift + Enter

New line

Ctrl + C

Cancel generation

Esc Esc

Undo to previous action

Option + P / Alt + P

Switch modes

Arrow Keys

Cycle through prompts/history

Ctrl + O

Toggle verbose output

Ctrl + B

Move task to background

Ctrl + V / Cmd + V

Paste text or image









6. Configuration Settings





Claude can be configured via JSON settings.



Example configuration:

{

  "permissions": {},

  "model": "opus",

  "alwaysThinkingEnabled": true,

  "hooks": {},

  "env": {

    "IS_DEV": 1

  }

}

Setting

Description

permissions

Control allowed tools

model

Default model for sessions

alwaysThinkingEnabled

Enable deeper reasoning mode

hooks

Automations and event hooks

env

Environment variables applied to sessions









7. Custom Agents





Claude supports custom agents for specialized tasks.



Example:

claude --agent DocsExplorer

Possible agent types:



ArchitectureAgent
SecurityAgent
DevOpsAgent
DocumentationAgent
TestGenerationAgent




Agents allow task-specific workflows across repositories.









8. Recommended Developer Workflow





Initialize the project


/init



Review or edit CLAUDE.md
Use Claude for:






Code generation
Refactoring
Documentation
Architecture review






Use /compact periodically to reduce context usage.










9. Example Use Cases





Explain a file:

claude -p "Explain the architecture of this Spring Boot service"

Refactor code:

Refactor this service into a clean hexagonal architecture.

Generate tests:

Generate unit tests for this controller using JUnit 5 and Mockito.

