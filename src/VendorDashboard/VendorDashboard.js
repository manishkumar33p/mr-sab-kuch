

// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   collection,
// //   query,
// //   where,
// //   onSnapshot,
// // } from "firebase/firestore";

// // import { db } from "../firebase";
// // import "./VendorDashboard.css";

// // const VendorDashboard = () => {
// //   const navigate = useNavigate();

// //   const [vendor, setVendor] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const storedVendor = JSON.parse(
// //       localStorage.getItem("vendor")
// //     );

// //     if (!storedVendor) {
// //       setLoading(false);
// //       return;
// //     }

// //     const vendorId =
// //       storedVendor.vendorId || storedVendor.id;

// //     if (!vendorId) {
// //       setLoading(false);
// //       return;
// //     }

// //     const q = query(
// //       collection(db, "vendors"),
// //       where("vendorId", "==", vendorId)
// //     );

// //     const unsubscribe = onSnapshot(
// //       q,
// //       (snapshot) => {
// //         if (!snapshot.empty) {
// //           const data = snapshot.docs[0].data();

// //           setVendor({
// //             id: snapshot.docs[0].id,
// //             ...data,
// //           });
// //         }

// //         setLoading(false);
// //       },
// //       (error) => {
// //         console.error(
// //           "Vendor dashboard error:",
// //           error
// //         );

// //         setLoading(false);
// //       }
// //     );

// //     return () => unsubscribe();
// //   }, []);

// //   const logout = () => {
// //     localStorage.removeItem("vendor");
// //     localStorage.removeItem("vendorLoggedIn");

// //     navigate("/vendor-login");
// //   };

// //   if (loading) {
// //     return (
// //       <div className="vendor-dashboard-loading">
// //         Loading Vendor Dashboard...
// //       </div>
// //     );
// //   }

// //   if (!vendor) {
// //     return (
// //       <div className="vendor-dashboard-empty">
// //         <h2>Vendor Account Not Found</h2>

// //         <p>
// //           Please login with your vendor account.
// //         </p>

// //         <button
// //           onClick={() =>
// //             navigate("/vendor-login")
// //           }
// //         >
// //           Vendor Login
// //         </button>
// //       </div>
// //     );
// //   }

// //   const joiningPayment =
// //     Number(vendor.paymentAmount || 0);

// //   const totalEarnings =
// //     Number(vendor.totalEarnings || 0);

// //   const totalPayments =
// //     Number(vendor.totalPayments || joiningPayment);

// //   const joinDate = vendor.createdAt?.toDate
// //     ? vendor.createdAt
// //         .toDate()
// //         .toLocaleDateString("en-IN")
// //     : "-";

// //   return (
// //     <div className="vendor-dashboard-page">

// //       <div className="vendor-dashboard-container">

// //         {/* HEADER */}

// //         <div className="vendor-dashboard-header">

// //           <div>
// //             <span>
// //               NISS TECHNOLOGIES
// //             </span>

// //             <h1>
// //               Vendor Dashboard
// //             </h1>

// //             <p>
// //               Welcome back, {vendor.name}
// //             </p>
// //           </div>

// //           <button
// //             className="vendor-logout-btn"
// //             onClick={logout}
// //           >
// //             Logout
// //           </button>

// //         </div>

// //         {/* PROFILE */}

// //         <section className="vendor-profile-card">

// //           <div className="vendor-profile-avatar">
// //             {vendor.name
// //               ?.charAt(0)
// //               .toUpperCase()}
// //           </div>

// //           <div className="vendor-profile-info">

// //             <h2>
// //               {vendor.name}
// //             </h2>

// //             <p>
// //               Vendor ID:
// //               <strong>
// //                 {vendor.vendorId || "-"}
// //               </strong>
// //             </p>

// //             <p>
// //               Category:
// //               <strong>
// //                 {vendor.category || "-"}
// //               </strong>
// //             </p>

// //             <p>
// //               Joined:
// //               <strong>
// //                 {joinDate}
// //               </strong>
// //             </p>

// //           </div>

// //           <div
// //             className={`vendor-main-status ${
// //               String(
// //                 vendor.status || "Pending"
// //               ).toLowerCase()
// //             }`}
// //           >
// //             {vendor.status || "Pending"}
// //           </div>

// //         </section>

// //         {/* STATS */}

// //         <section className="vendor-dashboard-stats">

// //           <div className="vendor-dashboard-stat">
// //             <span>💰</span>

// //             <strong>
// //               ₹
// //               {totalEarnings.toLocaleString(
// //                 "en-IN"
// //               )}
// //             </strong>

// //             <p>
// //               Total Earnings
// //             </p>
// //           </div>

// //           <div className="vendor-dashboard-stat">
// //             <span>💳</span>

// //             <strong>
// //               ₹
// //               {joiningPayment.toLocaleString(
// //                 "en-IN"
// //               )}
// //             </strong>

// //             <p>
// //               Joining Payment
// //             </p>
// //           </div>

// //           <div className="vendor-dashboard-stat">
// //             <span>📊</span>

// //             <strong>
// //               ₹
// //               {totalPayments.toLocaleString(
// //                 "en-IN"
// //               )}
// //             </strong>

// //             <p>
// //               Total Payments
// //             </p>
// //           </div>

// //           <div className="vendor-dashboard-stat">
// //             <span>📅</span>

// //             <strong>
// //               {joinDate}
// //             </strong>

// //             <p>
// //               Joined Company
// //             </p>
// //           </div>

// //         </section>

// //         {/* ACCOUNT DETAILS */}

// //         <section className="vendor-dashboard-section">

// //           <div className="vendor-section-title">
// //             <span>
// //               ACCOUNT INFORMATION
// //             </span>

// //             <h2>
// //               My Profile
// //             </h2>
// //           </div>

// //           <div className="vendor-info-grid">

// //             <div>
// //               <small>
// //                 Vendor Name
// //               </small>

// //               <strong>
// //                 {vendor.name || "-"}
// //               </strong>
// //             </div>

// //             <div>
// //               <small>
// //                 Vendor ID
// //               </small>

// //               <strong>
// //                 {vendor.vendorId || "-"}
// //               </strong>
// //             </div>

// //             <div>
// //               <small>
// //                 Mobile Number
// //               </small>

// //               <strong>
// //                 {vendor.phone || "-"}
// //               </strong>
// //             </div>

// //             <div>
// //               <small>
// //                 WhatsApp
// //               </small>

// //               <strong>
// //                 {vendor.whatsapp || "-"}
// //               </strong>
// //             </div>

// //             <div>
// //               <small>
// //                 Email
// //               </small>

// //               <strong>
// //                 {vendor.email || "-"}
// //               </strong>
// //             </div>

// //             <div>
// //               <small>
// //                 City
// //               </small>

// //               <strong>
// //                 {vendor.city || "-"}
// //               </strong>
// //             </div>

// //             <div>
// //               <small>
// //                 Category
// //               </small>

// //               <strong>
// //                 {vendor.category || "-"}
// //               </strong>
// //             </div>

// //             <div>
// //               <small>
// //                 Services
// //               </small>

// //               <strong>
// //                 {vendor.services || "-"}
// //               </strong>
// //             </div>

// //           </div>

// //         </section>

// //         {/* PAYMENT HISTORY */}

// //         <section className="vendor-dashboard-section">

// //           <div className="vendor-section-title">
// //             <span>
// //               FINANCIAL RECORDS
// //             </span>

// //             <h2>
// //               Payment History
// //             </h2>
// //           </div>

// //           <div className="payment-history">

// //             <div className="payment-row">

// //               <div>
// //                 <strong>
// //                   Vendor Joining Payment
// //                 </strong>

// //                 <small>
// //                   {joinDate}
// //                 </small>
// //               </div>

// //               <strong className="payment-success">
// //                 ₹
// //                 {joiningPayment.toLocaleString(
// //                   "en-IN"
// //                 )}
// //               </strong>

// //               <span>
// //                 {vendor.paymentStatus ||
// //                   "Pending"}
// //               </span>

// //             </div>

// //             {totalPayments === 0 && (
// //               <div className="no-payment">
// //                 No additional payment records yet.
// //               </div>
// //             )}

// //           </div>

// //         </section>

// //         {/* MESSAGES */}

// //         <section className="vendor-dashboard-section">

// //           <div className="vendor-section-title">
// //             <span>
// //               COMMUNICATION
// //             </span>

// //             <h2>
// //               Messages
// //             </h2>
// //           </div>

// //           <div className="vendor-message-card">

// //             <div className="message-icon">
// //               💬
// //             </div>

// //             <div>
// //               <h3>
// //                 NISS Technologies
// //               </h3>

// //               <p>
// //                 Welcome to NISS Technologies.
// //                 Your vendor account is active
// //                 and your profile has been
// //                 successfully registered.
// //               </p>

// //               <small>
// //                 Account Registration
// //               </small>
// //             </div>

// //           </div>

// //         </section>

// //         {/* COMPANY JOINING */}

// //         <section className="vendor-joining-card">

// //           <div className="joining-icon">
// //             🎉
// //           </div>

// //           <div>
// //             <span>
// //               MEMBER SINCE
// //             </span>

// //             <h2>
// //               {joinDate}
// //             </h2>

// //             <p>
// //               Thank you for joining
// //               NISS Technologies as a vendor.
// //             </p>
// //           </div>

// //         </section>

// //       </div>

// //     </div>
// //   );
// // };

// // export default VendorDashboard;







// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
// } from "firebase/firestore";

// import { db } from "../firebase";
// import "./VendorDashboard.css";

// const VendorDashboard = () => {
//   const navigate = useNavigate();
//   const { vendorId: routeVendorId } = useParams();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedVendor = JSON.parse(
//       localStorage.getItem("vendor")
//     );

//     const vendorId =
//       routeVendorId ||
//       storedVendor?.vendorId ||
//       storedVendor?.id;

//     if (!vendorId) {
//       setLoading(false);
//       return;
//     }

//     const q = query(
//       collection(db, "vendors"),
//       where("vendorId", "==", vendorId)
//     );

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         if (!snapshot.empty) {
//           const data = snapshot.docs[0].data();

//           setVendor({
//             id: snapshot.docs[0].id,
//             ...data,
//           });
//         } else {
//           setVendor(null);
//         }

//         setLoading(false);
//       },
//       (error) => {
//         console.error(
//           "Vendor dashboard error:",
//           error
//         );

//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, [routeVendorId]);

//   const logout = () => {
//     localStorage.removeItem("vendor");
//     localStorage.removeItem("vendorLoggedIn");

//     navigate("/vendor-login");
//   };

//   const goBackToAdmin = () => {
//     navigate("/vendor-admin");
//   };

//   if (loading) {
//     return (
//       <div className="vendor-dashboard-loading">
//         Loading Vendor Dashboard...
//       </div>
//     );
//   }

//   if (!vendor) {
//     return (
//       <div className="vendor-dashboard-empty">
//         <h2>Vendor Account Not Found</h2>

//         <p>
//           Vendor account available nahi hai.
//         </p>

//         <button
//           onClick={() =>
//             navigate("/vendor-login")
//           }
//         >
//           Vendor Login
//         </button>
//       </div>
//     );
//   }

//   const joiningPayment =
//     Number(vendor.paymentAmount || 0);

//   const totalEarnings =
//     Number(vendor.totalEarnings || 0);

//   const totalPayments =
//     Number(
//       vendor.totalPayments || joiningPayment
//     );

//   const joinDate = vendor.createdAt?.toDate
//     ? vendor.createdAt
//         .toDate()
//         .toLocaleDateString("en-IN")
//     : "-";

//   const isAdminView = Boolean(routeVendorId);

//   return (
//     <div className="vendor-dashboard-page">

//       <div className="vendor-dashboard-container">

//         <div className="vendor-dashboard-header">

//           <div>
//             <span>
//               NISS TECHNOLOGIES
//             </span>

//             <h1>
//               Vendor Dashboard
//             </h1>

//             <p>
//               Welcome back, {vendor.name}
//             </p>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               gap: "10px",
//               flexWrap: "wrap",
//             }}
//           >

//             {isAdminView && (
//               <button
//                 className="vendor-logout-btn"
//                 onClick={goBackToAdmin}
//               >
//                 ← Vendor Management
//               </button>
//             )}

//             {!isAdminView && (
//               <button
//                 className="vendor-logout-btn"
//                 onClick={logout}
//               >
//                 Logout
//               </button>
//             )}

//           </div>

//         </div>

//         {isAdminView && (
//           <div
//             style={{
//               marginBottom: "20px",
//               padding: "14px 18px",
//               borderRadius: "12px",
//               background: "#eff6ff",
//               color: "#1d4ed8",
//               fontWeight: "700",
//             }}
//           >
//             👨‍💼 Admin View — आप इस vendor का dashboard
//             देख रहे हैं।
//           </div>
//         )}

//         <section className="vendor-profile-card">

//           <div className="vendor-profile-avatar">
//             {vendor.name
//               ?.charAt(0)
//               .toUpperCase()}
//           </div>

//           <div className="vendor-profile-info">

//             <h2>
//               {vendor.name}
//             </h2>

//             <p>
//               Vendor ID:
//               <strong>
//                 {vendor.vendorId || "-"}
//               </strong>
//             </p>

//             <p>
//               Category:
//               <strong>
//                 {vendor.category || "-"}
//               </strong>
//             </p>

//             <p>
//               Joined:
//               <strong>
//                 {joinDate}
//               </strong>
//             </p>

//           </div>

//           <div
//             className={`vendor-main-status ${
//               String(
//                 vendor.status || "Pending"
//               ).toLowerCase()
//             }`}
//           >
//             {vendor.status || "Pending"}
//           </div>

//         </section>

//         <section className="vendor-dashboard-stats">

//           <div className="vendor-dashboard-stat">
//             <span>💰</span>

//             <strong>
//               ₹
//               {totalEarnings.toLocaleString(
//                 "en-IN"
//               )}
//             </strong>

//             <p>
//               Total Earnings
//             </p>
//           </div>

//           <div className="vendor-dashboard-stat">
//             <span>💳</span>

//             <strong>
//               ₹
//               {joiningPayment.toLocaleString(
//                 "en-IN"
//               )}
//             </strong>

//             <p>
//               Joining Payment
//             </p>
//           </div>

//           <div className="vendor-dashboard-stat">
//             <span>📊</span>

//             <strong>
//               ₹
//               {totalPayments.toLocaleString(
//                 "en-IN"
//               )}
//             </strong>

//             <p>
//               Total Payments
//             </p>
//           </div>

//           <div className="vendor-dashboard-stat">
//             <span>📅</span>

//             <strong>
//               {joinDate}
//             </strong>

//             <p>
//               Joined Company
//             </p>
//           </div>

//         </section>

//         <section className="vendor-dashboard-section">

//           <div className="vendor-section-title">
//             <span>
//               ACCOUNT INFORMATION
//             </span>

//             <h2>
//               My Profile
//             </h2>
//           </div>

//           <div className="vendor-info-grid">

//             <div>
//               <small>Vendor Name</small>
//               <strong>
//                 {vendor.name || "-"}
//               </strong>
//             </div>

//             <div>
//               <small>Vendor ID</small>
//               <strong>
//                 {vendor.vendorId || "-"}
//               </strong>
//             </div>

//             <div>
//               <small>Mobile Number</small>
//               <strong>
//                 {vendor.phone || "-"}
//               </strong>
//             </div>

//             <div>
//               <small>WhatsApp</small>
//               <strong>
//                 {vendor.whatsapp || "-"}
//               </strong>
//             </div>

//             <div>
//               <small>Email</small>
//               <strong>
//                 {vendor.email || "-"}
//               </strong>
//             </div>

//             <div>
//               <small>City</small>
//               <strong>
//                 {vendor.city || "-"}
//               </strong>
//             </div>

//             <div>
//               <small>Category</small>
//               <strong>
//                 {vendor.category || "-"}
//               </strong>
//             </div>

//             <div>
//               <small>Services</small>
//               <strong>
//                 {vendor.services || "-"}
//               </strong>
//             </div>

//             <div>
//               <small>Field Staff</small>
//               <strong>
//                 {vendor.staffName || "Unassigned"}
//               </strong>
//             </div>

//             <div>
//               <small>Staff ID</small>
//               <strong>
//                 {vendor.staffId || "-"}
//               </strong>
//             </div>

//             <div>
//               <small>Payment Status</small>
//               <strong>
//                 {vendor.paymentStatus || "Pending"}
//               </strong>
//             </div>

//             <div>
//               <small>Account Status</small>
//               <strong>
//                 {vendor.status || "Pending"}
//               </strong>
//             </div>

//           </div>

//         </section>

//         <section className="vendor-dashboard-section">

//           <div className="vendor-section-title">
//             <span>
//               FINANCIAL RECORDS
//             </span>

//             <h2>
//               Payment History
//             </h2>
//           </div>

//           <div className="payment-history">

//             <div className="payment-row">

//               <div>
//                 <strong>
//                   Vendor Joining Payment
//                 </strong>

//                 <small>
//                   {joinDate}
//                 </small>
//               </div>

//               <strong className="payment-success">
//                 ₹
//                 {joiningPayment.toLocaleString(
//                   "en-IN"
//                 )}
//               </strong>

//               <span>
//                 {vendor.paymentStatus ||
//                   "Pending"}
//               </span>

//             </div>

//             {totalPayments === 0 && (
//               <div className="no-payment">
//                 No additional payment records yet.
//               </div>
//             )}

//           </div>

//         </section>

//         <section className="vendor-dashboard-section">

//           <div className="vendor-section-title">
//             <span>
//               COMMUNICATION
//             </span>

//             <h2>
//               Messages
//             </h2>
//           </div>

//           <div className="vendor-message-card">

//             <div className="message-icon">
//               💬
//             </div>

//             <div>
//               <h3>
//                 NISS Technologies
//               </h3>

//               <p>
//                 Welcome to NISS Technologies.
//                 Your vendor account has been
//                 successfully registered.
//               </p>

//               <small>
//                 Account Registration
//               </small>
//             </div>

//           </div>

//         </section>

//         <section className="vendor-joining-card">

//           <div className="joining-icon">
//             🎉
//           </div>

//           <div>
//             <span>
//               MEMBER SINCE
//             </span>

//             <h2>
//               {joinDate}
//             </h2>

//             <p>
//               Thank you for joining
//               NISS Technologies as a vendor.
//             </p>
//           </div>

//         </section>

//       </div>

//     </div>
//   );
// };

// export default VendorDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";
import "./VendorDashboard.css";

const VendorDashboard = () => {
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [packageApplications, setPackageApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packageLoading, setPackageLoading] = useState(true);

  useEffect(() => {
    const storedVendor = JSON.parse(
      localStorage.getItem("vendor")
    );

    if (!storedVendor) {
      setLoading(false);
      setPackageLoading(false);
      return;
    }

    const vendorId =
      storedVendor.vendorId || storedVendor.id;

    if (!vendorId) {
      setLoading(false);
      setPackageLoading(false);
      return;
    }

    /* =====================================================
       LOAD VENDOR
    ===================================================== */

    const vendorQuery = query(
      collection(db, "vendors"),
      where("vendorId", "==", vendorId)
    );

    const unsubscribeVendor = onSnapshot(
      vendorQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];

          setVendor({
            id: doc.id,
            ...doc.data(),
          });
        }

        setLoading(false);
      },
      (error) => {
        console.error(
          "Vendor dashboard error:",
          error
        );

        setLoading(false);
      }
    );

    /* =====================================================
       LOAD PACKAGE APPLICATIONS
    ===================================================== */

    const packageQuery = query(
      collection(db, "vendorPackageApplications"),
      where("vendorId", "==", vendorId)
    );

    const unsubscribePackages = onSnapshot(
      packageQuery,
      (snapshot) => {
        const applications = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => {
            const aTime =
              a.createdAt?.toDate?.()?.getTime() || 0;

            const bTime =
              b.createdAt?.toDate?.()?.getTime() || 0;

            return bTime - aTime;
          });

        setPackageApplications(applications);
        setPackageLoading(false);
      },
      (error) => {
        console.error(
          "Package application error:",
          error
        );

        setPackageLoading(false);
      }
    );

    return () => {
      unsubscribeVendor();
      unsubscribePackages();
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("vendor");
    localStorage.removeItem("vendorLoggedIn");

    navigate("/vendor-login");
  };

  if (loading) {
    return (
      <div className="vendor-dashboard-loading">
        Loading Vendor Dashboard...
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="vendor-dashboard-empty">
        <h2>Vendor Account Not Found</h2>

        <p>
          Please login with your vendor account.
        </p>

        <button
          onClick={() =>
            navigate("/vendor-login")
          }
        >
          Vendor Login
        </button>
      </div>
    );
  }

  const joiningPayment =
    Number(vendor.paymentAmount || 0);

  const totalEarnings =
    Number(vendor.totalEarnings || 0);

  const totalPayments =
    Number(
      vendor.totalPayments || joiningPayment
    );

  const joinDate = vendor.createdAt?.toDate
    ? vendor.createdAt
        .toDate()
        .toLocaleDateString("en-IN")
    : "-";

  /* =====================================================
     PACKAGE PAYMENT DATA
  ===================================================== */

  const latestApplication =
    packageApplications.length > 0
      ? packageApplications[0]
      : null;

  const approvedApplications =
    packageApplications.filter(
      (item) =>
        String(item.paymentStatus || "")
          .toLowerCase() === "approved"
    );

  const pendingApplications =
    packageApplications.filter(
      (item) =>
        String(item.paymentStatus || "")
          .toLowerCase()
          .includes("submitted")
    );

  const approvedAmount =
    approvedApplications.reduce(
      (sum, item) =>
        sum + Number(item.totalAmount || 0),
      0
    );

  const formatMoney = (amount) =>
    `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "-";

    return timestamp
      .toDate()
      .toLocaleDateString("en-IN");
  };

  return (
    <div className="vendor-dashboard-page">

      <div className="vendor-dashboard-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="vendor-dashboard-header">

          <div>
            <span>
              NISS TECHNOLOGIES
            </span>

            <h1>
              Vendor Dashboard
            </h1>

            <p>
              Welcome back, {vendor.name}
            </p>
          </div>

          <button
            className="vendor-logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

        {/* =================================================
            PROFILE
        ================================================= */}

        <section className="vendor-profile-card">

          <div className="vendor-profile-avatar">
            {vendor.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div className="vendor-profile-info">

            <h2>
              {vendor.name}
            </h2>

            <p>
              Vendor ID:
              <strong>
                {vendor.vendorId || "-"}
              </strong>
            </p>

            <p>
              Category:
              <strong>
                {vendor.category || "-"}
              </strong>
            </p>

            <p>
              Joined:
              <strong>
                {joinDate}
              </strong>
            </p>

          </div>

          <div
            className={`vendor-main-status ${
              String(
                vendor.status || "Pending"
              ).toLowerCase()
            }`}
          >
            {vendor.status || "Pending"}
          </div>

        </section>

        {/* =================================================
            PACKAGE PAYMENT STATUS
        ================================================= */}

        <section className="vendor-dashboard-section">

          <div className="vendor-section-title">

            <span>
              PACKAGE & PAYMENT
            </span>

            <h2>
              Subscription Status
            </h2>

          </div>

          {packageLoading ? (

            <div className="no-payment">
              Loading payment information...
            </div>

          ) : !latestApplication ? (

            <div className="no-payment">
              अभी तक कोई package payment application नहीं मिली।
            </div>

          ) : (

            <>

              {/* STATUS CARD */}

              <div
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  marginBottom: "20px",
                  border:
                    "1px solid #e5e7eb",
                  background:
                    "#f8fafc",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >

                  <div>

                    <small>
                      CURRENT PACKAGE
                    </small>

                    <h3
                      style={{
                        margin:
                          "6px 0",
                      }}
                    >
                      {latestApplication.packageName ||
                        "-"}
                    </h3>

                    <p>
                      {latestApplication.duration ||
                        "-"}
                      {" • "}
                      {latestApplication.service ||
                        "-"}
                    </p>

                  </div>

                  <div
                    style={{
                      textAlign:
                        "right",
                    }}
                  >

                    <small>
                      PAYMENT STATUS
                    </small>

                    <h3
                      style={{
                        margin:
                          "6px 0",
                        color:
                          String(
                            latestApplication.paymentStatus ||
                              ""
                          ).toLowerCase() ===
                          "approved"
                            ? "#15803d"
                            : "#b45309",
                      }}
                    >
                      {latestApplication.paymentStatus ||
                        "Pending"}
                    </h3>

                    <p>
                      Package:
                      {" "}
                      {latestApplication.packageStatus ||
                        "Pending"}
                    </p>

                  </div>

                </div>

              </div>

              {/* APPROVED MESSAGE */}

              {String(
                latestApplication.paymentStatus ||
                  ""
              ).toLowerCase() ===
                "approved" && (

                <div
                  style={{
                    padding: "20px",
                    borderRadius: "16px",
                    background:
                      "#ecfdf5",
                    border:
                      "1px solid #86efac",
                    marginBottom:
                      "20px",
                  }}
                >

                  <strong
                    style={{
                      color:
                        "#15803d",
                      fontSize:
                        "18px",
                    }}
                  >
                    ✓ Payment Approved
                  </strong>

                  <p
                    style={{
                      margin:
                        "8px 0 0",
                    }}
                  >
                    आपका payment successfully
                    verify और approve हो गया है।
                  </p>

                  <p>
                    <strong>
                      Approved Amount:
                    </strong>
                    {" "}
                    {formatMoney(
                      latestApplication.totalAmount
                    )}
                  </p>

                  <p>
                    <strong>
                      Transaction / UTR:
                    </strong>
                    {" "}
                    {latestApplication.transactionId ||
                      "-"}
                  </p>

                  <p>
                    <strong>
                      Approved On:
                    </strong>
                    {" "}
                    {formatDate(
                      latestApplication.approvedAt
                    )}
                  </p>

                </div>

              )}

              {/* PENDING MESSAGE */}

              {String(
                latestApplication.paymentStatus ||
                  ""
              ).toLowerCase() !==
                "approved" && (

                <div
                  style={{
                    padding: "20px",
                    borderRadius: "16px",
                    background:
                      "#fffbeb",
                    border:
                      "1px solid #fde68a",
                    marginBottom:
                      "20px",
                  }}
                >

                  <strong
                    style={{
                      color:
                        "#b45309",
                    }}
                  >
                    ⏳ Payment Verification Pending
                  </strong>

                  <p>
                    आपका payment reference
                    successfully submit हो चुका है।
                    NISS Technologies payment verify
                    करने के बाद package activate करेगा।
                  </p>

                  <p>
                    <strong>
                      Submitted Amount:
                    </strong>
                    {" "}
                    {formatMoney(
                      latestApplication.totalAmount
                    )}
                  </p>

                  <p>
                    <strong>
                      UTR / Transaction ID:
                    </strong>
                    {" "}
                    {latestApplication.transactionId ||
                      "-"}
                  </p>

                </div>

              )}

              {/* PAYMENT DETAILS */}

              <div className="vendor-info-grid">

                <div>
                  <small>
                    Package
                  </small>

                  <strong>
                    {latestApplication.packageName ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <small>
                    Duration
                  </small>

                  <strong>
                    {latestApplication.duration ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <small>
                    Service
                  </small>

                  <strong>
                    {latestApplication.service ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <small>
                    Base Amount
                  </small>

                  <strong>
                    {formatMoney(
                      latestApplication.baseAmount
                    )}
                  </strong>
                </div>

                <div>
                  <small>
                    GST 18%
                  </small>

                  <strong>
                    {formatMoney(
                      latestApplication.gstAmount
                    )}
                  </strong>
                </div>

                <div>
                  <small>
                    Total Paid
                  </small>

                  <strong>
                    {formatMoney(
                      latestApplication.totalAmount
                    )}
                  </strong>
                </div>

                <div>
                  <small>
                    Payment Method
                  </small>

                  <strong>
                    {latestApplication.paymentMethod ||
                      "QR"}
                  </strong>
                </div>

                <div>
                  <small>
                    Transaction ID
                  </small>

                  <strong>
                    {latestApplication.transactionId ||
                      "-"}
                  </strong>
                </div>

              </div>

            </>

          )}

        </section>

        {/* =================================================
            APPROVED PAYMENT SUMMARY
        ================================================= */}

        <section className="vendor-dashboard-stats">

          <div className="vendor-dashboard-stat">

            <span>📦</span>

            <strong>
              {packageApplications.length}
            </strong>

            <p>
              Package Applications
            </p>

          </div>

          <div className="vendor-dashboard-stat">

            <span>⏳</span>

            <strong>
              {pendingApplications.length}
            </strong>

            <p>
              Pending Verification
            </p>

          </div>

          <div className="vendor-dashboard-stat">

            <span>✓</span>

            <strong>
              {approvedApplications.length}
            </strong>

            <p>
              Approved Payments
            </p>

          </div>

          <div className="vendor-dashboard-stat">

            <span>💰</span>

            <strong>
              {formatMoney(
                approvedAmount
              )}
            </strong>

            <p>
              Approved Revenue
            </p>

          </div>

        </section>

        {/* =================================================
            ACCOUNT DETAILS
        ================================================= */}

        <section className="vendor-dashboard-section">

          <div className="vendor-section-title">

            <span>
              ACCOUNT INFORMATION
            </span>

            <h2>
              My Profile
            </h2>

          </div>

          <div className="vendor-info-grid">

            <div>
              <small>
                Vendor Name
              </small>

              <strong>
                {vendor.name || "-"}
              </strong>
            </div>

            <div>
              <small>
                Vendor ID
              </small>

              <strong>
                {vendor.vendorId || "-"}
              </strong>
            </div>

            <div>
              <small>
                Mobile Number
              </small>

              <strong>
                {vendor.phone || "-"}
              </strong>
            </div>

            <div>
              <small>
                WhatsApp
              </small>

              <strong>
                {vendor.whatsapp || "-"}
              </strong>
            </div>

            <div>
              <small>
                Email
              </small>

              <strong>
                {vendor.email || "-"}
              </strong>
            </div>

            <div>
              <small>
                City
              </small>

              <strong>
                {vendor.city || "-"}
              </strong>
            </div>

            <div>
              <small>
                Category
              </small>

              <strong>
                {vendor.category || "-"}
              </strong>
            </div>

            <div>
              <small>
                Services
              </small>

              <strong>
                {vendor.services || "-"}
              </strong>
            </div>

          </div>

        </section>

        {/* =================================================
            PAYMENT HISTORY
        ================================================= */}

        <section className="vendor-dashboard-section">

          <div className="vendor-section-title">

            <span>
              PAYMENT HISTORY
            </span>

            <h2>
              All Package Payments
            </h2>

          </div>

          <div className="payment-history">

            {packageApplications.length === 0 ? (

              <div className="no-payment">
                No package payment records yet.
              </div>

            ) : (

              packageApplications.map(
                (payment) => (

                  <div
                    className="payment-row"
                    key={payment.id}
                  >

                    <div>

                      <strong>
                        {payment.packageName ||
                          "Vendor Package"}
                      </strong>

                      <small>
                        {payment.service ||
                          "-"}
                        {" • "}
                        {payment.duration ||
                          "-"}
                      </small>

                      <small>
                        UTR:
                        {" "}
                        {payment.transactionId ||
                          "-"}
                      </small>

                    </div>

                    <strong
                      className={
                        String(
                          payment.paymentStatus ||
                            ""
                        ).toLowerCase() ===
                        "approved"
                          ? "payment-success"
                          : ""
                      }
                    >
                      {formatMoney(
                        payment.totalAmount
                      )}
                    </strong>

                    <span>
                      {payment.paymentStatus ||
                        "Pending"}
                    </span>

                  </div>

                )
              )

            )}

          </div>

        </section>

        {/* =================================================
            OLD FINANCIAL SECTION
        ================================================= */}

        <section className="vendor-dashboard-section">

          <div className="vendor-section-title">

            <span>
              FINANCIAL RECORDS
            </span>

            <h2>
              Account Financial Summary
            </h2>

          </div>

          <div className="vendor-dashboard-stats">

            <div className="vendor-dashboard-stat">

              <span>💰</span>

              <strong>
                {formatMoney(
                  totalEarnings
                )}
              </strong>

              <p>
                Total Earnings
              </p>

            </div>

            <div className="vendor-dashboard-stat">

              <span>💳</span>

              <strong>
                {formatMoney(
                  joiningPayment
                )}
              </strong>

              <p>
                Joining Payment
              </p>

            </div>

            <div className="vendor-dashboard-stat">

              <span>📊</span>

              <strong>
                {formatMoney(
                  totalPayments
                )}
              </strong>

              <p>
                Total Payments
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            MESSAGES
        ================================================= */}

        <section className="vendor-dashboard-section">

          <div className="vendor-section-title">

            <span>
              COMMUNICATION
            </span>

            <h2>
              Messages
            </h2>

          </div>

          <div className="vendor-message-card">

            <div className="message-icon">
              💬
            </div>

            <div>

              <h3>
                NISS Technologies
              </h3>

              <p>
                Welcome to NISS Technologies.
                Your vendor account information,
                package payments and verification
                status will appear here.
              </p>

              <small>
                Vendor Account
              </small>

            </div>

          </div>

        </section>

        {/* =================================================
            COMPANY JOINING
        ================================================= */}

        <section className="vendor-joining-card">

          <div className="joining-icon">
            🎉
          </div>

          <div>

            <span>
              MEMBER SINCE
            </span>

            <h2>
              {joinDate}
            </h2>

            <p>
              Thank you for joining
              NISS Technologies as a vendor.
            </p>

          </div>

        </section>

      </div>

    </div>
  );
};

export default VendorDashboard;

