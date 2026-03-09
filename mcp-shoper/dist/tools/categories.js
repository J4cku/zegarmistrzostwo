import { z } from "zod";
import { shoperFetch } from "../client.js";
export function registerCategoryTools(server) {
    server.tool("shoper_list_categories", "List categories with pagination", { page: z.number().int().positive().default(1).describe("Page number"), limit: z.number().int().min(1).max(50).default(25).describe("Items per page") }, async ({ page, limit }) => {
        const data = await shoperFetch(`/categories?page=${page}&limit=${limit}`);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    });
    server.tool("shoper_get_category", "Get a single category by ID", { category_id: z.number().int().positive().describe("Category ID") }, async ({ category_id }) => {
        const data = await shoperFetch(`/categories/${category_id}`);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    });
    server.tool("shoper_create_category", "Create a new category. Translations object keys are language IDs. Required translation fields: name, active ('1'/'0').", {
        parent_id: z.number().int().default(0).describe("Parent category ID (0 = root)"),
        order: z.number().int().default(0).describe("Display order"),
        translations: z.record(z.string(), z.object({
            name: z.string().describe("Category name"),
            active: z.string().default("1").describe("Active flag: '1' or '0'"),
            description: z.string().optional(),
            seo_title: z.string().optional(),
            seo_description: z.string().optional(),
        })).describe("Translations keyed by language ID"),
    }, async (params) => {
        const data = await shoperFetch("/categories", {
            method: "POST",
            body: JSON.stringify(params),
        });
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    });
    server.tool("shoper_update_category", "Update an existing category by ID. Pass only the fields you want to change.", {
        category_id: z.number().int().positive().describe("Category ID to update"),
        parent_id: z.number().int().optional(),
        order: z.number().int().optional(),
        translations: z.record(z.string(), z.object({
            name: z.string().optional(),
            active: z.string().optional(),
            description: z.string().optional(),
            seo_title: z.string().optional(),
            seo_description: z.string().optional(),
        })).optional().describe("Translation updates keyed by language ID"),
    }, async ({ category_id, ...body }) => {
        const data = await shoperFetch(`/categories/${category_id}`, {
            method: "PUT",
            body: JSON.stringify(body),
        });
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    });
    server.tool("shoper_delete_category", "Delete a category by ID. Products must be removed or reassigned first.", { category_id: z.number().int().positive().describe("Category ID to delete") }, async ({ category_id }) => {
        await shoperFetch(`/categories/${category_id}`, { method: "DELETE" });
        return { content: [{ type: "text", text: JSON.stringify({ deleted: true, category_id }) }] };
    });
}
