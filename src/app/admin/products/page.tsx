"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface ProductRow {
  id?: number;
  slug: string;
  name_en: string;
  name_bg: string;
  short_description_en: string;
  short_description_bg: string;
  description_en: string;
  description_bg: string;
  specs: { label: string; labelBg: string; value: string }[];
  features_en: string[];
  features_bg: string[];
  image: string;
  images: string[];
  price: string | null;
  availability: string;
  warranty: string;
  category_slug: string;
  sort_order: number;
}

const emptyProduct: ProductRow = {
  slug: "",
  name_en: "",
  name_bg: "",
  short_description_en: "",
  short_description_bg: "",
  description_en: "",
  description_bg: "",
  specs: [],
  features_en: [],
  features_bg: [],
  image: "",
  images: [],
  price: null,
  availability: "in-stock",
  warranty: "24 месеца гаранция и следгаранционен сервиз",
  category_slug: "",
  sort_order: 0,
};

export default function AdminProductsPage() {
  const supabase = createClient();
  const [items, setItems] = useState<ProductRow[]>([]);
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>([]);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order");
    if (error) setError(error.message);
    else setItems(data ?? []);
    setLoading(false);
  }, [supabase]);

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase
      .from("product_categories")
      .select("slug, name")
      .order("sort_order");
    setCategories(data ?? []);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
    fetchCategories();
  }, [fetchItems, fetchCategories]);

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (item: ProductRow) => {
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async (data: ProductRow) => {
    setSaving(true);
    setError("");
    const { id, ...rest } = data;

    if (id) {
      const { error } = await supabase.from("products").update(rest).eq("id", id);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.from("products").insert(rest);
      if (error) setError(error.message);
    }

    setSaving(false);
    setShowForm(false);
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете този продукт?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) setError(error.message);
    fetchItems();
  };

  if (loading) return <div className="p-6 text-neutral-500">Зареждане...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Продукти</h1>
        <button
          onClick={openCreate}
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600"
        >
          + Нов продукт
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      {showForm && (
        <ProductForm
          initial={editing ?? emptyProduct}
          categories={categories}
          saving={saving}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              <th className="px-4 py-3 font-medium text-neutral-600">Ред</th>
              <th className="px-4 py-3 font-medium text-neutral-600">Име (BG)</th>
              <th className="px-4 py-3 font-medium text-neutral-600">Slug</th>
              <th className="px-4 py-3 font-medium text-neutral-600">Категория</th>
              <th className="px-4 py-3 font-medium text-neutral-600">Наличност</th>
              <th className="px-4 py-3 font-medium text-neutral-600">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3 text-neutral-500">{item.sort_order}</td>
                <td className="px-4 py-3 font-medium text-neutral-900">{item.name_bg}</td>
                <td className="px-4 py-3 text-neutral-500">{item.slug}</td>
                <td className="px-4 py-3 text-neutral-500">{item.category_slug}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      item.availability === "in-stock"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.availability === "in-stock" ? "В наличност" : "По поръчка"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openEdit(item)}
                    className="mr-2 text-primary-600 hover:underline"
                  >
                    Редактирай
                  </button>
                  <button
                    onClick={() => handleDelete(item.id!)}
                    className="text-red-600 hover:underline"
                  >
                    Изтрий
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductForm({
  initial,
  categories,
  saving,
  onSave,
  onCancel,
}: {
  initial: ProductRow;
  categories: { slug: string; name: string }[];
  saving: boolean;
  onSave: (data: ProductRow) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ProductRow>(initial);

  const set = (field: keyof ProductRow, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-neutral-900">
        {initial.id ? "Редактиране на продукт" : "Нов продукт"}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Slug" value={form.slug} onChange={(v) => set("slug", v)} />
        <Input label="Категория slug" value={form.category_slug} onChange={(v) => set("category_slug", v)}>
          <select
            value={form.category_slug}
            onChange={(e) => set("category_slug", e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
          >
            <option value="">-- Изберете --</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </Input>
        <Input label="Име (EN)" value={form.name_en} onChange={(v) => set("name_en", v)} />
        <Input label="Име (BG)" value={form.name_bg} onChange={(v) => set("name_bg", v)} />
        <Textarea label="Кратко описание (EN)" value={form.short_description_en} onChange={(v) => set("short_description_en", v)} />
        <Textarea label="Кратко описание (BG)" value={form.short_description_bg} onChange={(v) => set("short_description_bg", v)} />
        <Textarea label="Описание (EN)" value={form.description_en} onChange={(v) => set("description_en", v)} />
        <Textarea label="Описание (BG)" value={form.description_bg} onChange={(v) => set("description_bg", v)} />
        <Textarea
          label="Спецификации (JSON)"
          value={JSON.stringify(form.specs, null, 2)}
          onChange={(v) => {
            try { set("specs", JSON.parse(v)); } catch { /* ignore */ }
          }}
        />
        <Textarea
          label="Функции EN (по 1 на ред)"
          value={(form.features_en ?? []).join("\n")}
          onChange={(v) => set("features_en", v.split("\n").filter(Boolean))}
        />
        <Textarea
          label="Функции BG (по 1 на ред)"
          value={(form.features_bg ?? []).join("\n")}
          onChange={(v) => set("features_bg", v.split("\n").filter(Boolean))}
        />
        <Input label="Основна снимка (URL)" value={form.image} onChange={(v) => set("image", v)} />
        <Textarea
          label="Снимки (URL, по 1 на ред)"
          value={(form.images ?? []).join("\n")}
          onChange={(v) => set("images", v.split("\n").filter(Boolean))}
        />
        <Input label="Цена" value={form.price ?? ""} onChange={(v) => set("price", v || null)} />
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Наличност</label>
          <select
            value={form.availability}
            onChange={(e) => set("availability", e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
          >
            <option value="in-stock">В наличност</option>
            <option value="made-to-order">По поръчка</option>
            <option value="contact">Свържете се</option>
          </select>
        </div>
        <Input label="Гаранция" value={form.warranty} onChange={(v) => set("warranty", v)} />
        <Input label="Ред (sort_order)" value={String(form.sort_order)} onChange={(v) => set("sort_order", Number(v) || 0)} />
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
        >
          {saving ? "Запазване..." : "Запази"}
        </button>
        <button
          onClick={onCancel}
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          Отказ
        </button>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-neutral-700">{label}</label>
      {children || (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
        />
      )}
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-neutral-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
      />
    </div>
  );
}
