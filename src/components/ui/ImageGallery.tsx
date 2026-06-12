"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

function isYouTubeEmbed(src: string): boolean {
  return src.includes("<iframe") && src.includes("youtube.com/embed");
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        <div className="flex h-full items-center justify-center">
          <svg
            className="h-24 w-24 text-neutral-300"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Main image or video */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        {isYouTubeEmbed(images[selectedIndex]) ? (
          <div
            dangerouslySetInnerHTML={{ __html: images[selectedIndex] }}
            className="flex h-full w-full items-center justify-center"
          />
        ) : (
          <Image
            src={images[selectedIndex]}
            alt={`${alt} – ${selectedIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={selectedIndex === 0}
          />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, i) => {
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                  i === selectedIndex
                    ? "border-primary-500"
                    : "border-transparent hover:border-neutral-300"
                }`}
              >
                {isYouTubeEmbed(src) ? (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-800">
                    <svg
                      className="h-8 w-8 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                ) : (
                  <Image
                    src={src}
                    alt={`${alt} – миниатюра ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
