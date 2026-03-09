import { z } from "zod";
import { shoperFetch } from "../client.js";
export function registerProductTools(server) {
    server.tool("shoper_list_products", "List products with pagination", { page: z.number().int().positive().default(1).describe("Page number"), limit: z.number().int().min(1).max(50).default(25).describe("Items per page") }, async ({ page, limit }) => {
        const data = await shoperFetch(`/products?page=${page}&limit=${limit}`);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    });
    server.tool("shoper_get_product", "Get a single product by ID", { product_id: z.number().int().positive().describe("Product ID") }, async ({ product_id }) => {
        const data = await shoperFetch(`/products/${product_id}`);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    });
    server.tool("shoper_create_product", "Create a new product. Translations object keys are language IDs (e.g. '1' for Polish). Required translation fields: name, active ('1'/'0'). Optional: short_description, description, seo_title, seo_description.", {
        stock: z.object({
            price: z.number().describe("Product price"),
            stock: z.number().int().default(0).describe("Stock quantity"),
            weight: z.number().optional().describe("Weight in kg"),
        }).describe("Stock and pricing info"),
        category_id: z.number().int().positive().describe("Main category ID"),
        producer_id: z.number().int().optional().describe("Producer / brand ID"),
        code: z.string().optional().describe("Product SKU / code"),
        ean: z.string().optional().describe("EAN barcode"),
        translations: z.record(z.string(), z.object({
            name: z.string().describe("Product name"),
            active: z.string().default("1").describe("Active flag: '1' or '0'"),
            short_description: z.string().optional(),
            description: z.string().optional(),
            seo_title: z.string().optional(),
            seo_description: z.string().optional(),
        })).describe("Translations keyed by language ID"),
    }, async (params) => {
        const data = await shoperFetch("/products", {
            method: "POST",
            body: JSON.stringify(params),
        });
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    });
    server.tool("shoper_update_product", "Update an existing product by ID. Pass only the fields you want to change.", {
        product_id: z.number().int().positive().describe("Product ID to update"),
        stock: z.object({
            price: z.number().optional(),
            stock: z.number().int().optional(),
            weight: z.number().optional(),
        }).optional().describe("Stock and pricing updates"),
        category_id: z.number().int().optional(),
        producer_id: z.number().int().optional(),
        code: z.string().optional(),
        ean: z.string().optional(),
        translations: z.record(z.string(), z.object({
            name: z.string().optional(),
            active: z.string().optional(),
            short_description: z.string().optional(),
            description: z.string().optional(),
            seo_title: z.string().optional(),
            seo_description: z.string().optional(),
        })).optional().describe("Translation updates keyed by language ID"),
    }, async ({ product_id, ...body }) => {
        const data = await shoperFetch(`/products/${product_id}`, {
            method: "PUT",
            body: JSON.stringify(body),
        });
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    });
    server.tool("shoper_delete_product", "Delete a product by ID. Also removes associated images and stock.", { product_id: z.number().int().positive().describe("Product ID to delete") }, async ({ product_id }) => {
        await shoperFetch(`/products/${product_id}`, { method: "DELETE" });
        return { content: [{ type: "text", text: JSON.stringify({ deleted: true, product_id }) }] };
    });
}
