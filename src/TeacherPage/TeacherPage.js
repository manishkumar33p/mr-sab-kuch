// import React, { useState, useEffect } from "react";
// import "./TeacherPage.css";
// import NavBar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import MarvVideo2 from "../marvv3.mp4";

// const teachers = [
//   {
//     id: 1,
//     name: "Mathematics Tutor",
//     category: "School",
//     price: 300,
//     rating: 4.5,
//     available: true,
//     image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
//   },
//   {
//     id: 2,
//     name: "Physics Expert",
//     category: "School",
//     price: 350,
//     rating: 4.2,
//     available: true,
//     image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
//   },
//   {
//     id: 3,
//     name: "English Trainer",
//     category: "Language",
//     price: 250,
//     rating: 4.8,
//     available: false,
//     image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
//   },
//   {
//     id: 4,
//     name: "Coding Instructor",
//     category: "Tech",
//     price: 500,
//     rating: 4.9,
//     available: true,
//     image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
//   },
// ];

// const TeacherPage = () => {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [hours, setHours] = useState({});
//   const [msg, setMsg] = useState("");
//   const [wishlist, setWishlist] = useState([]);
//   const [sort, setSort] = useState("none");

//   // ⭐ wishlist
//   const toggleWishlist = (id) => {
//     let updated = wishlist.includes(id)
//       ? wishlist.filter((i) => i !== id)
//       : [...wishlist, id];

//     setWishlist(updated);
//   };

//   // 🧠 optimized cart (no duplicate spam)
//   const addToCart = (item) => {
//     const h = hours[item.id] || 1;

//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const existingIndex = cart.findIndex((c) => c.id === item.id);

//     if (existingIndex !== -1) {
//       cart[existingIndex].hours += h;
//       cart[existingIndex].totalPrice =
//         cart[existingIndex].hours * item.price;
//     } else {
//       cart.push({
//         id: item.id,
//         name: item.name,
//         image: item.image,
//         pricePerHour: item.price,
//         hours: h,
//         totalPrice: item.price * h,
//         type: "teacher",
//       });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     setMsg("Teacher added to cart!");

//     setTimeout(() => setMsg(""), 2000);
//   };

//   // 🔍 filtering + sorting
//   let filtered = teachers.filter((t) => {
//     return (
//       t.name.toLowerCase().includes(search.toLowerCase()) &&
//       (category === "All" || t.category === category)
//     );
//   });

//   if (sort === "low") filtered.sort((a, b) => a.price - b.price);
//   if (sort === "high") filtered.sort((a, b) => b.price - a.price);

//   return (
//     <div className="teacher-page">

//       <NavBar />

//       {/* HERO */}
//       <section className="teacher-hero">
//         <video className="hero-video" autoPlay muted loop>
//           <source src={MarvVideo2} type="video/mp4" />
//         </video>

//         <div className="hero-overlay">
//           <span className="hero-tag">Expert Home & Online Tutors</span>

//           <h1>
//             Learn Smarter With <span>Best Teachers</span>
//           </h1>

//           <p>
//             Mathematics, Science, English, Coding, Language Training &
//             Skill Development.
//           </p>
//         </div>
//       </section>

//       {/* FILTERS */}
//       <section className="filter-bar">

//         <input
//           type="text"
//           placeholder="Search Teacher..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select onChange={(e) => setCategory(e.target.value)}>
//           <option>All</option>
//           <option>School</option>
//           <option>Language</option>
//           <option>Tech</option>
//         </select>

//         <select onChange={(e) => setSort(e.target.value)}>
//           <option value="none">Sort</option>
//           <option value="low">Price: Low to High</option>
//           <option value="high">Price: High to Low</option>
//         </select>

//       </section>

//       {/* MESSAGE */}
//       {msg && <div className="msg">{msg}</div>}

//       {/* GRID */}
//       <section className="teacher-grid">

//         {filtered.length === 0 ? (
//           <h3 style={{ textAlign: "center" }}>No Teachers Found 😢</h3>
//         ) : (
//           filtered.map((t) => (
//             <div className="teacher-card" key={t.id}>

//               <img src={t.image} alt={t.name} />

//               <div className="teacher-info">

//                 <div className="top-row">
//                   <span>{t.category}</span>

//                   <button
//                     className="wish-btn"
//                     onClick={() => toggleWishlist(t.id)}
//                   >
//                     {wishlist.includes(t.id) ? "❤️" : "🤍"}
//                   </button>
//                 </div>

//                 <h3>{t.name}</h3>

//                 <p>⭐ {t.rating}</p>

//                 <h4>₹{t.price}/hour</h4>

//                 <p className={t.available ? "green" : "red"}>
//                   {t.available ? "Available" : "Busy"}
//                 </p>

//                 <input
//                   type="number"
//                   min="1"
//                   defaultValue="1"
//                   onChange={(e) =>
//                     setHours({
//                       ...hours,
//                       [t.id]: Number(e.target.value),
//                     })
//                   }
//                 />

//                 <button
//                   disabled={!t.available}
//                   onClick={() => addToCart(t)}
//                 >
//                   Book Teacher
//                 </button>

//               </div>

//             </div>
//           ))
//         )}
//       </section>
// <section className="features">

//         <h2>Why Choose Our Teachers?</h2>

//         <div className="feature-grid">

//           <div>✔ Verified Tutors</div>
//           <div>✔ Affordable Fees</div>
//           <div>✔ Online + Home Classes</div>
//           <div>✔ Instant Booking</div>

//         </div>

//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default TeacherPage;


// import React, { useState } from "react";
// import "./TeacherPage.css";
// import NavBar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import MarvVideo2 from "../marvv3.mp4";

// const teachers = [
//   {
//     id: 1,
//     name: "Mathematics Tutor",
//     category: "School",
//     price: 300,
//     rating: 4.5,
//     popular: true,
//     image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
//   },
//   {
//     id: 2,
//     name: "Physics Expert",
//     category: "School",
//     price: 350,
//     rating: 4.2,
//     popular: false,
//     image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
//   },
//   {
//     id: 3,
//     name: "English Trainer",
//     category: "Language",
//     price: 250,
//     rating: 4.8,
//     popular: true,
//     image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
//   },
//   {
//     id: 4,
//     name: "Coding Instructor",
//     category: "Tech",
//     price: 500,
//     rating: 4.9,
//     popular: true,
//     image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
//   },
// ];

// const TeacherPage = () => {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [hours, setHours] = useState(1);
//   const [msg, setMsg] = useState("");

//   const quickCategories = ["All", "School", "Language", "Tech"];

//   const filtered = teachers.filter((t) => {
//     return (
//       t.name.toLowerCase().includes(search.toLowerCase()) &&
//       (category === "All" || t.category === category)
//     );
//   });

//   const openBookModal = (teacher) => {
//     setSelectedTeacher(teacher);
//     setHours(1);
//   };

//   const addToCart = () => {
//     if (!selectedTeacher) return;

//     const cartItem = {
//       id: selectedTeacher.id,
//       name: selectedTeacher.name,
//       image: selectedTeacher.image,
//       pricePerHour: selectedTeacher.price,
//       hours,
//       totalPrice: selectedTeacher.price * hours,
//       type: "teacher",
//     };

//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart.push(cartItem);
//     localStorage.setItem("cart", JSON.stringify(cart));

//     setMsg("Booking Confirmed 🎉");
//     setSelectedTeacher(null);

//     setTimeout(() => setMsg(""), 2000);
//   };

//   return (
//     <div className="teacher-page">

//       <NavBar />

//       {/* HERO */}
//       <section className="teacher-hero">
//         <video className="hero-video" autoPlay muted loop>
//           <source src={MarvVideo2} type="video/mp4" />
//         </video>

//         <div className="hero-overlay">
//           <h1>Find & Book <span>Expert Teachers</span></h1>
//           <p>Home tuition + Online classes instantly available</p>
//         </div>
//       </section>

//       {/* QUICK CATEGORY CHIPS (TAILOR STYLE) */}
//       <div className="chip-container">
//         {quickCategories.map((c) => (
//           <button
//             key={c}
//             className={`chip ${category === c ? "active-chip" : ""}`}
//             onClick={() => setCategory(c)}
//           >
//             {c}
//           </button>
//         ))}
//       </div>

//       {/* SEARCH */}
//       <div className="filter-bar">
//         <input
//           placeholder="Search teacher..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {msg && <div className="msg">{msg}</div>}

//       {/* CARDS */}
//       <section className="teacher-grid">

//         {filtered.map((t) => (
//           <div className="teacher-card" key={t.id}>

//             <img src={t.image} alt={t.name} />

//             {t.popular && (
//               <div className="badge">🔥 Popular</div>
//             )}

//             <div className="teacher-info">

//               <span>{t.category}</span>

//               <h3>{t.name}</h3>

//               <p>⭐ {t.rating}</p>

//               <h4>₹{t.price}/hour</h4>

//               <button
//                 className="primary-btn"
//                 onClick={() => openBookModal(t)}
//               >
//                 Book Now
//               </button>

//             </div>

//           </div>
//         ))}
//       </section>

//       {/* BOOKING MODAL (TAILOR STYLE POPUP) */}
//       {selectedTeacher && (
//         <div className="modal-overlay">
//           <div className="modal-box">

//             <h2>{selectedTeacher.name}</h2>

//             <p>₹{selectedTeacher.price}/hour</p>

//             {/* QUICK HOURS SELECT */}
//             <div className="quick-hours">
//               {[1, 2, 3, 5].map((h) => (
//                 <button
//                   key={h}
//                   className={hours === h ? "active-hour" : ""}
//                   onClick={() => setHours(h)}
//                 >
//                   {h} hr
//                 </button>
//               ))}
//             </div>

//             <h3>Total: ₹{selectedTeacher.price * hours}</h3>

//             <div className="modal-actions">

//               <button
//                 className="cancel-btn"
//                 onClick={() => setSelectedTeacher(null)}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="confirm-btn"
//                 onClick={addToCart}
//               >
//                 Confirm Booking
//               </button>

//             </div>

//           </div>
//         </div>
//       )}
//  <section className="features">

//         <h2>Why Choose Our Teachers?</h2>

//         <div className="feature-grid">

//            <div>✔ Verified Tutors</div>
//           <div>✔ Affordable Fees</div>
//            <div>✔ Online + Home Classes</div>
//           <div>✔ Instant Booking</div>

//          </div>

//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default TeacherPage;


import React, { useState, useMemo } from "react";
import "./TeacherPage.css";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import MarvVideo2 from "../marvv3.mp4";

const teachers = [
  {
    id: 1,
    name: "Mathematics Tutor",
    category: "School",
    price: 300,
    rating: 4.5,
    popular: true,
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
  },
  {
    id: 2,
    name: "Physics Expert",
    category: "School",
    price: 350,
    rating: 4.2,
    popular: false,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
  },
  {
    id: 3,
    name: "English Trainer",
    category: "Language",
    price: 250,
    rating: 4.8,
    popular: true,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  },
  {
    id: 4,
    name: "Coding Instructor",
    category: "Tech",
    price: 500,
    rating: 4.9,
    popular: true,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
];

const TeacherPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [hours, setHours] = useState(1);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const [msg, setMsg] = useState("");

  const quickCategories = ["All", "School", "Language", "Tech"];

  const filtered = useMemo(() => {
    return teachers.filter((t) => {
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || t.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  const openBookModal = (teacher) => {
    setSelectedTeacher(teacher);
    setHours(1);
    setDate("");
    setLocation("");
  };

  const confirmBooking = () => {
    if (!selectedTeacher) return;

    if (!date || !location) {
      setMsg("Please fill date and location!");
      setTimeout(() => setMsg(""), 2000);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const booking = {
      id: Date.now(),
      teacherId: selectedTeacher.id,
      name: selectedTeacher.name,
      image: selectedTeacher.image,
      category: selectedTeacher.category,
      pricePerHour: selectedTeacher.price,
      hours,
      date,
      location,
      totalPrice: selectedTeacher.price * hours,
      type: "teacher-booking",
    };

    cart.push(booking);
    localStorage.setItem("cart", JSON.stringify(cart));

    setMsg("Teacher Booked Successfully 🎉");
    setSelectedTeacher(null);

    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="teacher-page">

      <NavBar />

      {/* HERO */}
      <section className="teacher-hero">
        <video className="hero-video" autoPlay muted loop>
          <source src={MarvVideo2} type="video/mp4" />
        </video>

        <div className="hero-overlay">
          <h1>Find & Book <span>Expert Teachers</span></h1>
          <p>Home tuition + Online classes instantly available</p>
        </div>
      </section>

      {/* CATEGORY */}
      <div className="chip-container">
        {quickCategories.map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? "active-chip" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <div className="filter-bar">
        <input
          placeholder="Search teacher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {msg && <div className="msg">{msg}</div>}

      {/* CARDS */}
      <section className="teacher-grid">

        {filtered.map((t) => (
          <div className="teacher-card" key={t.id}>

            <img src={t.image} alt={t.name} />

            {t.popular && <div className="badge">🔥 Popular</div>}

            <div className="teacher-info">

              <span>{t.category}</span>
              <h3>{t.name}</h3>
              <p>⭐ {t.rating}</p>
              <h4>₹{t.price}/hour</h4>

              <button className="primary-btn" onClick={() => openBookModal(t)}>
                Book Now
              </button>

            </div>
          </div>
        ))}
      </section>

      {/* MODAL */}
      {selectedTeacher && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h2>{selectedTeacher.name}</h2>
            <p>₹{selectedTeacher.price}/hour</p>

            {/* HOURS */}
            <label>Hours</label>
            <div className="quick-hours">
              {[1, 2, 3, 5].map((h) => (
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
            <label>Location / Online Link</label>
            <input
              type="text"
              placeholder="Enter address or Google Meet link"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            {/* TOTAL */}
            <h3>Total: ₹{selectedTeacher.price * hours}</h3>

            {/* BUTTONS */}
            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setSelectedTeacher(null)}
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

      {/* FEATURES */}
      <section className="features">

        <h2>Why Choose Our Teachers?</h2>

        <div className="feature-grid">
          <div>✔ Verified Tutors</div>
          <div>✔ Affordable Fees</div>
          <div>✔ Online + Home Classes</div>
          <div>✔ Instant Booking</div>
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default TeacherPage;