import { useState } from "react";
import PropTypes from "prop-types";

function ProductForm({ addProduct }) {
  const [form, setForm] = useState({ name: "", price: "", description: "", category: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Name is required!");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      alert("Price must be a positive number!");
      return;
    }
    if (form.description.trim().length < 5) {
      alert("Description must be at least 5 characters long!");
      return;
    }

    addProduct({ ...form, price: Number(form.price) });
    setForm({ name: "", price: "", description: "", category: "" });
  };

  return (
    <div className="form-container">
  <h2 style={{ margin: "0 0 20px", fontSize: "20px", fontWeight: "600" }}>Add New Product</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-grid">
      <div className="form-field">
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          step="1"
          min="1"
          value={form.price}
          onChange={handleChange}
          placeholder="Enter price "
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          type="text"
          value={form.category}
          onChange={handleChange}
          placeholder="Enter category "
        />
      </div>
      <div className="form-field" style={{ gridColumn: "1 / -1" }}>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter product description"
        />
      </div>
    </div>
    <div className="form-actions">
      <button type="submit" className="btn btn-primary">
        Add Product
      </button>
    </div>
  </form>
</div>

  );
}

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default ProductForm;
