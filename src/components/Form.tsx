import React, { useState } from "react";
import { itemType } from "../types";

export default function Form({
  onAddItems,
}: {
  onAddItems: (item: itemType) => void;
}) {
  const [itemName, setItemName] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<number>(1);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    onAddItems(newItem);
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
