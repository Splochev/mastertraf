/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";

export type EditorBlock = { type: string; data: Record<string, unknown> };

interface EditorCoreProps {
  initialBlocks: EditorBlock[];
  onReady: (editor: any) => void;
  onError: () => void;
}


// ─── Component ────────────────────────────────────────────────────────────────

const EditorCore: React.FC<EditorCoreProps> = ({
  initialBlocks,
  onReady,
  onError,
}) => {
  const holderRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder || editorRef.current) return;

    holder.innerHTML = "";

    let editor: any;
    const handlePaste = (event: ClipboardEvent) => {
      const pasted = event.clipboardData?.getData("text/plain")?.trim();
      if (!pasted) return;

      const imageTagRe = /\[image\]\s*(https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|gif|webp|svg))\s*\[\/image\]/i;
      const imageUrlRe = /^(https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|gif|webp|svg))$/i;

      if (imageTagRe.test(pasted) || imageUrlRe.test(pasted)) {
        event.preventDefault();
        if (editor) {
          const index = editor.blocks.getCurrentBlockIndex();
          editor.blocks.insert("paragraph", { text: pasted }, {}, index + 1);
        }
      }
    };

    holder.addEventListener("paste", handlePaste);

    try {
      editor = new EditorJS({
        holder,
        data: initialBlocks.length ? { blocks: initialBlocks } : undefined,
        autofocus: true,
        placeholder: "Започнете да пишете текста на статията...",
        tools: {
          header: Header,
          list: List,
          linkTool: {
            class: LinkTool,
            config: { endpoint: "https://api.allorigins.win/raw?url=" },
          },
        },
        onReady() {
          editorRef.current = editor;
          onReady(editor);
        },
      });
    } catch (error) {
      console.error("EditorJS init failed", error);
      onError();
    }

    return () => {
      holder.removeEventListener("paste", handlePaste);
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        ref={holderRef}
        className="min-h-60 w-full max-w-full rounded-lg border border-neutral-200 p-4"
      />
      <style jsx global>{`
        /* Remove EditorJS's hardcoded 650px cap so the toolbar
           positions correctly at any container width */
        .ce-block__content,
        .ce-toolbar__content {
          max-width: 100% !important;
        }
        .codex-editor__redactor {
          padding-bottom: 0 !important;
          min-height: 220px !important;
          box-sizing: border-box;
        }
        .ce-toolbar {
          z-index: 999 !important;
        }
        .codex-editor__redactor > .ce-block:last-child {
          margin-bottom: 1rem;
        }
        /* Image tool */
        .image-tool__image {
          max-width: 100% !important;
        }
        .image-tool__image-picture {
          max-width: 100% !important;
          height: auto !important;
          display: block;
        }
      `}</style>
    </>
  );
};

export default EditorCore;
