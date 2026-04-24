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
          (item) => item.shoppingListsID === parseInt(id)
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
        quantite: parseInt(form.quantite),
        shoppingListsID: parseInt(id),
      }),
    });

    const res = await fetch("/api/shopping-list-items");
    const data = await res.json();
    const filtered = data.filter((item) => item.shoppingListsID === parseInt(id));
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

  async function handleAchatsRealises() {
    const itemsCoche = itemsRef.current.filter((item) => item.cocher === 1);
    console.log("itemsCoche :", itemsCoche);

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
          userId: 2,
        }),
      });
    }

    alert("Achats ajoutés aux dépenses !");
  }

  return (
    <div>
      <h1>Ma liste de courses</h1>

      <div>
        <input
          placeholder="Article"
          value={form.libelle}
          onChange={(e) => setForm({ ...form, libelle: e.target.value })}
        />
        <input
          placeholder="Prix unitaire"
          type="number"
          value={form.montant}
          onChange={(e) => setForm({ ...form, montant: e.target.value })}
        />
        <input
          placeholder="Quantité"
          type="number"
          value={form.quantite}
          onChange={(e) => setForm({ ...form, quantite: e.target.value })}
        />
        <select
          value={form.unite}
          onChange={(e) => setForm({ ...form, unite: e.target.value })}
        >
          <option value="unité">Unité</option>
          <option value="kg">Kg</option>
          <option value="g">G</option>
          <option value="L">L</option>
          <option value="cl">Cl</option>
        </select>
        <button type="button" onClick={handleAddItem}>
          Ajouter l'article
        </button>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.cocher === 1}
              onChange={() => handleToggle(item)}
            />
            {item.libelle} — {item.montant}€ x {item.quantite} {item.unite}
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleAchatsRealises}>
        ✅ Achats réalisés → ajouter aux dépenses
      </button>
    </div>
  );
}