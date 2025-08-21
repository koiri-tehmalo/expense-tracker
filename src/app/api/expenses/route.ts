import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export interface Expense {
  id: number;
  amount: number;
  description: string;
  date: string;
  category_id: number;
  category?: { name: string };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const categoryIdStr = searchParams.get("category_id");
  const category_id = categoryIdStr ? Number(categoryIdStr) : undefined;

  let query = supabase
    .from("expense")
    .select("id, amount, description, date, category_id, category(name)");

  if (from) query = query.gte("date", from);
  if (to) query = query.lte("date", to);
  if (category_id !== undefined) query = query.eq("category_id", category_id);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { amount, description, date, category_id } = body;
  const { data, error } = await supabase
    .from("expense")
    .insert([{ amount, description, date, category_id }]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
