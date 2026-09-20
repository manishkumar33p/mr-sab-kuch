


// import React, { useState, useMemo } from "react";
// import "./SecurityAgency.css";
// import NavBar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// import MarvVideo2 from "../marvv3.mp4";
// import guard1 from "../guard1.jfif";
// import guard2 from "../guard2.jfif";
// import guard3 from "../guard3.jfif";
// import guard4 from "../guard4.jfif";

// const securityServices = [
//   { id: 1, name: "Residential Security Guard", category: "Home Security", price: 120, image: guard1 },
//   { id: 2, name: "Event Security Team", category: "Event Security", price: 150, image: guard2 },
//   { id: 3, name: "Corporate Security Guard", category: "Office Security", price: 180, image: guard3 },
//   { id: 4, name: "Armed Security Guard", category: "High Security", price: 250, image: guard4 },
// ];

// const SecurityAgency = () => {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");

//   // booking modal
//   const [selected, setSelected] = useState(null);
//   const [hours, setHours] = useState(1);
//   const [date, setDate] = useState("");
//   const [location, setLocation] = useState("");

//   const [msg, setMsg] = useState("");

//   const categories = useMemo(() => {
//     return ["All", ...new Set(securityServices.map((s) => s.category))];
//   }, []);

//   const filtered = useMemo(() => {
//     return securityServices.filter((item) => {
//       const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
//       const matchCategory = category === "All" || item.category === category;
//       return matchSearch && matchCategory;
//     });
//   }, [search, category]);

//   const openBooking = (item) => {
//     setSelected(item);
//     setHours(1);
//     setDate("");
//     setLocation("");
//   };

//   const confirmBooking = () => {
//     if (!date || !location) {
//       setMsg("Please fill all booking details!");
//       setTimeout(() => setMsg(""), 2000);
//       return;
//     }

//     const cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const booking = {
//       id: Date.now(),
//       serviceId: selected.id,
//       name: selected.name,
//       image: selected.image,
//       category: selected.category,
//       pricePerHour: selected.price,
//       hours,
//       date,
//       location,
//       totalPrice: selected.price * hours,
//       type: "security-booking",
//     };

//     cart.push(booking);
//     localStorage.setItem("cart", JSON.stringify(cart));

//     setMsg("Booking added successfully!");
//     setSelected(null);

//     setTimeout(() => setMsg(""), 2000);
//   };

//   return (
//     <div className="security-page">
//       <NavBar />

//       {/* HERO */}
//       <section className="security-hero">
//         <video className="hero-video" autoPlay muted loop>
//           <source src={MarvVideo2} type="video/mp4" />
//         </video>

//         <div className="hero-overlay">
//           <span className="hero-tag">Professional Security Solutions</span>

//           <h1>
//             Protect Your Space With <span>Trusted Security Guards</span>
//           </h1>

//           <p>Residential • Corporate • Events • 24/7 Protection</p>
//         </div>
//       </section>

//       {/* FILTER */}
//       <section className="filter-section">
//         <input
//           type="text"
//           placeholder="Search Security Services..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           {categories.map((c, i) => (
//             <option key={i}>{c}</option>
//           ))}
//         </select>
//       </section>

//       {msg && <div className="cart-msg">{msg}</div>}

//       {/* SERVICES */}
//       <section className="products-section">
//         <h2>Security Services</h2>

//         <div className="products-grid">
//           {filtered.map((item) => (
//             <div className="product-card" key={item.id}>
//               <img src={item.image} alt={item.name} />

//               <div className="product-info">
//                 <span>{item.category}</span>
//                 <h3>{item.name}</h3>
//                 <h4>₹ {item.price} / hour</h4>

//                 <button onClick={() => openBooking(item)}>
//                   Hire Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//        <section className="services-section">

//          <h2>Why Choose Our Security?</h2>

//          <div className="services-grid">

//            <div className="service-card">✔ Trained Guards</div>
//           <div className="service-card">✔ 24/7 Protection</div>
//            <div className="service-card">✔ Verified Staff</div>
//            <div className="service-card">✔ Instant Deployment</div>

//          </div>

//        </section>
//       {/* BOOKING MODAL */}
//       {selected && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <h2>Book Security Guard</h2>

//             <p><b>{selected.name}</b></p>

//             <label>Hours</label>
//             <input
//               type="number"
//               min="1"
//               value={hours}
//               onChange={(e) => setHours(Number(e.target.value))}
//             />

//             <label>Date</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />

//             <label>Contact</label>
//             <input
//               type="number"
//               placeholder="Enter Contact number..."
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//             />

//             <h3>Total: ₹ {selected.price * hours}</h3>

//             <div className="modal-actions">
//               <button onClick={confirmBooking}>
//                 Confirm Booking
//               </button>

//               <button onClick={() => setSelected(null)}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default SecurityAgency;



import React, { useState } from "react";
import "./SecurityAgency.css";

// import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import MarvVideo2 from "../marvv3.mp4";

const securityServices = [
  {
    id: 1,
    title: "Residential Security",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    points: [
      "Gated Community Security",
      "Apartment Security",
      "24/7 Surveillance",
      "Visitor Management",
    ],
  },
  {
    id: 2,
    title: "Commercial Security",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    points: [
      "Office Building Security",
      "Factory & Warehouse Security",
      "Mall & Retail Security",
      "Bank & ATM Security",
    ],
  },
  {
    id: 3,
    title: "Industrial Security",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492",
    points: [
      "Plant & Site Security",
      "Access Control",
      "Asset Protection",
      "Perimeter Security",
    ],
  },
  {
    id: 4,
    title: "Event Security",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    points: [
      "Wedding Security",
      "Corporate Events",
      "Concerts & Shows",
      "Crowd Management",
    ],
  },
];

const SecurityAgency = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [guards, setGuards] = useState(1);
  const [message, setMessage] = useState("");

  const openBooking = (service) => {
    setSelectedService(service);
    setDate("");
    setLocation("");
    setGuards(1);
  };

  const confirmBooking = () => {
    if (!date || !location) {
      setMessage("Please fill all booking details.");
      setTimeout(() => setMessage(""), 2500);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const booking = {
      id: Date.now(),
      serviceId: selectedService.id,
      name: selectedService.title,
      image: selectedService.image,
      date,
      location,
      guards,
      type: "security-service",
    };

    cart.push(booking);
    localStorage.setItem("cart", JSON.stringify(cart));

    setSelectedService(null);

    setMessage("Security service booked successfully! 🎉");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <div className="security-page">

      {/* <NavBar /> */}

      {/* ================= HERO ================= */}
      <section className="security-hero">

        <video
          className="security-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={MarvVideo2} type="video/mp4" />
        </video>

        <div className="security-video-overlay"></div>

        <div className="security-hero-content">

          <div className="security-hero-left">

            <span className="security-badge">
              NISS SECURITY GUARD SERVICES
            </span>

            <h1>
              TRUSTED SECURITY.
              <br />
              <span>PROFESSIONAL GUARDS.</span>
              <br />
              TOTAL PEACE OF MIND.
            </h1>

            <p>
              NISS Security Guard Services provides highly trained,
              verified and disciplined security personnel for homes,
              offices, businesses, industries and events.
            </p>

            <div className="security-hero-buttons">

              <button
                className="security-primary-btn"
                onClick={() =>
                  document
                    .getElementById("security-services")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                OUR SERVICES
              </button>

              <a
                href="tel:+919958424916"
                className="security-call-btn"
              >
                CALL NOW
              </a>

            </div>

          </div>

          <div className="security-hero-right">

            <div className="security-shield">
              <div className="shield-icon">🔒</div>
              <strong>YOUR SAFETY</strong>
              <span>OUR</span>
              <strong>PRIORITY</strong>
            </div>

            <div className="security-guard-card">
              <div className="guard-circle">
                🛡️
              </div>

              <h3>NISS</h3>
              <p>SECURITY</p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section className="security-features">

        <div className="security-feature">
          <span>🛡️</span>
          <div>
            <strong>TRAINED & VERIFIED</strong>
            <small>GUARDS</small>
          </div>
        </div>

        <div className="security-feature">
          <span>24/7</span>
          <div>
            <strong>24/7</strong>
            <small>PROTECTION</small>
          </div>
        </div>

        <div className="security-feature">
          <span>🏃</span>
          <div>
            <strong>RAPID RESPONSE</strong>
            <small>TEAM</small>
          </div>
        </div>

        <div className="security-feature">
          <span>👍</span>
          <div>
            <strong>CUSTOMER</strong>
            <small>SATISFACTION</small>
          </div>
        </div>

      </section>

      {/* ================= SERVICES ================= */}
      <section
        className="security-services-section"
        id="security-services"
      >

        <div className="security-section-heading">
          <span></span>
          <h2>OUR SERVICES</h2>
          <span></span>
        </div>

        <div className="security-services-grid">

          {securityServices.map((service) => (

            <div
              className="security-service-card"
              key={service.id}
            >

              <div className="security-service-title">
                <div className="service-icon">
                  🛡️
                </div>

                <h3>{service.title}</h3>
              </div>

              <img
                src={service.image}
                alt={service.title}
              />

              <ul>
                {service.points.map((point, index) => (
                  <li key={index}>
                    {point}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openBooking(service)}
              >
                BOOK SECURITY
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="why-security">

        <div className="security-section-heading">
          <span></span>
          <h2>WHY CHOOSE NISS SECURITY GUARD SERVICES?</h2>
          <span></span>
        </div>

        <div className="why-security-grid">

          <div className="why-security-card">
            <div>👤</div>
            <h3>Experienced</h3>
            <p>Professionals</p>
          </div>

          <div className="why-security-card">
            <div>🏅</div>
            <h3>Well</h3>
            <p>Trained Guards</p>
          </div>

          <div className="why-security-card">
            <div>🛡️</div>
            <h3>Verified &</h3>
            <p>Reliable</p>
          </div>

          <div className="why-security-card">
            <div>24/7</div>
            <h3>24/7 Support</h3>
            <p>& Monitoring</p>
          </div>

          <div className="why-security-card">
            <div>₹</div>
            <h3>Affordable</h3>
            <p>Pricing</p>
          </div>

        </div>

      </section>

      {/* ================= HELPLINE ================= */}
      <section className="security-helpline">

        <div className="helpline-phone">
          📞
        </div>

        <div>
          <h2>+91 99584 24916</h2>
          <p>24/7 HELPLINE | QUICK RESPONSE</p>
        </div>

        <a href="tel:+919958424916">
          CALL NOW
        </a>

      </section>

      {/* ================= MESSAGE ================= */}
      {message && (
        <div className="security-message">
          {message}
        </div>
      )}

      {/* ================= BOOKING MODAL ================= */}
      {selectedService && (

        <div className="security-modal-overlay">

          <div className="security-modal">

            <button
              className="security-close"
              onClick={() => setSelectedService(null)}
            >
              ×
            </button>

            <h2>{selectedService.title}</h2>

            <p>
              Book professional security guards
              for your requirement.
            </p>

            <label>Number of Guards</label>

            <div className="guard-selector">

              {[1, 2, 3, 4, 5, 10].map((number) => (

                <button
                  key={number}
                  className={
                    guards === number
                      ? "guard-active"
                      : ""
                  }
                  onClick={() => setGuards(number)}
                >
                  {number}
                </button>

              ))}

            </div>

            <label>Service Date</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label>Location / Address</label>

            <textarea
              placeholder="Enter your complete address..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <div className="security-modal-actions">

              <button
                className="modal-cancel"
                onClick={() => setSelectedService(null)}
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

      )}

      <Footer />

    </div>
  );
};

export default SecurityAgency;