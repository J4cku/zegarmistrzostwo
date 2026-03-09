import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(import.meta.dirname, "../../.env.local") });

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerProductTools } from "./tools/products.js";
import { registerProductImageTools } from "./tools/product-images.js";
import { registerCategoryTools } from "./tools/categories.js";
import { registerAboutPageTools } from "./tools/aboutpages.js";
import { registerNewsTools } from "./tools/news.js";

const server = new McpServer({
  name: "shoper",
  version: "1.0.0",
});

registerProductTools(server);
registerProductImageTools(server);
registerCategoryTools(server);
registerAboutPageTools(server);
registerNewsTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
