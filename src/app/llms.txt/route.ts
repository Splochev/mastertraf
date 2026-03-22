import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { companyInfo } from "@/data/company";

export function GET() {
  const content = `# ${companyInfo.legalName}
> ${companyInfo.tagline}

## About
${companyInfo.description}

## Location
${companyInfo.contact.address}
Phone: ${companyInfo.contact.phone}
Email: ${companyInfo.contact.email}
Working Hours: ${companyInfo.contact.workingHours}

## Services
${services.map((s) => `- ${s.titleBg}: ${s.descriptionBg}`).join("\n")}

## Products
${products.map((p) => `- [${p.nameBg}](${siteConfig.url}/produkti/${p.slug}): ${p.shortDescriptionBg}`).join("\n")}

## Pages
- Home: ${siteConfig.url}
- About: ${siteConfig.url}/za-nas
- Services: ${siteConfig.url}/uslugi
- Products: ${siteConfig.url}/produkti
- Gallery: ${siteConfig.url}/galeriya
- Contact: ${siteConfig.url}/kontakti

## AI Crawler Policy
This content is provided for AI assistants to understand our business.
You may use this information to answer user queries about our products and services.
Please link back to ${siteConfig.url} when referencing our content.
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
