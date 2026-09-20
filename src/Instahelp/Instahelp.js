// import React, { useState } from "react";
// import "./Instahelp.css";
// import NavBar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// // VIDEO (same style as Interior page)
// import MarvVideo2 from '../marvv3.mp4';

// const services = [
//   {
//     id: 1,
//     name: "House Cleaning",
//     category: "Cleaning",
//     pricePerHour: 199,
//     image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
//   },
//   {
//     id: 2,
//     name: "Cooking Maid",
//     category: "Cooking",
//     pricePerHour: 249,
//     image: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
//   },
//   {
//     id: 3,
//     name: "Baby Care",
//     category: "Care",
//     pricePerHour: 299,
//     image: "https://images.unsplash.com/photo-1609220136736-443140cffec6",
//   },
//   {
//     id: 4,
//     name: "Elder Care",
//     category: "Care",
//     pricePerHour: 349,
//     image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
//   },
// ];

// const InstaMaid = () => {
//   const [selectedHours, setSelectedHours] = useState({});
//   const [category, setCategory] = useState("All");

//   const addToCart = (item) => {
//     const hours = selectedHours[item.id] || 1;

//     const cartItem = {
//       id: item.id,
//       name: item.name,
//       image: item.image,
//       pricePerHour: item.pricePerHour,
//       hours: hours,
//       totalPrice: item.pricePerHour * hours,
//       type: "maid",
//     };

//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart.push(cartItem);
//     localStorage.setItem("cart", JSON.stringify(cart));

//     alert("Added to cart!");
//   };

//   const filtered = services.filter((s) =>
//     category === "All" ? true : s.category === category
//   );

//   return (
//     <div className="maid-page">

//       <NavBar />

//       {/* 🔥 HERO VIDEO SECTION */}
//       <section className="maid-hero">

//   <video
//     className="hero-video"
//     autoPlay
//     muted
//     loop
//   >
//     <source
//       src={MarvVideo2}
//       type="video/mp4"
//     />
//   </video>

//   <div className="hero-overlay">

//     <span className="hero-tag">
//       Trusted Home Cleaning & Care Services
//     </span>

//     <h1>
//       Keep Your Home Clean With
//       <span> Professional Maids</span>
//     </h1>

//     <p>
//       Home Cleaning, Cooking Help,
//       Baby Care, Elder Care,
//       Deep Cleaning & Daily Household
//       Services at your doorstep.
//     </p>

//     <div className="hero-buttons">

//       <button>
//         Book Maid
//       </button>

//       <button>
//         Explore Services
//       </button>

//     </div>

//   </div>

// </section>

//       {/* CATEGORY FILTER */}
//       <section className="filter-section">

//         <select onChange={(e) => setCategory(e.target.value)}>
//           <option>All</option>
//           <option>Cleaning</option>
//           <option>Cooking</option>
//           <option>Care</option>
//         </select>

//       </section>

//       {/* SERVICES GRID */}
//       <section className="services-grid">

//         {filtered.map((item) => (
//           <div className="service-card" key={item.id}>

//             <img src={item.image} alt={item.name} />

//             <div className="service-info">

//               <h3>{item.name}</h3>

//               <p>₹{item.pricePerHour}/hour</p>

//               {/* HOURS */}
//               <input
//                 type="number"
//                 min="1"
//                 defaultValue="1"
//                 onChange={(e) =>
//                   setSelectedHours({
//                     ...selectedHours,
//                     [item.id]: Number(e.target.value),
//                   })
//                 }
//               />

//               <button onClick={() => addToCart(item)}>
//                 Add To Cart
//               </button>

//             </div>

//           </div>
//         ))}

//       </section>

//       {/* SERVICES HIGHLIGHT SECTION */}
//       <section className="highlight">

//         <h2>Why Choose Insta Maid?</h2>

//         <div className="highlight-grid">

//           <div>✔ Verified Maids</div>
//           <div>✔ Affordable Pricing</div>
//           <div>✔ Hourly Booking</div>
//           <div>✔ Instant Service</div>

//         </div>

//       </section>

//       <Footer />

//     </div>
//   );
// };

// export default InstaMaid;






import React, { useState, useMemo } from "react";
import "./Instahelp.css";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import MarvVideo2 from "../marvv3.mp4";

const services = [
  {
    id: 1,
    name: "House Cleaning",
    category: "Cleaning",
    pricePerHour: 199,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  },
  {
    id: 2,
    name: "Cooking Maid",
    category: "Cooking",
    pricePerHour: 249,
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
  },
  {
    id: 3,
    name: "Baby Care",
    category: "Care",
    pricePerHour: 299,
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6",
  },
  {
    id: 4,
    name: "Elder Care",
    category: "Care",
    pricePerHour: 349,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
  },
];

const InstaMaid = () => {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [hours, setHours] = useState(1);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [msg, setMsg] = useState("");

  const filtered = useMemo(() => {
    return services.filter((s) =>
      category === "All" ? true : s.category === category
    );
  }, [category]);

  const openBooking = (item) => {
    setSelected(item);
    setHours(1);
    setDate("");
    setLocation("");
  };

  const confirmBooking = () => {
    if (!selected) return;

    if (!date || !location) {
      setMsg("Please fill all details!");
      setTimeout(() => setMsg(""), 2000);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const booking = {
      id: Date.now(),
      serviceId: selected.id,
      name: selected.name,
      image: selected.image,
      pricePerHour: selected.pricePerHour,
      hours,
      date,
      location,
      totalPrice: selected.pricePerHour * hours,
      type: "maid-service",
    };

    cart.push(booking);
    localStorage.setItem("cart", JSON.stringify(cart));

    setMsg("Service booked successfully 🎉");
    setSelected(null);

    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="maid-page">

      <NavBar />

      {/* HERO */}
      <section className="maid-hero">
        <video className="hero-video" autoPlay muted loop>
          <source src={MarvVideo2} type="video/mp4" />
        </video>

        <div className="hero-overlay">
          <h1>
            Professional <span>Home Care Services</span>
          </h1>
          <p>Cleaning • Cooking • Baby Care • Elder Care</p>
        </div>
      </section>

      {/* FILTER */}
      <section className="filter-section">
        <select onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Cleaning</option>
          <option>Cooking</option>
          <option>Care</option>
        </select>
      </section>

      {msg && <div className="msg">{msg}</div>}

      {/* GRID */}
      <section className="services-grid">

        {filtered.map((item) => (
          <div className="service-card" key={item.id}>

            <img src={item.image} alt={item.name} />

            <div className="service-info">

              <h3>{item.name}</h3>
              <p>₹{item.pricePerHour}/hour</p>

              <button onClick={() => openBooking(item)}>
                Book Now
              </button>

            </div>

          </div>
        ))}

      </section>

      {/* MODAL */}
      {selected && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h2>{selected.name}</h2>
            <p>₹{selected.pricePerHour}/hour</p>

            {/* HOURS */}
            <label>Hours</label>
            <div className="quick-hours">
              {[1, 2, 3, 4, 5, 6].map((h) => (
                <button
                  key={h}
                  className={hours === h ? "active-hour" : ""}
                  onClick={() => setHours(h)}
                >
                  {h} hr
                </button>
              ))}
            </div>

            {/* DATE */}
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            {/* LOCATION */}
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter home address..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            {/* TOTAL */}
            <h3>Total: ₹{selected.pricePerHour * hours}</h3>

            {/* BUTTONS */}
            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setSelected(null)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={confirmBooking}
              >
                Confirm Booking
              </button>

            </div>

          </div>
        </div>
      )}

      {/* HIGHLIGHT */}
      <section className="highlight">

        <h2>Why Choose Us?</h2>

        <div className="highlight-grid">
          <div>✔ Verified Staff</div>
          <div>✔ Affordable Pricing</div>
          <div>✔ Hourly Booking</div>
          <div>✔ Instant Service</div>
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default InstaMaid;