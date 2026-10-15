import { writeFileSync } from "node:fs";
import { join } from "node:path";

const siteUrl = (process.env.SITE_URL ?? "https://metaloziz.github.io/massage").replace(
  /\/$/,
  "",
);
const lastmod = new Date().toISOString().split("T")[0];
const publicDir = join(process.cwd(), "public");

const pages = [
  { path: "/", priority: "1.0" },
  { path: "/services", priority: "0.9" },
  { path: "/education", priority: "0.8" },
];

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const sitemapUrls = pages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.path === "/" ? "/" : page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`;

writeFileSync(join(publicDir, "robots.txt"), robots, "utf8");
writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");

console.log(`Generated robots.txt and sitemap.xml for ${siteUrl}`);
