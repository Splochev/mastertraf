import type { Metadata } from "next";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { WebPageSchema } from "@/components/seo/StructuredData";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Услуги – Ремонт, диагностика и поддръжка на заваръчна техника",
  description:
    "Пълен набор от услуги: ремонт на заваръчни апарати, диагностика, пренавиване на трансформатори, усилване на ампераж, рециклиране и изработка по поръчка. София.",
  alternates: { canonical: "/uslugi" },
};

export default function ServicesPage() {
  return (
    <>
      <WebPageSchema
        title="Услуги – МАСТЕРТРАФ"
        description="Ремонт, диагностика и поддръжка на заваръчна техника"
        url="/uslugi"
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Услуги" }]} />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Нашите услуги
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-neutral-600">
            Предлагаме пълен набор от услуги за ремонт, поддръжка и изработка по поръчка на заваръчна техника и трансформатори. Прилагаме индивидуален подход и гарантираме високо качество на всяка извършена дейност.
          </p>
        </div>

        {/* All Services */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Repair Types Detail */}
        <section className="mt-20" aria-labelledby="repair-types">
          <h2 id="repair-types" className="text-2xl font-bold text-neutral-900">
            Видове ремонт
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { type: "Основен", desc: "Пълно възстановяване на апарата" },
              { type: "Частичен", desc: "Ремонт на конкретни компоненти" },
              { type: "Профилактичен", desc: "Превантивна поддръжка" },
              { type: "Гаранционен", desc: "В рамките на гаранцията" },
              { type: "Извънгаранционен", desc: "След изтичане на гаранцията" },
            ].map((item) => (
              <div key={item.type} className="rounded-xl border border-neutral-200 bg-white p-5 text-center">
                <div className="text-lg font-semibold text-neutral-900">{item.type}</div>
                <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Equipment Types */}
        <section className="mt-16" aria-labelledby="equipment-types">
          <h2 id="equipment-types" className="text-2xl font-bold text-neutral-900">
            Какво ремонтираме
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Телоподаващи апарати",
              "Електрожени",
              "Машини за точково заваряване",
              "Стартерни устройства",
              "Зарядни устройства",
              "Спотери",
              "Трансформатори",
              "Апарати за нагряване на метал",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-4">
                <svg className="h-5 w-5 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-neutral-800">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl bg-primary-50 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-neutral-900">
            Нуждаете се от услуга?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-600">
            Свържете се с нас за безплатна консултация и диагностика на вашата техника.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="tel:+359888709404"
              className="inline-flex items-center rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white hover:bg-primary-600"
            >
              +359 888 709 404
            </a>
            <Link
              href="/kontakti"
              className="inline-flex items-center rounded-xl border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Контактна форма
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
