import { cache } from "react";
import { supabase } from "@/lib/supabase/data";

export interface Service {
  id: string;
  slug: string;
  title: string;
  titleBg: string;
  description: string;
  descriptionBg: string;
  icon: string;
  price: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapService(row: any): Service {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title_en,
    titleBg: row.title_bg,
    description: row.description_en,
    descriptionBg: row.description_bg,
    icon: row.icon,
    price: row.price,
  };
}

export const getServices = cache(async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map(mapService);
});

export const getServiceBySlug = cache(
  async (slug: string): Promise<Service | undefined> => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) return undefined;
    return mapService(data);
  }
);
