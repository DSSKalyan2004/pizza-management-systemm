import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PizzaCard from "../../components/PizzaCard";
import Loader from "../../components/Loader";
import { getAllPizzas } from "../../services/pizzaService";
import { fetchRatingsForPizzas } from "../../utils/ratings";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

const SIZES = ["Small", "Medium", "Large"];

function Menu() {
  const [pizzas, setPizzas] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const [message, setMessage] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [sizeFilter, setSizeFilter] = useState([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState("default");

  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    setLoading(true);
    try {
      const response = await getAllPizzas();
      setPizzas(response.data);
      const ratingMap = await fetchRatingsForPizzas(response.data);
      setRatings(ratingMap);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSize = (size) => {
    setSizeFilter((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const visiblePizzas = useMemo(() => {
    let list = [...pizzas];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.pizzaName?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (sizeFilter.length > 0) {
      list = list.filter((p) => sizeFilter.includes(p.size));
    }

    if (availableOnly) {
      list = list.filter((p) => p.available);
    }

    if (sort === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === "rating_desc") {
      list.sort(
        (a, b) =>
          (ratings[b.pizzaId]?.average ?? 0) -
          (ratings[a.pizzaId]?.average ?? 0)
      );
    }

    return list;
  }, [pizzas, search, sizeFilter, availableOnly, sort, ratings]);

  const handleAddToCart = async (pizza) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setMessage(null);
    setAddingId(pizza.pizzaId);

    try {
      await addItem(pizza.pizzaId, 1);
      setMessage({ type: "success", text: `${pizza.pizzaName} added to cart` });
    } catch (error) {
      console.error(error);
      setMessage({ type: "danger", text: "Could not add pizza to cart" });
    } finally {
      setAddingId(null);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-end flex-wrap mb-4">
          <div>
            <h1 className="mb-1">Pizza Menu</h1>
            {search && (
              <p className="text-muted mb-0">
                Showing results for "<strong>{search}</strong>"{" "}
                <button
                  className="btn btn-sm btn-link p-0 ms-1"
                  onClick={() => setSearchParams({})}
                >
                  clear
                </button>
              </p>
            )}
          </div>

          <select
            className="form-select mt-2 mt-md-0"
            style={{ maxWidth: "220px" }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort: Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Highest Rated</option>
          </select>
        </div>

        {message && (
          <div className={`alert alert-${message.type} text-center`}>
            {message.text}
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className="row">
            <div className="col-lg-3 mb-4">
              <div className="ph-filters">
                <h6>Size</h6>
                {SIZES.map((size) => (
                  <div className="form-check" key={size}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`size-${size}`}
                      checked={sizeFilter.includes(size)}
                      onChange={() => toggleSize(size)}
                    />
                    <label className="form-check-label" htmlFor={`size-${size}`}>
                      {size}
                    </label>
                  </div>
                ))}

                <hr />

                <h6>Availability</h6>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="available-only"
                    checked={availableOnly}
                    onChange={(e) => setAvailableOnly(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="available-only">
                    In stock only
                  </label>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              {visiblePizzas.length === 0 ? (
                <div className="ph-empty">
                  <h4>No pizzas match your filters</h4>
                  <p>Try clearing a filter or searching for something else.</p>
                </div>
              ) : (
                <div className="row">
                  {visiblePizzas.map((pizza) => (
                    <PizzaCard
                      key={pizza.pizzaId}
                      pizza={pizza}
                      onAddToCart={handleAddToCart}
                      adding={addingId === pizza.pizzaId}
                      rating={ratings[pizza.pizzaId]}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Menu;
