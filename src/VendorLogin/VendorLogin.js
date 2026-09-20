import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";
import "./VendorLogin.css";

const VendorLogin = () => {
  const navigate = useNavigate();

  const [vendorId, setVendorId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!vendorId || !phone) {
      setError("Vendor ID और Mobile Number डालें.");
      return;
    }

    try {
      setLoading(true);

      const vendorsRef = collection(db, "vendors");

      const q = query(
        vendorsRef,
        where("vendorId", "==", vendorId.trim())
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("Vendor ID नहीं मिला.");
        setLoading(false);
        return;
      }

      const vendorDoc = snapshot.docs[0];
      const vendorData = {
        id: vendorDoc.id,
        ...vendorDoc.data(),
      };

      if (String(vendorData.phone || "").trim() !== phone.trim()) {
        setError("Mobile Number गलत है.");
        setLoading(false);
        return;
      }

      localStorage.setItem("vendorLoggedIn", "true");
      localStorage.setItem(
        "vendor",
        JSON.stringify(vendorData)
      );

      navigate("/vendor-dashboard");

    } catch (error) {
      console.error("Vendor login error:", error);
      setError("Login नहीं हो पाया. फिर से कोशिश करें.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vendor-login-page">

      <div className="vendor-login-card">

        <span className="vendor-login-label">
          NISS TECHNOLOGIES
        </span>

        <h1>Vendor Login</h1>

        <p>
          अपने Vendor Dashboard में जाने के लिए
          Vendor ID और Mobile Number डालें.
        </p>

        <form onSubmit={handleLogin}>

          <div className="vendor-login-field">
            <label>Vendor ID</label>

            <input
              type="text"
              value={vendorId}
              onChange={(e) =>
                setVendorId(e.target.value)
              }
              placeholder="Example: VEN-12345678"
              required
            />
          </div>

          <div className="vendor-login-field">
            <label>Mobile Number</label>

            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Enter mobile number"
              maxLength="10"
              required
            />
          </div>

          {error && (
            <div className="vendor-login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login Dashboard"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default VendorLogin;