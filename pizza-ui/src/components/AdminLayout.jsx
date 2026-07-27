import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  FaChartPie,
  FaUsers,
  FaPizzaSlice,
  FaClipboardList,
  FaMoneyBillWave,
  FaTruck,
} from "react-icons/fa";

const LINKS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: FaChartPie },
  { to: "/admin/customers", label: "Customers", icon: FaUsers },
  { to: "/admin/pizzas", label: "Pizzas", icon: FaPizzaSlice },
  { to: "/admin/orders", label: "Orders", icon: FaClipboardList },
  { to: "/admin/payments", label: "Payments", icon: FaMoneyBillWave },
  { to: "/admin/deliveries", label: "Deliveries", icon: FaTruck },
];

function AdminLayout({ title, action, children }) {
  return (
    <>
      <Navbar />

      <div className="container-fluid mt-4 mb-5">
        <div className="row">

          <div className="col-lg-2 mb-4">
            <div className="ph-filters p-3 sticky-top" style={{ top: "90px" }}>
              <h6 className="mb-3">Admin Panel</h6>
              <div className="d-flex flex-column gap-1">
                {LINKS.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `d-flex align-items-center gap-2 px-2 py-2 rounded text-decoration-none ${
                        isActive ? "text-white" : "text-dark"
                      }`
                    }
                    style={({ isActive }) => ({
                      background: isActive ? "var(--sauce)" : "transparent",
                      fontWeight: isActive ? 600 : 500,
                    })}
                  >
                    <Icon /> {label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-10">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <h2 className="mb-0">{title}</h2>
              {action}
            </div>

            {children}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminLayout;
