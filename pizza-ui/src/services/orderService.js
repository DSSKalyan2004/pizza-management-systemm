import api from "./api";

// Backend takes these as query params, not a JSON body
export const placeOrder = (customerId, pizzaId, quantity) => {
  return api.post(
    `/orders?customerId=${customerId}&pizzaId=${pizzaId}&quantity=${quantity}`
  );
};

export const getAllOrders = () => {
  return api.get("/orders");
};

export const getOrderById = (id) => {
  return api.get(`/orders/${id}`);
};

export const deleteOrder = (id) => {
  return api.delete(`/orders/${id}`);
};
