import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import Loader from "../../components/Loader";
import {
  getAllDeliveries,
  updateDeliveryStatus,
  deleteDelivery,
} from "../../services/deliveryService";

const STATUSES = ["PENDING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const res = await getAllDeliveries();
      setDeliveries(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateDeliveryStatus(id, status);
      fetchDeliveries();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this delivery?")) return;

    try {
      await deleteDelivery(id);
      fetchDeliveries();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout title="Deliveries">
      {loading ? (
        <Loader />
      ) : (
        <div className="card ph-product-card p-3">
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order</th>
                  <th>Address</th>
                  <th>Delivery Person</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((delivery) => (
                  <tr key={delivery.deliveryId}>
                    <td>{delivery.deliveryId}</td>
                    <td>#{delivery.order?.orderId}</td>
                    <td>{delivery.deliveryAddress}</td>
                    <td>{delivery.deliveryPerson}</td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={delivery.deliveryStatus}
                        onChange={(e) =>
                          handleStatusChange(
                            delivery.deliveryId,
                            e.target.value
                          )
                        }
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(delivery.deliveryId)}
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

export default Deliveries;
