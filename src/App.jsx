import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";

import HomePage from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import ProductListPage from "./pages/ProductListPage";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddProductPage />} />
          <Route path="/products" element={<ProductListPage />} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
