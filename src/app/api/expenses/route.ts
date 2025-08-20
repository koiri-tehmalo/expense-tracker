import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// GET /api/expenses?from=2025-08-01&to=2025-08-20&categoryId=1
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const categoryId = searchParams.get('categoryId');

  let query = supabase.from('expense').select('*, category(*)');

  if (from) query = query.gte('date', from);
  if (to) query = query.lte('date', to);
  if (categoryId) query = query.eq('category_id', categoryId);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

// POST /api/expenses
export async function POST(req: Request) {
  const body = await req.json();
  const { amount, description, category_id, date } = body;

  const { data, error } = await supabase.from('expense').insert([
    { amount, description, category_id, date }
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
