"use client";
import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import BlogEditor, {
  type ArticleFormData,
} from "@/components/admin/BlogEditor";
import { excerpt, firstImage } from "@/utils/blogUtils";
import {
  saveArticleAction,
  deleteArticleAction,
} from "@/app/admin/blog/blogActions";
import type { Article } from "@/data/blog";

// ─── Article card (admin grid) ────────────────────────────────────────────────

function AdminArticleCard({
  article,
  onEdit,
  onDelete,
}: {
  article: Article;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const thumb = firstImage(article.html);
  const text = excerpt(article.html, 100);

  return (
    <article className="group flex flex-col rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-36 bg-neutral-100 shrink-0 overflow-hidden">
        {thumb ? (
          <Image
            src={thumb}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(min-width: 1024px) 25vw, 100vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
            <svg
              className="h-10 w-10 text-neutral-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {/* Category badge */}
        {article.category && (
          <div className="absolute top-2 left-2">
            <span className="rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-primary-600">
              {article.category}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-sm font-bold text-neutral-900 leading-snug line-clamp-2 flex-1">
            {article.title}
          </h2>
        </div>

        {/* Slug pill */}
        <div className="flex items-center gap-1 text-xs text-neutral-400">
          <svg
            className="h-3 w-3 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <span className="truncate font-mono">/blog/{article.slug}</span>
        </div>

        <p className="text-xs text-neutral-500 line-clamp-2 flex-1">{text}</p>

        {article.date && (
          <p className="text-xs text-neutral-400">{article.date}</p>
        )}

        {/* Actions */}
        <div className="mt-2 flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-600 transition-colors"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Редактирай
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminBlogManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Article | null>(null);
  const [creating, setCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Fetch on mount
  useEffect(() => {
    let active = true;
    fetch("/api/admin/articles")
      .then((r) => r.json())
      .then((data) => {
        if (active) {
          setArticles(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const refresh = () => {
    fetch("/api/admin/articles")
      .then((r) => r.json())
      .then(setArticles)
      .catch(console.error);
  };

  const handleSave = async (data: ArticleFormData) => {
    await saveArticleAction(data);
    startTransition(() => {
      setEditing(null);
      setCreating(false);
      refresh();
    });
  };

  const handleDelete = async (id: number) => {
    await deleteArticleAction(id);
    startTransition(() => {
      setEditing(null);
      refresh();
    });
  };

  const isFormOpen = creating || !!editing;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Управление на блог
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {articles.length} {articles.length === 1 ? "статия" : "статии"}
          </p>
        </div>
        <button
          disabled={isFormOpen}
          onClick={() => {
            setCreating(true);
            setEditing(null);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Нова статия
        </button>
      </div>

      {/* Editor form (spans full width above the grid) */}
      {isFormOpen && (
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              {creating ? "Нова статия" : `Редактиране: ${editing?.title}`}
            </span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>
          <BlogEditor
            key={creating ? "new" : `edit-${editing?.id}`}
            article={editing ?? undefined}
            onSave={handleSave}
            onDelete={editing ? () => handleDelete(editing.id) : undefined}
            onCancel={() => {
              setCreating(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {/* Articles grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24 text-neutral-400">
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-500 mr-3" />
          Зарежда…
        </div>
      ) : articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 py-24 text-neutral-400">
          <svg
            className="mb-4 h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-sm font-semibold">Няма статии</p>
          <p className="mt-1 text-xs">
            Натиснете „Нова статия“ за да започнете.
          </p>
        </div>
      ) : (
        <div
          className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-opacity ${isPending ? "opacity-50" : "opacity-100"}`}
        >
          {articles
            .filter((a) => !editing || a.id !== editing.id)
            .map((article) => (
              <AdminArticleCard
                key={article.id}
                article={article}
                onEdit={() => {
                  setEditing(article);
                  setCreating(false);
                }}
                onDelete={() => handleDelete(article.id)}
              />
            ))}
        </div>
      )}
    </main>
  );
}
