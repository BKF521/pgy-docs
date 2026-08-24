# PHPWord Document Templates Overview

The application uses **PHPWord `TemplateProcessor`** (`phpoffice/phpword`) to process pre-formatted Microsoft Word (`.docx`) templates, populate variable placeholders, inject base64 signatures, and export official PDF/DOCX documents across multiple core modules.

---

## 1. Primary Use Cases & Module Integrations

PHPWord `.docx` templates are deployed in 3 main system workflows:

| Module | Use Case / Feature | Controller & Routes | Document Output |
| :--- | :--- | :--- | :--- |
| **1. Public Event Registration** | **Signed Parent Acknowledgment Letter** | `PublicEventController::previewAcknowledgeLetter`, `generateParentLetterPdf` | Signed parent permission & emergency contact acknowledgment letter. |
| **2. JYT Appointment System** | **Signed Appointment Letter** | `JytManagementController::previewLetterPdf` | Formal cadre appointment letter with digital signature & seal. |
| **3. ARP (Anugerah Remaja Perdana)** | **Participant Logbook & Report Export** | `ArpDashboardController::downloadExport`, `ArpExportRequest` | Complete participant activity logbook, photo walls, and report export. |

---

## 2. Technical Architecture & Key Concepts

- **Master `.docx` Template**: Designers edit standard Word documents (`.docx`) containing placeholder variables enclosed in `${...}` syntax (e.g. `${participant_name}`, `${ic_number}`, `${member_signature}`).
- **`TemplateProcessor` Engine**: PHPWord loads the `.docx` file, parses the internal `document.xml` structure, replaces variable tags, clones table rows dynamically, and injects binary image streams (such as base64 signatures decoded to temporary PNG files).
- **Client-Side & PDF Rendering**:
  - Web previewing: Served to `resources/views/common/docx-preview.blade.php` using `docx-preview` / `docx.renderAsync()`.
  - Direct downloads: Exported as processed `.docx` files or rendered to PDF via browser print / LibreOffice engine.
