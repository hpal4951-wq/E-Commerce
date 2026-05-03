import { useInventory } from "../context/InventoryContext";

const Products = () => {
  const { inventory, loading, error, syncInventory } = useInventory();

  return (
    <div style={{ padding: "30px" }}>
      <h2>Products Page</h2>

      <button onClick={syncInventory}>Sync Products</button>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <br />
      <br />

      {inventory.length === 0 && !loading ? (
        <p>No products found. Click Sync Products.</p>
      ) : (
        <div>
          {inventory.map((product) => (
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
              <p>Category: {product.category}</p>
              <p>Rating: ⭐ {product.rating}</p>
              <p>Stock: {product.count}</p>

              {product.count === 0 ? (
                <button disabled>Out of Stock</button>
              ) : (
                <button>Add to Cart</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;