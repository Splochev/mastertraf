"use client";

import { useState } from "react";
import type { FAQItem } from "@/data/faq";

export function FAQSection({
  items,
  title = "Често задавани въпроси",
}: {
  items: FAQItem[];
  title?: string;
}) {
  return (
    <section aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-2xl font-bold text-neutral-900 sm:text-3xl"
      >
        {title}
      </h2>
      <dl className="mt-6 space-y-3">
        {items.map((item, index) => (
          <FAQAccordionItem key={index} item={item} />
        ))}
      </dl>
    </section>
  );
}

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-sm">
      <dt>
        <button
          type="button"
          className="flex w-full items-center justify-between px-5 py-4 text-left"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <span className="text-base font-medium text-neutral-900">
            {item.questionBg}
          </span>
          <svg
            className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </dt>
      {/* Отговорът е ВИНАГИ в DOM (видим за crawler-и), само визуално се скрива */}
      <dd
        id={`faq-answer-${item.questionBg.slice(0, 20).replace(/\s/g, "-")}`}
        className={`border-t border-neutral-100 px-5 py-4 text-sm leading-relaxed text-neutral-600 ${
          open ? "" : "hidden"
        }`}
      >
        {item.answerBg}
      </dd>
    </div>
  );
}
