"use client";
import React, { useState } from "react";
import BlogEditor from "@/components/admin/BlogEditor";

const initialArticles = [
  {
    id: 1,
    title: "Добре дошли в блога на МАСТЕРТРАФ!",
    html: `<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet mollis velit, et aliquet lectus. Mauris sit amet dui nec lacus condimentum efficitur non sagittis odio. Duis eleifend bibendum lobortis. Nulla lectus sem, elementum at aliquet nec, molestie in erat. Aliquam iaculis nec leo sed maximus. Proin rutrum fringilla posuere. Mauris convallis erat in mi euismod, a laoreet mi luctus. Donec id dapibus nunc. Proin volutpat urna arcu, fringilla varius nibh pharetra at. Morbi non odio dolor. Etiam eu nibh in velit sollicitudin ultrices id ut sapien.

Quisque dui erat, blandit eget dictum a, blandit nec nisl. Nam massa sem, posuere hendrerit ipsum eget, pretium interdum nulla. Maecenas eget nisi nec lacus dignissim convallis. Morbi eleifend nibh vel augue fringilla, at interdum orci malesuada. Aliquam venenatis metus id ante iaculis vehicula. Pellentesque eget vulputate sem. Maecenas eget elit vitae ex convallis molestie quis et ante. Sed facilisis lorem quam, ut iaculis nisl dictum ac. Proin finibus non magna volutpat tempor. Aenean molestie ornare neque, vehicula dapibus leo consequat convallis. Proin libero enim, consequat et tortor ac, tempus eleifend eros. Proin a posuere urna, non laoreet arcu. Vestibulum scelerisque, dui ac iaculis imperdiet, neque nibh vulputate ex, sed laoreet massa ex aliquam mauris.

Vestibulum est leo, commodo in egestas in, vulputate ac tellus. Nulla ac neque erat. Morbi at vulputate metus. Integer vitae sollicitudin odio. Nullam in erat eget neque faucibus lacinia sit amet id lacus. Etiam sed eros ultrices nisl viverra blandit vel non magna. Aenean eget mollis nibh, eget sagittis sem. Morbi vel euismod nisi, vitae accumsan elit. Mauris vitae mi venenatis, efficitur tortor vitae, lobortis purus. Pellentesque mollis porta justo, at sagittis tortor placerat in. Quisque ornare eros eu tincidunt sollicitudin. Donec mattis magna nec viverra fringilla. In quis libero pellentesque, accumsan dui sed, aliquet nunc.

In eu bibendum risus. Mauris lorem leo, consectetur sed magna quis, ultricies fringilla tortor. Nam sit amet eleifend nulla. Suspendisse mollis quam at eleifend rutrum. Aenean in imperdiet eros, at volutpat mi. Praesent cursus, metus et sagittis ornare, nisl odio convallis justo, sed viverra leo turpis ut dui. Nam aliquet leo turpis, quis sagittis leo pretium a. Integer tincidunt venenatis felis a gravida. Etiam ac quam aliquam, mattis velit eget, semper diam. Fusce molestie, risus at euismod cursus, elit sem blandit dui, vitae sodales risus tellus at risus. Nunc consectetur at est quis porta.

Sed sem risus, aliquam non varius et, porttitor in neque. In sed est ipsum. Phasellus condimentum volutpat diam, quis facilisis tellus semper a. Integer a nibh a libero porta faucibus. Mauris scelerisque purus ex, sed dapibus turpis commodo id. Fusce at pretium purus. Pellentesque dolor erat, laoreet ac sapien et, imperdiet pharetra felis.</p>`,
    ctaUrl: "/signup",
    ctaText: "Започнете сега",
  },
  {
    id: 2,
    title: "Защо да изберете нас?",
    html: `<p>Открийте <b>предимствата</b> на МАСТЕРТРАФ. <a href=\"/uslugi\">Вижте услугите</a> или <a href=\"/faq\">прочетете ЧЗВ</a>.</p>`,
    ctaUrl: "/uslugi",
    ctaText: "Вижте услугите",
  },
  {
    id: 3,
    title: "Защо да изберете нас?",
    html: `<p>Открийте <b>предимствата</b> на МАСТЕРТРАФ. <a href=\"/uslugi\">Вижте услугите</a> или <a href=\"/faq\">прочетете ЧЗВ</a>.</p>`,
    ctaUrl: "/uslugi",
    ctaText: "Вижте услугите",
  },
  {
    id: 4,
    title: "Защо да изберете нас?",
    html: `<p>Открийте <b>предимствата</b> на МАСТЕРТРАФ. <a href=\"/uslugi\">Вижте услугите</a> или <a href=\"/faq\">прочетете ЧЗВ</a>.</p>`,
    ctaUrl: "/uslugi",
    ctaText: "Вижте услугите",
  },
  {
    id: 5,
    title: "Защо да изберете нас?",
    html: `<p>Открийте <b>предимствата</b> на МАСТЕРТРАФ. <a href=\"/uslugi\">Вижте услугите</a> или <a href=\"/faq\">прочетете ЧЗВ</a>.</p>`,
    ctaUrl: "/uslugi",
    ctaText: "Вижте услугите",
  },
  {
    id: 6,
    title: "Защо да изберете нас?",
    html: `<p>Открийте <b>предимствата</b> на МАСТЕРТРАФ. <a href=\"/uslugi\">Вижте услугите</a> или <a href=\"/faq\">прочетете ЧЗВ</a>.</p>`,
    ctaUrl: "/uslugi",
    ctaText: "Вижте услугите",
  },
  {
    id: 7,
    title: "Защо да изберете нас?",
    html: `<p>Открийте <b>предимствата</b> на МАСТЕРТРАФ. <a href=\"/uslugi\">Вижте услугите</a> или <a href=\"/faq\">прочетете ЧЗВ</a>.</p>`,
    ctaUrl: "/uslugi",
    ctaText: "Вижте услугите",
  },
  {
    id: 8,
    title: "Защо да изберете нас?",
    html: `<p>Открийте <b>предимствата</b> на МАСТЕРТРАФ. <a href=\"/uslugi\">Вижте услугите</a> или <a href=\"/faq\">прочетете ЧЗВ</a>.</p>`,
    ctaUrl: "/uslugi",
    ctaText: "Вижте услугите",
  },
];

export default function AdminBlogManager() {
  const [articles, setArticles] = useState(initialArticles);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);

  // CRUD handlers (replace with Supabase integration)
  const handleSave = (data) => {
    if (editing) {
      setArticles(
        articles.map((a) => (a.id === editing.id ? { ...a, ...data } : a)),
      );
      setEditing(null);
      setCreating(false);
    } else {
      setArticles([...articles, { ...data, id: Date.now() }]);
      setCreating(false);
      setEditing(null);
    }
  };
  const handleDelete = (id) => {
    setArticles(articles.filter((a) => a.id !== id));
    setEditing(null);
  };

  const nonEditingArticles = editing
    ? articles.filter((article) => article.id !== editing.id)
    : articles;

  return (
    <main className="mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-12 text-center">
        Управление на блог
      </h1>

      <div className="mb-8 flex justify-center">
        <button
          className="inline-flex items-center rounded-xl bg-primary-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600 shadow"
          onClick={() => {
            setCreating(true);
            setEditing(null);
          }}
          disabled={creating || !!editing}
        >
          + Нова статия
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {(creating || editing) && (
          <div className="lg:col-span-3 sm:col-span-2 col-span-1">
            <BlogEditor
              key={creating ? "creating" : `editing-${editing?.id}`}
              article={editing || undefined}
              onSave={handleSave}
              onDelete={editing ? () => handleDelete(editing.id) : undefined}
              onCancel={() => {
                setCreating(false);
                setEditing(null);
              }}
            />
          </div>
        )}

        {nonEditingArticles.map((article) => (
          <article
            key={article.id}
            className="h-[250px] flex flex-col rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 transition hover:shadow-lg"
          >
            <h2 className="text-xl font-bold text-primary-600 mb-3">
              {article.title}
            </h2>
            <div
              className="prose prose-sm max-w-none text-neutral-700 mb-3 overflow-hidden grow"
              style={{ maxHeight: "180px" }}
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
            <div className="mt-auto flex gap-2">
              <button
                className="inline-flex items-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
                onClick={() => {
                  setEditing(article);
                  setCreating(false);
                }}
              >
                Редактирай
              </button>
              <button
                className="inline-flex items-center rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
                onClick={() => handleDelete(article.id)}
              >
                Изтрий
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
