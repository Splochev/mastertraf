import type { Metadata } from "next";
import Link from "next/link";
import { products, categories } from "@/data/products";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Карта на сайта",
  description: "Карта на сайта на МАСТЕРТРАФ – всички страници, продукти и услуги.",
  alternates: { canonical: "/sitemap-html" },
  robots: { index: true, follow: true },
};

export default function HTMLSitemap() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Карта на сайта" }]} />

      <h1 className="mt-6 text-3xl font-bold text-neutral-900">
        Карта на сайта
      </h1>

      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        {/* Main Pages */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900">Основни страници</h2>
          <ul className="mt-4 space-y-2">
            <li><Link href="/" className="text-primary-600 hover:underline">Начало</Link></li>
            <li><Link href="/za-nas" className="text-primary-600 hover:underline">За нас</Link></li>
            <li><Link href="/uslugi" className="text-primary-600 hover:underline">Услуги</Link></li>
            <li><Link href="/produkti" className="text-primary-600 hover:underline">Продукти</Link></li>
            <li><Link href="/galeriya" className="text-primary-600 hover:underline">Галерия</Link></li>
            <li><Link href="/kontakti" className="text-primary-600 hover:underline">Контакти</Link></li>
          </ul>
        </section>

        {/* Products by Category */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900">Продукти</h2>
          {categories.map((cat) => {
            const catProducts = products.filter((p) => p.categorySlug === cat.slug);
            if (catProducts.length === 0) return null;
            return (
              <div key={cat.slug} className="mt-4">
                <h3 className="font-medium text-neutral-800">{cat.name}</h3>
                <ul className="mt-2 space-y-1 pl-4">
                  {catProducts.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/produkti/${product.slug}`}
                        className="text-sm text-primary-600 hover:underline"
                      >
                        {product.nameBg}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
