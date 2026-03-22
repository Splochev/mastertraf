import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group rounded-2xl border border-neutral-200 bg-white transition-all hover:shadow-lg hover:border-primary-200">
      <Link href={`/produkti/${product.slug}`} className="block">
        {/* Image placeholder */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-neutral-100">
          <div className="flex h-full items-center justify-center">
            <svg className="h-16 w-16 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          {/* Availability badge */}
          <span
            className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
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

        {/* Content */}
        <div className="p-5">
          <span className="text-xs font-medium uppercase tracking-wider text-primary-600">
            {product.category}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
            {product.nameBg}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
            {product.shortDescriptionBg}
          </p>

          {/* Key specs preview */}
          {product.specs.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {product.specs.slice(0, 3).map((spec) => (
                <span key={spec.labelBg} className="inline-flex rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">
                  {spec.value}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center text-sm font-medium text-primary-600">
            Научете повече
            <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}
