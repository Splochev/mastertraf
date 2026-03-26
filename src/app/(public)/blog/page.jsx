import Image from "next/image";
import Link from "next/link";
import { excerpt, firstImage } from "../../../utils/blogUtils";
import { getAllArticles } from "../../../data/blog";

// ─── Featured card (first article, full-width hero layout) ───────────────────
function FeaturedCard({ article }) {
  const thumb = firstImage(article.html);
  const slug = article.slug;

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="relative grid lg:grid-cols-5 rounded-3xl overflow-hidden border border-neutral-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Image — 3 / 5 columns */}
        <div className="lg:col-span-3 relative min-h-65 lg:min-h-110 bg-neutral-100 overflow-hidden">
          {thumb ? (
            <Image
              src={thumb}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary-50 to-primary-100">
              <svg
                className="w-20 h-20 text-primary-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
          )}
          <div className="absolute top-5 left-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500 px-3.5 py-1.5 text-xs font-bold text-white shadow tracking-wide uppercase">
              ★ Препоръчано
            </span>
          </div>
        </div>

        {/* Content — 2 / 5 columns */}
        <div className="lg:col-span-2 flex flex-col justify-center gap-5 p-8 lg:p-12">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-primary-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500">
              Статия
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold leading-tight text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
            {article.title}
          </h2>
          <p className="text-neutral-500 leading-relaxed text-[15px]">
            {excerpt(article.html, 220)}
          </p>
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 group-hover:gap-3 transition-all duration-200 mt-1">
            Прочети повече
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── Regular grid card ────────────────────────────────────────────────────────
function ArticleCard({ article }) {
  const thumb = firstImage(article.html);
  const slug = article.slug;

  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article className="flex flex-col h-full rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        {/* Thumbnail */}
        <div className="relative h-48 bg-neutral-100 overflow-hidden shrink-0">
          {thumb ? (
            <Image
              src={thumb}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              fill
              sizes="(min-width: 1024px) 25vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-neutral-50 to-neutral-100">
              <svg
                className="w-12 h-12 text-neutral-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-6 gap-3">
          <div className="flex items-center gap-2">
            <span className="h-px w-5 bg-primary-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500">
              Статия
            </span>
          </div>
          <h2 className="text-lg font-bold leading-snug text-neutral-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
            {article.title}
          </h2>
          <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3 flex-1">
            {excerpt(article.html)}
          </p>
          <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 mt-2 group-hover:gap-2.5 transition-all duration-200">
            Прочети
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPage() {
  const allArticles = await getAllArticles();
  const [featured, ...rest] = allArticles;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight">
            Новини и съвети
          </h1>
          <p className="text-neutral-500 max-w-sm text-[15px] leading-relaxed">
            Полезни статии за заваръчна техника, поддръжка и иновации от екипа
            на МАСТЕРТРАФ.
          </p>
        </div>
      </div>

      <div className="h-px bg-neutral-200 mb-12" />

      {/* Featured */}
      {featured && (
        <div className="mb-14">
          <FeaturedCard article={featured} />
        </div>
      )}

      {/* Grid */}
      {rest.length && (
        <>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-lg font-bold text-neutral-900">
              Всички статии
            </span>
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-sm text-neutral-400">
              {rest.length} статии
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </>
      )}

      {/* CTA strip */}
      <div className="mt-20 rounded-2xl bg-primary-50 border border-primary-100 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-lg font-bold text-neutral-900">
            Нуждаете се от съвет?
          </p>
          <p className="text-neutral-500 mt-1 text-sm">
            Свържете се с нас — отговаряме бързо.
          </p>
        </div>
        <Link
          href="/kontakti"
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
        >
          Свържете се с нас
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
}
