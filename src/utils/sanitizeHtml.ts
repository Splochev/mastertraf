import sanitize from "sanitize-html";

/**
 * Strips scripts, event handlers (onclick, onerror, ...) and javascript: URLs
 * from article HTML stored in the database, keeping only formatting markup.
 */
export function sanitizeArticleHtml(html: string): string {
  return sanitize(html, {
    allowedTags: [
      ...sanitize.defaults.allowedTags,
      "img",
      "figure",
      "figcaption",
      "iframe",
    ],
    allowedAttributes: {
      "*": ["class"],
      a: ["href", "target", "rel", "title"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      iframe: ["src", "width", "height", "title", "allow", "allowfullscreen", "frameborder"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    // older articles may contain base64-embedded images
    allowedSchemesByTag: { img: ["http", "https", "data"] },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
    transformTags: {
      a: (tagName, attribs) =>
        attribs.target === "_blank"
          ? { tagName, attribs: { ...attribs, rel: "noopener noreferrer" } }
          : { tagName, attribs },
    },
  });
}
