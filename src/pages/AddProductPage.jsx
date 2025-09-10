import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AddProductPage() {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleAdd = async (product) => {
    await addProduct(product);
    navigate("/products"); // redirect after add
  };

  return (
    <>
    <Navbar />  {/* ✅ Navbar here */}
    <div className="container">
      
      <h1>Add Product</h1>
      <ProductForm addProduct={handleAdd} />
    </div>
    </>
  );
}

export default AddProductPage;
