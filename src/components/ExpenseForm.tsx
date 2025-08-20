"use client";
import { useState } from "react";


interface ExpenseFormProps {
  onSuccess?: () => void; // Callback หลังเพิ่มสำเร็จ
}

export default function ExpenseForm({ onSuccess }: ExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("1");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parseFloat(amount),
        description: desc,
        date,
        categoryId: parseInt(categoryId),
      }),
    });
    alert("Expense added!");
    setAmount(""); setDesc(""); setDate(""); setCategoryId("1");
    onSuccess && onSuccess(); // ปิด Modal
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-black dark:text-white dark:bg-gray-800 p-4 rounded">
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} className="border p-2" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2" />
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="border p-2">
        <option value="1">Food</option>
        <option value="2">Transport</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white dark:text-black p-2 rounded hover:bg-blue-600">Add Expense</button>
    </form>
  );
}
