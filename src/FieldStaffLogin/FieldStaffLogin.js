import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";
import "./FieldStaffLogin.css";

const FieldStaffLogin = () => {
  const navigate = useNavigate();

  const [staffId, setStaffId] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !staffId.trim() ||
      !phone.trim() ||
      !password.trim()
    ) {
      setError(
        "Staff ID, Mobile Number और Password डालें."
      );
      return;
    }

    try {
      setLoading(true);

      const staffRef = collection(db, "fieldStaff");

      /* =====================================
         STAFF ID SEARCH
      ===================================== */

      const q = query(
        staffRef,
        where("staffId", "==", staffId.trim())
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("Staff ID नहीं मिला.");
        setLoading(false);
        return;
      }

      const staffDoc = snapshot.docs[0];

      const staffData = {
        id: staffDoc.id,
        ...staffDoc.data(),
      };

      /* =====================================
         MOBILE NUMBER CHECK
      ===================================== */

      if (
        String(staffData.phone || "").trim() !==
        phone.trim()
      ) {
        setError("Mobile Number गलत है.");
        setLoading(false);
        return;
      }

      /* =====================================
         PASSWORD CHECK
      ===================================== */

      if (
        String(staffData.password || "").trim() !==
        password.trim()
      ) {
        setError("Password गलत है.");
        setLoading(false);
        return;
      }

      /* =====================================
         ACCOUNT STATUS CHECK
      ===================================== */

      if (
        String(
          staffData.status || "Active"
        ).toLowerCase() !== "active"
      ) {
        setError(
          "आपका Field Staff account अभी Active नहीं है."
        );
        setLoading(false);
        return;
      }

      /* =====================================
         SAVE LOGGED-IN STAFF
      ===================================== */

      localStorage.setItem(
        "fieldStaffLoggedIn",
        "true"
      );

      localStorage.setItem(
        "fieldStaff",
        JSON.stringify(staffData)
      );

      /* =====================================
         GO TO STAFF DASHBOARD
      ===================================== */

      navigate("/field-staff-dashboard");

    } catch (error) {
      console.error(
        "Field Staff Login Error:",
        error
      );

      setError(
        "Login नहीं हो पाया. Firebase connection check करें."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="field-login-page">

      <div className="field-login-card">

        <span className="field-login-label">
          NISS TECHNOLOGIES
        </span>

        <h1>
          Field Staff Login
        </h1>

        <p>
          अपने Field Staff Dashboard में जाने के लिए
          Staff ID, Mobile Number और Password डालें.
        </p>

        <form onSubmit={handleLogin}>

          {/* STAFF ID */}

          <div className="field-login-field">

            <label>
              Staff ID
            </label>

            <input
              type="text"
              value={staffId}
              onChange={(e) =>
                setStaffId(e.target.value)
              }
              placeholder="Example: FS-001"
              required
            />

          </div>

          {/* MOBILE */}

          <div className="field-login-field">

            <label>
              Mobile Number
            </label>

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

          {/* PASSWORD */}

          <div className="field-login-field">

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
              required
            />

          </div>

          {/* ERROR */}

          {error && (
            <div className="field-login-error">
              {error}
            </div>
          )}

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login Dashboard"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default FieldStaffLogin;