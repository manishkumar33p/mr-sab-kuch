// import React, { useState } from "react";
// import "./TailorPage.css";
// import NavBar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// import Tailor from "../Tailor.mp4";

// // ✅ IMPORT IMAGES PROPER WAY
// import menSuit from "../Mensuit.jfif";
// import womenSuit from "../Womensuit.jfif";
// import blouse from "../blouse stitching.jfif";
// import alteration from "../alteration.jfif";
// import bulk from "../Bulk.jfif";

// const tailorServices = [
//   {
//     id: 1,
//     name: "Men Suit Stitching",
//     category: "Men",
//     price: 799,
//     image: menSuit,
//   },
//   {
//     id: 2,
//     name: "Women Dress Stitching",
//     category: "Women",
//     price: 699,
//     image: womenSuit,
//   },
//   {
//     id: 3,
//     name: "Blouse Stitching",
//     category: "Women",
//     price: 399,
//     image: blouse,
//   },
//   {
//     id: 4,
//     name: "Alteration Service",
//     category: "Repair",
//     price: 199,
//     image: alteration,
//   },
//   {
//     id: 5,
//     name: "Uniform Stitching",
//     category: "Bulk",
//     price: 299,
//     image: bulk,
//   },
// ];

// // ⭐ TESTIMONIALS (NEW ADDITION)
// const testimonials = [
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     text: "Perfect stitching and very fast delivery!",
//   },
//   {
//     id: 2,
//     name: "Priya Singh",
//     text: "Excellent fitting and affordable price.",
//   },
//   {
//     id: 3,
//     name: "Amit Verma",
//     text: "Best tailor service I ever used!",
//   },
// ];

// const TailorPage = () => {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [msg, setMsg] = useState("");

//   const addToCart = (item) => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const cartItem = {
//       id: item.id,
//       name: item.name,
//       image: item.image,
//       price: item.price,
//       type: "tailor",
//     };

//     cart.push(cartItem);
//     localStorage.setItem("cart", JSON.stringify(cart));

//     setMsg("Added to cart!");
//     setTimeout(() => setMsg(""), 2000);
//   };

//   const filtered = tailorServices.filter((item) => {
//     return (
//       (category === "All" || item.category === category) &&
//       item.name.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   return (
//     <div className="tailor-page">

//       <NavBar />

//       {/* HERO */}
//       <section className="tailor-hero">

//         <video className="hero-video" autoPlay muted loop>
//           <source src={Tailor} type="video/mp4" />
//         </video>

//         <div className="hero-overlay">

//           <span className="hero-tag">
//             Premium Tailoring Services
//           </span>

//           <h1>
//             Stitch Your Style With <span>Perfect Fitting</span>
//           </h1>

//           <p>
//             Men Suit Stitching, Women Dresses, Blouse Design,
//             Alteration Services & Uniform Tailoring
//           </p>

//           <div className="hero-buttons">
//             <button>Book Tailor</button>
//             <button>Explore Designs</button>
//           </div>

//         </div>

//       </section>

//       {/* FILTER */}
//       <section className="filter-bar">

//         <input
//           type="text"
//           placeholder="Search Tailor Services..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select onChange={(e) => setCategory(e.target.value)}>
//           <option>All</option>
//           <option>Men</option>
//           <option>Women</option>
//           <option>Repair</option>
//           <option>Bulk</option>
//         </select>

//       </section>

//       {msg && <div className="msg">{msg}</div>}

//       {/* SERVICES */}
//       <section className="tailor-grid">

//         {filtered.map((item) => (
//           <div className="tailor-card" key={item.id}>

//             <img src={item.image} alt={item.name} />

//             <div className="tailor-info">

//               <span>{item.category}</span>

//               <h3>{item.name}</h3>

//               <h4> Starting at ₹{item.price}</h4>

//               <button onClick={() => addToCart(item)}>
//                 Add To Cart
//               </button>

//             </div>

//           </div>
//         ))}

//       </section>

//       {/* 📏 BOOKING / MEASUREMENT SYSTEM */}
// <section className="booking-section">

//   <h2>Book Tailor Service 📏</h2>

//   <div className="booking-form">

//     <input type="text" placeholder="Your Name" />
//     <input type="text" placeholder="Phone Number" />

//     <input type="text" placeholder="Chest Size" />
//     <input type="text" placeholder="Waist Size" />
//     <input type="text" placeholder="Shoulder Size" />

//     <select>
//       <option>Pickup Option</option>
//       <option>Home Pickup</option>
//       <option>Visit Store</option>
//     </select>

//     <select>
//       <option>Delivery Time</option>
//       <option>24 Hours (Urgent)</option>
//       <option>2-3 Days</option>
//       <option>5-7 Days</option>
//     </select>

//     <button>
//       Confirm Booking
//     </button>

//   </div>

// </section>

//       {/* TESTIMONIALS ⭐ NEW */}
//       <section className="testimonial-section">

//         <h2>What Customers Say</h2>

//         <div className="testimonial-grid">

//           {testimonials.map((t) => (
//             <div className="testimonial-card" key={t.id}>
//               <p>“{t.text}”</p>
//               <h4>- {t.name}</h4>
//             </div>
//           ))}

//         </div>

//       </section>
//       <section className="highlight"> <h2>Why Choose Our Tailor Service?</h2> <div className="highlight-grid"> <div>✔ Expert Tailors</div> <div>✔ Custom Fitting</div> <div>✔ Doorstep Pickup & Delivery</div> <div>✔ Affordable Pricing</div> </div> </section>

//       <Footer />

//     </div>
//   );
// };

// export default TailorPage;



import React, { useState } from "react";
import "./TailorPage.css";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Tailor from "../Tailor.mp4";

import { useNavigate } from "react-router-dom";

// IMAGES
import menSuit from "../Mensuit.jfif";
import womenSuit from "../Womensuit.jfif";
import blouse from "../blouse stitching.jfif";
import alteration from "../alteration.jfif";
import bulk from "../Bulk.jfif";

const tailorServices = [
  { id: 1, name: "Men Suit Stitching", category: "Men", price: 799, image: menSuit },
  { id: 2, name: "Women Dress Stitching", category: "Women", price: 699, image: womenSuit },
  { id: 3, name: "Blouse Stitching", category: "Women", price: 399, image: blouse },
  { id: 4, name: "Alteration Service", category: "Repair", price: 199, image: alteration },
  { id: 5, name: "Uniform Stitching", category: "Bulk", price: 299, image: bulk },
];

const testimonials = [
  { id: 1, name: "Rahul Sharma", text: "Perfect stitching and fast delivery!" },
  { id: 2, name: "Priya Singh", text: "Excellent fitting and affordable price." },
  { id: 3, name: "Amit Verma", text: "Best tailor service ever!" },
];

const TailorPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  // ADD TO CART
  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      type: "tailor",
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    setMsg("Added to cart ✅");
    setTimeout(() => setMsg(""), 2000);
  };

  // SAVE BOOKING
  const saveBooking = () => {
    const booking = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      chest: document.getElementById("chest").value,
      waist: document.getElementById("waist").value,
      shoulder: document.getElementById("shoulder").value,
      pickup: document.getElementById("pickup").value,
      delivery: document.getElementById("delivery").value,
      time: new Date().toLocaleString(),
    };

    const old = JSON.parse(localStorage.getItem("bookings")) || [];
    old.push(booking);
    localStorage.setItem("bookings", JSON.stringify(old));

    alert("Booking Confirmed ✅ Saved Successfully!");
  };

  const filtered = tailorServices.filter((item) => {
    return (
      (category === "All" || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="tailor-page">

      <NavBar />

      {/* HERO */}
      <section className="tailor-hero">

        <video className="hero-video" autoPlay muted loop>
          <source src={Tailor} type="video/mp4" />
        </video>

        <div className="hero-overlay">

          <span className="hero-tag">Premium Tailoring Services</span>

          <h1>
            Stitch Your Style With <span>Perfect Fitting</span>
          </h1>

          <p>
            Men Suit, Women Dress, Blouse, Alteration & Uniform Tailoring
          </p>

          <div className="hero-buttons">

            <button>Book Tailor</button>

            {/* 🔥 EXPLORE → LOGIN PAGE */}
            <button onClick={() => navigate("/tlogin")}>
              Staff Panel
            </button>

          </div>

        </div>

      </section>

      {/* BOOKING FORM */}
      <section className="booking-section">

        <h2>Book Tailor Service 📏</h2>

        <div className="booking-form">

          <input id="name" placeholder="Your Name" />
          <input id="phone" placeholder="Phone Number" />
          <input id="chest" placeholder="Chest Size" />
          <input id="waist" placeholder="Waist Size" />
          <input id="shoulder" placeholder="Shoulder Size" />

          <select id="pickup">
            <option>Home Pickup</option>
            <option>Visit Store</option>
          </select>

          <select id="delivery">
            <option>2-3 Days</option>
            <option>24 Hours</option>
            <option>5-7 Days</option>
          </select>

          <button onClick={saveBooking}>
            Confirm Booking
          </button>

        </div>

      </section>

      {/* FILTER */}
      <section className="filter-bar">

        <input
          placeholder="Search Tailor Services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Men</option>
          <option>Women</option>
          <option>Repair</option>
          <option>Bulk</option>
        </select>

      </section>

      {msg && <div className="msg">{msg}</div>}

      {/* SERVICES */}
      <section className="tailor-grid">

        {filtered.map((item) => (
          <div className="tailor-card" key={item.id}>

            <img src={item.image} alt={item.name} />

            <div className="tailor-info">

              <span>{item.category}</span>
              <h3>{item.name}</h3>
              <h4>₹{item.price}</h4>

              <button onClick={() => addToCart(item)}>
                Add To Cart
              </button>

            </div>

          </div>
        ))}

      </section>

      {/* TESTIMONIALS */}
      <section className="testimonial-section">

        <h2>What Customers Say</h2>

        <div className="testimonial-grid">

          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.id}>
              <p>“{t.text}”</p>
              <h4>- {t.name}</h4>
            </div>
          ))}

        </div>

      </section>
<section className="highlight"> <h2>Why Choose Our Tailor Service?</h2> <div className="highlight-grid"> <div>✔ Expert Tailors</div> <div>✔ Custom Fitting</div> <div>✔ Doorstep Pickup & Delivery</div> <div>✔ Affordable Pricing</div> </div> </section>
      <Footer />

    </div>
  );
};

export default TailorPage;