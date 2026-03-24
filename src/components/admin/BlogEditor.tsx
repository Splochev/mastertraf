/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { EditorBlock } from "./EditorCore";

const EditorCore = dynamic(() => import("./EditorCore"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center gap-2 min-h-[240px] rounded-lg border border-neutral-200 p-4 text-sm text-neutral-400">
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-500" />
      Зарежда редактора…
    </div>
  ),
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

type ChecklistItem = { text: string; checked?: boolean };

export const blocksToHtml = (blocks: Array<EditorBlock>): string =>
  blocks
    .map((block) => {
      const d = block.data || {};
      switch (block.type) {
        case "header": {
          const lvl = (d.level as number) || 2;
          return `<h${lvl}>${d.text ?? ""}</h${lvl}>`;
        }
        case "paragraph":
          return `<p>${d.text ?? ""}</p>`;
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
          const imageUrl =
            (d.file as { url?: string } | undefined)?.url ||
            (d as { url?: string }).url ||
            "";
          const caption = (d.caption as string | undefined) || "";
          return `<figure><img src="${imageUrl}" alt="${caption}" loading="lazy"/><figcaption>${caption}</figcaption></figure>`;
        }
        case "checklist": {
          const items = Array.isArray(d.items)
            ? (d.items as ChecklistItem[])
            : [];
          return `<ul class="checklist">${items
            .map(
              (it) =>
                `<li class="${it.checked ? "checked" : ""}"><span>${it.text}</span></li>`,
            )
            .join("")}</ul>`;
        }
        case "linkTool": {
          const link = (d.link as string) || "";
          const title =
            (d.meta as { title?: string } | undefined)?.title || link;
          return `<a href="${link}" target="_blank" rel="noreferrer noopener">${title}</a>`;
        }
        default:
          return `<pre>${JSON.stringify(block, null, 2)}</pre>`;
      }
    })
    .join("");

export const htmlToBlocks = (html: string): EditorBlock[] => {
  if (typeof window === "undefined" || !html?.trim()) return [];
  const doc = new DOMParser().parseFromString(html, "text/html");
  const blocks: EditorBlock[] = [];

  doc.body.childNodes.forEach((node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (/^h[1-6]$/.test(tag)) {
      blocks.push({
        type: "header",
        data: { text: el.innerHTML, level: parseInt(tag[1]) },
      });
    } else if (tag === "img") {
      blocks.push({
        type: "image",
        data: {
          file: { url: el.getAttribute("src") ?? "" },
          caption: el.getAttribute("alt") ?? "",
        },
      });
    } else if (tag === "figure") {
      const img = el.querySelector("img");
      const caption = el.querySelector("figcaption")?.innerHTML ?? img?.getAttribute("alt") ?? "";
      if (img?.getAttribute("src")) {
        blocks.push({
          type: "image",
          data: {
            file: { url: img.getAttribute("src") ?? "" },
            caption,
          },
        });
      }
    } else if (tag === "p") {
      // If paragraph contains only an image, convert to image block.
      const onlyImg = el.querySelectorAll("img").length === 1 && el.childNodes.length === 1;
      if (onlyImg) {
        const img = el.querySelector("img");
        if (img?.getAttribute("src")) {
          blocks.push({
            type: "image",
            data: {
              file: { url: img.getAttribute("src") ?? "" },
              caption: img.getAttribute("alt") ?? "",
            },
          });
          return;
        }
      }
      blocks.push({ type: "paragraph", data: { text: el.innerHTML } });
    } else if (tag === "ul" || tag === "ol") {
      blocks.push({
        type: "list",
        data: {
          style: tag === "ol" ? "ordered" : "unordered",
          items: Array.from(el.querySelectorAll("li")).map(
            (li) => li.innerHTML,
          ),
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

// ─── Types ────────────────────────────────────────────────────────────────────

interface ArticlePayload {
  title: string;
  html: string;
}

interface BlogEditorProps {
  article?: {
    id?: number | string;
    title?: string;
    html?: string;
  };
  onSave: (article: ArticlePayload) => void;
  onDelete?: () => void;
  onCancel: () => void;
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
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stable callback — EditorCore calls this once when EditorJS is ready
  const handleEditorReady = useCallback((editor: any) => {
    editorInstanceRef.current = editor;
    setReady(true);
  }, []);

  const handleEditorError = useCallback(() => {
    setError("Грешка при зареждане на редактора.");
  }, []);

  const handleSave = async () => {
    if (!editorInstanceRef.current) {
      setError("Редакторът още не е готов.");
      return;
    }
    if (!title.trim()) {
      setError("Моля въведете заглавие на статията.");
      return;
    }
    setSaving(true);
    try {
      const data = await editorInstanceRef.current.save();
      onSave({ title: title.trim(), html: blocksToHtml(data.blocks ?? []) });
    } catch (e) {
      setError("Неуспешно записване. Опитайте отново.");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  // Compute initial blocks once — memo not needed, EditorCore only reads this on mount
  const initialBlocks = article?.html ? htmlToBlocks(article.html) : [];

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6">
      {/* Title */}
      <div className="mb-4">
        <label
          className="mb-1 block font-semibold text-neutral-700"
          htmlFor="blog-title"
        >
          Заглавие
        </label>
        <input
          id="blog-title"
          className="w-full rounded-xl border border-neutral-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Например: Как да оптимизирате сайта си"
        />
      </div>

      {/* Editor body */}
      <div className="mb-4">
        <div className="mb-2 font-semibold text-neutral-700">
          Текст на статията
        </div>
        {/*
          Key prop on EditorCore forces a full unmount+remount when switching
          articles. This is intentional — EditorJS has no "replace content" API.
        */}
        <EditorCore
          key={article?.id ?? "new"}
          initialBlocks={initialBlocks}
          onReady={handleEditorReady}
          onError={handleEditorError}
        />
      </div>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleSave}
          disabled={!ready || saving}
          className="inline-flex items-center justify-center rounded-xl bg-primary-500 px-5 py-2 text-base font-semibold text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Запазва…" : "Запази статия"}
        </button>

        <button
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-5 py-2 text-base font-semibold text-neutral-700 transition hover:bg-neutral-100"
        >
          Откажи
        </button>

        {onDelete && (
          <button
            onClick={onDelete}
            className="inline-flex items-center justify-center rounded-xl bg-red-500 px-5 py-2 text-base font-semibold text-white transition hover:bg-red-600"
          >
            Изтрий
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
