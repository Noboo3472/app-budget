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
    <div>
      <h1>Mes listes de courses</h1>

      <div>
        <input
          placeholder="Nom de la liste"
          value={libelle}
          onChange={(e) => setLibelle(e.target.value)}
        />
        <button onClick={handleCreate}>Créer une liste</button>
      </div>

      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <span
              onClick={() => router.push(`/shopping-lists/${list.id}`)}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {list.libelle} — {new Date(list.date).toLocaleDateString("fr-FR")}
            </span>
            <button onClick={() => handleDelete(list.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
