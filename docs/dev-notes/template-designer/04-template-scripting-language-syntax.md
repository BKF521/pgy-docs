# Template Scripting Language & Grammar Guide

The Template Designer includes an integrated domain-specific scripting language for dynamic conditional visibility, color overrides, and content manipulation during template rendering.

---

## 1. Visual Script Editor Modal

Authors can compose and test conditional script rules directly in the canvas editor:

![Scripting Language Editor Modal](../../placeholder.jpg)

---

## 2. Syntax Overview & Grammar Rules

### Case Sensitivity
- **Keywords & Commands**: **Case-Insensitive** (`if`, `IF`, `else`, `HIDE`, `hide`, `SET`, `set`, `COLOR`, `color`, `AND`, `and`, `OR`, `or`).
- **Tag IDs (`$TagID`)**: **Case-Sensitive** (e.g., `$signStatus` ≠ `$signstatus`).
- **Group Tag IDs (`$GroupTagID`)**: **Case-Sensitive** (e.g., `$headerGroup` ≠ `$HeaderGroup`).
- **System Field Keys (`@field`)**: **Case-Sensitive** (e.g., `@appointment.status` ≠ `@Appointment.Status`).
- **String Comparison Values**: **Case-Sensitive** (e.g., `"accepted"` ≠ `"Accepted"`).

---

## 3. Condition Operators (`AND`, `OR`, Comparison)

### Logical Operators
Both English keywords and standard programming symbols are fully supported:

| Operator | Keywords | Example |
| :--- | :--- | :--- |
| **AND** | `AND`, `and`, `&&` | `@appointment.status == "accepted" AND @appointment.signed_at != ""` |
| **OR** | `OR`, `or`, `\|\|` | `@user.level == "Gold" OR @user.stats.points > 100` |
| **NOT** | `!`, `NOT` | `!(@appointment.status == "declined")` |

### Comparison & Pattern Matching Operators

| Operator | Meaning | Example |
| :--- | :--- | :--- |
| `==` / `IS` | Equals | `@appointment.status == "accepted"` or `@user.role IS "Lead"` |
| `!=` / `IS NOT` | Not Equals | `@appointment.status != "pending"` |
| `>` | Greater Than | `@user.stats.points > 50` |
| `>=` | Greater Than or Equal | `@user.stats.points >= 50` |
| `<` | Less Than | `@user.stats.points < 10` |
| `<=` | Less Than or Equal | `@user.stats.points <= 10` |
| `LIKE` | SQL Pattern Matching (`%` wildcard) | `@appointment.email LIKE "%@gmail.com"` |
| `NOT LIKE` | SQL Negated Pattern Matching | `@appointment.code NOT LIKE "TMP%"` |
| `IS NULL` / `IS EMPTY` | Check if variable is null or empty string | `@appointment.ic_num IS NULL` |
| `IS NOT NULL` / `IS NOT EMPTY` | Check if variable has a valid value | `@appointment.signature IS NOT NULL` |

---

## 4. Variables: System Fields, Canvas Tag IDs & Group Tag IDs

| Variable Type | Prefix | Description | Example |
| :--- | :--- | :--- | :--- |
| **System Data Variable** | `@` | Reads live data injected from Laravel Controller | `@appointment.status`, `@user.name` |
| **Element Canvas Tag ID** | `$` | Refers to an individual element's Tag ID | `$signStatus`, `$dateBox`, `$A` |
| **Group Canvas Tag ID** | `$` | Refers to an entire Layer Group's Tag ID | `$testGroup`, `$headerFolder` |

---

## 5. Supported Action Commands

Commands execute inside the `{ ... }` block when condition evaluates to `true`:

### 1. Element & Group Visibility: `HIDE` / `SHOW`
```js
HIDE $TagID
SHOW $TagID
```
*When targeting a Group Tag ID (`$groupTagId`), the HIDE / SHOW command recursively controls all child elements in that group.*

*Example:*
```js
if (@appointment.status == "accepted") {
  HIDE $testGroup
} else {
  SHOW $testGroup
}
```

### 2. Color & Style Overrides: `SET $TagID COLOR` / `BGCOLOR`
```js
SET $ElementTagID COLOR "#ff0000"
SET $ElementTagID BGCOLOR "#fff3cd"
```

### 3. Text & Value Overrides: `SET $TagID VALUE` / `TEXT`
```js
SET $ElementTagID VALUE "Custom Text Message"
```

---

## 6. Complete Scripting Example

```js
if (@appointment.status == "accepted") {
  HIDE $testGroup
  SHOW $signatureBox
} else if (@appointment.status == "declined") {
  SET $signStatus COLOR "#dc3545"
  SET $signStatus VALUE "Appointment Declined"
  HIDE $signatureBox
} else {
  SET $signStatus COLOR "#ffc107"
  SET $signStatus VALUE "Pending Signature"
}
```

---

## 7. Related Documentation & Guides

- **[Product Overview & 2-JSON Data Fusion Engine](./01-overview.md)** — Architecture and runtime execution flow.
- **[Architecture & Data Placeholders](./02-architecture-and-data-placeholders.md)** — Dot-notation resolution matrix.
- **[List Data & Repeater Elements](./09-list-data-and-repeater-elements.md)** — DataList, ImageList, and SKIP VALUE IF rules.
- **[Frontend Module Architecture](./05-frontend-module-architecture.md)** — Autocomplete script integration details.

