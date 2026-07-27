import { Routes, Route } from "react-router-dom";

// Customer Pages
import Home from "./pages/customer/Home";
import Menu from "./pages/customer/Menu";
import PizzaDetails from "./pages/customer/PizzaDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Orders from "./pages/customer/Orders";
import TrackOrder from "./pages/customer/TrackOrder";
import Profile from "./pages/customer/Profile";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Pizzas from "./pages/admin/Pizzas";
import AddPizza from "./pages/admin/AddPizza";
import EditPizza from "./pages/admin/EditPizza";
import AdminOrders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Deliveries from "./pages/admin/Deliveries";
import Payments from "./pages/admin/Payments";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/pizza/:id" element={<PizzaDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/track-order" element={<TrackOrder />} />

      {/* Customer (requires login) */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Admin (requires ADMIN role) */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute adminOnly>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/pizzas"
        element={
          <ProtectedRoute adminOnly>
            <Pizzas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/pizzas/add"
        element={
          <ProtectedRoute adminOnly>
            <AddPizza />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/pizzas/edit/:id"
        element={
          <ProtectedRoute adminOnly>
            <EditPizza />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute adminOnly>
            <AdminOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/customers"
        element={
          <ProtectedRoute adminOnly>
            <Customers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/deliveries"
        element={
          <ProtectedRoute adminOnly>
            <Deliveries />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/payments"
        element={
          <ProtectedRoute adminOnly>
            <Payments />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <div className="container mt-5 text-center">
            <h1>404</h1>
            <h3>Page Not Found</h3>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
