import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  addToCart as addToCartApi,
  getCart,
  clearCart as clearCartApi,
  updateCartItemQuantity,
  removeCartItem,
} from "../services/cartService";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshCart = async () => {
    if (!user?.customerId) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const res = await getCart(user.customerId);
      setCart(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.customerId]);

  const addItem = async (pizzaId, quantity = 1) => {
    if (!user?.customerId) {
      throw new Error("Please login first");
    }
    await addToCartApi({
      customerId: user.customerId,
      pizzaId,
      quantity,
    });
    await refreshCart();
  };

  const updateItemQuantity = async (cartItemId, quantity) => {
    if (!user?.customerId) return;
    await updateCartItemQuantity(user.customerId, cartItemId, quantity);
    await refreshCart();
  };

  const removeItem = async (cartItemId) => {
    if (!user?.customerId) return;
    await removeCartItem(user.customerId, cartItemId);
    await refreshCart();
  };

  const clearCart = async () => {
    if (!user?.customerId) return;
    await clearCartApi(user.customerId);
    await refreshCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        refreshCart,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
