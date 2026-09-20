import React, { useMemo, useState } from "react";
import "./EventManagement.css";
// import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import MarvVideo2 from "../marvv3.mp4";

const eventServices = [
  {
    id: 1,
    name: "Tent Decoration",
    category: "Tent & Decoration",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
    description:
      "Beautiful tent setup with elegant decoration for weddings, parties and special events.",
  },
  {
    id: 2,
    name: "Wedding Decoration",
    category: "Wedding",
    price: 9999,
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
    description:
      "Complete wedding decoration with stage, flowers, lighting and theme setup.",
  },
  {
    id: 3,
    name: "Birthday Decoration",
    category: "Birthday",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d",
    description:
      "Creative birthday decoration with balloons, backdrop, lights and customized themes.",
  },
  {
    id: 4,
    name: "Stage Decoration",
    category: "Stage & Lighting",
    price: 5999,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    description:
      "Professional stage setup with backdrop, lighting and premium decoration.",
  },
  {
    id: 5,
    name: "Flower Decoration",
    category: "Tent & Decoration",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    description:
      "Fresh and artificial flower decoration for weddings, parties and ceremonies.",
  },
  {
    id: 6,
    name: "Corporate Event Management",
    category: "Corporate",
    price: 14999,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    description:
      "Complete corporate event planning, decoration, stage and guest management.",
  },
  {
    id: 7,
    name: "DJ & Sound System",
    category: "Entertainment",
    price: 6999,
    image:
      "https://images.unsplash.com/photo-1571266028243-d220c9c3b7c4",
    description:
      "Professional DJ, speakers, microphones and complete sound setup.",
  },
  {
    id: 8,
    name: "Lighting Decoration",
    category: "Stage & Lighting",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
    description:
      "Decorative lighting, fairy lights, LED lights and event ambience setup.",
  },
  {
    id: 9,
    name: "Theme Party",
    category: "Theme Events",
    price: 7999,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    description:
      "Customized theme party decoration according to your event and requirements.",
  },
  {
    id: 10,
    name: "Complete Event Management",
    category: "Event Management",
    price: 19999,
    image:
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde",
    description:
      "End-to-end event management including decoration, catering coordination, stage and guest management.",
  },
];

const EventManagement = () => {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(50);

  const [msg, setMsg] = useState("");

  const filteredServices = useMemo(() => {
    if (category === "All") {
      return eventServices;
    }

    return eventServices.filter(
      (service) => service.category === category
    );
  }, [category]);

  const openBooking = (service) => {
    setSelected(service);
    setDate("");
    setLocation("");
    setGuests(50);
  };

  const confirmBooking = () => {
    if (!date || !location || !guests) {
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
      date,
      location,
      guests,
      type: "event-service",
    };

    cart.push(booking);

    localStorage.setItem("cart", JSON.stringify(cart));

    setMsg("Event service booked successfully 🎉");

    setSelected(null);

    setTimeout(() => {
      setMsg("");
    }, 3000);
  };

  return (
    <div className="event-page">

      {/* <NavBar /> */}

      {/* ================= HERO ================= */}

      <section className="event-hero">

        <video
          className="event-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={MarvVideo2} type="video/mp4" />
        </video>

        <div className="event-hero-overlay">

          <span className="event-tag">
            NISS EVENT & DECORATION SERVICES
          </span>

          <h1>
            Make Your Event
            <span> Memorable & Extraordinary</span>
          </h1>

          <p>
            Tent Decoration • Wedding Events • Birthday Parties •
            Corporate Events • Stage • Lighting • DJ • Complete Event Management
          </p>

          <div className="event-hero-buttons">

            <button
              onClick={() =>
                document
                  .getElementById("event-services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Services
            </button>

            <button
              className="outline-btn"
              onClick={() =>
                document
                  .getElementById("event-services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book Your Event
            </button>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="event-features">

        <div>
          <span>🎪</span>
          <h3>Beautiful Decoration</h3>
          <p>Creative & premium event setups</p>
        </div>

        <div>
          <span>🎉</span>
          <h3>Complete Events</h3>
          <p>From planning to execution</p>
        </div>

        <div>
          <span>💡</span>
          <h3>Lighting & Stage</h3>
          <p>Professional stage & lighting</p>
        </div>

        <div>
          <span>⭐</span>
          <h3>Professional Team</h3>
          <p>Experienced event specialists</p>
        </div>

      </section>

      {/* ================= FILTER ================= */}

      <section className="event-filter">

        <div>
          <h2>Our Event Services</h2>
          <p>
            Choose the perfect service for your special occasion
          </p>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Services</option>
          <option value="Tent & Decoration">
            Tent & Decoration
          </option>
          <option value="Wedding">
            Wedding
          </option>
          <option value="Birthday">
            Birthday
          </option>
          <option value="Stage & Lighting">
            Stage & Lighting
          </option>
          <option value="Corporate">
            Corporate
          </option>
          <option value="Entertainment">
            Entertainment
          </option>
          <option value="Theme Events">
            Theme Events
          </option>
          <option value="Event Management">
            Event Management
          </option>
        </select>

      </section>

      {msg && <div className="event-message">{msg}</div>}

      {/* ================= SERVICES ================= */}

      <section
        className="event-services"
        id="event-services"
      >

        {filteredServices.map((service) => (

          <div
            className="event-card"
            key={service.id}
          >

            <div className="event-image-wrapper">

              <img
                src={service.image}
                alt={service.name}
              />

              <span className="event-category">
                {service.category}
              </span>

            </div>

            <div className="event-card-content">

              <h3>{service.name}</h3>

              <p>
                {service.description}
              </p>

              <div className="event-card-bottom">

                <div>
                  <small>Starting From</small>
                  <strong>
                    ₹{service.price.toLocaleString()}
                  </strong>
                </div>

                <button
                  onClick={() => openBooking(service)}
                >
                  Book Now
                </button>

              </div>

            </div>

          </div>

        ))}

      </section>

      {/* ================= EVENT TYPES ================= */}

      <section className="event-types">

        <div className="event-section-heading">
          <span></span>
          <h2>Perfect For Every Occasion</h2>
          <span></span>
        </div>

        <div className="event-type-grid">

          <div>
            <span>💍</span>
            <h3>Weddings</h3>
            <p>
              Make your wedding beautiful with
              premium decoration and event planning.
            </p>
          </div>

          <div>
            <span>🎂</span>
            <h3>Birthdays</h3>
            <p>
              Creative birthday themes,
              balloon decoration and entertainment.
            </p>
          </div>

          <div>
            <span>🏢</span>
            <h3>Corporate Events</h3>
            <p>
              Professional corporate event
              planning and management.
            </p>
          </div>

          <div>
            <span>🎊</span>
            <h3>Parties & Functions</h3>
            <p>
              Complete decoration and event
              arrangements for every celebration.
            </p>
          </div>

        </div>

      </section>

      {/* ================= WHY CHOOSE ================= */}

      <section className="event-why">

        <h2>
          Why Choose NISS Event Management?
        </h2>

        <div className="event-why-grid">

          <div>
            <span>✓</span>
            <h3>Experienced Team</h3>
            <p>
              Professional event planners and decorators.
            </p>
          </div>

          <div>
            <span>✓</span>
            <h3>Customized Themes</h3>
            <p>
              Events designed according to your requirements.
            </p>
          </div>

          <div>
            <span>✓</span>
            <h3>Complete Management</h3>
            <p>
              We manage your event from start to finish.
            </p>
          </div>

          <div>
            <span>✓</span>
            <h3>Affordable Packages</h3>
            <p>
              Quality services at competitive prices.
            </p>
          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="event-cta">

        <div>

          <h2>
            Let's Make Your Event
            <span> Unforgettable!</span>
          </h2>

          <p>
            Tell us your requirements and our event team
            will help you plan the perfect celebration.
          </p>

          <div className="event-contact-buttons">

            <a href="tel:+919958424916">
              📞 Call Now
            </a>

            <a
              href="https://wa.me/919958424916"
              target="_blank"
              rel="noreferrer"
            >
              💬 WhatsApp
            </a>

          </div>

        </div>

      </section>

      {/* ================= BOOKING MODAL ================= */}

      {selected && (

        <div className="event-modal-overlay">

          <div className="event-modal">

            <button
              className="event-close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <img
              src={selected.image}
              alt={selected.name}
            />

            <h2>{selected.name}</h2>

            <p className="modal-price">
              Starting From ₹
              {selected.price.toLocaleString()}
            </p>

            <label>
              Event Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label>
              Event Location
            </label>

            <input
              type="text"
              placeholder="Enter event location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <label>
              Number of Guests
            </label>

            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />

            <div className="booking-summary">

              <span>Service</span>
              <strong>{selected.name}</strong>

              <span>Starting Price</span>
              <strong>
                ₹{selected.price.toLocaleString()}
              </strong>

            </div>

            <button
              className="confirm-event"
              onClick={confirmBooking}
            >
              Confirm Event Booking
            </button>

          </div>

        </div>

      )}

      <Footer />

    </div>
  );
};

export default EventManagement;