import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";
import "./Packages.css";
import qr from "../qr.jpeg";
const PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    duration: "1 Month",
    months: 1,
    price: 499,
    popular: false,
    description: "Start your vendor journey with NISS Technologies.",
    features: [
      "Vendor Profile Listing",
      "Vendor ID",
      "Service Category Listing",
      "Basic Business Visibility",
      "Vendor Dashboard Access",
    ],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    duration: "3 Months",
    months: 3,
    price: 1299,
    popular: false,
    description: "A flexible plan for growing vendors.",
    features: [
      "Everything in Basic",
      "3 Months Listing",
      "Better Business Visibility",
      "Vendor Dashboard",
      "Profile Management",
    ],
  },
  {
    id: "half-yearly",
    name: "Half-Yearly",
    duration: "6 Months",
    months: 6,
    price: 2199,
    popular: true,
    description: "Great value for established vendors.",
    features: [
      "Everything in Quarterly",
      "6 Months Listing",
      "Priority Visibility",
      "Business Profile Management",
      "Vendor Dashboard Access",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    duration: "12 Months",
    months: 12,
    price: 3999,
    popular: false,
    description: "Best value for long-term business growth.",
    features: [
      "Everything in Half-Yearly",
      "12 Months Listing",
      "Priority Business Visibility",
      "Long-Term Vendor Profile",
      "Vendor Dashboard Access",
    ],
  },
];

const SERVICES = [
  "Laundry",
  "Carpenter",
  "Tailor",
  "Catering",
  "CCTV",
  "Security Services",
  "Interior",
  "Plumbing",
  "Property",
  "Teacher",
  "Event Management",
  "Other",
];

const GST_RATE = 18;

const Packages = () => {
  const navigate = useNavigate();

  const [selectedPackage, setSelectedPackage] = useState(null);

  const [form, setForm] = useState({
    vendorId: "",
    vendorName: "",
    phone: "",
    service: "",
    transactionId: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const storedVendor = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("vendor")) || null;
    } catch {
      return null;
    }
  }, []);

  const selectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setSuccess(false);
    setError("");

    setForm((prev) => ({
      ...prev,
      vendorId:
        storedVendor?.vendorId ||
        storedVendor?.id ||
        "",
      vendorName:
        storedVendor?.name ||
        "",
      phone:
        storedVendor?.phone ||
        "",
    }));

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getGST = () => {
    if (!selectedPackage) return 0;

    return Math.round(
      (selectedPackage.price * GST_RATE) / 100
    );
  };

  const getFinalAmount = () => {
    if (!selectedPackage) return 0;

    return selectedPackage.price + getGST();
  };

  const money = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!selectedPackage) {
      setError("Please select a package first.");
      return;
    }

    if (!form.vendorId) {
      setError(
        "Vendor ID नहीं मिला। कृपया पहले Vendor Login करें।"
      );
      return;
    }

    if (!form.vendorName.trim()) {
      setError("Please enter vendor name.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Please enter mobile number.");
      return;
    }

    if (!form.service) {
      setError("Please select your service.");
      return;
    }

    if (!form.transactionId.trim()) {
      setError(
        "Please enter the QR payment transaction ID."
      );
      return;
    }

    try {
      setSubmitting(true);

      const gstAmount = getGST();
      const finalAmount = getFinalAmount();

      await addDoc(
        collection(db, "vendorPackageApplications"),
        {
          vendorId: form.vendorId.trim(),
          vendorName: form.vendorName.trim(),
          phone: form.phone.trim(),

          service: form.service,

          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          duration: selectedPackage.duration,
          durationMonths: selectedPackage.months,

          baseAmount: selectedPackage.price,
          gstRate: GST_RATE,
          gstAmount,
          totalAmount: finalAmount,

          transactionId:
            form.transactionId.trim(),

          paymentMethod: "QR",
          paymentStatus: "Payment Submitted",

          packageStatus: "Pending Verification",

          createdAt: serverTimestamp(),

          source: "Vendor Package Page",
        }
      );

      setSuccess(true);

      setForm((prev) => ({
        ...prev,
        transactionId: "",
        service: "",
      }));
    } catch (err) {
      console.error(
        "Package application error:",
        err
      );

      setError(
        "Application submit नहीं हो पाई। Firebase connection check करें।"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="packages-page">

      {/* HERO */}

      <section className="packages-hero">

        <div className="packages-hero-content">

          <span className="packages-eyebrow">
            NISS TECHNOLOGIES
          </span>

          <h1>
            Vendor Subscription Plans
          </h1>

          <p>
            Grow your business with NISS Technologies.
            Choose a vendor plan that suits your business.
          </p>

          <div className="gst-note">
            All prices are exclusive of 18% GST.
          </div>

        </div>

      </section>

      {/* PLANS */}

      <section className="packages-section">

        <div className="packages-heading">

          <span>
            VENDOR PLANS
          </span>

          <h2>
            Choose Your Plan
          </h2>

          <p>
            Start small and upgrade whenever your business grows.
          </p>

        </div>

        <div className="packages-grid">

          {PACKAGES.map((pkg) => {

            const gst = Math.round(
              (pkg.price * GST_RATE) / 100
            );

            const total =
              pkg.price + gst;

            return (
              <div
                className={`package-card ${
                  pkg.popular
                    ? "popular-package"
                    : ""
                }`}
                key={pkg.id}
              >

                {pkg.popular && (
                  <div className="popular-badge">
                    MOST POPULAR
                  </div>
                )}

                <div className="package-top">

                  <span className="package-name">
                    {pkg.name}
                  </span>

                  <h3>
                    {money(pkg.price)}
                  </h3>

                  <p className="package-duration">
                    + 18% GST
                  </p>

                  <strong className="package-final">
                    {money(total)}
                  </strong>

                  <small>
                    Total Payable
                  </small>

                  <p>
                    {pkg.duration}
                  </p>

                </div>

                <div className="package-description">
                  {pkg.description}
                </div>

                <ul className="package-features">

                  {pkg.features.map(
                    (feature, index) => (
                      <li key={index}>
                        <span>✓</span>
                        {feature}
                      </li>
                    )
                  )}

                </ul>

                <div className="package-price-breakdown">

                  <div>
                    <span>Plan</span>
                    <strong>
                      {money(pkg.price)}
                    </strong>
                  </div>

                  <div>
                    <span>GST 18%</span>
                    <strong>
                      {money(gst)}
                    </strong>
                  </div>

                  <div className="breakdown-total">
                    <span>Total</span>
                    <strong>
                      {money(total)}
                    </strong>
                  </div>

                </div>

                <button
                  className="select-package-btn"
                  onClick={() =>
                    selectPackage(pkg)
                  }
                >
                  Select {pkg.name}
                </button>

              </div>
            );
          })}

        </div>

      </section>

      {/* APPLICATION */}

      <section className="vendor-package-application">

        <div className="application-heading">

          <span>
            SUBSCRIPTION APPLICATION
          </span>

          <h2>
            Activate Your Vendor Plan
          </h2>

          <p>
            Select a plan above and complete your
            vendor information and QR payment.
          </p>

        </div>

        {!selectedPackage ? (

          <div className="select-first-box">
            <div>📦</div>

            <h3>
              Select a Package First
            </h3>

            <p>
              ऊपर से कोई Vendor Package चुनिए।
            </p>
          </div>

        ) : (

          <div className="application-layout">

            {/* LEFT FORM */}

            <div className="application-form-card">

              <div className="selected-package-header">

                <div>
                  <span>
                    SELECTED PLAN
                  </span>

                  <h3>
                    {selectedPackage.name}
                  </h3>

                  <p>
                    {selectedPackage.duration}
                  </p>
                </div>

                <strong>
                  {money(
                    getFinalAmount()
                  )}
                </strong>

              </div>

              <form
                onSubmit={handleSubmit}
              >

                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      Vendor ID
                    </label>

                    <input
                      type="text"
                      name="vendorId"
                      value={form.vendorId}
                      onChange={handleChange}
                      placeholder="VEN-001"
                      readOnly={
                        Boolean(
                          storedVendor?.vendorId
                        )
                      }
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Vendor Name
                    </label>

                    <input
                      type="text"
                      name="vendorName"
                      value={form.vendorName}
                      onChange={handleChange}
                      placeholder="Vendor name"
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Mobile Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Mobile number"
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Service
                    </label>

                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select Service
                      </option>

                      {SERVICES.map(
                        (service) => (
                          <option
                            value={service}
                            key={service}
                          >
                            {service}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>

                {/* PAYMENT */}

                <div className="qr-payment-box">

                  <div className="qr-payment-title">

                    <span>
                      STEP 1
                    </span>

                    <h3>
                      Make QR Payment
                    </h3>

                  </div>

                  <div className="qr-payment-content">

                    <div className="qr-placeholder">

                      {/* 
                        अपनी QR image public folder में रखें:
                        public/payment-qr.png
                      */}

                      <img
                        src={qr}
                        alt="NISS Technologies Payment QR"
                      />

                    </div>

                    <div className="payment-details">

                      <p>
                        Scan the QR code and
                        complete the payment.
                      </p>

                      <div className="amount-box">

                        <span>
                          Total Payable
                        </span>

                        <strong>
                          {money(
                            getFinalAmount()
                          )}
                        </strong>

                      </div>

                      <small>
                        Plan:{" "}
                        {selectedPackage.name}
                        {" • "}
                        {selectedPackage.duration}
                      </small>

                    </div>

                  </div>

                </div>

                {/* TRANSACTION */}

                <div className="transaction-box">

                  <span>
                    STEP 2
                  </span>

                  <h3>
                    Submit Payment Reference
                  </h3>

                  <p>
                    Payment करने के बाद अपना
                    UTR / Transaction ID यहाँ डालें।
                  </p>

                  <input
                    type="text"
                    name="transactionId"
                    value={form.transactionId}
                    onChange={handleChange}
                    placeholder="Enter UTR / Transaction ID"
                  />

                </div>

                {error && (
                  <div className="package-error">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="package-success">

                    <strong>
                      ✓ Payment Submitted Successfully
                    </strong>

                    <p>
                      आपका package application
                      successfully submit हो गया है।
                    </p>

                    <small>
                      Admin payment verify करने के
                      बाद आपका package Active किया जाएगा।
                    </small>

                  </div>
                )}

                <button
                  type="submit"
                  className="submit-package-btn"
                  disabled={submitting}
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Package Application"}
                </button>

              </form>

            </div>

            {/* RIGHT SUMMARY */}

            <div className="package-summary-card">

              <span>
                ORDER SUMMARY
              </span>

              <h3>
                {selectedPackage.name}
              </h3>

              <div className="summary-row">
                <span>
                  Duration
                </span>

                <strong>
                  {selectedPackage.duration}
                </strong>
              </div>

              <div className="summary-row">
                <span>
                  Base Price
                </span>

                <strong>
                  {money(
                    selectedPackage.price
                  )}
                </strong>
              </div>

              <div className="summary-row">
                <span>
                  GST
                </span>

                <strong>
                  {money(getGST())}
                </strong>
              </div>

              <div className="summary-total">

                <span>
                  Total Payable
                </span>

                <strong>
                  {money(
                    getFinalAmount()
                  )}
                </strong>

              </div>

              <div className="verification-note">

                <span>🔐</span>

                <p>
                  Payment will remain pending until
                  NISS Technologies verifies the
                  transaction.
                </p>

              </div>

            </div>

          </div>

        )}

      </section>

      {/* LOGIN NOTICE */}

      {!storedVendor && (
        <div className="vendor-login-notice">

          <p>
            Already registered as a vendor?
          </p>

          <button
            onClick={() =>
              navigate("/vendor-login")
            }
          >
            Vendor Login
          </button>

        </div>
      )}

    </div>
  );
};

export default Packages;