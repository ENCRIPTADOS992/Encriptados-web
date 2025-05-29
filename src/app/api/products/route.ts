import { NextResponse } from "next/server";
import { fetchProductsByCategory } from "@/services/wordpress";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cat = Number(searchParams.get("category"));
  if (!cat) {
    return NextResponse.json({ error: "Falta category" }, { status: 400 });
  }
  try {
    const products = await fetchProductsByCategory(cat);
    return NextResponse.json(products);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
