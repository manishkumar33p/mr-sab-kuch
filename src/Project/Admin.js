// import React, { useState, useEffect } from "react";
// import "./Admin.css";

// // import { db } from "../firebase";

// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
// } from "firebase/firestore";

// const Admin = () => {
//   const emptyProperty = {
//     title: "",
//     city: "Noida",
//     area: "",
//     type: "Rent",
//     price: "",
//     contact: "",
//     description: "",
//     status: "Available",
//     image: "",
//   };

//   const [property, setProperty] =
//     useState(emptyProperty);

//   const [properties, setProperties] =
//     useState([]);

//   const [editId, setEditId] =
//     useState(null);

//   const propertyCollection =
//     collection(
//       db,
//       "properties"
//     );

//   // Load Properties
//   const fetchProperties =
//     async () => {
//       const data =
//         await getDocs(
//           propertyCollection
//         );

//       const list =
//         data.docs.map(
//           (docItem) => ({
//             id: docItem.id,
//             ...docItem.data(),
//           })
//         );

//       setProperties(list);
//     };

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const handleChange = (e) => {
//     setProperty({
//       ...property,
//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   const handleImageUpload = (
//     e
//   ) => {
//     const file =
//       e.target.files[0];

//     if (file) {
//       const reader =
//         new FileReader();

//       reader.onloadend =
//         () => {
//           setProperty(
//             (
//               prev
//             ) => ({
//               ...prev,
//               image:
//                 reader.result,
//             })
//           );
//         };

//       reader.readAsDataURL(
//         file
//       );
//     }
//   };

//   // Add Property
//   const handleSubmit =
//     async (e) => {
//       e.preventDefault();

//       await addDoc(
//         propertyCollection,
//         property
//       );

//       alert(
//         "Property Added Successfully"
//       );

//       setProperty(
//         emptyProperty
//       );

//       fetchProperties();
//     };

//   // Edit
//   const handleEdit = (
//     item
//   ) => {
//     setProperty(item);

//     setEditId(item.id);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // Update
//   const handleUpdate =
//     async () => {
//       const propertyDoc =
//         doc(
//           db,
//           "properties",
//           editId
//         );

//       await updateDoc(
//         propertyDoc,
//         property
//       );

//       alert(
//         "Property Updated Successfully"
//       );

//       setEditId(null);

//       setProperty(
//         emptyProperty
//       );

//       fetchProperties();
//     };

//   // Delete
//   const handleDelete =
//     async (id) => {
//       await deleteDoc(
//         doc(
//           db,
//           "properties",
//           id
//         )
//       );

//       fetchProperties();
//     };

//   return (
//     <div className="admin-page">

//       <h1>
//         Property Admin Panel
//       </h1>

//       <form
//         className="admin-form"
//         onSubmit={
//           handleSubmit
//         }
//       >

//         <input
//           type="text"
//           name="title"
//           placeholder="Property Title"
//           value={
//             property.title
//           }
//           onChange={
//             handleChange
//           }
//           required
//         />

//         <select
//           name="city"
//           value={
//             property.city
//           }
//           onChange={
//             handleChange
//           }
//         >
//           <option>
//             Noida
//           </option>
//           <option>
//             Delhi
//           </option>
//           <option>
//             Gurgaon
//           </option>
//           <option>
//             Ghaziabad
//           </option>
//         </select>

//         <input
//           type="text"
//           name="area"
//           placeholder="Area"
//           value={
//             property.area
//           }
//           onChange={
//             handleChange
//           }
//         />

//         <select
//           name="type"
//           value={
//             property.type
//           }
//           onChange={
//             handleChange
//           }
//         >
//           <option>
//             Buy
//           </option>
//           <option>
//             Rent
//           </option>
//           <option>
//             PG
//           </option>
//         </select>

//         <input
//           type="text"
//           name="price"
//           placeholder="Price"
//           value={
//             property.price
//           }
//           onChange={
//             handleChange
//           }
//           required
//         />

//         <input
//           type="text"
//           name="contact"
//           placeholder="Contact"
//           value={
//             property.contact
//           }
//           onChange={
//             handleChange
//           }
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={
//             property.description
//           }
//           onChange={
//             handleChange
//           }
//         />

//         <select
//           name="status"
//           value={
//             property.status
//           }
//           onChange={
//             handleChange
//           }
//         >
//           <option>
//             Available
//           </option>

//           <option>
//             Occupied
//           </option>
//         </select>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={
//             handleImageUpload
//           }
//         />

//         {editId ? (
//           <button
//             type="button"
//             onClick={
//               handleUpdate
//             }
//           >
//             Update Property
//           </button>
//         ) : (
//           <button
//             type="submit"
//           >
//             Add Property
//           </button>
//         )}

//       </form>

//       <h2>
//         Added Properties
//       </h2>

//       <div className="property-list">

//         {properties.map(
//           (item) => (
//             <div
//               key={
//                 item.id
//               }
//               className="admin-card"
//             >

//               <img
//                 src={
//                   item.image
//                 }
//                 alt=""
//               />

//               <h3>
//                 {
//                   item.title
//                 }
//               </h3>

//               <p>
//                 {
//                   item.city
//                 }
//               </p>

//               <p>
//                 {
//                   item.type
//                 }
//               </p>

//               <p>
//                 {
//                   item.status
//                 }
//               </p>

//               <div
//                 style={{
//                   display:
//                     "flex",
//                   gap: "10px",
//                   marginTop:
//                     "10px",
//                 }}
//               >

//                 <button
//                   onClick={() =>
//                     handleEdit(
//                       item
//                     )
//                   }
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() =>
//                     handleDelete(
//                       item.id
//                     )
//                   }
//                 >
//                   Delete
//                 </button>

//               </div>

//             </div>
//           )
//         )}

//       </div>

//     </div>
//   );
// };

// export default Admin;