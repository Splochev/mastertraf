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
        <div className="sm:col-span-2">
          <SpecsEditor specs={form.specs ?? []} onChange={(v) => set("specs", v)} />
        </div>
        <div className="sm:col-span-2">
          <ListEditor label="Функции (EN)" items={form.features_en ?? []} onChange={(v) => set("features_en", v)} />
        </div>
        <div className="sm:col-span-2">
          <ListEditor label="Функции (BG)" items={form.features_bg ?? []} onChange={(v) => set("features_bg", v)} />
        </div>
        <Input label="Основна снимка (URL)" value={form.image} onChange={(v) => set("image", v)} />
        <div className="sm:col-span-2">
          <ListEditor label="Допълнителни снимки (URL)" items={form.images ?? []} onChange={(v) => set("images", v)} />
        </div>
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

function SpecsEditor({
  specs,
  onChange,
}: {
  specs: { label: string; labelBg: string; value: string }[];
  onChange: (v: { label: string; labelBg: string; value: string }[]) => void;
}) {
  const update = (i: number, field: string, val: string) => {
    const next = specs.map((s, idx) => (idx === i ? { ...s, [field]: val } : s));
    onChange(next);
  };
  const add = () => onChange([...specs, { label: "", labelBg: "", value: "" }]);
  const remove = (i: number) => onChange(specs.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-neutral-700">Спецификации</label>
        <button type="button" onClick={add} className="text-xs font-medium text-primary-600 hover:underline">+ Добави</button>
      </div>
      {specs.length === 0 && <p className="text-xs text-neutral-400">Няма спецификации. Натиснете &quot;+ Добави&quot;.</p>}
      {specs.length > 0 && (
        <div className="mb-1 flex items-start gap-2">
          <div className="grid flex-1 gap-2 sm:grid-cols-3">
            <span className="text-xs font-medium text-neutral-500">Label (EN)</span>
            <span className="text-xs font-medium text-neutral-500">Име на спецификацията (BG)</span>
            <span className="text-xs font-medium text-neutral-500">Стойност</span>
          </div>
          <div className="w-4" />
        </div>
      )}
      <div className="space-y-2">
        {specs.map((s, i) => (
          <div key={i} className="flex items-start gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
            <div className="grid flex-1 gap-2 sm:grid-cols-3">
              <input type="text" placeholder="напр. Voltage" value={s.label} onChange={(e) => update(i, "label", e.target.value)} className="w-full rounded border border-neutral-300 px-2 py-1.5 text-sm focus:border-primary-500 focus:outline-none" />
              <input type="text" placeholder="напр. Напрежение" value={s.labelBg} onChange={(e) => update(i, "labelBg", e.target.value)} className="w-full rounded border border-neutral-300 px-2 py-1.5 text-sm focus:border-primary-500 focus:outline-none" />
              <input type="text" placeholder="напр. 230V" value={s.value} onChange={(e) => update(i, "value", e.target.value)} className="w-full rounded border border-neutral-300 px-2 py-1.5 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <button type="button" onClick={() => remove(i)} className="mt-1 text-red-500 hover:text-red-700" title="Изтрий">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (v: string[]) => void;
}) {
  const update = (i: number, val: string) => {
    const next = items.map((s, idx) => (idx === i ? val : s));
    onChange(next);
  };
  const add = () => onChange([...items, ""]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-neutral-700">{label}</label>
        <button type="button" onClick={add} className="text-xs font-medium text-primary-600 hover:underline">+ Добави</button>
      </div>
      {items.length === 0 && <p className="text-xs text-neutral-400">Няма елементи.</p>}
      <div className="space-y-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input type="text" value={item} onChange={(e) => update(i, e.target.value)} className="w-full rounded border border-neutral-300 px-2 py-1.5 text-sm focus:border-primary-500 focus:outline-none" />
            <button type="button" onClick={() => remove(i)} className="text-red-500 hover:text-red-700" title="Изтрий">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
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
