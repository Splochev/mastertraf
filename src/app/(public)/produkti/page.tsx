import type { Metadata } from "next";
import { getProducts, getCategories } from "@/data/products";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { WebPageSchema } from "@/components/seo/StructuredData";
import { ProductFilter } from "@/components/ui/ProductFilter";

export const metadata: Metadata = {
  title: "Продукти – Заваръчна техника и трансформатори",
  description:
    "Каталог на заваръчни апарати, спотери, телоподаващи устройства, стартерно-зарядни устройства и трансформатори. Произведени в България с 24 месеца гаранция.",
  alternates: { canonical: "/produkti" },
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <WebPageSchema
        title="Продукти – МАСТЕРТРАФ"
        description="Каталог на заваръчни апарати и трансформатори"
        url="/produkti"
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Продукти" }]} />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Нашите продукти
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-neutral-600">
            Български заваръчни апарати и трансформатори с професионално качество. Всички продукти са с 24 месеца гаранция и следгаранционно обслужване.
          </p>
        </div>

        <ProductFilter products={products} categories={categories} />
      </div>
    </>
  );
}
