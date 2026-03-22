/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "images";

export default function AdminImagesPage() {
  const supabase = createClient();
  const [files, setFiles] = useState<{ name: string; id: string | null; created_at: string | null }[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    const { data, error } = await supabase.storage.from(BUCKET).list("", {
      limit: 500,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) setError(error.message);
    else setFiles((data ?? []).filter((f) => f.name !== ".emptyFolderPlaceholder").map((f) => ({ name: f.name, id: f.id, created_at: f.created_at })));
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFiles();
  }, [fetchFiles]);

  const getPublicUrl = (name: string) => {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(name);
    return data.publicUrl;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage.from(BUCKET).upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) setError(error.message);
    setUploading(false);
    e.target.value = "";
    fetchFiles();
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Сигурни ли сте, че искате да изтриете "${name}"?`)) return;
    const { error } = await supabase.storage.from(BUCKET).remove([name]);
    if (error) setError(error.message);
    fetchFiles();
  };

  const handleCopy = async (name: string) => {
    const url = getPublicUrl(name);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(name);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setError("Неуспешно копиране на URL.");
    }
  };

  if (loading) return <div className="p-6 text-neutral-500">Зареждане...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Изображения (Storage)</h1>
        <label className="cursor-pointer rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600">
          {uploading ? "Качване..." : "+ Качи файл"}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      {files.length === 0 ? (
        <div className="rounded-lg border border-neutral-200 bg-white p-12 text-center text-neutral-500">
          Няма качени изображения. Натиснете &quot;+ Качи файл&quot; за да добавите.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="overflow-hidden rounded-lg border border-neutral-200 bg-white"
            >
              <img
                src={getPublicUrl(file.name)}
                alt={file.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-3">
                <p className="truncate text-sm font-medium text-neutral-900" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-neutral-500">
                  {file.created_at ? new Date(file.created_at).toLocaleDateString("bg-BG") : ""}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleCopy(file.name)}
                    className="text-xs font-medium text-primary-600 hover:underline"
                  >
                    {copied === file.name ? "✓ Копирано!" : "Копирай URL"}
                  </button>
                  <button
                    onClick={() => handleDelete(file.name)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Изтрий
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
