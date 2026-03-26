// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Extract the first [image]...[/image] URL from raw html */
export function firstImage(html: string): string | null {
  const m = html.match(/\[image\]\s*\{?\s*(https?:\/\/[^\]}\s]+)\s*\}?\s*\[\/image\]/);
  return m ? m[1] : null;
}

/** Strip html tags and [image] markers → plain text */
export function stripHtml(html: string) {
  return html
    .replace(/\[image\]\s*\{?\s*https?:\/\/[^\]}\s]+\s*\}?\s*\[\/image\]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Short excerpt, word-boundary aware */
export function excerpt(html: string, maxChars = 150) {
  const text = stripHtml(html);
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).replace(/\s\S*$/, "") + "…";
}

/**
 * Convert raw article html to renderable html:
 * - Replaces [image]url[/image] and [image]{url}[/image] with a proper <figure><img /></figure>
 * - Alt text = decoded filename without extension, hyphens → spaces
 */
export function renderHtml(html: string): string {
  return html.replace(/\[image\]\s*\{?\s*(https?:\/\/[^\]}\s]+)\s*\}?\s*\[\/image\]/g, (_, url) => {
    const filename = url.split("/").pop()?.split("?")[0] ?? "";
    const alt = decodeURIComponent(filename)
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]/g, " ")
      .trim();
    return `<figure class="article-figure"><img src="${url}" alt="${alt}" loading="lazy" /><figcaption>${alt}</figcaption></figure>`;
  });
}

/** Normalize links in raw HTML so they inherit site article link style */
export function styleLinks(html: string): string {
  return html.replace(/<a\s+href="([^"]+)"([^>]*)>/gi, (match, href, attrs) => {
    // Keep existing attrs and add Tailwind prose link helper classes if missing
    if (/class\s*=/.test(attrs)) {
      return `<a href="${href}"${attrs}>`;
    }
    return `<a href="${href}"${attrs} class="text-primary-500 no-underline hover:underline">`;
  });
}


export function generateSlug(title: string): string {
  const charMap: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sht",
    ъ: "a",
    ь: "",
    ю: "yu",
    я: "ya",
  };

  return title
    .toLowerCase()
    .split("")
    .map((c) => charMap[c] ?? c)
    .join("")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
