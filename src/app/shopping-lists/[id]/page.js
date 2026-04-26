"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

export default function ShoppingListDetailPage() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const itemsRef = useRef([]);
  const [form, setForm] = useState({
    libelle: "",
    montant: "",
    quantite: "",
    unite: "unité",
    cocher: 0,
  });

  useEffect(() => {
    fetch("/api/shopping-list-items")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (item) => item.shoppingListsID === parseInt(id),
        );
        setItems(filtered);
        itemsRef.current = filtered;
      });
  }, [id]);

  async function handleAddItem() {
    await fetch("/api/shopping-list-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        montant: parseFloat(form.montant),
        quantite: parseFloat(form.quantite),
        shoppingListsID: parseInt(id),
      }),
    });

    const res = await fetch("/api/shopping-list-items");
    const data = await res.json();
    const filtered = data.filter(
      (item) => item.shoppingListsID === parseInt(id),
    );
    setItems(filtered);
    itemsRef.current = filtered;
  }

  async function handleToggle(item) {
    const newCocher = item.cocher === 1 ? 0 : 1;

    await fetch(`/api/shopping-list-items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cocher: newCocher }),
    });

    const res = await fetch("/api/shopping-list-items");
    const data = await res.json();
    const filtered = data.filter((i) => i.shoppingListsID === parseInt(id));
    setItems(filtered);
    itemsRef.current = filtered;
  }

  async function handleDeleteItem(itemId) {
    await fetch(`/api/shopping-list-items/${itemId}`, {
      method: "DELETE",
    });

    const res = await fetch("/api/shopping-list-items");
    const data = await res.json();
    const filtered = data.filter((i) => i.shoppingListsID === parseInt(id));
    setItems(filtered);
    itemsRef.current = filtered;
  }
  async function handleAchatsRealises() {
    const itemsCoche = itemsRef.current.filter((item) => item.cocher === 1);

    for (const item of itemsCoche) {
      await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          libelle: item.libelle,
          montant: item.montant * item.quantite,
          date: new Date().toISOString(),
          type: "alimentation",
          recurrence: "ponctuel",
          userId: 3,
        }),
      });
    }

    alert("Achats ajoutés aux dépenses !");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white-800 mb-8">
        Ma Liste de Courses
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Ajouter un article
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Article"
            value={form.libelle}
            onChange={(e) => setForm({ ...form, libelle: e.target.value })}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Prix unitaire"
            type="number"
            step="0.01"
            value={form.montant}
            onChange={(e) => setForm({ ...form, montant: e.target.value })}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Quantité"
            type="number"
            step="0.1"
            value={form.quantite}
            onChange={(e) => setForm({ ...form, quantite: e.target.value })}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={form.unite}
            onChange={(e) => setForm({ ...form, unite: e.target.value })}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="unité">Unité</option>
            <option value="kg">Kg</option>
            <option value="g">G</option>
            <option value="L">L</option>
            <option value="cl">Cl</option>
          </select>
          <button
            type="button"
            onClick={handleAddItem}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 transition col-span-2"
          >
            Ajouter l'article
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Articles</h2>
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 border-b pb-3 last:border-0"
            >
              <input
                type="checkbox"
                checked={item.cocher === 1}
                onChange={() => handleToggle(item)}
                className="w-5 h-5 accent-green-500"
              />
              <span
                className={`flex-1 ${item.cocher === 1 ? "line-through text-gray-400" : "text-gray-800"}`}
              >
                {item.libelle} — {item.montant}€ x {item.quantite} {item.unite}
              </span>
              <span className="font-semibold text-gray-700">
                {(item.montant * item.quantite).toFixed(2)}€
              </span>
              <button
                type="but"
                onClick={() => {handleDeleteItem(item.id)
                  console.log("clic suppression", item.id)
                }}
                className="text-gray-400 hover:text-red-500 transition text-sm"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleAchatsRealises}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl px-6 py-4 transition text-lg"
      >
        ✅ Achats réalisés → ajouter aux dépenses
      </button>
    </div>
  );
}
