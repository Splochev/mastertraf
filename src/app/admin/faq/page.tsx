"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface FAQRow {
  id?: number;
  question_en: string;
  question_bg: string;
  answer_en: string;
  answer_bg: string;
  sort_order: number;
}

const emptyFAQ: FAQRow = {
  question_en: "",
  question_bg: "",
  answer_en: "",
  answer_bg: "",
  sort_order: 0,
};

export default function AdminFAQPage() {
  const supabase = createClient();
  const [items, setItems] = useState<FAQRow[]>([]);
  const [editing, setEditing] = useState<FAQRow | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    const { data, error } = await supabase
      .from("faq")
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

  const handleSave = async (data: FAQRow) => {
    setSaving(true);
    setError("");
    const { id, ...rest } = data;

    if (id) {
      const { error } = await supabase.from("faq").update(rest).eq("id", id);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.from("faq").insert(rest);
      if (error) setError(error.message);
    }

    setSaving(false);
    setShowForm(false);
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете този въпрос?")) return;
    const { error } = await supabase.from("faq").delete().eq("id", id);
    if (error) setError(error.message);
    fetchItems();
  };

  if (loading) return <div className="p-6 text-neutral-500">Зареждане...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Често задавани въпроси</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600"
        >
          + Нов въпрос
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      {showForm && (
        <FAQForm
          initial={editing ?? emptyFAQ}
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
              <th className="px-4 py-3 font-medium text-neutral-600">Въпрос (BG)</th>
              <th className="px-4 py-3 font-medium text-neutral-600">Отговор (BG)</th>
              <th className="px-4 py-3 font-medium text-neutral-600">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3 text-neutral-500">{item.sort_order}</td>
                <td className="px-4 py-3 font-medium text-neutral-900">{item.question_bg}</td>
                <td className="max-w-xs truncate px-4 py-3 text-neutral-500">{item.answer_bg}</td>
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

function FAQForm({
  initial,
  saving,
  onSave,
  onCancel,
}: {
  initial: FAQRow;
  saving: boolean;
  onSave: (data: FAQRow) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<FAQRow>(initial);

  const set = (field: keyof FAQRow, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-neutral-900">
        {initial.id ? "Редактиране на въпрос" : "Нов въпрос"}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Въпрос (EN)</label>
          <input type="text" value={form.question_en} onChange={(e) => set("question_en", e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Въпрос (BG)</label>
          <input type="text" value={form.question_bg} onChange={(e) => set("question_bg", e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Отговор (EN)</label>
          <textarea value={form.answer_en} onChange={(e) => set("answer_en", e.target.value)} rows={4} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Отговор (BG)</label>
          <textarea value={form.answer_bg} onChange={(e) => set("answer_bg", e.target.value)} rows={4} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
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
