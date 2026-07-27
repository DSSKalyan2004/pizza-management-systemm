import api from "./api";

export const makePayment = (data) => {
  return api.post("/payments/pay", data);
};
