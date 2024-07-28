import React from "react";
import { itemType } from "../types";

export default function Item({
  item,
  onDeleteItem,
  onToggleItem,
}: {
  item: itemType;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed.toString()}
        onChange={() => onToggleItem(item.id)}
        id={`packed-${item.id}`}
      />
      <label
        htmlFor={`packed-${item.id}`}
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        <span className="item-quantity">{item.quantity}</span>{" "}
        {item.description}
      </label>
      <button onClick={() => onDeleteItem(item.id)}>✖️</button>
    </li>
  );
}
