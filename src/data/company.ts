import { cache } from "react";
import { supabase } from "@/lib/supabase/data";

export interface CompanyInfo {
  name: string;
  nameEn: string;
  legalName: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  values: { bg: string; en: string }[];
  mission: string;
  missionEn: string;
  contact: {
    address: string;
    addressEn: string;
    phone: string;
    email: string;
    workingHours: string;
    workingHoursEn: string;
    weekends: string;
    weekendsEn: string;
  };
  social: {
    facebook: string[];
    youtube: string;
  };
  mapCoordinates: { lat: number; lng: number };
  domain: string;
  founded: string;
}

export const getCompanyInfo = cache(async (): Promise<CompanyInfo> => {
  const { data, error } = await supabase
    .from("company_info")
    .select("*")
    .single();
  if (error) throw error;
  return {
    name: data.name,
    nameEn: data.name_en,
    legalName: data.legal_name,
    tagline: data.tagline,
    taglineEn: data.tagline_en,
    description: data.description,
    descriptionEn: data.description_en,
    values: data.values as { bg: string; en: string }[],
    mission: data.mission,
    missionEn: data.mission_en,
    contact: data.contact as CompanyInfo["contact"],
    social: data.social as CompanyInfo["social"],
    mapCoordinates: { lat: data.map_lat, lng: data.map_lng },
    domain: data.domain,
    founded: data.founded,
  };
});
