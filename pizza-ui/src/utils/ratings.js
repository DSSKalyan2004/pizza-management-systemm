import { getReviews } from "../services/reviewService";

// Fetches reviews for each pizza from the backend and reduces them
// to { [pizzaId]: { average, count } }. Real data only — no
// placeholder ratings are ever fabricated.
export async function fetchRatingsForPizzas(pizzas) {
  const entries = await Promise.all(
    pizzas.map(async (pizza) => {
      try {
        const res = await getReviews(pizza.pizzaId);
        const reviews = res.data || [];
        const count = reviews.length;
        const average = count
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / count
          : 0;
        return [pizza.pizzaId, { average, count }];
      } catch (error) {
        return [pizza.pizzaId, { average: 0, count: 0 }];
      }
    })
  );

  return Object.fromEntries(entries);
}
