import type { Metadata } from "next";
import { getCompanyInfo } from "@/data/company";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { WebPageSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Контакти – МАСТЕРТРАФ | Телефон, адрес и работно време",
  description:
    "Свържете се с МАСТЕРТРАФ в София, Овча купел. Телефон: +359 888 709 404. Работно време: Понеделник-Петък 9:00-18:00. Email: transformatori@abv.bg",
  alternates: { canonical: "/kontakti" },
};

export default async function ContactPage() {
  const companyInfo = await getCompanyInfo();

  return (
    <>
      <WebPageSchema
        title="Контакти – МАСТЕРТРАФ"
        description="Свържете се с нас – телефон, адрес и работно време"
        url="/kontakti"
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Контакти" }]} />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Свържете се с нас
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-neutral-600">
            Имате въпрос или нужда от ремонт? Свържете се с нас по телефон, имейл или ни посетете на място.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-900">Телефон</h2>
                  <a
                    href={`tel:${companyInfo.contact.phone}`}
                    className="mt-1 text-lg text-primary-600 hover:text-primary-700"
                  >
                    {companyInfo.contact.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-900">Имейл</h2>
                  <a
                    href={`mailto:${companyInfo.contact.email}`}
                    className="mt-1 text-lg text-primary-600 hover:text-primary-700"
                  >
                    {companyInfo.contact.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-900">Адрес</h2>
                  <p className="mt-1 text-neutral-600">{companyInfo.contact.address}</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-900">Работно време</h2>
                  <p className="mt-1 text-neutral-600">{companyInfo.contact.workingHours}</p>
                  <p className="text-neutral-500">{companyInfo.contact.weekends}</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-8">
              <h2 className="font-semibold text-neutral-900">Последвайте ни</h2>
              <div className="mt-3 flex gap-3">
                {companyInfo.social.facebook.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:border-primary-300 hover:text-primary-600"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </a>
                ))}
                <a
                  href={companyInfo.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:border-primary-300 hover:text-primary-600"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-neutral-200">
            <iframe
              title="МАСТЕРТРАФ местоположение"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.7741030718007!2d23.252080076509856!3d42.68732721436239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa9adf5a42ee0f%3A0x433d9820a6579527!2sMastertraf%20Ltd!5e0!3m2!1sen!2sus!4v1774201368655!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </>
  );
}
