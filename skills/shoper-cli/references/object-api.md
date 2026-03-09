# Shoper Object API Reference

The Object API is a collection of methods that provide access to all store data within Twig templates.

## Usage Pattern

```twig
{% set product = ObjectApi.getProduct(product_id) %}
{{ product.name }}
```

## Available Methods

| Method | Description |
|--------|-------------|
| `getBasketSettings()` | Basket configuration |
| `getBestsellingProducts(int items_per_page)` | Bestselling products list |
| `getBlogArticle(int article_id)` | Single blog article |
| `getBlogArticles(int items_per_page, int page)` | Blog articles list |
| `getBlogCategory(int category_id)` | Single blog category |
| `getBlogCategories(int items_per_page)` | Blog categories list |
| `getBlogSettings()` | Blog configuration |
| `getBlogTag(int tag_id)` | Single blog tag |
| `getBlogTags(int items_per_page)` | Blog tags list |
| `getBreadcrumbs()` | Current page breadcrumbs |
| `getCategory(int category_id)` | Single category |
| `getCategories(bool rootOnly, int items_per_page)` | Categories list |
| `getCollection(int collection_id)` | Single collection |
| `getConsentsSettings()` | Consent/privacy settings |
| `getContactAdditionalFields(int items_per_page)` | Contact form extra fields |
| `getCountry(int country_id)` | Single country |
| `getCurrencies(int items_per_page)` | Available currencies |
| `getDate(mixed date)` | Date value object |
| `getDateTime(mixed datetime)` | DateTime value object |
| `getFilters()` | Active filters |
| `getFooterGroup(int group_id)` | Single footer link group |
| `getFooterGroups(int items_per_page)` | Footer groups list |
| `getHeaderLinks(int items_per_page)` | Header navigation links |
| `getLocale(int locale_id, bool use_localized_names)` | Single locale |
| `getLocales(int items_per_page, bool use_localized_names)` | Available locales |
| `getLoyaltyProgramSettings()` | Loyalty program config |
| `getMainPageBlogArticles(int items_per_page)` | Blog articles for homepage |
| `getModuleBlogArticles(int items_per_page)` | Blog articles for modules |
| `getNewProducts(int items_per_page)` | New products list |
| `getNotificationSettings()` | Notification config |
| `getNow()` | Current datetime |
| `getPage(int page_id)` | Single info page |
| `getProducer(int producer_id)` | Single producer/vendor |
| `getProducers(int items_per_page)` | Producers list |
| `getProduct(int product_id)` | Single product |
| `getProductPricesSettings()` | Price display settings |
| `getProductReviewsSettings()` | Review system settings |
| `getProducts(int items_per_page, int page)` | Products list |
| `getProductsInCollection(int collection_id, int items_per_page)` | Products in a collection |
| `getProductsListSortTypes()` | Available sort options |
| `getProductsOfTheDay(int items_per_page)` | Products of the day |
| `getPwaSettings()` | PWA configuration |
| `getRecaptchaSettings()` | reCAPTCHA config |
| `getSearchSettings()` | Search configuration |
| `getSeoProperties()` | SEO meta properties |
| `getShopCurrency()` | Store default currency |
| `getShopInfo()` | Store information |
| `getShopLocale()` | Store default locale |
| `getShopOffInformation()` | Store disabled info |
| `getShopUrls()` | Store URL configuration |
| `getSpecialOffers(int items_per_page)` | Special offers/promotions |
| `getSystemMetafields()` | System metafields |
| `getTime(mixed time)` | Time value object |
| `getToday()` | Today's date |
| `getUsersSettings()` | User account settings |
| `getUrl()` | Current URL |
| `getWarehouses(int items_per_page)` | Warehouses list |
| `setLinkRel(string rel, string url, array attrs)` | Add link rel tag |
| `setMetatag(string content, string name, string property)` | Add meta tag |

## Paginated Lists

List properties return paginated objects. You can control pagination:

```twig
{{ list.page }}                    {# Current page number #}
{{ list.pages }}                   {# Total pages #}
{{ list.count }}                   {# Total items #}
{{ list.itemCountPerPage }}        {# Items per page #}
{{ list.nextPage() }}              {# Go to next page #}
{{ list.prevPage() }}              {# Go to previous page #}
{{ list.setPage(2) }}              {# Jump to page 2 #}
{{ list.setItemCountPerPage(10) }} {# Change items per page #}
```

## Key Objects

### Product
Properties include: `name`, `description`, `shortDescription`, `unit`, `images`, `comments`, `relatedProducts`, `variants`, `attributes`, `files`, `availability`, `prices`, `hasSpecialOffer`, `createdAt`, etc.

### Category
Properties include: `name`, `description`, `additionalDescription`, `url`, `subcategories`, `products`, etc.

### Collection
Properties include: `name`, `description`, `additionalDescription`, `url`, `products`, etc.

### ShopInfo
Store-level information: name, address, contact details, etc.

## Value Objects

Common value objects used across different object types:

| Object | Description |
|--------|-------------|
| `Attribute` | Product attribute |
| `Country` | Country info |
| `Currency` | Currency with formatting |
| `Date` | Date without time |
| `DateTime` | Date with time |
| `Image` | Image with URL and paths |
| `Link` | Hyperlink |
| `Points` | Loyalty points |
| `Price` | Price with currency |
| `Size` | Dimensional size |
| `Time` | Time without date |
| `Unit` | Unit of measure |
| `Url` | URL object |
| `Weight` | Weight value |

## Null Safety

Properties referencing other objects can sometimes be `null` even when it seems they shouldn't be. This happens when referenced data is deleted during API object generation. Always check for null in templates:

```twig
{% if product.unit %}
  {{ product.unit.name }}
{% endif %}
```
