import { useState, useEffect, useCallback } from "react";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import EditModal from "./components/EditModal";
import "./App.css";

const API_URL = "http://localhost:5000/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
  try {
    const res = await fetch(`${API_URL}?sort=${sort}&search=${search}`);
    const data = await res.json();

    // data is always an array
    setProducts(data);
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }
}, [sort, search]);


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (product) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    fetchProducts();
  };

  const updateProduct = async (product) => {
    await fetch(`${API_URL}/${editingProduct._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    setEditingProduct(null);
    setIsModalOpen(false);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Product Management</h1>
        <p>Manage your product catalog with ease</p>
      </div>

      <ProductForm addProduct={addProduct} />

      <div className="controls">
        <div className="search-wrapper">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by...</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>

      </div>


     <div className="products">
  {products.length > 0 ? (
    products.map((p) => (
      <ProductCard
        key={p._id}
        product={p}
        onDelete={deleteProduct}
        onEdit={handleEdit}
      />
    ))
  ) : (
    <p
      style={{
        textAlign: "center",
        marginTop: "20px",
        fontWeight: "500",
        color: "#555",
      }}
    >
      {search ? `No matches found for "${search}"` : "No products found"}
    </p>
  )}
</div>


      <EditModal
        product={editingProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={updateProduct}
      />
    </div>
  );
}

export default App;
