import { NextResponse } from "next/server";
import { searchProducts } from "@/app/actions";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || undefined;
    const minPrice = url.searchParams.get("minPrice") ? Number(url.searchParams.get("minPrice")) : undefined;
    const maxPrice = url.searchParams.get("maxPrice") ? Number(url.searchParams.get("maxPrice")) : undefined;
    const sort = url.searchParams.get("sort") || undefined;

    const products = await searchProducts({
      query: q,
      minPrice,
      maxPrice,
      sort
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}