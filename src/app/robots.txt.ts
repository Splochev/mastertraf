import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

export async function GET() {
  return new NextResponse(
    [
      "User-agent: *",
      "Allow: /",
      "Disallow: /api/",
      "Disallow: /_next/",
      `Sitemap: ${siteConfig.url}/sitemap.xml`,
      `Host: ${siteConfig.url}`,
      ""
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
}
