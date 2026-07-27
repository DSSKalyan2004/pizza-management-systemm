import { getPizzaImage, heroFallback } from "../utils/pizzaImages";

function CartItem({ item, onUpdateQuantity, onRemove, busy }) {
  const { pizza, quantity, subTotal } = item;

  return (
    <div className="d-flex align-items-center justify-content-between border-bottom py-3 flex-wrap gap-2">

      <div className="d-flex align-items-center">

        <img
          src={getPizzaImage(pizza)}
          alt={pizza?.pizzaName}
          style={{ width: "70px", height: "70px", objectFit: "cover" }}
          className="rounded me-3"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = heroFallback;
          }}
        />

        <div>
          <h5 className="mb-1">{pizza?.pizzaName}</h5>
          <p className="mb-0 text-muted">₹ {pizza?.price} each</p>
        </div>

      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="ph-qty-stepper">
          <button
            type="button"
            disabled={busy}
            onClick={() => onUpdateQuantity(item.cartItemId, quantity - 1)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            disabled={busy}
            onClick={() => onUpdateQuantity(item.cartItemId, quantity + 1)}
          >
            +
          </button>
        </div>

        <h5 className="ph-price mb-0" style={{ minWidth: "80px" }}>
          ₹ {subTotal}
        </h5>

        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          disabled={busy}
          onClick={() => onRemove(item.cartItemId)}
        >
          Remove
        </button>
      </div>

    </div>
  );
}

export default CartItem;
