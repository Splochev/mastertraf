import type { Metadata } from "next";
import { getCompanyInfo } from "@/data/company";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { WebPageSchema } from "@/components/seo/StructuredData";
import Link from "next/link";

export const metadata: Metadata = {
  title: "За нас – МАСТЕРТРАФ | Семеен бизнес за заваръчна техника",
  description:
    "МАСТЕРТРАФ е семеен бизнес в София, специализиран в ремонт и изработка на трансформатори и заваръчна техника. Професионализъм, честност и индивидуален подход.",
  alternates: { canonical: "/za-nas" },
};

export default async function AboutPage() {
  const companyInfo = await getCompanyInfo();

  return (
    <>
      <WebPageSchema
        title="За нас – МАСТЕРТРАФ"
        description="Семеен бизнес за заваръчна техника в София"
        url="/za-nas"
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "За нас" }]} />

        <div className="mt-6 max-w-3xl">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            За МАСТЕРТРАФ
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            {companyInfo.description}
          </p>
        </div>

        {/* Mission */}
        <section className="mt-16" aria-labelledby="mission-heading">
          <div className="rounded-2xl bg-primary-50 p-8 sm:p-12">
            <h2 id="mission-heading" className="text-2xl font-bold text-neutral-900">
              Нашата мисия
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-700">
              {companyInfo.mission} Прилагайки индивидуален подход, честност, коректност и професионализъм, ние вдъхваме нов живот на вашата заваръчна техника!
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mt-16" aria-labelledby="values-heading">
          <h2 id="values-heading" className="text-2xl font-bold text-neutral-900">
            Нашите ценности
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companyInfo.values.map((value) => (
              <div key={value.bg} className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">{value.bg}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* What We Do */}
        <section className="mt-16" aria-labelledby="what-we-do">
          <h2 id="what-we-do" className="text-2xl font-bold text-neutral-900">
            С какво се занимаваме
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-primary-600">Ремонт</h3>
              <p className="mt-2 text-neutral-600">
                Ремонтираме всички видове трансформаторни заваръчни машини и апарати – от телоподаващи устройства до стартерно-зарядни устройства. Предлагаме основен, частичен, профилактичен, гаранционен и извънгаранционен ремонт.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-primary-600">Производство</h3>
              <p className="mt-2 text-neutral-600">
                Проектираме и изработваме по поръчка специализирани трансформаторни машини и апарати – спотери, електрожени, стартерно-зарядни устройства, апарати за точково заваряване, трансформатори от 100W до 20kW.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-primary-600">Диагностика</h3>
              <p className="mt-2 text-neutral-600">
                Извършваме диагностика на състоянието на машините и даваме професионална препоръка за тяхната поддръжка.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-primary-600">Рециклиране</h3>
              <p className="mt-2 text-neutral-600">
                Рециклираме стари машини и апарати. Преоборудваме хоби техника за професионална употреба и усилваме ампеража на заваръчни апарати.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-neutral-900">
            Готови сме да помогнем
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-600">
            Свържете се с нас за консултация, ремонт или поръчка на ново оборудване.
          </p>
          <div className="mt-6">
            <Link
              href="/kontakti"
              className="inline-flex items-center rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white hover:bg-primary-600"
            >
              Свържете се с нас
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
