

import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
// import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Dashboard.css";
import FieldStaffManagement from "../FieldStaffManagement/FieldStaffManagement";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc
} from "firebase/firestore";
import VendorManagement from "./VendorManagement";
import { db } from "../firebase";


const Dashboard = () => {

  const [dataEntryData, setDataEntryData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [inquiries, setInquiries] = useState([]);
const [consultantRequests, setConsultantRequests] = useState([]);

  /* =====================================
     LOAD LOCAL DATA + FIREBASE INQUIRIES
  ===================================== */

  useEffect(() => {

    /* LOCAL DATA */

    const storedDataEntryData =
      JSON.parse(
        localStorage.getItem("dataEntryData")
      ) || [];

    const storedContactData =
      JSON.parse(
        localStorage.getItem("contactData")
      ) || [];

    setDataEntryData(storedDataEntryData);
    setContactData(storedContactData);


    /* FIREBASE INQUIRIES */

    const inquiriesQuery = query(
      collection(db, "inquiries"),
      orderBy("createdAt", "desc")
    );
const consultantQuery = query(
  collection(db, "consultantRequests"),
  orderBy("createdAt", "desc")
);

const unsubscribeConsultants = onSnapshot(
  consultantQuery,
  (snapshot) => {
    const firebaseConsultants = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data()
    }));

    setConsultantRequests(firebaseConsultants);
  },
  (error) => {
    console.error(
      "Firebase consultant request error:",
      error
    );
  }
);

    const unsubscribe = onSnapshot(
      inquiriesQuery,

      (snapshot) => {

        const firebaseInquiries =
          snapshot.docs.map((item) => ({

            id: item.id,

            ...item.data()

          }));


        setInquiries(
          firebaseInquiries
        );

      },

      (error) => {

        console.error(
          "Firebase inquiry error:",
          error
        );

      }
    );


    return () => {

      unsubscribe();
     unsubscribeConsultants();
    };

  }, []);


  /* =====================================
     DOWNLOAD EXCEL
  ===================================== */

  const downloadExcel = (
    data,
    fileName
  ) => {

    if (
      !data ||
      data.length === 0
    ) {

      alert(
        "No data available."
      );

      return;

    }


    const wb =
      XLSX.utils.book_new();


    const ws =
      XLSX.utils.json_to_sheet(
        data
      );


    XLSX.utils.book_append_sheet(
      wb,
      ws,
      "Sheet1"
    );


    XLSX.writeFile(
      wb,
      fileName
    );

  };


  /* =====================================
     INQUIRY EXCEL
  ===================================== */

  const downloadInquiryExcel = () => {

    if (
      inquiries.length === 0
    ) {

      alert(
        "No customer inquiries available."
      );

      return;

    }


    const excelData =
      inquiries.map(
        (item) => ({

          "Order ID":
            item.orderId || "",

          "Date":
            item.date || "",

          "Customer Name":
            item.customerName || "",

          "Phone":
            item.phone || "",

          "Email":
            item.email || "",

          "Address":
            item.address
              ? `${item.address.street || ""}, ${
                  item.address.addressLine2 || ""
                }, ${
                  item.address.city || ""
                }, ${
                  item.address.district || ""
                }, ${
                  item.address.state || ""
                }, ${
                  item.address.country || ""
                } - ${
                  item.address.pincode || ""
                }`
              : "",

          "Items":
            Array.isArray(item.items)
              ? item.items
                  .map(
                    (i) =>
                      `${i.name || "Service"} - ₹${
                        i.price || 0
                      }`
                  )
                  .join(", ")
              : "",

          "Total":
            `₹${item.total || 0}`

        })
      );


    downloadExcel(
      excelData,
      "niss_customer_inquiries.xlsx"
    );

  };


  /* =====================================
     DELETE ALL FIREBASE INQUIRIES
  ===================================== */

  const deleteAllInquiries = async () => {

    const confirmDelete =
      window.confirm(
        "Delete all customer inquiries permanently?"
      );


    if (!confirmDelete) return;


    try {

      const snapshot =
        await new Promise((resolve, reject) => {

          const unsubscribe =
            onSnapshot(
              collection(db, "inquiries"),

              (snap) => {

                unsubscribe();

                resolve(snap);

              },

              reject
            );

        });


      await Promise.all(
        snapshot.docs.map(
          (item) =>
            deleteDoc(
              doc(
                db,
                "inquiries",
                item.id
              )
            )
        )
      );


      setInquiries([]);


      alert(
        "All customer inquiries deleted."
      );

    } catch (error) {

      console.error(
        "Delete error:",
        error
      );

      alert(
        "Unable to delete inquiries."
      );

    }

  };


  /* =====================================
     DELETE CONTACT
  ===================================== */

  const deleteAllContactRecords = () => {

    localStorage.removeItem(
      "contactData"
    );

    setContactData([]);

  };


  /* =====================================
     DELETE PROJECT
  ===================================== */

  const deleteAllProjectRecords = () => {

    localStorage.removeItem(
      "dataEntryData"
    );

    setDataEntryData([]);

  };


  return (

    <div className="dashboard-page">

      {/* <NavBar /> */}


      {/* VIDEO */}

      <video
        className="dashboard-video"
        autoPlay
        muted
        loop
      >

        <source
          src="/videos/marvv99.mp4"
          type="video/mp4"
        />

      </video>


      <div className="dashboard-overlay"></div>


      <div className="dashboard-container">


        {/* HEADER */}

        <div className="dashboard-header">

          <span className="dashboard-tag">
            NISS ADMIN PANEL
          </span>

          <h1>
            Smart Business
            <span> Dashboard</span>
          </h1>

          <p>
            Manage customer inquiries,
            contacts, projects and
            downloadable records.
          </p>

        </div>


        {/* STATS */}

        <div className="dashboard-stats">

          <div className="dashboard-stat-card">

            <h2>
              {inquiries.length}
            </h2>

            <p>
              Customer Inquiries
            </p>

          </div>
 <div className="dashboard-stat-card">

  <h2>
    {consultantRequests.length}
  </h2>

  <p>
    Consultant Requests
  </p>

</div>





          <div className="dashboard-stat-card">

            <h2>
              {contactData.length}
            </h2>

            <p>
              Contact Records
            </p>

          </div>


          <div className="dashboard-stat-card">

            <h2>
              {dataEntryData.length}
            </h2>

            <p>
              Project Records
            </p>

          </div>

        </div>


        {/* =====================================
            CUSTOMER INQUIRIES
        ===================================== */}

        <div className="dashboard-section">

          <div className="section-header">

            <h2>
              Customer Inquiries
            </h2>


            <div className="dashboard-buttons">

              <button
                className="excel-btn"
                onClick={
                  downloadInquiryExcel
                }
              >
                Download Excel
              </button>


              <button
                className="delete-btn"
                onClick={
                  deleteAllInquiries
                }
              >
                Delete All
              </button>

            </div>

          </div>


          <div className="table-wrapper">

            <table className="dashboard-table">

              <thead>

                <tr>

                  <th>
                    Order ID
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Customer
                  </th>

                  <th>
                    Phone
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Services / Products
                  </th>

                  <th>
                    Total
                  </th>

                  <th>
                    Address
                  </th>

                </tr>

              </thead>


              <tbody>

                {inquiries.length > 0 ? (

                  inquiries.map(
                    (
                      item,
                      index
                    ) => (

                      <tr
                        key={
                          item.id ||
                          index
                        }
                      >

                        <td>
                          {
                            item.orderId ||
                            "-"
                          }
                        </td>

                        <td>
                          {
                            item.date ||
                            "-"
                          }
                        </td>

                        <td>

                          <strong>
                            {
                              item.customerName ||
                              "-"
                            }
                          </strong>

                        </td>

                        <td>
                          {
                            item.phone ||
                            "-"
                          }
                        </td>

                        <td>
                          {
                            item.email ||
                            "-"
                          }
                        </td>

                        <td>

                          {Array.isArray(
                            item.items
                          ) ? (

                            item.items.map(
                              (
                                product,
                                i
                              ) => (

                                <div
                                  key={i}
                                  style={{
                                    marginBottom:
                                      "6px"
                                  }}
                                >

                                  {
                                    product.name ||
                                    "Service"
                                  }

                                  <br />

                                  <small>
                                    ₹
                                    {
                                      product.price ||
                                      0
                                    }
                                  </small>

                                </div>

                              )

                            )

                          ) : (

                            "-"
                          )}

                        </td>

                        <td>

                          <strong>

                            ₹
                            {Number(
                              item.total ||
                              0
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </strong>

                        </td>

                        <td>

                          {item.address ? (

                            <>
                              {
                                item.address.street ||
                                ""
                              }

                              <br />

                              {
                                item.address.city ||
                                ""
                              }

                              <br />

                              {
                                item.address.state ||
                                ""
                              }

                              {" - "}

                              {
                                item.address.pincode ||
                                ""
                              }
                            </>

                          ) : (

                            "-"
                          )}

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                    >

                      No Customer
                      Inquiries Found

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

{/* =====================================
    CONSULTANT REQUESTS
===================================== */}

<div className="dashboard-section">

  <div className="section-header">

    <h2>
      Free Consultant Requests
    </h2>

  </div>

  <div className="table-wrapper">

    <table className="dashboard-table">

      <thead>

        <tr>

          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Service</th>
          <th>Requirement</th>
          <th>Budget</th>
          <th>Date</th>
          <th>Time</th>
          <th>Address</th>
          <th>Status</th>

        </tr>

      </thead>

      <tbody>

        {consultantRequests.length > 0 ? (

          consultantRequests.map((item) => (

            <tr key={item.id}>

              <td>
                <strong>
                  {item.name || "-"}
                </strong>
              </td>

              <td>
                {item.phone || "-"}
              </td>

              <td>
                {item.email || "-"}
              </td>

              <td>
                {item.service || "-"}
              </td>

              <td>
                {item.requirement || "-"}
              </td>

              <td>
                {item.budget || "-"}
              </td>

              <td>
                {item.date || "-"}
              </td>

              <td>
                {item.time || "-"}
              </td>

              <td>
                {item.address || "-"}
              </td>

              <td>
                <strong>
                  {item.status || "New"}
                </strong>
              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td colSpan="10">
              No Consultant Requests Found
            </td>

          </tr>

        )}

      </tbody>

    </table>

  </div>

</div>
        {/* =====================================
            CONTACT
        ===================================== */}

        <div className="dashboard-section">

          <div className="section-header">

            <h2>
              Contact Us Records
            </h2>


            <div className="dashboard-buttons">

              <button
                className="download-btn"
                onClick={() =>
                  downloadExcel(
                    contactData,
                    "contact_records.xlsx"
                  )
                }
              >
                Download Excel
              </button>


              <button
                className="delete-btn"
                onClick={
                  deleteAllContactRecords
                }
              >
                Delete All
              </button>

            </div>

          </div>


          <div className="table-wrapper">

            <table className="dashboard-table">

              <thead>

                <tr>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Subject</th>

                  <th>Message</th>

                </tr>

              </thead>


              <tbody>

                {contactData.length > 0 ? (

                  contactData.map(
                    (
                      item,
                      index
                    ) => (

                      <tr
                        key={index}
                      >

                        <td>
                          {
                            item.name
                          }
                        </td>

                        <td>
                          {
                            item.email
                          }
                        </td>

                        <td>
                          {
                            item.subject
                          }
                        </td>

                        <td>
                          {
                            item.message
                          }
                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                    >
                      No Contact Records Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>


        {/* =====================================
            PROJECT
        ===================================== */}

        <div className="dashboard-section">

          <div className="section-header">

            <h2>
              Project Records
            </h2>


            <div className="dashboard-buttons">

              <button
                className="excel-btn"
                onClick={() =>
                  downloadExcel(
                    dataEntryData,
                    "project_records.xlsx"
                  )
                }
              >
                Download Excel
              </button>


              <button
                className="delete-btn"
                onClick={
                  deleteAllProjectRecords
                }
              >
                Delete All
              </button>

            </div>

          </div>


          <div className="table-wrapper">

            <table className="dashboard-table">

              <thead>

                <tr>

                  <th>Organization</th>

                  <th>Project Type</th>

                  <th>Time</th>

                  <th>Client</th>

                  <th>Description</th>

                  <th>Start</th>

                  <th>End</th>

                  <th>Status</th>

                  <th>Assigned</th>

                  <th>Budget</th>

                </tr>

              </thead>


              <tbody>

                {dataEntryData.length > 0 ? (

                  dataEntryData.map(
                    (
                      item,
                      index
                    ) => (

                      <tr
                        key={index}
                      >

                        <td>
                          {
                            item.organizationName
                          }
                        </td>

                        <td>
                          {
                            item.projectType
                          }
                        </td>

                        <td>
                          {
                            item.timeIntervals
                          }
                        </td>

                        <td>
                          {
                            item.clientName
                          }
                        </td>

                        <td>
                          {
                            item.projectDescription
                          }
                        </td>

                        <td>
                          {
                            item.startDate
                          }
                        </td>

                        <td>
                          {
                            item.endDate
                          }
                        </td>

                        <td>
                          {
                            item.status
                          }
                        </td>

                        <td>
                          {
                            item.assignedTo
                          }
                        </td>

                        <td>
                          ₹{" "}
                          {
                            item.budget
                          }
                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="10"
                    >
                      No Project Records Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

<VendorManagement />
<FieldStaffManagement />
      </div>


      <Footer />

    </div>

  );

};


export default Dashboard;