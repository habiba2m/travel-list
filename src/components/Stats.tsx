import React from "react";
import { itemType } from "../types";

export default function Stats({ items }: { items: itemType[] }) {
  if (!items.length) {
    return <footer className="stats">🧳 No items on your list yet! 🧳</footer>;
  }

  const numItems = items.length;
  const numItemsPacked = items.filter((item) => item.packed).length;
  const percentage = numItems === 0 ? 0 : (numItemsPacked / numItems) * 100;

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <div>🎉 You have packed all your items! 🎉</div>
      ) : (
        `🧳 You have ${numItems} items on your list, and you have already packed 
        ${numItemsPacked} ${numItemsPacked === 1 ? "item" : "items"} 
        (${Math.round(percentage)}%).`
      )}
    </footer>
  );
}
