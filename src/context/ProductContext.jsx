// src/context/ProductContext.jsx
import { createContext, useState, useEffect, useCallback } from "react";

export const ProductContext = createContext();

const API_URL = "http://localhost:5000/api/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}?sort=${sort}&search=${search}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  }, [sort, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Add Product
  const addProduct = async (product) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    fetchProducts();
  };

  // Update Product
  const updateProduct = async (product) => {
    if (!editingProduct) return;
    await fetch(`${API_URL}/${editingProduct._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    setEditingProduct(null);
    fetchProducts();
  };

  // Delete Product
  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchProducts();
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        sort,
        setSort,
        search,
        setSearch,
        addProduct,
        updateProduct,
        deleteProduct,
        editingProduct,
        setEditingProduct,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
