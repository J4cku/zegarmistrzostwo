# Shoper Styling Reference

## File Locations

| File | Purpose | Editable? |
|------|---------|-----------|
| `styles/custom.less` | Your CSS/LESS overrides | Yes |
| `styles/schema.json` | Color/style controls for SVE | Yes |
| `styles/settings.json` | Current style values | Yes (auto-managed by SVE) |
| `styles/src/` | Base theme LESS files | Read-only |

## LESS Variables

### System Variables (built-in)

Access with `@variableName`:

```less
@primaryColor       // Store primary color
@secondaryColor     // Store secondary color
@textColor          // Main text color
@backgroundColor    // Main background color
@linkColor          // Link text color
@headingColor       // Heading text color
@borderColor        // Default border color
@fontSize           // Base font size
@fontFamily         // Base font family
```

These are configured in the Shoper admin under theme system settings and cannot be modified via files — only via the admin panel or SVE.

### Theme Variables (custom)

Define custom variables in `styles/schema.json` and access them with the `@skin_` prefix:

```less
// If schema.json defines an element named "headerBg":
@skin_headerBg
```

## Creating Custom Style Schema

`styles/schema.json` defines controls that appear in SVE's "Colors and styles" tab:

```json
[
  {
    "label": "Section Label",
    "state": "unfolded",
    "elements": [
      {
        "name": "variableName",
        "type": "colorPicker",
        "label": "User-facing Label",
        "labelDescription": "Longer description",
        "defaultValue": "#FFFFFF"
      },
      {
        "name": "fontSizeHeading",
        "type": "slider",
        "label": "Heading size",
        "defaultValue": "32",
        "min": 16,
        "max": 64,
        "unit": "px"
      }
    ]
  }
]
```

### Element Types

| Type | Description | Properties |
|------|-------------|------------|
| `colorPicker` | Color selector | `defaultValue`: hex color |
| `slider` | Numeric slider | `min`, `max`, `unit`, `defaultValue` |
| `select` | Dropdown | `options`: array of `{label, value}` |
| `checkbox` | Toggle | `defaultValue`: boolean |
| `text` | Text input | `defaultValue`: string |

## Writing custom.less

### Google Fonts Import

```less
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@400;500&display=swap');
```

### CSS Variables Pattern

```less
:root {
  --z-charcoal: #1D1D1B;
  --z-gold: #C5A258;
  --z-cream: #F5F0EA;
  --z-warm-white: #FAF7F2;
}
```

### Overriding Module Styles

Each module renders inside a container. Use the module's CSS classes to target:

```less
// Override header module
.module-header {
  h1, h2, h3 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
  }
}

// Override product card styles
.product-card {
  border: none;
  box-shadow: none;
}

// Override button styles globally
.btn, .button {
  border-radius: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

### Responsive Patterns

Shoper uses standard breakpoints. Override as needed:

```less
@media (max-width: 768px) {
  .grid__col {
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .grid {
    max-width: 1440px;
    margin: 0 auto;
  }
}
```

## Theme Configuration Schema

`settings/schema.json` defines controls in the SVE "Theme settings" tab (separate from colors/styles). Access in Twig via `themeConfig.ELEMENT_NAME`.

```json
[
  {
    "label": "Hero Section",
    "state": "unfolded",
    "elements": [
      {
        "name": "heroVideoUrl",
        "type": "text",
        "label": "Hero video URL",
        "defaultValue": ""
      },
      {
        "name": "showHeroOverlay",
        "type": "checkbox",
        "label": "Show dark overlay",
        "defaultValue": true
      }
    ]
  }
]
```

Usage in Twig:
```twig
{% if themeConfig.showHeroOverlay %}
  <div class="hero-overlay"></div>
{% endif %}
<video src="{{ themeConfig.heroVideoUrl }}" autoplay muted loop playsinline></video>
```
