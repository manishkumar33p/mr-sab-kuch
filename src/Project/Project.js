// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import NavBar from "../Navbar/Navbar";
// import "./Project.css";
// import HeroVideo from "../marvv99.mp4";
// import PropertyCard from "./PropertyCard";
// import { db } from "../firebase";
// import {
//   collection,
//   getDocs,
// } from "firebase/firestore";

// const Project = () => {
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("Rent");
//   const [properties, setProperties] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedCity, setSelectedCity] =
//     useState("");
//   const [maxBudget, setMaxBudget] =
//     useState("");
//   const [visibleCount, setVisibleCount] =
//     useState(6);

//   useEffect(() => {
//   const fetchProperties =
//     async () => {
//       const data =
//         await getDocs(
//           collection(
//             db,
//             "properties"
//           )
//         );

//       const propertyList =
//         data.docs.map(
//           (doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           })
//         );

//       setProperties(
//         propertyList
//       );
//     };

//   fetchProperties();
// }, []);

//   const filteredProperties =
//     properties.filter((property) => {
//       const title =
//         property.title?.toLowerCase() || "";

//       const city =
//         property.city?.toLowerCase() || "";

//       const searchText =
//         search.toLowerCase();

//       const price =
//         parseInt(
//           property.price
//             ?.toString()
//             .replace(/[^\d]/g, "")
//         ) || 0;

//       return (
//         property.type === activeTab &&
//         property.status !==
//           "Occupied" &&
//         (
//           title.includes(searchText) ||
//           city.includes(searchText)
//         ) &&
//         (
//           selectedCity === "" ||
//           property.city ===
//             selectedCity
//         ) &&
//         (
//           maxBudget === "" ||
//           price <= Number(maxBudget)
//         )
//       );
//     });

//   return (
//     <div className="project-page">

//       <NavBar />

//       <section className="project-hero">

//         <video
//           className="project-video"
//           autoPlay
//           muted
//           loop
//         >
//           <source
//             src={HeroVideo}
//             type="video/mp4"
//           />
//         </video>

//         <div className="project-overlay"></div>

//         <div className="project-content">

//           <h1 className="main-title">
//             Find Your Dream Property In
//             <span> Delhi NCR</span>
//           </h1>

//           <p className="main-desc">
//             Buy, Rent & PG Properties
//             Across Delhi NCR
//           </p>

//           <button
//             className="staff-btn"
//             onClick={() =>
//               navigate("/admin")
//             }
//           >
//             Staff Panel
//           </button>

//           <div className="search-box">

//             <div className="tabs">

//               <button
//                 className={
//                   activeTab === "Buy"
//                     ? "active"
//                     : ""
//                 }
//                 onClick={() =>
//                   setActiveTab("Buy")
//                 }
//               >
//                 Buy
//               </button>

//               <button
//                 className={
//                   activeTab === "PG"
//                     ? "active"
//                     : ""
//                 }
//                 onClick={() =>
//                   setActiveTab("PG")
//                 }
//               >
//                 PG
//               </button>

//               <button
//                 className={
//                   activeTab === "Rent"
//                     ? "active"
//                     : ""
//                 }
//                 onClick={() =>
//                   setActiveTab("Rent")
//                 }
//               >
//                 Rent
//               </button>

//             </div>

//             <div className="search-fields">

//               <input
//                 type="text"
//                 placeholder="Search Property..."
//                 value={search}
//                 onChange={(e) =>
//                   setSearch(
//                     e.target.value
//                   )
//                 }
//               />

//               <select
//                 value={selectedCity}
//                 onChange={(e) =>
//                   setSelectedCity(
//                     e.target.value
//                   )
//                 }
//               >
//                 <option value="">
//                   All Cities
//                 </option>
//                 <option value="Noida">
//                   Noida
//                 </option>
//                 <option value="Delhi">
//                   Delhi
//                 </option>
//                 <option value="Ghaziabad">
//                   Ghaziabad
//                 </option>
//                 <option value="Gurgaon">
//                   Gurgaon
//                 </option>
//               </select>

//               <input
//                 type="number"
//                 placeholder="Max Budget"
//                 value={maxBudget}
//                 onChange={(e) =>
//                   setMaxBudget(
//                     e.target.value
//                   )
//                 }
//               />

//             </div>

//           </div>

//         </div>

//       </section>

//       <section className="property-section">

//         <h2 className="section-title">
//           {activeTab} Properties
//         </h2>

//         <div className="property-grid">

//           {filteredProperties.length >
//           0 ? (
//             filteredProperties
//               .slice(
//                 0,
//                 visibleCount
//               )
//               .map(
//                 (
//                   property,
//                   index
//                 ) => (
//                   <PropertyCard
//                     key={index}
//                     property={
//                       property
//                     }
//                   />
//                 )
//               )
//           ) : (
//             <h3 className="no-data">
//               No Property Found
//             </h3>
//           )}

//         </div>

//         {visibleCount <
//           filteredProperties.length && (
//           <div
//             style={{
//               textAlign:
//                 "center",
//               marginTop:
//                 "30px",
//             }}
//           >
//             <button
//               className="staff-btn"
//               onClick={() =>
//                 setVisibleCount(
//                   visibleCount +
//                     6
//                 )
//               }
//             >
//               Load More
//             </button>
//           </div>
//         )}

//       </section>

//       <section
//         style={{
//           padding: "80px 5%",
//           textAlign: "center",
//           background: "#fff",
//         }}
//       >
//         <h2 className="section-title">
//           What Our Clients Say
//         </h2>

//         <div
//           style={{
//             marginTop: "30px",
//           }}
//         >
//           <h3>
//             ⭐⭐⭐⭐⭐
//           </h3>

//           <p>
//             Got a PG in
//             Sector 62 within
//             2 days.
//           </p>

//           <strong>
//             - Rahul Sharma
//           </strong>
//         </div>

//         <div
//           style={{
//             marginTop: "40px",
//           }}
//         >
//           <h3>
//             ⭐⭐⭐⭐⭐
//           </h3>

//           <p>
//             Great support
//             for renting flats
//             in Noida.
//           </p>

//           <strong>
//             - Priya Singh
//           </strong>
//         </div>

//       </section>

//     </div>
//   );
// };

// export default Project;