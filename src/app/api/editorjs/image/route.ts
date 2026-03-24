import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.startsWith("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("image") as File | null;

      if (!file || !(file instanceof File) || !file.size) {
        return NextResponse.json(
          { success: 0, message: "Missing file data" },
          { status: 400 },
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${file.type || "application/octet-stream"};base64,${base64}`;

      return NextResponse.json({ success: 1, file: { url: dataUrl } });
    }

    const body = await req.json();
    const imageUrl = typeof body?.url === "string" ? body.url : "";

    if (!imageUrl) {
      return NextResponse.json(
        { success: 0, message: "Missing image URL" },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: 1, file: { url: imageUrl } });
  } catch (err) {
    return NextResponse.json(
      { success: 0, message: "Failed to parse request" },
      { status: 400 },
    );
  }
}
