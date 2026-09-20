import React from "react";
import { NavLink } from "react-router-dom";
import "./Industry.css";

const industries = [
  {
    icon: "💻",
    title: "Technology & Software",
    text: "Modern websites, web applications, mobile applications, business software, automation and digital solutions."
  },
  {
    icon: "📈",
    title: "Digital Marketing",
    text: "SEO, social media marketing, advertising, branding, lead generation and complete digital growth solutions."
  },
  {
    icon: "🏠",
    title: "Interior & Home Services",
    text: "Interior design, furniture, carpenter services, renovation and other home improvement solutions."
  },
  {
    icon: "🏗️",
    title: "Construction & Real Estate",
    text: "Technology-driven solutions for construction, property services, contractors and real estate businesses."
  },
  {
    icon: "🛒",
    title: "E-Commerce & Retail",
    text: "Online selling, marketplace solutions, product promotion, customer management and digital commerce."
  },
  {
    icon: "👕",
    title: "Fashion & Lifestyle",
    text: "Fashion products, lifestyle businesses, branding, online presence and digital sales solutions."
  },
  {
    icon: "🤖",
    title: "AI & Automation",
    text: "AI-powered solutions, business automation, customer management and intelligent digital workflows."
  },
  {
    icon: "🚚",
    title: "Logistics & Services",
    text: "Connecting customers with reliable service providers and creating efficient service delivery systems."
  },
  {
    icon: "🏢",
    title: "Business Services",
    text: "Business solutions, consulting, lead generation, digital transformation and growth support."
  }
];

const steps = [
  ["A", "Awareness", "Customer discovers our platform."],
  ["B", "Browse", "Customer explores available services."],
  ["C", "Customer", "Customer creates an account using mobile number."],
  ["D", "Discover", "Customer finds the required service."],
  ["E", "Enquiry", "Requirement is submitted."],
  ["F", "Find", "Relevant professionals are identified."],
  ["G", "Get Quote", "Customer receives suitable quotation."],
  ["H", "Hire", "Customer selects the professional."],
  ["I", "Initiate", "The work or service begins."],
  ["J", "Job Tracking", "Customer can track the service."],
  ["K", "Keep Records", "Bookings and history remain in the account."],
  ["L", "Loyalty", "Satisfied customers return for more services."]
];

function Industry() {
  return (
    <div className="industry-page">

      {/* ================= HERO ================= */}
      <section className="industry-hero">

        <div className="industry-hero-overlay"></div>

        <div className="industry-hero-content">

          <span className="industry-badge">
            OUR INDUSTRIES
          </span>

          <h1>
            Building The Future,
            <br />
            <span>Across Industries</span>
          </h1>

          <p>
            Technology, services, businesses and customers —
            connected through one powerful digital ecosystem.
          </p>

          <div className="industry-hero-buttons">
            <NavLink to="/contact" className="industry-btn primary">
              Start With Us
            </NavLink>

            <a href="#industries" className="industry-btn secondary">
              Explore Industries
            </a>
          </div>

        </div>

      </section>


      {/* ================= CEO VISION ================= */}
      <section className="ceo-vision-section">

        <div className="industry-container">

          <div className="ceo-grid">

            <div className="ceo-content">

              <span className="section-label">
                OUR VISION
              </span>

              <h2>
                One Vision.
                <br />
                <span>Multiple Possibilities.</span>
              </h2>

              <p className="ceo-intro">
                The idea started with a simple question:
                <strong>
                  Why should customers and businesses have to
                  depend on different platforms for every need?
                </strong>
              </p>

              <p>
                <strong>Manish Kumar Singh, Founder & CEO,</strong>
                envisioned a connected ecosystem where technology
                can bring customers, professionals and businesses
                together.
              </p>

              <p>
                The objective is not simply to build another website.
                The long-term vision is to create a platform where
                technology becomes the bridge between real-world
                services and people.
              </p>

              <div className="ceo-signature">
                <strong>Manish Kumar Singh</strong>
                <span>Founder & CEO</span>
              </div>

            </div>


            <div className="vision-card">

              <div className="vision-circle">
                <span>VISION</span>
              </div>

              <div className="vision-points">

                <div>
                  <b>01</b>
                  <span>Connect</span>
                </div>

                <div>
                  <b>02</b>
                  <span>Digitize</span>
                </div>

                <div>
                  <b>03</b>
                  <span>Empower</span>
                </div>

                <div>
                  <b>04</b>
                  <span>Grow</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= INDUSTRIES ================= */}
      <section
        className="industries-section"
        id="industries"
      >

        <div className="industry-container">

          <div className="section-heading">

            <span className="section-label">
              WHAT WE DO
            </span>

            <h2>
              Industries We
              <span> Work With</span>
            </h2>

            <p>
              We are building solutions across multiple industries,
              combining technology, marketing, services and business
              opportunities.
            </p>

          </div>


          <div className="industries-grid">

            {industries.map((industry, index) => (

              <div
                className="industry-card"
                key={index}
              >

                <div className="industry-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="industry-icon">
                  {industry.icon}
                </div>

                <h3>{industry.title}</h3>

                <p>{industry.text}</p>

                <div className="industry-arrow">
                  →
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= ECOSYSTEM ================= */}
      <section className="ecosystem-section">

        <div className="industry-container">

          <div className="section-heading light">

            <span className="section-label">
              OUR ECOSYSTEM
            </span>

            <h2>
              From Customer
              <span> To Professional</span>
            </h2>

            <p>
              A connected ecosystem designed to make service
              discovery, booking and delivery simple.
            </p>

          </div>


          <div className="ecosystem-flow">

            <div className="eco-box">
              <span>👤</span>
              <strong>Customer</strong>
              <small>Requirement</small>
            </div>

            <div className="eco-line">→</div>

            <div className="eco-box">
              <span>🌐</span>
              <strong>Platform</strong>
              <small>Technology</small>
            </div>

            <div className="eco-line">→</div>

            <div className="eco-box">
              <span>👨‍🔧</span>
              <strong>Professional</strong>
              <small>Service</small>
            </div>

            <div className="eco-line">→</div>

            <div className="eco-box">
              <span>⭐</span>
              <strong>Experience</strong>
              <small>Feedback</small>
            </div>

          </div>

        </div>

      </section>


      {/* ================= CUSTOMER LOGIN ================= */}
      <section className="customer-section">

        <div className="industry-container">

          <div className="customer-grid">

            <div>

              <span className="section-label">
                ONE CUSTOMER ACCOUNT
              </span>

              <h2>
                One Number.
                <br />
                <span>Multiple Services.</span>
              </h2>

              <p>
                Our future platform is designed around a simple
                customer experience. A customer can register using
                their mobile number and access their complete
                service journey from one account.
              </p>

              <div className="customer-features">

                <div>✓ Mobile OTP Login</div>
                <div>✓ Personal Profile</div>
                <div>✓ Previous Enquiries</div>
                <div>✓ Bookings & Orders</div>
                <div>✓ Service History</div>
                <div>✓ Reviews & Ratings</div>

              </div>

            </div>


            <div className="phone-card">

              <div className="phone-top">
                <span></span>
                <b>Customer Account</b>
                <span>⋮</span>
              </div>

              <div className="phone-user">
                <div className="user-avatar">
                  MK
                </div>

                <div>
                  <strong>Customer</strong>
                  <small>+91 XXXXX XXXXX</small>
                </div>
              </div>

              <div className="phone-menu">

                <div>
                  <span>📋</span>
                  My Enquiries
                </div>

                <div>
                  <span>📅</span>
                  My Bookings
                </div>

                <div>
                  <span>🛠️</span>
                  My Services
                </div>

                <div>
                  <span>⭐</span>
                  Reviews
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= A TO Z ================= */}
      <section className="journey-section">

        <div className="industry-container">

          <div className="section-heading">

            <span className="section-label">
              CUSTOMER JOURNEY
            </span>

            <h2>
              How The
              <span> Ecosystem Works</span>
            </h2>

          </div>


          <div className="journey-grid">

            {steps.map((step, index) => (

              <div
                className="journey-card"
                key={index}
              >

                <div className="journey-letter">
                  {step[0]}
                </div>

                <div>
                  <h3>{step[1]}</h3>
                  <p>{step[2]}</p>
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= BUSINESS MODEL ================= */}
      <section className="business-model-section">

        <div className="industry-container">

          <div className="section-heading light">

            <span className="section-label">
              BUSINESS MODEL
            </span>

            <h2>
              Creating Value For
              <span> Everyone</span>
            </h2>

          </div>


          <div className="revenue-grid">

            <div className="revenue-card">
              <span>01</span>
              <h3>Service Commission</h3>
              <p>
                Revenue through successful service bookings.
              </p>
            </div>

            <div className="revenue-card">
              <span>02</span>
              <h3>Lead Generation</h3>
              <p>
                Connecting businesses with qualified customers.
              </p>
            </div>

            <div className="revenue-card">
              <span>03</span>
              <h3>Subscription</h3>
              <p>
                Premium plans for professionals and businesses.
              </p>
            </div>

            <div className="revenue-card">
              <span>04</span>
              <h3>Software & SaaS</h3>
              <p>
                Digital tools for business management and growth.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= ROADMAP ================= */}
      <section className="roadmap-section">

        <div className="industry-container">

          <div className="section-heading">

            <span className="section-label">
              THE ROAD AHEAD
            </span>

            <h2>
              From One Idea
              <span> To An Ecosystem</span>
            </h2>

          </div>


          <div className="roadmap">

            <div className="roadmap-item">
              <span>01</span>
              <h3>Digital Services</h3>
              <p>
                Software, websites and digital marketing.
              </p>
            </div>

            <div className="roadmap-item">
              <span>02</span>
              <h3>Service Network</h3>
              <p>
                Connecting customers with professionals.
              </p>
            </div>

            <div className="roadmap-item">
              <span>03</span>
              <h3>Customer Platform</h3>
              <p>
                Login, booking, orders and service history.
              </p>
            </div>

            <div className="roadmap-item">
              <span>04</span>
              <h3>Business Platform</h3>
              <p>
                Vendor dashboard, CRM and lead management.
              </p>
            </div>

            <div className="roadmap-item">
              <span>05</span>
              <h3>Multi-Industry Marketplace</h3>
              <p>
                Multiple industries under one ecosystem.
              </p>
            </div>

            <div className="roadmap-item">
              <span>06</span>
              <h3>AI Powered Ecosystem</h3>
              <p>
                Intelligent automation and smart recommendations.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="industry-cta">

        <div className="industry-container">

          <span className="section-label">
            THE JOURNEY HAS STARTED
          </span>

          <h2>
            We Are Building
            <br />
            <span>The Future Together.</span>
          </h2>

          <p>
            Think Digital. Build Better. Grow Together.
          </p>

          <NavLink
            to="/contact"
            className="industry-btn primary"
          >
            Connect With Us →
          </NavLink>

          <div className="ceo-final">
            <strong>Manish Kumar Singh</strong>
            <span>Founder & CEO</span>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Industry;