import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <div className="home-content">
        <h1 style={{ fontFamily: "'Poppins' , sans-serif"}}>Welcome to Product Hub
</h1>

        <p>Choose an option below</p>

        <div className="home-buttons">
          <Link to="/add">
            <button className="btn-primary">➕ Add Product</button>
          </Link>
          <Link to="/products">
            <button className="btn-secondary">🛒 View Products</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
