
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./CustomerDashboard.css";

// const CustomerDashboard = () => {
//   const navigate = useNavigate();

//   const [customer, setCustomer] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const storedCustomer =
//       JSON.parse(localStorage.getItem("niss_customer")) || null;

//     const storedOrders =
//       JSON.parse(localStorage.getItem("niss_orders")) || [];

//     const storedCart =
//       JSON.parse(localStorage.getItem("cart")) || [];

//     setCustomer(storedCustomer);
//     setOrders(storedOrders);
//     setCart(storedCart);

//     if (!storedCustomer) {
//       navigate("/customerlogin");
//     }
//   }, [navigate]);

//   const logout = () => {
//     localStorage.removeItem("niss_customer");
//     navigate("/customerlogin");
//   };

//   const getOrderTotal = (order) => {
//     if (order.total) {
//       return Number(order.total);
//     }

//     if (order.cart) {
//       return order.cart.reduce((sum, item) => {
//         if (item.pricePerHour && item.hours) {
//           return (
//             sum +
//             Number(item.pricePerHour) *
//               Number(item.hours)
//           );
//         }

//         if (item.totalPrice) {
//           return sum + Number(item.totalPrice);
//         }

//         if (item.price) {
//           const price =
//             typeof item.price === "number"
//               ? item.price
//               : parseFloat(
//                   String(item.price).replace(/[^\d.]/g, "")
//                 ) || 0;

//           return sum + price;
//         }

//         return sum;
//       }, 0);
//     }

//     return 0;
//   };

//   const formatPrice = (price) => {
//     return Number(price || 0).toLocaleString("en-IN");
//   };

//   if (!customer) {
//     return null;
//   }

//   return (
//     <div className="niss-customer-dashboard">

//       {/* HEADER */}
//       <div className="niss-customer-header">

//         <div>
//           <span className="niss-dashboard-label">
//             NISS TECHNOLOGIES
//           </span>

//           <h1>
//             My Dashboard
//           </h1>

//           <p>
//             Welcome back, {customer.name}
//           </p>
//         </div>

//         <button
//           className="niss-dashboard-logout"
//           onClick={logout}
//         >
//           Logout
//         </button>

//       </div>

//       {/* CUSTOMER PROFILE */}
//       <section className="niss-customer-profile">

//         <div className="niss-profile-avatar">
//           {customer.name
//             ? customer.name.charAt(0).toUpperCase()
//             : "C"}
//         </div>

//         <div className="niss-profile-info">
//           <h2>{customer.name}</h2>

//           <p>
//             📱 +91 {customer.phone}
//           </p>

//           <span>
//             Customer Account
//           </span>
//         </div>

//       </section>

//       {/* STATS */}
//       <section className="niss-dashboard-stats">

//         <div className="niss-customer-stat">
//           <span>🛒</span>
//           <strong>{cart.length}</strong>
//           <p>Cart Items</p>
//         </div>

//         <div className="niss-customer-stat">
//           <span>📦</span>
//           <strong>{orders.length}</strong>
//           <p>Total Orders</p>
//         </div>

//         <div className="niss-customer-stat">
//           <span>₹</span>
//           <strong>
//             {formatPrice(
//               orders.reduce(
//                 (sum, order) =>
//                   sum + getOrderTotal(order),
//                 0
//               )
//             )}
//           </strong>
//           <p>Total Spent</p>
//         </div>

//       </section>

//       {/* CURRENT CART */}
//       {cart.length > 0 && (
//         <section className="niss-customer-section">

//           <div className="niss-section-heading">

//             <div>
//               <span>ACTIVE</span>
//               <h2>Current Cart</h2>
//             </div>

//             <button
//               onClick={() => navigate("/cart")}
//             >
//               View Cart →
//             </button>

//           </div>

//           <div className="niss-cart-preview">

//             {cart.map((item, index) => (

//               <div
//                 className="niss-cart-item"
//                 key={index}
//               >

//                 <div className="niss-cart-item-image">

//                   {item.image || item.img ? (
//                     <img
//                       src={item.image || item.img}
//                       alt={item.name || item.title}
//                     />
//                   ) : (
//                     <span>NISS</span>
//                   )}

//                 </div>

//                 <div>
//                   <h3>
//                     {item.title ||
//                       item.name ||
//                       "Selected Service"}
//                   </h3>

//                   <p>
//                     {item.category ||
//                       item.type ||
//                       "Service"}
//                   </p>
//                 </div>

//               </div>

//             ))}

//           </div>

//         </section>
//       )}

//       {/* ORDERS */}
//       <section className="niss-customer-section">

//         <div className="niss-section-heading">

//           <div>
//             <span>HISTORY</span>
//             <h2>My Orders</h2>
//           </div>

//         </div>

//         {orders.length === 0 ? (

//           <div className="niss-no-orders">

//             <div>
//               📦
//             </div>

//             <h3>
//               No Orders Yet
//             </h3>

//             <p>
//               Your bookings and purchases will
//               appear here.
//             </p>

//             <button
//               onClick={() => navigate("/shop")}
//             >
//               Explore Services
//             </button>

//           </div>

//         ) : (

//           <div className="niss-orders-list">

//             {orders
//               .slice()
//               .reverse()
//               .map((order, index) => (

//                 <div
//                   className="niss-order-card"
//                   key={order.id || index}
//                 >

//                   <div className="niss-order-top">

//                     <div>
//                       <span>
//                         ORDER #{order.id || index + 1}
//                       </span>

//                       <h3>
//                         {order.orderType ||
//                           "Service Order"}
//                       </h3>
//                     </div>

//                     <div className="niss-order-status">
//                       {order.status || "Pending"}
//                     </div>

//                   </div>

//                   <div className="niss-order-details">

//                     <div>
//                       <small>Date</small>

//                       <strong>
//                         {order.date
//                           ? new Date(
//                               order.date
//                             ).toLocaleDateString("en-IN")
//                           : "N/A"}
//                       </strong>
//                     </div>

//                     <div>
//                       <small>Total</small>

//                       <strong>
//                         ₹{" "}
//                         {formatPrice(
//                           getOrderTotal(order)
//                         )}
//                       </strong>
//                     </div>

//                   </div>

//                   {order.cart &&
//                     order.cart.length > 0 && (

//                       <div className="niss-order-items">

//                         <h4>
//                           Ordered Items
//                         </h4>

//                         {order.cart.map(
//                           (item, itemIndex) => (

//                             <div
//                               key={itemIndex}
//                               className="niss-order-item"
//                             >

//                               <span>
//                                 {item.title ||
//                                   item.name ||
//                                   "Service"}
//                               </span>

//                               <span>
//                                 {item.category ||
//                                   item.type ||
//                                   "Service"}
//                               </span>

//                             </div>

//                           )
//                         )}

//                       </div>

//                     )}

//                   {order.address && (

//                     <div className="niss-order-address">

//                       <h4>
//                         Delivery Address
//                       </h4>

//                       <p>
//                         {order.address.firstName}{" "}
//                         {order.address.lastName},{" "}
//                         {order.address.street},{" "}
//                         {order.address.city},{" "}
//                         {order.address.state} -{" "}
//                         {order.address.pincode},{" "}
//                         {order.address.country}
//                       </p>

//                     </div>

//                   )}

//                 </div>

//               ))}

//           </div>

//         )}

//       </section>

//       {/* QUICK ACTIONS */}
//       <section className="niss-quick-actions">

//         <button onClick={() => navigate("/shop")}>
//           🛍 Explore Services
//         </button>

//         <button onClick={() => navigate("/cart")}>
//           🛒 Open Cart
//         </button>

//         <button onClick={() => navigate("/contact-us")}>
//           💬 Contact Support
//         </button>

//       </section>

//     </div>
//   );
// };

// export default CustomerDashboard;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore";

import { db } from "../firebase";
import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomerData();
  }, []);

  const loadCustomerData = async () => {
    try {
      const storedCustomer =
        JSON.parse(
          localStorage.getItem("niss_customer")
        ) || null;

      if (!storedCustomer) {
        navigate("/customerlogin");
        return;
      }

      setCustomer(storedCustomer);

      const storedCart =
        JSON.parse(
          localStorage.getItem("cart")
        ) || [];

      setCart(storedCart);

      /*
       * FIREBASE SE CUSTOMER ORDERS
       */

      const inquiriesRef =
        collection(db, "inquiries");

      const q = query(
        inquiriesRef,
        where("phone", "==", storedCustomer.phone),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const firebaseOrders = snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data()
        })
      );

      setOrders(firebaseOrders);

    } catch (error) {

      console.error(
        "Customer Dashboard Error:",
        error
      );

      /*
       * Agar orderBy ki wajah se Firebase
       * index error aaye to simple query try karein
       */

      try {

        const storedCustomer =
          JSON.parse(
            localStorage.getItem("niss_customer")
          );

        if (!storedCustomer) return;

        const inquiriesRef =
          collection(db, "inquiries");

        const q = query(
          inquiriesRef,
          where(
            "phone",
            "==",
            storedCustomer.phone
          )
        );

        const snapshot =
          await getDocs(q);

        const firebaseOrders =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data()
            })
          );

        setOrders(firebaseOrders);

      } catch (secondError) {

        console.error(
          "Firebase Error:",
          secondError
        );

      }

    } finally {

      setLoading(false);

    }
  };


  const logout = () => {

    localStorage.removeItem(
      "niss_customer"
    );

    navigate("/customerlogin");

  };


  const getOrderTotal = (order) => {

    if (order.total) {
      return Number(order.total);
    }

    if (order.items) {

      return order.items.reduce(
        (sum, item) =>
          sum + Number(item.price || 0),
        0
      );

    }

    if (order.cart) {

      return order.cart.reduce(
        (sum, item) => {

          if (
            item.pricePerHour &&
            item.hours
          ) {

            return (
              sum +
              Number(
                item.pricePerHour
              ) *
              Number(item.hours)
            );

          }

          if (item.totalPrice) {

            return (
              sum +
              Number(item.totalPrice)
            );

          }

          if (item.price) {

            const price =
              typeof item.price ===
              "number"
                ? item.price
                : parseFloat(
                    String(
                      item.price
                    ).replace(
                      /[^\d.]/g,
                      ""
                    )
                  ) || 0;

            return sum + price;

          }

          return sum;

        },
        0
      );

    }

    return 0;

  };


  const formatPrice = (price) => {

    return Number(
      price || 0
    ).toLocaleString("en-IN");

  };


  if (loading) {

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "700"
        }}
      >
        Loading your dashboard...
      </div>
    );

  }


  if (!customer) {
    return null;
  }


  return (

    <div className="niss-customer-dashboard">

      {/* HEADER */}

      <div className="niss-customer-header">

        <div>

          <span className="niss-dashboard-label">
            NISS TECHNOLOGIES
          </span>

          <h1>
            My Dashboard
          </h1>

          <p>
            Welcome back,{" "}
            {customer.name}
          </p>

        </div>


        <button
          className="niss-dashboard-logout"
          onClick={logout}
        >
          Logout
        </button>

      </div>


      {/* PROFILE */}

      <section className="niss-customer-profile">

        <div className="niss-profile-avatar">

          {customer.name
            ? customer.name
                .charAt(0)
                .toUpperCase()
            : "C"}

        </div>


        <div className="niss-profile-info">

          <h2>
            {customer.name}
          </h2>

          <p>
            📱 +91 {customer.phone}
          </p>

          <span>
            Customer Account
          </span>

        </div>

      </section>


      {/* STATS */}

      <section className="niss-dashboard-stats">

        <div className="niss-customer-stat">

          <span>🛒</span>

          <strong>
            {cart.length}
          </strong>

          <p>
            Cart Items
          </p>

        </div>


        <div className="niss-customer-stat">

          <span>📦</span>

          <strong>
            {orders.length}
          </strong>

          <p>
            Total Orders
          </p>

        </div>


        <div className="niss-customer-stat">

          <span>₹</span>

          <strong>

            {formatPrice(
              orders.reduce(
                (sum, order) =>
                  sum +
                  getOrderTotal(
                    order
                  ),
                0
              )
            )}

          </strong>

          <p>
            Total Spent
          </p>

        </div>

      </section>


      {/* CURRENT CART */}

      {cart.length > 0 && (

        <section className="niss-customer-section">

          <div className="niss-section-heading">

            <div>

              <span>
                ACTIVE
              </span>

              <h2>
                Current Cart
              </h2>

            </div>


            <button
              onClick={() =>
                navigate("/cart")
              }
            >
              View Cart →
            </button>

          </div>


          <div className="niss-cart-preview">

            {cart.map(
              (item, index) => (

                <div
                  className="niss-cart-item"
                  key={index}
                >

                  <div className="niss-cart-item-image">

                    {item.image ||
                    item.img ? (

                      <img
                        src={
                          item.image ||
                          item.img
                        }
                        alt={
                          item.name ||
                          item.title
                        }
                      />

                    ) : (

                      <span>
                        NISS
                      </span>

                    )}

                  </div>


                  <div>

                    <h3>
                      {item.title ||
                        item.name ||
                        "Selected Service"}
                    </h3>

                    <p>
                      {item.category ||
                        item.type ||
                        "Service"}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </section>

      )}


      {/* ORDERS */}

      <section className="niss-customer-section">

        <div className="niss-section-heading">

          <div>

            <span>
              HISTORY
            </span>

            <h2>
              My Orders
            </h2>

          </div>

        </div>


        {orders.length === 0 ? (

          <div className="niss-no-orders">

            <div>
              📦
            </div>

            <h3>
              No Orders Yet
            </h3>

            <p>
              Your bookings and purchases
              will appear here.
            </p>

            <button
              onClick={() =>
                navigate("/shop")
              }
            >
              Explore Services
            </button>

          </div>

        ) : (

          <div className="niss-orders-list">

            {orders
              .slice()
              .reverse()
              .map(
                (order, index) => (

                  <div
                    className="niss-order-card"
                    key={
                      order.id ||
                      index
                    }
                  >

                    <div className="niss-order-top">

                      <div>

                        <span>
                          ORDER #
                          {order.orderId ||
                            order.id ||
                            index + 1}
                        </span>

                        <h3>
                          {order.orderType ||
                            "Service Inquiry"}
                        </h3>

                      </div>


                      <div className="niss-order-status">

                        {order.status ||
                          "Pending"}

                      </div>

                    </div>


                    <div className="niss-order-details">

                      <div>

                        <small>
                          Date
                        </small>

                        <strong>

                          {order.date
                            ? order.date
                            : order.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "N/A"}

                        </strong>

                      </div>


                      <div>

                        <small>
                          Total
                        </small>

                        <strong>

                          ₹{" "}
                          {formatPrice(
                            getOrderTotal(
                              order
                            )
                          )}

                        </strong>

                      </div>

                    </div>


                    {/* PRODUCTS */}

                    {(order.items ||
                      order.cart) && (

                      <div className="niss-order-items">

                        <h4>
                          Ordered Items
                        </h4>


                        {(order.items ||
                          order.cart ||
                          []).map(
                            (
                              item,
                              itemIndex
                            ) => (

                              <div
                                key={
                                  itemIndex
                                }
                                className="niss-order-item"
                              >

                                <span>

                                  {item.name ||
                                    item.title ||
                                    "Service"}

                                </span>


                                <span>

                                  {item.category ||
                                    item.type ||
                                    "Service"}

                                </span>

                              </div>

                            )
                          )}

                      </div>

                    )}


                    {/* ADDRESS */}

                    {order.address && (

                      <div className="niss-order-address">

                        <h4>
                          Delivery Address
                        </h4>

                        <p>

                          {typeof order.address ===
                          "string"
                            ? order.address
                            : `${order.address.street || ""}
                               ${order.address.city || ""}
                               ${order.address.state || ""}
                               ${order.address.pincode || ""}
                               ${order.address.country || ""}`}

                        </p>

                      </div>

                    )}

                  </div>

                )
              )}

          </div>

        )}

      </section>


      {/* QUICK ACTIONS */}

      <section className="niss-quick-actions">

        <button
          onClick={() =>
            navigate("/shop")
          }
        >
          🛍 Explore Services
        </button>


        <button
          onClick={() =>
            navigate("/cart")
          }
        >
          🛒 Open Cart
        </button>


        <button
          onClick={() =>
            navigate("/contact-us")
          }
        >
          💬 Contact Support
        </button>

      </section>

    </div>

  );

};


export default CustomerDashboard;