"use client";

import { useState, useEffect } from "react";

export default function BudgetPage() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [savingGoals, setSavingGoals] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [incomesData, expensesData, goalsData] = await Promise.all([
        fetch("/api/incomes").then((res) => res.json()),
        fetch("/api/expenses").then((res) => res.json()),
        fetch("/api/saving-goals").then((res) => res.json()),
      ]);

      setIncomes(incomesData);
      setExpenses(expensesData);
      setSavingGoals(goalsData);
    }

    loadData();
  }, []);

  // Calculs automatiques
  const totalIncomes = incomes.reduce((acc, i) => acc + i.montant, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.montant, 0);
  const solde = totalIncomes - totalExpenses;

  return (
    <div>
      <h1>Mon Budget</h1>

      <section>
        <h2>Résumé du mois</h2>
        <p>Total revenus : {totalIncomes.toFixed(2)}€</p>
        <p>Total dépenses : {totalExpenses.toFixed(2)}€</p>
        <p>Solde : {solde.toFixed(2)}€</p>
      </section>

      <section>
        <h2>Objectifs d'épargne</h2>
        <ul>
          {savingGoals.map((goal) => {
            const moisRestants = Math.ceil(
              (new Date(goal.date_cible) - new Date()) /
                (1000 * 60 * 60 * 24 * 30),
            );
            const aMettreDeCote =
              moisRestants > 0 ? (goal.montant / moisRestants).toFixed(2) : 0;

            return (
              <li key={goal.id}>
                {goal.libelle} — {goal.montant}€ — encore {moisRestants} mois —{" "}
                {aMettreDeCote}€/mois à mettre de côté
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
