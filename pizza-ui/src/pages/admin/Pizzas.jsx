import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import Loader from "../../components/Loader";
import { getAllPizzas, deletePizza } from "../../services/pizzaService";
import { getPizzaImage, heroFallback } from "../../utils/pizzaImages";

function Pizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    setLoading(true);
    try {
      const res = await getAllPizzas();
      setPizzas(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this pizza?")) return;

    try {
      await deletePizza(id);
      fetchPizzas();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout
      title="Manage Pizzas"
      action={
        <Link to="/admin/pizzas/add" className="btn btn-danger">
          + Add Pizza
        </Link>
      }
    >
      {loading ? (
        <Loader />
      ) : (
        <div className="card ph-product-card p-3">
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pizzas.map((pizza) => (
                  <tr key={pizza.pizzaId}>
                    <td>
                      <img
                        src={getPizzaImage(pizza)}
                        alt={pizza.pizzaName}
                        style={{ width: "48px", height: "48px", objectFit: "cover" }}
                        className="rounded"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = heroFallback;
                        }}
                      />
                    </td>
                    <td>{pizza.pizzaId}</td>
                    <td>{pizza.pizzaName}</td>
                    <td className="ph-price">₹ {pizza.price}</td>
                    <td>{pizza.size}</td>
                    <td>
                      {pizza.available ? (
                        <span className="ph-status-badge ph-status-delivered">Available</span>
                      ) : (
                        <span className="ph-status-badge ph-status-default">Out of Stock</span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/admin/pizzas/edit/${pizza.pizzaId}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(pizza.pizzaId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Pizzas;
