import React from "react";

export default async function BlogPage() {
  // TODO: Replace with fetch from Supabase
  const articles = [
    {
      id: 1,
      title: "Добре дошли в блога на МАСТЕРТРАФ!",
      html: `<p>Това е <b>примерна статия</b> с <a href=\"/kontakti\">контакт</a> и <a href=\"/produkti\">продукти</a> линкове. <i>Изпробвайте нашите услуги още днес!</i></p>`,
      ctaUrl: "/signup",
      ctaText: "Започнете сега"
    },
    {
      id: 2,
      title: "Защо да изберете нас?",
      html: `<p>Открийте <b>предимствата</b> на МАСТЕРТРАФ. <a href=\"/uslugi\">Вижте услугите</a> или <a href=\"/faq\">прочетете ЧЗВ</a>.</p>`,
      ctaUrl: "/uslugi",
      ctaText: "Вижте услугите"
    }
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-12 text-center">Блог</h1>
      <div className="space-y-12">
        {articles.map(article => (
          <article
            key={article.id}
            className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-8 transition hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary-600 mb-4">{article.title}</h2>
            <div className="prose prose-lg max-w-none text-neutral-700 mb-6" dangerouslySetInnerHTML={{ __html: article.html }} />
            <a
              href={article.ctaUrl}
              className="inline-flex items-center justify-center rounded-xl bg-primary-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600"
            >
              {article.ctaText}
            </a>
          </article>
        ))}
      </div>
      <div className="mt-16 text-center">
        <a href="/kontakti" className="inline-flex items-center text-base font-semibold text-primary-600 hover:text-primary-700">
          Свържете се с нас за повече информация
        </a>
      </div>
    </main>
  );
}
