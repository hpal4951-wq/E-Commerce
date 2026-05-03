import { useState } from "react";
import { useInventory } from "../context/InventoryContext";

const Inventory = () => {
  const {
    inventory,
    addProduct,
    removeProduct,
    increaseStock,
    decreaseStock,
  } = useInventory();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: "",
    count: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.price ||
      !formData.category ||
      !formData.image ||
      !formData.rating ||
      !formData.count
    ) {
      alert("Please fill all required fields");
      return;
    }

    addProduct(formData);

    setFormData({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
      rating: "",
      count: "",
    });
  };

  return (
    <div className="container">
      <h1 className="title">Admin Inventory</h1>

      <form className="form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <input
          name="title"
          placeholder="Product title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          name="rating"
          type="number"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
        />

        <input
          name="count"
          type="number"
          placeholder="Stock count"
          value={formData.count}
          onChange={handleChange}
        />

        <button className="btn">Add Product</button>
      </form>

      <br />

      <h2>Inventory List</h2>

      <div className="grid">
        {inventory.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.title} />

            <h3>{item.title}</h3>
            <p>₹ {item.price}</p>
            <p>Stock: {item.count}</p>

            <div className="actions">
              <button
                className="btn btn-green"
                onClick={() => increaseStock(item.id)}
              >
                Increase
              </button>

              <button className="btn" onClick={() => decreaseStock(item.id)}>
                Decrease
              </button>

              <button
                className="btn btn-danger"
                onClick={() => removeProduct(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;