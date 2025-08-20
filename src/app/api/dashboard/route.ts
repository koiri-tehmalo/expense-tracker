import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const categoryId = searchParams.get("categoryId"); // เพิ่ม filter ตามหมวดหมู่

  const expenses = await prisma.expense.findMany({
    where: {
      date: {
        gte: from ? new Date(from) : undefined,
        lte: to ? new Date(to) : undefined,
      },
      categoryId: categoryId ? parseInt(categoryId) : undefined,
    },
    include: { category: true },
  });

  const total = expenses.reduce((sum: number, e: any) => sum + e.amount, 0);

const byCategory = expenses.reduce((acc: Record<string, number>, e: any) => {
  acc[e.category.name] = (acc[e.category.name] || 0) + e.amount;
  return acc;
}, {});


  return NextResponse.json({ total, byCategory });
}
