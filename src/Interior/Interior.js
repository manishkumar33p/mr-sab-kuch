
import React, { useEffect, useMemo, useState } from "react";
import "./Interior.css";

// import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Marvv99 from "../marvv99.mp4";

import marv13 from "../marv13.jpg";
import marv14 from "../marv14.jpg";
import marv16 from "../marv16.jpg";
import marv17 from "../marv17.jpg";
import marv18 from "../marv18.jpg";
import marv19 from "../marv19.jpg";
import marv20 from "../marv20.jpg";
import marv21 from "../marv21.jpg";
import marv22 from "../marv22.jpg";
import marv23 from "../marv23.jpg";
import marv24 from "../marv24.jpg";
import marv25 from "../marv25.jpg";
import marv26 from "../marv26.jpg";
import marv27 from "../marv27.jpg";
import marv28 from "../marv28.jpg";
import marv29 from "../marv29.jpg";
import marv30 from "../marv30.jpg";
import marv31 from "../marv31.jpg";
import marv32 from "../marv32.jpg";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";
/* =========================
   INTERIOR PRODUCTS
========================= */

const interiorItems = [
  {
    id: 1,
    name: "Modern Sofa Set",
    category: "Furniture",
    price: 45000,
    image: marv13,
  },
  {
    id: 2,
    name: "Wall Panel Design",
    category: "Wall Design",
    price: 12500,
    image: marv14,
  },
  {
    id: 3,
    name: "Wooden Flooring",
    category: "Flooring",
    price: 90000,
    image: marv16,
  },
  {
    id: 4,
    name: "Printed Wallpaper",
    category: "Wallpaper",
    price: 8500,
    image: marv17,
  },
  {
    id: 5,
    name: "False Ceiling Work",
    category: "Ceiling",
    price: 55000,
    image: marv18,
  },
  {
    id: 6,
    name: "PVC Ceiling Panels",
    category: "Ceiling",
    price: 35000,
    image: marv19,
  },
  {
    id: 7,
    name: "Vinyl Flooring",
    category: "Flooring",
    price: 28000,
    image: marv20,
  },
  {
    id: 8,
    name: "Designer Blinds",
    category: "Decor",
    price: 6500,
    image: marv21,
  },
  {
    id: 9,
    name: "Luxury Bedroom Set",
    category: "Furniture",
    price: 120000,
    image: marv22,
  },
  {
    id: 10,
    name: "Premium Floor Tiles",
    category: "Flooring",
    price: 40000,
    image: marv23,
  },
  {
    id: 11,
    name: "Artificial Turf",
    category: "Garden",
    price: 18000,
    image: marv24,
  },
  {
    id: 12,
    name: "Wall Tiles Design",
    category: "Wall Design",
    price: 22000,
    image: marv25,
  },
  {
    id: 13,
    name: "Roller Blinds",
    category: "Decor",
    price: 7500,
    image: marv26,
  },
  {
    id: 14,
    name: "Luxury Paint Service",
    category: "Painting",
    price: 15000,
    image: marv27,
  },
  {
    id: 15,
    name: "Wall Art Painting",
    category: "Decor",
    price: 25000,
    image: marv28,
  },
  {
    id: 16,
    name: "PVC Marble Sheet",
    category: "Wall Design",
    price: 60000,
    image: marv29,
  },
  {
    id: 17,
    name: "Grid Ceiling Tiles",
    category: "Ceiling",
    price: 32000,
    image: marv30,
  },
  {
    id: 18,
    name: "LED Ceiling Design",
    category: "Ceiling",
    price: 70000,
    image: marv31,
  },
  {
    id: 19,
    name: "Wooden Temple",
    category: "Decor",
    price: 18500,
    image: marv32,
  },
  {
    id: 20,
    name: "Modular Kitchen",
    category: "Kitchen",
    price: 180000,
    image: marv13,
  },
];

/* =========================
   INTERIOR SERVICES
========================= */

const interiorServices = [
  {
    id: 101,
    title: "Complete Home Interior",
    category: "Home Interior",
    description:
      "Complete interior planning, furniture, ceiling, flooring, walls and decoration.",
    icon: "🏠",
  },
  {
    id: 102,
    title: "Modular Kitchen",
    category: "Kitchen",
    description:
      "Modern modular kitchen design with cabinets, storage and premium finishing.",
    icon: "🍳",
  },
  {
    id: 103,
    title: "False Ceiling",
    category: "Ceiling",
    description:
      "POP, gypsum, PVC and designer false ceiling solutions with LED lighting.",
    icon: "💡",
  },
  {
    id: 104,
    title: "Wallpaper & Wall Design",
    category: "Wall Design",
    description:
      "Premium wallpapers, wall panels, PVC marble sheets and designer walls.",
    icon: "🧱",
  },
  {
    id: 105,
    title: "Flooring Solutions",
    category: "Flooring",
    description:
      "Wooden, vinyl, tiles and premium flooring solutions for homes and offices.",
    icon: "🏢",
  },
  {
    id: 106,
    title: "Bedroom Interior",
    category: "Bedroom",
    description:
      "Luxury bedroom furniture, wardrobes, wall design and lighting solutions.",
    icon: "🛏️",
  },
  {
    id: 107,
    title: "Living Room Interior",
    category: "Living Room",
    description:
      "Modern living room furniture, TV units, wall panels and decorative designs.",
    icon: "🛋️",
  },
  {
    id: 108,
    title: "Office Interior",
    category: "Commercial",
    description:
      "Professional office interior planning, furniture and complete execution.",
    icon: "💼",
  },
  {
    id: 109,
    title: "Painting & Decoration",
    category: "Painting",
    description:
      "Premium painting, texture, wall art and complete decoration services.",
    icon: "🎨",
  },
  {
    id: 110,
    title: "Blinds & Curtains",
    category: "Decor",
    description:
      "Designer blinds, curtains and complete window decoration solutions.",
    icon: "🪟",
  },
  {
    id: 111,
    title: "Garden & Outdoor",
    category: "Garden",
    description:
      "Artificial grass, outdoor decoration and garden improvement solutions.",
    icon: "🌿",
  },
  {
    id: 112,
    title: "Commercial Interior",
    category: "Commercial",
    description:
      "Showroom, office, restaurant and commercial space interior solutions.",
    icon: "🏬",
  },
];

/* =========================
   COMPONENT
========================= */

const Interior = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [cart, setCart] = useState([]);

  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    requirement: "",
    budget: "",
    date: "",
  });

  const [message, setMessage] = useState("");

  /* =========================
     LOAD SAVED CUSTOMER
  ========================= */

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);

    const savedCustomer =
      JSON.parse(localStorage.getItem("interiorCustomer")) || null;

    if (savedCustomer) {
      setCustomer((prev) => ({
        ...prev,
        ...savedCustomer,
      }));
    }
  }, []);

  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredItems = useMemo(() => {
    return interiorItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  /* =========================
     ADD TO CART
  ========================= */

  const addToCart = (item) => {
    const cartItem = {
      ...item,
      type: "interior-product",
      cartId: Date.now(),
    };

    const updatedCart = [...cart, cartItem];

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    showMessage(`${item.name} added to cart`);
  };

  /* =========================
     OPEN INQUIRY
  ========================= */

  const openInquiry = (item) => {
    setSelectedInquiry(item);

    if (!customer.requirement) {
      setCustomer((prev) => ({
        ...prev,
        requirement:
          item.title ||
          item.name ||
          "",
      }));
    }
  };

  /* =========================
     CLOSE INQUIRY
  ========================= */

  const closeInquiry = () => {
    setSelectedInquiry(null);
  };

  /* =========================
     INPUT CHANGE
  ========================= */

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     SUBMIT INQUIRY
  ========================= */

 const submitInquiry = async (e) => {
  e.preventDefault();

  if (
    !customer.name.trim() ||
    !customer.phone.trim() ||
    !customer.location.trim() ||
    !customer.requirement.trim()
  ) {
    showMessage(
      "Please fill Name, Mobile, Location and Requirement."
    );
    return;
  }

  try {
    const inquiry = {
      // Dashboard compatible fields
      orderId: "INT-" + Date.now(),

      date:
        customer.date ||
        new Date().toLocaleDateString("en-IN"),

      customerName: customer.name.trim(),

      phone: customer.phone.trim(),

      email: customer.email.trim(),

      // Dashboard address structure
      address: {
        street: customer.location.trim(),
        addressLine2: "",
        city: customer.location.trim(),
        district: "",
        state: "",
        country: "India",
        pincode: "",
      },

      // Interior-specific information
      service:
        selectedInquiry?.title ||
        selectedInquiry?.name ||
        "Interior Consultation",

      category:
        selectedInquiry?.category ||
        "Interior",

      requirement:
        customer.requirement.trim(),

      budget:
        customer.budget || "",

      preferredDate:
        customer.date || "",

      source: "Interior Page",

      inquiryType:
        selectedInquiry?.title ===
        "Complete Interior Consultation"
          ? "Free Consultation"
          : "Interior Inquiry",

      status: "New",

      // Dashboard-compatible items
      items: [
        {
          name:
            selectedInquiry?.title ||
            selectedInquiry?.name ||
            "Interior Consultation",

          price: 0,
        },
      ],

      total: 0,

      createdAt: serverTimestamp(),
    };

    // ===============================
    // SAVE TO FIREBASE DASHBOARD
    // ===============================

    await addDoc(
      collection(db, "inquiries"),
      inquiry
    );

    // Save customer locally for next inquiry
    localStorage.setItem(
      "interiorCustomer",
      JSON.stringify(customer)
    );

    // Also keep local history if needed
    const oldInquiries =
      JSON.parse(
        localStorage.getItem("interiorInquiries")
      ) || [];

    localStorage.setItem(
      "interiorInquiries",
      JSON.stringify([
        {
          ...inquiry,
          createdAt:
            new Date().toISOString(),
        },
        ...oldInquiries,
      ])
    );

    // Close popup
    setSelectedInquiry(null);

    // Success message
    showMessage(
      "Inquiry submitted successfully! Our team will contact you."
    );

  } catch (error) {
    console.error(
      "Interior inquiry Firebase error:",
      error
    );

    showMessage(
      "Inquiry submit nahi ho payi. Please try again."
    );
  }
};

  /* =========================
     MESSAGE
  ========================= */

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="interior-page">

      {/* <NavBar /> */}

      {/* ================= HERO ================= */}

      <section className="interior-hero">

        <video
          className="interior-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src={Marvv99}
            type="video/mp4"
          />
        </video>

        <div className="interior-hero-overlay"></div>

        <div className="interior-hero-content">

          <span className="interior-tag">
            NISS INTERIOR SOLUTIONS
          </span>

          <h1>
            Transform Your Space
            <span> Into Your Dream Interior</span>
          </h1>

          <p>
            Complete Interior Design & Execution
            for Homes, Offices, Kitchens,
            Bedrooms, Living Rooms & Commercial Spaces.
          </p>

          <div className="hero-buttons">

            <button
              onClick={() =>
                openInquiry({
                  title: "Complete Interior Consultation",
                  category: "Interior",
                })
              }
            >
              Get Free Consultation
            </button>

            <a href="#interior-services">
              Explore Services
            </a>

          </div>

          <div className="hero-features">

            <div>
              <strong>✓</strong>
              Professional Designers
            </div>

            <div>
              <strong>✓</strong>
              Quality Materials
            </div>

            <div>
              <strong>✓</strong>
              Complete Execution
            </div>

            <div>
              <strong>✓</strong>
              Transparent Pricing
            </div>

          </div>

        </div>

      </section>

      {/* ================= MESSAGE ================= */}

      {message && (
        <div className="interior-message">
          {message}
        </div>
      )}

      {/* ================= SERVICES ================= */}

      <section
        className="interior-services"
        id="interior-services"
      >

        <div className="section-heading">

          <span>WHAT WE PROVIDE</span>

          <h2>
            Complete Interior Services
          </h2>

          <p>
            From design to execution, we handle
            your complete interior project.
          </p>

        </div>

        <div className="interior-services-grid">

          {interiorServices.map((service) => (

            <div
              className="interior-service-card"
              key={service.id}
            >

              <div className="service-icon">
                {service.icon}
              </div>

              <span className="service-category">
                {service.category}
              </span>

              <h3>
                {service.title}
              </h3>

              <p>
                {service.description}
              </p>

              <button
                onClick={() =>
                  openInquiry(service)
                }
              >
                Get Inquiry →
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* ================= PRODUCTS ================= */}

      <section className="interior-products">

        <div className="section-heading">

          <span>INTERIOR COLLECTION</span>

          <h2>
            Our Interior Products
          </h2>

          <p>
            Choose products or send an inquiry
            for customized interior work.
          </p>

        </div>

        {/* FILTER */}

        <div className="interior-filter">

          <input
            type="text"
            placeholder="Search interior products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option value="All">
              All Categories
            </option>

            <option value="Furniture">
              Furniture
            </option>

            <option value="Wall Design">
              Wall Design
            </option>

            <option value="Flooring">
              Flooring
            </option>

            <option value="Wallpaper">
              Wallpaper
            </option>

            <option value="Ceiling">
              Ceiling
            </option>

            <option value="Decor">
              Decor
            </option>

            <option value="Kitchen">
              Kitchen
            </option>

            <option value="Garden">
              Garden
            </option>

            <option value="Painting">
              Painting
            </option>

          </select>

        </div>

        {/* PRODUCT GRID */}

        <div className="interior-products-grid">

          {filteredItems.map((item) => (

            <div
              className="interior-product-card"
              key={item.id}
            >

              <div className="product-image-wrapper">

                <img
                  src={item.image}
                  alt={item.name}
                />

                <span>
                  {item.category}
                </span>

              </div>

              <div className="interior-product-info">

                <h3>
                  {item.name}
                </h3>

                <p className="product-description">
                  Premium quality interior solution
                  with professional finishing.
                </p>

                <div className="product-bottom">

                  <strong>
                    ₹ {item.price.toLocaleString()}
                  </strong>

                  <small>
                    Starting Price
                  </small>

                </div>

                <div className="product-buttons">

                  <button
                    className="cart-btn"
                    onClick={() =>
                      addToCart(item)
                    }
                  >
                    Add To Cart
                  </button>

                  <button
                    className="inquiry-btn"
                    onClick={() =>
                      openInquiry(item)
                    }
                  >
                    Inquiry
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {filteredItems.length === 0 && (
          <div className="no-products">
            No interior product found.
          </div>
        )}

      </section>

      {/* ================= WHY US ================= */}

      <section className="why-interior">

        <div className="section-heading">

          <span>WHY NISS INTERIORS</span>

          <h2>
            Why Choose Us?
          </h2>

        </div>

        <div className="why-grid">

          <div>
            <div>🏆</div>
            <h3>Experienced Team</h3>
            <p>
              Professional designers and
              experienced execution team.
            </p>
          </div>

          <div>
            <div>🎨</div>
            <h3>Custom Designs</h3>
            <p>
              Designs customized according
              to your space and requirements.
            </p>
          </div>

          <div>
            <div>💰</div>
            <h3>Transparent Pricing</h3>
            <p>
              Clear quotation with no
              unnecessary hidden charges.
            </p>
          </div>

          <div>
            <div>🛠️</div>
            <h3>Complete Execution</h3>
            <p>
              Design, material, installation
              and finishing under one team.
            </p>
          </div>

          <div>
            <div>⏱️</div>
            <h3>On-Time Work</h3>
            <p>
              Planned execution with proper
              project timelines.
            </p>
          </div>

          <div>
            <div>🤝</div>
            <h3>Customer Support</h3>
            <p>
              Dedicated support from inquiry
              to project completion.
            </p>
          </div>

        </div>

      </section>

      {/* ================= INQUIRY CTA ================= */}

      <section className="interior-cta">

        <div>

          <span>
            HAVE AN INTERIOR PROJECT?
          </span>

          <h2>
            Let's Build Your Dream Space
          </h2>

          <p>
            Share your requirement with our
            team and get a customized quotation.
          </p>

        </div>

        <button
          onClick={() =>
            openInquiry({
              title: "Interior Project Inquiry",
              category: "General",
            })
          }
        >
          Send Inquiry
        </button>

      </section>

      {/* ================= CART INFO ================= */}

      <section className="interior-cart-info">

        <div>
          🛒
        </div>

        <div>

          <h3>
            Your Interior Cart
          </h3>

          <p>
            {cart.length} item
            {cart.length !== 1 ? "s" : ""} added
          </p>

        </div>

        <a href="/cart">
          View Cart →
        </a>

      </section>

      <Footer />

      {/* ================= INQUIRY MODAL ================= */}

      {selectedInquiry && (

        <div
          className="inquiry-modal-overlay"
          onClick={closeInquiry}
        >

          <div
            className="inquiry-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={closeInquiry}
            >
              ×
            </button>

            <div className="modal-heading">

              <span>
                NISS INTERIOR
              </span>

              <h2>
                Send Your Inquiry
              </h2>

              <p>
                {selectedInquiry.title ||
                  selectedInquiry.name}
              </p>

            </div>

            <form onSubmit={submitInquiry}>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Your Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={customer.name}
                    onChange={
                      handleCustomerChange
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Mobile Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter mobile number"
                    value={customer.phone}
                    onChange={
                      handleCustomerChange
                    }
                  />

                </div>

              </div>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={customer.email}
                    onChange={
                      handleCustomerChange
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Location *
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="City / Area"
                    value={customer.location}
                    onChange={
                      handleCustomerChange
                    }
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Interior Requirement *
                </label>

                <textarea
                  name="requirement"
                  rows="3"
                  placeholder="Tell us about your interior requirement..."
                  value={customer.requirement}
                  onChange={
                    handleCustomerChange
                  }
                />

              </div>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Approx Budget
                  </label>

                  <select
                    name="budget"
                    value={customer.budget}
                    onChange={
                      handleCustomerChange
                    }
                  >

                    <option value="">
                      Select Budget
                    </option>

                    <option value="Below ₹50,000">
                      Below ₹50,000
                    </option>

                    <option value="₹50,000 - ₹1 Lakh">
                      ₹50,000 - ₹1 Lakh
                    </option>

                    <option value="₹1 Lakh - ₹3 Lakh">
                      ₹1 Lakh - ₹3 Lakh
                    </option>

                    <option value="₹3 Lakh - ₹5 Lakh">
                      ₹3 Lakh - ₹5 Lakh
                    </option>

                    <option value="₹5 Lakh+">
                      ₹5 Lakh+
                    </option>

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Preferred Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={customer.date}
                    onChange={
                      handleCustomerChange
                    }
                  />

                </div>

              </div>

              <button
                className="submit-inquiry"
                type="submit"
              >
                Submit Inquiry →
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Interior;