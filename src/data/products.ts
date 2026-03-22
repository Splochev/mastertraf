import { cache } from "react";
import { supabase } from "@/lib/supabase/data";

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameBg: string;
  shortDescription: string;
  shortDescriptionBg: string;
  description: string;
  descriptionBg: string;
  specs: { label: string; labelBg: string; value: string }[];
  features: string[];
  featuresBg: string[];
  image: string;
  images: string[];
  price?: string;
  availability: "in-stock" | "made-to-order" | "contact";
  warranty: string;
  category: string;
  categorySlug: string;
}

export interface ProductCategory {
  slug: string;
  name: string;
  nameEn: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(row: any): Product {
  return {
    id: String(row.id),
    slug: row.slug,
    name: row.name_en,
    nameBg: row.name_bg,
    shortDescription: row.short_description_en,
    shortDescriptionBg: row.short_description_bg,
    description: row.description_en,
    descriptionBg: row.description_bg,
    specs: row.specs ?? [],
    features: row.features_en ?? [],
    featuresBg: row.features_bg ?? [],
    image: row.image,
    images: row.images ?? [],
    price: row.price ?? undefined,
    availability: row.availability,
    warranty: row.warranty,
    category: row.product_categories?.name ?? "",
    categorySlug: row.category_slug,
  };
}

export const getProducts = cache(async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*, product_categories(name)")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map(mapProduct);
});

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | undefined> => {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_categories(name)")
      .eq("slug", slug)
      .single();
    if (error) return undefined;
    return mapProduct(data);
  }
);

export const getProductsByCategory = cache(
  async (categorySlug: string): Promise<Product[]> => {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_categories(name)")
      .eq("category_slug", categorySlug)
      .order("sort_order");
    if (error) throw error;
    return (data ?? []).map(mapProduct);
  }
);

export const getCategories = cache(
  async (): Promise<ProductCategory[]> => {
    const { data, error } = await supabase
      .from("product_categories")
      .select("slug, name, name_en")
      .order("sort_order");
    if (error) throw error;
    return (data ?? []).map((row) => ({
      slug: row.slug,
      name: row.name,
      nameEn: row.name_en,
    }));
  }
);
