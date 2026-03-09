# Shoper Page Contexts

Each page type (layout) in Shoper has its own context — a set of variables available to templates on that page. Modules are also context-aware: certain modules only work in certain contexts.

## Available Contexts

| Context | Key Variables | Description |
|---------|--------------|-------------|
| Home page | (none specific) | Main landing page |
| Product page | `product_id` | Single product display |
| Category list | `category_id` | Category product listing |
| Collection list | `collection_id` | Collection product listing |
| Search results | `search_query` | Search results listing |
| Producer list | `producer_id` | Producer/vendor listing |
| Blog entry | `article_id` | Single blog post |
| Blog list | (none specific) | Blog index |
| Blog category | `category_id` | Blog category listing |
| Blog tag | `tag_id` | Blog tag listing |
| Info page | `page_id` | Static/info page |
| Contact | (none specific) | Contact page |
| Bundle page | `product_id` | Product bundle |
| Loyalty product | `product_id` | Loyalty reward product |
| Loyalty list | (none specific) | Loyalty products listing |
| Promotion list | (none specific) | Promotional products |
| New products list | (none specific) | New arrivals |
| Store disabled | (none specific) | Store offline page |
| 404 | (none specific) | Page not found |
| Inactive product | `product_id` | Disabled/unavailable product |
| Basket | (coming soon) | Shopping cart |
| Customer panel | (coming soon) | User account area |

## Using Context Variables

Context variables let you load data specific to the current page:

```twig
{# On a product page #}
{% set product = ObjectApi.getProduct(product_id) %}
<h1>{{ product.name }}</h1>

{# On a category page #}
{% set category = ObjectApi.getCategory(category_id) %}
<h1>{{ category.name }}</h1>

{# On a blog entry page #}
{% set article = ObjectApi.getBlogArticle(article_id) %}
<h1>{{ article.title }}</h1>
```

## Layout Structure

All layouts use the grid system:

```twig
<div class="grid">
  <div class="grid__row">
    <div class="grid__col">
      {{ module("module_name", instance_id) }}
    </div>
  </div>
</div>
```

The SVE (Shoper Visual Editor) manages module placement within these grids. When you use SVE to arrange modules, it auto-generates the layout code. For advanced customization, you can modify the layout Twig directly.
