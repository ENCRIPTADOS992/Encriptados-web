import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cat = Number(searchParams.get("category"));
  if (!cat) {
    return NextResponse.json({ error: "Falta category" }, { status: 400 });
  }
}
