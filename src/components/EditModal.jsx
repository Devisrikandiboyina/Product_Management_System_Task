import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function EditModal({ product, isOpen, onClose, onSave }) {
    const [form, setForm] = useState({ name: "", price: "", description: "", category: "" });

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name || "",
                price: product.price || "",
                description: product.description || "",
                category: product.category || ""
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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

        onSave({ ...form, price: Number(form.price) });
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal">
                <div className="modal-header">
                    <h2 className="modal-title">Edit Product</h2>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-field">
                                <label htmlFor="edit-name">Product Name</label>
                                <input
                                    id="edit-name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="edit-price">Price</label>
                                <input
                                    id="edit-price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="edit-category">Category</label>
                                <input
                                    id="edit-category"
                                    name="category"
                                    type="text"
                                    value={form.category}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
                                <label htmlFor="edit-description">Description</label>
                                <input
                                    id="edit-description"
                                    name="description"
                                    type="text"
                                    value={form.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button type="button" className="btn btn-outline" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

EditModal.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        description: PropTypes.string,
        category: PropTypes.string,
    }),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default EditModal;
