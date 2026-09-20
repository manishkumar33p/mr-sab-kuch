import React, { useState, useMemo } from "react";
import "./Laundry.css";

import Footer from "../Footer/Footer";
import MarvVideo2 from "../marvv3.mp4";

const laundryServices = [
  {
    id: 1,
    name: "Washing & Dry Cleaning",
    category: "Dry Cleaning",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Steam Ironing",
    category: "Ironing",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Stain Removal",
    category: "Cleaning",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Pickup & Delivery",
    category: "Pickup",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Bulk Laundry Service",
    category: "Bulk",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Dry Cleaning Special Care",
    category: "Dry Cleaning",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Bed Sheet & Blanket Cleaning",
    category: "Home Laundry",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Shoe & Bag Cleaning",
    category: "Special Care",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Special Fabric Care",
    category: "Special Care",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Sanitization Service",
    category: "Sanitization",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
  },
];

const Laundry = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const [msg, setMsg] = useState("");

  const categories = [
    "All",
    "Dry Cleaning",
    "Ironing",
    "Cleaning",
    "Pickup",
    "Bulk",
    "Home Laundry",
    "Special Care",
    "Sanitization",
  ];

  const filteredServices = useMemo(() => {
    return laundryServices.filter((item) => {
      const searchMatch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch =
        category === "All" || item.category === category;

      return searchMatch && categoryMatch;
    });
  }, [search, category]);

  const openBooking = (item) => {
    setSelected(item);
    setQuantity(1);
    setDate("");
    setLocation("");
  };

  const confirmBooking = () => {
    if (!selected) return;

    if (!date || !location) {
      setMsg("Please fill all booking details!");
      setTimeout(() => setMsg(""), 2500);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const booking = {
      id: Date.now(),
      serviceId: selected.id,
      name: selected.name,
      category: selected.category,
      image: selected.image,
      price: selected.price,
      quantity,
      date,
      location,
      totalPrice: selected.price * quantity,
      type: "laundry-service",
    };

    cart.push(booking);

    localStorage.setItem("cart", JSON.stringify(cart));

    setMsg("Laundry service booked successfully 🎉");

    setSelected(null);

    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <div className="laundry-page">

      {/* ================= HERO ================= */}

      <section className="laundry-hero">

        <video
          className="laundry-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={MarvVideo2} type="video/mp4" />
        </video>

        <div className="laundry-hero-overlay"></div>

        <div className="laundry-hero-content">

          <div className="laundry-hero-left">

            <span className="laundry-tag">
              NISS Laundry Services
            </span>

            <h1>
              Cleaner Clothes.
              <span> Happier You.</span>
            </h1>

            <p>
              Professional washing, dry cleaning, ironing,
              stain removal, pickup & delivery and special
              fabric care services for homes, offices and businesses.
            </p>

            <div className="laundry-search-box">

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Search laundry service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                onClick={() => {
                  document
                    .getElementById("laundry-services")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
              >
                Find Service
              </button>

            </div>

            <div className="laundry-hero-buttons">

              <button
                className="laundry-primary-btn"
                onClick={() =>
                  document
                    .getElementById("laundry-services")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Book Laundry
              </button>

              <button
                className="laundry-secondary-btn"
                onClick={() =>
                  document
                    .getElementById("laundry-contact")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Pickup & Delivery
              </button>

            </div>

          </div>

          <div className="laundry-hero-right">

            <div className="laundry-stat-card">

              <div className="stat-icon">🧺</div>

              <h3>Freshness You Can Trust</h3>

              <p>
                Professional cleaning with quality
                care for every fabric.
              </p>

            </div>

            <div className="laundry-small-stats">

              <div>
                <strong>24/7</strong>
                <span>Support</span>
              </div>

              <div>
                <strong>500+</strong>
                <span>Orders</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Care</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= MESSAGE ================= */}

      {msg && (
        <div className="laundry-message">
          {msg}
        </div>
      )}

      {/* ================= SERVICES ================= */}

      <section
        className="laundry-services-section"
        id="laundry-services"
      >

        <div className="laundry-section-heading">

          <span></span>

          <div>
            <small>OUR SERVICES</small>
            <h2>Professional Laundry Services</h2>
            <p>
              Clean care. Fresh results. Every time.
            </p>
          </div>

          <span></span>

        </div>

        <div className="laundry-filter-bar">

          <input
            type="text"
            placeholder="Search service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

        </div>

        <div className="laundry-grid">

          {filteredServices.length > 0 ? (

            filteredServices.map((item) => (

              <div
                className="laundry-card"
                key={item.id}
              >

                <div className="laundry-image-wrapper">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <span className="laundry-category">
                    {item.category}
                  </span>

                </div>

                <div className="laundry-card-content">

                  <h3>{item.name}</h3>

                  <p>
                    Professional NISS laundry care
                    for fresh and clean results.
                  </p>

                  <div className="laundry-card-bottom">

                    <div>
                      <small>Starting from</small>

                      <strong>
                        ₹{item.price}
                      </strong>
                    </div>

                    <button
                      onClick={() => openBooking(item)}
                    >
                      Book Now
                    </button>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="laundry-no-result">
              <h2>No Service Found</h2>
              <p>
                Try another service name or category.
              </p>
            </div>

          )}

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="laundry-features">

        <div className="laundry-feature">

          <div>🧺</div>

          <h3>Professional Equipment</h3>

          <p>
            Modern laundry equipment for quality results.
          </p>

        </div>

        <div className="laundry-feature">

          <div>🌿</div>

          <h3>Eco-Friendly Cleaning</h3>

          <p>
            Safe cleaning process for your clothes.
          </p>

        </div>

        <div className="laundry-feature">

          <div>🛡️</div>

          <h3>Hygienic & Safe</h3>

          <p>
            Clean and hygienic handling of every order.
          </p>

        </div>

        <div className="laundry-feature">

          <div>🚚</div>

          <h3>Pickup & Delivery</h3>

          <p>
            Convenient doorstep pickup and delivery.
          </p>

        </div>

      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="laundry-why">

        <div className="laundry-why-content">

          <span className="laundry-mini-title">
            WHY CHOOSE NISS
          </span>

          <h2>
            We Clean.
            <span> You Relax.</span>
          </h2>

          <p>
            NISS Laundry Services provides reliable,
            affordable and professional laundry solutions
            designed for homes, offices, hotels, PGs,
            hostels and businesses.
          </p>

          <div className="laundry-benefits">

            <div>
              <strong>✓</strong>
              <span>Quality Assurance</span>
            </div>

            <div>
              <strong>✓</strong>
              <span>Trained Professionals</span>
            </div>

            <div>
              <strong>✓</strong>
              <span>Eco-Friendly Process</span>
            </div>

            <div>
              <strong>✓</strong>
              <span>On-Time Delivery</span>
            </div>

            <div>
              <strong>✓</strong>
              <span>Affordable Pricing</span>
            </div>

            <div>
              <strong>✓</strong>
              <span>100% Satisfaction</span>
            </div>

          </div>

        </div>

        <div className="laundry-contact-card" id="laundry-contact">

          <span>WE CLEAN. YOU RELAX!</span>

          <h2>
            Fresh Clothes,
            <br />
            Fresh Feeling.
          </h2>

          <p>
            Book your laundry service today
            and enjoy convenient pickup &
            delivery.
          </p>

          <a href="tel:+919958424916">
            📞 +91 99584 24916
          </a>

          <a
            href="https://wa.me/919958424916"
            target="_blank"
            rel="noreferrer"
          >
            💬 WhatsApp Us
          </a>

        </div>

      </section>

      {/* ================= BOOKING MODAL ================= */}

      {selected && (

        <div className="laundry-modal-overlay">

          <div className="laundry-modal">

            <button
              className="laundry-close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <div className="modal-image">

              <img
                src={selected.image}
                alt={selected.name}
              />

            </div>

            <div className="modal-content">

              <span>{selected.category}</span>

              <h2>{selected.name}</h2>

              <p className="modal-price">
                ₹{selected.price} / item
              </p>

              <label>
                Quantity
              </label>

              <div className="quantity-box">

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(1, quantity - 1)
                    )
                  }
                >
                  −
                </button>

                <strong>{quantity}</strong>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                >
                  +
                </button>

              </div>

              <label>
                Pickup Date
              </label>

              <input
                type="date"
                value={date}
                min={new Date()
                  .toISOString()
                  .split("T")[0]}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />

              <label>
                Pickup Address
              </label>

              <textarea
                placeholder="Enter your complete address..."
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />

              <div className="modal-total">

                <span>Total</span>

                <strong>
                  ₹{selected.price * quantity}
                </strong>

              </div>

              <div className="modal-actions">

                <button
                  className="modal-cancel"
                  onClick={() => setSelected(null)}
                >
                  Cancel
                </button>

                <button
                  className="modal-confirm"
                  onClick={confirmBooking}
                >
                  Confirm Booking
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      <Footer />

    </div>
  );
};

export default Laundry;