




// import React, { useState, useMemo } from "react";
// import "./Carpenter.css";
// import NavBar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// import MarvVideo2 from "../marvv3.mp4";

// const services = [
//   {
//     id: 1,
//     name: "Furniture Repair",
//     category: "Repair",
//     pricePerHour: 249,
//     image: "https://images.unsplash.com/photo-1582582494700-9a1d2a0f4f06",
//   },
//   {
//     id: 2,
//     name: "Wooden Wardrobe Design",
//     category: "Furniture",
//     pricePerHour: 399,
//     image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
//   },
//   {
//     id: 3,
//     name: "Door Installation",
//     category: "Installation",
//     pricePerHour: 299,
//     image: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
//   },
//   {
//     id: 4,
//     name: "Kitchen Cabinets",
//     category: "Kitchen",
//     pricePerHour: 449,
//     image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
//   },
// ];

// const Carpenter = () => {
//   const [category, setCategory] = useState("All");

//   const [selected, setSelected] = useState(null);
//   const [hours, setHours] = useState(1);
//   const [date, setDate] = useState("");
//   const [location, setLocation] = useState("");

//   const [msg, setMsg] = useState("");

//   const filtered = useMemo(() => {
//     return services.filter((s) =>
//       category === "All" ? true : s.category === category
//     );
//   }, [category]);

//   const openBooking = (item) => {
//     setSelected(item);
//     setHours(1);
//     setDate("");
//     setLocation("");
//   };

//   const confirmBooking = () => {
//     if (!selected) return;

//     if (!date || !location) {
//       setMsg("Please fill all details!");
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
//       pricePerHour: selected.pricePerHour,
//       hours,
//       date,
//       location,
//       totalPrice: selected.pricePerHour * hours,
//       type: "carpenter-service",
//     };

//     cart.push(booking);
//     localStorage.setItem("cart", JSON.stringify(cart));

//     setMsg("Carpenter service booked 🎉");
//     setSelected(null);

//     setTimeout(() => setMsg(""), 2000);
//   };

//   return (
//     <div className="carpenter-page">

//       <NavBar />

//       {/* HERO */}
//       <section className="carpenter-hero">
//         <video className="hero-video" autoPlay muted loop>
//           <source src={MarvVideo2} type="video/mp4" />
//         </video>

//         <div className="hero-overlay">
//           <h1>
//             Expert <span>Carpentry & Woodwork Services</span>
//           </h1>
//           <p>Furniture Repair • Custom Design • Installation • Modular Work</p>
//         </div>
//       </section>

//       {/* FILTER */}
//       <section className="filter-section">
//         <select onChange={(e) => setCategory(e.target.value)}>
//           <option>All</option>
//           <option>Repair</option>
//           <option>Furniture</option>
//           <option>Installation</option>
//           <option>Kitchen</option>
//         </select>
//       </section>

//       {msg && <div className="msg">{msg}</div>}

//       {/* SERVICES */}
//       <section className="services-grid">

//         {filtered.map((item) => (
//           <div className="service-card" key={item.id}>

//             <img src={item.image} alt={item.name} />

//             <div className="service-info">

//               <h3>{item.name}</h3>
//               <p>₹{item.pricePerHour}/hour</p>

//               <button onClick={() => openBooking(item)}>
//                 Book Now
//               </button>

//             </div>

//           </div>
//         ))}

//       </section>

//       {/* MODAL */}
//       {selected && (
//         <div className="modal-overlay">
//           <div className="modal-box">

//             <h2>{selected.name}</h2>
//             <p>₹{selected.pricePerHour}/hour</p>

//             {/* HOURS */}
//             <label>Hours</label>
//             <div className="quick-hours">
//               {[1, 2, 3, 4, 5].map((h) => (
//                 <button
//                   key={h}
//                   className={hours === h ? "active-hour" : ""}
//                   onClick={() => setHours(h)}
//                 >
//                   {h} hr
//                 </button>
//               ))}
//             </div>

//             {/* DATE */}
//             <label>Date</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />

//             {/* LOCATION */}
//             <label>Address</label>
//             <input
//               type="text"
//               placeholder="Enter location..."
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//             />

//             {/* TOTAL */}
//             <h3>Total: ₹{selected.pricePerHour * hours}</h3>

//             {/* ACTIONS */}
//             <div className="modal-actions">

//               <button
//                 className="cancel-btn"
//                 onClick={() => setSelected(null)}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="confirm-btn"
//                 onClick={confirmBooking}
//               >
//                 Confirm Booking
//               </button>

//             </div>

//           </div>
//         </div>
//       )}

//       {/* HIGHLIGHT */}
//       <section className="highlight">

//         <h2>Why Choose Our Carpenters?</h2>

//         <div className="highlight-grid">
//           <div>✔ Skilled Professionals</div>
//           <div>✔ Affordable Pricing</div>
//           <div>✔ Doorstep Service</div>
//           <div>✔ Quality Work</div>
//         </div>

//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Carpenter;

