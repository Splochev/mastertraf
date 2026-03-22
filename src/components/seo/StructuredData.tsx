import { siteConfig } from "@/lib/config";
import { companyInfo } from "@/data/company";
import type { Product } from "@/data/products";
import type { FAQItem } from "@/data/faq";

export function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companyInfo.legalName,
    alternateName: companyInfo.nameEn,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    image: `${siteConfig.url}/images/og-image.jpg`,
    description: companyInfo.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ж.к. Овча купел",
      addressLocality: "София",
      addressCountry: "BG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: companyInfo.mapCoordinates.lat,
      longitude: companyInfo.mapCoordinates.lng,
    },
    telephone: companyInfo.contact.phone,
    email: companyInfo.contact.email,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [...companyInfo.social.facebook, companyInfo.social.youtube],
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Bulgaria",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ProductSchema({ product }: { product: Product }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nameBg,
    description: product.descriptionBg,
    image: `${siteConfig.url}${product.image}`,
    brand: {
      "@type": "Brand",
      name: "МАСТЕРТРАФ",
    },
    manufacturer: {
      "@type": "Organization",
      name: companyInfo.legalName,
    },
    offers: {
      "@type": "Offer",
      availability:
        product.availability === "in-stock"
          ? "https://schema.org/InStock"
          : product.availability === "made-to-order"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/OnlineOnly",
      priceCurrency: "BGN",
      price: "0",
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      url: `${siteConfig.url}/produkti/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: companyInfo.legalName,
      },
      warranty: "24 месеца гаранция",
    },
    url: `${siteConfig.url}/produkti/${product.slug}`,
    category: product.category,
    countryOfOrigin: {
      "@type": "Country",
      name: "Bulgaria",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.questionBg,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answerBg,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${siteConfig.url}${url}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: companyInfo.legalName,
    },
    inLanguage: "bg",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
