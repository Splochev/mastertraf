import { cache } from "react";
import { supabase } from "@/lib/supabase/data";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  altBg: string;
  category: string;
  type: "image" | "video";
  description: string;
  videoUrl?: string;
}

export interface GalleryCategory {
  slug: string;
  name: string;
  nameEn: string;
}

export const getGalleryItems = cache(async (): Promise<GalleryItem[]> => {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: String(row.id),
    src: row.src,
    alt: row.alt_en,
    altBg: row.alt_bg,
    category: row.category,
    type: row.type as "image" | "video",
    videoUrl: row.video_url ?? undefined,
    description: row.description ?? '',
  }));
});

export const getGalleryCategories = cache(
  async (): Promise<GalleryCategory[]> => {
    const { data, error } = await supabase
      .from("gallery_categories")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return (data ?? []).map((row) => ({
      slug: row.slug,
      name: row.name,
      nameEn: row.name_en,
    }));
  }
);
