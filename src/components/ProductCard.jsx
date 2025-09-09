import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../App.css";

function ProductCard({ product, onDelete, onEdit }) {
  const [imageUrl, setImageUrl] = useState("");

  // Get Unsplash Access Key from .env
  const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  // Function to fetch Unsplash image
  const fetchImage = async (query) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_KEY}&per_page=1`
      );
      if (!res.ok) throw new Error("Unsplash API error");
      const data = await res.json();
      return data.results[0]?.urls?.small || "";
    } catch (err) {
      console.error("Failed to fetch image:", err);
      return "";
    }
  };

  useEffect(() => {
    async function loadImage() {
      if (product?.name) {
        const categoryImg = await fetchImage(product.name);
        if (categoryImg) return setImageUrl(categoryImg);
      }
      if (product?.name) {
        const nameImg = await fetchImage(product.name);
        setImageUrl(nameImg);
      }
    }
    loadImage();
  }, [product?.category, product?.name]);

  return (
    <div className="product-card">
      <div className="product-image">
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} />
        ) : (
          <div className="product-image-placeholder">
            {product.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="product-content">
        <h3>{product.name}</h3>
        <div className="price">${Number(product.price).toFixed(2)}</div>
        <p className="description">{product.description}</p>
        {product.category && <span className="category">{product.category}</span>}
        <div className="card-actions">
          <button className="btn btn-warning" onClick={() => onEdit(product)}>
            <i className="fas fa-edit" style={{ marginRight: "6px" }}></i> Edit
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(product._id)}>
            <i className="fas fa-trash" style={{ marginRight: "6px" }}></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProductCard;
