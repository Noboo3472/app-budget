"use client";
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
    <div>
      <h1>Mes Entrées</h1>
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
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="">-- Type --</option>
          <option value="salaire">Salaire</option>
          <option value="freelance">Freelance</option>
          <option value="allocation">Allocation</option>
          <option value="remboursement">Remboursement</option>
          <option value="autre">Autre</option>
        </select>
        <select
          value={form.recurrence}
          onChange={(e) => setForm({ ...form, recurrence: e.target.value })}
        >
          <option value="">-- Récurrence --</option>
          <option value="ponctuel">Ponctuel</option>
          <option value="occasionnel">Occasionnel</option>
          <option value="mensuel">Mensuel</option>
        </select>
        <button type="button" onClick={handleSubmit}>
          Ajouter
        </button>
      </form>
      <ul>
        {incomes.map((income) => (
          <li key={income.id}>
            {income.libelle} — {income.montant}€
            <button onClick={() => handleDelete(income.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
