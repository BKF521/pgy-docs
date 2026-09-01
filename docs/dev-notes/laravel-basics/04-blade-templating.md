# 04 - Blade Templating Engine

## 🧱 The Modular Blueprint Analogy

Imagine building a modular house with pre-fabricated components.
Instead of building walls, roofs, windows, and doors from scratch for every single room, you create standard master frames (layouts) and plug in custom furniture (views) and light fixtures (components).

**Blade** is Laravel's powerful templating engine. It lets you write clean HTML mixed with dynamic data, reusing master layouts so you never copy-paste header or navbar HTML across 50 pages.

---

## 🔑 Core Blade Directives Cheat Sheet

### 1. Printing Variables Safely
```blade
{{-- XSS Safe output (Escaped automatically) --}}
<h2>{{ $post->title }}</h2>

{{-- Raw output (Use ONLY when rendering trusted HTML content) --}}
<div>{!! $post->html_content !!}</div>
```

### 2. Conditionals (`@if`, `@else`, `@unless`)
```blade
@if($role === 'Admin')
    <span class="badge bg-danger">Admin Access</span>
@elseif($role === 'Staff')
    <span class="badge bg-warning">Staff</span>
@else
    <span class="badge bg-secondary">Member</span>
@endif
```

### 3. Loops (`@foreach`, `@forelse`)
```blade
@forelse($post->materials_links as $name => $link)
    <a href="{{ $link }}" target="_blank" class="btn btn-sm btn-outline-primary">
        📎 {{ $name }}
    </a>
@empty
    <p class="text-muted">No attachments available.</p>
@endforelse
```

### 4. Forms & CSRF Protection (`@csrf`, `@method`)
In HTML, forms only support `GET` and `POST`. Laravel uses `@method` directives and security tokens (`@csrf`) to protect against cross-site attacks:

```blade
<form action="{{ route('posts.store', $event->id) }}" method="POST">
    @csrf {{-- MANDATORY for all POST/PUT/DELETE forms --}}
    
    <textarea name="content" class="form-control"></textarea>
    <button type="submit">Publish Post</button>
</form>
```

---

## 💡 Pro-Tips for Blade in `pgy_project`

1. **Keep Logic in Controller/Model**: Blade should only decide *how to display* data. Complex calculations or DB queries should never be executed inside `.blade.php` files.
2. **Comment Syntax**: Use `{{-- Blade comment --}}` instead of `<!-- HTML comment -->`. Blade comments are stripped before sending HTML to the browser, keeping output clean and preventing sensitive internal hints from leaking to the public DOM.
