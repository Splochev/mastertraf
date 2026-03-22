"use client";

import { useState } from "react";
import type { GalleryItem } from "@/data/gallery";

interface GalleryCategory {
  slug: string;
  name: string;
}

export function GalleryFilter({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: GalleryCategory[];
}) {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <>
      <nav className="mt-8" aria-label="Филтър по категория">
        <ul className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                type="button"
                onClick={() => setActive(cat.slug)}
                className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === cat.slug
                    ? "bg-primary-500 text-white"
                    : "border border-neutral-300 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-600"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200"
          >
            <div className="flex h-full items-center justify-center">
              {item.type === "video" ? (
                <div className="text-center">
                  <svg className="mx-auto h-16 w-16 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                  </svg>
                  <p className="mt-1 text-sm text-neutral-500">Видео</p>
                </div>
              ) : (
                <svg className="h-16 w-16 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              )}
            </div>

            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="p-4">
                <p className="text-sm font-medium text-white">{item.altBg}</p>
                {item.type === "video" && item.videoUrl && (
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary-300 hover:text-primary-200"
                  >
                    Гледай в YouTube
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {item.type === "video" && (
              <div className="absolute right-3 top-3">
                <span className="inline-flex items-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
                  <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Видео
                </span>
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
