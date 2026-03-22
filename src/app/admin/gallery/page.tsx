/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface GalleryRow {
  id?: number;
  src: string;
  alt_en: string;
  alt_bg: string;
  category: string;
  type: string;
  video_url: string | null;
  sort_order: number;
}

const emptyGallery: GalleryRow = {
  src: "",
  alt_en: "",
  alt_bg: "",
  category: "products",
  type: "image",
  video_url: null,
  sort_order: 0,
};

export default function AdminGalleryPage() {
  const supabase = createClient();
  const [items, setItems] = useState<GalleryRow[]>([]);
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>([]);
  const [editing, setEditing] = useState<GalleryRow | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("sort_order");
    if (error) setError(error.message);
    else setItems(data ?? []);
    setLoading(false);
  }, [supabase]);

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase
      .from("gallery_categories")
      .select("slug, name")
      .order("sort_order");
    setCategories(data ?? []);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
    fetchCategories();
  }, [fetchItems, fetchCategories]);

  const handleSave = async (data: GalleryRow) => {
    setSaving(true);
    setError("");
    const { id, ...rest } = data;

    if (id) {
      const { error } = await supabase.from("gallery").update(rest).eq("id", id);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.from("gallery").insert(rest);
      if (error) setError(error.message);
    }

    setSaving(false);
    setShowForm(false);
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете този елемент?")) return;
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) setError(error.message);
    fetchItems();
  };

  if (loading) return <div className="p-6 text-neutral-500">Зареждане...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Галерия</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600"
        >
          + Нов елемент
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      {showForm && (
        <GalleryForm
          initial={editing ?? emptyGallery}
          categories={categories}
          saving={saving}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            {item.type === "image" ? (
              <img src={item.src} alt={item.alt_bg} className="h-40 w-full object-cover" />
            ) : (
              <div className="flex h-40 items-center justify-center bg-neutral-100 text-neutral-500">
                <span className="text-3xl">▶</span>
              </div>
            )}
            <div className="p-3">
              <p className="text-sm font-medium text-neutral-900">{item.alt_bg}</p>
              <p className="text-xs text-neutral-500">
                {item.category} · {item.type} · Ред: {item.sort_order}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => { setEditing(item); setShowForm(true); }}
                  className="text-xs text-primary-600 hover:underline"
                >
                  Редактирай
                </button>
                <button
                  onClick={() => handleDelete(item.id!)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Изтрий
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryForm({
  initial,
  categories,
  saving,
  onSave,
  onCancel,
}: {
  initial: GalleryRow;
  categories: { slug: string; name: string }[];
  saving: boolean;
  onSave: (data: GalleryRow) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<GalleryRow>(initial);

  const set = (field: keyof GalleryRow, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-neutral-900">
        {initial.id ? "Редактиране" : "Нов елемент"}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Източник (URL)</label>
          <input type="text" value={form.src} onChange={(e) => set("src", e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Тип</label>
          <select value={form.type} onChange={(e) => set("type", e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none">
            <option value="image">Снимка</option>
            <option value="video">Видео</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Категория</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none">
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Видео URL</label>
          <input type="text" value={form.video_url ?? ""} onChange={(e) => set("video_url", e.target.value || null)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Alt (EN)</label>
          <input type="text" value={form.alt_en} onChange={(e) => set("alt_en", e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Alt (BG)</label>
          <input type="text" value={form.alt_bg} onChange={(e) => set("alt_bg", e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Ред (sort_order)</label>
          <input type="number" value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value) || 0)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button onClick={() => onSave(form)} disabled={saving} className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50">
          {saving ? "Запазване..." : "Запази"}
        </button>
        <button onClick={onCancel} className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
          Отказ
        </button>
      </div>
    </div>
  );
}
