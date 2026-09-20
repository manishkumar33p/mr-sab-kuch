import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VendorRegistration.css";

const VendorRegistration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    vendorName: "",
    ownerName: "",
    phone: "",
    whatsapp: "",
    email: "",
    category: "",
    city: "",
    address: "",
    experience: "",
    services: "",
    paymentAmount: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.vendorName ||
      !form.ownerName ||
      !form.phone ||
      !form.category ||
      !form.city
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const existingVendors =
      JSON.parse(localStorage.getItem("nissVendors")) || [];

    const newVendor = {
      id: "VEN-" + Date.now(),
      ...form,
      status: "Pending",
      addedDate: new Date().toISOString(),
    };

    const updatedVendors = [
      ...existingVendors,
      newVendor,
    ];

    localStorage.setItem(
      "nissVendors",
      JSON.stringify(updatedVendors)
    );

    alert("Vendor added successfully!");

    navigate("/field-staff-dashboard");
  };

  return (
    <div className="vendor-registration-page">

      <div className="vendor-registration-container">

        <div className="vendor-registration-header">
          <span>NISS TECHNOLOGIES</span>

          <h1>Add New Vendor</h1>

          <p>
            Register a vendor for NISS Technologies
          </p>
        </div>

        <form
          className="vendor-registration-form"
          onSubmit={handleSubmit}
        >

          <div className="form-section">
            <h2>Vendor Information</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>
                  Vendor / Business Name *
                </label>

                <input
                  type="text"
                  name="vendorName"
                  value={form.vendorName}
                  onChange={handleChange}
                  placeholder="Enter vendor/business name"
                />
              </div>

              <div className="form-group">
                <label>
                  Owner Name *
                </label>

                <input
                  type="text"
                  name="ownerName"
                  value={form.ownerName}
                  onChange={handleChange}
                  placeholder="Enter owner name"
                />
              </div>

              <div className="form-group">
                <label>
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label>
                  WhatsApp Number
                </label>

                <input
                  type="tel"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="Enter WhatsApp number"
                />
              </div>

              <div className="form-group">
                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label>
                  Vendor Category *
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="Digital Marketing">
                    Digital Marketing
                  </option>

                  <option value="Event Management">
                    Event Management
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

                  <option value="CCTV">
                    CCTV & Security
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

                  <option value="Other">
                    Other
                  </option>

                </select>
              </div>

            </div>
          </div>

          <div className="form-section">

            <h2>Location & Services</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>
                  City *
                </label>

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
              </div>

              <div className="form-group">
                <label>
                  Experience
                </label>

                <input
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="Example: 5 Years"
                />
              </div>

            </div>

            <div className="form-group">
              <label>
                Full Address
              </label>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter complete address"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>
                Services Offered
              </label>

              <textarea
                name="services"
                value={form.services}
                onChange={handleChange}
                placeholder="Example: Website, SEO, Social Media Marketing"
                rows="4"
              />
            </div>

          </div>

          <div className="form-section">

            <h2>Payment & Notes</h2>

            <div className="form-group">

              <label>
                Registration / Payment Amount
              </label>

              <input
                type="number"
                name="paymentAmount"
                value={form.paymentAmount}
                onChange={handleChange}
                placeholder="Enter amount"
              />

            </div>

            <div className="form-group">

              <label>
                Additional Notes
              </label>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Enter additional information"
                rows="4"
              />

            </div>

          </div>

          <div className="vendor-form-actions">

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
            >
              Add Vendor
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default VendorRegistration;