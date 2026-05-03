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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    <div style={{ padding: "30px" }}>
      <h2>Inventory Page - Admin Only</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Product title"
          value={formData.title}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="rating"
          type="number"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="count"
          type="number"
          placeholder="Stock count"
          value={formData.count}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Add Product</button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h3>Inventory List</h3>

      {inventory.length === 0 ? (
        <p>No inventory available.</p>
      ) : (
        inventory.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              width="100"
              height="100"
            />

            <h3>{product.title}</h3>
            <p>Price: ₹ {product.price}</p>
            <p>Stock: {product.count}</p>

            <button onClick={() => increaseStock(product.id)}>
              Increase Stock
            </button>

            <button onClick={() => decreaseStock(product.id)}>
              Decrease Stock
            </button>

            <button onClick={() => removeProduct(product.id)}>
              Remove Product
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Inventory;