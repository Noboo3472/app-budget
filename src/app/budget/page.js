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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mon Budget</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500 mb-1">Total revenus</p>
          <p className="text-2xl font-bold text-green-500">+{totalIncomes.toFixed(2)}€</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500 mb-1">Total dépenses</p>
          <p className="text-2xl font-bold text-red-500">-{totalExpenses.toFixed(2)}€</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500 mb-1">Solde</p>
          <p className={`text-2xl font-bold ${solde >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {solde.toFixed(2)}€
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Objectifs d'épargne</h2>
        <ul className="space-y-4">
          {savingGoals.map(goal => {
            const moisRestants = Math.ceil(
              (new Date(goal.date_cible) - new Date()) / (1000 * 60 * 60 * 24 * 30)
            )
            const aMettreDeCote = moisRestants > 0
              ? (goal.montant / moisRestants).toFixed(2)
              : 0

            return (
              <li key={goal.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                <div>
                  <p className="font-semibold text-gray-800">{goal.libelle}</p>
                  <p className="text-sm text-gray-500">encore {moisRestants} mois</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{goal.montant}€</p>
                  <p className="text-sm text-blue-500">{aMettreDeCote}€/mois</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
