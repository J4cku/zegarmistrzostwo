import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zegarmistrzostwo.pl";

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/o-nas`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/oferta`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/kontakt`, lastModified: new Date(), priority: 0.7 },
  ];
}
