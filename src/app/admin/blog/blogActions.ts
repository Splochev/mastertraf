"use server";

import { revalidatePath } from "next/cache";
import { createArticle, updateArticle, deleteArticle, type ArticlePayload } from "@/data/blog";
import { generateSlug } from "@/utils/blogUtils";

export interface SaveArticleInput {
  id?: number;
  title: string;
  html: string;
  slug: string;
  ctaUrl: string;
  ctaText: string;
  category: string;
  date: string;
}

export async function saveArticleAction(input: SaveArticleInput) {
  const payload: ArticlePayload = {
    title: input.title.trim(),
    html: input.html,
    slug: input.slug.trim() || generateSlug(input.title),
    ctaUrl: input.ctaUrl.trim() || "/kontakti",
    ctaText: input.ctaText.trim() || "Научете повече",
    category: input.category.trim() || null,
    date: input.date.trim() || null,
  };

  if (input.id) {
    await updateArticle(input.id, payload);
  } else {
    await createArticle(payload);
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${payload.slug}`);
  revalidatePath("/admin/blog");
}

export async function deleteArticleAction(id: number) {
  await deleteArticle(id);
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}
