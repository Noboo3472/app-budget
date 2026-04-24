"use client";

import { useState, useEffect } from "react";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    libelle: "",
    montant: "",
    date: "",
    type: "",
    recurrence: "",
    userId: 2,
  });

  useEffect(() => {
    fetch("/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  async function handleSubmit() {
    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        montant: parseFloat(form.montant),
      }),
    });

    // Recharger la liste des dépenses
    const res = await fetch("/api/expenses");
    const data = await res.json();
    setExpenses(data);
  }
  async function handleDelete(id) {
    await fetch(`/api/expenses/${id}`, {
      method: "DELETE",
    });

    const res = await fetch("/api/expenses");
    const data = await res.json();
    setExpenses(data);
  }
  return (
    <div>
      <h1>Mes dépenses</h1>
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
          <option value="alimentation">Alimentation</option>
          <option value="transport">Transport</option>
          <option value="logement">Logement</option>
          <option value="loisir">Loisir</option>
          <option value="sante">Santé</option>
          <option value="vetements">Vêtements</option>
          <option value="abonnements">Abonnements</option>
          <option value="restauration">Restauration</option>
          <option value="education">Éducation</option>
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
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.libelle} — {expense.montant}€
            <button onClick={() => handleDelete(expense.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
