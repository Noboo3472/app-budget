'use client'

import { useState, useEffect } from 'react'

export default function BudgetPage() {
  const [incomes, setIncomes] = useState([])
  const [expenses, setExpenses] = useState([])
  const [savingGoals, setSavingGoals] = useState([])

  useEffect(() => {
    async function loadData() {
      const [incomesData, expensesData, goalsData] = await Promise.all([
        fetch('/api/incomes').then(res => res.json()),
        fetch('/api/expenses').then(res => res.json()),
        fetch('/api/saving-goals').then(res => res.json())
      ])
      setIncomes(incomesData)
      setExpenses(expensesData)
      setSavingGoals(goalsData)
    }
    loadData()
  }, [])

  const totalIncomes = incomes.reduce((acc, i) => acc + i.montant, 0)
  const totalExpenses = expenses.reduce((acc, e) => acc + e.montant, 0)
  const solde = totalIncomes - totalExpenses

  function getProfilBudget(revenu) {
    if (revenu < 1000) return {
      profil: "Revenus de solidarité",
      couleur: "red",
      besoins: 90, loisirs: 8, epargne: 2,
      description: "Budget en mode survie. Les aides sociales (APL, chèque énergie) sont essentielles.",
      conseil: "Priorité absolue aux besoins vitaux. Tentez de constituer un petit fonds de sécurité de 10-20€/mois."
    }
    if (revenu < 1700) return {
      profil: "Revenus modestes (SMIC)",
      couleur: "orange",
      besoins: 70, loisirs: 20, epargne: 10,
      description: "On commence à pouvoir arbitrer entre loisirs et épargne.",
      conseil: "Visez un fonds d'urgence de 3 mois de charges. Le logement ne doit pas dépasser 33% du revenu."
    }
    if (revenu < 3000) return {
      profil: "Classe moyenne",
      couleur: "blue",
      besoins: 50, loisirs: 30, epargne: 20,
      description: "La règle du 50/30/20 devient applicable.",
      conseil: "Commencez à investir (PEA, Assurance Vie). Constituez 6 mois de charges en épargne de précaution."
    }
    if (revenu < 8000) return {
      profil: "Cadres supérieurs / Revenus aisés",
      couleur: "green",
      besoins: 35, loisirs: 25, epargne: 40,
      description: "Forte capacité d'investissement immobilier ou financier.",
      conseil: "Diversifiez vos investissements. Pensez à l'immobilier locatif et aux placements financiers long terme."
    }
    return {
      profil: "Revenus très élevés",
      couleur: "purple",
      besoins: 15, loisirs: 10, epargne: 75,
      description: "Le budget ne sert plus à vivre mais à développer un capital.",
      conseil: "Réinvestissement massif recommandé dans des sociétés, actifs ou art."
    }
  }

  const profil = getProfilBudget(totalIncomes)

  const colorMap = {
    red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-100 text-red-700" },
    orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", badge: "bg-orange-100 text-orange-700" },
    blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
    green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-green-100 text-green-700" },
    purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", badge: "bg-purple-100 text-purple-700" },
  }

  const colors = colorMap[profil.couleur]

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

      {totalIncomes > 0 && (
        <div className={`rounded-xl border-2 ${colors.bg} ${colors.border} p-6 mb-8`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.badge} mb-2 inline-block`}>
                Votre profil
              </span>
              <h2 className={`text-xl font-bold ${colors.text}`}>{profil.profil}</h2>
              <p className="text-gray-600 text-sm mt-1">{profil.description}</p>
            </div>
            <p className="text-3xl font-bold text-gray-300">{totalIncomes.toFixed(0)}€</p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Répartition recommandée</p>
            <div className="flex rounded-full overflow-hidden h-6 mb-2">
              <div
                className="bg-red-400 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${profil.besoins}%` }}
              >
                {profil.besoins}%
              </div>
              <div
                className="bg-yellow-400 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${profil.loisirs}%` }}
              >
                {profil.loisirs}%
              </div>
              <div
                className="bg-green-400 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${profil.epargne}%` }}
              >
                {profil.epargne}%
              </div>
            </div>
            <div className="flex gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>Besoins
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>Loisirs
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>Épargne
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Besoins ({profil.besoins}%)</p>
              <p className="text-lg font-bold text-red-500">{(totalIncomes * profil.besoins / 100).toFixed(2)}€</p>
              <p className="text-xs text-gray-400">dépensé : {totalExpenses.toFixed(2)}€</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Loisirs ({profil.loisirs}%)</p>
              <p className="text-lg font-bold text-yellow-500">{(totalIncomes * profil.loisirs / 100).toFixed(2)}€</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Épargne ({profil.epargne}%)</p>
              <p className="text-lg font-bold text-green-500">{(totalIncomes * profil.epargne / 100).toFixed(2)}€</p>
              <p className="text-xs text-gray-400">solde actuel : {solde.toFixed(2)}€</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">💡 Conseil</p>
            <p className="text-sm text-gray-600">{profil.conseil}</p>
          </div>
        </div>
      )}

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