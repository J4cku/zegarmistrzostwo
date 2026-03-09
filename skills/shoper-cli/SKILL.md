---
name: shoper-cli
description: |
  **Shoper Storefront CLI**: Manage and customize Shoper e-commerce store themes via the Shoper CLI. Covers authentication, theme pull/push workflows, Twig template editing, LESS/CSS styling, custom module creation, macro development, and Object API usage.
  - MANDATORY TRIGGERS: Shoper, shoper cli, storefront, theme push, theme pull, twig template, shoper store, sklep, custom.less, shoper module, SVE, Shoper Visual Editor, shoparena
  - Use this skill whenever the user wants to: customize a Shoper store theme, push/pull theme files, edit Twig templates or LESS styles, create custom modules or macros, work with the Shoper Object API, or do anything involving the Shoper Storefront platform
  - Also trigger when the user mentions their Shoper store URL (e.g., *.shoparena.pl) or asks about Shoper storefront architecture
---

# Shoper CLI — Theme Development Skill

This skill enables you to work with the Shoper Storefront CLI to customize e-commerce store themes. The Shoper platform uses **Twig templates**, **LESS/CSS**, and a **modular component system** — all manageable from the command line.

## Quick Reference: CLI Commands

### Authentication
```bash
shoper auth add-token          # Add and save a new auth token (generated in Shoper admin panel)
shoper auth list-tokens        # List saved tokens
shoper auth switch-token       # Set active token
shoper auth remove-token [id]  # Delete a token
shoper auth logout             # Remove all tokens
```

A token is created in the Shoper admin panel under **Configuration > Appearance** with read/add/edit/remove permissions. Each token has an assigned lifespan and can be revoked from the panel at any time.

### Theme Operations
```bash
shoper theme list              # List all themes (ID, name, status)
shoper theme info [id]         # Show theme details
shoper theme init [id]         # Duplicate a theme (can't edit defaults — clone first)
shoper theme pull [id]         # Download theme files to local directory
shoper theme push              # Upload local changes to the store (run from inside theme dir)
shoper theme verify            # Validate theme structure
shoper theme delete [id]       # Permanently delete a theme on the server
```

### General
```bash
shoper help                    # Show help
shoper update                  # Update CLI to latest version
shoper version                 # Show CLI version
```

**System requirements:** Node.js ≥ 21.19.5, access to Shoper store with Configuration (appearance) permissions.

## Core Workflow

The development loop is: **pull → edit → push → preview**

```bash
# 1. List themes to find the one you want to work with
shoper theme list

# 2. Clone the theme (you cannot edit the default theme directly)
shoper theme init [theme-id]

# 3. Pull the cloned theme locally
shoper theme pull [new-theme-id]
# Creates: {ID}_{Theme-name}_{timestamp}/

# 4. Edit files (see sections below)

# 5. Push changes back to the store
cd {theme-directory}
shoper theme push
# IMPORTANT: You must be inside the theme directory when running push

# 6. Verify structure is correct
shoper theme verify
```

## Theme Directory Structure

```
{theme-dir}/
├── macros/              # Macro files (Twig reusable components)
│   └── custom/          # YOUR custom macros go here (.twig files)
├── modules/             # Module directories
│   └── {module-name}/
│       ├── module.twig       # Module template
│       ├── module.js         # Module JavaScript
│       ├── schema.json       # Configuration schema for SVE
│       ├── settings.json     # Current config values
│       └── translations.json # i18n translations
├── settings/
│   ├── details.json     # Theme name and description
│   ├── schema.json      # Theme-level config schema for SVE
│   └── thumbnail.jpg    # Theme thumbnail for admin panel
└── styles/
    ├── custom.less      # YOUR custom CSS/LESS overrides
    ├── schema.json      # Colors & styles schema for SVE
    ├── settings.json    # Current style config values
    └── src/             # Base LESS files (read-only)
```

## Styling with LESS/CSS

The primary way to customize a theme's appearance is through `styles/custom.less`. This is the equivalent of a "custom CSS" tab in the Shoper admin.

### Accessing System & Theme Variables in LESS

```less
// System variables (built-in, read-only)
footer {
  background-color: @primaryColor;          // System variable
}

// Theme variables (from styles/schema.json)
// Prefix with skin_ to access
header {
  background-color: @skin_colorOfHeader;    // Theme-defined variable
}
```

### Creating Custom Style Controls for SVE

Add a `styles/schema.json` to define controls that appear in the Shoper Visual Editor under "Colors and styles":

```json
[
  {
    "label": "Brand Colors",
    "state": "unfolded",
    "elements": [
      {
        "name": "colorOfHeader",
        "type": "colorPicker",
        "label": "Header background",
        "labelDescription": "Background color for the main header",
        "defaultValue": "#FFFFFF"
      }
    ]
  }
]
```

Then reference in LESS as `@skin_colorOfHeader`.

## Twig Templates

Shoper uses [Twig](https://twig.symfony.com/) as its template engine. Templates combine static HTML with dynamic data.

### Syntax Basics

```twig
{{ variable }}              {# Output a variable #}
{% if condition %}...{% endif %}   {# Logic / control flow #}
{% for item in list %}...{% endfor %}   {# Iteration #}
{% set myVar = 'value' %}   {# Variable assignment #}
{{ value|upper }}           {# Filters (pipe syntax) #}
{{ translate("Text") }}     {# Translation function #}
```

### Object API

The Object API provides access to all store data within templates. Read `references/object-api.md` for the full method list and object properties.

```twig
{# Load a product #}
{% set product = ObjectApi.getProduct(product_id) %}
{{ product.name }}
{{ product.unit.name }}

{# Iterate product images #}
{% for image in product.images %}
  <img src="{{ image.url }}" alt="{{ product.name }}">
{% endfor %}

{# Filter related products on promotion #}
{% set promoProducts = product.relatedProducts|filter(p => p.hasSpecialOffer) %}
```

### Template Contexts

Each page type has its own context with specific variables. For example, a product page has `product_id` but not `category_id`. Read `references/contexts.md` for the full context reference.

### System & Theme Config in Twig

```twig
{{ systemConfig.systemFavicon.paths.original }}   {# System config #}
{{ themeConfig.THEME_ELEMENT_NAME }}              {# Theme config #}
```

## Modules

Modules are the building blocks of Shoper pages. Each module has a Twig template, optional JS, and a configuration schema.

### Rendering Modules in Layouts

```twig
{# Render a module by type and instance ID #}
{{ module("footer_groups", 1) }}
```

Layouts use a grid system:
```twig
<div class="grid">
  <div class="grid__row">
    <div class="grid__col">
      {{ module("my_module", 1) }}
    </div>
  </div>
</div>
```

### Module Config in Twig

```twig
{{ moduleConfig.image.paths.original }}
{{ moduleConfig.productsInModule }}
```

### Creating a Custom Module

1. Go to `modules/` in your theme directory
2. Copy an existing custom module and give it a unique name
3. Edit `module.twig`, `module.js`, `schema.json` as needed
4. Open `settings.json` and **remove the `id` and `code` fields** from the new module
5. `shoper theme push` to upload

The module's `schema.json` defines what controls appear in the SVE for that module. The `translations.json` supports i18n with keys under `"module"` (store-facing) and `"schema"` (SVE-facing).

### Module Translation Format

```json
{
  "module": {
    "pl_PL": { "Source path": "Ścieżka źródłowa" },
    "en_US": { "Source path": "Source path" }
  },
  "schema": {
    "pl_PL": { "Module icon": "Ikona modułu" },
    "en_US": { "Module icon": "Module icon" }
  }
}
```

Read `references/modules.md` for the full list of available module types and which contexts they're available in.

## Common Tasks

### Change Theme Name
```bash
# Edit settings/details.json, then:
shoper theme push
```

### Edit Custom CSS
```bash
# Edit styles/custom.less, then:
shoper theme push
```

### Add a Custom Macro
1. Create `/macros/custom/my-macro.twig`
2. Write your macro logic
3. `shoper theme push`

### Add a Custom Module
1. Copy an existing module directory or create one from the admin panel
2. Remove `id` and `code` from `settings.json`
3. Edit template, JS, schema
4. `shoper theme push`

## Important Notes

- You **cannot edit the default/main theme** — always clone it first with `shoper theme init [id]`
- You **must be inside the theme directory** when running `shoper theme push`
- The `styles/src/` directory is **read-only** — use `styles/custom.less` for your overrides
- The downloaded directory name follows the pattern: `{ID}_{Theme-name}_{timestamp}`
- Module instance IDs are assigned by the system; use SVE to manage module placement in layouts
- The SVE (Shoper Visual Editor) is the visual tool for arranging modules — CLI handles the file-level editing

## Reference Files

For deeper documentation on specific topics, read the relevant reference file:

- `references/object-api.md` — Full Object API method list and object properties
- `references/modules.md` — Complete module type catalog with context availability
- `references/contexts.md` — Page contexts and their available variables
- `references/styling.md` — LESS variables, system colors, and responsive patterns
