"use client";

import { useState, useEffect } from "react";

export default function SavingGoalsPage() {
  const [savingGoals, setSavingGoals] = useState([]);
  const [form, setForm] = useState({
    libelle: "",
    montant: "",
    date_cible: "",
    type: "",
    userId: 2,
  });

  useEffect(() => {
    fetch("/api/saving-goals")
      .then((res) => res.json())
      .then((data) => setSavingGoals(data));
  }, []);

  async function handleSubmit() {
    await fetch("/api/saving-goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        montant: parseFloat(form.montant),
      }),
    });

    // Recharger la liste des dépenses
    const res = await fetch("/api/saving-goals");
    const data = await res.json();
    setSavingGoals(data);
  }
  async function handleDelete(id) {
    await fetch(`/api/saving-goals/${id}`, {
      method: "DELETE",
    });

    const res = await fetch("/api/saving-goals");
    const data = await res.json();
    setSavingGoals(data);
  }
 return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white-800 mb-8">Mes Objectifs d'épargne</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Ajouter un objectif</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Libellé"
            value={form.libelle}
            onChange={(e) => setForm({ ...form, libelle: e.target.value })}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Montant"
            type="number"
            value={form.montant}
            onChange={(e) => setForm({ ...form, montant: e.target.value })}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={form.date_cible}
            onChange={(e) => setForm({ ...form, date_cible: e.target.value })}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Type --</option>
            <option value="loisir">Loisir</option>
            <option value="perso">Personnel</option>
            <option value="pro">Professionnel</option>
          </select>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 transition col-span-2"
          >
            Ajouter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Mes objectifs</h2>
        <ul className="space-y-3">
          {savingGoals.map((goal) => (
            <li key={goal.id} className="flex justify-between items-center border-b pb-3 last:border-0">
              <div>
                <p className="font-semibold text-gray-800">{goal.libelle}</p>
                <p className="text-sm text-gray-500">{goal.type} — {new Date(goal.date_cible).toLocaleDateString('fr-FR')}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold text-blue-500">{goal.montant.toFixed(2)}€</p>
                <button
                  onClick={() => handleDelete(goal.id)}
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
