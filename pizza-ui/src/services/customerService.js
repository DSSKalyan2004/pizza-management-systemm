import api from "./api";

export const getAllCustomers = () => {
  return api.get("/customers");
};

export const getCustomerById = (id) => {
  return api.get(`/customers/${id}`);
};

export const updateCustomer = (id, data) => {
  return api.put(`/customers/${id}`, data);
};

export const deleteCustomer = (id) => {
  return api.delete(`/customers/${id}`);
};
