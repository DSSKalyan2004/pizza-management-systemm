import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <section className="ph-hero py-5">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6">

              <h1 className="display-3 fw-bold">
                Wood-Fired, <span className="ph-accent">Fast Fired.</span>
              </h1>

              <p className="lead mt-3" style={{ opacity: 0.9 }}>
                Real ingredients, real reviews, real order tracking —
                every pizza on this menu comes straight from our kitchen's
                own order book.
              </p>

              <Link
                to="/menu"
                className="btn btn-lg mt-3"
                style={{ background: "var(--cheese)", color: "var(--crust)", fontWeight: 700 }}
              >
                Order Now
              </Link>

            </div>

            <div className="col-lg-6 text-center">

              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
                alt="Pizza"
                className="img-fluid rounded shadow"
              />

            </div>

          </div>

        </div>

      </section>

      <section className="container py-5">

        <h2 className="text-center mb-5">
          Why Choose PizzaHub?
        </h2>

        <div className="row">

          <div className="col-md-4">

            <div className="card ph-product-card text-center p-4">

              <h1>🍕</h1>

              <h4>Fresh Ingredients</h4>

              <p className="text-muted">Prepared with premium quality ingredients.</p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card ph-product-card text-center p-4">

              <h1>🚚</h1>

              <h4>Fast Delivery</h4>

              <p className="text-muted">Quick delivery directly to your doorstep.</p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card ph-product-card text-center p-4">

              <h1>⭐</h1>

              <h4>Real Reviews</h4>

              <p className="text-muted">Ratings on every pizza, from real customers.</p>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Home;
