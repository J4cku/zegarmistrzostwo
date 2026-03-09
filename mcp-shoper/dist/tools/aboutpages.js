import { z } from "zod";
import { shoperFetch } from "../client.js";
export function registerAboutPageTools(server) {
    server.tool("shoper_list_aboutpages", "List about/info pages with pagination", { page: z.number().int().positive().default(1).describe("Page number"), limit: z.number().int().min(1).max(50).default(25).describe("Items per page") }, async ({ page, limit }) => {
        const data = await shoperFetch(`/aboutpages?page=${page}&limit=${limit}`);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    });
    server.tool("shoper_get_aboutpage", "Get a single about page by ID", { page_id: z.number().int().positive().describe("About page ID") }, async ({ page_id }) => {
        const data = await shoperFetch(`/aboutpages/${page_id}`);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    });
    server.tool("shoper_update_aboutpage", "Update an existing about page by ID. Fields: name, content (HTML), active (0/1), lang_id, seo_title, seo_description, seo_url.", {
        page_id: z.number().int().positive().describe("About page ID to update"),
        name: z.string().optional().describe("Page title"),
        content: z.string().optional().describe("Page content (HTML)"),
        active: z.number().int().min(0).max(1).optional().describe("Active flag: 1 or 0"),
        lang_id: z.string().optional().describe("Language ID (e.g. '1' for Polish)"),
        seo_title: z.string().optional(),
        seo_description: z.string().optional(),
        seo_url: z.string().optional(),
    }, async ({ page_id, ...body }) => {
        const data = await shoperFetch(`/aboutpages/${page_id}`, {
            method: "PUT",
            body: JSON.stringify(body),
        });
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    });
}
