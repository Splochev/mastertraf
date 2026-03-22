"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface CompanyInfoRow {
  id?: number;
  name: string;
  name_en: string;
  legal_name: string;
  tagline: string;
  tagline_en: string;
  description: string;
  description_en: string;
  values: { icon: string; title: string; titleEn: string; desc: string; descEn: string }[];
  mission: string;
  mission_en: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    addressEn: string;
    city: string;
    cityEn: string;
    workingHours: string;
    workingHoursEn: string;
  };
  social: { facebook: string; youtube: string };
  map_lat: number;
  map_lng: number;
  domain: string;
  founded: number;
}

export default function AdminCompanyInfoPage() {
  const supabase = createClient();
  const [form, setForm] = useState<CompanyInfoRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchData = useCallback(async () => {
    const { data, error } = await supabase
      .from("company_info")
      .select("*")
      .limit(1)
      .single();
    if (error) setError(error.message);
    else setForm(data);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    setError("");
    setSuccess("");

    const { id, ...rest } = form;
    const { error } = await supabase.from("company_info").update(rest).eq("id", id!);
    if (error) setError(error.message);
    else setSuccess("Информацията е запазена успешно.");

    setSaving(false);
  };

  const set = (field: keyof CompanyInfoRow, value: unknown) =>
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));

  const setContact = (field: string, value: string) =>
    setForm((prev) =>
      prev
        ? { ...prev, contact: { ...prev.contact, [field]: value } }
        : prev
    );

  const setSocial = (field: string, value: string) =>
    setForm((prev) =>
      prev
        ? { ...prev, social: { ...prev.social, [field]: value } }
        : prev
    );

  if (loading) return <div className="p-6 text-neutral-500">Зареждане...</div>;
  if (!form) return <div className="p-6 text-red-500">Грешка: Няма данни за компанията.</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Фирмена информация</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
        >
          {saving ? "Запазване..." : "Запази промените"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}
      {success && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">{success}</div>
      )}

      <div className="space-y-6">
        {/* General info */}
        <Section title="Обща информация">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Име (BG)">
              <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} className="input-field" />
            </Field>
            <Field label="Име (EN)">
              <input type="text" value={form.name_en} onChange={(e) => set("name_en", e.target.value)} className="input-field" />
            </Field>
            <Field label="Юридическо име">
              <input type="text" value={form.legal_name} onChange={(e) => set("legal_name", e.target.value)} className="input-field" />
            </Field>
            <Field label="Домейн">
              <input type="text" value={form.domain} onChange={(e) => set("domain", e.target.value)} className="input-field" />
            </Field>
            <Field label="Слоган (BG)">
              <input type="text" value={form.tagline} onChange={(e) => set("tagline", e.target.value)} className="input-field" />
            </Field>
            <Field label="Слоган (EN)">
              <input type="text" value={form.tagline_en} onChange={(e) => set("tagline_en", e.target.value)} className="input-field" />
            </Field>
            <Field label="Година на основаване">
              <input type="number" value={form.founded} onChange={(e) => set("founded", Number(e.target.value))} className="input-field" />
            </Field>
          </div>
        </Section>

        {/* Description */}
        <Section title="Описание">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Описание (BG)">
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} className="input-field" />
            </Field>
            <Field label="Описание (EN)">
              <textarea value={form.description_en} onChange={(e) => set("description_en", e.target.value)} rows={4} className="input-field" />
            </Field>
            <Field label="Мисия (BG)">
              <textarea value={form.mission} onChange={(e) => set("mission", e.target.value)} rows={3} className="input-field" />
            </Field>
            <Field label="Мисия (EN)">
              <textarea value={form.mission_en} onChange={(e) => set("mission_en", e.target.value)} rows={3} className="input-field" />
            </Field>
          </div>
        </Section>

        {/* Contact */}
        <Section title="Контакти">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Телефон">
              <input type="text" value={form.contact.phone} onChange={(e) => setContact("phone", e.target.value)} className="input-field" />
            </Field>
            <Field label="Имейл">
              <input type="text" value={form.contact.email} onChange={(e) => setContact("email", e.target.value)} className="input-field" />
            </Field>
            <Field label="Адрес (BG)">
              <input type="text" value={form.contact.address} onChange={(e) => setContact("address", e.target.value)} className="input-field" />
            </Field>
            <Field label="Адрес (EN)">
              <input type="text" value={form.contact.addressEn} onChange={(e) => setContact("addressEn", e.target.value)} className="input-field" />
            </Field>
            <Field label="Град (BG)">
              <input type="text" value={form.contact.city} onChange={(e) => setContact("city", e.target.value)} className="input-field" />
            </Field>
            <Field label="Град (EN)">
              <input type="text" value={form.contact.cityEn} onChange={(e) => setContact("cityEn", e.target.value)} className="input-field" />
            </Field>
            <Field label="Работно време (BG)">
              <input type="text" value={form.contact.workingHours} onChange={(e) => setContact("workingHours", e.target.value)} className="input-field" />
            </Field>
            <Field label="Работно време (EN)">
              <input type="text" value={form.contact.workingHoursEn} onChange={(e) => setContact("workingHoursEn", e.target.value)} className="input-field" />
            </Field>
          </div>
        </Section>

        {/* Social & Map */}
        <Section title="Социални мрежи и карта">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Facebook URL">
              <input type="text" value={form.social.facebook} onChange={(e) => setSocial("facebook", e.target.value)} className="input-field" />
            </Field>
            <Field label="YouTube URL">
              <input type="text" value={form.social.youtube} onChange={(e) => setSocial("youtube", e.target.value)} className="input-field" />
            </Field>
            <Field label="Ширина (map_lat)">
              <input type="number" step="any" value={form.map_lat} onChange={(e) => set("map_lat", parseFloat(e.target.value) || 0)} className="input-field" />
            </Field>
            <Field label="Дължина (map_lng)">
              <input type="number" step="any" value={form.map_lng} onChange={(e) => set("map_lng", parseFloat(e.target.value) || 0)} className="input-field" />
            </Field>
          </div>
        </Section>

        {/* Values (JSON) */}
        <Section title="Ценности (JSON)">
          <textarea
            value={JSON.stringify(form.values, null, 2)}
            onChange={(e) => {
              try { set("values", JSON.parse(e.target.value)); } catch { /* ignore invalid JSON */ }
            }}
            rows={12}
            className="input-field w-full font-mono text-xs"
          />
        </Section>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #d4d4d4;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
        }
        .input-field:focus {
          border-color: #ff8401;
          outline: none;
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-neutral-900">{title}</h2>
      {children}
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
