// import React, { useState, useEffect } from "react";
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaClock } from "react-icons/fa";
// import "./Footer.css";

// import {  FaPhone, FaEnvelope } from 'react-icons/fa';
// const Footer = () => {
//   const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <footer className="footer">
//       <div className="footer__overlay"></div>

//       <div className="footer__container">

//         {/* LEFT SECTION */}
//         <div className="footer__left">
//           <h2>NISS TECHNOLOGIES</h2>

//           <p className="footer__text">
//             Building smart digital solutions for modern businesses with innovation and trust.
//           </p>


//            <div className="footer__time">
//             <FaClock />
//             <span>{currentTime}</span>
//           </div>

// <div className="contact-card">
//                            <div> <p>📞 +91 9958424916</p></div> 
//       <p>✉ technologiesniss@gmail.com.com</p>
//       <p>📍 122 A Gandhinagar,Ghaziabad , Uttar Pradesh</p>
//                         </div>

                      


 
         
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="footer__right">
//           <h3>Connect With Us</h3>

//           <div className="footer__socials">
//             <a href="/packages" target="_blank" rel="noreferrer">
//               <FaFacebookF />
//             </a>

//             <a href="/buy" target="_blank" rel="noreferrer">
//               <FaInstagram />
//             </a>

//             <a href="/buy" target="_blank" rel="noreferrer">
//               <FaLinkedinIn />
//             </a>
//           </div>

//           <p className="footer__copyright">
//             © {new Date().getFullYear()} New India Software Solutions Pvt Ltd
//           </p>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaArrowUp,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-IN")
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-IN"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="niss-footer">

      {/* TOP LINE */}
      <div className="niss-footer-line"></div>

      <div className="niss-footer-container">

        {/* ================= LEFT ================= */}
        <div className="niss-footer-brand">

          <div className="niss-footer-logo">
            NISS
          </div>

          <div className="niss-footer-brand-text">
            <h2>NISS TECHNOLOGY</h2>

            <span>
              NEW INDIA SOFTWARE SOLUTIONS
            </span>
          </div>

          <p className="niss-footer-description">
            Building smart digital solutions and reliable
            services for modern businesses, organizations
            and individuals.
          </p>

          {/* TIME */}
          <div className="niss-footer-time">
            <FaClock />
            <span>Local Time: {currentTime}</span>
          </div>

        </div>

        {/* ================= SERVICES ================= */}
        <div className="niss-footer-column">

          <h3>Our Services</h3>

          <ul>
            <li>Software Development</li>
            <li>Digital Marketing</li>
            <li>Interior Design</li>
            <li>Property Services</li>
            <li>Security Solutions</li>
            <li>NISS QuickFix</li>
          </ul>

        </div>

        {/* ================= CONTACT ================= */}
        <div className="niss-footer-column niss-footer-contact">

          <h3>Contact Us</h3>

          <a
            href="tel:+919958424916"
            className="niss-footer-contact-item"
          >
            <span className="niss-footer-contact-icon">
              <FaPhone />
            </span>

            <span>
              <small>Call Us</small>
              +91 9958424916
            </span>
          </a>

          <a
            href="mailto:technologiesniss@gmail.com"
            className="niss-footer-contact-item"
          >
            <span className="niss-footer-contact-icon">
              <FaEnvelope />
            </span>

            <span>
              <small>Email</small>
              technologiesniss@gmail.com
            </span>
             <span>
              <small>Email</small>
              info@nisstechnology.com
            </span>
          </a>

          <div className="niss-footer-contact-item">
            <span className="niss-footer-contact-icon">
              <FaMapMarkerAlt />
            </span>

            <span>
              <small>Office</small>
              122 A Gandhinagar,
              Ghaziabad, Uttar Pradesh
            </span>
          </div>

        </div>

        {/* ================= CONNECT ================= */}
        <div className="niss-footer-column niss-footer-connect">

          <h3>Connect With Us</h3>

          <p>
            Follow NISS Technology and stay connected
            with our latest updates.
          </p>

          <div className="niss-footer-socials">

            <a
              href="https://www.facebook.com/profile.php?id=61593512231484#"
              aria-label="Facebook"
              className="niss-footer-social facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/nisstechnology/"
              aria-label="Instagram"
              className="niss-footer-social instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="#linkedin"
              aria-label="LinkedIn"
              className="niss-footer-social linkedin"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://wa.me/919958424916"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="niss-footer-social whatsapp"
            >
              <FaWhatsapp />
            </a>

          </div>

          <button
            type="button"
            className="niss-footer-top-button"
            onClick={scrollToTop}
          >
            Back To Top
            <FaArrowUp />
          </button>

        </div>

      </div>

      {/* ================= BOTTOM ================= */}
      <div className="niss-footer-bottom">

        <div className="niss-footer-bottom-container">

          <p>
            © {new Date().getFullYear()} NISS Technology.
            All Rights Reserved.
          </p>

          <div className="niss-footer-bottom-links">
            <span>Trusted Services</span>
            <span>•</span>
            <span>Quality Solutions</span>
            <span>•</span>
            <span>Customer First</span>
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;