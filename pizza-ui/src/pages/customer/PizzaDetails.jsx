import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StarRating from "../../components/StarRating";
import { getPizzaById } from "../../services/pizzaService";
import { getReviews, addReview } from "../../services/reviewService";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { getPizzaImage, heroFallback } from "../../utils/pizzaImages";

function PizzaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();

  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    loadPizza();
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadPizza = async () => {
    setLoading(true);
    try {
      const response = await getPizzaById(id);
      setPizza(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    setReviewsLoading(true);
    try {
      const res = await getReviews(id);
      setReviews(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setMessage(null);
    setAdding(true);

    try {
      await addItem(pizza.pizzaId, quantity);
      setMessage({ type: "success", text: `${pizza.pizzaName} added to cart` });
    } catch (error) {
      console.error(error);
      setMessage({ type: "danger", text: "Could not add pizza to cart" });
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    await handleAddToCart();
    navigate("/cart");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    setReviewError("");
    setReviewSubmitting(true);

    try {
      await addReview({
        customerId: user.customerId,
        pizzaId: Number(id),
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
      });
      setReviewForm({ rating: 5, comment: "" });
      await loadReviews();
    } catch (error) {
      console.error(error);
      setReviewError("Could not submit your review. Please try again.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <h3>Loading...</h3>
        </div>
        <Footer />
      </>
    );
  }

  if (!pizza) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <h2>Pizza Not Found</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row">

          <div className="col-md-6">
            <img
              src={getPizzaImage(pizza)}
              className="img-fluid rounded shadow"
              alt={pizza.pizzaName}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = heroFallback;
              }}
            />
          </div>

          <div className="col-md-6">

            <h1>{pizza.pizzaName}</h1>

            <div className="mb-2">
              <StarRating average={average} count={reviews.length} />
            </div>

            <hr />

            <p>{pizza.description}</p>

            <h3 className="ph-price">₹ {pizza.price}</h3>

            <p>
              <strong>Size :</strong> {pizza.size}
            </p>

            <p>
              <strong>Availability :</strong>{" "}
              {pizza.available ? (
                <span style={{ color: "var(--basil-dark)" }}>
                  Available
                </span>
              ) : (
                <span className="text-danger">
                  Out Of Stock
                </span>
              )}
            </p>

            {message && (
              <div className={`alert alert-${message.type}`}>
                {message.text}
              </div>
            )}

            {pizza.available && (
              <div className="d-flex align-items-center mb-3">
                <label className="me-3 mb-0">
                  <strong>Quantity :</strong>
                </label>
                <div className="ph-qty-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-danger btn-lg flex-grow-1"
                onClick={handleAddToCart}
                disabled={!pizza.available || adding}
              >
                {adding ? "Adding..." : "Add To Cart"}
              </button>

              <button
                className="btn btn-danger btn-lg flex-grow-1"
                onClick={handleBuyNow}
                disabled={!pizza.available || adding}
              >
                Buy Now
              </button>
            </div>

          </div>

        </div>

        <hr className="my-5" />

        <div className="row">
          <div className="col-lg-8">
            <h3 className="mb-4">Customer Reviews</h3>

            {reviewsLoading ? (
              <p className="text-muted">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="text-muted">
                No reviews yet — be the first to review this pizza.
              </p>
            ) : (
              <div className="d-flex flex-column gap-3 mb-4">
                {reviews.map((review) => (
                  <div key={review.reviewId} className="card p-3 ph-product-card">
                    <div className="d-flex justify-content-between">
                      <strong>{review.customer?.name || "Customer"}</strong>
                      <span className="ph-stars">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p className="mb-0 mt-2 text-muted">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="card p-3 ph-product-card">
              <h5>Write a Review</h5>

              {!user ? (
                <p className="text-muted mb-0">
                  <button
                    className="btn btn-link p-0"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>{" "}
                  to share your thoughts on this pizza.
                </p>
              ) : (
                <form onSubmit={handleReviewSubmit}>
                  {reviewError && (
                    <div className="alert alert-danger py-2">{reviewError}</div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <select
                      className="form-select"
                      value={reviewForm.rating}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, rating: e.target.value })
                      }
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n} Star{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={reviewForm.comment}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, comment: e.target.value })
                      }
                      required
                    />
                  </div>

                  <button
                    className="btn btn-danger w-100"
                    disabled={reviewSubmitting}
                  >
                    {reviewSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default PizzaDetails;
