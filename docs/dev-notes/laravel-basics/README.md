---
sidebar_position: 0
---

# Laravel Basics & Development Guide

Welcome to the **Laravel Fundamentals Guide** tailored specifically for junior developers working on the `pgy_project` codebase!

This guide breaks down core Laravel concepts using everyday real-world analogies, while referencing actual files and structures from this project (such as [`Post`](file:///c:/Users/User/Desktop/My%20Coding%20Projects/pgy_project/app/Models/Post.php), [`PostController`](file:///c:/Users/User/Desktop/My%20Coding%20Projects/pgy_project/app/Http/Controllers/PostController.php), [`routes/web.php`](file:///c:/Users/User/Desktop/My%20Coding%20Projects/pgy_project/routes/web.php), services, middleware, and Blade views).

---

## 📚 Complete Guide Index

| Topic | Analogy | Real Project Example |
| :--- | :--- | :--- |
| **[01 - MVC Architecture](./01-mvc-architecture.md)** | **The High-End Restaurant**: Customer, Host, Waiter, Kitchen, & Plating. | Request flow through `routes/web.php` to `PostController`. |
| **[02 - Routing & Controllers](./02-routing-and-controllers.md)** | **Traffic Signposts & Airport Gate**: Routing requests & route binding. | [`PostController::show()`](file:///c:/Users/User/Desktop/My%20Coding%20Projects/pgy_project/app/Http/Controllers/PostController.php#L18) and Route Model Binding. |
| **[03 - Eloquent Models & Database](./03-eloquent-and-models.md)** | **The Personal Butler**: Querying DB without writing raw SQL. | [`Post`](file:///c:/Users/User/Desktop/My%20Coding%20Projects/pgy_project/app/Models/Post.php) attributes, `$casts`, relationships, and `booted()` hooks. |
| **[04 - Blade Templating Engine](./04-blade-templating.md)** | **The Modular House Blueprint**: Dynamic HTML rendering with components. | Rendering views using `@if`, `@forelse`, and `@csrf`. |
| **[05 - Middleware & Security](./05-middleware-and-auth.md)** | **The Nightclub Bouncer**: Guarding routes and checking user sessions. | [`EnsureUserIsLoggedIn`](file:///c:/Users/User/Desktop/My%20Coding%20Projects/pgy_project/app/Http/Middleware/EnsureUserIsLoggedIn.php) middleware. |
| **[06 - Services & Dependency Injection](./06-services-and-dependency-injection.md)** | **The Specialist Contractor**: Delegating 3rd party APIs & heavy logic. | Services in [`app/Services`](file:///c:/Users/User/Desktop/My%20Coding%20Projects/pgy_project/app/Services) (`FirebaseService`, `GoogleDriveService`). |
| **[07 - Validation & Form Requests](./07-validation-and-form-requests.md)** | **Airport Customs Baggage Inspection**: Sanitizing user input before DB. | `$request->validate()` rules in controllers. |
| **[08 - Migrations & Database Seeding](./08-migrations-and-seeding.md)** | **Architectural Blueprints & Prefab Furniture**: DB Schema version control. | Database migration files and `php artisan migrate`. |
| **[09 - Artisan CLI & Debugging Helpers](./09-artisan-and-helpers.md)** | **Swiss Army Knife**: Command-line generator and helpers (`dd()`, `tinker`). | Terminal commands and debugging utilities. |

---

## 🎯 Quick Rules of Thumb for `pgy_project`

1. **Keep Controllers Thin**: Business logic belongs in Models or Services (e.g. [`FirebaseService`](file:///c:/Users/User/Desktop/My%20Coding%20Projects/pgy_project/app/Services/FirebaseService.php)). Controllers should only receive requests, trigger actions, and return responses/views.
2. **Never Write Raw SQL unnecessarily**: Use Eloquent query builder methods like `where()`, `find()`, or `firstOrFail()`.
3. **Always Guard Routes with Middleware**: Do not manually check login status inside every controller method; attach middleware in [`routes/web.php`](file:///c:/Users/User/Desktop/My%20Coding%20Projects/pgy_project/routes/web.php).
4. **Always Validate Input**: Validate user input in controller methods or Form Requests before passing data into Eloquent models.
5. **Use Blade Directives**: Use `@if`, `@foreach`, and `@csrf` in views instead of raw PHP tags `<?php ?>`.
