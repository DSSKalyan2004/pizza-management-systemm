import api from "./api";

export const getAllDeliveries = () => {
  return api.get("/deliveries");
};

export const getDeliveryById = (id) => {
  return api.get(`/deliveries/${id}`);
};

export const createDelivery = (orderId, deliveryPerson) => {
  return api.post(
    `/deliveries?orderId=${orderId}&deliveryPerson=${encodeURIComponent(deliveryPerson)}`
  );
};

export const updateDeliveryStatus = (id, status) => {
  return api.put(
    `/deliveries/${id}/status?status=${encodeURIComponent(status)}`
  );
};

export const deleteDelivery = (id) => {
  return api.delete(`/deliveries/${id}`);
};
