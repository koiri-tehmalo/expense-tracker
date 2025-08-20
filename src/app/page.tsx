"use client";
import { useState, useEffect } from "react";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseModal from "../components/ExpenseModal";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { supabase } from "@/lib/supabaseClient"; // ต้อง import supabase

export default function Dashboard() {
  const [summary, setSummary] = useState<{ total: number; byCategory: Record<string, number> }>({ total: 0, byCategory: {} });
  const [expenses, setExpenses] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [category_id, setCategoryId] = useState("");

  // ดึงหมวดหมู่จาก Supabase
  const fetchCategories = async () => {
    const { data, error } = await supabase.from("category").select("*");
    if (data) setCategories(data);
    if (error) console.error(error);
  };

  const fetchData = async () => {
    const query = new URLSearchParams();
    if (from) query.append("from", from);
    if (to) query.append("to", to);
    if (category_id) query.append("category_id", category_id);

    const resSummary = await fetch(`/api/dashboard?${query.toString()}`);
    const dataSummary = await resSummary.json();
    setSummary(dataSummary);

    const resList = await fetch(`/api/expenses?${query.toString()}`);
    const dataList = await resList.json();
    setExpenses(dataList);
  };

  useEffect(() => {
    fetchCategories(); // ดึงหมวดหมู่ตอน mount
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ThemeSwitcher />
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border border-gray-300 bg-white text-black p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border border-gray-300 bg-white text-black p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        />
        <select
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="border border-gray-300 bg-white text-black p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Filter
        </button>
      </div>

      {/* Total + PieChart */}
      <p className="mb-4 text-lg font-semibold">Total Expense: {summary.total} ฿</p>
      <ExpenseChart data={summary.byCategory} />

      {/* ปุ่มเพิ่ม */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 bg-green-500 text-white dark:text-black px-4 py-2 rounded hover:bg-green-600"
      >
        Add Expense
      </button>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); fetchData(); }}
      />

      {/* List รายการ Expense */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">All Expenses</h2>
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="border p-2 border-gray-300 dark:border-gray-700 text-black dark:text-white">Date</th>
              <th className="border p-2 border-gray-300 dark:border-gray-700 text-black dark:text-white">Category</th>
              <th className="border p-2 border-gray-300 dark:border-gray-700 text-black dark:text-white">Description</th>
              <th className="border p-2 border-gray-300 dark:border-gray-700 text-black dark:text-white">Amount (฿)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border p-2 border-gray-300 dark:border-gray-700">{new Date(e.date).toLocaleDateString()}</td>
                <td className="border p-2 border-gray-300 dark:border-gray-700">{e.category?.name || "Unknown"}</td>
                <td className="border p-2 border-gray-300 dark:border-gray-700">{e.description}</td>
                <td className="border p-2 border-gray-300 dark:border-gray-700">{e.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
