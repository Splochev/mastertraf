import { createClient } from "@/lib/supabase/server";

export interface Article {
  id: number;
  title: string;
  html: string;
  slug: string;
  ctaUrl: string;
  ctaText: string;
  category: string | null;
  date: string | null;
  created_at?: string;
  updated_at?: string;
}

export type ArticlePayload = Omit<Article, "id" | "created_at" | "updated_at">;

interface SupabaseArticleRow {
  id: number;
  title: string;
  html: string;
  slug: string;
  cta_url?: string | null;
  cta_text?: string | null;
  category?: string | null;
  date?: string | null;
  created_at?: string;
  updated_at?: string;
}

function mapArticle(raw: SupabaseArticleRow): Article {
  return {
    id: raw.id,
    title: raw.title,
    html: raw.html,
    slug: raw.slug,
    ctaUrl: raw.cta_url ?? "/kontakti",
    ctaText: raw.cta_text ?? "Научете повече",
    category: raw.category ?? null,
    date: raw.date ?? null,
    created_at: raw.created_at,
    updated_at: raw.updated_at,
  };
}



export async function getAllArticles(): Promise<Article[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllArticles error:", error.message);
    return [];
  }

  if (!data) return [];

  return data.map(mapArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116" || error.details?.includes("No rows")) {
      return null;
    }
    console.error("getArticleBySlug error:", error.message);
    return null;
  }

  if (!data) return null;
  return mapArticle(data);
}

export async function createArticle(payload: ArticlePayload): Promise<Article> {
  const supabase = await createClient();
  const row = {
    title: payload.title,
    html: payload.html,
    slug: payload.slug,
    cta_url: payload.ctaUrl,
    cta_text: payload.ctaText,
    category: payload.category,
    date: payload.date,
  };

  const { data, error } = await supabase
    .from("articles")
    .insert([row])
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No data returned from createArticle");

  return mapArticle(data);
}

export async function updateArticle(
  id: number,
  payload: Partial<ArticlePayload>
): Promise<Article> {
  const supabase = await createClient();

  const updatePayload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (payload.title !== undefined) updatePayload.title = payload.title;
  if (payload.html !== undefined) updatePayload.html = payload.html;
  if (payload.slug !== undefined) updatePayload.slug = payload.slug;
  if (payload.ctaUrl !== undefined) updatePayload.cta_url = payload.ctaUrl;
  if (payload.ctaText !== undefined) updatePayload.cta_text = payload.ctaText;
  if (payload.category !== undefined) updatePayload.category = payload.category;
  if (payload.date !== undefined) updatePayload.date = payload.date;

  const { data, error } = await supabase
    .from("articles")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No data returned from updateArticle");

  return mapArticle(data);
}

export async function deleteArticle(id: number): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

