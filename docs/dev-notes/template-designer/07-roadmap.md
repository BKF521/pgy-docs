# Feature Expansion & Execution Roadmap

This document outlines the current capabilities, prioritized execution strategy, and multi-phase roadmap for the Canvas Template Designer & Output Rendering Engine.

---

## 1. Current System Architecture & Capabilities

### Data Tokens & Tag Identifiers
- **`@system.variable`**: Live system data fields resolved at render runtime (e.g. `@user.score`, `@user.level`, `@user.name`, `@date.today`).
- **`$CanvasTagID`**: Element Tag IDs assigned to individual canvas elements in the designer (e.g. `$A`, `$scoreBadge`, `$statusBox`).
- **`#hexcolor`**: Standard CSS hex color codes (e.g. `#28a745`, `#dc3545`, `#fff3cd`).

### Dynamic System Variable Provider Pattern (Package Ready)
Data variables are defined via the centralized **`TemplateSchemaService`** (`TemplateSchemaService::getDropdownVariables($type)`):
```php
TemplateSchemaService::getDropdownVariables('appointment');
// Returns:
// [
//     'Appointment Data' => [
//         'user.name' => 'Cadre Name (CN)',
//         'position.name' => 'Position Name (CN)',
//         'appointment.year' => 'Appointment Year',
//     ]
// ]
```
The Blade template and React Property Inspector dynamically populate the `<select>` dropdown without hardcoding and expose `window.AVAILABLE_SYSTEM_VARIABLES` to JavaScript for `@` popup autocomplete suggestions.

### Formula & Expression Engine
- **Math Expressions**: `Str(@user.level) * 2 + 5`
- **String Concatenation**: `Str($A) + " - Level " + Str(@user.level)`
- **Literal Quotes**: `'Literal string inside quotes'` or `"Double quote literal"`

### Template Script Tool Commands
| Command | Example | Description |
| :--- | :--- | :--- |
| `HIDE $ID` | `HIDE $elementBox` | Hides the targeted element from visual output. |
| `SHOW $ID` | `SHOW $elementBox` | Forces rendering of a hidden element. |
| `SET $ID COLOR <color>` | `SET $scoreTag COLOR #28a745` | Dynamically overrides element text color. |
| `SET $ID BGCOLOR <color>` | `SET $badgeCard BGCOLOR #d4edda` | Dynamically overrides element background color. |
| `SET $ID VALUE <val>` | `SET $statusText VALUE "PASSED"` | Dynamically overrides element text / content value. |

---

## 2. Prioritized Execution Sequence & Strategic Roadmap

**React + TypeScript Transition** being in Phase 2 avoids building new complex features (like repeaters, rule builders, and AI dialogs) twice in plain DOM JavaScript before re-writing them in React.

```mermaid
graph TD
    P1["Phase 1: TypeScript Core Engine Migration<br/>(Type Safety for Data Models & AST Parser)"] --> P2["Phase 2: Transition Frontend UI to React + TypeScript<br/>(.tsx UI Components in Current Laravel View)"]
    P2 --> P3["Phase 3: Repeater & List Loops (FOR_EACH)<br/>(Dynamic Tables & Repeater Grids)"]
    P3 --> P4["Phase 4: AI Template & Script Generator<br/>(Prompt / Sample Data -> Template JSON via Gemini)"]
    P4 --> P5["Phase 5: Advanced Styling & Visual Rule Builder<br/>(No-Code Rule Builder + Font/Opacity Controls)"]
    P5 --> P6["Phase 6: Standalone Commercial Package & Microservices<br/>(NPM Distribution, Storybook & Headless PDF Docker)"]
```

---

### Phase 1: Immediate Technical Focus — TypeScript Core Engine Migration
* **Goal**: Establish type safety, robust AST testing, and compile-time bug prevention in the core engine before UI refactoring.
* **Compatibility Target**: 100% compatible with existing Exabytes cPanel Shared Hosting (compiled via `npm run build` into static assets).
1. **TypeScript Migration**: Convert core engine JavaScript modules in `resources/js/designer/` to `.ts` (`state.ts`, `ast.ts`, `script.ts`). Define strict interfaces for `CanvasElement`, `CanvasState`, and `ASTNode`.
2. **AST Parser Unit Tests**: Create unit test coverage for the Script Interpreter parser (`HIDE`, `SHOW`, `SET`, logic conditionals) to prevent runtime syntax evaluation bugs. Runs locally during development / CI.
3. **Document/PDF Output**: Maintain current native [render.blade.php] + Browser Print (`window.print()` / `@media print`). Zero extra server packages and zero memory overhead on shared hosting.

---

### Phase 2: Transition Frontend UI to React + TypeScript (`.tsx`)
* **Goal**: Rebuild the frontend UI layer into modern React + TypeScript (`.tsx`) components inside the current Laravel application before adding heavy new feature suites.
* **Compatibility Target**: Mounts seamlessly inside `designer_raw.blade.php` via a single root container `<div id="template-designer-root"></div>`. Vite bundles the React app into static JS/CSS in `public/build/`, which uploads and runs on Exabytes cPanel with zero server Node dependencies.
* **Key Benefits**:
  - Eliminates manual DOM manipulation for complex UI state.
  - Builds reusable component architecture (`<Toolbar />`, `<LayerPanel />`, `<PropertyInspector />`, `<CanvasContainer />`).
  - Keeps props decoupled (`availableVariables`, `initialData`, `onSave`) so future standalone extraction is seamless.

---

### Phase 3: Repeater & List Loops (`FOR_EACH`)
* **Goal**: Enable dynamic repeating grids and tables for invoices, transaction logs, and gallery items directly inside the React element renderer.
* **Syntax Concept**:
  ```text
  FOR_EACH @user.badges {
      CLONE $badgeItemCard
  }
  ```

---

### Phase 4: AI-Powered Template & Script Generator (Killer Feature)
* **Goal**: Allow users to input sample JSON data or a text prompt, producing a complete visual template + conditional script automatically using Gemini API (Structured JSON Mode) via an interactive React AI Modal component.
* **Technical Flow**:
  1. User inputs sample JSON schema or text prompt in React `<AiGeneratorModal />`.
  2. Backend passes JSON schema to Gemini API.
  3. AI returns valid `templateDataJson`.
  4. Designer calls `loadTemplate(json)` to render canvas elements & populates script editor.

---

### Phase 5: Advanced Styling & Visual Rule Builder UI
1. **Advanced Script Commands**: `SET $ID FONTSIZE 18px`, `SET $ID OPACITY 0.5`, `SET $ID BORDER "2px solid #0078d4"`.
2. **Visual Rule Builder**: Drop-down / click-and-select React component (`<RuleBuilder />`) alongside the text script editor (`If [ @user.score ] [ >= ] [ 50 ] -> [ SHOW ] [ $passBadge ]`).
3. **Dynamic Background & Multi-Page Drop Controls**: `SET_BACKGROUND`, `DROP_PAGE`.

---

### Phase 6: Standalone Commercial Packaging & Microservice Infrastructure
* **Goal**: Isolate and package the completed, battle-tested designer into an independent commercial product for NPM distribution, white-label SaaS, or client-side embedding.
* **Timing**: Executed **after** all features in Phases 1–5 are built, tested, and live in the host application.
* **Key Deliverables**:
  1. **NPM Component Distribution**: Package into `@yourbrand/template-designer-react` with TypeScript definitions, clean external props, and Storybook documentation.
  2. **Headless PDF Microservice**: Dedicated Node.js Puppeteer/Browsershot container configured in Docker for high-volume background batch PDF generation.
  3. **Standalone Demo & Sandbox**: Independent test app/documentation site demonstrating the editor embedded in third-party React / Next.js environments without Laravel.

---

## 3. Deployment Environments & Architecture Strategy

| Phase / Feature | Current Exabytes cPanel Shared Hosting (Phases 1–5) | Standalone Commercial Packaging (Phase 6 / Docker) |
| :--- | :--- | :--- |
| **TypeScript Engine (`state.ts`, `ast.ts`)** | ✅ **100% Supported** (compiled to static `.js` during `npm run build`) | ✅ Native TypeScript module export |
| **AST Parser & Interpreter** | ✅ **100% Supported** (evaluates in browser / pure JS) | ✅ Core evaluation engine for any framework |
| **React UI (`.tsx`)** | ✅ **100% Supported** (bundled by Vite, embedded in Blade) | ✅ Distributable React Component (`npm install`) |
| **PDF Rendering** | ✅ **Native Blade + Browser Print** (`window.print()`, 0 server cost) | 🐳 Optional Dockerized Puppeteer microservice for headless batch exports |
| **AI Generator (Gemini)** | ✅ **100% Supported** (standard Laravel HTTP call to Gemini API) | ✅ Standard REST endpoint / API route |

> [!TIP]
> **Can you test and sell this as a separate component using local development & Docker?**
> **Yes, absolutely!** By completing Phases 1–5 with cleanly decoupled props:
> 1. Your production cPanel deployment remains 100% functional, stable, and lightweight (serving only static Vite bundles).
> 2. When moving to Phase 6, you can run a Docker container or standalone Vite project locally to test and distribute the designer as an independent commercial NPM package or SaaS microservice without touching your live cPanel hosting.
