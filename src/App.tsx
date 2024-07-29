import React, { useState } from "react";
import Logo from "./components/Logo.tsx";
import Form from "./components/Form.tsx";
import PackingList from "./components/PackingList.tsx";
import Stats from "./components/Stats.tsx";
import { itemType } from "./types";

export default function App() {
  const [items, setItems] = useState<itemType[]>(
    JSON.parse(localStorage.getItem("items") || "[]")
  );

  function handleAddItem(item) {
    setItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      localStorage.setItem("items", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }

  function handleDeleteItem(id: number) {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("items", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }

  function handleToggleItem(id: number) {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        }
        return item;
      });
      localStorage.setItem("items", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }

  function handleClearList() {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the list?"
    );
    if (confirmClear) {
      setItems([]);
      localStorage.setItem("items", "[]");
    }
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
