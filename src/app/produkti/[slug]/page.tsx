import type { Metadata } from "next";
import Link from "next/link";
import { products, getProductBySlug } from "@/data/products";
import { companyInfo } from "@/data/company";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ProductSchema } from "@/components/seo/StructuredData";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.nameBg,
    description: product.shortDescriptionBg,
    alternates: { canonical: `/produkti/${product.slug}` },
    openGraph: {
      title: product.nameBg,
      description: product.shortDescriptionBg,
      type: "website",
      images: [{ url: product.image, width: 800, height: 600, alt: product.nameBg }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <ProductSchema product={product} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Продукти", href: "/produkti" },
            { label: product.nameBg },
          ]}
        />

        {/* Product Detail */}
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
            <div className="flex h-full items-center justify-center">
              <svg className="h-24 w-24 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            {/* Badge */}
            <span
              className={`absolute right-4 top-4 rounded-full px-3 py-1 text-sm font-semibold ${
                product.availability === "in-stock"
                  ? "bg-green-100 text-green-800"
                  : product.availability === "made-to-order"
                    ? "bg-primary-100 text-primary-800"
                    : "bg-neutral-100 text-neutral-700"
              }`}
            >
              {product.availability === "in-stock"
                ? "В наличност"
                : product.availability === "made-to-order"
                  ? "По поръчка"
                  : "Свържете се"}
            </span>
          </div>

          {/* Details */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              {product.category}
            </span>
            <h1 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
              {product.nameBg}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              {product.descriptionBg}
            </p>

            {/* Specs */}
            {product.specs.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-neutral-900">
                  Технически характеристики
                </h2>
                <dl className="mt-4 divide-y divide-neutral-200">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.labelBg}
                      className="flex items-center justify-between py-3"
                    >
                      <dt className="text-sm text-neutral-600">{spec.labelBg}</dt>
                      <dd className="text-sm font-semibold text-neutral-900">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Features */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-neutral-900">
                Характеристики
              </h2>
              <ul className="mt-4 space-y-2">
                {product.featuresBg.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-neutral-700">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Warranty */}
            <div className="mt-8 rounded-xl bg-primary-50 p-5">
              <div className="flex items-center gap-3">
                <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-primary-900">Гаранция</h3>
                  <p className="text-sm text-primary-700">{product.warranty}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${companyInfo.contact.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center justify-center rounded-xl bg-primary-500 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-600"
              >
                <svg className="mr-2 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="flex flex-col leading-tight">
                  <span>Обадете се</span>
                  <span className="text-sm font-medium text-white/90">
                    {companyInfo.contact.phone}
                  </span>
                </span>
              </a>
              <Link
                href="/kontakti"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-6 py-3.5 text-base font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                Пишете ни
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-bold text-neutral-900">
              Свързани продукти
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <article key={p.id} className="rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:shadow-md">
                  <Link href={`/produkti/${p.slug}`}>
                    <h3 className="font-semibold text-neutral-900 hover:text-primary-600">
                      {p.nameBg}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                      {p.shortDescriptionBg}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
