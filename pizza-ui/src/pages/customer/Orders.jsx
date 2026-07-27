import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import { useAuth } from "../../hooks/useAuth";
import { getAllOrders } from "../../services/orderService";

function statusClass(status) {
  const s = (status || "").toUpperCase();
  if (s.includes("PLACED")) return "ph-status-placed";
  if (s.includes("DELIVERED")) return "ph-status-delivered";
  if (s.includes("PROGRESS") || s.includes("TRANSIT") || s.includes("OUT")) return "ph-status-progress";
  return "ph-status-default";
}

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      const mine = res.data.filter(
        (order) => order.customer?.customerId === user?.customerId
      );
      setOrders(mine);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5">

        <h2 className="mb-4">My Orders</h2>

        {loading ? (
          <Loader />
        ) : orders.length === 0 ? (
          <div className="ph-empty">
            <h4>No orders yet</h4>
            <p>Your placed orders will show up here.</p>
            <Link to="/menu" className="btn btn-danger mt-2">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {orders.map((order) => (
              <div key={order.orderId} className="ph-ticket p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <div>
                    <div className="ph-order-id">ORDER #{order.orderId}</div>
                    <h5 className="mb-0 mt-1">{order.pizza?.pizzaName}</h5>
                    <p className="text-muted mb-0">Qty: {order.quantity}</p>
                  </div>

                  <div className="text-end">
                    <div className={`ph-status-badge ${statusClass(order.orderStatus)}`}>
                      {order.orderStatus}
                    </div>
                    <h5 className="ph-price mt-2 mb-0">₹ {order.totalPrice}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Orders;
