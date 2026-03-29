"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface ServiceRow {
  id?: number;
  slug: string;
  title_en: string;
  title_bg: string;
  description_en: string;
  description_bg: string;
  icon: string;
  sort_order: number;
  price?: string;
}

const emptyService: ServiceRow = {
  slug: "",
  title_en: "",
  title_bg: "",
  description_en: "",
  description_bg: "",
  icon: "",
  sort_order: 0,
  price: "",
};

export default function AdminServicesPage() {
  const supabase = createClient();
  const [items, setItems] = useState<ServiceRow[]>([]);
  const [editing, setEditing] = useState<ServiceRow | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order");
    if (error) setError(error.message);
    else setItems(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
  }, [fetchItems]);

  const handleSave = async (data: ServiceRow) => {
    setSaving(true);
    setError("");
    const { id, ...rest } = data;

    if (id) {
      const { error } = await supabase.from("services").update(rest).eq("id", id);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.from("services").insert(rest);
      if (error) setError(error.message);
    }

    setSaving(false);
    setShowForm(false);
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете тази услуга?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) setError(error.message);
    fetchItems();
  };

  if (loading) return <div className="p-6 text-neutral-500">Зареждане...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Услуги</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600"
        >
          + Нова услуга
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      {showForm && (
        <ServiceForm
          initial={editing ?? emptyService}
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
              <th className="px-4 py-3 font-medium text-neutral-600">Заглавие (BG)</th>
              <th className="px-4 py-3 font-medium text-neutral-600">Slug</th>
              <th className="px-4 py-3 font-medium text-neutral-600">Икона</th>
              <th className="px-4 py-3 font-medium text-neutral-600">Цена</th>
              <th className="px-4 py-3 font-medium text-neutral-600">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3 text-neutral-500">{item.sort_order}</td>
                <td className="px-4 py-3 font-medium text-neutral-900">{item.title_bg}</td>
                <td className="px-4 py-3 text-neutral-500">{item.slug}</td>
                <td className="px-4 py-3 text-neutral-500">{item.icon}</td>
                <td className="px-4 py-3 text-neutral-500">{item.price || "—"}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => { setEditing(item); setShowForm(true); }}
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

function ServiceForm({
  initial,
  saving,
  onSave,
  onCancel,
}: {
  initial: ServiceRow;
  saving: boolean;
  onSave: (data: ServiceRow) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ServiceRow>(initial);

  const set = (field: keyof ServiceRow, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-neutral-900">
        {initial.id ? "Редактиране на услуга" : "Нова услуга"}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug">
          <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </Field>
        <Field label="Икона (SVG/име)">
          <input type="text" value={form.icon} onChange={(e) => set("icon", e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </Field>
        <Field label="Заглавие (EN)">
          <input type="text" value={form.title_en} onChange={(e) => set("title_en", e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </Field>
        <Field label="Заглавие (BG)">
          <input type="text" value={form.title_bg} onChange={(e) => set("title_bg", e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </Field>
        <Field label="Описание (EN)">
          <textarea value={form.description_en} onChange={(e) => set("description_en", e.target.value)} rows={4} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </Field>
        <Field label="Описание (BG)">
          <textarea value={form.description_bg} onChange={(e) => set("description_bg", e.target.value)} rows={4} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </Field>
        <Field label="Ред (sort_order)">
          <input type="number" value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value) || 0)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </Field>
        <Field label="Цена (текст, по избор)">
          <input type="text" value={form.price ?? ""} onChange={(e) => set("price", e.target.value)} placeholder="напр. от 50 лв., по заявка, безплатна диагностика" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </Field>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-neutral-700">{label}</label>
      {children}
    </div>
  );
}
