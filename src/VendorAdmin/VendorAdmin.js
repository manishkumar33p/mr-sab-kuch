import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";
import "./VendorAdmin.css";

const VendorAdmin = () => {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "vendors"),
      (snapshot) => {
        const list = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setVendors(list);
        setLoading(false);
      },
      (error) => {
        console.error("Vendor Admin Error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const money = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const getDate = (timestamp) => {
    if (!timestamp) return "-";

    if (typeof timestamp.toDate === "function") {
      return timestamp.toDate().toLocaleDateString("en-IN");
    }

    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString("en-IN");
    }

    return "-";
  };

  const activeCount = vendors.filter(
    (vendor) =>
      String(vendor.status || "Pending").toLowerCase() === "active"
  ).length;

  const inactiveCount = vendors.filter(
    (vendor) =>
      String(vendor.status || "").toLowerCase() === "inactive"
  ).length;

  const pendingCount = vendors.filter(
    (vendor) =>
      String(vendor.status || "").toLowerCase() === "pending"
  ).length;

  const totalPayments = vendors.reduce(
    (sum, vendor) =>
      sum + Number(vendor.paymentAmount || 0),
    0
  );

  const filteredVendors = useMemo(() => {
    const text = search.trim().toLowerCase();

    return vendors.filter((vendor) => {
      const matchesSearch =
        !text ||
        [
          vendor.name,
          vendor.vendorId,
          vendor.phone,
          vendor.whatsapp,
          vendor.email,
          vendor.category,
          vendor.city,
          vendor.staffName,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(text)
          );

      const vendorStatus =
        String(vendor.status || "Pending").toLowerCase();

      const matchesStatus =
        statusFilter === "All" ||
        vendorStatus === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [vendors, search, statusFilter]);

  const changeStatus = async (vendor, newStatus) => {
    try {
      await updateDoc(doc(db, "vendors", vendor.id), {
        status: newStatus,
      });

      setSelectedVendor((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
            }
          : null
      );
    } catch (error) {
      console.error(error);
      alert("Vendor status update nahi hua.");
    }
  };

  const openVendorDashboard = (vendor) => {
    if (!vendor.vendorId) {
      alert("Is vendor ka Vendor ID available nahi hai.");
      return;
    }

    navigate(
      `/vendor-dashboard/${encodeURIComponent(vendor.vendorId)}`
    );
  };

  const callVendor = (phone) => {
    if (!phone) {
      alert("Vendor ka mobile number available nahi hai.");
      return;
    }

    window.location.href = `tel:${phone}`;
  };

  const whatsappVendor = (phone) => {
    if (!phone) {
      alert("WhatsApp number available nahi hai.");
      return;
    }

    const cleanNumber = String(phone).replace(/\D/g, "");

    const finalNumber =
      cleanNumber.length === 10
        ? `91${cleanNumber}`
        : cleanNumber;

    window.open(
      `https://wa.me/${finalNumber}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="vendor-admin-page">
      <div className="vendor-admin-container">

        <header className="vendor-admin-header">
          <div>
            <span className="vendor-admin-label">
              NISS TECHNOLOGIES
            </span>

            <h1>Vendor Management</h1>

            <p>
              Manage vendors, accounts, payments and vendor
              dashboards from one place.
            </p>
          </div>

          <button
            className="vendor-admin-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </header>

        <section className="vendor-admin-stats">

          <div className="vendor-admin-stat">
            <span>👥</span>
            <strong>{vendors.length}</strong>
            <small>Total Vendors</small>
          </div>

          <div className="vendor-admin-stat active">
            <span>🟢</span>
            <strong>{activeCount}</strong>
            <small>Active Vendors</small>
          </div>

          <div className="vendor-admin-stat inactive">
            <span>🔴</span>
            <strong>{inactiveCount}</strong>
            <small>Inactive Vendors</small>
          </div>

          <div className="vendor-admin-stat pending">
            <span>⏳</span>
            <strong>{pendingCount}</strong>
            <small>Pending Vendors</small>
          </div>

          <div className="vendor-admin-stat money">
            <span>💰</span>
            <strong>{money(totalPayments)}</strong>
            <small>Total Payments</small>
          </div>

        </section>

        <section className="vendor-admin-list-section">

          <div className="vendor-admin-list-header">

            <div>
              <span>VENDOR DATABASE</span>
              <h2>All Vendors</h2>
            </div>

            <button
              className="vendor-admin-add-btn"
              onClick={() => navigate("/add-vendor")}
            >
              ＋ Add Vendor
            </button>

          </div>

          <div className="vendor-admin-controls">

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search name, Vendor ID, mobile, city..."
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>

          </div>

          {loading ? (
            <div className="vendor-admin-empty">
              Loading vendors...
            </div>
          ) : filteredVendors.length === 0 ? (
            <div className="vendor-admin-empty">
              <div>👥</div>
              <h3>No Vendors Found</h3>
              <p>
                Search ya filter change karke dobara try karein.
              </p>
            </div>
          ) : (
            <div className="vendor-admin-table-wrapper">

              <table className="vendor-admin-table">

                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Contact</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Field Staff</th>
                    <th>Joined</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredVendors.map((vendor) => {

                    const status =
                      vendor.status || "Pending";

                    return (
                      <tr
                        key={vendor.id}
                        onClick={() =>
                          setSelectedVendor(vendor)
                        }
                      >

                        <td>
                          <div className="vendor-admin-name">

                            <div className="vendor-admin-avatar">
                              {vendor.name
                                ?.charAt(0)
                                .toUpperCase() || "V"}
                            </div>

                            <div>
                              <strong>
                                {vendor.name || "Unknown"}
                              </strong>

                              <small>
                                {vendor.vendorId || "-"}
                              </small>
                            </div>

                          </div>
                        </td>

                        <td>
                          <strong>
                            {vendor.phone || "-"}
                          </strong>

                          {vendor.whatsapp && (
                            <small>
                              WA: {vendor.whatsapp}
                            </small>
                          )}
                        </td>

                        <td>
                          <span className="category-badge">
                            {vendor.category || "-"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`vendor-status-badge ${String(
                              status
                            ).toLowerCase()}`}
                          >
                            ● {status}
                          </span>
                        </td>

                        <td>
                          <strong>
                            {money(vendor.paymentAmount)}
                          </strong>

                          <small>
                            {vendor.paymentStatus || "Pending"}
                          </small>
                        </td>

                        <td>
                          <strong>
                            {vendor.staffName || "Unassigned"}
                          </strong>

                          <small>
                            {vendor.staffId || "-"}
                          </small>
                        </td>

                        <td>
                          {getDate(vendor.createdAt)}
                        </td>

                        <td
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >
                          <button
                            className="vendor-view-btn"
                            onClick={() =>
                              openVendorDashboard(vendor)
                            }
                          >
                            View Dashboard
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>

            </div>
          )}

        </section>

        {selectedVendor && (
          <div
            className="vendor-admin-modal-overlay"
            onClick={() =>
              setSelectedVendor(null)
            }
          >

            <div
              className="vendor-admin-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="vendor-admin-modal-close"
                onClick={() =>
                  setSelectedVendor(null)
                }
              >
                ×
              </button>

              <div className="vendor-admin-modal-profile">

                <div className="vendor-admin-large-avatar">
                  {selectedVendor.name
                    ?.charAt(0)
                    .toUpperCase() || "V"}
                </div>

                <div>
                  <span>VENDOR PROFILE</span>

                  <h2>
                    {selectedVendor.name || "Unknown"}
                  </h2>

                  <p>
                    {selectedVendor.vendorId || "-"}
                  </p>
                </div>

              </div>

              <div className="vendor-admin-modal-status">
                <span
                  className={`vendor-status-badge ${String(
                    selectedVendor.status || "Pending"
                  ).toLowerCase()}`}
                >
                  ● {selectedVendor.status || "Pending"}
                </span>
              </div>

              <div className="vendor-detail-grid">

                <div>
                  <small>Vendor ID</small>
                  <strong>
                    {selectedVendor.vendorId || "-"}
                  </strong>
                </div>

                <div>
                  <small>Mobile</small>
                  <strong>
                    {selectedVendor.phone || "-"}
                  </strong>
                </div>

                <div>
                  <small>WhatsApp</small>
                  <strong>
                    {selectedVendor.whatsapp || "-"}
                  </strong>
                </div>

                <div>
                  <small>Email</small>
                  <strong>
                    {selectedVendor.email || "-"}
                  </strong>
                </div>

                <div>
                  <small>Category</small>
                  <strong>
                    {selectedVendor.category || "-"}
                  </strong>
                </div>

                <div>
                  <small>Services</small>
                  <strong>
                    {selectedVendor.services || "-"}
                  </strong>
                </div>

                <div>
                  <small>City</small>
                  <strong>
                    {selectedVendor.city || "-"}
                  </strong>
                </div>

                <div>
                  <small>Joining Payment</small>
                  <strong>
                    {money(selectedVendor.paymentAmount)}
                  </strong>
                </div>

                <div>
                  <small>Payment Status</small>
                  <strong>
                    {selectedVendor.paymentStatus || "Pending"}
                  </strong>
                </div>

                <div>
                  <small>Field Staff</small>
                  <strong>
                    {selectedVendor.staffName || "Unassigned"}
                  </strong>
                </div>

                <div>
                  <small>Staff ID</small>
                  <strong>
                    {selectedVendor.staffId || "-"}
                  </strong>
                </div>

                <div>
                  <small>Joined Date</small>
                  <strong>
                    {getDate(selectedVendor.createdAt)}
                  </strong>
                </div>

              </div>

              <div className="vendor-admin-address">
                <small>Address</small>
                <p>
                  {selectedVendor.address || "No address available."}
                </p>
              </div>

              <div className="vendor-admin-notes">
                <small>Notes</small>
                <p>
                  {selectedVendor.notes || "No notes available."}
                </p>
              </div>

              <div className="vendor-admin-modal-actions">

                <button
                  className="call-btn"
                  onClick={() =>
                    callVendor(selectedVendor.phone)
                  }
                >
                  📞 Call Vendor
                </button>

                <button
                  className="whatsapp-btn"
                  onClick={() =>
                    whatsappVendor(
                      selectedVendor.whatsapp ||
                        selectedVendor.phone
                    )
                  }
                >
                  💬 WhatsApp
                </button>

                <button
                  className="dashboard-btn"
                  onClick={() =>
                    openVendorDashboard(selectedVendor)
                  }
                >
                  📊 Open Dashboard
                </button>

              </div>

              <div className="vendor-status-actions">

                <strong>
                  Account Status
                </strong>

                <div>

                  <button
                    className="activate-btn"
                    onClick={() =>
                      changeStatus(
                        selectedVendor,
                        "Active"
                      )
                    }
                  >
                    ✓ Activate
                  </button>

                  <button
                    className="deactivate-btn"
                    onClick={() =>
                      changeStatus(
                        selectedVendor,
                        "Inactive"
                      )
                    }
                  >
                    ⏸ Deactivate
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default VendorAdmin;