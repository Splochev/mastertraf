/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { renderHtml, generateSlug } from "@/utils/blogUtils";
import type { EditorBlock } from "./EditorCore";

const EditorCore = dynamic(() => import("./EditorCore"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center gap-2 min-h-60 rounded-lg border border-neutral-200 p-4 text-sm text-neutral-400">
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-500" />
      Зарежда редактора…
    </div>
  ),
});

// ─── Types ────────────────────────────────────────────────────────────────────

type ChecklistItem = { text: string; checked?: boolean };

export interface ArticleFormData {
  id?: number;
  title: string;
  html: string;
  slug: string;
  ctaUrl: string;
  ctaText: string;
  category: string;
  date: string;
}

interface BlogEditorProps {
  article?: {
    id?: number;
    title?: string;
    html?: string;
    slug?: string;
    cta_url?: string;
    cta_text?: string;
    category?: string | null;
    date?: string | null;
  };
  onSave: (data: ArticleFormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  onCancel: () => void;
}

// ─── HTML serialisers ─────────────────────────────────────────────────────────

export const blocksToHtml = (blocks: Array<EditorBlock>): string =>
  blocks
    .map((block) => {
      const d = block.data || {};
      switch (block.type) {
        case "header": {
          const lvl = (d.level as number) || 2;
          return `<h${lvl}>${d.text ?? ""}</h${lvl}>`;
        }
        case "paragraph": {
          const text = (d.text as string) || "";
          // If user entered [image] markup manually, keep it verbatim and avoid converting to <p> so we preserve custom syntax.
          if (text.match(/\[image\]\s*\{?\s*https?:\/\/[^\]}\s]+\s*\}?\s*\[\/image\]/i)) {
            return text;
          }
          return `<p>${text}</p>`;
        }
        case "list": {
          const tag = d.style === "ordered" ? "ol" : "ul";
          const items = Array.isArray(d.items)
            ? (d.items as string[]).map((i) => `<li>${i}</li>`).join("")
            : "";
          return `<${tag}>${items}</${tag}>`;
        }
        case "quote":
          return `<blockquote><p>${d.text ?? ""}</p><cite>${d.caption ?? ""}</cite></blockquote>`;
        case "code":
          return `<pre><code>${d.code ?? ""}</code></pre>`;
        case "image": {
          const url =
            (d.file as { url?: string } | undefined)?.url ||
            (d.url as string | undefined) ||
            "";
          // Emit as [image] tag so it round-trips correctly through the DB
          // and is rendered by renderHtml() on the public side.
          return `[image]${url}[/image]`;
        }
        case "checklist": {
          const items = Array.isArray(d.items) ? (d.items as ChecklistItem[]) : [];
          return `<ul class="checklist">${items
            .map((it) => `<li class="${it.checked ? "checked" : ""}"><span>${it.text}</span></li>`)
            .join("")}</ul>`;
        }
        case "linkTool": {
          const link = (d.link as string) || "";
          const title = (d.meta as { title?: string } | undefined)?.title || link;
          return `<a href="${link}" target="_blank" rel="noreferrer noopener">${title}</a>`;
        }
        default:
          return `<pre>${JSON.stringify(block, null, 2)}</pre>`;
      }
    })
    .join("");

export const htmlToBlocks = (html: string): EditorBlock[] => {
  if (typeof window === "undefined" || !html?.trim()) return [];

  // Keep [image] markup unparsed and only convert real figures/IMG tags.
  const withFigures = html.replace(
    /<figure>[\s\S]*?<img[^>]+>[\s\S]*?<\/figure>/gi,
    (figureHtml) => figureHtml
  );

  const doc = new DOMParser().parseFromString(withFigures, "text/html");
  const blocks: EditorBlock[] = [];

  doc.body.childNodes.forEach((node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (/^h[1-6]$/.test(tag)) {
      blocks.push({ type: "header", data: { text: el.innerHTML, level: parseInt(tag[1]) } });
    } else if (tag === "figure") {
      const img = el.querySelector("img");
      if (img?.getAttribute("src")) {
        blocks.push({
          type: "image",
          data: {
            file: { url: img.getAttribute("src") ?? "" },
            caption: el.querySelector("figcaption")?.innerHTML ?? img.getAttribute("alt") ?? "",
          },
        });
      }
    } else if (tag === "p") {
      const onlyImg =
        el.querySelectorAll("img").length === 1 && el.childNodes.length === 1;
      if (onlyImg) {
        const img = el.querySelector("img")!;
        blocks.push({
          type: "image",
          data: {
            file: { url: img.getAttribute("src") ?? "" },
            caption: img.getAttribute("alt") ?? "",
          },
        });
        return;
      }
      blocks.push({ type: "paragraph", data: { text: el.innerHTML } });
    } else if (tag === "ul" || tag === "ol") {
      blocks.push({
        type: "list",
        data: {
          style: tag === "ol" ? "ordered" : "unordered",
          items: Array.from(el.querySelectorAll("li")).map((li) => li.innerHTML),
        },
      });
    } else if (tag === "blockquote") {
      blocks.push({
        type: "quote",
        data: {
          text: el.querySelector("p")?.innerHTML ?? el.innerHTML,
          caption: el.querySelector("cite")?.innerHTML ?? "",
        },
      });
    } else if (tag === "pre") {
      blocks.push({
        type: "code",
        data: { code: el.querySelector("code")?.textContent ?? el.textContent },
      });
    } else {
      blocks.push({ type: "paragraph", data: { text: el.innerHTML } });
    }
  });

  if (blocks.length === 0 && html.trim()) {
    blocks.push({ type: "paragraph", data: { text: html } });
  }

  return blocks;
};

// ─── Field ────────────────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-neutral-700">
        {label}
        {hint && <span className="ml-2 font-normal text-neutral-400">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-neutral-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";

// ─── Preview ──────────────────────────────────────────────────────────────────

function ArticlePreview({ title, html }: { title: string; html: string }) {
  const renderedHtml = renderHtml(html);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      {/* Mimic public article header */}
      <div className="mb-8 border-b border-neutral-100 pb-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-px w-8 bg-primary-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary-500">
            Преглед
          </span>
        </div>
        <h1 className="text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl">
          {title || <span className="text-neutral-300">Без заглавие</span>}
        </h1>
      </div>

      {/* Article body — same prose classes as public page */}
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
          [&_.article-figure_figcaption]:text-center [&_.article-figure_figcaption]:text-sm
          [&_.article-figure_figcaption]:text-neutral-400 [&_.article-figure_figcaption]:mt-3
          [&_.article-figure_figcaption]:capitalize
        "
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const BlogEditor: React.FC<BlogEditorProps> = ({
  article,
  onSave,
  onDelete,
  onCancel,
}) => {
  const editorInstanceRef = useRef<any>(null);

  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [ctaUrl, setCtaUrl] = useState(article?.cta_url ?? "/kontakti");
  const [ctaText, setCtaText] = useState(article?.cta_text ?? "Научете повече");
  const [category, setCategory] = useState(article?.category ?? "");
  const [date, setDate] = useState(article?.date ?? "");

  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!article?.slug);

  // Auto-generate slug from title unless user has manually edited it
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugManuallyEdited) {
      setSlug(generateSlug(value));
    }
  };

  const handleEditorReady = useCallback((editor: any) => {
    editorInstanceRef.current = editor;
    setReady(true);
  }, []);

  const handleEditorError = useCallback(() => {
    setError("Грешка при зареждане на редактора.");
  }, []);

  const getHtml = async (): Promise<string | null> => {
    if (!editorInstanceRef.current) return null;
    const data = await editorInstanceRef.current.save();
    return blocksToHtml(data.blocks ?? []);
  };

  const handlePreview = async () => {
    const html = await getHtml();
    if (html !== null) setPreviewHtml(html);
  };

  const handleSave = async () => {
    if (!editorInstanceRef.current) { setError("Редакторът още не е готов."); return; }
    if (!title.trim()) { setError("Моля въведете заглавие."); return; }
    if (!slug.trim()) { setError("Моля въведете slug."); return; }
    if (!ctaText.trim()) { setError("Моля въведете текст на бутона."); return; }
    if (!ctaUrl.trim()) { setError("Моля въведете URL на бутона."); return; }

    setSaving(true);
    setError(null);
    try {
      const html = await getHtml();
      if (html === null) throw new Error("Could not read editor content");
      await onSave({
        id: article?.id,
        title: title.trim(),
        html,
        slug: slug.trim(),
        ctaUrl: ctaUrl.trim(),
        ctaText: ctaText.trim(),
        category: category.trim(),
        date: date.trim(),
      });
    } catch (e: any) {
      setError(e?.message ?? "Неуспешно записване. Опитайте отново.");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!confirm("Сигурни ли сте, че искате да изтриете тази статия?")) return;
    setDeleting(true);
    try {
      await onDelete();
    } catch (e: any) {
      setError(e?.message ?? "Грешка при изтриване.");
    } finally {
      setDeleting(false);
    }
  };

  const initialBlocks = article?.html ? htmlToBlocks(article.html) : [];

  return (
    <div className="space-y-6">
      {/* ── Edit form ── */}
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 space-y-5">

        {/* Row 1: Title */}
        <Field label="Заглавие">
          <input
            className={inputCls}
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Как да изберем правилния електрожен?"
          />
        </Field>

        {/* Row 2: Slug */}
        <Field label="Slug (URL)" hint="— автоматично от заглавието">
          <div className="flex items-center gap-2">
            <span className="shrink-0 rounded-l-xl border border-r-0 border-neutral-300 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-400">
              /blog/
            </span>
            <input
              className="flex-1 rounded-r-xl border border-neutral-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugManuallyEdited(true);
              }}
              placeholder="kak-da-izberem-elektrozhen"
            />
          </div>
        </Field>

        {/* Row 3: Category + Date */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Категория" hint="(по избор)">
            <input
              className={inputCls}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Новини"
            />
          </Field>
          <Field label="Дата" hint="(по избор)">
            <input
              className={inputCls}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="12 март 2025"
            />
          </Field>
        </div>

        {/* Row 4: CTA */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Текст на бутона">
            <input
              className={inputCls}
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="Научете повече"
            />
          </Field>
          <Field label="URL на бутона">
            <input
              className={inputCls}
              value={ctaUrl}
              onChange={(e) => setCtaUrl(e.target.value)}
              placeholder="/kontakti"
            />
          </Field>
        </div>

        {/* Row 5: Editor */}
        <Field label="Текст на статията" hint="— поддържа [image]url[/image] тагове">
          <EditorCore
            key={article?.id ?? "new"}
            initialBlocks={initialBlocks}
            onReady={handleEditorReady}
            onError={handleEditorError}
          />
        </Field>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={handleSave}
            disabled={!ready || saving}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? (
              <>
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Запазва…
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Запази статия
              </>
            )}
          </button>

          <button
            onClick={handlePreview}
            disabled={!ready}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Преглед
          </button>

          <button
            onClick={onCancel}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Откажи
          </button>

          {onDelete && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="ml-auto inline-flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50 transition-colors"
            >
              {deleting ? "Изтрива…" : "Изтрий статията"}
            </button>
          )}
        </div>
      </div>

      {/* ── Live preview ── */}
      {previewHtml !== null && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
              Преглед на статията
            </p>
            <button
              onClick={() => setPreviewHtml(null)}
              className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              Затвори ✕
            </button>
          </div>
          <ArticlePreview title={title} html={previewHtml} />
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
