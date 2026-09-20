import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase";
import "./VendorManagement.css";

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const vendorsQuery = query(
      collection(db, "vendors"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      vendorsQuery,
      (snapshot) => {
        const vendorData = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setVendors(vendorData);
        setLoading(false);
      },
      (error) => {
        console.error("Vendor loading error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "vendors", id), {
        status: status,
      });

      alert(`Vendor status changed to ${status}`);
    } catch (error) {
      console.error(error);
      alert("Unable to update vendor status.");
    }
  };

  const deleteVendor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "vendors", id));
      alert("Vendor deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to delete vendor.");
    }
  };

  const downloadVendorsCSV = () => {
    if (vendors.length === 0) {
      alert("No vendors available.");
      return;
    }

    const headers = [
      "Vendor ID",
      "Vendor Name",
      "Category",
      "Mobile",
      "City",
      "Payment",
      "Status",
      "Staff ID",
    ];

    const rows = vendors.map((vendor) => [
      vendor.vendorId || vendor.id || "",
      vendor.name || vendor.vendorName || "",
      vendor.category || "",
      vendor.mobile || vendor.phone || "",
      vendor.city || "",
      vendor.payment || 0,
      vendor.status || "Pending",
      vendor.staffId || "",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "niss_vendors.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <section className="vendor-management">

      <div className="vendor-management-header">

        <div>
          <span className="vendor-label">
            VENDOR MANAGEMENT
          </span>

          <h2>
            All Vendors
          </h2>

          <p>
            Manage vendors registered by your field staff.
          </p>
        </div>

        <button
          className="vendor-export-btn"
          onClick={downloadVendorsCSV}
        >
          Download Vendors
        </button>

      </div>

      <div className="vendor-stats">

        <div className="vendor-stat">
          <strong>{vendors.length}</strong>
          <span>Total Vendors</span>
        </div>

        <div className="vendor-stat">
          <strong>
            {
              vendors.filter(
                (vendor) =>
                  String(vendor.status).toLowerCase() ===
                  "active"
              ).length
            }
          </strong>
          <span>Active Vendors</span>
        </div>

        <div className="vendor-stat">
          <strong>
            {
              vendors.filter(
                (vendor) =>
                  String(vendor.status).toLowerCase() ===
                  "pending"
              ).length
            }
          </strong>
          <span>Pending Vendors</span>
        </div>

        <div className="vendor-stat">
          <strong>
            ₹
            {vendors
              .reduce(
                (total, vendor) =>
                  total + Number(vendor.paymentAmount || 0),
                0
              )
              .toLocaleString("en-IN")}
          </strong>
          <span>Total Payments</span>
        </div>

      </div>

      <div className="vendor-table-wrapper">

        {loading ? (
          <div className="vendor-loading">
            Loading vendors...
          </div>
        ) : vendors.length === 0 ? (
          <div className="vendor-empty">
            No vendors found.
          </div>
        ) : (

          <table className="vendor-table">

            <thead>
              <tr>
                <th>Vendor</th>
                <th>Vendor ID</th>
                <th>Category</th>
                <th>Mobile</th>
                <th>City</th>
                <th>Payment</th>
                <th>Staff ID</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {vendors.map((vendor) => (

                <tr key={vendor.id}>

                  <td>
                    <strong>
                      {vendor.name ||
                        vendor.vendorName ||
                        "Unknown Vendor"}
                    </strong>
                  </td>

                  <td>
                    {vendor.vendorId || vendor.id}
                  </td>

                  <td>
                    {vendor.category || "-"}
                  </td>

                  <td>
                    {vendor.mobile ||
                      vendor.phone ||
                      "-"}
                  </td>

                  <td>
                    {vendor.city || "-"}
                  </td>

                  <td>
                    ₹
                    {Number(
                      vendor.paymentAmount || 0
                    ).toLocaleString("en-IN")}
                  </td>

                  <td>
                    {vendor.staffId || "-"}
                  </td>

                  <td>

                    <select
                      value={
                        vendor.status || "Pending"
                      }
                      onChange={(e) =>
                        changeStatus(
                          vendor.id,
                          e.target.value
                        )
                      }
                      className={`vendor-status ${
                        String(
                          vendor.status || "Pending"
                        ).toLowerCase()
                      }`}
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Active">
                        Active
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>

                  </td>

                  <td>

                    <button
                      className="vendor-delete-btn"
                      onClick={() =>
                        deleteVendor(vendor.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </section>
  );
};

export default VendorManagement;