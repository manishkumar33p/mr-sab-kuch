
// import React, { useState } from "react";
// import "./Checkout.css";
// import { useNavigate } from "react-router-dom";
// import NavBar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// const Checkout = () => {

//   const navigate = useNavigate();

//   const [address, setAddress] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     street: "",
//     addressLine2: "",
//     city: "",
//     district: "",
//     state: "",
//     country: "",
//     pincode: ""
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {

//     setAddress({
//       ...address,
//       [e.target.name]: e.target.value
//     });

//   };


//   const getCart = () => {

//     return (
//       JSON.parse(
//         localStorage.getItem("cart")
//       ) || []
//     );

//   };


//   const getItemTotal = (item) => {

//     if (
//       item.pricePerHour &&
//       item.hours
//     ) {

//       return (
//         Number(item.pricePerHour) *
//         Number(item.hours)
//       );

//     }

//     if (item.totalPrice) {

//       return Number(item.totalPrice);

//     }

//     if (item.price) {

//       if (
//         typeof item.price === "number"
//       ) {

//         return item.price;

//       }

//       return (
//         parseFloat(
//           String(item.price)
//             .replace(/[^\d.]/g, "")
//         ) || 0
//       );

//     }

//     return 0;

//   };


//   const handleSubmit = (e) => {

//     e.preventDefault();

//     const requiredFields = [
//       "firstName",
//       "lastName",
//       "phone",
//       "street",
//       "city",
//       "state",
//       "country",
//       "pincode"
//     ];


//     const isValid =
//       requiredFields.every(
//         (field) =>
//           address[field].trim() !== ""
//       );


//     if (!isValid) {

//       alert(
//         "Please fill all required fields."
//       );

//       return;

//     }


//     const cart = getCart();


//     if (cart.length === 0) {

//       alert(
//         "Your cart is empty."
//       );

//       navigate("/cart");

//       return;

//     }


//     setLoading(true);


//     /* =========================================
//        TOTAL
//     ========================================= */

//     const total = cart.reduce(
//       (sum, item) =>
//         sum + getItemTotal(item),
//       0
//     );


//     /* =========================================
//        ORDER ID
//     ========================================= */

//     const orderId =
//       "NISS-" +
//       Date.now();


//     /* =========================================
//        DATE
//     ========================================= */

//     const orderDate =
//       new Date().toLocaleString(
//         "en-IN"
//       );


//     /* =========================================
//        CUSTOMER DATA
//     ========================================= */

//     const customerName =
//       `${address.firstName} ${address.lastName}`;


//     /* =========================================
//        INQUIRY OBJECT
//     ========================================= */

//     const inquiry = {

//       orderId,

//       date: orderDate,

//       customerName,

//       phone: address.phone,

//       email: address.email,

//       address: {

//         street:
//           address.street,

//         addressLine2:
//           address.addressLine2,

//         city:
//           address.city,

//         district:
//           address.district,

//         state:
//           address.state,

//         country:
//           address.country,

//         pincode:
//           address.pincode

//       },

//       items: cart.map(
//         (item) => ({

//           name:
//             item.title ||
//             item.name ||
//             "Selected Service",

//           category:
//             item.category ||
//             item.type ||
//             "Service",

//           price:
//             getItemTotal(item),

//           hours:
//             item.hours || "",

//           date:
//             item.date || "",

//           location:
//             item.location || ""

//         })
//       ),

//       total

//     };


//     /* =========================================
//        SAVE TO DASHBOARD
//     ========================================= */

//     const oldInquiries =
//       JSON.parse(
//         localStorage.getItem(
//           "nissInquiries"
//         )
//       ) || [];


//     oldInquiries.push(inquiry);


//     localStorage.setItem(
//       "nissInquiries",
//       JSON.stringify(
//         oldInquiries
//       )
//     );


//     /* =========================================
//        WHATSAPP MESSAGE
//     ========================================= */

//     let itemsMessage = "";


//     cart.forEach(
//       (item, index) => {

//         itemsMessage +=
//           `\n${index + 1}. ` +
//           `${item.title ||
//             item.name ||
//             "Service"}`;

//         if (
//           item.hours
//         ) {

//           itemsMessage +=
//             ` | ${item.hours} Hours`;

//         }

//         if (
//           item.date
//         ) {

//           itemsMessage +=
//             ` | Date: ${item.date}`;

//         }

//         if (
//           item.location
//         ) {

//           itemsMessage +=
//             ` | Location: ${item.location}`;

//         }

//         itemsMessage +=
//           ` | ₹${getItemTotal(item)}`;

//       }
//     );


//     const fullAddress = `

// ${address.street}
// ${address.addressLine2}
// ${address.city}
// ${address.district}
// ${address.state}
// ${address.country}
// Pincode: ${address.pincode}
// `;


//     const whatsappMessage = `

// *NEW NISS CUSTOMER INQUIRY* 🚨

// *Order ID:* ${orderId}

// *Customer Name:*
// ${customerName}

// *Phone:*
// ${address.phone}

// *Email:*
// ${address.email || "Not Provided"}

// *Selected Services / Products:*
// ${itemsMessage}

// *Total Amount:*
// ₹${total.toLocaleString("en-IN")}

// *Customer Address:*
// ${fullAddress}

// *Order Date:*
// ${orderDate}

// Please contact the customer regarding this inquiry.
// `;


//     const whatsappURL =
//       `https://wa.me/919958424916?text=${encodeURIComponent(
//         whatsappMessage
//       )}`;


//     /* =========================================
//        CLEAR CART
//     ========================================= */

//     localStorage.removeItem(
//       "cart"
//     );


//     /* =========================================
//        WHATSAPP
//     ========================================= */

//     window.open(
//       whatsappURL,
//       "_blank",
//       "noopener,noreferrer"
//     );


//     /* =========================================
//        SUCCESS
//     ========================================= */

//     setTimeout(() => {

//       setLoading(false);

//       alert(
//         "Your inquiry has been submitted successfully!"
//       );

//       navigate("/dashboard");

//     }, 700);

//   };


//   return (

//     <div className="checkout-page">

//       <NavBar />

//       <div className="checkout-bg"></div>


//       <div className="checkout-container">


//         {/* LEFT */}

//         <div className="checkout-left">

//           <span className="checkout-small-title">
//             NISS TECHNOLOGIES
//           </span>

//           <h1>
//             Complete Your
//             <span> Inquiry</span>
//           </h1>

//           <p>
//             Please enter your details below.
//             Your inquiry will be sent to our
//             team and recorded in the dashboard.
//           </p>


//           <div className="checkout-box-info">

//             <h3>
//               What happens next?
//             </h3>

//             <ul>

//               <li>
//                 ✔ Your inquiry is saved
//               </li>

//               <li>
//                 ✔ Our dashboard receives it
//               </li>

//               <li>
//                 ✔ WhatsApp notification is sent
//               </li>

//               <li>
//                 ✔ Our team will contact you
//               </li>

//             </ul>

//           </div>

//         </div>


//         {/* FORM */}

//         <div className="checkout-right">

//           <form
//             className="checkout-form"
//             onSubmit={handleSubmit}
//           >

//             <h2>
//               Customer Details
//             </h2>


//             <div className="grid-2">

//               <input
//                 name="firstName"
//                 placeholder="First Name *"
//                 value={
//                   address.firstName
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 required
//               />

//               <input
//                 name="lastName"
//                 placeholder="Last Name *"
//                 value={
//                   address.lastName
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 required
//               />

//             </div>


//             <div className="grid-2">

//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Mobile Number *"
//                 value={
//                   address.phone
//                 }
//                 onChange={(e) => {

//                   const value =
//                     e.target.value
//                       .replace(
//                         /\D/g,
//                         ""
//                       )
//                       .slice(
//                         0,
//                         10
//                       );

//                   setAddress({
//                     ...address,
//                     phone: value
//                   });

//                 }}
//                 required
//               />


//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={
//                   address.email
//                 }
//                 onChange={
//                   handleChange
//                 }
//               />

//             </div>


//             <h3 className="checkout-address-title">
//               Address Details
//             </h3>


//             <input
//               name="street"
//               placeholder="Street Address *"
//               value={
//                 address.street
//               }
//               onChange={
//                 handleChange
//               }
//               required
//             />


//             <input
//               name="addressLine2"
//               placeholder="Apartment / Landmark / Optional"
//               value={
//                 address.addressLine2
//               }
//               onChange={
//                 handleChange
//               }
//             />


//             <div className="grid-2">

//               <input
//                 name="city"
//                 placeholder="City *"
//                 value={
//                   address.city
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 required
//               />

//               <input
//                 name="district"
//                 placeholder="District"
//                 value={
//                   address.district
//                 }
//                 onChange={
//                   handleChange
//                 }
//               />

//             </div>


//             <div className="grid-2">

//               <input
//                 name="state"
//                 placeholder="State *"
//                 value={
//                   address.state
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 required
//               />

//               <input
//                 name="country"
//                 placeholder="Country *"
//                 value={
//                   address.country
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 required
//               />

//             </div>


//             <input
//               name="pincode"
//               placeholder="Pincode *"
//               value={
//                 address.pincode
//               }
//               onChange={
//                 handleChange
//               }
//               required
//             />


//             <button
//               type="submit"
//               className="checkout-btn"
//               disabled={loading}
//             >

//               {loading
//                 ? "Submitting..."
//                 : "Submit Inquiry →"}

//             </button>


//             <p className="checkout-note">
//               🔒 Your information is used only
//               for processing your inquiry.
//             </p>

//           </form>

//         </div>

//       </div>


//       <Footer />

//     </div>

//   );

// };

// export default Checkout;



// import React, { useState } from "react";
// import "./Checkout.css";
// import { useNavigate } from "react-router-dom";
// import NavBar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "../firebase";

// const Checkout = () => {
//   const navigate = useNavigate();

//   const [address, setAddress] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     street: "",
//     addressLine2: "",
//     city: "",
//     district: "",
//     state: "",
//     country: "",
//     pincode: ""
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setAddress({
//       ...address,
//       [e.target.name]: e.target.value
//     });
//   };

//   /* =========================================
//      GET CART
//   ========================================= */

//   const getCart = () => {
//     return JSON.parse(localStorage.getItem("cart")) || [];
//   };

//   /* =========================================
//      GET ITEM TOTAL
//   ========================================= */

//   const getItemTotal = (item) => {
//     if (item.pricePerHour && item.hours) {
//       return (
//         Number(item.pricePerHour) *
//         Number(item.hours)
//       );
//     }

//     if (item.totalPrice) {
//       return Number(item.totalPrice);
//     }

//     if (item.price) {
//       if (typeof item.price === "number") {
//         return item.price;
//       }

//       return (
//         parseFloat(
//           String(item.price).replace(/[^\d.]/g, "")
//         ) || 0
//       );
//     }

//     return 0;
//   };

//   /* =========================================
//      SUBMIT INQUIRY
//   ========================================= */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     /* =========================================
//        VALIDATION
//     ========================================= */

//     const requiredFields = [
//       "firstName",
//       "lastName",
//       "phone",
//       "street",
//       "city",
//       "state",
//       "country",
//       "pincode"
//     ];

//     const isValid = requiredFields.every(
//       (field) =>
//         String(address[field]).trim() !== ""
//     );

//     if (!isValid) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     const cleanPhone = address.phone.replace(/\D/g, "");

//     if (cleanPhone.length !== 10) {
//       alert("Please enter a valid 10 digit mobile number.");
//       return;
//     }

//     /* =========================================
//        CART
//     ========================================= */

//     const cart = getCart();

//     if (cart.length === 0) {
//       alert("Your cart is empty.");
//       navigate("/cart");
//       return;
//     }

//     setLoading(true);

//     try {
//       /* =========================================
//          BASIC ORDER INFORMATION
//       ========================================= */

//       const orderId = "NISS-" + Date.now();

//       const orderDate = new Date().toLocaleString(
//         "en-IN"
//       );

//       const customerName =
//         `${address.firstName} ${address.lastName}`.trim();

//       /* =========================================
//          TOTAL
//       ========================================= */

//       const total = cart.reduce(
//         (sum, item) =>
//           sum + getItemTotal(item),
//         0
//       );

//       /* =========================================
//          ITEMS
//       ========================================= */

//       const items = cart.map((item) => ({
//         name:
//           item.title ||
//           item.name ||
//           "Selected Service",

//         category:
//           item.category ||
//           item.type ||
//           "Service",

//         price: getItemTotal(item),

//         hours: item.hours || "",

//         date: item.date || "",

//         location: item.location || ""
//       }));

//       /* =========================================
//          INQUIRY OBJECT
//       ========================================= */

//       const inquiry = {
//         orderId,

//         customerName,

//         firstName: address.firstName,

//         lastName: address.lastName,

//         phone: cleanPhone,

//         email: address.email || "",

//         address: {
//           street: address.street,

//           addressLine2:
//             address.addressLine2 || "",

//           city: address.city,

//           district:
//             address.district || "",

//           state: address.state,

//           country: address.country,

//           pincode: address.pincode
//         },

//         items,

//         total,

//         status: "New",

//         source: "Website",

//         createdAt: serverTimestamp()
//       };


//       const firebaseInquiry = {
//   ...inquiry,

//   createdAt: serverTimestamp(),

//   status: "Pending",

//   customerPhone: address.phone,

//   customerEmail: address.email || "",

//   customerId:
//     localStorage.getItem("niss_customer")
//       ? JSON.parse(
//           localStorage.getItem("niss_customer")
//         ).id
//       : null
// };

// await addDoc(
//   collection(db, "inquiries"),
//   firebaseInquiry
// );
//       /* =========================================
//          1️⃣ SAVE TO FIREBASE
//       ========================================= */

//       const docRef = await addDoc(
//         collection(db, "inquiries"),
//         inquiry
//       );

//       console.log(
//         "Firebase Inquiry Saved:",
//         docRef.id
//       );

//       /* =========================================
//          2️⃣ SAVE TO EXISTING LOCAL DASHBOARD
//       ========================================= */

//       const dashboardInquiry = {
//         ...inquiry,

//         date: orderDate,

//         firebaseId: docRef.id,

//         createdAt: new Date().toISOString()
//       };

//       const oldInquiries =
//         JSON.parse(
//           localStorage.getItem("nissInquiries")
//         ) || [];

//       oldInquiries.push(
//         dashboardInquiry
//       );

//       localStorage.setItem(
//         "nissInquiries",
//         JSON.stringify(oldInquiries)
//       );

//       /* =========================================
//          3️⃣ WHATSAPP MESSAGE
//       ========================================= */

//       let itemsMessage = "";

//       cart.forEach((item, index) => {
//         itemsMessage +=
//           `\n${index + 1}. ` +
//           `${item.title ||
//             item.name ||
//             "Service"}`;

//         if (item.hours) {
//           itemsMessage +=
//             ` | ${item.hours} Hours`;
//         }

//         if (item.date) {
//           itemsMessage +=
//             ` | Date: ${item.date}`;
//         }

//         if (item.location) {
//           itemsMessage +=
//             ` | Location: ${item.location}`;
//         }

//         itemsMessage +=
//           ` | ₹${getItemTotal(item)}`;
//       });

//       const fullAddress = `
// ${address.street}
// ${address.addressLine2 || ""}
// ${address.city}
// ${address.district || ""}
// ${address.state}
// ${address.country}
// Pincode: ${address.pincode}
// `;

//       const whatsappMessage = `
// *NEW NISS CUSTOMER INQUIRY* 🚨

// *Order ID:*
// ${orderId}

// *Firebase ID:*
// ${docRef.id}

// *Customer Name:*
// ${customerName}

// *Phone:*
// ${cleanPhone}

// *Email:*
// ${address.email || "Not Provided"}

// *Selected Services / Products:*
// ${itemsMessage}

// *Total Amount:*
// ₹${total.toLocaleString("en-IN")}

// *Customer Address:*
// ${fullAddress}

// *Order Date:*
// ${orderDate}

// *Status:*
// New

// Please contact the customer regarding this inquiry.
// `;

//       /* =========================================
//          WHATSAPP URL
//       ========================================= */

//       const whatsappURL =
//         `https://wa.me/919958424916?text=${encodeURIComponent(
//           whatsappMessage
//         )}`;

//       /* =========================================
//          CLEAR CART
//       ========================================= */

//       localStorage.removeItem("cart");

//       /* =========================================
//          OPEN WHATSAPP
//       ========================================= */

//       window.open(
//         whatsappURL,
//         "_blank",
//         "noopener,noreferrer"
//       );

//       /* =========================================
//          SUCCESS
//       ========================================= */

//       alert(
//         "Your inquiry has been submitted successfully!"
//       );

//       navigate("/dashboard");

//     } catch (error) {
//       console.error(
//         "Inquiry submission error:",
//         error
//       );

//       alert(
//         "Inquiry submit nahi ho paayi. Please try again."
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="checkout-page">

//       <NavBar />

//       <div className="checkout-bg"></div>

//       <div className="checkout-container">

//         {/* =========================================
//             LEFT SECTION
//         ========================================= */}

//         <div className="checkout-left">

//           <span className="checkout-small-title">
//             NISS TECHNOLOGIES
//           </span>

//           <h1>
//             Complete Your
//             <span> Inquiry</span>
//           </h1>

//           <p>
//             Please enter your details below.
//             Your inquiry will be sent to our
//             team and recorded in the dashboard.
//           </p>

//           <div className="checkout-box-info">

//             <h3>
//               What happens next?
//             </h3>

//             <ul>

//               <li>
//                 ✔ Your inquiry is saved
//               </li>

//               <li>
//                 ✔ Firebase database receives it
//               </li>

//               <li>
//                 ✔ Our dashboard receives it
//               </li>

//               <li>
//                 ✔ WhatsApp notification is sent
//               </li>

//               <li>
//                 ✔ Our team will contact you
//               </li>

//             </ul>

//           </div>

//         </div>

//         {/* =========================================
//             FORM
//         ========================================= */}

//         <div className="checkout-right">

//           <form
//             className="checkout-form"
//             onSubmit={handleSubmit}
//           >

//             <h2>
//               Customer Details
//             </h2>

//             <div className="grid-2">

//               <input
//                 name="firstName"
//                 placeholder="First Name *"
//                 value={address.firstName}
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 name="lastName"
//                 placeholder="Last Name *"
//                 value={address.lastName}
//                 onChange={handleChange}
//                 required
//               />

//             </div>

//             <div className="grid-2">

//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Mobile Number *"
//                 value={address.phone}
//                 onChange={(e) => {

//                   const value =
//                     e.target.value
//                       .replace(/\D/g, "")
//                       .slice(0, 10);

//                   setAddress({
//                     ...address,
//                     phone: value
//                   });

//                 }}
//                 maxLength="10"
//                 required
//               />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={address.email}
//                 onChange={handleChange}
//               />

//             </div>

//             <h3 className="checkout-address-title">
//               Address Details
//             </h3>

//             <input
//               name="street"
//               placeholder="Street Address *"
//               value={address.street}
//               onChange={handleChange}
//               required
//             />

//             <input
//               name="addressLine2"
//               placeholder="Apartment / Landmark / Optional"
//               value={address.addressLine2}
//               onChange={handleChange}
//             />

//             <div className="grid-2">

//               <input
//                 name="city"
//                 placeholder="City *"
//                 value={address.city}
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 name="district"
//                 placeholder="District"
//                 value={address.district}
//                 onChange={handleChange}
//               />

//             </div>

//             <div className="grid-2">

//               <input
//                 name="state"
//                 placeholder="State *"
//                 value={address.state}
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 name="country"
//                 placeholder="Country *"
//                 value={address.country}
//                 onChange={handleChange}
//                 required
//               />

//             </div>

//             <input
//               name="pincode"
//               placeholder="Pincode *"
//               value={address.pincode}
//               onChange={handleChange}
//               required
//             />

//             <button
//               type="submit"
//               className="checkout-btn"
//               disabled={loading}
//             >
//               {loading
//                 ? "Submitting..."
//                 : "Submit Inquiry →"}
//             </button>

//             <p className="checkout-note">
//               🔒 Your information is used only
//               for processing your inquiry.
//             </p>

//           </form>

//         </div>

//       </div>

//       <Footer />

//     </div>
//   );
// };

// export default Checkout;



import React, { useState } from "react";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const Checkout = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    street: "",
    addressLine2: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };

  const getItemTotal = (item) => {
    if (item.pricePerHour && item.hours) {
      return Number(item.pricePerHour) * Number(item.hours);
    }

    if (item.totalPrice) {
      return Number(item.totalPrice);
    }

    if (item.price) {
      if (typeof item.price === "number") {
        return item.price;
      }

      return (
        parseFloat(
          String(item.price).replace(/[^\d.]/g, "")
        ) || 0
      );
    }

    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "street",
      "city",
      "state",
      "country",
      "pincode"
    ];

    const isValid = requiredFields.every(
      (field) => address[field].trim() !== ""
    );

    if (!isValid) {
      alert("Please fill all required fields.");
      return;
    }

    const cart = getCart();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    setLoading(true);

    try {
      /* ==============================
         TOTAL
      ============================== */

      const total = cart.reduce(
        (sum, item) => sum + getItemTotal(item),
        0
      );

      /* ==============================
         ORDER ID
      ============================== */

      const orderId = "NISS-" + Date.now();

      const orderDate = new Date().toLocaleString("en-IN");

      const customerName =
        `${address.firstName} ${address.lastName}`;

      /* ==============================
         ORDER DATA
      ============================== */

      const inquiry = {
        orderId,

        date: orderDate,

        customerName,

        phone: address.phone,

        email: address.email,

        address: {
          street: address.street,
          addressLine2: address.addressLine2,
          city: address.city,
          district: address.district,
          state: address.state,
          country: address.country,
          pincode: address.pincode
        },

        items: cart.map((item) => ({
          name:
            item.title ||
            item.name ||
            "Selected Service",

          category:
            item.category ||
            item.type ||
            "Service",

          price: getItemTotal(item),

          hours: item.hours || "",

          date: item.date || "",

          location: item.location || ""
        })),

        total,

        status: "Pending",

        createdAt: serverTimestamp()
      };

      /* ==============================
         FIREBASE DATABASE
      ============================== */

      await addDoc(
        collection(db, "inquiries"),
        inquiry
      );

      /* ==============================
         CUSTOMER ORDER
      ============================== */

      const oldOrders =
        JSON.parse(
          localStorage.getItem("niss_orders")
        ) || [];

      oldOrders.push({
        id: orderId,

        orderType: "Service Inquiry",

        date: new Date().toISOString(),

        status: "Pending",

        total,

        cart,

        address
      });

      localStorage.setItem(
        "niss_orders",
        JSON.stringify(oldOrders)
      );

      /* ==============================
         OLD DASHBOARD SUPPORT
      ============================== */

      const oldInquiries =
        JSON.parse(
          localStorage.getItem("nissInquiries")
        ) || [];

      oldInquiries.push(inquiry);

      localStorage.setItem(
        "nissInquiries",
        JSON.stringify(oldInquiries)
      );

      /* ==============================
         WHATSAPP
      ============================== */

      let itemsMessage = "";

      cart.forEach((item, index) => {
        itemsMessage +=
          `\n${index + 1}. ` +
          `${item.title || item.name || "Service"}`;

        if (item.hours) {
          itemsMessage += ` | ${item.hours} Hours`;
        }

        if (item.date) {
          itemsMessage += ` | Date: ${item.date}`;
        }

        if (item.location) {
          itemsMessage += ` | Location: ${item.location}`;
        }

        itemsMessage += ` | ₹${getItemTotal(item)}`;
      });

      const fullAddress = `
${address.street}
${address.addressLine2}
${address.city}
${address.district}
${address.state}
${address.country}
Pincode: ${address.pincode}
`;

      const whatsappMessage = `
*NEW NISS CUSTOMER INQUIRY* 🚨

*Order ID:* ${orderId}

*Customer Name:*
${customerName}

*Phone:*
${address.phone}

*Email:*
${address.email || "Not Provided"}

*Selected Services / Products:*
${itemsMessage}

*Total Amount:*
₹${total.toLocaleString("en-IN")}

*Customer Address:*
${fullAddress}

*Order Date:*
${orderDate}

Please contact the customer regarding this inquiry.
`;

      const whatsappURL =
        `https://wa.me/919958424916?text=${encodeURIComponent(
          whatsappMessage
        )}`;

      /* ==============================
         CLEAR CART
      ============================== */

      localStorage.removeItem("cart");

      /* ==============================
         WHATSAPP
      ============================== */

      window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

      /* ==============================
         SUCCESS
      ============================== */

      alert(
        "Your inquiry has been submitted successfully!"
      );

      navigate("/");

    } catch (error) {
      console.error(
        "Firebase inquiry error:",
        error
      );

      alert(
        "Inquiry submit nahi hui. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">

   

      <div className="checkout-bg"></div>

      <div className="checkout-container">

        <div className="checkout-left">

          <span className="checkout-small-title">
            NISS TECHNOLOGIES
          </span>

          <h1>
            Complete Your
            <span> Inquiry</span>
          </h1>

          <p>
            Please enter your details below.
            Your inquiry will be sent to our
            team and recorded in the dashboard.
          </p>

          <div className="checkout-box-info">

            <h3>
              What happens next?
            </h3>

            <ul>

              <li>
                ✔ Your inquiry is saved
              </li>

              <li>
                ✔ Firebase database receives it
              </li>

              <li>
                ✔ WhatsApp notification is sent
              </li>

              <li>
                ✔ Your order appears in My Dashboard
              </li>

            </ul>

          </div>

        </div>

        <div className="checkout-right">

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <h2>
              Customer Details
            </h2>

            <div className="grid-2">

              <input
                name="firstName"
                placeholder="First Name *"
                value={address.firstName}
                onChange={handleChange}
                required
              />

              <input
                name="lastName"
                placeholder="Last Name *"
                value={address.lastName}
                onChange={handleChange}
                required
              />

            </div>

            <div className="grid-2">

              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number *"
                value={address.phone}
                onChange={(e) => {

                  const value =
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);

                  setAddress({
                    ...address,
                    phone: value
                  });

                }}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={address.email}
                onChange={handleChange}
              />

            </div>

            <h3 className="checkout-address-title">
              Address Details
            </h3>

            <input
              name="street"
              placeholder="Street Address *"
              value={address.street}
              onChange={handleChange}
              required
            />

            <input
              name="addressLine2"
              placeholder="Apartment / Landmark / Optional"
              value={address.addressLine2}
              onChange={handleChange}
            />

            <div className="grid-2">

              <input
                name="city"
                placeholder="City *"
                value={address.city}
                onChange={handleChange}
                required
              />

              <input
                name="district"
                placeholder="District"
                value={address.district}
                onChange={handleChange}
              />

            </div>

            <div className="grid-2">

              <input
                name="state"
                placeholder="State *"
                value={address.state}
                onChange={handleChange}
                required
              />

              <input
                name="country"
                placeholder="Country *"
                value={address.country}
                onChange={handleChange}
                required
              />

            </div>

            <input
              name="pincode"
              placeholder="Pincode *"
              value={address.pincode}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="checkout-btn"
              disabled={loading}
            >

              {loading
                ? "Submitting..."
                : "Submit Inquiry →"}

            </button>

            <p className="checkout-note">
              🔒 Your information is used only
              for processing your inquiry.
            </p>

          </form>

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default Checkout;