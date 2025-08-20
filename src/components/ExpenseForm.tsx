"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ExpenseFormProps {
  onSuccess?: () => void;
}

export default function ExpenseForm({ onSuccess }: ExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  
  // สำหรับเพิ่มหมวดหมู่
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("category").select("*");
    if (data) setCategories(data);
    if (error) console.error(error);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          description: desc,
          date,
          category_id: parseInt(category_id),
        }),
      });
      alert("Expense added!");
      setAmount("");
      setDesc("");
      setDate("");
      setcategory_id("");
      onSuccess && onSuccess();
    } catch (error) {
      console.error(error);
      alert("Failed to add expense");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName) return;
    const { data, error } = await supabase
      .from("category")
      .insert([{ name: newCategoryName }])
      .select();
    if (data && data[0]) {
      fetchCategories();
      setcategory_id(data[0].id.toString());
      setNewCategoryName("");
      setShowAddCategory(false);
    }
    if (error) console.error(error);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 text-black dark:text-white dark:bg-gray-800 p-4 rounded"
    >
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border p-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2"
      />

      {/* เลือกหมวดหมู่ + เพิ่มหมวดหมู่ */}
      <div className="flex gap-2">
        <select
          value={category_id}
          onChange={(e) => setcategory_id(e.target.value)}
          required
          className="flex-1 bg-gray-800 px-4 py-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="px-3 py-2 bg-blue-700 rounded hover:bg-gray-400"
          onClick={() => setShowAddCategory(true)}
        >
          +
        </button>
      </div>

      {showAddCategory && (
        <div className="flex flex-col gap-2 mt-2">
          <input
            type="text"
            placeholder="New category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <div className="flex gap-2">
            <button
              type="button"
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleAddCategory}
            >
              Add
            </button>
            <button
              type="button"
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setShowAddCategory(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white dark:text-black p-2 rounded hover:bg-blue-600 mt-2"
      >
        Add Expense
      </button>
    </form>
  );
}
