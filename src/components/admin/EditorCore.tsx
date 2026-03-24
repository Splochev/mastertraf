/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";

export type EditorBlock = { type: string; data: Record<string, unknown> };

interface EditorCoreProps {
  initialBlocks: EditorBlock[];
  onReady: (editor: any) => void;
  onError: () => void;
}

const EditorCore: React.FC<EditorCoreProps> = ({
  initialBlocks,
  onReady,
  onError,
}) => {
  const holderRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder || editorRef.current) return; // guard: never double-init

    holder.innerHTML = ""; // clear any previous dom artifacts before init

    let editor: any;
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
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: "/api/editorjs/image",
                byUrl: "/api/editorjs/image",
              },
              field: "image",
            },
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
      return;
    }

    return () => {
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
        className="min-h-[240px] w-full max-w-full rounded-lg border border-neutral-200 p-4"
      />
      <style jsx global>{`
        /* EditorJS hardcodes max-width: 650px on .ce-block__content and
           .ce-toolbar__content. The toolbar is absolutely positioned
           relative to .ce-block__content, so when the editor is wider
           than 650px the toolbar drifts. Removing the cap fixes it. */
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
      `}</style>
    </>
  );
};

export default EditorCore;
