import { siteConfig } from "@/lib/config";
import { getCompanyInfo } from "@/data/company";
import type { Product } from "@/data/products";
import type { Service } from "@/data/services";
import type { FAQItem } from "@/data/faq";

export async function OrganizationSchema() {
  const companyInfo = await getCompanyInfo();
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
    sameAs: [...companyInfo.social.facebook, companyInfo.social.youtube, companyInfo.social.instagram],
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

export async function ProductSchema({ product }: { product: Product }) {
  const companyInfo = await getCompanyInfo();
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
      // eslint-disable-next-line react-hooks/purity
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

export async function WebPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const companyInfo = await getCompanyInfo();
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

export async function ServiceSchema({ service }: { service: Service }) {
  const companyInfo = await getCompanyInfo();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.titleBg,
    description: service.descriptionBg,
    url: `${siteConfig.url}/uslugi/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: companyInfo.legalName,
      url: siteConfig.url,
      telephone: companyInfo.contact.phone,
      email: companyInfo.contact.email,
    },
    areaServed: {
      "@type": "Country",
      name: "Bulgaria",
    },
    serviceType: "Specialized equipment repair and maintenance",
    availableLanguage: ["bg", "en"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export async function ContactPageSchema() {
  const companyInfo = await getCompanyInfo();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Контакти – МАСТЕРТРАФ",
    url: `${siteConfig.url}/kontakti`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: companyInfo.legalName,
      url: siteConfig.url,
      telephone: companyInfo.contact.phone,
      email: companyInfo.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "ж.к. Овча купел",
        addressLocality: "София",
        addressCountry: "BG",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
