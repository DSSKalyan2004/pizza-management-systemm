function Footer() {
  return (
    <footer className="ph-footer mt-5">

      <div className="container py-4">

        <div className="row">

          <div className="col-md-6">

            <h4>🍕 PizzaHub</h4>

            <p>
              Fresh Pizza Delivered to Your Doorstep.
            </p>

          </div>

          <div className="col-md-6 text-md-end">

            <h5>Quick Links</h5>

            <p className="mb-1">Home</p>
            <p className="mb-1">Menu</p>
            <p className="mb-1">Orders</p>

          </div>

        </div>

        <hr style={{ borderColor: "rgba(247,242,233,0.15)" }} />

        <p className="text-center mb-0" style={{ opacity: 0.7 }}>
          © 2026 PizzaHub. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;
