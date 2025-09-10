import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";


function Navbar({ search, setSearch, sort, setSort }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Product Hub</h2>
      {/* Show search + sort only on ProductListPage */}
      {location.pathname === "/products" && (
        <div className="navbar-controls">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="navbar-search"
          />

          <select
            className="navbar-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort by...</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      )}

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/add">Add Product</Link>
        <Link to="/products">Product List</Link>
      </div>

      
    </nav>
  );
}

Navbar.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  sort: PropTypes.string,
  setSort: PropTypes.func,
};

export default Navbar;
