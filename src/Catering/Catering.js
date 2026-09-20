import React, { useMemo, useState } from "react";
import "./Catering.css";
// import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import MarvVideo2 from "../marvv3.mp4";

// ================= SERVICES =================

const cateringServices = [
  {
    id: 1,
    name: "Wedding & Event Catering",
    category: "Events",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    description:
      "Complete catering for weddings, receptions, engagements and celebrations.",
  },
  {
    id: 2,
    name: "Corporate & Office Catering",
    category: "Corporate",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
    description:
      "Professional catering for meetings, conferences, seminars and office events.",
  },
  {
    id: 3,
    name: "Birthday Party Catering",
    category: "Events",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d",
    description:
      "Delicious food arrangements for birthdays and family celebrations.",
  },
  {
    id: 4,
    name: "Buffet Catering",
    category: "Buffet",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033",
    description:
      "Multi-cuisine buffet with starters, main course, desserts and beverages.",
  },
  {
    id: 5,
    name: "Live Counter & Food Stalls",
    category: "Live Food",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    description:
      "Live cooking counters including chaat, dosa, pasta, kebab and more.",
  },
  {
    id: 6,
    name: "Packed Meal Service",
    category: "Meals",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554",
    description:
      "Fresh and hygienically packed meals for offices, events and travel.",
  },
  {
    id: 7,
    name: "Tiffin / Daily Meal Service",
    category: "Meals",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
    description:
      "Fresh home-style daily meals with customizable monthly plans.",
  },
  {
    id: 8,
    name: "Special Diet Meals",
    category: "Special",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    description:
      "Healthy, low-oil, low-spice and customized diet meal options.",
  },
  {
    id: 9,
    name: "Industrial & Institutional Catering",
    category: "Corporate",
    price: 229,
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c",
    description:
      "Large-scale catering for factories, schools, hospitals and institutions.",
  },
  {
    id: 10,
    name: "Catering Management",
    category: "Management",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
    description:
      "Complete end-to-end catering management with staff and menu planning.",
  },
];

// ================= COMPONENT =================

const Catering = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [selected, setSelected] = useState(null);

  const [guests, setGuests] = useState(50);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [foodType, setFoodType] = useState("Veg");

  const [msg, setMsg] = useState("");

  // ================= FILTER =================

  const filteredServices = useMemo(() => {
    return cateringServices.filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || item.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category]);

  // ================= OPEN BOOKING =================

  const openBooking = (item) => {
    setSelected(item);
    setGuests(50);
    setDate("");
    setLocation("");
    setFoodType("Veg");
  };

  // ================= CLOSE =================

  const closeBooking = () => {
    setSelected(null);
  };

  // ================= BOOKING =================

  const confirmBooking = () => {
    if (!selected) return;

    if (!date || !location || !guests) {
      setMsg("Please fill all booking details!");

      setTimeout(() => {
        setMsg("");
      }, 2500);

      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const booking = {
      id: Date.now(),
      serviceId: selected.id,
      name: selected.name,
      image: selected.image,
      category: selected.category,

      pricePerGuest: selected.price,

      guests: Number(guests),

      foodType,

      date,

      location,

      totalPrice: selected.price * Number(guests),

      type: "catering-service",
    };

    cart.push(booking);

    localStorage.setItem("cart", JSON.stringify(cart));

    setMsg("Catering service booked successfully 🎉");

    setSelected(null);

    setTimeout(() => {
      setMsg("");
    }, 3000);
  };

  return (
    <div className="catering-page">
{/* 
      <NavBar /> */}

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="catering-hero">

        <video
          className="catering-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={MarvVideo2} type="video/mp4" />
        </video>

        <div className="catering-video-overlay"></div>

        <div className="catering-hero-content">

          <span className="catering-tag">
            NISS CATERING SYSTEM
          </span>

          <h1>
            Great Food For
            <span> Every Occasion</span>
          </h1>

          <p>
            Delicious food, professional service and complete catering
            solutions for weddings, parties, offices and events.
          </p>

          <div className="catering-hero-buttons">

            <button
              className="catering-primary-btn"
              onClick={() => {
                document
                  .getElementById("catering-services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book Catering
            </button>

            <button
              className="catering-secondary-btn"
              onClick={() => {
                document
                  .getElementById("catering-services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Services
            </button>

          </div>

        </div>

        {/* HERO STATS */}

        <div className="catering-stats">

          <div>
            <strong>100%</strong>
            <span>Fresh Food</span>
          </div>

          <div>
            <strong>500+</strong>
            <span>Events Served</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Support</span>
          </div>

          <div>
            <strong>100%</strong>
            <span>Satisfaction</span>
          </div>

        </div>

      </section>

      {/* =====================================================
          MESSAGE
      ===================================================== */}

      {msg && (
        <div className="catering-message">
          {msg}
        </div>
      )}

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="catering-intro">

        <div className="section-heading">

          <span>OUR CATERING SERVICES</span>

          <h2>
            Good Food.
            <b> Great Taste.</b>
          </h2>

          <p>
            NISS Catering System provides hygienic, delicious and
            customizable food solutions for every type of event.
          </p>

        </div>

      </section>

      {/* =====================================================
          SEARCH & FILTER
      ===================================================== */}

      <section className="catering-filter-section">

        <div className="catering-search">

          <input
            type="text"
            placeholder="Search catering service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="catering-filter">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Services</option>
            <option value="Events">Events</option>
            <option value="Corporate">Corporate</option>
            <option value="Buffet">Buffet</option>
            <option value="Live Food">Live Food</option>
            <option value="Meals">Meals</option>
            <option value="Special">Special Meals</option>
            <option value="Management">Management</option>
          </select>

        </div>

      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        className="catering-services"
        id="catering-services"
      >

        <div className="catering-grid">

          {filteredServices.length > 0 ? (

            filteredServices.map((item) => (

              <div
                className="catering-card"
                key={item.id}
              >

                <div className="catering-image-box">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <span className="catering-category">
                    {item.category}
                  </span>

                </div>

                <div className="catering-card-content">

                  <h3>{item.name}</h3>

                  <p>
                    {item.description}
                  </p>

                  <div className="catering-card-bottom">

                    <div className="catering-price">

                      <small>Starting from</small>

                      <strong>
                        ₹{item.price}
                      </strong>

                      <span>/ guest</span>

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

            <div className="no-catering">
              <h2>No Catering Service Found</h2>
              <p>Try another search or category.</p>
            </div>

          )}

        </div>

      </section>

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="why-catering">

        <div className="section-heading">

          <span>WHY CHOOSE US?</span>

          <h2>
            Your Event,
            <b> Our Responsibility</b>
          </h2>

        </div>

        <div className="why-catering-grid">

          <div className="why-card">
            <div className="why-icon">👨‍🍳</div>
            <h3>Experienced Professionals</h3>
            <p>
              Experienced chefs and catering staff for every occasion.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">🥗</div>
            <h3>Fresh & Quality Food</h3>
            <p>
              Fresh ingredients and hygienic food preparation.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">⏰</div>
            <h3>On-Time Service</h3>
            <p>
              Timely preparation, delivery and event management.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">💰</div>
            <h3>Affordable Pricing</h3>
            <p>
              Flexible menus and packages according to your budget.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">❤️</div>
            <h3>Customer Satisfaction</h3>
            <p>
              We focus on taste, quality and customer happiness.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">📞</div>
            <h3>24/7 Support</h3>
            <p>
              Quick support for your catering requirements.
            </p>
          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="catering-cta">

        <div>

          <span>
            NISS CATERING SYSTEM
          </span>

          <h2>
            Good Food Is The Foundation
            <br />
            Of Great Memories!
          </h2>

          <p>
            Plan your next event with our professional catering team.
          </p>

          <button
            onClick={() => {
              document
                .getElementById("catering-services")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Book Your Catering
          </button>

        </div>

        <div className="cta-food-icon">
          🍽️
        </div>

      </section>

      {/* =====================================================
          BOOKING MODAL
      ===================================================== */}

      {selected && (

        <div
          className="catering-modal-overlay"
          onClick={closeBooking}
        >

          <div
            className="catering-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={closeBooking}
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

              <span className="modal-category">
                {selected.category}
              </span>

              <h2>
                {selected.name}
              </h2>

              <p className="modal-description">
                {selected.description}
              </p>

              {/* GUESTS */}

              <label>
                Number of Guests
              </label>

              <div className="guest-selector">

                <button
                  onClick={() =>
                    setGuests((prev) =>
                      Math.max(10, Number(prev) - 10)
                    )
                  }
                >
                  −
                </button>

                <input
                  type="number"
                  min="10"
                  value={guests}
                  onChange={(e) =>
                    setGuests(e.target.value)
                  }
                />

                <button
                  onClick={() =>
                    setGuests((prev) =>
                      Number(prev) + 10
                    )
                  }
                >
                  +
                </button>

              </div>

              {/* FOOD TYPE */}

              <label>
                Food Type
              </label>

              <div className="food-type-buttons">

                <button
                  className={
                    foodType === "Veg"
                      ? "food-active"
                      : ""
                  }
                  onClick={() =>
                    setFoodType("Veg")
                  }
                >
                  🥗 Veg
                </button>

                <button
                  className={
                    foodType === "Non-Veg"
                      ? "food-active"
                      : ""
                  }
                  onClick={() =>
                    setFoodType("Non-Veg")
                  }
                >
                  🍗 Non-Veg
                </button>

                <button
                  className={
                    foodType === "Both"
                      ? "food-active"
                      : ""
                  }
                  onClick={() =>
                    setFoodType("Both")
                  }
                >
                  🍽️ Both
                </button>

              </div>

              {/* DATE */}

              <label>
                Event Date
              </label>

              <input
                className="modal-input"
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />

              {/* ADDRESS */}

              <label>
                Event Location / Address
              </label>

              <input
                className="modal-input"
                type="text"
                placeholder="Enter complete address..."
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />

              {/* TOTAL */}

              <div className="booking-total">

                <span>
                  ₹{selected.price} × {guests} Guests
                </span>

                <strong>
                  ₹
                  {(
                    selected.price *
                    Number(guests || 0)
                  ).toLocaleString()}
                </strong>

              </div>

              {/* BUTTONS */}

              <div className="modal-actions">

                <button
                  className="modal-cancel"
                  onClick={closeBooking}
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

export default Catering;