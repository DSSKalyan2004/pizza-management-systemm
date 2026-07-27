import { Link } from "react-router-dom";
import { getPizzaImage, heroFallback } from "../utils/pizzaImages";
import StarRating from "./StarRating";

function PizzaCard({ pizza, onAddToCart, adding = false, rating }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 ph-product-card">

        <div className="ph-price-tag">₹{pizza.price}</div>

        <img
          src={getPizzaImage(pizza)}
          className="card-img-top"
          alt={pizza.pizzaName}
          style={{ height: "220px", objectFit: "cover", borderRadius: "14px 14px 0 0" }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = heroFallback;
          }}
        />

        <div className="card-body">

          <h4>{pizza.pizzaName}</h4>

          <div className="mb-2">
            <StarRating average={rating?.average} count={rating?.count} />
          </div>

          <p className="text-muted">
            {pizza.description}
          </p>

          <p className="mb-1">
            <strong>Size :</strong> {pizza.size}
          </p>

          <p>
            <strong>Status :</strong>{" "}
            {pizza.available ? (
              <span style={{ color: "var(--basil-dark)" }}>Available</span>
            ) : (
              <span className="text-danger">Out of Stock</span>
            )}
          </p>

        </div>

        <div className="card-footer bg-white border-0">

          <div className="d-grid gap-2">

            <Link
              to={`/pizza/${pizza.pizzaId}`}
              className="btn btn-outline-danger"
            >
              View Details
            </Link>

            <button
              className="btn btn-danger"
              onClick={() => onAddToCart(pizza)}
              disabled={!pizza.available || adding}
            >
              {adding ? "Adding..." : "Add To Cart"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default PizzaCard;
