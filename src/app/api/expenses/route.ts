//บันทึก/ดึงค่าใช้จ่าย
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET /api/expenses?from=2025-01-01&to=2025-01-31
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const categoryId = searchParams.get("categoryId");
  const expenses = await prisma.expense.findMany({
    where: {
      date: {
        gte: from ? new Date(from) : undefined,
        lte: to ? new Date(to) : undefined,
      },
        categoryId: categoryId ? parseInt(categoryId) : undefined,

    },
    include: { category: true },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(expenses);
}

// POST /api/expenses
export async function POST(req: Request) {
  const body = await req.json();
  const expense = await prisma.expense.create({
    data: {
      amount: body.amount,
      description: body.description,
      categoryId: body.categoryId,
      date: new Date(body.date),
    },
  });
  return NextResponse.json(expense);
}

