// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   onSnapshot,
//   doc,
//   updateDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// import { db } from "../firebase";
// import "./VendorPackageAdmin.css";

// const VendorPackageAdmin = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [processingId, setProcessingId] = useState("");

//   useEffect(() => {
//     const ref = collection(db, "vendorPackageApplications");

//     const unsubscribe = onSnapshot(
//       ref,
//       (snapshot) => {
//         const list = snapshot.docs.map((item) => ({
//           id: item.id,
//           ...item.data(),
//         }));

//         list.sort((a, b) => {
//           const dateA = a.createdAt?.toDate?.() || new Date(0);
//           const dateB = b.createdAt?.toDate?.() || new Date(0);

//           return dateB - dateA;
//         });

//         setApplications(list);
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Package applications error:", error);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   const money = (amount) =>
//     `₹${Number(amount || 0).toLocaleString("en-IN")}`;

//   const formatDate = (timestamp) => {
//     if (!timestamp?.toDate) return "-";

//     return timestamp.toDate().toLocaleString("en-IN");
//   };

//   const approvePayment = async (application) => {
//     const confirmApprove = window.confirm(
//       `क्या आप ${application.vendorName} का ${money(
//         application.totalAmount
//       )} payment APPROVE करना चाहते हैं?`
//     );

//     if (!confirmApprove) return;

//     try {
//       setProcessingId(application.id);

//       /*
//        * 1. Package application को Approved करेंगे
//        */
//       await updateDoc(
//         doc(
//           db,
//           "vendorPackageApplications",
//           application.id
//         ),
//         {
//           paymentStatus: "Approved",
//           packageStatus: "Active",
//           approvedAt: serverTimestamp(),
//           verifiedBy: "Admin",
//         }
//       );

//       /*
//        * 2. Vendor के main document को भी update करेंगे
//        */
//       const vendorRef = doc(
//         db,
//         "vendors",
//         application.vendorId
//       );

//       const expiryDate = new Date();

//       expiryDate.setMonth(
//         expiryDate.getMonth() +
//           Number(application.durationMonths || 1)
//       );

//       await updateDoc(vendorRef, {
//         activePackage: application.packageName,
//         packageId: application.packageId,
//         packageDuration: application.duration,
//         packageStatus: "Active",

//         packageBaseAmount:
//           Number(application.baseAmount || 0),

//         packageGST:
//           Number(application.gstAmount || 0),

//         packagePaidAmount:
//           Number(application.totalAmount || 0),

//         packagePaymentStatus: "Approved",

//         packageTransactionId:
//           application.transactionId || "",

//         packageApprovedAt:
//           serverTimestamp(),

//         packageExpiry:
//           expiryDate.toISOString(),

//         /*
//          * Revenue में केवल APPROVED payment जाएगा
//          */
//         totalPackageRevenue:
//           Number(application.totalAmount || 0),
//       });

//       alert(
//         "Payment Approved successfully!\nVendor package अब Active है."
//       );
//     } catch (error) {
//       console.error("Approve payment error:", error);

//       alert(
//         "Payment approve नहीं हो पाया। Firebase में vendor document ID check करें."
//       );
//     } finally {
//       setProcessingId("");
//     }
//   };

//   const rejectPayment = async (application) => {
//     const reason = window.prompt(
//       "Payment reject करने का reason लिखिए:"
//     );

//     if (reason === null) return;

//     try {
//       setProcessingId(application.id);

//       await updateDoc(
//         doc(
//           db,
//           "vendorPackageApplications",
//           application.id
//         ),
//         {
//           paymentStatus: "Rejected",
//           packageStatus: "Rejected",
//           rejectionReason: reason,
//           rejectedAt: serverTimestamp(),
//           verifiedBy: "Admin",
//         }
//       );

//       alert("Payment Rejected.");
//     } catch (error) {
//       console.error("Reject payment error:", error);

//       alert(
//         "Payment reject नहीं हो पाया."
//       );
//     } finally {
//       setProcessingId("");
//     }
//   };

//   const pendingApplications =
//     applications.filter(
//       (item) =>
//         item.paymentStatus === "Payment Submitted" ||
//         item.packageStatus === "Pending Verification"
//     );

//   const approvedApplications =
//     applications.filter(
//       (item) =>
//         item.paymentStatus === "Approved"
//     );

//   return (
//     <div className="package-admin-page">
//       <div className="package-admin-container">

//         <div className="package-admin-header">
//           <div>
//             <span>NISS TECHNOLOGIES</span>

//             <h1>
//               Vendor Package Payments
//             </h1>

//             <p>
//               Verify vendor QR payments and activate packages
//             </p>
//           </div>

//           <div className="admin-count-box">
//             <strong>
//               {pendingApplications.length}
//             </strong>

//             <small>
//               Pending Verification
//             </small>
//           </div>
//         </div>

//         <div className="package-admin-stats">

//           <div>
//             <span>⏳</span>
//             <strong>
//               {pendingApplications.length}
//             </strong>
//             <small>
//               Pending
//             </small>
//           </div>

//           <div>
//             <span>✅</span>
//             <strong>
//               {approvedApplications.length}
//             </strong>
//             <small>
//               Approved
//             </small>
//           </div>

//           <div>
//             <span>💰</span>
//             <strong>
//               {money(
//                 approvedApplications.reduce(
//                   (sum, item) =>
//                     sum +
//                     Number(
//                       item.totalAmount || 0
//                     ),
//                   0
//                 )
//               )}
//             </strong>
//             <small>
//               Approved Revenue
//             </small>
//           </div>

//         </div>

//         <section className="package-admin-section">

//           <div className="section-heading">
//             <span>
//               PAYMENT VERIFICATION
//             </span>

//             <h2>
//               Pending Payments
//             </h2>
//           </div>

//           {loading ? (
//             <div className="admin-message">
//               Loading payments...
//             </div>
//           ) : pendingApplications.length === 0 ? (
//             <div className="admin-message">
//               No pending payment applications.
//             </div>
//           ) : (
//             <div className="payment-admin-list">

//               {pendingApplications.map(
//                 (application) => (
//                   <div
//                     className="payment-admin-card"
//                     key={application.id}
//                   >

//                     <div className="payment-card-top">

//                       <div>
//                         <span>
//                           VENDOR
//                         </span>

//                         <h3>
//                           {application.vendorName}
//                         </h3>

//                         <p>
//                           Vendor ID:{" "}
//                           <strong>
//                             {application.vendorId}
//                           </strong>
//                         </p>
//                       </div>

//                       <div className="payment-status pending">
//                         PENDING
//                       </div>

//                     </div>

//                     <div className="payment-details-grid">

//                       <div>
//                         <small>
//                           Mobile
//                         </small>

//                         <strong>
//                           {application.phone || "-"}
//                         </strong>
//                       </div>

//                       <div>
//                         <small>
//                           Service
//                         </small>

//                         <strong>
//                           {application.service || "-"}
//                         </strong>
//                       </div>

//                       <div>
//                         <small>
//                           Package
//                         </small>

//                         <strong>
//                           {application.packageName}
//                         </strong>
//                       </div>

//                       <div>
//                         <small>
//                           Duration
//                         </small>

//                         <strong>
//                           {application.duration}
//                         </strong>
//                       </div>

//                       <div>
//                         <small>
//                           Base Amount
//                         </small>

//                         <strong>
//                           {money(
//                             application.baseAmount
//                           )}
//                         </strong>
//                       </div>

//                       <div>
//                         <small>
//                           GST 18%
//                         </small>

//                         <strong>
//                           {money(
//                             application.gstAmount
//                           )}
//                         </strong>
//                       </div>

//                       <div>
//                         <small>
//                           Total Paid
//                         </small>

//                         <strong className="amount-green">
//                           {money(
//                             application.totalAmount
//                           )}
//                         </strong>
//                       </div>

//                       <div>
//                         <small>
//                           Submitted
//                         </small>

//                         <strong>
//                           {formatDate(
//                             application.createdAt
//                           )}
//                         </strong>
//                       </div>

//                     </div>

//                     <div className="utr-box">

//                       <span>
//                         UTR / TRANSACTION ID
//                       </span>

//                       <strong>
//                         {application.transactionId ||
//                           "-"}
//                       </strong>

//                     </div>

//                     <div className="payment-actions">

//                       <button
//                         className="approve-btn"
//                         disabled={
//                           processingId ===
//                           application.id
//                         }
//                         onClick={() =>
//                           approvePayment(
//                             application
//                           )
//                         }
//                       >
//                         {processingId ===
//                         application.id
//                           ? "Processing..."
//                           : "✓ Approve Payment"}
//                       </button>

//                       <button
//                         className="reject-btn"
//                         disabled={
//                           processingId ===
//                           application.id
//                         }
//                         onClick={() =>
//                           rejectPayment(
//                             application
//                           )
//                         }
//                       >
//                         ✕ Reject
//                       </button>

//                     </div>

//                   </div>
//                 )
//               )}

//             </div>
//           )}

//         </section>

//         <section className="package-admin-section">

//           <div className="section-heading">
//             <span>
//               PAYMENT HISTORY
//             </span>

//             <h2>
//               Approved Payments
//             </h2>
//           </div>

//           {approvedApplications.length === 0 ? (
//             <div className="admin-message">
//               No approved payments yet.
//             </div>
//           ) : (
//             <div className="approved-table-wrapper">

//               <table className="approved-table">

//                 <thead>
//                   <tr>
//                     <th>Vendor</th>
//                     <th>Vendor ID</th>
//                     <th>Service</th>
//                     <th>Package</th>
//                     <th>Amount</th>
//                     <th>UTR</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   {approvedApplications.map(
//                     (application) => (
//                       <tr key={application.id}>

//                         <td>
//                           {application.vendorName}
//                         </td>

//                         <td>
//                           {application.vendorId}
//                         </td>

//                         <td>
//                           {application.service}
//                         </td>

//                         <td>
//                           {application.packageName}
//                         </td>

//                         <td>
//                           {money(
//                             application.totalAmount
//                           )}
//                         </td>

//                         <td>
//                           {application.transactionId}
//                         </td>

//                         <td>
//                           <span className="approved-status">
//                             ✓ Approved
//                           </span>
//                         </td>

//                       </tr>
//                     )
//                   )}

//                 </tbody>

//               </table>

//             </div>
//           )}

//         </section>

//       </div>
//     </div>
//   );
// };

// export default VendorPackageAdmin;





import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";
import "./VendorPackageAdmin.css";

const VendorPackageAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");

  // =========================================
  // REVENUE FILTERS
  // =========================================

  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] = useState(
    `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`
  );

  const [selectedYear, setSelectedYear] = useState(
    String(currentDate.getFullYear())
  );

  // =========================================
  // LOAD APPLICATIONS
  // =========================================

  useEffect(() => {
    const ref = collection(
      db,
      "vendorPackageApplications"
    );

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const list = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        list.sort((a, b) => {
          const dateA =
            a.createdAt?.toDate?.() || new Date(0);

          const dateB =
            b.createdAt?.toDate?.() || new Date(0);

          return dateB - dateA;
        });

        setApplications(list);
        setLoading(false);
      },
      (error) => {
        console.error(
          "Package applications error:",
          error
        );

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // =========================================
  // HELPERS
  // =========================================

  const money = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const getDate = (application) => {
    if (!application?.createdAt) return null;

    if (
      typeof application.createdAt.toDate ===
      "function"
    ) {
      return application.createdAt.toDate();
    }

    if (application.createdAt instanceof Date) {
      return application.createdAt;
    }

    return null;
  };

  const formatDate = (timestamp) => {
    const date = getDate({
      createdAt: timestamp,
    });

    if (!date) return "-";

    return date.toLocaleString("en-IN");
  };

  const getApprovedAmount = (application) => {
    if (
      application.paymentStatus !==
      "Approved"
    ) {
      return 0;
    }

    return Number(
      application.totalAmount || 0
    );
  };

  // =========================================
  // APPROVED PAYMENTS
  // =========================================

  const approvedApplications = useMemo(() => {
    return applications.filter(
      (item) =>
        item.paymentStatus === "Approved"
    );
  }, [applications]);

  // =========================================
  // PENDING PAYMENTS
  // =========================================

  const pendingApplications = useMemo(() => {
    return applications.filter(
      (item) =>
        item.paymentStatus ===
          "Payment Submitted" ||
        item.packageStatus ===
          "Pending Verification"
    );
  }, [applications]);

  // =========================================
  // TOTAL REVENUE
  // =========================================

  const totalRevenue = useMemo(() => {
    return approvedApplications.reduce(
      (sum, application) =>
        sum + getApprovedAmount(application),
      0
    );
  }, [approvedApplications]);

  // =========================================
  // MONTHLY REVENUE
  // =========================================

  const monthlyRevenue = useMemo(() => {
    return approvedApplications.reduce(
      (sum, application) => {
        const date = getDate(application);

        if (!date) return sum;

        const year = date.getFullYear();

        const month = String(
          date.getMonth() + 1
        ).padStart(2, "0");

        const applicationMonth =
          `${year}-${month}`;

        if (
          applicationMonth ===
          selectedMonth
        ) {
          return (
            sum +
            getApprovedAmount(application)
          );
        }

        return sum;
      },
      0
    );
  }, [
    approvedApplications,
    selectedMonth,
  ]);

  // =========================================
  // YEARLY REVENUE
  // =========================================

  const yearlyRevenue = useMemo(() => {
    return approvedApplications.reduce(
      (sum, application) => {
        const date = getDate(application);

        if (!date) return sum;

        const year = String(
          date.getFullYear()
        );

        if (year === selectedYear) {
          return (
            sum +
            getApprovedAmount(application)
          );
        }

        return sum;
      },
      0
    );
  }, [
    approvedApplications,
    selectedYear,
  ]);

  // =========================================
  // SELECTED MONTH NAME
  // =========================================

  const selectedMonthName = useMemo(() => {
    const date = new Date(
      `${selectedMonth}-01T00:00:00`
    );

    return date.toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    );
  }, [selectedMonth]);

  // =========================================
  // MONTHLY TRANSACTIONS
  // =========================================

  const selectedMonthApplications =
    useMemo(() => {
      return approvedApplications.filter(
        (application) => {
          const date =
            getDate(application);

          if (!date) return false;

          const year =
            date.getFullYear();

          const month = String(
            date.getMonth() + 1
          ).padStart(2, "0");

          return (
            `${year}-${month}` ===
            selectedMonth
          );
        }
      );
    }, [
      approvedApplications,
      selectedMonth,
    ]);

  // =========================================
  // YEARLY TRANSACTIONS
  // =========================================

  const selectedYearApplications =
    useMemo(() => {
      return approvedApplications.filter(
        (application) => {
          const date =
            getDate(application);

          if (!date) return false;

          return (
            String(date.getFullYear()) ===
            selectedYear
          );
        }
      );
    }, [
      approvedApplications,
      selectedYear,
    ]);

  // =========================================
  // MONTH OPTIONS
  // =========================================

  const monthOptions = useMemo(() => {
    const options = [];

    const startYear = 2025;
    const endYear =
      Math.max(
        currentDate.getFullYear(),
        2027
      );

    for (
      let year = startYear;
      year <= endYear;
      year++
    ) {
      for (
        let month = 1;
        month <= 12;
        month++
      ) {
        const value =
          `${year}-${String(
            month
          ).padStart(2, "0")}`;

        const date = new Date(
          `${value}-01T00:00:00`
        );

        options.push({
          value,
          label:
            date.toLocaleDateString(
              "en-IN",
              {
                month: "long",
                year: "numeric",
              }
            ),
        });
      }
    }

    return options.reverse();
  }, []);

  // =========================================
  // YEAR OPTIONS
  // =========================================

  const yearOptions = useMemo(() => {
    const years = [];

    const startYear = 2025;

    const endYear =
      Math.max(
        currentDate.getFullYear() + 2,
        2027
      );

    for (
      let year = startYear;
      year <= endYear;
      year++
    ) {
      years.push(String(year));
    }

    return years.reverse();
  }, []);

  // =========================================
  // APPROVE PAYMENT
  // =========================================

  const approvePayment = async (
    application
  ) => {
    const confirmApprove =
      window.confirm(
        `क्या आप ${application.vendorName} का ${money(
          application.totalAmount
        )} payment APPROVE करना चाहते हैं?`
      );

    if (!confirmApprove) return;

    try {
      setProcessingId(application.id);

      // 1. APPLICATION UPDATE

      await updateDoc(
        doc(
          db,
          "vendorPackageApplications",
          application.id
        ),
        {
          paymentStatus: "Approved",
          packageStatus: "Active",
          approvedAt:
            serverTimestamp(),
          verifiedBy: "Admin",
        }
      );

      // 2. VENDOR UPDATE

      const vendorRef = doc(
        db,
        "vendors",
        application.vendorId
      );

      const expiryDate = new Date();

      expiryDate.setMonth(
        expiryDate.getMonth() +
          Number(
            application.durationMonths || 1
          )
      );

      await updateDoc(vendorRef, {
        activePackage:
          application.packageName,

        packageId:
          application.packageId,

        packageDuration:
          application.duration,

        packageStatus: "Active",

        packageBaseAmount:
          Number(
            application.baseAmount || 0
          ),

        packageGST:
          Number(
            application.gstAmount || 0
          ),

        packagePaidAmount:
          Number(
            application.totalAmount || 0
          ),

        packagePaymentStatus:
          "Approved",

        packageTransactionId:
          application.transactionId ||
          "",

        packageApprovedAt:
          serverTimestamp(),

        packageExpiry:
          expiryDate.toISOString(),

        // Approved revenue only
        totalPackageRevenue:
          Number(
            application.totalAmount || 0
          ),
      });

      alert(
        "Payment Approved successfully!\nVendor package अब Active है."
      );
    } catch (error) {
      console.error(
        "Approve payment error:",
        error
      );

      alert(
        "Payment approve नहीं हो पाया। Firebase में vendor document ID check करें."
      );
    } finally {
      setProcessingId("");
    }
  };

  // =========================================
  // REJECT PAYMENT
  // =========================================

  const rejectPayment = async (
    application
  ) => {
    const reason = window.prompt(
      "Payment reject करने का reason लिखिए:"
    );

    if (reason === null) return;

    try {
      setProcessingId(application.id);

      await updateDoc(
        doc(
          db,
          "vendorPackageApplications",
          application.id
        ),
        {
          paymentStatus: "Rejected",
          packageStatus: "Rejected",
          rejectionReason: reason,
          rejectedAt:
            serverTimestamp(),
          verifiedBy: "Admin",
        }
      );

      alert("Payment Rejected.");
    } catch (error) {
      console.error(
        "Reject payment error:",
        error
      );

      alert(
        "Payment reject नहीं हो पाया."
      );
    } finally {
      setProcessingId("");
    }
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="package-admin-page">

      <div className="package-admin-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="package-admin-header">

          <div>
            <span>
              NISS TECHNOLOGIES
            </span>

            <h1>
              Vendor Package Payments
            </h1>

            <p>
              Verify vendor QR payments and
              manage package revenue
            </p>
          </div>

          <div className="admin-count-box">
            <strong>
              {pendingApplications.length}
            </strong>

            <small>
              Pending Verification
            </small>
          </div>

        </div>

        {/* =====================================
            BASIC STATS
        ===================================== */}

        <div className="package-admin-stats">

          <div>
            <span>⏳</span>

            <strong>
              {pendingApplications.length}
            </strong>

            <small>
              Pending
            </small>
          </div>

          <div>
            <span>✅</span>

            <strong>
              {approvedApplications.length}
            </strong>

            <small>
              Approved
            </small>
          </div>

          <div>
            <span>💰</span>

            <strong>
              {money(totalRevenue)}
            </strong>

            <small>
              Total Revenue
            </small>
          </div>

        </div>

        {/* =====================================
            REVENUE DASHBOARD
        ===================================== */}

        <section className="revenue-summary-section">

          <div className="revenue-summary-header">

            <span>
              REVENUE ANALYTICS
            </span>

            <h2>
              Revenue Overview
            </h2>

            <p>
              केवल Approved payments revenue
              में calculate होंगे।
            </p>

          </div>

          <div className="revenue-summary-grid">

            {/* TOTAL */}

            <div className="revenue-summary-card revenue-total-card">

              <div className="revenue-summary-icon">
                💰
              </div>

              <small>
                TOTAL REVENUE
              </small>

              <strong>
                {money(totalRevenue)}
              </strong>

              <p>
                All-time approved revenue
              </p>

            </div>

            {/* MONTHLY */}

            <div className="revenue-summary-card revenue-monthly-card">

              <div className="revenue-summary-icon">
                📅
              </div>

              <small>
                MONTHLY REVENUE
              </small>

              <strong>
                {money(monthlyRevenue)}
              </strong>

              <p>
                {selectedMonthName}
              </p>

            </div>

            {/* YEARLY */}

            <div className="revenue-summary-card revenue-yearly-card">

              <div className="revenue-summary-icon">
                📊
              </div>

              <small>
                YEARLY REVENUE
              </small>

              <strong>
                {money(yearlyRevenue)}
              </strong>

              <p>
                Financial year: {selectedYear}
              </p>

            </div>

          </div>

        </section>

        {/* =====================================
            REVENUE FILTERS
        ===================================== */}

        <section className="revenue-filter-section">

          <div className="revenue-filter-header">

            <span>
              REVENUE FILTER
            </span>

            <h2>
              Select Month & Year
            </h2>

          </div>

          <div className="revenue-filter-grid">

            {/* MONTH */}

            <div className="revenue-filter-card">

              <label>
                📅 Monthly Revenue
              </label>

              <select
                value={selectedMonth}
                onChange={(e) =>
                  setSelectedMonth(
                    e.target.value
                  )
                }
              >

                {monthOptions.map(
                  (month) => (
                    <option
                      value={month.value}
                      key={month.value}
                    >
                      {month.label}
                    </option>
                  )
                )}

              </select>

              <strong>
                {selectedMonthName}
              </strong>

              <span>
                {selectedMonthApplications.length} approved payment(s)
              </span>

            </div>

            {/* YEAR */}

            <div className="revenue-filter-card">

              <label>
                📊 Yearly Revenue
              </label>

              <select
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(
                    e.target.value
                  )
                }
              >

                {yearOptions.map(
                  (year) => (
                    <option
                      value={year}
                      key={year}
                    >
                      {year}
                    </option>
                  )
                )}

              </select>

              <strong>
                {money(yearlyRevenue)}
              </strong>

              <span>
                {selectedYearApplications.length} approved payment(s)
              </span>

            </div>

          </div>

        </section>

        {/* =====================================
            SELECTED MONTH DETAIL
        ===================================== */}

        <section className="revenue-breakdown">

          <div className="revenue-breakdown-title">

            <span>
              MONTHLY REPORT
            </span>

            <h3>
              {selectedMonthName}
            </h3>

          </div>

          {selectedMonthApplications.length ===
          0 ? (

            <div className="revenue-no-data">
              <span>📭</span>

              <strong>
                No approved revenue
              </strong>

              <p>
                इस महीने अभी कोई approved
                payment नहीं है।
              </p>

              <b>
                ₹0
              </b>
            </div>

          ) : (

            <div className="revenue-report-list">

              {selectedMonthApplications.map(
                (application) => (

                  <div
                    className="revenue-report-row"
                    key={application.id}
                  >

                    <div>
                      <strong>
                        {application.vendorName}
                      </strong>

                      <small>
                        {application.vendorId}
                      </small>
                    </div>

                    <div>
                      <span>
                        Service
                      </span>

                      <strong>
                        {application.service ||
                          "-"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Package
                      </span>

                      <strong>
                        {application.packageName}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Date
                      </span>

                      <strong>
                        {formatDate(
                          application.approvedAt ||
                            application.createdAt
                        )}
                      </strong>
                    </div>

                    <div className="report-amount">
                      <span>
                        Approved Revenue
                      </span>

                      <strong>
                        {money(
                          application.totalAmount
                        )}
                      </strong>
                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

        {/* =====================================
            PENDING PAYMENTS
        ===================================== */}

        <section className="package-admin-section">

          <div className="section-heading">

            <span>
              PAYMENT VERIFICATION
            </span>

            <h2>
              Pending Payments
            </h2>

          </div>

          {loading ? (

            <div className="admin-message">
              Loading payments...
            </div>

          ) : pendingApplications.length ===
            0 ? (

            <div className="admin-message">
              No pending payment applications.
            </div>

          ) : (

            <div className="payment-admin-list">

              {pendingApplications.map(
                (application) => (

                  <div
                    className="payment-admin-card"
                    key={application.id}
                  >

                    <div className="payment-card-top">

                      <div>

                        <span>
                          VENDOR
                        </span>

                        <h3>
                          {application.vendorName}
                        </h3>

                        <p>
                          Vendor ID:{" "}
                          <strong>
                            {application.vendorId}
                          </strong>
                        </p>

                      </div>

                      <div className="payment-status pending">
                        PENDING
                      </div>

                    </div>

                    <div className="payment-details-grid">

                      <div>
                        <small>
                          Mobile
                        </small>

                        <strong>
                          {application.phone ||
                            "-"}
                        </strong>
                      </div>

                      <div>
                        <small>
                          Service
                        </small>

                        <strong>
                          {application.service ||
                            "-"}
                        </strong>
                      </div>

                      <div>
                        <small>
                          Package
                        </small>

                        <strong>
                          {application.packageName}
                        </strong>
                      </div>

                      <div>
                        <small>
                          Duration
                        </small>

                        <strong>
                          {application.duration}
                        </strong>
                      </div>

                      <div>
                        <small>
                          Base Amount
                        </small>

                        <strong>
                          {money(
                            application.baseAmount
                          )}
                        </strong>
                      </div>

                      <div>
                        <small>
                          GST 18%
                        </small>

                        <strong>
                          {money(
                            application.gstAmount
                          )}
                        </strong>
                      </div>

                      <div>
                        <small>
                          Total Paid
                        </small>

                        <strong className="amount-green">
                          {money(
                            application.totalAmount
                          )}
                        </strong>
                      </div>

                      <div>
                        <small>
                          Submitted
                        </small>

                        <strong>
                          {formatDate(
                            application.createdAt
                          )}
                        </strong>
                      </div>

                    </div>

                    <div className="utr-box">

                      <span>
                        UTR / TRANSACTION ID
                      </span>

                      <strong>
                        {application.transactionId ||
                          "-"}
                      </strong>

                    </div>

                    <div className="payment-actions">

                      <button
                        className="approve-btn"
                        disabled={
                          processingId ===
                          application.id
                        }
                        onClick={() =>
                          approvePayment(
                            application
                          )
                        }
                      >

                        {processingId ===
                        application.id
                          ? "Processing..."
                          : "✓ Approve Payment"}

                      </button>

                      <button
                        className="reject-btn"
                        disabled={
                          processingId ===
                          application.id
                        }
                        onClick={() =>
                          rejectPayment(
                            application
                          )
                        }
                      >
                        ✕ Reject
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

        {/* =====================================
            APPROVED PAYMENTS
        ===================================== */}

        <section className="package-admin-section">

          <div className="section-heading">

            <span>
              PAYMENT HISTORY
            </span>

            <h2>
              Approved Payments
            </h2>

          </div>

          {approvedApplications.length ===
          0 ? (

            <div className="admin-message">
              No approved payments yet.
            </div>

          ) : (

            <div className="approved-table-wrapper">

              <table className="approved-table">

                <thead>

                  <tr>
                    <th>Vendor</th>
                    <th>Vendor ID</th>
                    <th>Service</th>
                    <th>Package</th>
                    <th>Amount</th>
                    <th>UTR</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {approvedApplications.map(
                    (application) => (

                      <tr
                        key={
                          application.id
                        }
                      >

                        <td>
                          {
                            application.vendorName
                          }
                        </td>

                        <td>
                          {
                            application.vendorId
                          }
                        </td>

                        <td>
                          {
                            application.service
                          }
                        </td>

                        <td>
                          {
                            application.packageName
                          }
                        </td>

                        <td>
                          {money(
                            application.totalAmount
                          )}
                        </td>

                        <td>
                          {
                            application.transactionId
                          }
                        </td>

                        <td>
                          <span className="approved-status">
                            ✓ Approved
                          </span>
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </div>
    </div>
  );
};

export default VendorPackageAdmin;

