
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import "./About.css";
import { NavLink } from "react-router-dom";
import CustomerLogin from "../CustomerLogin/CustomerLogin";
import MarvVideo2 from "../marvv3.mp4";

import MarvImage from "../marv.jpg";
import Marv1Image from "../marv1.jpeg";
import Marv2Image from "../marv2.jpeg";
import Marv3Image from "../marv3.jpeg";

import Marv5Image from "../marv5.jpg";
import Marv6Image from "../marv6.jpg";
import Marv7Image from "../marv7.png";
import Marv8Image from "../marv8.jpg";
import Marv9Image from "../marv9.png";
import Marv10Image from "../marv10.jpg";
import Marv11Image from "../marv11.jpg";
import Marv12Image from "../marv12.png";

import Marv55Image from "../marv55.jpeg";
import Marv56Image from "../marv56.jpeg";
import Marv57Image from "../marv57.jpeg";

import WhatsAppLogo from "../whatsapp-logo.jfif";
import N from "../N.jpeg";
import DeepakImage from "../Deepak.jpeg";

import logo27 from "../logo27.png";
import logo28 from "../logo28.jpeg";
import logo33 from "../logo33.png";
// import CustomerLogin from './CustomerLogin/CustomerLogin';

/* =====================================================
   PARTNER LOGOS
===================================================== */

const partnerLogos = [
  {
    src: Marv5Image,
    alt: "Partner 1",
    link: "#",
  },
  {
    src: Marv6Image,
    alt: "Partner 2",
    link: "#",
  },
  {
    src: Marv7Image,
    alt: "Partner 3",
    link: "#",
  },
  {
    src: Marv8Image,
    alt: "Partner 4",
    link: "#",
  },
  {
    src: Marv9Image,
    alt: "Partner 5",
    link: "#",
  },
  {
    src: Marv10Image,
    alt: "Partner 6",
    link: "#",
  },
  {
    src: Marv11Image,
    alt: "Partner 7",
    link: "#",
  },
];


/* =====================================================
   CAROUSEL IMAGES
===================================================== */

const carouselImages = [
  MarvImage,
  Marv1Image,
  Marv2Image,
  Marv3Image,
];


/* =====================================================
   SERVICES
===================================================== */

const services = [
  {
    path: "/plumbing",
    icon: "🔧",
    color: "green",
    title: "NISS QUICKFIX",
    subtitle: "(EXPERT SERVICES)",
    items: [
      "Plumbing",
      "Electrical",
      "AC Repair & Service",
      "Carpentry & Painting",
      "Cleaning & More",
    ],
    loginRequired: true,
  },

  {
    path: "/cctv",
    icon: "🛡",
    color: "purple",
    title: "SECURITY SOLUTIONS",
    items: [
      "CCTV Installation",
      "Biometric & Access Control",
      "Video Door Phone",
      "Smart Security Systems",
      "AMC & Maintenance",
    ],
    loginRequired: true,
  },

  {
    path: "/interior",
    icon: "🛋",
    color: "cyan",
    title: "INTERIOR DESIGN",
    items: [
      "Residential Interior",
      "Commercial Interior",
      "Modular Kitchen",
      "3D Design & Visualization",
      "Turnkey Projects",
    ],
    loginRequired: true,
  },

  {
    path: "/laundry",
    icon: "🧺",
    color: "dark-blue",
    title: "LAUNDRY SERVICES",
    items: [
      "Washing & Dry Cleaning",
      "Steam Ironing",
      "Stain Removal",
      "Pickup & Delivery",
      "Bulk Laundry",
    ],
    loginRequired: true,
  },

  {
    path: "/security",
    icon: "👮",
    color: "navy",
    title: "SECURITY GUARD SERVICES",
    items: [
      "Trained Security Guards",
      "Event Security",
      "Corporate Security",
      "Residential Security",
      "24/7 Protection",
    ],
    loginRequired: true,
  },

  {
    path: "/events",
    icon: "🎪",
    color: "pink",
    title: "TENT DECORATION & EVENT MANAGEMENT",
    items: [
      "Wedding & Party Décor",
      "Stage & Venue Decoration",
      "Canopy, Tents & Lighting",
      "Theme Decoration",
      "Event Management",
    ],
    loginRequired: true,
  },

  {
    path: "/catering",
    icon: "🍽",
    color: "red-orange",
    title: "CATERING SERVICES",
    items: [
      "Wedding Catering",
      "Corporate Catering",
      "Birthday & Party Catering",
      "Food for Events",
      "Hygienic & Delicious Food",
    ],
    loginRequired: true,
  },

  {
    path: "/property",
    icon: "🏠",
    color: "property-blue",
    title: "PROPERTY SERVICES",
    items: [
      "Property Buy & Sell",
      "Residential & Commercial",
      "Property for Rent",
      "PG & Rental Rooms",
      "Property Consultation",
    ],
    loginRequired: true,
  },
];


/* =====================================================
   ABOUT COMPONENT
===================================================== */

const About = () => {

  /* ===================================================
     CUSTOMER LOGIN
  =================================================== */

  const [showCustomerLogin, setShowCustomerLogin] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [customerSaved, setCustomerSaved] = useState(false);


  /* ===================================================
     CONSULTANT POPUP
  =================================================== */

  const [showConsultant, setShowConsultant] = useState(false);

  const [submitted, setSubmitted] = useState(false);


  /* ===================================================
     CAROUSEL
  =================================================== */

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isHovered, setIsHovered] = useState(false);


  /* ===================================================
     LOAD SAVED CUSTOMER
  =================================================== */

  useEffect(() => {

    const savedCustomer = localStorage.getItem(
      "niss_customer"
    );

    if (savedCustomer) {

      try {

        const customer = JSON.parse(savedCustomer);

        if (customer.name && customer.phone) {

          setCustomerName(customer.name);
          setCustomerPhone(customer.phone);
          setCustomerSaved(true);

        }

      } catch (error) {

        console.log("Customer data error:", error);

      }

    }

  }, []);


  /* ===================================================
     FIRST VISIT POPUP
  =================================================== */

  useEffect(() => {

    const savedCustomer = localStorage.getItem(
      "niss_customer"
    );

    if (!savedCustomer) {

      const timer = setTimeout(() => {

        setShowCustomerLogin(true);

      }, 1200);

      return () => clearTimeout(timer);

    }

  }, []);


  /* ===================================================
     LISTEN FOR CONSULTANT EVENT
  =================================================== */

  useEffect(() => {

    const openQuotePopup = () => {

      if (customerSaved) {

        setShowConsultant(true);

      } else {

        setShowCustomerLogin(true);

      }

    };

    window.addEventListener(
      "open-consultant-popup",
      openQuotePopup
    );

    return () => {

      window.removeEventListener(
        "open-consultant-popup",
        openQuotePopup
      );

    };

  }, [customerSaved]);


  /* ===================================================
     SAVE CUSTOMER
  =================================================== */

  const handleCustomerLogin = (e) => {

    e.preventDefault();

    const name = customerName.trim();
    const phone = customerPhone.trim();

    if (!name) {

      alert("Please enter your name.");

      return;

    }

    if (!/^[0-9]{10}$/.test(phone)) {

      alert("Please enter a valid 10 digit mobile number.");

      return;

    }


    const customerData = {
      name,
      phone,
    };


    localStorage.setItem(
      "niss_customer",
      JSON.stringify(customerData)
    );


    setCustomerName(name);
    setCustomerPhone(phone);

    setCustomerSaved(true);

    setShowCustomerLogin(false);

  };


  /* ===================================================
     OPEN SERVICE
  =================================================== */

  const handleServiceClick = (service, e) => {

  /*
   * Customer login required
   */

  if (service.loginRequired && !customerSaved) {

    e.preventDefault();

    /*
     * जिस service पर customer ने click किया
     * उसे याद रखेंगे
     */

    localStorage.setItem(
      "nissSelectedService",
      JSON.stringify({
        title: service.title,
        path: service.path,
        selectedAt: new Date().toISOString(),
      })
    );

    setShowCustomerLogin(true);

    return;
  }

  /*
   * Customer already logged in है
   */

  localStorage.setItem(
    "nissSelectedService",
    JSON.stringify({
      title: service.title,
      path: service.path,
      selectedAt: new Date().toISOString(),
    })
  );
};


  /* ===================================================
     CAROUSEL AUTO PLAY
  =================================================== */

  useEffect(() => {

    if (isHovered) return;

    const id = setInterval(() => {

      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + 1) % carouselImages.length
      );

    }, 10000);

    return () => clearInterval(id);

  }, [isHovered]);


  /* ===================================================
     NEXT
  =================================================== */

  const handleNext = () => {

    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1) % carouselImages.length
    );

  };


  /* ===================================================
     PREVIOUS
  =================================================== */

  const handlePrevious = () => {

    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselImages.length) %
        carouselImages.length
    );

  };


  /* ===================================================
     CONSULTANT SUBMIT
  =================================================== */

  const handleConsultantSubmit = (e) => {
  e.preventDefault();

  const form = e.currentTarget;

  const name = customerName.trim();
  const phone = customerPhone.trim();

  const email = form.elements.email.value.trim();
  const address = form.elements.address.value.trim();
  const service = form.elements.service.value;
  const requirement = form.elements.requirement.value.trim();
  const budget = form.elements.budget.value;
  const date = form.elements.date.value;
  const time = form.elements.time.value;

  /*
   * ==========================================
   * CUSTOMER ENQUIRY DATA
   * ==========================================
   */

  const enquiry = {
    id: Date.now(),

    name,
    phone,

    email,
    address,
    service,
    requirement,
    budget,
    date,
    time,

    submittedAt: new Date().toISOString(),
  };

  /*
   * ==========================================
   * SAVE TO LOCAL STORAGE
   * ==========================================
   */

  const existingEnquiries =
    JSON.parse(
      localStorage.getItem("nissEnquiries")
    ) || [];

  existingEnquiries.push(enquiry);

  localStorage.setItem(
    "nissEnquiries",
    JSON.stringify(existingEnquiries)
  );

  /*
   * ==========================================
   * WHATSAPP MESSAGE
   * ==========================================
   */

  const message = `
*NEW FREE CONSULTANT REQUEST*

Name: ${name}
Phone: ${phone}
Email: ${email}

Address:
${address}

Service Required:
${service}

Requirement:
${requirement}

Budget:
${budget}

Preferred Date:
${date}

Preferred Time:
${time}
`;

  const whatsappURL =
    `https://wa.me/919958424916?text=${encodeURIComponent(message)}`;

  /*
   * ==========================================
   * OPEN WHATSAPP
   * ==========================================
   */

  window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );

  /*
   * ==========================================
   * SUCCESS
   * ==========================================
   */

  setSubmitted(true);

  setTimeout(() => {
    setSubmitted(false);
    setShowConsultant(false);
  }, 1500);
};
  /* ===================================================
     OLD FORM
  =================================================== */

  const handleSubmit = (e) => {

    e.preventDefault();

    const form = e.currentTarget;

    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const phone = form.elements.phone.value;


    console.log(
      "Site Visit Request:",
      {
        name,
        email,
        phone,
      }
    );


    const message = `
*SITE VISIT REQUEST*

Name: ${name}
Email: ${email}
Phone: ${phone}
`;


    const whatsappURL =
      `https://wa.me/919958424916?text=${encodeURIComponent(message)}`;


    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );


    form.reset();

  };


  /* ===================================================
     OPEN CONSULTANT
  =================================================== */

  const openConsultant = () => {

    if (!customerSaved) {

      setShowCustomerLogin(true);

      return;

    }

    setShowConsultant(true);

  };


  /* ===================================================
     RENDER
  =================================================== */

  return (

    <div className="niss-about-page">


      {/* =================================================
          CUSTOMER LOGIN POPUP
      ================================================= */}

      {showCustomerLogin && (

        <div className="niss-customer-overlay">

          <div className="niss-customer-modal">

            <button
              type="button"
              className="niss-customer-close"
              onClick={() => setShowCustomerLogin(false)}
            >
              ×
            </button>


            <div className="niss-customer-icon">
              👤
            </div>


            <h2>
              Welcome to NISS Technology
            </h2>


            <p>
              Please enter your details once to continue.
            </p>


            <form
              onSubmit={handleCustomerLogin}
              className="niss-customer-form"
            >

              <label>
                Your Name
              </label>

              <input
                type="text"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
                placeholder="Enter your name"
                required
              />


              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                value={customerPhone}
                onChange={(e) =>
                  setCustomerPhone(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10)
                  )
                }
                placeholder="Enter 10 digit mobile number"
                maxLength="10"
                required
              />


              <button
                type="submit"
                className="niss-customer-submit"
              >
                Continue →
              </button>

            </form>


            <small>
              Your details will be remembered on this device
              so you don't have to enter them again.
            </small>

          </div>

        </div>

      )}



      {/* {/* =================================================
          CONSULTANT POPUP
      ================================================= */}

      {showConsultant && (

        <div
          className="niss-consultant-overlay"
          onClick={() =>
            setShowConsultant(false)
          }
        >

          <div
            className="niss-consultant-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="niss-consultant-close"
              onClick={() =>
                setShowConsultant(false)
              }
            >
              ×
            </button> 


            <div className="niss-consultant-header">

              <h2>
                Free Consultation
              </h2>

              <p>
                Tell us about your requirement and
                our expert will contact you.
              </p>

            </div>


            {submitted ? (

              <div className="niss-consultant-success">

                <div className="niss-success-icon">
                  ✓
                </div>

                <h3>
                  Request Submitted!
                </h3>

                <p>
                  Your consultation request has been
                  sent successfully.
                </p>

              </div>

            ) : (

              <form
                className="niss-consultant-form"
                onSubmit={handleConsultantSubmit}
              >


                {/* SAVED CUSTOMER */}

                <div className="niss-saved-customer">

                  <div>
                    <strong>
                      {customerName}
                    </strong>

                    <span>
                      {customerPhone}
                    </span>
                  </div>

                  <span className="niss-verified">
                    ✓ Saved
                  </span>

                </div>


                <div className="niss-form-row">

                  <div className="niss-form-field">

                    <label>
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      required
                    />

                  </div>


                  <div className="niss-form-field">

                    <label>
                      Service Required *
                    </label>

                    <select
                      name="service"
                      required
                    >

                      <option value="">
                        Select Service
                      </option>

                      <option value="IT Consulting">
                        IT Consulting
                      </option>

                      <option value="Security Solutions">
                        Security Solutions
                      </option>

                      <option value="Interior Design">
                        Interior Design
                      </option>

                      <option value="Property Services">
                        Property Services
                      </option>

                      <option value="Laundry Services">
                        Laundry Services
                      </option>

                      <option value="Security Guard Services">
                        Security Guard Services
                      </option>

                      <option value="Event Management">
                        Event Management
                      </option>

                      <option value="Catering Services">
                        Catering Services
                      </option>

                      <option value="NISS QuickFix">
                        NISS QuickFix
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>

                </div>


                <div className="niss-form-field">

                  <label>
                    Full Address *
                  </label>

                  <textarea
                    name="address"
                    rows="3"
                    placeholder="Enter your complete address"
                    required
                  />

                </div>


                <div className="niss-form-field">

                  <label>
                    Your Requirement *
                  </label>

                  <textarea
                    name="requirement"
                    rows="4"
                    placeholder="Please explain your requirement..."
                    required
                  />

                </div>


                <div className="niss-form-row">

                  <div className="niss-form-field">

                    <label>
                      Estimated Budget
                    </label>

                    <select name="budget">

                      <option value="">
                        Select Budget
                      </option>

                      <option value="Below ₹10,000">
                        Below ₹10,000
                      </option>

                      <option value="₹10,000 - ₹25,000">
                        ₹10,000 - ₹25,000
                      </option>

                      <option value="₹25,000 - ₹50,000">
                        ₹25,000 - ₹50,000
                      </option>

                      <option value="₹50,000 - ₹1,00,000">
                        ₹50,000 - ₹1,00,000
                      </option>

                      <option value="₹1,00,000+">
                        ₹1,00,000+
                      </option>

                    </select>

                  </div>


                  <div className="niss-form-field">

                    <label>
                      Preferred Date *
                    </label>

                    <input
                      type="date"
                      name="date"
                      required
                    />

                  </div>

                </div>


                <div className="niss-form-field">

                  <label>
                    Preferred Time *
                  </label>

                  <select
                    name="time"
                    required
                  >

                    <option value="">
                      Select Time
                    </option>

                    <option value="10:00 AM - 12:00 PM">
                      10:00 AM - 12:00 PM
                    </option>

                    <option value="12:00 PM - 2:00 PM">
                      12:00 PM - 2:00 PM
                    </option>

                    <option value="2:00 PM - 4:00 PM">
                      2:00 PM - 4:00 PM
                    </option>

                    <option value="4:00 PM - 6:00 PM">
                      4:00 PM - 6:00 PM
                    </option>

                    <option value="6:00 PM - 8:00 PM">
                      6:00 PM - 8:00 PM
                    </option>

                  </select>

                </div>


                <button
                  type="submit"
                  className="niss-consultant-submit"
                >
                  Submit Request →
                </button>

              </form>

            )}

          </div>

        </div>

      )}



      {/* =================================================
          NAVBAR
      ================================================= */}
{/* 
      <div className="niss-navbar">

        <div className="niss-logo">

          <img
            src={logo27}
            alt="NISS Technologies"
          />

        </div>

        <div className="niss-mobile-menu">
          ☰
        </div>

      </div> */}



      {/* =================================================
          HERO
      ================================================= */}

      <section className="niss-hero">

        <div className="niss-hero-content">

          <div className="niss-hero-kicker">
            ONE COMPANY.
          </div>

          <h1>
            MULTIPLE SOLUTIONS.
            <br />
            <span>
              ENDLESS POSSIBILITIES.
            </span>
          </h1>

          <p>
            NISS Technology is your trusted partner
            for technology, services and solutions
            that help your business grow, scale and succeed.
          </p>


          <div className="niss-hero-buttons">

            {/* <button
              type="button"
              className="niss-services-btn"
              onClick={openConsultant}
            >
              Free Consultant
            </button> */}

            <button
  type="button"
  className="niss-services-btn"
  onClick={() =>
    window.dispatchEvent(
      new Event("open-consultant-popup")
    )
  }
>
  Free Consultant
</button>


            <a
              href="https://wa.me/919958424916"
              target="_blank"
              rel="noreferrer"
              className="niss-whatsapp-btn"
            >
              <span>◉</span>
              Chat on WhatsApp
            </a>

          </div>

        </div>


        <div className="niss-hero-building-area">

          <div className="niss-building-orange"></div>

          <div className="niss-building-blue"></div>


          <div className="niss-building-wrapper">

            <img
              src={logo33}
              alt="NISS Technologies"
              className="niss-building"
            />

          </div>


          <div className="niss-trusted-badge">

            <div className="niss-trusted-icon">
              ♧
            </div>

            <div className="niss-trusted-title">
              TRUSTED BY
            </div>

            <div className="niss-trusted-text">
              BUSINESSES &<br />
              INDIVIDUALS<br />
              ACROSS INDIA
            </div>

          </div>

        </div>

      </section>



      {/* =================================================
          SERVICES
      ================================================= */}

      <section className="niss-services-section">

        <div className="niss-section-heading">

          <span></span>

          <h2>
            WHAT WE PROVIDE
          </h2>

          <span></span>

        </div>


        <div className="niss-services-grid">


          {/* SOFTWARE DEVELOPMENT
              NO LOGIN
          */}

          <a
            href="https://www.klikdigisetu.com/"
            className="niss-service-card"
          >

            <div className="niss-service-icon blue">
              ⌨
            </div>

            <div>

              <h3>
                SOFTWARE DEVELOPMENT
              </h3>

              <ul>
                <li>Custom Software Development</li>
                <li>Web & Mobile Apps</li>
                <li>SaaS Development</li>
                <li>AI & IT Solutions</li>
                <li>IT Consulting</li>
              </ul>

            </div>

          </a>



          {/* DIGITAL MARKETING
              NO LOGIN
          */}

          <a
            href="https://www.klikdigisetu.com/"
            className="niss-service-card"
          >

            <div className="niss-service-icon orange">
              📣
            </div>

            <div>

              <h3>
                DIGITAL MARKETING
              </h3>

              <ul>
                <li>SEO</li>
                <li>Social Media Marketing</li>
                <li>Google Ads & Meta Ads</li>
                <li>Branding & Design</li>
                <li>Lead Generation</li>
              </ul>

            </div>

          </a>



          {/* OTHER SERVICES */}

          {services.map((service) => (

            <NavLink
              key={service.path}
              to={service.path}
              className="niss-service-card"
              onClick={(e) =>
                handleServiceClick(service, e)
              }
            >

              <div
                className={`niss-service-icon ${service.color}`}
              >
                {service.icon}
              </div>

              <div>

                <h3>
                  {service.title}
                </h3>

                {service.subtitle && (
                  <small>
                    {service.subtitle}
                  </small>
                )}

                <ul>

                  {service.items.map(
                    (item, index) => (

                      <li key={index}>
                        {item}
                      </li>

                    )
                  )}

                </ul>

              </div>

            </NavLink>

          ))}

        </div>

      </section>



      {/* =================================================
          WHY CHOOSE US
      ================================================= */}

      <section className="niss-why-section">

        <h2>
          WHY CHOOSE NISS TECHNOLOGY?
        </h2>


        <div className="niss-why-grid">

          <div>
            <span>🛡</span>
            <strong>
              Trusted<br />
              & Reliable
            </strong>
          </div>

          <div>
            <span>👥</span>
            <strong>
              Expert<br />
              Professionals
            </strong>
          </div>

          <div>
            <span>🏅</span>
            <strong>
              Quality<br />
              Assurance
            </strong>
          </div>

          <div>
            <span>⏱</span>
            <strong>
              On-Time<br />
              Delivery
            </strong>
          </div>

          <div>
            <span>📈</span>
            <strong>
              Growth Driven<br />
              Solutions
            </strong>
          </div>

        </div>

      </section>



      {/* =================================================
          CAROUSEL
      ================================================= */}

      <section
        className="niss-carousel-container"
        onMouseEnter={() =>
          setIsHovered(true)
        }
        onMouseLeave={() =>
          setIsHovered(false)
        }
      >

        <div className="niss-carousel">

          <img
            src={carouselImages[currentIndex]}
            alt="NISS Technologies"
          />


          <div className="niss-carousel-note">

            <h3>
              Welcome to NISS Technology!
            </h3>

            <p>
              END TO END ALL SOLUTIONS
            </p>

           <button
  type="button"
  onClick={() =>
    window.dispatchEvent(
      new Event("open-consultant-popup")
    )
  }
>
  ENQUIRY
</button>

          </div>


          <div className="niss-carousel-controls">

            <button
              type="button"
              onClick={handlePrevious}
            >
              ❮
            </button>

            <button
              type="button"
              onClick={handleNext}
            >
              ❯
            </button>

          </div>


          <div className="niss-carousel-dots">

            {carouselImages.map(
              (_, index) => (

                <span
                  key={index}
                  className={
                    currentIndex === index
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCurrentIndex(index)
                  }
                ></span>

              )
            )}

          </div>

        </div>

      </section>



      {/* =================================================
          ABOUT
      ================================================= */}

      <section className="niss-about-container">

        <div className="niss-about-content">

          <div className="niss-about-image">

            <img
              src={Marv2Image}
              alt="About NISS Technologies"
            />

          </div>


          <div className="niss-about-text">

            <h1>
              About Us
            </h1>

            <p>
              NISS Technology is a multi-service company
              dedicated to providing innovative solutions in
              Software Development, Property Buying & Selling,
              Rental Services, PG Accommodation, Interior Design,
              and Modified Laptop Solutions. Our mission is to
              deliver quality, trust, and modern services that
              simplify life and help our clients grow with confidence.
            </p>

          </div>

        </div>

      </section>



      {/* =================================================
          VIDEO + SITE VISIT
      ================================================= */}

      <section className="niss-video-container">

        <video
          className="niss-fullscreen-video"
          autoPlay
          loop
          muted
          playsInline
        >

          <source
            src={MarvVideo2}
            type="video/mp4"
          />

        </video>


        <div className="niss-contact-overlay">

          <div className="niss-contact-section">

            <h2>
              Book a free site visit now
            </h2>


            <form
              onSubmit={handleSubmit}
              className="niss-site-form"
            >

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                defaultValue={
                  customerSaved
                    ? customerName
                    : ""
                }
                required
              />


              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />


              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                defaultValue={
                  customerSaved
                    ? customerPhone
                    : ""
                }
                readOnly={customerSaved}
                required
              />


              <button
                type="submit"
              >
                Submit
              </button>

            </form>

          </div>

        </div>

      </section>



      {/* =================================================
          PARTNERS
      ================================================= */}

      <section className="niss-partners-section">

        <h2>
          Our Partners
        </h2>


        <div className="niss-partners-wrapper">

          <div className="niss-partners-logos">

            {partnerLogos.map(
              (partner, index) => (

                <a
                  key={index}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  <img
                    src={partner.src}
                    alt={partner.alt}
                  />

                </a>

              )
            )}

          </div>

        </div>

      </section>



      {/* =================================================
          TEAM
      ================================================= */}

      {/* <section className="niss-team-section">

        <h2>
          Meet Our Team
        </h2>


       


           


          <div className="niss-team-member">

    


          <div className="niss-team-member">

            <img
              src={Marv57Image}
              alt="Manish Kumar Singh"
            />

            <h4>
             Manish Kumar Singh
            </h4>

            <p>
              CEO, NISS Technology
            </p>



            <img
              src={Marv55Image}
              alt="Vibhash Vaibhav"
            />

            <h4>
              Shubham Pandey
            </h4>

            <p>
              COO, NISS Technology
            </p>


          </div>


          <div className="niss-team-member">

            <img
              src={N}
              alt="K.R. Roushan"
            />

            <h4>
              K.R. ROUSHAN
            </h4>

            <p>
              CBO, NISS Technology
            </p>

          </div>
 <div className="niss-team-member">

            <img
              src={DeepakImage}
              alt="K.R. Roushan"
            />

            <h4>
              Mr. Deepak Kumar
            </h4>

            <p>
              Business Head, NISS Technology
            </p>

          </div>
        </div>

      </section> */}

<section className="niss-team-section">

  <h2>
    Meet Our Team
  </h2>

  <div className="niss-team-members">

    {/* MANISH */}
    <div className="niss-team-member">

      <img
        src={Marv57Image}
        alt="Manish Kumar Singh"
      />

      <h4>
        Manish Kumar Singh
      </h4>

      <p>
        CEO, NISS Technology
      </p>

    </div>


    {/* SHUBHAM */}
    <div className="niss-team-member">

      <img
        src={Marv55Image}
        alt="Shubham Pandey"
      />

      <h4>
        Shubham Pandey
      </h4>

      <p>
        COO, NISS Technology
      </p>

    </div>


    {/* K.R. ROUSHAN */}
    <div className="niss-team-member">

      <img
        src={N}
        alt="K.R. Roushan"
      />

      <h4>
        K.R. ROUSHAN
      </h4>

      <p>
        CBO, NISS Technology
      </p>

    </div>


    {/* DEEPAK */}
    <div className="niss-team-member">

      <img
        src={DeepakImage}
        alt="Mr. Deepak Kumar"
      />

      <h4>
        Mr. Deepak Nigam
      </h4>

      <p>
        Business Head, NISS Technology
      </p>

    </div>

  </div>

</section>

      {/* =================================================
          TESTIMONIALS
      ================================================= */}

      <section className="niss-testimonials-section">

        <h2>
          What Our Clients Say
        </h2>


        <div className="niss-testimonials-row">


          <div className="niss-testimonial">

            <img
              src={Marv12Image}
              alt="Client"
            />

            <p>
              "The interior design services we received
              were beyond our expectations!"
            </p>

            <h4>
              Hemanth Kumar
            </h4>

            <span>
              CEO, Tech Innovations
            </span>

          </div>


          <div className="niss-testimonial">

            <img
              src={Marv11Image}
              alt="Client"
            />

            <p>
              "Marv helped us redesign our office space.
              The atmosphere is now much more comfortable."
            </p>

            <h4>
             Ashish Kumar
            </h4>

            <span>
              Founder, Innovate Solutions
            </span>

          </div>


          <div className="niss-testimonial">

            <img
              src={Marv10Image}
              alt="Client"
            />

            <p>
              "We love our new living room design!
              The attention to detail was exceptional."
            </p>

            <h4>
              Rahul Bhalla
            </h4>

            <span>
              Client
            </span>

          </div>


          <div className="niss-testimonial">

            <img
              src={Marv9Image}
              alt="Client"
            />

            <p>
              "The team at Marv is a pleasure to work with.
              Their designs are modern and functional."
            </p>

            <h4>
              Jitennder Singh
            </h4>

            <span>
              Homeowner
            </span>

          </div>

        </div>

      </section>



      {/* =================================================
          FLOATING WHATSAPP
      ================================================= */}

      <div className="niss-whatsapp-floating">

        <a
          href="https://wa.me/9958424913?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
        >

          <img
            src={WhatsAppLogo}
            alt="WhatsApp"
          />

          <span>
            Let's Chat on WhatsApp
          </span>

        </a>

      </div>


      <Footer />

    </div>

  );

};

export default About;