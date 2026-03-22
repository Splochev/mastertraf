import type { Metadata } from "next";
import { getGalleryItems, getGalleryCategories } from "@/data/gallery";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { WebPageSchema } from "@/components/seo/StructuredData";
import { GalleryFilter } from "@/components/ui/GalleryFilter";

export const metadata: Metadata = {
  title: "Галерия – Снимки и видеа от нашата работа",
  description:
    "Галерия със снимки и видеа от ремонт на заваръчна техника, производство на спотери, трансформатори и стартерно-зарядни устройства. МАСТЕРТРАФ София.",
  alternates: { canonical: "/galeriya" },
};

export default async function GalleryPage() {
  const [galleryItems, galleryCategories] = await Promise.all([
    getGalleryItems(),
    getGalleryCategories(),
  ]);

  return (
    <>
      <WebPageSchema
        title="Галерия – МАСТЕРТРАФ"
        description="Снимки и видеа от нашата работа"
        url="/galeriya"
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Галерия" }]} />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Галерия
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-neutral-600">
            Снимки и видеа от нашата ежедневна работа – ремонт, производство и тестване на заваръчна техника.
          </p>
        </div>

        <GalleryFilter items={galleryItems} categories={galleryCategories} />
      </div>
    </>
  );
}
