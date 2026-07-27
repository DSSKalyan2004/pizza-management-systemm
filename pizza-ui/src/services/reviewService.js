import api from "./api";

export const addReview = (data) => {
  return api.post("/reviews/add", data);
};

export const getReviews = (pizzaId) => {
  return api.get(`/reviews/pizza/${pizzaId}`);
};
