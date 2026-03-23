"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { href: "/admin/products", label: "Продукти" },
  { href: "/admin/services", label: "Услуги" },
  { href: "/admin/faq", label: "ЧЗВ" },
  { href: "/admin/gallery", label: "Галерия" },
  { href: "/admin/company-info", label: "Фирмена информация" },
  { href: "/admin/images", label: "Изображения" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-neutral-500">Зареждане...</div>
      </div>
    );
  }

  // Login page — just render children (the login form)
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  // Not authenticated on admin sub-page — redirect (middleware also handles this)
  if (!user) {
    router.push("/admin");
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 border-r border-neutral-200 bg-neutral-900 p-5">
        <Link
          href="/admin/products"
          className="mb-8 flex items-center gap-2"
        >
          <Image src="/logo.jpg" alt="MASTERTRAF" width={150} height={40} className="h-10 w-auto" />
          <span className="text-xs font-normal text-neutral-400">
            Admin
          </span>
        </Link>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-primary-500/20 text-primary-400"
                  : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <div className="border-t border-neutral-700 pt-4">
            <p className="truncate text-xs text-neutral-500">{user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-2 w-full rounded-lg bg-neutral-800 px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
            >
              Изход
            </button>
          </div>
          <Link
            href="/"
            className="mt-3 block text-center text-xs text-neutral-500 hover:text-primary-400"
          >
            ← Към сайта
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-neutral-50 p-6">{children}</main>
    </div>
  );
}
