import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// กำหนด type สำหรับ expense
interface Expense {
  id: number;
  amount: number;
  description: string;
  date: string;
  category_id: number;
  category?: { name: string };
}


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  let query = supabase.from('expense').select('id, amount, category_id, category(name)');

  if (from) query = query.gte('date', from);
  if (to) query = query.lte('date', to);

  const { data: expenses, error } = await query as { data: Expense[] | null, error: any };

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const total = expenses?.reduce((sum, e) => sum + e.amount, 0) || 0;

  const byCategory = expenses?.reduce<Record<string, number>>((acc, e) => {
    const name = e.category?.name || 'Unknown';
    acc[name] = (acc[name] || 0) + e.amount;
    return acc;
  }, {}) || {};

  return NextResponse.json({ total, byCategory });
}
