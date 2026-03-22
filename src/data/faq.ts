import { cache } from "react";
import { supabase } from "@/lib/supabase/data";

export interface FAQItem {
  question: string;
  questionBg: string;
  answer: string;
  answerBg: string;
}

export const getFAQItems = cache(async (): Promise<FAQItem[]> => {
  const { data, error } = await supabase
    .from("faq")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    question: row.question_en,
    questionBg: row.question_bg,
    answer: row.answer_en,
    answerBg: row.answer_bg,
  }));
});
