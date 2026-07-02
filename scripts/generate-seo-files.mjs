import { writeFileSync } from "node:fs";
import { join } from "node:path";

const siteUrl = (process.env.SITE_URL ?? "https://metaloziz.github.io/massage").replace(
  /\/$/,
  "",
);
const lastmod = new Date().toISOString().split("T")[0];
const publicDir = join(process.cwd(), "public");

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

writeFileSync(join(publicDir, "robots.txt"), robots, "utf8");
writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");

console.log(`Generated robots.txt and sitemap.xml for ${siteUrl}`);
