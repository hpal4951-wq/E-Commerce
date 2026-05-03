import { useMemo, useState } from "react";
import { useInventory } from "../context/InventoryContext";
import useDebounce from "../hooks/useDebounce";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { inventory, loading, error, syncInventory } = useInventory();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [rating, setRating] = useState("all");

  const debouncedSearch = useDebounce(search, 500);

  const categories = useMemo(() => {
    return ["all", ...new Set(inventory.map((item) => item.category))];
  }, [inventory]);

  const filteredProducts = useMemo(() => {
    return inventory.filter((product) => {
      const searchMatch = product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const categoryMatch =
        category === "all" || product.category === category;

      const ratingMatch =
        rating === "all" || product.rating >= Number(rating);

      return searchMatch && categoryMatch && ratingMatch;
    });
  }, [inventory, debouncedSearch, category, rating]);

  return (
    <div className="container">
      <h1 className="title">Products</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="all">All Ratings</option>
          <option value="4">4 Stars & above</option>
          <option value="3">3 Stars & above</option>
          <option value="2">2 Stars & above</option>
        </select>

        <button className="btn" onClick={syncInventory}>
          Sync Products
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <div className="grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="skeleton" key={index}></div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <p>No products found. Click Sync Products.</p>
      ) : (
        <div className="grid">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;