import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import Loader from "../../components/Loader";
import { getDashboard } from "../../services/adminService";
import {
  FaUsers,
  FaPizzaSlice,
  FaClipboardList,
  FaMoneyBillWave,
  FaRupeeSign,
} from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getDashboard();
      setStats(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { label: "Customers", value: stats?.totalCustomers, icon: FaUsers },
    { label: "Pizzas", value: stats?.totalPizzas, icon: FaPizzaSlice },
    { label: "Orders", value: stats?.totalOrders, icon: FaClipboardList },
    { label: "Payments", value: stats?.totalPayments, icon: FaMoneyBillWave },
    { label: "Revenue", value: `₹ ${stats?.totalRevenue ?? 0}`, icon: FaRupeeSign },
  ];

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          {cards.map((card) => (
            <div className="col-md-4 col-lg mb-4" key={card.label}>
              <div className="card ph-product-card h-100 p-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="text-uppercase text-muted mb-1" style={{ fontSize: "0.75rem" }}>
                      {card.label}
                    </h6>
                    <h3 className="ph-price mb-0">{card.value ?? 0}</h3>
                  </div>
                  <card.icon size={28} style={{ color: "var(--cheese-dark)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default Dashboard;
