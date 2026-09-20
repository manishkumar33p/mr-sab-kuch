

// import React, { useState, useEffect } from "react";
// import "./Plumbing.css";

// // import NavBar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// import MarvVideo2 from "../marvv3.mp4";
// import Plumber2 from "../Plumber2.avif";

// import marv13 from "../marv13.jpg";
// import marv14 from "../marv14.jpg";
// import marv16 from "../marv16.jpg";
// import marv17 from "../marv17.jpg";
// import marv18 from "../marv18.jpg";
// import marv19 from "../marv19.jpg";
// import marv20 from "../marv20.jpg";
// import marv21 from "../marv21.jpg";
// import marv22 from "../marv22.jpg";

// /* =========================================================
//    PLUMBING SERVICES
// ========================================================= */

// const plumbingServices = [
//   {
//     id: 1,
//     name: "Tap Leakage Repair",
//     price: 199,
//     image: marv13,
//   },
//   {
//     id: 2,
//     name: "Pipe Leakage Fixing",
//     price: 499,
//     image: marv14,
//   },
//   {
//     id: 3,
//     name: "Bathroom Fitting Installation",
//     price: 999,
//     image: marv16,
//   },
//   {
//     id: 4,
//     name: "Kitchen Sink Installation",
//     price: 799,
//     image: marv17,
//   },
//   {
//     id: 5,
//     name: "Wash Basin Installation",
//     price: 699,
//     image: marv18,
//   },
//   {
//     id: 6,
//     name: "Water Tank Cleaning",
//     price: 899,
//     image: marv19,
//   },
//   {
//     id: 7,
//     name: "Drain Blockage Removal",
//     price: 499,
//     image: marv20,
//   },
//   {
//     id: 8,
//     name: "Geyser Installation",
//     price: 1299,
//     image: marv21,
//   },
//   {
//     id: 9,
//     name: "Geyser Repair",
//     price: 599,
//     image: marv22,
//   },
//   {
//     id: 10,
//     name: "Toilet Seat Installation",
//     price: 799,
//     image: marv13,
//   },
//   {
//     id: 11,
//     name: "Toilet Blockage Cleaning",
//     price: 399,
//     image: marv14,
//   },
//   {
//     id: 12,
//     name: "Shower Installation",
//     price: 499,
//     image: marv16,
//   },
//   {
//     id: 13,
//     name: "Water Motor Repair",
//     price: 999,
//     image: marv17,
//   },
//   {
//     id: 14,
//     name: "Water Pipeline Installation",
//     price: 1999,
//     image: marv18,
//   },
//   {
//     id: 15,
//     name: "Bathroom Complete Setup",
//     price: 4999,
//     image: marv19,
//   },
//   {
//     id: 16,
//     name: "Kitchen Plumbing Setup",
//     price: 2999,
//     image: marv20,
//   },
//   {
//     id: 17,
//     name: "Flush Tank Repair",
//     price: 299,
//     image: marv21,
//   },
//   {
//     id: 18,
//     name: "Flush Tank Installation",
//     price: 699,
//     image: marv22,
//   },
//   {
//     id: 19,
//     name: "Overhead Tank Installation",
//     price: 3999,
//     image: marv13,
//   },
//   {
//     id: 20,
//     name: "Underground Pipe Work",
//     price: 5999,
//     image: marv14,
//   },
//   {
//     id: 21,
//     name: "Water Pressure Fixing",
//     price: 499,
//     image: marv16,
//   },
//   {
//     id: 22,
//     name: "Leak Detection Service",
//     price: 799,
//     image: marv17,
//   },
//   {
//     id: 23,
//     name: "Commercial Plumbing Setup",
//     price: 9999,
//     image: marv18,
//   },
//   {
//     id: 24,
//     name: "Bathroom Fitting Replacement",
//     price: 1499,
//     image: marv19,
//   },
//   {
//     id: 25,
//     name: "Home Plumbing Checkup",
//     price: 1299,
//     image: marv20,
//   },
//   {
//     id: 26,
//     name: "Pipe Replacement Service",
//     price: 2499,
//     image: marv21,
//   },
//   {
//     id: 27,
//     name: "Water Line Installation",
//     price: 3499,
//     image: marv22,
//   },
//   {
//     id: 28,
//     name: "Emergency Plumbing Service",
//     price: 999,
//     image: marv13,
//   },
//   {
//     id: 29,
//     name: "Bathroom Renovation Plumbing",
//     price: 7999,
//     image: marv14,
//   },
//   {
//     id: 30,
//     name: "Luxury Bathroom Setup",
//     price: 14999,
//     image: marv16,
//   },
// ];

// /* =========================================================
//    CARPENTER SERVICES
// ========================================================= */

// const carpenterServices = [
//   {
//     id: 101,
//     name: "Furniture Repair",
//     category: "Repair",
//     pricePerHour: 249,
//     image: marv13,
//   },
//   {
//     id: 102,
//     name: "Wooden Wardrobe Design",
//     category: "Furniture",
//     pricePerHour: 399,
//     image: marv14,
//   },
//   {
//     id: 103,
//     name: "Door Installation",
//     category: "Installation",
//     pricePerHour: 299,
//     image: marv16,
//   },
//   {
//     id: 104,
//     name: "Kitchen Cabinets",
//     category: "Kitchen",
//     pricePerHour: 449,
//     image: marv17,
//   },
// ];

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// const Plumbing = () => {
//   /* ================= PLUMBING STATES ================= */

//   const [search, setSearch] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   const [cart, setCart] = useState([]);

//   /* ================= CARPENTER STATES ================= */

//   const [carpenterCategory, setCarpenterCategory] = useState("All");

//   /* ================= PLUMBING MODAL ================= */

//   const [selectedPlumbing, setSelectedPlumbing] = useState(null);

//   const [plumbingDate, setPlumbingDate] = useState("");
//   const [plumbingLocation, setPlumbingLocation] = useState("");

//   /* ================= CARPENTER MODAL ================= */

//   const [selectedCarpenter, setSelectedCarpenter] = useState(null);

//   const [hours, setHours] = useState(1);
//   const [carpenterDate, setCarpenterDate] = useState("");
//   const [carpenterLocation, setCarpenterLocation] = useState("");

//   /* ================= MESSAGE ================= */

//   const [msg, setMsg] = useState("");

//   /* =========================================================
//      LOAD CART
//   ========================================================= */

//   useEffect(() => {
//     const savedCart =
//       JSON.parse(localStorage.getItem("cart")) || [];

//     setCart(savedCart);
//   }, []);

//   /* =========================================================
//      PLUMBING FILTER
//   ========================================================= */

//   const filteredPlumbing = plumbingServices.filter((item) => {
//     const matchName = item.name
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchPrice =
//       maxPrice === ""
//         ? true
//         : item.price <= Number(maxPrice);

//     return matchName && matchPrice;
//   });

//   /* =========================================================
//      CARPENTER FILTER
//   ========================================================= */

//   const filteredCarpenter = carpenterServices.filter((item) => {
//     return carpenterCategory === "All"
//       ? true
//       : item.category === carpenterCategory;
//   });

//   /* =========================================================
//      MESSAGE
//   ========================================================= */

//   const showMessage = (message) => {
//     setMsg(message);

//     setTimeout(() => {
//       setMsg("");
//     }, 2500);
//   };

//   /* =========================================================
//      ADD PLUMBING TO CART
//   ========================================================= */

//   const addPlumbingToCart = (item) => {
//     const savedCart =
//       JSON.parse(localStorage.getItem("cart")) || [];

//     const cartItem = {
//       id: Date.now(),
//       serviceId: item.id,
//       name: item.name,
//       price: item.price,
//       image: item.image,
//       type: "plumbing-service",
//     };

//     const updatedCart = [...savedCart, cartItem];

//     localStorage.setItem(
//       "cart",
//       JSON.stringify(updatedCart)
//     );

//     setCart(updatedCart);

//     showMessage(`${item.name} added to cart`);
//   };

//   /* =========================================================
//      OPEN PLUMBING BOOKING
//   ========================================================= */

//   const openPlumbingBooking = (item) => {
//     setSelectedPlumbing(item);
//     setPlumbingDate("");
//     setPlumbingLocation("");
//   };

//   /* =========================================================
//      CONFIRM PLUMBING BOOKING
//   ========================================================= */

//   const confirmPlumbingBooking = () => {
//     if (!selectedPlumbing) return;

//     if (!plumbingDate || !plumbingLocation) {
//       showMessage("Please fill all details!");
//       return;
//     }

//     const savedCart =
//       JSON.parse(localStorage.getItem("cart")) || [];

//     const booking = {
//       id: Date.now(),
//       serviceId: selectedPlumbing.id,
//       name: selectedPlumbing.name,
//       price: selectedPlumbing.price,
//       image: selectedPlumbing.image,
//       date: plumbingDate,
//       location: plumbingLocation,
//       totalPrice: selectedPlumbing.price,
//       type: "plumbing-service",
//     };

//     const updatedCart = [
//       ...savedCart,
//       booking,
//     ];

//     localStorage.setItem(
//       "cart",
//       JSON.stringify(updatedCart)
//     );

//     setCart(updatedCart);

//     setSelectedPlumbing(null);

//     showMessage("Plumbing service booked 🎉");
//   };

//   /* =========================================================
//      OPEN CARPENTER BOOKING
//   ========================================================= */

//   const openCarpenterBooking = (item) => {
//     setSelectedCarpenter(item);
//     setHours(1);
//     setCarpenterDate("");
//     setCarpenterLocation("");
//   };

//   /* =========================================================
//      CONFIRM CARPENTER BOOKING
//   ========================================================= */

//   const confirmCarpenterBooking = () => {
//     if (!selectedCarpenter) return;

//     if (!carpenterDate || !carpenterLocation) {
//       showMessage("Please fill all details!");
//       return;
//     }

//     const savedCart =
//       JSON.parse(localStorage.getItem("cart")) || [];

//     const total =
//       selectedCarpenter.pricePerHour * hours;

//     const booking = {
//       id: Date.now(),
//       serviceId: selectedCarpenter.id,
//       name: selectedCarpenter.name,
//       image: selectedCarpenter.image,
//       category: selectedCarpenter.category,
//       pricePerHour:
//         selectedCarpenter.pricePerHour,
//       hours: hours,
//       date: carpenterDate,
//       location: carpenterLocation,
//       totalPrice: total,
//       type: "carpenter-service",
//     };

//     const updatedCart = [
//       ...savedCart,
//       booking,
//     ];

//     localStorage.setItem(
//       "cart",
//       JSON.stringify(updatedCart)
//     );

//     setCart(updatedCart);

//     setSelectedCarpenter(null);

//     showMessage("Carpenter service booked 🎉");
//   };

//   /* =========================================================
//      TODAY DATE
//   ========================================================= */

//   const today = new Date()
//     .toISOString()
//     .split("T")[0];

//   return (
//     <div className="plumbing-page">

//       {/* <NavBar /> */}

//       {/* =====================================================
//           PLUMBING SECTION
//       ===================================================== */}

//       <section className="plumbing-section">

//         {/* HERO */}

//         <section className="plumbing-hero">

//           <video
//             className="fullscreen-video"
//             autoPlay
//             loop
//             muted
//             playsInline
//           >
//             <source
//               src={MarvVideo2}
//               type="video/mp4"
//             />
//           </video>

//           <div className="plumbing-overlay-bg"></div>

//           <div className="plumbing-overlay">

//             <div className="plumbing-left">

//               <span className="plumbing-tag">
//                 NISS Plumbing Services
//               </span>

//               <h1>
//                 Fast & Reliable
//                 <span>
//                   Plumbing Solutions
//                 </span>
//               </h1>

//               <p>
//                 NISS provides expert plumbing services
//                 including pipe fitting, bathroom
//                 installation, leakage repair, tap fitting,
//                 water tank cleaning, drain repair,
//                 geyser installation and complete home
//                 plumbing solutions.
//               </p>

//               <div className="plumbing-search-box">

//                 <select>
//                   <option>
//                     Pipe Leakage Repair
//                   </option>

//                   <option>
//                     Bathroom Fitting
//                   </option>

//                   <option>
//                     Wash Basin Installation
//                   </option>

//                   <option>
//                     Kitchen Plumbing
//                   </option>

//                   <option>
//                     Drain Cleaning
//                   </option>

//                   <option>
//                     Water Tank Cleaning
//                   </option>

//                   <option>
//                     Geyser Installation
//                   </option>

//                   <option>
//                     Water Motor Repair
//                   </option>
//                 </select>

//                 <input
//                   type="text"
//                   placeholder="Search Plumbing Services..."
//                   value={search}
//                   onChange={(e) =>
//                     setSearch(e.target.value)
//                   }
//                 />

//                 <button
//                   onClick={() =>
//                     document
//                       .getElementById(
//                         "plumbing-services"
//                       )
//                       ?.scrollIntoView({
//                         behavior: "smooth",
//                       })
//                   }
//                 >
//                   Search
//                 </button>

//               </div>

//               <div className="plumbing-buttons">

//                 <button
//                   className="plumbing-btn-primary"
//                   onClick={() =>
//                     document
//                       .getElementById(
//                         "plumbing-services"
//                       )
//                       ?.scrollIntoView({
//                         behavior: "smooth",
//                       })
//                   }
//                 >
//                   Book Plumber
//                 </button>

//                 <button
//                   className="plumbing-btn-secondary"
//                   onClick={() =>
//                     document
//                       .getElementById(
//                         "plumbing-services"
//                       )
//                       ?.scrollIntoView({
//                         behavior: "smooth",
//                       })
//                   }
//                 >
//                   Emergency Service
//                 </button>

//               </div>

//             </div>

//             <div className="plumbing-right">

//               <div className="plumbing-hero-card">

//                 <img
//                   src={Plumber2}
//                   alt="Plumbing Service"
//                 />

//               </div>

//               <div className="plumbing-small-cards">

//                 <div className="plumbing-small-card">

//                   <h3>24/7</h3>

//                   <p>
//                     Emergency Support
//                   </p>

//                 </div>

//                 <div className="plumbing-small-card">

//                   <h3>500+</h3>

//                   <p>
//                     Services Completed
//                   </p>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </section>

//         {/* PLUMBING TITLE */}

//         <section
//           className="section-heading"
//           id="plumbing-services"
//         >

//           <span>
//             OUR SERVICES
//           </span>

//           <h2>
//             Plumbing Services
//           </h2>

//           <p>
//             Professional plumbing services at your
//             doorstep
//           </p>

//         </section>

//         {/* PLUMBING FILTER */}

//         <div className="plumbing-filters">

//           <input
//             type="text"
//             placeholder="Search service..."
//             value={search}
//             onChange={(e) =>
//               setSearch(e.target.value)
//             }
//           />

//           <input
//             type="number"
//             placeholder="Max Price (₹)"
//             value={maxPrice}
//             onChange={(e) =>
//               setMaxPrice(e.target.value)
//             }
//           />

//         </div>

//         {/* PLUMBING GRID */}

//         <div className="plumbing-grid">

//           {filteredPlumbing.length > 0 ? (

//             filteredPlumbing.map((item) => (

//               <div
//                 className="service-card"
//                 key={item.id}
//               >

//                 <div className="service-image">

//                   <img
//                     src={item.image}
//                     alt={item.name}
//                   />

//                 </div>

//                 <div className="service-content">

//                   <span className="service-label">
//                     Plumbing
//                   </span>

//                   <h3>
//                     {item.name}
//                   </h3>

//                   <p className="service-price">
//                     ₹{item.price}
//                   </p>

//                   <div className="service-actions">

//                     <button
//                       onClick={() =>
//                         openPlumbingBooking(item)
//                       }
//                     >
//                       Book Now
//                     </button>

//                     <button
//                       className="cart-button"
//                       onClick={() =>
//                         addPlumbingToCart(item)
//                       }
//                     >
//                       Add to Cart
//                     </button>

//                   </div>

//                 </div>

//               </div>

//             ))

//           ) : (

//             <div className="no-service">
//               <h2>
//                 No Plumbing Service Found
//               </h2>
//             </div>

//           )}

//         </div>

//       </section>


//       {/* =====================================================
//           DIVIDER
//       ===================================================== */}

//       <div className="service-divider">
//         <span></span>
//         <h2>MORE HOME SERVICES</h2>
//         <span></span>
//       </div>


//       {/* =====================================================
//           CARPENTER SECTION
//       ===================================================== */}

//       <section className="carpenter-section">

//         {/* CARPENTER HERO */}

//         <div className="carpenter-heading">

//           <span className="carpenter-tag">
//             NISS CARPENTRY SERVICES
//           </span>

//           <h2>
//             Expert
//             <span>
//               Carpentry & Woodwork Services
//             </span>
//           </h2>

//           <p>
//             Furniture Repair • Custom Design •
//             Installation • Modular Work
//           </p>

//         </div>


//         {/* CARPENTER FILTER */}

//         <div className="carpenter-filter">

//           <button
//             className={
//               carpenterCategory === "All"
//                 ? "active-category"
//                 : ""
//             }
//             onClick={() =>
//               setCarpenterCategory("All")
//             }
//           >
//             All
//           </button>

//           <button
//             className={
//               carpenterCategory === "Repair"
//                 ? "active-category"
//                 : ""
//             }
//             onClick={() =>
//               setCarpenterCategory("Repair")
//             }
//           >
//             Repair
//           </button>

//           <button
//             className={
//               carpenterCategory === "Furniture"
//                 ? "active-category"
//                 : ""
//             }
//             onClick={() =>
//               setCarpenterCategory("Furniture")
//             }
//           >
//             Furniture
//           </button>

//           <button
//             className={
//               carpenterCategory === "Installation"
//                 ? "active-category"
//                 : ""
//             }
//             onClick={() =>
//               setCarpenterCategory("Installation")
//             }
//           >
//             Installation
//           </button>

//           <button
//             className={
//               carpenterCategory === "Kitchen"
//                 ? "active-category"
//                 : ""
//             }
//             onClick={() =>
//               setCarpenterCategory("Kitchen")
//             }
//           >
//             Kitchen
//           </button>

//         </div>


//         {/* CARPENTER GRID */}

//         <div className="carpenter-grid">

//           {filteredCarpenter.map((item) => (

//             <div
//               className="carpenter-card"
//               key={item.id}
//             >

//               <div className="carpenter-image">

//                 <img
//                   src={item.image}
//                   alt={item.name}
//                 />

//               </div>

//               <div className="carpenter-info">

//                 <span>
//                   {item.category}
//                 </span>

//                 <h3>
//                   {item.name}
//                 </h3>

//                 <p>
//                   ₹{item.pricePerHour}/hour
//                 </p>

//                 <button
//                   onClick={() =>
//                     openCarpenterBooking(item)
//                   }
//                 >
//                   Book Now
//                 </button>

//               </div>

//             </div>

//           ))}

//         </div>


//         {/* WHY CARPENTER */}

//         <div className="carpenter-highlight">

//           <h2>
//             Why Choose Our Carpenters?
//           </h2>

//           <div className="carpenter-highlight-grid">

//             <div>
//               ✔ Skilled Professionals
//             </div>

//             <div>
//               ✔ Affordable Pricing
//             </div>

//             <div>
//               ✔ Doorstep Service
//             </div>

//             <div>
//               ✔ Quality Work
//             </div>

//           </div>

//         </div>

//       </section>


//       {/* =====================================================
//           PLUMBING BOOKING MODAL
//       ===================================================== */}

//       {selectedPlumbing && (

//         <div className="modal-overlay">

//           <div className="modal-box">

//             <button
//               className="modal-close"
//               onClick={() =>
//                 setSelectedPlumbing(null)
//               }
//             >
//               ×
//             </button>

//             <h2>
//               {selectedPlumbing.name}
//             </h2>

//             <p>
//               ₹{selectedPlumbing.price}
//             </p>

//             <label>
//               Date
//             </label>

//             <input
//               type="date"
//               min={today}
//               value={plumbingDate}
//               onChange={(e) =>
//                 setPlumbingDate(e.target.value)
//               }
//             />

//             <label>
//               Address
//             </label>

//             <input
//               type="text"
//               placeholder="Enter your complete address..."
//               value={plumbingLocation}
//               onChange={(e) =>
//                 setPlumbingLocation(e.target.value)
//               }
//             />

//             <h3 className="modal-total">
//               Total: ₹{selectedPlumbing.price}
//             </h3>

//             <div className="modal-actions">

//               <button
//                 className="cancel-btn"
//                 onClick={() =>
//                   setSelectedPlumbing(null)
//                 }
//               >
//                 Cancel
//               </button>

//               <button
//                 className="confirm-btn"
//                 onClick={confirmPlumbingBooking}
//               >
//                 Confirm Booking
//               </button>

//             </div>

//           </div>

//         </div>

//       )}


//       {/* =====================================================
//           CARPENTER BOOKING MODAL
//       ===================================================== */}

//       {selectedCarpenter && (

//         <div className="modal-overlay">

//           <div className="modal-box">

//             <button
//               className="modal-close"
//               onClick={() =>
//                 setSelectedCarpenter(null)
//               }
//             >
//               ×
//             </button>

//             <h2>
//               {selectedCarpenter.name}
//             </h2>

//             <p>
//               ₹{selectedCarpenter.pricePerHour}/hour
//             </p>

//             <label>
//               Select Hours
//             </label>

//             <div className="quick-hours">

//               {[1, 2, 3, 4, 5].map((h) => (

//                 <button
//                   key={h}
//                   className={
//                     hours === h
//                       ? "active-hour"
//                       : ""
//                   }
//                   onClick={() =>
//                     setHours(h)
//                   }
//                 >
//                   {h} hr
//                 </button>

//               ))}

//             </div>

//             <label>
//               Date
//             </label>

//             <input
//               type="date"
//               min={today}
//               value={carpenterDate}
//               onChange={(e) =>
//                 setCarpenterDate(e.target.value)
//               }
//             />

//             <label>
//               Address
//             </label>

//             <input
//               type="text"
//               placeholder="Enter your complete address..."
//               value={carpenterLocation}
//               onChange={(e) =>
//                 setCarpenterLocation(e.target.value)
//               }
//             />

//             <h3 className="modal-total">
//               Total: ₹
//               {selectedCarpenter.pricePerHour *
//                 hours}
//             </h3>

//             <div className="modal-actions">

//               <button
//                 className="cancel-btn"
//                 onClick={() =>
//                   setSelectedCarpenter(null)
//                 }
//               >
//                 Cancel
//               </button>

//               <button
//                 className="confirm-btn"
//                 onClick={confirmCarpenterBooking}
//               >
//                 Confirm Booking
//               </button>

//             </div>

//           </div>

//         </div>

//       )}


//       {/* MESSAGE */}

//       {msg && (
//         <div className="service-message">
//           {msg}
//         </div>
//       )}


//       <Footer />

//     </div>
//   );
// };

// export default Plumbing;

import React, { useEffect, useState } from "react";
import "./Plumbing.css";
import Footer from "../Footer/Footer";

/*
  NISS QUICKFIX - ALL HOME SERVICES
  Categories:
  1. Plumbing
  2. Electrical
  3. AC Repair & Service
  4. Carpentry & Painting
  5. Cleaning Services

  Images are loaded automatically from remote image URLs,
  so no manual image files/imports are required.
*/

const serviceCategories = [
  {
    id: "plumbing",
    title: "Plumbing Services",
    label: "PLUMBING",
    icon: "🔧",
    colorClass: "navy",
    description: "Professional plumbing services at your doorstep.",
    services: [
      { id: 1, name: "Tap Leakage Repair", price: 199, image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=85" },
      { id: 2, name: "Pipe Leakage Fixing", price: 499, image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=85" },
      { id: 3, name: "Bathroom Fitting Installation", price: 999, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=85" },
      { id: 4, name: "Kitchen Sink Installation", price: 799, image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85" },
      { id: 5, name: "Wash Basin Installation", price: 699, image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=85" },
      { id: 6, name: "Water Tank Cleaning", price: 899, image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85" },
      { id: 7, name: "Drain Blockage Removal", price: 499, image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85" },
      { id: 8, name: "Geyser Installation", price: 1299, image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85" },
      { id: 9, name: "Geyser Repair", price: 599, image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=85" },
      { id: 10, name: "Toilet Seat Installation", price: 799, image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=900&q=85" },
      { id: 11, name: "Toilet Blockage Cleaning", price: 399, image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=85" },
      { id: 12, name: "Shower Installation", price: 499, image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=85" },
      { id: 13, name: "Water Motor Repair", price: 999, image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=85" },
      { id: 14, name: "Water Pipeline Installation", price: 1999, image: "https://images.unsplash.com/photo-1581579186983-8d5f5f3f1d5f?auto=format&fit=crop&w=900&q=85" },
      { id: 15, name: "Bathroom Complete Setup", price: 4999, image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85" },
      { id: 16, name: "Kitchen Plumbing Setup", price: 2999, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85" },
      { id: 17, name: "Flush Tank Repair", price: 299, image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=900&q=85" },
      { id: 18, name: "Flush Tank Installation", price: 699, image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=85" },
      { id: 19, name: "Overhead Tank Installation", price: 3999, image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85" },
      { id: 20, name: "Underground Pipe Work", price: 5999, image: "https://images.unsplash.com/photo-1600566753051-6f2f0b3e6d88?auto=format&fit=crop&w=900&q=85" },
      { id: 21, name: "Water Pressure Fixing", price: 499, image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=85" },
      { id: 22, name: "Leak Detection Service", price: 799, image: "https://images.unsplash.com/photo-1581579186983-8d5f5f3f1d5f?auto=format&fit=crop&w=900&q=85" },
      { id: 23, name: "Commercial Plumbing Setup", price: 9999, image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85" },
      { id: 24, name: "Bathroom Fitting Replacement", price: 1499, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=85" },
      { id: 25, name: "Home Plumbing Checkup", price: 1299, image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=85" },
      { id: 26, name: "Pipe Replacement Service", price: 2499, image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=85" },
      { id: 27, name: "Water Line Installation", price: 3499, image: "https://images.unsplash.com/photo-1581579186983-8d5f5f3f1d5f?auto=format&fit=crop&w=900&q=85" },
      { id: 28, name: "Emergency Plumbing Service", price: 999, image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=85" },
      { id: 29, name: "Bathroom Renovation Plumbing", price: 7999, image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85" },
      { id: 30, name: "Luxury Bathroom Setup", price: 14999, image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85" },
    ],
  },

  {
    id: "electrical",
    title: "Electrical Services",
    label: "ELECTRICAL",
    icon: "⚡",
    colorClass: "orange",
    description: "Safe and reliable electrical work for home and business.",
    services: [
      { id: 101, name: "Wiring & Rewiring", price: 499, image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=85" },
      { id: 102, name: "Light & Fan Installation", price: 299, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85" },
      { id: 103, name: "Switch & Socket Repair", price: 199, image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=900&q=85" },
      { id: 104, name: "MCB & Distribution Box", price: 599, image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=85" },
      { id: 105, name: "Inverter Installation", price: 499, image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85" },
      { id: 106, name: "Inverter & Battery Repair", price: 399, image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=85" },
      { id: 107, name: "Generator Setup", price: 999, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85" },
      { id: 108, name: "Geyser Electrical Repair", price: 499, image: "https://images.unsplash.com/photo-1581579186983-8d5f5f3f1d5f?auto=format&fit=crop&w=900&q=85" },
      { id: 109, name: "Ceiling Fan Repair", price: 299, image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=900&q=85" },
      { id: 110, name: "Short Circuit Repair", price: 399, image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=85" },
      { id: 111, name: "Doorbell Installation", price: 249, image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85" },
      { id: 112, name: "Commercial Electrical Work", price: 1499, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85" },
    ],
  },

  {
    id: "ac",
    title: "AC Repair & Service",
    label: "AC REPAIR & SERVICE",
    icon: "❄️",
    colorClass: "navy",
    description: "Complete AC installation, servicing and repair solutions.",
    services: [
      { id: 201, name: "AC Installation", price: 999, image: "https://images.unsplash.com/photo-1631545806609-0e9b4b4a6f2e?auto=format&fit=crop&w=900&q=85" },
      { id: 202, name: "AC Uninstallation", price: 699, image: "https://images.unsplash.com/photo-1581092919535-7146ff6a8f77?auto=format&fit=crop&w=900&q=85" },
      { id: 203, name: "AC General Service", price: 499, image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=85" },
      { id: 204, name: "AC Deep Cleaning", price: 799, image: "https://images.unsplash.com/photo-1631545806609-0e9b4b4a6f2e?auto=format&fit=crop&w=900&q=85" },
      { id: 205, name: "AC Gas Refilling", price: 1499, image: "https://images.unsplash.com/photo-1581092919535-7146ff6a8f77?auto=format&fit=crop&w=900&q=85" },
      { id: 206, name: "AC Gas Leakage Repair", price: 999, image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=85" },
      { id: 207, name: "AC Cooling Problem", price: 599, image: "https://images.unsplash.com/photo-1631545806609-0e9b4b4a6f2e?auto=format&fit=crop&w=900&q=85" },
      { id: 208, name: "AC Water Leakage Repair", price: 499, image: "https://images.unsplash.com/photo-1581092919535-7146ff6a8f77?auto=format&fit=crop&w=900&q=85" },
      { id: 209, name: "AC PCB Repair", price: 999, image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=85" },
      { id: 210, name: "AC Compressor Repair", price: 1999, image: "https://images.unsplash.com/photo-1631545806609-0e9b4b4a6f2e?auto=format&fit=crop&w=900&q=85" },
    ],
  },

  {
    id: "carpentry-painting",
    title: "Carpentry & Painting",
    label: "CARPENTRY & PAINTING",
    icon: "🪚",
    colorClass: "orange",
    description: "Furniture repair, woodwork, modular work and painting.",
    services: [
      { id: 301, name: "Furniture Repair", price: 249, image: "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=900&q=85" },
      { id: 302, name: "Wooden Wardrobe Design", price: 399, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=85" },
      { id: 303, name: "Door & Window Repair", price: 299, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85" },
      { id: 304, name: "Door Installation", price: 399, image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85" },
      { id: 305, name: "Kitchen Cabinets", price: 449, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85" },
      { id: 306, name: "Modular Work", price: 599, image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=900&q=85" },
      { id: 307, name: "Wall Painting", price: 799, image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=85" },
      { id: 308, name: "Room Painting", price: 1499, image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=85" },
      { id: 309, name: "Wood Polish", price: 699, image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85" },
      { id: 310, name: "Furniture Assembly", price: 399, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85" },
    ],
  },

  {
    id: "cleaning",
    title: "Cleaning Services",
    label: "CLEANING SERVICES",
    icon: "🧹",
    colorClass: "navy",
    description: "Professional home, office and deep cleaning services.",
    services: [
      { id: 401, name: "Home Cleaning", price: 799, image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85" },
      { id: 402, name: "Deep Cleaning", price: 1499, image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=85" },
      { id: 403, name: "Sofa & Carpet Cleaning", price: 699, image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=85" },
      { id: 404, name: "Kitchen Cleaning", price: 599, image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=900&q=85" },
      { id: 405, name: "Bathroom Cleaning", price: 499, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=85" },
      { id: 406, name: "Office Cleaning", price: 999, image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85" },
      { id: 407, name: "Move-in / Move-out Cleaning", price: 1999, image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=85" },
      { id: 408, name: "Floor Cleaning", price: 699, image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85" },
      { id: 409, name: "Window & Glass Cleaning", price: 499, image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=85" },
      { id: 410, name: "Full House Cleaning", price: 2499, image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85" },
    ],
  },
];

const Plumbing = () => {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceDate, setServiceDate] = useState("");
  const [serviceLocation, setServiceLocation] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const showMessage = (message) => {
    setMsg(message);
    setTimeout(() => setMsg(""), 2500);
  };

  const allServices = serviceCategories.flatMap((category) =>
    category.services.map((service) => ({
      ...service,
      categoryId: category.id,
      categoryName: category.title,
      categoryLabel: category.label,
    }))
  );

  const filteredServices = allServices.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.categoryId === activeCategory;

    const text = `${item.name} ${item.categoryName} ${item.categoryLabel}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());

    const matchesPrice =
      maxPrice === "" || item.price <= Number(maxPrice);

    return matchesCategory && matchesSearch && matchesPrice;
  });

  const addToCart = (item) => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      id: Date.now(),
      serviceId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.categoryName,
      type: "quickfix-service",
    };

    const updatedCart = [...savedCart, cartItem];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    showMessage(`${item.name} added to cart`);
  };

  const openBooking = (item) => {
    setSelectedService(item);
    setServiceDate("");
    setServiceLocation("");
  };

  const confirmBooking = () => {
    if (!selectedService) return;

    if (!serviceDate || !serviceLocation) {
      showMessage("Please fill all details!");
      return;
    }

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const booking = {
      id: Date.now(),
      serviceId: selectedService.id,
      name: selectedService.name,
      price: selectedService.price,
      image: selectedService.image,
      category: selectedService.categoryName,
      date: serviceDate,
      location: serviceLocation,
      totalPrice: selectedService.price,
      type: "quickfix-service",
    };

    const updatedCart = [...savedCart, booking];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setSelectedService(null);

    showMessage(`${selectedService.name} booked successfully 🎉`);
  };

  const today = new Date().toISOString().split("T")[0];

  const scrollToServices = () => {
    document
      .getElementById("quickfix-services")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="plumbing-page">

      {/* ================= HERO ================= */}
      <section className="plumbing-section">
        <section className="plumbing-hero">
          <div className="plumbing-overlay-bg"></div>

          <div className="plumbing-overlay">
            <div className="plumbing-left">
              <span className="plumbing-tag">NISS QUICKFIX</span>

              <h1>
                Fast & Reliable
                <span>Home Services</span>
              </h1>

              <p>
                NISS QuickFix provides fast, reliable and professional
                home & business services at your doorstep.
              </p>

              <div className="quickfix-service-pills">
                <span>🔧 Plumbing</span>
                <span>⚡ Electrical</span>
                <span>❄️ AC Service</span>
                <span>🪚 Carpentry & Painting</span>
                <span>🧹 Cleaning</span>
              </div>

              <div className="plumbing-search-box">
                <input
                  type="text"
                  placeholder="Search any service..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button onClick={scrollToServices}>Search</button>
              </div>

              <div className="plumbing-buttons">
                <button
                  className="plumbing-btn-primary"
                  onClick={scrollToServices}
                >
                  Book Service
                </button>

                <button
                  className="plumbing-btn-secondary"
                  onClick={() => {
                    setActiveCategory("all");
                    setSearch("");
                    scrollToServices();
                  }}
                >
                  View All Services
                </button>
              </div>
            </div>

            <div className="plumbing-right">
              <div className="quickfix-hero-service-grid">
                <div>🔧<strong>PLUMBING</strong></div>
                <div>⚡<strong>ELECTRICAL</strong></div>
                <div>❄️<strong>AC REPAIR</strong></div>
                <div>🪚<strong>CARPENTRY</strong></div>
                <div>🧹<strong>CLEANING</strong></div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TRUST BAR ================= */}
        <div className="quickfix-trust-bar">
          <div>🛡️ <strong>EXPERT PROFESSIONALS</strong></div>
          <div>⏱️ <strong>ON-TIME SERVICE</strong></div>
          <div>₹ <strong>AFFORDABLE PRICING</strong></div>
          <div>🎧 <strong>CUSTOMER SUPPORT</strong></div>
        </div>

        {/* ================= SERVICE TITLE ================= */}
        <section className="section-heading" id="quickfix-services">
          <span>OUR SERVICES</span>
          <h2>All NISS QuickFix Services</h2>
          <p>
            Plumbing, Electrical, AC Repair & Service,
            Carpentry & Painting and Cleaning — all in one place.
          </p>
        </section>

        {/* ================= CATEGORY FILTER ================= */}
        <div className="quickfix-category-filter">
          <button
            className={activeCategory === "all" ? "active-category" : ""}
            onClick={() => setActiveCategory("all")}
          >
            All Services
          </button>

          {serviceCategories.map((category) => (
            <button
              key={category.id}
              className={
                activeCategory === category.id ? "active-category" : ""
              }
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon} {category.title}
            </button>
          ))}
        </div>

        {/* ================= SEARCH FILTER ================= */}
        <div className="plumbing-filters">
          <input
            type="text"
            placeholder="Search service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max Price (₹)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* ================= SERVICE GRID ================= */}
        <div className="plumbing-grid quickfix-all-services-grid">
          {filteredServices.length > 0 ? (
            filteredServices.map((item) => (
              <div className="service-card" key={`${item.categoryId}-${item.id}`}>
                <div className="service-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className="service-content">
                  <span className="service-label">
                    {item.categoryLabel}
                  </span>

                  <h3>{item.name}</h3>

                  <p className="service-price">₹{item.price}</p>

                  <div className="service-actions">
                    <button onClick={() => openBooking(item)}>
                      Book Now
                    </button>

                    <button
                      className="cart-button"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-service">
              <h2>No Service Found</h2>
              <p>Try another service name or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ================= FIVE SERVICE SUMMARY ================= */}
      <section className="quickfix-five-services">
        <div className="section-heading">
          <span>ONE CALL. ANY PROBLEM.</span>
          <h2>We QuickFix It All!</h2>
        </div>

        <div className="quickfix-five-grid">
          {serviceCategories.map((category) => (
            <div
              className={`quickfix-category-card ${category.colorClass}`}
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setSearch("");
                scrollToServices();
              }}
            >
              <div className="quickfix-category-icon">
                {category.icon}
              </div>

              <h3>{category.title}</h3>

              <p>{category.description}</p>

              <strong>
                {category.services.length}+ Services
              </strong>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BOOKING STEPS ================= */}
      <section className="quickfix-booking-section">
        <div>
          <h2>BOOK SERVICE IN 3 EASY STEPS!</h2>
          <div className="quickfix-steps">
            <div>
              <span>1</span>
              <strong>CALL / WHATSAPP US</strong>
            </div>

            <div>
              <span>2</span>
              <strong>SCHEDULE SERVICE</strong>
            </div>

            <div>
              <span>3</span>
              <strong>RELAX, WE WILL FIX IT!</strong>
            </div>
          </div>
        </div>

        <div className="quickfix-urgent-box">
          <h2>NEED URGENT SERVICE?</h2>
          <p>WE ARE JUST A CALL AWAY!</p>
          <strong>24/7 SERVICE AVAILABLE</strong>
        </div>
      </section>

      {/* ================= BOOKING MODAL ================= */}
      {selectedService && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button
              className="modal-close"
              onClick={() => setSelectedService(null)}
            >
              ×
            </button>

            <span className="service-label">
              {selectedService.categoryLabel}
            </span>

            <h2>{selectedService.name}</h2>

            <p>₹{selectedService.price}</p>

            <label>Date</label>
            <input
              type="date"
              min={today}
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
            />

            <label>Address</label>
            <input
              type="text"
              placeholder="Enter your complete address..."
              value={serviceLocation}
              onChange={(e) => setServiceLocation(e.target.value)}
            />

            <h3 className="modal-total">
              Total: ₹{selectedService.price}
            </h3>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setSelectedService(null)}
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

      {/* ================= MESSAGE ================= */}
      {msg && <div className="service-message">{msg}</div>}

      <Footer />
    </div>
  );
};

export default Plumbing;
