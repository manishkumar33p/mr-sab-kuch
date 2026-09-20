

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";
import "./FieldStaffDashboard.css";

const FieldStaffDashboard = () => {
  const navigate = useNavigate();

  const [staff, setStaff] = useState(null);
  const [vendors, setVendors] = useState([]);

  const [showVendorForm, setShowVendorForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [vendor, setVendor] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    category: "",
    services: "",
    city: "",
    address: "",
    paymentAmount: "",
    paymentStatus: "Pending",
    notes: "",
  });

  /* =========================================
     STAFF LOGIN CHECK
  ========================================= */

  useEffect(() => {
    const loggedIn = localStorage.getItem("fieldStaffLoggedIn");

    const storedStaff = JSON.parse(
      localStorage.getItem("fieldStaff")
    );

    if (loggedIn !== "true" || !storedStaff) {
      navigate("/field-staff-login");
      return;
    }

    setStaff(storedStaff);
  }, [navigate]);

  /* =========================================
     FIREBASE - LOAD STAFF VENDORS
  ========================================= */

  useEffect(() => {
    if (!staff?.staffId) return;

    const vendorsRef = collection(db, "vendors");

    const q = query(
      vendorsRef,
      where("staffId", "==", staff.staffId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const vendorList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setVendors(vendorList);
    });

    return () => unsubscribe();
  }, [staff]);

  /* =========================================
     INPUT CHANGE
  ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setVendor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================
     ADD VENDOR
  ========================================= */

  const addVendor = async (e) => {
    e.preventDefault();

    if (!vendor.name || !vendor.phone || !vendor.category) {
      alert(
        "Vendor Name, Mobile Number aur Category required hai."
      );
      return;
    }

    try {
      setLoading(true);

      const vendorId =
        "VEN-" +
        Date.now().toString().slice(-8);

      await addDoc(collection(db, "vendors"), {
        vendorId,

        name: vendor.name.trim(),
        phone: vendor.phone.trim(),
        whatsapp: vendor.whatsapp.trim(),
        email: vendor.email.trim(),

        category: vendor.category,
        services: vendor.services,

        city: vendor.city,
        address: vendor.address,

        paymentAmount:
          Number(vendor.paymentAmount) || 0,

        paymentStatus: vendor.paymentStatus,

        notes: vendor.notes,

        staffId: staff.staffId,
        staffName: staff.name,
        staffPhone: staff.phone || "",

        status: "Pending",

        createdAt: serverTimestamp(),
      });

      alert(
        `Vendor successfully added.\nVendor ID: ${vendorId}`
      );

      setVendor({
        name: "",
        phone: "",
        whatsapp: "",
        email: "",
        category: "",
        services: "",
        city: "",
        address: "",
        paymentAmount: "",
        paymentStatus: "Pending",
        notes: "",
      });

      setShowVendorForm(false);
    } catch (error) {
      console.error(error);

      alert(
        "Vendor save nahi hua. Firebase connection check karein."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     LOGOUT
  ========================================= */

  const logout = () => {
    localStorage.removeItem("fieldStaffLoggedIn");
    localStorage.removeItem("fieldStaff");

    navigate("/field-staff-login");
  };

  if (!staff) {
    return null;
  }

  const activeVendors = vendors.filter(
    (item) => item.status === "Active"
  ).length;

  const pendingVendors = vendors.filter(
    (item) => item.status === "Pending"
  ).length;

  const totalCollection = vendors.reduce(
    (sum, item) =>
      sum + Number(item.paymentAmount || 0),
    0
  );

  return (
    <div className="field-dashboard-page">

      <div className="field-dashboard-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="field-dashboard-header">

          <div>
            <span className="field-dashboard-label">
              NISS TECHNOLOGIES
            </span>

            <h1>
              Field Staff Dashboard
            </h1>

            <p>
              Welcome back, {staff.name}
            </p>
          </div>

          <button
            className="field-logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

        {/* =====================================
            PROFILE
        ===================================== */}

        <section className="field-profile">

          <div className="field-avatar">
            {staff.name
              ? staff.name.charAt(0).toUpperCase()
              : "F"}
          </div>

          <div>
            <h2>{staff.name}</h2>

            <p>
              Staff ID:{" "}
              <strong>{staff.staffId}</strong>
            </p>

            <span>
              Field Staff
            </span>
          </div>

        </section>

        {/* =====================================
            STATS
        ===================================== */}

        <section className="field-stats">

          <div className="field-stat-card">
            <span>👥</span>

            <strong>
              {vendors.length}
            </strong>

            <p>
              Vendors Added
            </p>
          </div>

          <div className="field-stat-card">
            <span>✅</span>

            <strong>
              {activeVendors}
            </strong>

            <p>
              Active Vendors
            </p>
          </div>

          <div className="field-stat-card">
            <span>⏳</span>

            <strong>
              {pendingVendors}
            </strong>

            <p>
              Pending Vendors
            </p>
          </div>

          <div className="field-stat-card">
            <span>₹</span>

            <strong>
              {totalCollection.toLocaleString(
                "en-IN"
              )}
            </strong>

            <p>
              Payment Collection
            </p>
          </div>

        </section>

        {/* =====================================
            ACTIONS
        ===================================== */}

        <section className="field-actions">

          <div className="field-actions-heading">

            <div>
              <span>
                FIELD OPERATIONS
              </span>

              <h2>
                Vendor Management
              </h2>
            </div>

            <button
              className="add-vendor-main-btn"
              onClick={() =>
                setShowVendorForm(
                  !showVendorForm
                )
              }
            >
              {showVendorForm
                ? "✕ Close"
                : "＋ Add Vendor"}
            </button>

          </div>

          <div className="field-action-grid">

            <button
              onClick={() =>
                setShowVendorForm(true)
              }
            >
              <span>➕</span>

              <div>
                <strong>
                  Add New Vendor
                </strong>

                <small>
                  Register a new business vendor
                </small>
              </div>
            </button>

            <button
              onClick={() => {
                document
                  .getElementById(
                    "my-vendors"
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              <span>👥</span>

              <div>
                <strong>
                  My Vendors
                </strong>

                <small>
                  View vendors added by you
                </small>
              </div>
            </button>

            <button
              onClick={() => {
                document
                  .getElementById(
                    "my-vendors"
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              <span>📋</span>

              <div>
                <strong>
                  Vendor Leads
                </strong>

                <small>
                  Track pending vendors
                </small>
              </div>
            </button>

          </div>

        </section>

        {/* =====================================
            ADD VENDOR FORM
        ===================================== */}

        {showVendorForm && (

          <section className="vendor-form-section">

            <div className="vendor-form-header">

              <div>
                <span>
                  NEW REGISTRATION
                </span>

                <h2>
                  Add New Vendor
                </h2>

                <p>
                  Vendor ki complete information
                  enter karein.
                </p>
              </div>

            </div>

            <form
              className="vendor-form"
              onSubmit={addVendor}
            >

              <div className="vendor-form-grid">

                <div className="vendor-field">
                  <label>
                    Vendor Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={vendor.name}
                    onChange={handleChange}
                    placeholder="Enter vendor name"
                    required
                  />
                </div>

                <div className="vendor-field">
                  <label>
                    Mobile Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={vendor.phone}
                    onChange={handleChange}
                    placeholder="10 digit mobile"
                    maxLength="10"
                    required
                  />
                </div>

                <div className="vendor-field">
                  <label>
                    WhatsApp Number
                  </label>

                  <input
                    type="tel"
                    name="whatsapp"
                    value={vendor.whatsapp}
                    onChange={handleChange}
                    placeholder="WhatsApp number"
                    maxLength="10"
                  />
                </div>

                <div className="vendor-field">
                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={vendor.email}
                    onChange={handleChange}
                    placeholder="vendor@email.com"
                  />
                </div>

                <div className="vendor-field">
                  <label>
                    Vendor Category *
                  </label>

                  <select
                    name="category"
                    value={vendor.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option value="Digital Marketing">
                      Digital Marketing
                    </option>

                    <option value="Software & IT">
                      Software & IT
                    </option>

                    <option value="Interior">
                      Interior
                    </option>

                    <option value="Carpenter">
                      Carpenter
                    </option>

                    <option value="Plumbing">
                      Plumbing
                    </option>

                    <option value="Electrical">
                      Electrical
                    </option>

                    <option value="CCTV & Security">
                      CCTV & Security
                    </option>

                    <option value="Teacher">
                      Teacher / Tutor
                    </option>

                    <option value="Tailor">
                      Tailor
                    </option>

                    <option value="Catering">
                      Catering
                    </option>

                    <option value="Laundry">
                      Laundry
                    </option>

                    <option value="Property">
                      Property
                    </option>

                    <option value="Event Management">
                      Event Management
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div className="vendor-field">
                  <label>
                    Services
                  </label>

                  <input
                    type="text"
                    name="services"
                    value={vendor.services}
                    onChange={handleChange}
                    placeholder="e.g. Website, SEO, Ads"
                  />
                </div>

                <div className="vendor-field">
                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={vendor.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>

                <div className="vendor-field">
                  <label>
                    Joining Payment
                  </label>

                  <input
                    type="number"
                    name="paymentAmount"
                    value={vendor.paymentAmount}
                    onChange={handleChange}
                    placeholder="₹ Amount"
                    min="0"
                  />
                </div>

                <div className="vendor-field">
                  <label>
                    Payment Status
                  </label>

                  <select
                    name="paymentStatus"
                    value={vendor.paymentStatus}
                    onChange={handleChange}
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Paid">
                      Paid
                    </option>

                    <option value="Partial">
                      Partial
                    </option>
                  </select>
                </div>

              </div>

              <div className="vendor-field full">
                <label>
                  Full Address
                </label>

                <textarea
                  name="address"
                  value={vendor.address}
                  onChange={handleChange}
                  placeholder="Vendor complete address"
                  rows="3"
                />
              </div>

              <div className="vendor-field full">
                <label>
                  Notes
                </label>

                <textarea
                  name="notes"
                  value={vendor.notes}
                  onChange={handleChange}
                  placeholder="Additional information"
                  rows="3"
                />
              </div>

              <div className="vendor-form-submit">

                <button
                  type="button"
                  onClick={() =>
                    setShowVendorForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : "Save Vendor"}
                </button>

              </div>

            </form>

          </section>

        )}

        {/* =====================================
            MY VENDORS
        ===================================== */}

        <section
          className="my-vendors-section"
          id="my-vendors"
        >

          <div className="my-vendors-heading">

            <div>
              <span>
                VENDOR DATABASE
              </span>

              <h2>
                My Vendors
              </h2>
            </div>

            <strong>
              {vendors.length} Vendors
            </strong>

          </div>

          {vendors.length === 0 ? (

            <div className="no-vendors">
              <div>👥</div>

              <h3>
                No Vendors Added Yet
              </h3>

              <p>
                Add your first vendor using
                the Add Vendor button above.
              </p>

              <button
                onClick={() =>
                  setShowVendorForm(true)
                }
              >
                ＋ Add First Vendor
              </button>
            </div>

          ) : (

            <div className="vendor-list">

              {vendors.map((item) => (

                <div
                  className="vendor-card"
                  key={item.id}
                >

                  <div className="vendor-card-top">

                    <div className="vendor-avatar">
                      {item.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h3>
                        {item.name}
                      </h3>

                      <span>
                        {item.vendorId}
                      </span>
                    </div>

                    <div
                      className={`vendor-status ${
                        item.status === "Active"
                          ? "active"
                          : "pending"
                      }`}
                    >
                      {item.status ||
                        "Pending"}
                    </div>

                  </div>

                  <div className="vendor-card-info">

                    <div>
                      <small>
                        Category
                      </small>

                      <strong>
                        {item.category ||
                          "-"}
                      </strong>
                    </div>

                    <div>
                      <small>
                        Mobile
                      </small>

                      <strong>
                        {item.phone ||
                          "-"}
                      </strong>
                    </div>

                    <div>
                      <small>
                        City
                      </small>

                      <strong>
                        {item.city ||
                          "-"}
                      </strong>
                    </div>

                    <div>
                      <small>
                        Payment
                      </small>

                      <strong>
                        ₹
                        {Number(
                          item.paymentAmount ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>
                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* =====================================
            NOTICE
        ===================================== */}

        <section className="field-notice">

          <div>💡</div>

          <div>
            <h3>
              Field Staff Panel
            </h3>

            <p>
              Vendor registration ke baad
              information securely Firebase
              database mein save hogi aur
              Admin Panel se manage ki ja
              sakti hai.
            </p>
          </div>

        </section>

      </div>

    </div>
  );
};

export default FieldStaffDashboard;