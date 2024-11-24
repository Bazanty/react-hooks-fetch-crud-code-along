import React, { useState } from "react";

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");
  const [error, setError] = useState(null);  // To handle errors

  function handleSubmit(e) {
    e.preventDefault();

    // Check if name is provided, you can add more validation if necessary
    if (!name) {
      setError("Name is required");
      return;
    }

    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    };

    // POST request to add the new item to the backend
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((r) => r.json())
      .then((newItem) => {
        // Add the new item to the list
        onAddItem(newItem);

        // Reset the form after successful submission
        setName("");
        setCategory("Produce");
        setError(null); // Reset error if there is any
      })
      .catch((error) => {
        setError("Failed to add item. Please try again.");
        console.error("Error adding item:", error);
      });
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>

      {/* Display error message if there's an error */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default ItemForm;
