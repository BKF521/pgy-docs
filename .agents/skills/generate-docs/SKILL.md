---
name: generate-docs
description: Generate or update Docusaurus Markdown documentation according to project structure, audience tone, Mermaid diagrams, relative placeholder images, and DRY principles.
---

# Skill: Generate Documentation (`generate-docs`)

Use this skill whenever creating or editing Markdown documentation files inside the documentation repo.

## Execution Workflow

1. **Verify Target Audience & Folder**:
   - `docs/docs/dev-notes/` or `docs/pgy-docs/docs/dev-notes/` -> Technical developer tone (expose PHP Laravel code, logic, DB schemas, classes). Written in English.
   - User Guides (`docs/docs/arp/`, `am/`, `ma/`, etc.) -> Non-technical user tone (UI button clicks, workflow steps, simple language). Written in Simplified Chinese.

2. **Source Code Inspection**:
   - Inspect the outer PHP Laravel repository to ensure actual code, route names, and view logic match reality. Do not hallucinate features.

3. **Formatting & Visuals**:
   - Use standard Mermaid (` ```mermaid `) with quoted labels `id["Label Text"]`. Never use ASCII text charts.
   - Docusaurus admonitions MUST use `:::info[Title]` syntax with empty lines around content.
   - Image placeholders must use `![Description](relative/path/to/placeholder.jpg)` relative to the current file location.

4. **DRY & Linking**:
   - Never duplicate information across docs. Cross-reference existing docs using relative Markdown links.
