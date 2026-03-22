"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/products";

interface Category {
  slug: string;
  name: string;
}

export function ProductFilter({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? products.filter((p) => p.categorySlug === active)
    : products;

  const grouped = active
    ? [{ slug: active, name: categories.find((c) => c.slug === active)?.name ?? active }]
    : categories;

  return (
    <>
      <nav className="mt-8" aria-label="Продуктови категории">
        <ul className="flex flex-wrap gap-2">
          <li>
            <button
              type="button"
              onClick={() => setActive(null)}
              className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === null
                  ? "bg-primary-500 text-white"
                  : "border border-neutral-300 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-600"
              }`}
            >
              Всички
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                type="button"
                onClick={() => setActive(cat.slug)}
                className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === cat.slug
                    ? "bg-primary-500 text-white"
                    : "border border-neutral-300 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-600"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {grouped.map((category) => {
        const categoryProducts = filtered.filter(
          (p) => p.categorySlug === category.slug
        );
        if (categoryProducts.length === 0) return null;

        return (
          <section
            key={category.slug}
            className="mt-12"
            aria-labelledby={`cat-${category.slug}`}
          >
            <h2
              id={`cat-${category.slug}`}
              className="text-2xl font-bold text-neutral-900"
            >
              {category.name}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
