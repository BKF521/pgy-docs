# Documentation AI Agent Guidelines (`AGENTS.md`)

This document serves as instructions for AI coding assistants (such as Antigravity, Cursor, Copilot, Claude, Cline, etc.) when generating, editing, or maintaining documentation in this repository.

---

## 1. Repository Nesting & Workspace Structure

Understanding how this documentation repo is positioned in the project workspace:

- **Parent Repository**: The outer directory (e.g. `laravel_project` or `pgy-project`) is the main **PHP Laravel Application source code**.
  - Always reference the parent Laravel codebase for real code, logic, routes, models, views, and controllers. **Do not hallucinate features or APIs.**
- **Child Documentation Repository**: This repository is a Docusaurus site cloned inside the parent project under various possible path structures:
  - Setup Option A: `laravel-project/docs/` (where `docs/docs/` contains the `.md` content files).
  - Setup Option B: `pgy-project/docs/pgy-docs/` (where `pgy-docs/docs/` contains the `.md` content files).
  - Standalone Setup: Can be opened as a root workspace or cloned directly.

> **Key Takeaway for AI**: To locate content Markdown files, look inside the Docusaurus content root directory (the `docs/` subfolder of this repository, which contains `dev-notes`, `arp`, `intro.md`, `placeholder.jpg`, etc.).

---

## 2. Audience Tone & Folder Scope Rules

Tailor the tone and technical depth depending strictly on the target folder inside the content `docs/` directory:

### A. Developer Notes (`/dev-notes/...`)
- **Target Audience**: Software Engineers & Technical Maintainers.
- **Rules**:
  - Expose deep technical details, architecture patterns, frontend/backend module logic, source code snippets, database schemas, and technical terminology. Written in English.
  - Reference actual PHP/Laravel code files in the parent repo (e.g., Controllers, Models, Blade views, Services).

### B. User Manuals & Module Guides (e.g., `/arp/...`, `/am/...`, `/ma/...`, `/em/...`)
- **Target Audience**: Non-tech savvy end-users.
- **Rules**:
  - **Do NOT** use programming jargon, source code snippets, database field names, or internal class names.
  - Use clear, action-oriented, simple language (in Simplified Chinese) explaining *how to complete tasks in the UI*.
  - Focus on step-by-step user workflows (e.g., "Click the 'Submit' button", "Select your department from the dropdown").

---

## 3. Formatting & Visuals Rules

- **Mermaid Diagrams**:
  - Use standard Mermaid syntax (` ```mermaid `). NEVER use ASCII text-block charts.
  - **CRITICAL**: In Mermaid subgraphs or node labels containing special characters, non-English characters (Chinese/Malay), or parentheses `()`, ALWAYS assign an ID and wrap the text in quotes: `subgraph ID["Label Text (Extra)"]`.
- **Docusaurus Admonitions (`:::warning[Title]`, `:::info[Title]`, `:::tip[Title]`)**:
  - ALWAYS wrap the title in square brackets: `:::warning[Title Header]`.
  - ALWAYS leave a blank line right after the opening header AND before the closing `:::` line.
- **Image & Screenshot Placeholders**:
  - Place `placeholder.jpg` using relative paths at specific UI step sections (NOT just a single banner picture at the top).

#### Relative Image Path Examples:
- File location: `docs/intro.md`
  - Reference: `![Screenshot Description](./placeholder.jpg)`
- File location: `docs/dev-notes/working-with-phpword/01-overview.md`
  - Reference: `![Screenshot Description](../../placeholder.jpg)`
- File location: `docs/dev-notes/template-designer/subfolder/detail.md`
  - Reference: `![Screenshot Description](../../../placeholder.jpg)`

---

## 4. DRY (Don't Repeat Yourself) & Cross-Referencing

- Do **NOT** duplicate explanations, workflow steps, or concepts across multiple Markdown files within the same parent folder or module.
- Instead, write the detailed explanation once in its primary home and cross-reference it elsewhere using relative Markdown links:
  - Example: `For details on configuring templates, see [Template Designer Overview](../template-designer/01-overview.md#configuration).`
