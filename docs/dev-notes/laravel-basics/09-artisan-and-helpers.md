# 09 - Artisan CLI & Useful Helper Commands

## 🧰 The Master Swiss Army Knife Analogy

Think of **Artisan** as a master Swiss Army knife or voice assistant for Laravel developers. Instead of manually creating files, writing boilerplate code, or executing complex maintenance tasks, you instruct Artisan via the terminal.

---

## ⚡ Top Artisan Commands for `pgy_project` Developers

### 1. Generating Code Files (Boilerplate Generators)
```bash
# Create a new Controller
php artisan make:controller EventController

# Create a Model along with its Migration file
php artisan make:model Venue -m

# Create a Middleware
php artisan make:middleware CheckEventAccess
```

### 2. Inspecting Routes & Application State
```bash
# List all registered routes in the application
php artisan route:list

# Clear application cache (view, config, route cache) when changes don't show up
php artisan optimize:clear
```

### 3. Interactive Debugging (Tinker)
```bash
php artisan tinker
```
`tinker` opens an interactive PHP shell where you can query database models directly:
```php
> $user = App\Models\User::first();
> $posts = App\Models\Post::where('user_id', $user->id)->get();
```

---

## 💡 Common Helpers Used in `pgy_project`

Laravel provides handy global helper functions:
- `dd($variable)`: **"Dump and Die"** — Prints the variable and immediately stops script execution (great for quick debugging!).
- `logger('Something happened')`: Writes logs to `storage/logs/laravel.log`.
- `now()`: Returns current date/time Carbon instance.
- `session('key')`: Accesses session data.
- `route('route.name', ['id' => 1])`: Generates full URL for named routes.
