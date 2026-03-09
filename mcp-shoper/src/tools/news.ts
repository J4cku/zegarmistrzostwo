import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { shoperFetch } from "../client.js";

export function registerNewsTools(server: McpServer) {
  server.tool(
    "shoper_list_news",
    "List news/blog posts with pagination",
    { page: z.number().int().positive().default(1).describe("Page number"), limit: z.number().int().min(1).max(50).default(25).describe("Items per page") },
    async ({ page, limit }) => {
      const data = await shoperFetch(`/news?page=${page}&limit=${limit}`);
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    },
  );

  server.tool(
    "shoper_get_news",
    "Get a single news/blog post by ID",
    { news_id: z.number().int().positive().describe("News post ID") },
    async ({ news_id }) => {
      const data = await shoperFetch(`/news/${news_id}`);
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    },
  );

  server.tool(
    "shoper_create_news",
    "Create a new news/blog post. Fields: name, content (HTML), short_content, date (YYYY-MM-DD), author, active (0/1), lang_id, seo_title, seo_description, seo_url, tags.",
    {
      name: z.string().describe("Post title"),
      content: z.string().describe("Full content (HTML)"),
      short_content: z.string().optional().describe("Short excerpt"),
      date: z.string().optional().describe("Publication date YYYY-MM-DD"),
      author: z.string().optional().describe("Author name"),
      active: z.number().int().min(0).max(1).default(1).describe("Active flag"),
      lang_id: z.string().default("1").describe("Language ID"),
      seo_title: z.string().optional(),
      seo_description: z.string().optional(),
      seo_url: z.string().optional(),
      tags: z.string().optional().describe("Comma-separated tags"),
    },
    async (params) => {
      const data = await shoperFetch("/news", {
        method: "POST",
        body: JSON.stringify(params),
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    },
  );

  server.tool(
    "shoper_delete_news",
    "Delete a news/blog post by ID",
    { news_id: z.number().int().positive().describe("News post ID to delete") },
    async ({ news_id }) => {
      await shoperFetch(`/news/${news_id}`, { method: "DELETE" });
      return { content: [{ type: "text" as const, text: JSON.stringify({ deleted: true, news_id }) }] };
    },
  );
}
