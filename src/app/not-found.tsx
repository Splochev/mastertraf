import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-primary-500">404</p>
        <h1 className="mt-4 text-2xl font-bold text-neutral-900">
          Страницата не е намерена
        </h1>
        <p className="mt-2 text-neutral-600">
          Съжаляваме, но страницата, която търсите, не съществува.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white hover:bg-primary-600"
        >
          Към началната страница
        </Link>
      </div>
    </div>
  );
}
