import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Fetch items from API
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  // Delete item
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  // Toggle the "isInCart" status of an item
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        // Toggle the isInCart status
        return { ...item, isInCart: !item.isInCart };
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  // Add a new item to the list
  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  // Change selected category for filtering
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  // Filter items based on the selected category
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter category={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
