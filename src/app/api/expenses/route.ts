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
  const category_id = searchParams.get("category_id");

  let query = supabase
    .from("expense")
    .select("id, amount, description, date, category_id, category(name)");

  if (from) query = query.gte("date", from);
  if (to) query = query.lte("date", to);
  if (category_id) query = query.eq("category_id", parseInt(category_id));

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data || []);
}
