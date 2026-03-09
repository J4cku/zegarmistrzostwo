import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { shoperFetch } from "../client.js";

export function registerProductImageTools(server: McpServer) {
  server.tool(
    "shoper_list_product_images",
    "List images for a product",
    { product_id: z.number().int().positive().describe("Product ID") },
    async ({ product_id }) => {
      const data = await shoperFetch(`/product-images?filters={"product_id":${product_id}}`);
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    },
  );

  server.tool(
    "shoper_upload_product_image",
    "Upload a base64-encoded image to a product",
    {
      product_id: z.number().int().positive().describe("Product ID"),
      content: z.string().describe("Base64-encoded image data"),
      name: z.string().describe("Filename (e.g. 'front.jpg')"),
      order: z.number().int().default(0).describe("Display order (0 = first)"),
    },
    async ({ product_id, content: imageContent, name, order }) => {
      const data = await shoperFetch("/product-images", {
        method: "POST",
        body: JSON.stringify({
          product_id,
          content: imageContent,
          name,
          order,
        }),
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    },
  );

  server.tool(
    "shoper_delete_product_image",
    "Delete a product image by image ID.",
    { image_id: z.number().int().positive().describe("Image ID to delete") },
    async ({ image_id }) => {
      await shoperFetch(`/product-images/${image_id}`, { method: "DELETE" });
      return { content: [{ type: "text" as const, text: JSON.stringify({ deleted: true, image_id }) }] };
    },
  );
}
