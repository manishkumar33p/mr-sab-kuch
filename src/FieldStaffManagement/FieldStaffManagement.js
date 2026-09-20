import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

const FieldStaffManagement = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [staff, setStaff] = useState({
    name: "",
    phone: "",
    password: "",
    joiningDate: "",
  });

  useEffect(() => {
    const staffQuery = query(
      collection(db, "fieldStaff"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      staffQuery,
      (snapshot) => {
        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setStaffList(data);
        setLoading(false);
      },
      (error) => {
        console.error("Field Staff Error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateStaffId = () => {
    const numbers = staffList
      .map((item) => {
        const match = String(item.staffId || "").match(
          /FS-(\d+)/
        );

        return match ? Number(match[1]) : 0;
      })
      .filter(Boolean);

    const nextNumber =
      numbers.length > 0
        ? Math.max(...numbers) + 1
        : 1;

    return `FS-${String(nextNumber).padStart(3, "0")}`;
  };

  const addStaff = async (e) => {
    e.preventDefault();

    if (
      !staff.name.trim() ||
      !staff.phone.trim() ||
      !staff.password.trim() ||
      !staff.joiningDate
    ) {
      alert(
        "Name, Mobile, Password aur Joining Date required hai."
      );
      return;
    }

    if (staff.phone.trim().length !== 10) {
      alert("Mobile number 10 digit ka hona chahiye.");
      return;
    }

    try {
      setSaving(true);

      const staffId = generateStaffId();

      await addDoc(collection(db, "fieldStaff"), {
        staffId,
        name: staff.name.trim(),
        phone: staff.phone.trim(),
        password: staff.password.trim(),
        joiningDate: staff.joiningDate,
        status: "Active",
        createdAt: serverTimestamp(),
      });

      alert(
        `Field Staff successfully created.\n\nStaff ID: ${staffId}`
      );

      setStaff({
        name: "",
        phone: "",
        password: "",
        joiningDate: "",
      });
    } catch (error) {
      console.error("Add Staff Error:", error);

      alert(
        "Staff create nahi hua. Firebase check karein."
      );
    } finally {
      setSaving(false);
    }
  };

  const changeStatus = async (id, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "Active"
          ? "Inactive"
          : "Active";

      await updateDoc(doc(db, "fieldStaff", id), {
        status: newStatus,
      });
    } catch (error) {
      console.error(error);
      alert("Staff status update nahi hua.");
    }
  };

  const deleteStaff = async (id) => {
    const confirmDelete = window.confirm(
      "Kya aap is Field Staff ko permanently delete karna chahte hain?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "fieldStaff", id));

      alert("Field Staff deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Staff delete nahi hua.");
    }
  };

  return (
    <section
      style={{
        marginTop: "40px",
        padding: "30px",
        background: "#ffffff",
        borderRadius: "18px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >

        <h3>All Field Staff</h3>
        {/* STAFF OVERVIEW */}

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "18px",
    marginBottom: "30px",
    color: "blue"
  }}
>
  {/* TOTAL STAFF */}

  <div
    style={{
      padding: "22px",
      borderRadius: "16px",
      background: "#eff6ff",
      border: "1px solid #dbeafe",
    }}
  >
    <div
      style={{
        fontSize: "13px",
        fontWeight: "700",
        color: "#2563eb",
        letterSpacing: "1px",
      }}
    >
      TOTAL STAFF
    </div>

    <div
      style={{
        fontSize: "34px",
        fontWeight: "800",
        marginTop: "8px",
      }}
    >
      {staffList.length}
    </div>

    <div style={{ color: "#64748b" }}>
      Total registered staff
    </div>
  </div>

  {/* ACTIVE STAFF */}

  <div
    style={{
      padding: "22px",
      borderRadius: "16px",
      background: "#ecfdf5",
      border: "1px solid #bbf7d0",
    }}
  >
    <div
      style={{
        fontSize: "13px",
        fontWeight: "700",
        color: "#16a34a",
        letterSpacing: "1px",
      }}
    >
      ACTIVE STAFF
    </div>

    <div
      style={{
        fontSize: "34px",
        fontWeight: "800",
        marginTop: "8px",
      }}
    >
      {
        staffList.filter(
          (item) =>
            String(
              item.status || "Active"
            ).toLowerCase() === "active"
        ).length
      }
    </div>

    <div style={{ color: "#64748b" }}>
      Currently working
    </div>
  </div>

  {/* INACTIVE STAFF */}

  <div
    style={{
      padding: "22px",
      borderRadius: "16px",
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
    }}
  >
    <div
      style={{
        fontSize: "13px",
        fontWeight: "700",
        color: "#64748b",
        letterSpacing: "1px",
      }}
    >
      INACTIVE STAFF
    </div>

    <div
      style={{
        fontSize: "34px",
        fontWeight: "800",
        marginTop: "8px",
      }}
    >
      {
        staffList.filter(
          (item) =>
            String(
              item.status || "Active"
            ).toLowerCase() === "inactive"
        ).length
      }
    </div>

    <div style={{ color: "#64748b" }}>
      Currently inactive
    </div>
  </div>

  {/* AVAILABLE STAFF */}

  <div
    style={{
      padding: "22px",
      borderRadius: "16px",
      background: "#fff7ed",
      border: "1px solid #fed7aa",
    }}
  >
    <div
      style={{
        fontSize: "13px",
        fontWeight: "700",
        color: "#ea580c",
        letterSpacing: "1px",
      }}
    >
      AVAILABLE STAFF
    </div>

    <div
      style={{
        fontSize: "34px",
        fontWeight: "800",
        marginTop: "8px",
      }}
    >
      {
        staffList.filter(
          (item) =>
            String(
              item.status || "Active"
            ).toLowerCase() === "active"
        ).length
      }
    </div>

    <div style={{ color: "#64748b" }}>
      Available for field work
    </div>
  </div>
</div>
      <div style={{ marginBottom: "25px" }}>
        <span
          style={{
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "2px",
            color: "#2563eb",
          }}
        >
          FIELD STAFF MANAGEMENT
        </span>

        <h2
          style={{
            margin: "8px 0",
            fontSize: "28px",
          }}
        >
          Manage Field Staff
        </h2>

        <p>
          Yahan se aap naye Field Staff create aur manage
          kar sakte hain.
        </p>
      </div>

      {/* ADD STAFF */}

      <form
        onSubmit={addStaff}
        style={{
          padding: "22px",
          marginBottom: "30px",
          borderRadius: "14px",
          background: "#f8fafc",
        }}
      >
        <h3>Add New Field Staff</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "15px",
            marginTop: "18px",
          }}
        >
          <input
            type="text"
            name="name"
            value={staff.name}
            onChange={handleChange}
            placeholder="Staff Name"
            required
          />

          <input
            type="tel"
            name="phone"
            value={staff.phone}
            onChange={handleChange}
            placeholder="Mobile Number"
            maxLength="10"
            required
          />

          <input
            type="password"
            name="password"
            value={staff.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />

          <input
            type="date"
            name="joiningDate"
            value={staff.joiningDate}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            marginTop: "18px",
            padding: "12px 22px",
            border: "none",
            borderRadius: "9px",
            background: "#2563eb",
            color: "#fff",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          {saving
            ? "Creating..."
            : "＋ Create Field Staff"}
        </button>
      </form>

      {/* STAFF LIST */}

      <h3>All Field Staff</h3>

      {loading ? (
        <p>Loading Field Staff...</p>
      ) : staffList.length === 0 ? (
        <p>No Field Staff found.</p>
      ) : (
        <div
          style={{
            overflowX: "auto",
            marginTop: "15px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "850px",
            }}
          >
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {staffList.map((item) => (
                <tr key={item.id}>
                  <td>{item.staffId}</td>

                  <td>
                    <strong>{item.name}</strong>
                  </td>

                  <td>{item.phone}</td>

                  <td>{item.joiningDate || "-"}</td>

                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        changeStatus(
                          item.id,
                          item.status
                        )
                      }
                    >
                      {item.status || "Active"}
                    </button>
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        deleteStaff(item.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default FieldStaffManagement;