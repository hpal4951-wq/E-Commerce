import { createContext, useContext, useEffect, useRef, useState } from "react";
import { fetchProducts } from "../services/productService";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const abortRef = useRef(null);

  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    setInventory(savedInventory);
  }, []);

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  const syncInventory = async () => {
    try {
      if (abortRef.current) {
        abortRef.current.abort();
      }

      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError("");

      const data = await fetchProducts(controller.signal);

      const formattedProducts = data.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: product.rating?.rate || 0,
        count: 10,
      }));

      setInventory(formattedProducts);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Failed to sync products");
      }
    } finally {
      setLoading(false);
    }
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      price: Number(product.price),
      rating: Number(product.rating),
      count: Number(product.count),
    };

    setInventory((prev) => [...prev, newProduct]);
  };

  const removeProduct = (id) => {
    setInventory((prev) => prev.filter((product) => product.id !== id));
  };

  const increaseStock = (id) => {
    setInventory((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, count: product.count + 1 }
          : product
      )
    );
  };

  const decreaseStock = (id) => {
    setInventory((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, count: Math.max(0, product.count - 1) }
          : product
      )
    );
  };

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        loading,
        error,
        syncInventory,
        addProduct,
        removeProduct,
        increaseStock,
        decreaseStock,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);