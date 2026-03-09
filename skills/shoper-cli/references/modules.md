# Shoper Modules Reference

Modules are the main building blocks of Shoper storefronts. Each module type is available in specific page contexts.

## Module Structure

Each module lives in `modules/{module-name}/` and contains:
- `module.twig` — Twig template
- `module.js` — JavaScript (optional)
- `schema.json` — Configuration schema for SVE
- `settings.json` — Current configuration values
- `translations.json` — i18n translations

## Homepage Modules

| Module | Identifier |
|--------|-----------|
| Blog categories | `blog_article_list_categories` |
| Tag cloud | `blog_articles_list_tags` |
| Blog slider | `blog_articles_slider` |
| Basket preview | `basket_preview` |
| Breadcrumbs | `breadcrumbs` |
| Button | `button` |
| Contact form | `contact_form` |
| Contact information | `contact_info` |
| Countdown timer | `countdown_timer` |
| Wishlist | `favourites_button` |
| FAQ | `faq` |
| Footer group | `footer_group` |
| Footer groups | `footer_groups` |
| Google Maps | `google_maps` |
| Heading | `header` |
| Icon with text | `icon-with-text` |
| Language & currency | `language_and_currency` |
| Logo | `logo` |
| Mobile nav | `main_navigation_mobile` |
| Header menu | `main_navigation` |
| Newsletter | `newsletter` |
| Slider | `photo_slider` |
| Image | `picture` |
| New products | `roster_new_products` |
| Bestsellers | `roster_product_bestsellers` |
| Collection | `roster_product_collection` |
| On sale | `roster_product_promotions` |
| Recommendations | `roster_product_recommendation` |
| Products of day | `roster_products_of_the_day` |
| Recently viewed | `roster_recently_viewed` |
| Social media | `social_media` |
| Search | `search` |
| User menu | `user_menu` |
| Rich content | `wysiwyg` |
| Consents | `customer_privacy` |
| Video | `video` |

## Product Page Modules

All homepage modules plus:

| Module | Identifier |
|--------|-----------|
| Loyalty program | `loyalty_program` |
| Add to cart/wishlist | `product_actions` |
| Ask about product | `product_ask_questions` |
| Product features | `product_attributes` |
| Product codes | `product_codes` |
| Product description | `product_description` |
| Downloadable files | `product_files` |
| Image gallery | `product_gallery` |
| Prices | `product_prices` |
| Vendor | `product_producer` |
| Qty & availability | `product_quantity_and_availability` |
| Rating | `product_rating` |
| Related products | `product_related` |
| Reviews | `product_review` |
| Product safety (GPSR) | `product_safety` |
| Share buttons | `product_share` |
| Delivery cost | `product_shipping_prices` |
| Shipping time | `product_shipping_time` |
| Short description | `product_short_description` |
| Product title | `product_title` |
| Variants | `product_variants` |

## Category / Collection / Search List Modules

All homepage modules plus:

| Module | Identifier |
|--------|-----------|
| Filters (sidebar) | `filter_options` |
| Filters (horizontal) | `filter_options_horizontal` |
| Category description (top) | `list_category_description` |
| Category description (bottom) | `list_category_additional_description` |
| Category title | `list_category_title` |
| Product list | `list_context_products` |
| Product count | `list_number_of_products` |
| Visual subcategories | `visual_subcategories` |
| Collection description | `list_collection_description` |
| Collection title | `list_collection_title` |
| Search title | `list_searchquery_title` |

## Blog Modules

All homepage modules plus:

| Module | Identifier |
|--------|-----------|
| Blog article | `blog_article` |
| Article comments | `blog_article_comments` |
| Article files | `blog_article_files` |
| Article tags | `blog_article_tags` |
| Article title | `blog_article_title` |
| Blog list | `blog_articles_list` |
| Blog list title | `blog_articles_list_title` |
| Category list title | `blog_category_list_title` |
| Tag list title | `blog_tag_list_title` |

## Payment Modules

These are integration-specific modules available on product and other pages:

| Module | Identifier |
|--------|-----------|
| PayPo banner | `paypo_banner` |
| P24 installments | `p24_installments_banner` |
| Santander calculator | `santander_installments_calculator` |
| Klarna banner | `klarna_banner` |

## Other Page Types

| Page Type | Key Modules |
|-----------|-------------|
| Info page | `info_page_title`, `info_page_content` |
| Contact | `contact_page_title` |
| Producer list | `list_producer_title`, `list_producer_description`, `list_context_products` |
| Store disabled | `store_disabled` |
| 404 page | `page_not_found` |
| Inactive product | `product_inactive` |

## Bundle Page Modules

| Module | Identifier |
|--------|-----------|
| Bundle items | `bundle_items` |
| + all product page modules | |
