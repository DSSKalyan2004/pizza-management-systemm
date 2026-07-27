import api from "./api";

// Add Pizza to Cart
export const addToCart = (data) => {
  return api.post("/cart/add", data);
};

// Get Customer Cart
export const getCart = (customerId) => {
  return api.get(`/cart/${customerId}`);
};

// Update quantity of a single cart item
export const updateCartItemQuantity = (customerId, cartItemId, quantity) => {
  return api.put(
    `/cart/${customerId}/item/${cartItemId}?quantity=${quantity}`
  );
};

// Remove a single item from the cart
export const removeCartItem = (customerId, cartItemId) => {
  return api.delete(`/cart/${customerId}/item/${cartItemId}`);
};

// Clear Cart
export const clearCart = (customerId) => {
  return api.delete(`/cart/clear/${customerId}`);
};