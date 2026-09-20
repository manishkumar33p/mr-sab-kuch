
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import "./AddVendor.css";

const vendorCategories = [
  "Digital Marketing",
  "Software & IT",
  "Event Management",
  "Interior & Furniture",
  "Carpenter",
  "Plumbing",
  "Electrical",
  "CCTV & Security",
  "Teacher / Tutor",
  "Tailor",
  "Catering",
  "Laundry",
  "Property",
  "Other",
];

const AddVendor = () => {
  const navigate = useNavigate();

  const [staff] = useState(() => {
    return JSON.parse(localStorage.getItem("fieldStaff")) || null;
  });

  const [form, setForm] = useState({
    vendorName: "",
    ownerName: "",
    phone: "",
    alternatePhone: "",
    email: "",
    category: "",
    services: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    experience: "",
    paymentAmount: "",
    paymentStatus: "Pending",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!staff) {
      alert("Field Staff login required.");
      navigate("/field-staff-login");
      return;
    }

    if (
      !form.vendorName ||
      !form.ownerName ||
      !form.phone ||
      !form.category ||
      !form.services
    ) {
      alert(
        "Please fill Vendor Name, Owner Name, Phone, Category and Services."
      );
      return;
    }

    try {
      setLoading(true);

      const vendorData = {
        ...form,

        staffId: staff.staffId || "",
        staffName: staff.name || "",

        status: "Active",
        vendorType: "Field Registered",

        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "vendors"), vendorData);

      alert("Vendor successfully added!");

      setForm({
        vendorName: "",
        ownerName: "",
        phone: "",
        alternatePhone: "",
        email: "",
        category: "",
        services: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        experience: "",
        paymentAmount: "",
        paymentStatus: "Pending",
        notes: "",
      });

      navigate("/field-staff-dashboard");
    } catch (error) {
      console.error("Vendor save error:", error);

      alert(
        "Vendor save nahi hua. Firebase connection/rules check karein."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-vendor-page">
      <div className="add-vendor-container">

        <div className="add-vendor-header">
          <div>
            <span>NISS TECHNOLOGIES</span>

            <h1>Add New Vendor</h1>

            <p>
              Register a new vendor from field operations.
            </p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/field-staff-dashboard")}
          >
            ← Dashboard
          </button>
        </div>

        <form
          className="vendor-form"
          onSubmit={handleSubmit}
        >

          <div className="form-section">
            <h2>Vendor Information</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Vendor / Business Name *</label>

                <input
                  type="text"
                  name="vendorName"
                  value={form.vendorName}
                  onChange={handleChange}
                  placeholder="Enter business name"
                />
              </div>

              <div className="form-group">
                <label>Owner Name *</label>

                <input
                  type="text"
                  name="ownerName"
                  value={form.ownerName}
                  onChange={handleChange}
                  placeholder="Enter owner name"
                />
              </div>

              <div className="form-group">
                <label>Mobile Number *</label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  maxLength="10"
                />
              </div>

              <div className="form-group">
                <label>Alternate Mobile</label>

                <input
                  type="tel"
                  name="alternatePhone"
                  value={form.alternatePhone}
                  onChange={handleChange}
                  placeholder="Alternate number"
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Vendor email"
                />
              </div>

              <div className="form-group">
                <label>Vendor Category *</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Category
                  </option>

                  {vendorCategories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          <div className="form-section">
            <h2>Services</h2>

            <div className="form-group full">
              <label>
                Services / Work Provided *
              </label>

              <textarea
                name="services"
                value={form.services}
                onChange={handleChange}
                placeholder="Example: Website development, SEO, social media marketing..."
                rows="4"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Business Address</h2>

            <div className="form-grid">

              <div className="form-group full">
                <label>Address</label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Full business address"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>

              <div className="form-group">
                <label>State</label>

                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                />
              </div>

              <div className="form-group">
                <label>Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                />
              </div>

              <div className="form-group">
                <label>Experience</label>

                <input
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="Example: 5 years"
                />
              </div>

            </div>
          </div>

          <div className="form-section">
            <h2>Payment / Registration</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Registration Amount</label>

                <input
                  type="number"
                  name="paymentAmount"
                  value={form.paymentAmount}
                  onChange={handleChange}
                  placeholder="₹ Amount"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Payment Status</label>

                <select
                  name="paymentStatus"
                  value={form.paymentStatus}
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
          </div>

          <div className="form-section">
            <h2>Notes</h2>

            <div className="form-group full">
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Any additional information..."
                rows="4"
              />
            </div>
          </div>

          <div className="vendor-submit-area">

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate("/field-staff-dashboard")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-vendor-btn"
              disabled={loading}
            >
              {loading
                ? "Saving Vendor..."
                : "✓ Add Vendor"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddVendor;
