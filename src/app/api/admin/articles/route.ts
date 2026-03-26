import { getAllArticles } from "@/data/blog";

export async function GET() {
  const articles = await getAllArticles();
  return Response.json(articles);
}
