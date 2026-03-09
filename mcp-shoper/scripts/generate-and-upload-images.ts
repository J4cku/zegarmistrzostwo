import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(import.meta.dirname, "../../.env.local") });
import sharp from "sharp";

const SITE_URL = process.env.SHOPER_SITE_URL!.replace(/\/+$/, "");
const LOGIN = process.env.SHOPER_LOGIN!;
const PASSWORD = process.env.SHOPER_PASSWORD!;

let token: string | null = null;
async function auth() {
  if (token) return token;
  const res = await fetch(`${SITE_URL}/webapi/rest/auth`, { method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${LOGIN}:${PASSWORD}`).toString("base64")}` } });
  const data = (await res.json()) as { access_token: string };
  token = data.access_token;
  return token;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function api(p: string, opts: RequestInit = {}) {
  const t = await auth();
  for (let i = 0; i < 5; i++) {
    const res = await fetch(`${SITE_URL}/webapi/rest${p}`, { ...opts, headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" } });
    if (res.status === 429) { console.log(`  [rate-limited] waiting...`); await sleep(2000 * (i + 1)); continue; }
    if (!res.ok) { const b = await res.text(); throw new Error(`${res.status}: ${b}`); }
    if (res.status === 204) return null;
    return res.json();
  }
}

// Generate a minimalist product image using SVG → PNG
async function generateProductImage(
  label: string,
  subtitle: string,
  bgColor: string,
  accentColor: string,
  icon: string,
): Promise<Buffer> {
  const width = 800;
  const height = 800;

  // Escape HTML entities in text
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${darken(bgColor, 15)};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <!-- Decorative circle -->
  <circle cx="${width / 2}" cy="320" r="140" fill="none" stroke="${accentColor}" stroke-width="1.5" opacity="0.5"/>
  <circle cx="${width / 2}" cy="320" r="120" fill="none" stroke="${accentColor}" stroke-width="0.8" opacity="0.3"/>
  <!-- Icon -->
  <text x="${width / 2}" y="340" text-anchor="middle" font-size="80" fill="${accentColor}" font-family="serif">${icon}</text>
  <!-- Product name -->
  <text x="${width / 2}" y="540" text-anchor="middle" font-size="28" fill="${accentColor}" font-family="Georgia, serif" font-weight="400" letter-spacing="2">${esc(label)}</text>
  <!-- Subtitle -->
  <text x="${width / 2}" y="580" text-anchor="middle" font-size="16" fill="${accentColor}" font-family="sans-serif" opacity="0.7" letter-spacing="3">${esc(subtitle.toUpperCase())}</text>
  <!-- Brand -->
  <text x="${width / 2}" y="720" text-anchor="middle" font-size="12" fill="${accentColor}" font-family="Georgia, serif" letter-spacing="6" opacity="0.4">ZEGARMISTRZOSTWO</text>
  <line x1="${width / 2 - 40}" y1="735" x2="${width / 2 + 40}" y2="735" stroke="${accentColor}" stroke-width="0.5" opacity="0.3"/>
</svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
}

function darken(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) - Math.round(255 * percent / 100));
  const g = Math.max(0, ((num >> 8) & 0xff) - Math.round(255 * percent / 100));
  const b = Math.max(0, (num & 0xff) - Math.round(255 * percent / 100));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

// Product definitions with styling
const products = [
  { id: 93, label: "Pierścionek z moissanitem", subtitle: "Złoto 585 · 1ct", bg: "#f5f0ea", accent: "#8b7355", icon: "◇" },
  { id: 94, label: "Naszyjnik z topazem", subtitle: "London Blue · Złoto 585", bg: "#eaf0f5", accent: "#4a6b8a", icon: "◆" },
  { id: 95, label: "Kolczyki z morganitem", subtitle: "Srebro 925", bg: "#f5eaf0", accent: "#8a5570", icon: "✧" },
  { id: 96, label: "Bransoletka z cyrkoniami", subtitle: "Srebro 925 · Tennis", bg: "#f0f0f5", accent: "#6b6b8a", icon: "○" },
  { id: 97, label: "Casio G-Shock GA-2100", subtitle: "CasiOak · 200m WR", bg: "#1a1a1a", accent: "#e0e0e0", icon: "◉" },
  { id: 98, label: "Zegarek damski ceramiczny", subtitle: "Ceramika biała · 32mm", bg: "#fafafa", accent: "#555555", icon: "◎" },
  { id: 99, label: "Zegarek męski klasyczny", subtitle: "Stal 316L · 42mm", bg: "#2a2a35", accent: "#c0b8a8", icon: "◈" },
  { id: 100, label: "Wymiana baterii", subtitle: "Serwis · Od ręki", bg: "#f0ece5", accent: "#7a6b55", icon: "⚙" },
  { id: 101, label: "Przegląd mechanizmu", subtitle: "Serwis · 5-14 dni", bg: "#e5e8ec", accent: "#4a5568", icon: "⟳" },
  { id: 102, label: "Regulacja bransolety", subtitle: "Serwis · Od ręki", bg: "#ece5e0", accent: "#6b5a4a", icon: "⊕" },
];

async function main() {
  for (const prod of products) {
    console.log(`Generating image for: ${prod.label}`);
    const png = await generateProductImage(prod.label, prod.subtitle, prod.bg, prod.accent, prod.icon);
    const base64 = png.toString("base64");

    console.log(`  Uploading to product ${prod.id}...`);
    const result = await api(`/product-images`, {
      method: "POST",
      body: JSON.stringify({
        product_id: prod.id,
        content: base64,
        name: `${prod.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`,
        order: 0,
      }),
    });
    console.log(`  Uploaded (image ID: ${result})`);
  }
  console.log("\nAll images uploaded!");
}

main().catch((e) => { console.error("Error:", e); process.exit(1); });
