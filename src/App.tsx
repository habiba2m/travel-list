import React from "react";
import { useState } from "react";

type itemType = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>📍 Packing List ✈️</h1>;
}

function Form({ onAddItems }: { onAddItems: (item: itemType) => void }) {
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

function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
}: {
  items: itemType[];
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({
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

function Stats({ items }: { items: itemType[] }) {
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
