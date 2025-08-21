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

export interface Summary {
  total: number;
  byCategory: Record<string, number>;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const categoryIdStr = searchParams.get("category_id");
  const category_id = categoryIdStr ? Number(categoryIdStr) : undefined;

  // Query ไม่ใช้ generic <Expense>
  let query = supabase
    .from("expense")
    .select("id, amount, description, date, category_id, category(name)");

  if (from) query = query.gte("date", from);
  if (to) query = query.lte("date", to);
  if (category_id !== undefined) query = query.eq("category_id", category_id);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // แปลง data เป็น Expense[]
  const expenses: Expense[] = Array.isArray(data)
    ? data.map((item) => ({
        id: item.id,
        amount: item.amount,
        description: item.description,
        date: item.date,
        category_id: item.category_id,
        category:
          item.category && typeof item.category === "object" && "name" in item.category
            ? { name: (item.category as { name: string }).name }
            : undefined,
      }))
    : [];
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const byCategory: Record<string, number> = {};
  expenses.forEach((e) => {
    const name = e.category?.name ?? "Unknown";
    byCategory[name] = (byCategory[name] || 0) + e.amount;
  });

  const summary: Summary = { total, byCategory };
  return NextResponse.json(summary);
}
