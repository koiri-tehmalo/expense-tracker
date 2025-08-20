"use client";
import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpenseModal({ isOpen, onClose }: ExpenseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 dark:bg-opacity-70">
      <div className="bg-white p-6 rounded shadow-lg w-96 dark:bg-gray-800">
        <h2 className="text-xl dark:text-white font-bold mb-4">Add Expense</h2>
        <ExpenseForm onSuccess={onClose} />
        <button
          onClick={onClose}
          className="mt-4 dark:text-black bg-blue-500 px-4 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}
