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
    <div>
      <h1>Mes Objectifs d'épargne</h1>
      <form>
        <input
          placeholder="Libellé"
          value={form.libelle}
          onChange={(e) => setForm({ ...form, libelle: e.target.value })}
        />
        <input
          placeholder="Montant"
          type="number"
          value={form.montant}
          onChange={(e) => setForm({ ...form, montant: e.target.value })}
        />
        <input
          type="date"
          value={form.date_cible}
          onChange={(e) => setForm({ ...form, date_cible: e.target.value })}
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="">-- Type --</option>
          <option value="loisir">Loisir</option>
          <option value="perso">Personnel</option>
          <option value="pro">Pro</option>
        </select>
        <button type="button" onClick={handleSubmit}>
          Ajouter
        </button>
      </form>
      <ul>
        {savingGoals.map((income) => (
          <li key={income.id}>
            {income.libelle} — {income.montant}€
            <button onClick={() => handleDelete(income.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
