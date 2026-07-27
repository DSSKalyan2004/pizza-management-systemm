import heroFallback from "../assets/hero.png";

// A small curated set of real pizza photos used when a pizza doesn't
// have its own imageUrl set in the backend yet. Picked deterministically
// per pizza (by id) so the same pizza always shows the same photo,
// rather than flickering between random images on every render.
const STOCK_PIZZA_IMAGES = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1548369937-47519962c11a?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1571066811602-716837d681de?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1548365328-9f547fb0953b?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=70",
];

// Returns the pizza's own image if the backend has one set, otherwise
// a stable stock photo picked by pizza id, otherwise the bundled
// local fallback (used if even the stock photo URL fails to load).
export function getPizzaImage(pizza) {
  if (pizza?.imageUrl) return pizza.imageUrl;
  if (pizza?.pizzaId != null) {
    return STOCK_PIZZA_IMAGES[pizza.pizzaId % STOCK_PIZZA_IMAGES.length];
  }
  return heroFallback;
}

export { STOCK_PIZZA_IMAGES, heroFallback };
