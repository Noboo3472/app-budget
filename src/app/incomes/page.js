"use client";

import { useState, useEffect } from "react";

export default function IncomesPage() {
  const [incomes, setIncomes] = useState([]);
  const [form, setForm] = useState({
    libelle: "",
    montant: "",
    date: "",
    type: "",
    recurrence: "",
    userId: 2,
  });

  useEffect(() => {
    fetch("/api/incomes")
      .then((res) => res.json())
      .then((data) => setIncomes(data));
  }, []);

  async function handleSubmit() {
    await fetch("/api/incomes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        montant: parseFloat(form.montant),
      }),
    });

    // Recharger la liste des dépenses
    const res = await fetch("/api/incomes");
    const data = await res.json();
    setIncomes(data);
  }
  async function handleDelete(id) {
    await fetch(`/api/incomes/${id}`, {
      method: "DELETE",
    });

    const res = await fetch("/api/incomes");
    const data = await res.json();
    setIncomes(data);
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white-800 mb-8">Mes Revenus</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Ajouter un revenu</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Libellé"
            value={form.libelle}
            onChange={(e) => setForm({ ...form, libelle: e.target.value })}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            placeholder="Montant"
            type="number"
            value={form.montant}
            onChange={(e) => setForm({ ...form, montant: e.target.value })}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">-- Type --</option>
            <option value="salaire">Salaire</option>
            <option value="freelance">Freelance</option>
            <option value="allocations">Allocations</option>
            <option value="remboursement">Remboursement</option>
            <option value="autre">Autre</option>
          </select>
          <select
            value={form.recurrence}
            onChange={(e) => setForm({ ...form, recurrence: e.target.value })}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">-- Récurrence --</option>
            <option value="ponctuel">Ponctuel</option>
            <option value="occasionnel">Occasionnel</option>
            <option value="mensuel">Mensuel</option>
          </select>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-green-600 text-white font-semibold rounded-lg px-4 py-2 transition"
          >
            Ajouter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Mes revenus</h2>
        <ul className="space-y-3">
          {incomes.map((income) => (
            <li key={income.id} className="flex justify-between items-center border-b pb-3 last:border-0">
              <div>
                <p className="font-semibold text-gray-800">{income.libelle}</p>
                <p className="text-sm text-gray-500">{income.type} — {income.recurrence}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold text-green-500">+{income.montant.toFixed(2)}€</p>
                <button
                  onClick={() => handleDelete(income.id)}
                  className="text-gray-400 hover:text-red-500 transition text-sm"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
