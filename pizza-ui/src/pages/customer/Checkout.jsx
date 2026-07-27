import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { placeOrder } from "../../services/orderService";
import { makePayment } from "../../services/paymentService";

function Checkout() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePlaceOrder = async () => {
    if (!cart || cart.items.length === 0) return;

    setLoading(true);
    setError("");

    try {
      // The backend places one order per pizza, so a cart with
      // multiple pizzas results in one order + one payment per item.
      for (const item of cart.items) {
        const orderRes = await placeOrder(
          user.customerId,
          item.pizza.pizzaId,
          item.quantity
        );

        await makePayment({
          orderId: orderRes.data.orderId,
          paymentMethod,
        });
      }

      await clearCart();
      navigate("/orders");
    } catch (error) {
      console.error(error);
      setError("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5" style={{ maxWidth: "600px" }}>

        <h2 className="mb-4">Checkout</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow p-4 mb-4">
          <h5>Delivery Address</h5>
          <p className="text-muted mb-0">{user?.address}</p>
        </div>

        <div className="card shadow p-4 mb-4">
          <h5 className="mb-3">Payment Method</h5>

          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="CARD">Card</option>
            <option value="UPI">UPI</option>
            <option value="CASH_ON_DELIVERY">Cash On Delivery</option>
          </select>
        </div>

        <div className="card shadow p-4 mb-4">
          <h5 className="mb-3">Order Summary</h5>
          {cart?.items?.map((item) => (
            <div
              key={item.cartItemId}
              className="d-flex justify-content-between text-muted mb-1"
            >
              <span>
                {item.pizza?.pizzaName} × {item.quantity}
              </span>
              <span>₹ {item.subTotal}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between">
            <h5 className="mb-0">Order Total</h5>
            <h3 className="ph-price mb-0">₹ {cart?.totalPrice ?? 0}</h3>
          </div>
        </div>

        <button
          className="btn btn-danger w-100 btn-lg"
          onClick={handlePlaceOrder}
          disabled={loading || !cart || cart.items.length === 0}
        >
          {loading ? "Placing Order..." : "Place Order & Pay"}
        </button>

      </div>

      <Footer />
    </>
  );
}

export default Checkout;
