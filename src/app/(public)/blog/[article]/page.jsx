import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { excerpt, firstImage, renderHtml, styleLinks } from "../../../../utils/blogUtils";
import { getAllArticles, getArticleBySlug } from "../../../../data/blog";

export async function generateMetadata({ params }) {
  const { article: rawArticle } = await params;
  const article = await getArticleBySlug(rawArticle);
  if (!article) return {};

  const ogImage = firstImage(article.html);
  const description = excerpt(article.html);

  return {
    title: `${article.title} – МАСТЕРТРАФ`,
    description,
    alternates: { canonical: `/blog/${params.article}` },
    openGraph: {
      title: article.title,
      description,
      url: `/blog/${params.article}`,
      type: "article",
      ...(ogImage && { images: [{ url: ogImage, alt: article.title }] }),
    },
  };
}

export default async function ArticlePage({ params }) {
  const { article: rawArticle } = await params;

  const article = await getArticleBySlug(rawArticle);
  if (!article) notFound();

  const allArticles = await getAllArticles();
  // Related = other articles, max 3
  const related = allArticles.filter((a) => a.id !== article.id).slice(0, 3);

  const renderedHtml = styleLinks(renderHtml(article.html));

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-sm text-neutral-400 mb-10"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-primary-500 transition-colors">
          Начало
        </Link>
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/blog" className="hover:text-primary-500 transition-colors">
          Блог
        </Link>
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-neutral-600 line-clamp-1">{article.title}</span>
      </nav>

      <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
        {/* ── Main content ── */}
        <div>
          {/* Article header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-px w-8 bg-primary-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary-500">
                Статия
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
              {article.title}
            </h1>
          </header>

          {/* Article body */}
          <div
            className="
              prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-neutral-900
              prose-p:text-neutral-600 prose-p:leading-relaxed
              prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-neutral-800
              prose-li:text-neutral-600
              prose-blockquote:border-primary-400 prose-blockquote:text-neutral-500
              prose-code:bg-neutral-100 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
              [&_.article-figure]:my-8
              [&_.article-figure_img]:w-full [&_.article-figure_img]:rounded-2xl [&_.article-figure_img]:shadow-md
              [&_.article-figure_figcaption]:text-center [&_.article-figure_figcaption]:text-sm [&_.article-figure_figcaption]:text-neutral-400 [&_.article-figure_figcaption]:mt-3 [&_.article-figure_figcaption]:capitalize
            "
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-primary-50 border border-primary-100 p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="font-bold text-neutral-900">{article.ctaText}</p>
              <p className="text-sm text-neutral-500 mt-1">
                Свържете се с нас или разгледайте продуктите ни.
              </p>
            </div>
            <Link
              href={article.ctaUrl}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              {article.ctaText}
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

          {/* Back link */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-primary-500 transition-colors"
            >
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
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Обратно към блога
            </Link>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <aside className="space-y-6 lg:sticky lg:top-8">
          {/* Related articles */}
          {related.length > 0 && (
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-5">
                Още статии
              </h2>
              <div className="space-y-5">
                {related.map((rel) => {
                  const thumb = firstImage(rel.html);
                  const relSlug = rel.slug;
                  return (
                    <Link
                      key={rel.id}
                      href={`/blog/${relSlug}`}
                      className="group flex gap-4 items-start"
                    >
                      {/* Tiny thumb */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
                        {thumb ? (
                          <Image
                            src={thumb}
                            alt={rel.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            width={64}
                            height={64}
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                            <svg
                              className="w-6 h-6 text-neutral-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </p>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                          {excerpt(rel.html, 80)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Contact nudge */}
          <div className="rounded-2xl bg-primary-500 p-6 text-white">
            <p className="font-bold text-lg leading-snug mb-2">
              Нужна ви е помощ?
            </p>
            <p className="text-primary-100 text-sm leading-relaxed mb-5">
              Нашият екип е на ваше разположение за въпроси и консултации.
            </p>
            <Link
              href="/kontakti"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-primary-600 hover:bg-primary-50 transition-colors"
            >
              Свържете се
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
        </aside>
      </div>
    </main>
  );
}
