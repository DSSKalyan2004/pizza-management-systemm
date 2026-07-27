import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaPizzaSlice, FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const itemCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/menu?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ph-navbar py-2">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <FaPizzaSlice className="me-2" />
          PizzaHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/menu">
                Menu
              </NavLink>
            </li>

            {user && user.role !== "ADMIN" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/orders">
                    Orders
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
              </>
            )}

            {user && user.role === "ADMIN" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/dashboard">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>

          <form
            className="d-flex ph-search flex-grow-1 mx-lg-4 my-2 my-lg-0"
            onSubmit={handleSearch}
          >
            <input
              className="form-control"
              placeholder="Search for pizzas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" aria-label="Search">
              <FaSearch />
            </button>
          </form>

          <div className="d-flex align-items-center">
            {user?.role !== "ADMIN" && (
              <NavLink to="/cart" className="btn ph-cart-btn me-2">
                <FaShoppingCart />
                {itemCount > 0 && (
                  <span className="ph-cart-badge">{itemCount}</span>
                )}
              </NavLink>
            )}

            {!user ? (
              <>
                <NavLink to="/login" className="btn btn-light me-2">
                  Login
                </NavLink>

                <NavLink to="/register" className="btn btn-ph-secondary">
                  <FaUserCircle className="me-1" />
                  Register
                </NavLink>
              </>
            ) : (
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
