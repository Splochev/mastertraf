import Link from "next/link";
import { getProducts } from "@/data/products";
import { getServices } from "@/data/services";
import { getFAQItems } from "@/data/faq";
import { getCompanyInfo } from "@/data/company";
import { ProductCard } from "@/components/ui/ProductCard";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { FAQSection } from "@/components/ui/FAQSection";
import { OrganizationSchema, FAQSchema } from "@/components/seo/StructuredData";

export default async function Home() {
  const [products, services, faqItems, companyInfo] = await Promise.all([
    getProducts(),
    getServices(),
    getFAQItems(),
    getCompanyInfo(),
  ]);
  const featuredProducts = products.slice(0, 4);
  const featuredServices = services.slice(0, 6);

  return (
    <>
      <OrganizationSchema />
      <FAQSchema items={faqItems} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900" aria-labelledby="hero-heading">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary-500 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-primary-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-semibold text-primary-400">
              Произведено в България 🇧🇬
            </span>
            <h1 id="hero-heading" className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ремонт и изработка на{" "}
              <span className="text-primary-500">трансформатори</span> и{" "}
              <span className="text-primary-500">заваръчна техника</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-300 sm:text-xl">
              {companyInfo.description} Професионално обслужване с 24 месеца гаранция.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/produkti"
                className="inline-flex items-center justify-center rounded-xl bg-primary-500 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-600"
              >
                Вижте продуктите
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/kontakti"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Свържете се с нас
              </Link>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { stat: "24", label: "месеца гаранция" },
              { stat: "10+", label: "вида продукти" },
              { stat: "100%", label: "български продукт" },
              { stat: "10+", label: "години опит" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-neutral-700 bg-neutral-800/50 px-4 py-4 text-center">
                <div className="text-2xl font-bold text-primary-500">{item.stat}</div>
                <div className="mt-1 text-sm text-neutral-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 sm:py-24" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Какво предлагаме
            </span>
            <h2 id="services-heading" className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
              Нашите услуги
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
              Пълен набор от услуги за ремонт, поддръжка и изработка по поръчка на заваръчна техника.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/uslugi"
              className="inline-flex items-center text-base font-semibold text-primary-600 hover:text-primary-700"
            >
              Вижте всички услуги
              <svg className="ml-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-neutral-100 py-20 sm:py-24" aria-labelledby="products-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Каталог
            </span>
            <h2 id="products-heading" className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
              Популярни продукти
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
              Български заваръчни апарати с професионално качество и 24 месеца гаранция.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/produkti"
              className="inline-flex items-center justify-center rounded-xl bg-primary-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600"
            >
              Вижте всички продукти
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 sm:py-24" aria-labelledby="about-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                За нас
              </span>
              <h2 id="about-heading" className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
                Семеен бизнес с традиции в заваръчната техника
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-600">
                {companyInfo.description} Нашата цел е {companyInfo.mission.toLowerCase()}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {companyInfo.values.map((value) => (
                  <div key={value.bg} className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-neutral-700">{value.bg}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/za-nas"
                className="mt-8 inline-flex items-center text-base font-semibold text-primary-600 hover:text-primary-700"
              >
                Научете повече за нас
                <svg className="ml-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            {/* Image placeholder */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto h-20 w-20 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                  <p className="mt-2 text-neutral-500">Снимка на работилницата</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <h2 id="cta-heading" className="text-3xl font-bold text-white sm:text-4xl">
            Нуждаете се от ремонт или нов апарат?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Свържете се с нас за безплатна консултация. Работим с индивидуален подход и предлагаме най-доброто решение за вашите нужди.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`tel:${companyInfo.contact.phone}`}
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-primary-600 transition-colors hover:bg-neutral-100"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {companyInfo.contact.phone}
            </a>
            <Link
              href="/kontakti"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Пишете ни
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-24" aria-labelledby="faq-section-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              ЧЗВ
            </span>
            <div className="mt-2">
              <FAQSection items={faqItems} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
