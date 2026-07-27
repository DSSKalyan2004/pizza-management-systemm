import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getOrderById } from "../../services/orderService";

function statusClass(status) {
  const s = (status || "").toUpperCase();
  if (s.includes("PLACED")) return "ph-status-placed";
  if (s.includes("DELIVERED")) return "ph-status-delivered";
  if (s.includes("PROGRESS") || s.includes("TRANSIT") || s.includes("OUT")) return "ph-status-progress";
  return "ph-status-default";
}

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError("");
    setOrder(null);
    setLoading(true);

    try {
      const res = await getOrderById(orderId);
      setOrder(res.data);
    } catch (error) {
      console.error(error);
      setError("Order not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5" style={{ maxWidth: "500px" }}>

        <h2 className="mb-4">Track Order</h2>

        <form className="d-flex mb-4" onSubmit={handleTrack}>
          <input
            className="form-control me-2"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
          <button className="btn btn-danger" disabled={loading}>
            {loading ? "Searching..." : "Track"}
          </button>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        {order && (
          <div className="ph-ticket p-4">
            <div className="ph-order-id">ORDER #{order.orderId}</div>
            <h5 className="mt-1">{order.pizza?.pizzaName}</h5>
            <p className="mb-1 text-muted">
              Quantity: {order.quantity}
            </p>
            <h5 className="ph-price mb-3">₹ {order.totalPrice}</h5>
            <div className={`ph-status-badge ${statusClass(order.orderStatus)}`}>
              {order.orderStatus}
            </div>
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default TrackOrder;
