import React from "react";
import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Chargers", quantity: 12, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>📍 Packing List ✈️</h1>;
}

function Form() {
  const [itemName, setItemName] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<number>(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!itemName) return;
    type Item = {
      id: number;
      description: string;
      quantity: number;
      packed: boolean;
    };
    const newItem: Item = {
      id: Date.now(),
      description: itemName,
      quantity: itemQuantity,
      packed: false,
    };
    console.log(newItem);
    setItemName("");
    setItemQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3 className="form-question">What do you need to pack? 🤔</h3>
      <select
        value={itemQuantity}
        onChange={(e) => setItemQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>✖️</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      🧳 You have X items to pack, and Y items packed.
    </footer>
  );
}
