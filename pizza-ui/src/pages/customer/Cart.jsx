import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CartItem from "../../components/CartItem";
import Loader from "../../components/Loader";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

function Cart() {
  const { user } = useAuth();
  const { cart, loading, clearCart, updateItemQuantity, removeItem } = useCart();
  const [busyId, setBusyId] = useState(null);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <h3>Please login to view your cart</h3>
          <Link to="/login" className="btn btn-danger mt-3">
            Login
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    setBusyId(cartItemId);
    try {
      await updateItemQuantity(cartItemId, quantity);
    } catch (error) {
      console.error(error);
    } finally {
      setBusyId(null);
    }
  };

  const handleRemove = async (cartItemId) => {
    setBusyId(cartItemId);
    try {
      await removeItem(cartItemId);
    } catch (error) {
      console.error(error);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5">

        <h2 className="mb-4">Your Cart</h2>

        {loading ? (
          <Loader />
        ) : !cart || cart.items.length === 0 ? (
          <div className="ph-empty">
            <h4>Your cart is empty</h4>
            <p>Add a pizza from the menu to get started.</p>
            <Link to="/menu" className="btn btn-danger mt-2">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className="ph-ticket p-4">
                {cart.items.map((item) => (
                  <CartItem
                    key={item.cartItemId}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemove}
                    busy={busyId === item.cartItemId}
                  />
                ))}
              </div>
            </div>

            <div className="col-lg-4 mt-4 mt-lg-0">
              <div className="card ph-product-card p-4">
                <h5 className="mb-3">Order Summary</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Items</span>
                  <span>
                    {cart.items.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong className="ph-price">₹ {cart.totalPrice}</strong>
                </div>

                <Link to="/checkout" className="btn btn-danger w-100 mb-2">
                  Proceed to Checkout
                </Link>

                <button
                  className="btn btn-outline-danger w-100"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Cart;
