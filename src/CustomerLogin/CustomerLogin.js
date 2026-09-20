
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CustomerLogin.css";

const CustomerLogin = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const cleanName = name.trim();
    const cleanPhone = phone.replace(/\D/g, "");

    if (!cleanName) {
      setError("Please enter your name.");
      return;
    }

    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10 digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      /*
       * CUSTOMER DATA
       * LocalStorage में save होगा
       */
      const customer = {
        id: Date.now(),
        name: cleanName,
        phone: cleanPhone,
        loginTime: new Date().toISOString(),
      };

      /*
       * एक ही common key पूरे website में इस्तेमाल होगी
       */
      localStorage.setItem(
        "niss_customer",
        JSON.stringify(customer)
      );

      /*
       * Customer login record भी अलग से रखा जाएगा
       * ताकि Dashboard में future में इस्तेमाल कर सकें
       */
      const existingCustomers =
        JSON.parse(
          localStorage.getItem("niss_customers")
        ) || [];

      /*
       * Same mobile number दोबारा आने पर
       * नया duplicate customer नहीं बनाएँगे
       */
      const existingIndex = existingCustomers.findIndex(
        (item) => item.phone === cleanPhone
      );

      if (existingIndex !== -1) {
        existingCustomers[existingIndex] = {
          ...existingCustomers[existingIndex],
          name: cleanName,
          lastLogin: new Date().toISOString(),
        };
      } else {
        existingCustomers.push(customer);
      }

      localStorage.setItem(
        "niss_customers",
        JSON.stringify(existingCustomers)
      );

      /*
       * Login complete
       */
      navigate("/customer-dashboard");

    } catch (err) {
      console.error(err);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="niss-login-overlay">

      <div className="niss-login-box">

        <div className="niss-login-logo">
          NISS
        </div>

        <h2>
          Welcome to NISS Technologies
        </h2>

        <p>
          Enter your details to continue
        </p>

        <form onSubmit={handleLogin}>

          <div className="niss-login-field">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>

          <div className="niss-login-field">

            <label>
              Mobile Number
            </label>

            <input
              type="tel"
              placeholder="Enter 10 digit mobile number"
              value={phone}
              onChange={(e) => {

                const value =
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                setPhone(value);

              }}
              maxLength="10"
              required
            />

          </div>

          {error && (
            <div className="niss-login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="niss-login-button"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : "Continue →"}
          </button>

        </form>

        <div className="niss-login-note">
          Your details will be saved securely on
          this device for your enquiries.
        </div>

      </div>

    </div>
  );
};

export default CustomerLogin;
