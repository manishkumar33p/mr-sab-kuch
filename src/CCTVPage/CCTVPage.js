


// import React, { useState } from "react";
// import "./CCTVPage.css";
// import NavBar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// import MarvVideo2 from "../marvv3.mp4";
// import kit from "../kit.webp";

// const cctvProducts = [
//   {
//     id: 1,
//     name: "HD Dome CCTV Camera",
//     category: "Camera",
//     price: 2499,
//     image:
//       "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
//   },
//   {
//     id: 2,
//     name: "Wireless WiFi CCTV Camera",
//     category: "Camera",
//     price: 3999,
//     image:
//       "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
//   },
//   {
//     id: 3,
//     name: "4 Channel DVR Kit",
//     category: "Kit",
//     price: 8999,
//     image:
//       "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
//   },
//   {
//     id: 4,
//     name: "8 Channel CCTV Kit",
//     category: "Kit",
//     price: 14999,
//     image: kit,
//   },
// ];

// const CCTVPage = () => {
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
//       type: "cctv-product",
//     };

//     cart.push(cartItem);
//     localStorage.setItem("cart", JSON.stringify(cart));

//     setMsg("Added to cart!");
//     setTimeout(() => setMsg(""), 2000);
//   };

//   const filtered = cctvProducts.filter((item) => {
//     const matchSearch = item.name
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchCategory =
//       category === "All" || item.category === category;

//     return matchSearch && matchCategory;
//   });

//   return (
//     <div className="cctv-page">
//       <NavBar />

//       {/* HERO */}
//       <section className="cctv-hero">
//         <video className="hero-video" autoPlay muted loop>
//           <source src={MarvVideo2} type="video/mp4" />
//         </video>

//         <div className="hero-overlay">
//           <span className="hero-tag">
//             Smart CCTV & Surveillance Systems
//           </span>

//           <h1>
//             Secure Your Home With{" "}
//             <span>Advanced CCTV Cameras</span>
//           </h1>

//           <p>
//             HD Cameras, Wireless CCTV, DVR Systems, Remote Monitoring,
//             Installation & Full Security Setup
//           </p>

//           <div className="hero-buttons">
//             <button>Buy CCTV</button>
//             <button>Get Installation</button>
//           </div>
//         </div>
//       </section>

//       {/* FILTER */}
//       <section className="filter-bar">
//         <input
//           type="text"
//           placeholder="Search CCTV..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select onChange={(e) => setCategory(e.target.value)}>
//           <option>All</option>
//           <option>Camera</option>
//           <option>Kit</option>
//         </select>
//       </section>

//       {msg && <div className="msg">{msg}</div>}

//       {/* PRODUCTS */}
//       <section className="cctv-grid">
//         {filtered.map((item) => (
//           <div className="cctv-card" key={item.id}>
//             <img src={item.image} alt={item.name} />

//             <div className="cctv-info">
//               <span>{item.category}</span>
//               <h3>{item.name}</h3>
//               <h4>₹ {item.price.toLocaleString()}</h4>

//               <button onClick={() => addToCart(item)}>
//                 Add To Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* INSTALLATION */}
//       <section className="install-section">
//         <h2>Installation Service Available</h2>

//         <div className="install-grid">
//           <div>✔ Home CCTV Installation</div>
//           <div>✔ Office Security Setup</div>
//           <div>✔ Mobile Monitoring Setup</div>
//           <div>✔ Maintenance & Repair</div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default CCTVPage;


import React, { useState } from "react";
import "./CCTVPage.css";

// import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import MarvVideo2 from "../marvv3.mp4";
import kit from "../kit.webp";

const cctvProducts = [
  {
    id: 1,
    name: "HD Dome CCTV Camera",
    category: "Camera",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80",
    description: "High-definition indoor surveillance camera",
  },
  {
    id: 2,
    name: "Wireless WiFi CCTV Camera",
    category: "Camera",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80",
    description: "Wireless camera with remote monitoring",
  },
  {
    id: 3,
    name: "4 Channel DVR Kit",
    category: "Kit",
    price: 8999,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
    description: "Complete 4-channel CCTV security kit",
  },
  {
    id: 4,
    name: "8 Channel CCTV Kit",
    category: "Kit",
    price: 14999,
    image: kit,
    description: "Complete multi-camera security solution",
  },
  {
    id: 5,
    name: "Outdoor Bullet CCTV Camera",
    category: "Camera",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    description: "Weather-resistant outdoor surveillance",
  },
  {
    id: 6,
    name: "PTZ Security Camera",
    category: "Camera",
    price: 6499,
    image:
      "https://images.unsplash.com/photo-1563770660941-10a9f1d4e0d6?auto=format&fit=crop&w=900&q=80",
    description: "Pan, tilt and zoom security camera",
  },
  {
    id: 7,
    name: "16 Channel DVR System",
    category: "Kit",
    price: 19999,
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80",
    description: "Advanced security setup for large properties",
  },
  {
    id: 8,
    name: "Smart Night Vision Camera",
    category: "Camera",
    price: 4499,
    image:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80",
    description: "Clear surveillance with night vision",
  },
];

const CCTVPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [msg, setMsg] = useState("");

  const addToCart = (item) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      id: Date.now(),
      productId: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      category: item.category,
      type: "cctv-product",
    };

    const updatedCart = [...cart, cartItem];

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setMsg(`${item.name} added to cart ✓`);

    setTimeout(() => {
      setMsg("");
    }, 2500);
  };

  const scrollToProducts = () => {
    document
      .getElementById("cctv-products")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const scrollToInstallation = () => {
    document
      .getElementById("installation")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const filtered = cctvProducts.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      item.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="cctv-page">

      {/* <NavBar /> */}

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="cctv-hero">

        <video
          className="cctv-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src={MarvVideo2}
            type="video/mp4"
          />
        </video>

        <div className="cctv-hero-overlay"></div>

        <div className="cctv-hero-content">

          <div className="security-badge">
            🛡️ NISS SECURITY SOLUTIONS
          </div>

          <h1>
            Trusted Security.
            <span>Complete Protection.</span>
          </h1>

          <p>
            Advanced CCTV cameras, DVR systems,
            remote monitoring and professional
            security installation for homes,
            offices and businesses.
          </p>

          <div className="cctv-hero-buttons">

            <button
              className="cctv-primary-btn"
              onClick={scrollToProducts}
            >
              Explore CCTV
            </button>

            <button
              className="cctv-outline-btn"
              onClick={scrollToInstallation}
            >
              Get Installation
            </button>

          </div>

          <div className="security-features">

            <div>
              <strong>24/7</strong>
              <span>Protection</span>
            </div>

            <div>
              <strong>HD</strong>
              <span>Video Quality</span>
            </div>

            <div>
              <strong>Remote</strong>
              <span>Monitoring</span>
            </div>

            <div>
              <strong>Quick</strong>
              <span>Installation</span>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="security-intro">

        <div className="intro-left">

          <span className="section-label">
            NISS SECURITY SOLUTIONS
          </span>

          <h2>
            Your Safety.
            <span>Our Priority.</span>
          </h2>

          <p>
            Protect your home, office, shop and
            commercial property with reliable
            CCTV surveillance systems and
            professional installation.
          </p>

        </div>

        <div className="intro-cards">

          <div className="intro-card">
            <div className="intro-icon">📹</div>
            <h3>HD Surveillance</h3>
            <p>
              Clear video monitoring day and night.
            </p>
          </div>

          <div className="intro-card">
            <div className="intro-icon">📱</div>
            <h3>Remote Access</h3>
            <p>
              Monitor your property from anywhere.
            </p>
          </div>

          <div className="intro-card">
            <div className="intro-icon">🔧</div>
            <h3>Professional Setup</h3>
            <p>
              Expert installation and support.
            </p>
          </div>

        </div>

      </section>


      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section
        className="cctv-products-section"
        id="cctv-products"
      >

        <div className="section-title">

          <span>
            OUR PRODUCTS
          </span>

          <h2>
            CCTV & Surveillance Systems
          </h2>

          <p>
            Choose the right security solution
            for your property.
          </p>

        </div>


        {/* FILTER */}

        <div className="cctv-filter">

          <div className="cctv-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search CCTV products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="category-buttons">

            <button
              className={
                category === "All"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCategory("All")
              }
            >
              All
            </button>

            <button
              className={
                category === "Camera"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCategory("Camera")
              }
            >
              Cameras
            </button>

            <button
              className={
                category === "Kit"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCategory("Kit")
              }
            >
              CCTV Kits
            </button>

          </div>

        </div>


        {/* PRODUCT GRID */}

        <div className="cctv-grid">

          {filtered.length > 0 ? (

            filtered.map((item) => (

              <div
                className="cctv-card"
                key={item.id}
              >

                <div className="cctv-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <span className="product-badge">
                    {item.category}
                  </span>

                </div>


                <div className="cctv-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <div className="product-bottom">

                    <strong>
                      ₹{" "}
                      {item.price.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                    <button
                      onClick={() =>
                        addToCart(item)
                      }
                    >
                      Add To Cart
                    </button>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="no-products">

              <div>
                🔍
              </div>

              <h3>
                No CCTV Product Found
              </h3>

              <p>
                Try another product name or category.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          SECURITY SERVICES
      ===================================================== */}

      <section className="security-services">

        <div className="section-title light">

          <span>
            COMPLETE SECURITY SOLUTIONS
          </span>

          <h2>
            More Than Just CCTV
          </h2>

          <p>
            Complete security solutions for
            homes, offices and commercial properties.
          </p>

        </div>


        <div className="security-service-grid">

          <div className="security-service-card">
            <div>📹</div>
            <h3>CCTV Installation</h3>
            <p>
              Professional camera installation
              and complete wiring setup.
            </p>
          </div>

          <div className="security-service-card">
            <div>🔐</div>
            <h3>Access Control</h3>
            <p>
              Biometric, smart card and
              secure access systems.
            </p>
          </div>

          <div className="security-service-card">
            <div>🚪</div>
            <h3>Video Door Phone</h3>
            <p>
              Monitor and communicate with
              visitors safely.
            </p>
          </div>

          <div className="security-service-card">
            <div>🚨</div>
            <h3>Alarm Systems</h3>
            <p>
              Advanced alarm and emergency
              security solutions.
            </p>
          </div>

          <div className="security-service-card">
            <div>📱</div>
            <h3>Remote Monitoring</h3>
            <p>
              Access your CCTV cameras
              from anywhere.
            </p>
          </div>

          <div className="security-service-card">
            <div>🔧</div>
            <h3>AMC & Maintenance</h3>
            <p>
              Regular maintenance and
              professional technical support.
            </p>
          </div>

        </div>

      </section>


      {/* =====================================================
          INSTALLATION
      ===================================================== */}

      <section
        className="installation-section"
        id="installation"
      >

        <div className="installation-content">

          <div>

            <span className="section-label">
              PROFESSIONAL INSTALLATION
            </span>

            <h2>
              Complete CCTV
              <span>Installation Service</span>
            </h2>

            <p>
              Our professionals handle everything
              from camera positioning and wiring
              to DVR configuration and mobile
              monitoring setup.
            </p>

          </div>


          <div className="installation-list">

            <div>
              <span>✓</span>
              Home CCTV Installation
            </div>

            <div>
              <span>✓</span>
              Office Security Setup
            </div>

            <div>
              <span>✓</span>
              Shop & Commercial Installation
            </div>

            <div>
              <span>✓</span>
              Mobile Monitoring Setup
            </div>

            <div>
              <span>✓</span>
              DVR / NVR Configuration
            </div>

            <div>
              <span>✓</span>
              Maintenance & Repair
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="why-security">

        <div className="section-title">

          <span>
            WHY CHOOSE US
          </span>

          <h2>
            Security You Can Trust
          </h2>

        </div>


        <div className="why-grid">

          <div>
            <strong>01</strong>
            <h3>Experienced Professionals</h3>
            <p>
              Skilled technicians for reliable
              installation and support.
            </p>
          </div>

          <div>
            <strong>02</strong>
            <h3>Advanced Technology</h3>
            <p>
              Modern CCTV and surveillance
              solutions.
            </p>
          </div>

          <div>
            <strong>03</strong>
            <h3>Affordable Pricing</h3>
            <p>
              Professional security solutions
              at competitive prices.
            </p>
          </div>

          <div>
            <strong>04</strong>
            <h3>24/7 Support</h3>
            <p>
              Quick response whenever you
              need technical assistance.
            </p>
          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="security-cta">

        <div>

          <span>
            YOUR SECURITY, OUR RESPONSIBILITY
          </span>

          <h2>
            Protect What Matters Most.
          </h2>

          <p>
            Call us today for a free consultation
            and security assessment.
          </p>

        </div>

        <div className="cta-right">

          <strong>
            +91 99584 24916
          </strong>

          <button
            onClick={() => {
              window.location.href =
                "tel:+919958424916";
            }}
          >
            Call For Free Consultation
          </button>

        </div>

      </section>


      {msg && (
        <div className="cctv-message">
          {msg}
        </div>
      )}


      <Footer />

    </div>
  );
};

export default CCTVPage;