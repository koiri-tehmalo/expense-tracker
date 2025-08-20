import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  let query = supabase.from('expense').select('amount, category_id, category(name)');

  if (from) query = query.gte('date', from);
  if (to) query = query.lte('date', to);

  const { data: expenses, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const total = expenses?.reduce((sum: number, e: any) => sum + e.amount, 0) || 0;

  const byCategory = expenses?.reduce((acc: any, e: any) => {
    const name = e.category?.name || 'Unknown';
    acc[name] = (acc[name] || 0) + e.amount;
    return acc;
  }, {});

  return NextResponse.json({ total, byCategory });
}
