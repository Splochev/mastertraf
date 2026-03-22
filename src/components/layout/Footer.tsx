import Link from "next/link";
import { companyInfo } from "@/data/company";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold text-white">
              <span className="text-primary-500">MASTER</span>TRAF
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              {companyInfo.description}
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Бързи връзки">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Навигация
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/za-nas" className="hover:text-primary-400 transition-colors">За нас</Link></li>
              <li><Link href="/uslugi" className="hover:text-primary-400 transition-colors">Услуги</Link></li>
              <li><Link href="/produkti" className="hover:text-primary-400 transition-colors">Продукти</Link></li>
              <li><Link href="/galeriya" className="hover:text-primary-400 transition-colors">Галерия</Link></li>
              <li><Link href="/kontakti" className="hover:text-primary-400 transition-colors">Контакти</Link></li>
              <li><Link href="/sitemap-html" className="hover:text-primary-400 transition-colors">Карта на сайта</Link></li>
            </ul>
          </nav>

          {/* Product Categories */}
          <nav aria-label="Продуктови категории">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Продукти
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/produkti?category=spoteri" className="hover:text-primary-400 transition-colors">Спотери</Link></li>
              <li><Link href="/produkti?category=starterno-zaradni" className="hover:text-primary-400 transition-colors">Стартерно-зарядни</Link></li>
              <li><Link href="/produkti?category=transformatori" className="hover:text-primary-400 transition-colors">Трансформатори</Link></li>
              <li><Link href="/produkti?category=telopodavashti" className="hover:text-primary-400 transition-colors">Телоподаващи</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Контакти
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                </svg>
                {companyInfo.contact.address}
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href={`tel:${companyInfo.contact.phone}`} className="hover:text-primary-400 transition-colors">
                  {companyInfo.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href={`mailto:${companyInfo.contact.email}`} className="hover:text-primary-400 transition-colors">
                  {companyInfo.contact.email}
                </a>
              </li>
              <li className="text-neutral-400">
                {companyInfo.contact.workingHours}
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-4 flex gap-3">
              {companyInfo.social.facebook.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-neutral-800 p-2 text-neutral-400 transition-colors hover:bg-primary-500 hover:text-white"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              ))}
              <a
                href={companyInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-neutral-800 p-2 text-neutral-400 transition-colors hover:bg-primary-500 hover:text-white"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-sm text-neutral-500">
          <p>© {currentYear} {companyInfo.legalName}. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  );
}
