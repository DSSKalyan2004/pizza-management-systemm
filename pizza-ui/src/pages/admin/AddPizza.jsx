import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { addPizza } from "../../services/pizzaService";
import heroFallback from "../../assets/hero.png";

function AddPizza() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pizzaName: "",
    description: "",
    price: "",
    size: "Medium",
    available: true,
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await addPizza({ ...form, price: Number(form.price) });
      navigate("/admin/pizzas");
    } catch (error) {
      console.error(error);
      setError("Failed to add pizza");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add Pizza">
      <div className="row">
        <div className="col-lg-7">
          <div className="card ph-product-card p-4">

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Pizza Name</label>
                <input
                  className="form-control"
                  name="pizzaName"
                  value={form.pizzaName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  className="form-control"
                  name="imageUrl"
                  placeholder="https://example.com/pizza.jpg"
                  value={form.imageUrl}
                  onChange={handleChange}
                />
                <div className="form-text">
                  Optional — leave blank to use a default photo.
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Size</label>
                <select
                  className="form-select"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="available"
                  checked={form.available}
                  onChange={handleChange}
                  id="available"
                />
                <label className="form-check-label" htmlFor="available">
                  Available
                </label>
              </div>

              <button className="btn btn-danger w-100" disabled={loading}>
                {loading ? "Adding..." : "Add Pizza"}
              </button>

            </form>

          </div>
        </div>

        <div className="col-lg-5">
          <div className="card ph-product-card p-3 text-center">
            <p className="text-muted mb-2">Live Preview</p>
            <img
              src={form.imageUrl || heroFallback}
              alt="preview"
              style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "10px" }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = heroFallback;
              }}
            />
            <h5 className="mt-3 mb-0">{form.pizzaName || "Pizza Name"}</h5>
            <p className="ph-price">₹ {form.price || 0}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddPizza;
