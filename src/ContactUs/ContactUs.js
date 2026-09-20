import React, { useState, useRef } from "react";
import "./ContactUs.css";
import Footer from "../Footer/Footer";

import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaCheckCircle,
} from "react-icons/fa";

import emailjs from "@emailjs/browser";
import MarvVideo from "../marvv3.mp4";

const ContactUs = () => {
  const form = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const services = [
    "Software Development",
    "Website Development",
    "Mobile App Development",
    "E-Commerce Development",
    "Digital Marketing",
    "SEO Services",
    "Social Media Marketing",
    "Graphic Design",
    "Data Entry Services",
    "CCTV & Surveillance",
    "Interior Design & Services",
    "Plumbing Services",
    "Carpenter Services",
    "Security Guard Services",
    "Teacher / Tutor Services",
    "Tailor Services",
    "Catering Services",
    "Laundry Services",
    "Property - Buy / Sell",
    "Property - Rent / PG",
    "Tent Decoration",
    "Event Management",
    "Quick Service / Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setConfirmationMessage("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sending) return;

    if (!formData.name.trim()) {
      setConfirmationMessage("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      setConfirmationMessage("Please enter your email.");
      return;
    }

    if (!formData.phone.trim()) {
      setConfirmationMessage("Please enter your mobile number.");
      return;
    }

    if (!formData.service) {
      setConfirmationMessage("Please select a service.");
      return;
    }

    if (!formData.message.trim()) {
      setConfirmationMessage("Please enter your requirement.");
      return;
    }

    setSending(true);
    setConfirmationMessage("");
    setSuccess(false);

    const enquiry = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    /* SAVE DATA LOCALLY */
    try {
      const existingData =
        JSON.parse(localStorage.getItem("contactData")) || [];

      localStorage.setItem(
        "contactData",
        JSON.stringify([...existingData, enquiry])
      );
    } catch (error) {
      console.log("Local storage error:", error);
    }

    /* SEND EMAIL */
    try {
      await emailjs.sendForm(
        "service_av098v7",
        "template_zfanfmp",
        form.current,
        "dKgJCNwJ0irTaeaZ1"
      );

      setSuccess(true);

      setConfirmationMessage(
        "Your enquiry has been sent successfully! Our team will contact you soon."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.log("EmailJS Error:", error);

      setSuccess(false);

      setConfirmationMessage(
        "Your enquiry has been saved. Email service is temporarily unavailable. Please contact us on WhatsApp."
      );
    }

    setSending(false);
  };

  return (
    <div className="contact-page">

      {/* ================= VIDEO BACKGROUND ================= */}

      <div className="contact-video-wrapper">
        <video
          className="contact-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={MarvVideo} type="video/mp4" />
        </video>

        <div className="contact-overlay"></div>
      </div>

      {/* ================= HERO ================= */}

      <section className="contact-hero">

        <div className="contact-hero-content">

          <span className="contact-tag">
            NISS TECHNOLOGY
          </span>

          <h1>
            Let's Build
            <span> Something Amazing</span>
          </h1>

          <p>
            Tell us what you need and our team will help you
            with the right solution for your business or personal
            requirement.
          </p>

          <div className="contact-trust">

            <div>
              <FaCheckCircle />
              <span>Professional Team</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Quick Response</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Reliable Services</span>
            </div>

          </div>

        </div>

      </section>

      {/* ================= MAIN CONTACT ================= */}

      <section className="contact-main">

        {/* ================= LEFT SIDE ================= */}

        <div className="contact-left">

          <div className="contact-heading">

            <span>GET IN TOUCH</span>

            <h2>
              We're Here To Help
            </h2>

            <p>
              Have a project, service requirement or business
              enquiry? Select your requirement and send us a message.
            </p>

          </div>

          <div className="contact-cards">

            {/* ADDRESS */}

            <div className="contact-card">

              <div className="contact-icon-box">
                <FaMapMarkerAlt />
              </div>

              <div className="contact-card-content">

                <h3>Our Office</h3>

                <p>
                  Ground Floor, 122A, New Gandhi Nagar,
                  Ghaziabad, Uttar Pradesh 201001
                </p>

              </div>

            </div>

            {/* PHONE */}

            <div className="contact-card">

              <div className="contact-icon-box">
                <FaPhone />
              </div>

              <div className="contact-card-content">

                <h3>Call Us</h3>

                <a href="tel:+919958424916">
                  +91 99584 24916
                </a>

              </div>

            </div>

            {/* EMAIL */}

            <div className="contact-card">

              <div className="contact-icon-box">
                <FaEnvelope />
              </div>

              <div className="contact-card-content">

                <h3>Email Us</h3>

                <a href="mailto:technologiesniss@gmail.com">
                  technologiesniss@gmail.com<br></br>
                  info@nisstechnology.com
                </a>

              </div>

            </div>

            {/* WHATSAPP */}

            <div className="contact-card">

              <div className="contact-icon-box whatsapp-icon">
                <FaWhatsapp />
              </div>

              <div className="contact-card-content">

                <h3>WhatsApp</h3>

                <p>
                  Quick response on WhatsApp
                </p>

                <a
                  href="https://wa.me/919958424916"
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-link"
                >
                  Chat With Us →
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT FORM ================= */}

        <div className="contact-right">

          <form
            ref={form}
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >

            <div className="form-title">

              <span>CONTACT US</span>

              <h2>
                Send Your Enquiry
              </h2>

              <p>
                Fill in your details and tell us what you need.
              </p>

            </div>

            {/* NAME */}

            <div className="form-group">

              <label htmlFor="name">
                Your Name *
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />

            </div>

            {/* EMAIL + PHONE */}

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="email">
                  Email Address *
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />

              </div>

              <div className="form-group">

                <label htmlFor="phone">
                  Mobile Number *
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength="10"
                  required
                />

              </div>

            </div>

            {/* SERVICE */}

            <div className="form-group">

              <label htmlFor="service">
                Select Your Requirement *
              </label>

              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >

                <option value="">
                  -- Select Service --
                </option>

                {services.map((service, index) => (
                  <option
                    key={index}
                    value={service}
                  >
                    {service}
                  </option>
                ))}

              </select>

            </div>

            {/* MESSAGE */}

            <div className="form-group">

              <label htmlFor="message">
                Your Message *
              </label>

              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Tell us about your requirement..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

            </div>

            {/* EMAILJS SUBJECT */}

            <input
              type="hidden"
              name="subject"
              value={`New Enquiry - ${formData.service}`}
              readOnly
            />

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="contact-submit"
              disabled={sending}
            >

              {sending ? (
                <>
                  <span className="loading-spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Enquiry →
                </>
              )}

            </button>

            {/* MESSAGE */}

            {confirmationMessage && (
              <div
                className={
                  success
                    ? "confirmation-message success"
                    : "confirmation-message"
                }
              >

                <FaCheckCircle />

                <span>
                  {confirmationMessage}
                </span>

              </div>
            )}

            {/* WHATSAPP */}

            <div className="form-bottom">

              <FaWhatsapp />

              <span>
                Prefer WhatsApp?
                <a
                  href="https://wa.me/919958424916"
                  target="_blank"
                  rel="noreferrer"
                >
                  Chat With Us
                </a>
              </span>

            </div>

          </form>

        </div>

      </section>

      {/* ================= SERVICES ================= */}

      <section className="contact-services">

        <div className="contact-services-title">

          <span>OUR SERVICES</span>

          <h2>
            How Can We Help You?
          </h2>

        </div>

        <div className="contact-service-grid">

          <div>💻 Software Development</div>
          <div>📱 App Development</div>
          <div>📢 Digital Marketing</div>
          <div>🏠 Interior Services</div>
          <div>📹 CCTV Solutions</div>
          <div>🏘️ Property Services</div>
          <div>🛡️ Security Services</div>
          <div>🎪 Event Management</div>

        </div>

      </section>

      <Footer />

    </div>
  );
};

export default ContactUs;



// import React, { useState } from "react";
// import emailjs from "@emailjs/browser";
// import "./ContactUs.css";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     service: "",
//     message: "",
//   });

//   const [sending, setSending] = useState(false);
//   const [statusMessage, setStatusMessage] = useState("");
//   const [statusType, setStatusType] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((previousData) => ({
//       ...previousData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.phone ||
//       !formData.service ||
//       !formData.message
//     ) {
//       setStatusType("error");
//       setStatusMessage("Please fill in all fields.");
//       return;
//     }

//     setSending(true);
//     setStatusMessage("");
//     setStatusType("");

//     const subject = `New Enquiry - ${formData.service}`;

//     const contactRecord = {
//       ...formData,
//       subject,
//       date: new Date().toLocaleString("en-IN"),
//     };

//     try {
//       // Save enquiry in browser localStorage
//       const existingRecords =
//         JSON.parse(localStorage.getItem("contactData")) || [];

//       localStorage.setItem(
//         "contactData",
//         JSON.stringify([...existingRecords, contactRecord])
//       );

//       // EmailJS template variables
//       const templateParams = {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         service: formData.service,
//         message: formData.message,
//         subject: subject,
//         reply_to: formData.email,
//       };

//       // Send email through EmailJS
//       await emailjs.send(
//         "service_3z8pkj1",
//         "template_zfanfmp",
//         templateParams,
//         "dKgJCNwJ0irTaeaZ1"
//       );

//       setStatusType("success");
//       setStatusMessage(
//         "Your enquiry has been sent successfully. We will contact you soon."
//       );

//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         service: "",
//         message: "",
//       });
//     } catch (error) {
//       console.error("EmailJS Error:", error);

//       setStatusType("warning");
//       setStatusMessage(
//         "Your enquiry has been saved, but email service is temporarily unavailable."
//       );
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <section className="contact-section" id="contact">
//       <div className="contact-container">
//         <div className="contact-heading">
//           <h2>Contact Us</h2>
//           <p>
//             Have a project or requirement? Send us your details.
//           </p>
//         </div>

//         <form className="contact-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="phone">Phone Number</label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               placeholder="Enter your phone number"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="service">Select Service</label>
//             <select
//               id="service"
//               name="service"
//               value={formData.service}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select a service</option>
//               <option value="Website Development">
//                 Website Development
//               </option>
//               <option value="Google Ads">Google Ads</option>
//               <option value="Meta Ads">Meta Ads</option>
//               <option value="SEO">SEO</option>
//               <option value="Google Business Profile">
//                 Google Business Profile
//               </option>
//               <option value="Social Media Marketing">
//                 Social Media Marketing
//               </option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="message">Your Requirement</label>
//             <textarea
//               id="message"
//               name="message"
//               rows="5"
//               placeholder="Write your requirement..."
//               value={formData.message}
//               onChange={handleChange}
//               required
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             className="contact-submit-btn"
//             disabled={sending}
//           >
//             {sending ? "Sending..." : "Send Enquiry"}
//           </button>

//           {statusMessage && (
//             <p className={`contact-status ${statusType}`}>
//               {statusMessage}
//             </p>
//           )}
//         </form>
//       </div>
//     </section>
//   );
// };

// export default ContactUs;