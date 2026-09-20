import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

import "./GlobalConsultantPopup.css";

const GlobalConsultantPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    requirement: "",
    budget: "",
    date: "",
    time: "",
  });

  /*
  =========================================
  GLOBAL OPEN EVENT
  =========================================
  */

  useEffect(() => {
    const openPopup = () => {
      setShowPopup(true);
    };

    window.addEventListener(
      "open-consultant-popup",
      openPopup
    );

    return () => {
      window.removeEventListener(
        "open-consultant-popup",
        openPopup
      );
    };
  }, []);

  /*
  =========================================
  INPUT CHANGE
  =========================================
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  =========================================
  CLOSE
  =========================================
  */

  const closePopup = () => {
    if (saving) return;

    setShowPopup(false);
  };

  /*
  =========================================
  SUBMIT
  =========================================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    try {
      setSaving(true);

      /*
      ======================================
      SAVE TO FIREBASE
      ======================================
      */

      await addDoc(
        collection(db, "consultantRequests"),
        {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          service: formData.service,
          requirement: formData.requirement.trim(),
          budget: formData.budget,
          date: formData.date,
          time: formData.time,

          status: "New",

          createdAt: serverTimestamp(),
        }
      );

      /*
      ======================================
      WHATSAPP
      ======================================
      */

      const message = `
*NEW FREE CONSULTANT REQUEST*

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

Address:
${formData.address}

Service:
${formData.service}

Requirement:
${formData.requirement}

Budget:
${formData.budget}

Preferred Date:
${formData.date}

Preferred Time:
${formData.time}
`;

      const whatsappURL =
        `https://wa.me/919958424916?text=${encodeURIComponent(
          message
        )}`;

      window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

      /*
      ======================================
      SUCCESS
      ======================================
      */

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setShowPopup(false);

        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          service: "",
          requirement: "",
          budget: "",
          date: "",
          time: "",
        });
      }, 1800);

    } catch (error) {
      console.error(
        "Consultant Request Error:",
        error
      );

      alert(
        "Request save nahi hua. Firebase check karein."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div
      className="global-consultant-overlay"
      onClick={closePopup}
    >
      <div
        className="global-consultant-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE */}

        <button
          type="button"
          className="global-consultant-close"
          onClick={closePopup}
        >
          ×
        </button>

        {submitted ? (
          <div className="global-consultant-success">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              Request Submitted!
            </h2>

            <p>
              Thank you. Our team will contact you
              shortly.
            </p>

          </div>
        ) : (

          <>
            <div className="global-consultant-header">

              <span>
                NISS TECHNOLOGIES
              </span>

              <h2>
                Free Consultation
              </h2>

              <p>
                Tell us about your requirement and
                our expert will contact you.
              </p>

            </div>

            <form
              className="global-consultant-form"
              onSubmit={handleSubmit}
            >

              <div className="global-form-row">

                <div className="global-form-field">
                  <label>
                    Your Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="global-form-field">
                  <label>
                    Mobile Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10),
                      }))
                    }
                    placeholder="10 digit mobile number"
                    maxLength="10"
                    required
                  />
                </div>

              </div>


              <div className="global-form-row">

                <div className="global-form-field">
                  <label>
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>


                <div className="global-form-field">
                  <label>
                    Service Required *
                  </label>

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Service
                    </option>

                    <option value="IT Consulting">
                      IT Consulting
                    </option>

                    <option value="Software Development">
                      Software Development
                    </option>

                    <option value="Digital Marketing">
                      Digital Marketing
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


              <div className="global-form-field">
                <label>
                  Full Address *
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your complete address"
                  required
                />
              </div>


              <div className="global-form-field">
                <label>
                  Your Requirement *
                </label>

                <textarea
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Explain your requirement..."
                  required
                />
              </div>


              <div className="global-form-row">

                <div className="global-form-field">
                  <label>
                    Estimated Budget
                  </label>

                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  >
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


                <div className="global-form-field">
                  <label>
                    Preferred Date *
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>


              <div className="global-form-field">
                <label>
                  Preferred Time *
                </label>

                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
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
                className="global-consultant-submit"
                disabled={saving}
              >
                {saving
                  ? "Submitting..."
                  : "Submit Request →"}
              </button>

            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default GlobalConsultantPopup;