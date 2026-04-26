"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ShoppingListsPage() {
  const [lists, setLists] = useState([]);
  const [libelle, setLibelle] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/shopping-lists")
      .then((res) => res.json())
      .then((data) => setLists(data));
  }, []);

  async function handleCreate() {
    await fetch("/api/shopping-lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        libelle,
        date: new Date().toISOString(),
        userId: 2,
      }),
    });

    const res = await fetch("/api/shopping-lists");
    const data = await res.json();
    setLists(data);
    setLibelle("");
  }

  async function handleDelete(id) {
    await fetch(`/api/shopping-lists/${id}`, {
      method: "DELETE",
    });

    const res = await fetch("/api/shopping-lists");
    const data = await res.json();
    setLists(data);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mes Listes de Courses</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Créer une liste</h2>
        <div className="flex gap-4">
          <input
            placeholder="Nom de la liste"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-6 py-2 transition"
          >
            Créer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Mes listes</h2>
        <ul className="space-y-3">
          {lists.map((list) => (
            <li key={list.id} className="flex justify-between items-center border-b pb-3 last:border-0">
              <span
                onClick={() => router.push(`/shopping-lists/${list.id}`)}
                className="font-semibold text-gray-800 cursor-pointer hover:text-blue-500 transition"
              >
                🛒 {list.libelle} — {new Date(list.date).toLocaleDateString('fr-FR')}
              </span>
              <button
                onClick={() => handleDelete(list.id)}
                className="text-gray-400 hover:text-red-500 transition text-sm"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
