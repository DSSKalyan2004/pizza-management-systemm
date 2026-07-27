import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import Loader from "../../components/Loader";
import { getAllOrders, deleteOrder } from "../../services/orderService";

function statusClass(status) {
  const s = (status || "").toUpperCase();
  if (s.includes("PLACED")) return "ph-status-placed";
  if (s.includes("DELIVERED")) return "ph-status-delivered";
  if (s.includes("PROGRESS") || s.includes("TRANSIT") || s.includes("OUT")) return "ph-status-progress";
  return "ph-status-default";
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders();
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout title="All Orders">
      {loading ? (
        <Loader />
      ) : (
        <div className="card ph-product-card p-3">
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Pizza</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>#{order.orderId}</td>
                    <td>{order.customer?.name}</td>
                    <td>{order.pizza?.pizzaName}</td>
                    <td>{order.quantity}</td>
                    <td className="ph-price">₹ {order.totalPrice}</td>
                    <td>
                      <span className={`ph-status-badge ${statusClass(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(order.orderId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Orders;
