/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/generate-robots-txt.js
// Usage: node scripts/generate-robots-txt.js
// This script generates a robust robots.txt for production use.

const fs = require("fs");
const path = require("path");

// You can customize these values as needed
const siteUrl = process.env.SITE_URL || "https://mastertraf.vercel.app";

const robotsTxt = `# robots.txt for MASTERTRAF
# For details see: https://www.robotstxt.org/

User-agent: *
Disallow: /api/
Disallow: /_next/
Disallow: /private/
Allow: /

# Block common bad bots
User-agent: AhrefsBot
Disallow: /
User-agent: SemrushBot
Disallow: /
User-agent: MJ12bot
Disallow: /
User-agent: DotBot
Disallow: /
User-agent: BLEXBot
Disallow: /
User-agent: Yandex
Disallow: /

# Allow major search engines
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteUrl}
`;

const publicDir = path.join(__dirname, "..", "public");
const robotsPath = path.join(publicDir, "robots.txt");

fs.writeFileSync(robotsPath, robotsTxt, "utf8");
console.log("robots.txt generated at", robotsPath);
