import api from "./api";

export const getAllPizzas = () => {
  return api.get("/pizzas");
};

export const getPizzaById = (id) => {
  return api.get(`/pizzas/${id}`);
};

export const addPizza = (data) => {
  return api.post("/pizzas", data);
};

export const updatePizza = (id, data) => {
  return api.put(`/pizzas/${id}`, data);
};

export const deletePizza = (id) => {
  return api.delete(`/pizzas/${id}`);
};
