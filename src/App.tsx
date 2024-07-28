import React, { useState } from "react";
import Logo from "./components/Logo.tsx";
import Form from "./components/Form.tsx";
import PackingList from "./components/PackingList.tsx";
import Stats from "./components/Stats.tsx";
import { itemType } from "./types";

export default function App() {
  const [items, setItems] = useState<itemType[]>([]);

  function handleAddItem(item: itemType) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(id: number) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id: number) {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        }
        return item;
      })
    );
  }

  function handleClearList() {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the list?"
    );
    if (confirmClear) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
