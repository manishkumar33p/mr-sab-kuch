import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";
import "./FieldStaffAdmin.css";

const FieldStaffAdmin = () => {
  const [staffList, setStaffList] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [selectedStaff, setSelectedStaff] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* =====================================================
     LOAD STAFF
  ===================================================== */

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "fieldStaff"),
      (snapshot) => {
        const list = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setStaffList(list);
        setLoading(false);
      },
      (error) => {
        console.error("Staff loading error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  /* =====================================================
     LOAD VENDORS
  ===================================================== */

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "vendors"),
      (snapshot) => {
        const list = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setVendors(list);
      },
      (error) => {
        console.error("Vendor loading error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  /* =====================================================
     DATE HELPERS
  ===================================================== */

  const getDate = (value) => {
    if (!value) return null;

    if (typeof value.toDate === "function") {
      return value.toDate();
    }

    if (value instanceof Date) {
      return value;
    }

    const date = new Date(value);

    return isNaN(date.getTime()) ? null : date;
  };

  const getVendorDate = (vendor) => {
    return (
      getDate(vendor.paymentDate) ||
      getDate(vendor.createdAt)
    );
  };

  const isInSelectedMonth = (vendor) => {
    const date = getVendorDate(vendor);

    if (!date) return false;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(
      2,
      "0"
    );

    return `${year}-${month}` === selectedMonth;
  };

  /* =====================================================
     STAFF VENDORS
  ===================================================== */

  const getStaffVendors = (staff) => {
    return vendors.filter(
      (vendor) => vendor.staffId === staff.staffId
    );
  };

  const getStaffMonthlyVendors = (staff) => {
    return getStaffVendors(staff).filter(
      isInSelectedMonth
    );
  };

  /* =====================================================
     PACKAGE AMOUNT
  ===================================================== */

  const getPackageAmount = (vendor) => {
    return Number(
      vendor.packageAmount ??
        vendor.package ??
        vendor.totalPackage ??
        0
    );
  };

  /* =====================================================
     ACTUAL RECEIVED AMOUNT
     
     IMPORTANT:
     Pending = 0 Revenue
     Paid = received amount
     Partial = received amount
  ===================================================== */

  const getCollectedAmount = (vendor) => {
    const status = String(
      vendor.paymentStatus || ""
    ).toLowerCase();

    const amount = Number(
      vendor.receivedAmount ??
        vendor.paymentAmount ??
        0
    );

    if (status === "pending") {
      return 0;
    }

    return amount;
  };

  /* =====================================================
     PENDING AMOUNT
  ===================================================== */

  const getPendingAmount = (vendor) => {
    const packageAmount = getPackageAmount(vendor);
    const collected = getCollectedAmount(vendor);

    return Math.max(
      packageAmount - collected,
      0
    );
  };

  /* =====================================================
     STAFF STATS
  ===================================================== */

  const calculateStaffStats = (staff) => {
    const allVendors = getStaffVendors(staff);

    const monthVendors =
      getStaffMonthlyVendors(staff);

    const totalPackage = allVendors.reduce(
      (sum, vendor) =>
        sum + getPackageAmount(vendor),
      0
    );

    const totalCollected = allVendors.reduce(
      (sum, vendor) =>
        sum + getCollectedAmount(vendor),
      0
    );

    const totalPending = allVendors.reduce(
      (sum, vendor) =>
        sum + getPendingAmount(vendor),
      0
    );

    const monthPackage = monthVendors.reduce(
      (sum, vendor) =>
        sum + getPackageAmount(vendor),
      0
    );

    const monthCollected = monthVendors.reduce(
      (sum, vendor) =>
        sum + getCollectedAmount(vendor),
      0
    );

    const monthPending = monthVendors.reduce(
      (sum, vendor) =>
        sum + getPendingAmount(vendor),
      0
    );

    return {
      totalVendors: allVendors.length,

      totalPackage,
      totalCollected,
      totalPending,

      monthVendors: monthVendors.length,
      monthPackage,
      monthCollected,
      monthPending,
    };
  };

  /* =====================================================
     OVERALL STATS
  ===================================================== */

  const overallStats = useMemo(() => {
    const totalStaff = staffList.length;

    const activeStaff = staffList.filter(
      (staff) =>
        String(staff.status || "Active").toLowerCase() ===
        "active"
    ).length;

    const inactiveStaff =
      totalStaff - activeStaff;

    const monthVendors =
      vendors.filter(isInSelectedMonth);

    const totalPackage = monthVendors.reduce(
      (sum, vendor) =>
        sum + getPackageAmount(vendor),
      0
    );

    const totalCollected = monthVendors.reduce(
      (sum, vendor) =>
        sum + getCollectedAmount(vendor),
      0
    );

    const totalPending = monthVendors.reduce(
      (sum, vendor) =>
        sum + getPendingAmount(vendor),
      0
    );

    return {
      totalStaff,
      activeStaff,
      inactiveStaff,
      totalVendors: monthVendors.length,
      totalPackage,
      totalCollected,
      totalPending,
    };
  }, [staffList, vendors, selectedMonth]);

  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredStaff = useMemo(() => {
    const text = search.toLowerCase().trim();

    if (!text) return staffList;

    return staffList.filter((staff) =>
      [
        staff.name,
        staff.staffId,
        staff.phone,
        staff.email,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(text)
        )
    );
  }, [staffList, search]);

  /* =====================================================
     MONEY
  ===================================================== */

  const money = (amount) => {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  };

  /* =====================================================
     MONTH
  ===================================================== */

  const monthName = (value) => {
    const date = new Date(
      `${value}-01T00:00:00`
    );

    return date.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  /* =====================================================
     STATUS CHANGE
  ===================================================== */

  const changeStaffStatus = async (staff) => {
    try {
      const currentStatus =
        String(
          staff.status || "Active"
        ).toLowerCase();

      const isCurrentlyActive =
        currentStatus === "active";

      const newStatus =
        isCurrentlyActive
          ? "Inactive"
          : "Active";

      const staffRef = doc(
        db,
        "fieldStaff",
        staff.id
      );

      if (newStatus === "Inactive") {
        await updateDoc(staffRef, {
          status: "Inactive",
          inactiveDate: serverTimestamp(),
          lastStatusChangeAt:
            serverTimestamp(),
        });
      } else {
        await updateDoc(staffRef, {
          status: "Active",
          reactivatedDate:
            serverTimestamp(),
          lastStatusChangeAt:
            serverTimestamp(),
        });
      }
    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      alert(
        "Staff status update nahi hua."
      );
    }
  };

  /* =====================================================
     DELETE STAFF
  ===================================================== */

  const deleteStaff = async (staff) => {
    const confirmed = window.confirm(
      `Kya aap ${staff.name} (${staff.staffId}) ko permanently delete karna chahte hain?`
    );

    if (!confirmed) return;

    try {
      await deleteDoc(
        doc(db, "fieldStaff", staff.id)
      );

      setSelectedStaff(null);

      alert(
        "Field Staff successfully deleted."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Staff delete nahi hua."
      );
    }
  };

  /* =====================================================
     DATE DISPLAY
  ===================================================== */

  const formatDate = (value) => {
    const date = getDate(value);

    if (!date) return "-";

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="field-admin-page">

      <div className="field-admin-container">

        {/* HEADER */}

        <header className="field-admin-header">

          <div>
            <span className="field-admin-label">
              NISS TECHNOLOGIES
            </span>

            <h1>
              Field Staff Admin Dashboard
            </h1>

            <p>
              Staff, vendors, packages,
              revenue and performance
            </p>
          </div>

          <div className="month-selector">

            <label>
              Reporting Month
            </label>

            <input
              type="month"
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(
                  e.target.value
                )
              }
            />

          </div>

        </header>

        {/* REPORTING */}

        <div className="reporting-info">
          Reporting:
          <strong>
            {monthName(selectedMonth)}
          </strong>
        </div>

        {/* MAIN STATS */}

        <section className="admin-stat-grid">

          <div className="admin-stat-card">
            <span>👥</span>
            <strong>
              {overallStats.totalStaff}
            </strong>
            <small>
              Total Staff
            </small>
          </div>

          <div className="admin-stat-card">
            <span>🟢</span>
            <strong>
              {overallStats.activeStaff}
            </strong>
            <small>
              Active Staff
            </small>
          </div>

          <div className="admin-stat-card">
            <span>🔴</span>
            <strong>
              {overallStats.inactiveStaff}
            </strong>
            <small>
              Inactive Staff
            </small>
          </div>

          <div className="admin-stat-card">
            <span>🏢</span>
            <strong>
              {overallStats.totalVendors}
            </strong>
            <small>
              Monthly Vendors
            </small>
          </div>

          <div className="admin-stat-card">
            <span>📦</span>
            <strong>
              {money(
                overallStats.totalPackage
              )}
            </strong>
            <small>
              Package Value
            </small>
          </div>

          <div className="admin-stat-card revenue-card">
            <span>💰</span>
            <strong>
              {money(
                overallStats.totalCollected
              )}
            </strong>
            <small>
              Revenue Collected
            </small>
          </div>

          <div className="admin-stat-card pending-card">
            <span>⏳</span>
            <strong>
              {money(
                overallStats.totalPending
              )}
            </strong>
            <small>
              Pending Revenue
            </small>
          </div>

        </section>

        {/* SEARCH */}

        <section className="staff-list-section">

          <div className="section-top">

            <div>
              <span>
                STAFF PERFORMANCE
              </span>

              <h2>
                All Field Staff
              </h2>
            </div>

            <input
              type="text"
              placeholder="Search name, ID or mobile..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          {loading ? (

            <div className="admin-loading">
              Loading Staff...
            </div>

          ) : filteredStaff.length === 0 ? (

            <div className="admin-empty">
              No Field Staff Found.
            </div>

          ) : (

            <div className="staff-table-wrapper">

              <table className="staff-table">

                <thead>
                  <tr>
                    <th>Staff</th>
                    <th>Contact</th>
                    <th>Joining</th>
                    <th>Status</th>
                    <th>Vendors</th>
                    <th>Package</th>
                    <th>Revenue</th>
                    <th>Pending</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredStaff.map(
                    (staff) => {

                      const stats =
                        calculateStaffStats(
                          staff
                        );

                      const active =
                        String(
                          staff.status ||
                            "Active"
                        ).toLowerCase() ===
                        "active";

                      return (

                        <tr
                          key={
                            staff.id
                          }
                        >

                          <td>

                            <div className="staff-name-cell">

                              <div className="staff-avatar">
                                {staff.name
                                  ?.charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>
                                <strong>
                                  {staff.name ||
                                    "Unknown"}
                                </strong>

                                <small>
                                  {staff.staffId}
                                </small>
                              </div>

                            </div>

                          </td>

                          <td>
                            <strong>
                              {staff.phone ||
                                "-"}
                            </strong>

                            {staff.email && (
                              <small>
                                {staff.email}
                              </small>
                            )}
                          </td>

                          <td>
                            {formatDate(
                              staff.joiningDate
                            )}
                          </td>

                          <td>

                            <span
                              className={
                                active
                                  ? "status-active"
                                  : "status-inactive"
                              }
                            >
                              {active
                                ? "● Active"
                                : "● Inactive"}
                            </span>

                          </td>

                          <td>
                            <strong>
                              {
                                stats.monthVendors
                              }
                            </strong>

                            <small>
                              this month
                            </small>
                          </td>

                          <td>
                            {money(
                              stats.monthPackage
                            )}
                          </td>

                          <td className="revenue-text">
                            {money(
                              stats.monthCollected
                            )}
                          </td>

                          <td className="pending-text">
                            {money(
                              stats.monthPending
                            )}
                          </td>

                          <td>

                            <button
                              className="view-staff-btn"
                              onClick={() =>
                                setSelectedStaff(
                                  staff
                                )
                              }
                            >
                              View
                            </button>

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

        {/* STAFF DETAILS */}

        {selectedStaff && (

          <div
            className="staff-modal-overlay"
            onClick={() =>
              setSelectedStaff(null)
            }
          >

            <div
              className="staff-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="staff-modal-close"
                onClick={() =>
                  setSelectedStaff(null)
                }
              >
                ×
              </button>

              <div className="staff-modal-profile">

                <div className="large-staff-avatar">
                  {selectedStaff.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <span>
                    FIELD STAFF
                  </span>

                  <h2>
                    {selectedStaff.name}
                  </h2>

                  <p>
                    {selectedStaff.staffId}
                  </p>

                </div>

              </div>

              <div className="staff-contact-grid">

                <div>
                  <small>
                    Mobile
                  </small>

                  <strong>
                    {selectedStaff.phone ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <small>
                    Password
                  </small>

                  <strong className="password-text">
                    {selectedStaff.password ||
                      "Not Available"}
                  </strong>
                </div>

                <div>
                  <small>
                    Joining Date
                  </small>

                  <strong>
                    {formatDate(
                      selectedStaff.joiningDate
                    )}
                  </strong>
                </div>

                <div>
                  <small>
                    Current Status
                  </small>

                  <strong>
                    {selectedStaff.status ||
                      "Active"}
                  </strong>
                </div>

                <div>
                  <small>
                    Inactive Date
                  </small>

                  <strong>
                    {formatDate(
                      selectedStaff.inactiveDate
                    )}
                  </strong>
                </div>

                <div>
                  <small>
                    Last Reactivated
                  </small>

                  <strong>
                    {formatDate(
                      selectedStaff.reactivatedDate
                    )}
                  </strong>
                </div>

              </div>

              {/* STATUS ACTIONS */}

              <div className="staff-admin-actions">

                <button
                  className={
                    String(
                      selectedStaff.status ||
                        "Active"
                    ).toLowerCase() ===
                    "active"
                      ? "deactivate-btn"
                      : "activate-btn"
                  }
                  onClick={async () => {
                    await changeStaffStatus(
                      selectedStaff
                    );
                  }}
                >
                  {String(
                    selectedStaff.status ||
                      "Active"
                  ).toLowerCase() ===
                  "active"
                    ? "Deactivate Staff"
                    : "Activate Staff"}
                </button>

                <button
                  className="delete-staff-btn"
                  onClick={() =>
                    deleteStaff(
                      selectedStaff
                    )
                  }
                >
                  Delete Staff
                </button>

              </div>

              {/* PERFORMANCE */}

              {(() => {

                const stats =
                  calculateStaffStats(
                    selectedStaff
                  );

                return (

                  <div className="detail-stats">

                    <div>
                      <span>
                        Total Vendors
                      </span>

                      <strong>
                        {stats.totalVendors}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Total Package
                      </span>

                      <strong>
                        {money(
                          stats.totalPackage
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Total Revenue
                      </span>

                      <strong>
                        {money(
                          stats.totalCollected
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Total Pending
                      </span>

                      <strong>
                        {money(
                          stats.totalPending
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        {monthName(
                          selectedMonth
                        )}
                      </span>

                      <strong>
                        {money(
                          stats.monthCollected
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Monthly Package
                      </span>

                      <strong>
                        {money(
                          stats.monthPackage
                        )}
                      </strong>
                    </div>

                  </div>

                );

              })()}

              {/* VENDORS */}

              <div className="staff-vendor-section">

                <div className="staff-vendor-heading">

                  <div>
                    <span>
                      VENDOR DATABASE
                    </span>

                    <h3>
                      Staff Vendors
                    </h3>
                  </div>

                  <strong>
                    {
                      getStaffVendors(
                        selectedStaff
                      ).length
                    }
                  </strong>

                </div>

                <div className="staff-vendor-list">

                  {getStaffVendors(
                    selectedStaff
                  ).length === 0 ? (

                    <p>
                      No vendors added by
                      this staff.
                    </p>

                  ) : (

                    getStaffVendors(
                      selectedStaff
                    ).map(
                      (vendor) => (

                        <div
                          className="staff-vendor-row"
                          key={
                            vendor.id
                          }
                        >

                          <div>
                            <strong>
                              {vendor.name ||
                                "-"}
                            </strong>

                            <small>
                              {vendor.category ||
                                "-"}
                            </small>
                          </div>

                          <div>
                            <small>
                              Package
                            </small>

                            <strong>
                              {money(
                                getPackageAmount(
                                  vendor
                                )
                              )}
                            </strong>
                          </div>

                          <div>
                            <small>
                              Revenue
                            </small>

                            <strong>
                              {money(
                                getCollectedAmount(
                                  vendor
                                )
                              )}
                            </strong>
                          </div>

                          <div>
                            <small>
                              Pending
                            </small>

                            <strong>
                              {money(
                                getPendingAmount(
                                  vendor
                                )
                              )}
                            </strong>
                          </div>

                          <div>
                            <small>
                              Payment
                            </small>

                            <strong>
                              {vendor.paymentStatus ||
                                "Pending"}
                            </strong>
                          </div>

                          <div>
                            <small>
                              Mobile
                            </small>

                            <strong>
                              {vendor.phone ||
                                "-"}
                            </strong>
                          </div>

                        </div>

                      )
                    )

                  )}

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default FieldStaffAdmin;