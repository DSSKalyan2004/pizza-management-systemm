import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../hooks/useAuth";
import { updateCustomer } from "../../services/customerService";

function Profile() {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await updateCustomer(user.customerId, form);
      updateUser({ ...user, ...res.data });
      setMessage("Profile updated successfully");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <h3>Please login to view your profile</h3>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5" style={{ maxWidth: "550px" }}>

        <div className="card ph-product-card p-4 p-md-5">

          <div className="text-center mb-4">
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
              style={{
                width: "72px",
                height: "72px",
                background: "var(--cheese)",
                color: "var(--crust)",
                fontSize: "1.8rem",
                fontWeight: 700,
              }}
            >
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <h2 className="mb-0">{user.name}</h2>
            <p className="text-muted">{user.email}</p>
          </div>

          {message && <div className="alert alert-info">{message}</div>}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-danger w-100" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Profile;
