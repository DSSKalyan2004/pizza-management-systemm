import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { makePayment } from "../../services/paymentService";

function Payments() {
  const [form, setForm] = useState({ orderId: "", paymentMethod: "CARD" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await makePayment({
        orderId: Number(form.orderId),
        paymentMethod: form.paymentMethod,
      });
      setMessage(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Payments">
      <div className="card ph-product-card p-4" style={{ maxWidth: "500px" }}>

        <div className="alert alert-info">
          The backend doesn't expose a "list all payments" endpoint yet
          (only <code>POST /payments/pay</code>) — totals show up on the
          Dashboard. Use this form to record a payment against an order.
        </div>

        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Order ID</label>
            <input
              type="number"
              className="form-control"
              name="orderId"
              value={form.orderId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Payment Method</label>
            <select
              className="form-select"
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option value="CARD">Card</option>
              <option value="UPI">UPI</option>
              <option value="CASH_ON_DELIVERY">Cash On Delivery</option>
            </select>
          </div>

          <button className="btn btn-danger w-100" disabled={loading}>
            {loading ? "Processing..." : "Record Payment"}
          </button>

        </form>

      </div>
    </AdminLayout>
  );
}

export default Payments;
