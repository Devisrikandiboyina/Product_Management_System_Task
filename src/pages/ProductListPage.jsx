import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import EditModal from "../components/EditModal";
import Navbar from "../components/Navbar";

function ProductListPage() {
  const {
    products,
    sort,
    setSort,
    search,
    setSearch,
    deleteProduct,
    editingProduct,
    setEditingProduct,
    updateProduct,
  } = useContext(ProductContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  return (
    <>
    <Navbar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />
    <div className="container">
      
      <h1>Product List</h1>

      {/* Products */}
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
          <p>No products found</p>
        )}
      </div>

      {/* Edit Modal */}
      <EditModal
        product={editingProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={updateProduct}
      />
    </div>
    </>
  );
}

export default ProductListPage;
