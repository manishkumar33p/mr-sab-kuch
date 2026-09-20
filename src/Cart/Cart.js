// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Cart.css";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState(0);

//   const navigate = useNavigate();

//   useEffect(() => {
//     loadCart();

//     const handleStorage = () => {
//       loadCart();
//     };

//     window.addEventListener("storage", handleStorage);

//     return () => {
//       window.removeEventListener("storage", handleStorage);
//     };
//   }, []);

//   const loadCart = () => {
//     const storedCart =
//       JSON.parse(localStorage.getItem("cart")) || [];

//     setCart(storedCart);
//     calculateTotal(storedCart);
//   };

//   // -----------------------------
//   // GET ITEM PRICE SAFELY
//   // -----------------------------
//   const getItemTotal = (item) => {
//     // Hourly service
//     if (
//       item.pricePerHour &&
//       item.hours
//     ) {
//       return (
//         Number(item.pricePerHour) *
//         Number(item.hours)
//       );
//     }

//     // Service with totalPrice
//     if (item.totalPrice) {
//       return Number(item.totalPrice);
//     }

//     // Normal product
//     if (item.price) {
//       if (typeof item.price === "number") {
//         return item.price;
//       }

//       if (typeof item.price === "string") {
//         return (
//           parseFloat(
//             item.price.replace(/[^\d.]/g, "")
//           ) || 0
//         );
//       }
//     }

//     return 0;
//   };

//   // -----------------------------
//   // TOTAL
//   // -----------------------------
//   const calculateTotal = (items) => {
//     const sum = items.reduce(
//       (acc, item) =>
//         acc + getItemTotal(item),
//       0
//     );

//     setTotal(sum);
//   };

//   // -----------------------------
//   // REMOVE ITEM
//   // -----------------------------
//   const removeItem = (index) => {
//     const updatedCart = cart.filter(
//       (_, i) => i !== index
//     );

//     setCart(updatedCart);

//     localStorage.setItem(
//       "cart",
//       JSON.stringify(updatedCart)
//     );

//     calculateTotal(updatedCart);
//   };

//   // -----------------------------
//   // CLEAR CART
//   // -----------------------------
//   const clearCart = () => {
//     if (cart.length === 0) return;

//     const confirmClear = window.confirm(
//       "Are you sure you want to clear your cart?"
//     );

//     if (!confirmClear) return;

//     localStorage.removeItem("cart");

//     setCart([]);
//     setTotal(0);
//   };

//   // -----------------------------
//   // CHECKOUT
//   // -----------------------------
//   const proceedToCheckout = () => {
//     if (cart.length === 0) {
//       alert("Your cart is empty.");
//       return;
//     }

//     navigate("/checkout");
//   };

//   // -----------------------------
//   // CONTINUE SHOPPING
//   // -----------------------------
//   const continueShopping = () => {
//     navigate("/shop");
//   };

//   // -----------------------------
//   // FORMAT PRICE
//   // -----------------------------
//   const formatPrice = (price) => {
//     return Number(price).toLocaleString("en-IN");
//   };

//   // -----------------------------
//   // EMPTY CART
//   // -----------------------------
//   if (cart.length === 0) {
//     return (
//       <div className="cart-page">

//         <div className="cart-empty">

//           <div className="empty-icon">
//             🛒
//           </div>

//           <h1>Your Cart is Empty</h1>

//           <p>
//             You haven't added any products or
//             services to your cart yet.
//           </p>

//           <button
//             className="continue-shopping-btn"
//             onClick={continueShopping}
//           >
//             ← Continue Shopping
//           </button>

//         </div>

//       </div>
//     );
//   }

//   return (
//     <div className="cart-page">

//       {/* HEADER */}
//       <section className="cart-top">

//         <div>
//           <span className="cart-small-title">
//             NISS SERVICES
//           </span>

//           <h1>
//             Your Shopping Cart 🛒
//           </h1>

//           <p>
//             Review your selected products and
//             services before checkout.
//           </p>
//         </div>

//         <div className="cart-count">
//           <strong>{cart.length}</strong>
//           <span>
//             {cart.length === 1
//               ? "Item"
//               : "Items"}
//           </span>
//         </div>

//       </section>

//       {/* MAIN */}
//       <section className="cart-container">

//         {/* LEFT */}
//         <div className="cart-left">

//           <div className="cart-list-header">

//             <h2>
//               Selected Items
//             </h2>

//             <button
//               className="clear-cart"
//               onClick={clearCart}
//             >
//               Clear Cart
//             </button>

//           </div>

//           {cart.map((item, index) => {

//             const itemTotal =
//               getItemTotal(item);

//             return (
//               <div
//                 className="cart-card"
//                 key={index}
//               >

//                 {/* IMAGE */}
//                 <div className="cart-image-box">

//                   {item.image ||
//                   item.img ? (
//                     <img
//                       src={
//                         item.image ||
//                         item.img
//                       }
//                       alt={
//                         item.name ||
//                         item.title ||
//                         "Product"
//                       }
//                     />
//                   ) : (
//                     <div className="no-image">
//                       NISS
//                     </div>
//                   )}

//                 </div>

//                 {/* INFO */}
//                 <div className="cart-info">

//                   <span className="cart-category">
//                     {item.category ||
//                       item.type ||
//                       "Service"}
//                   </span>

//                   <h3>
//                     {item.title ||
//                       item.name ||
//                       "Selected Service"}
//                   </h3>

//                   {/* HOURLY SERVICE */}
//                   {item.pricePerHour &&
//                   item.hours ? (
//                     <div className="booking-details">

//                       <div>
//                         <span>
//                           Rate
//                         </span>

//                         <strong>
//                           ₹
//                           {formatPrice(
//                             item.pricePerHour
//                           )}
//                           /hr
//                         </strong>
//                       </div>

//                       <div>
//                         <span>
//                           Duration
//                         </span>

//                         <strong>
//                           {item.hours}{" "}
//                           {item.hours === 1
//                             ? "Hour"
//                             : "Hours"}
//                         </strong>
//                       </div>

//                       {item.date && (
//                         <div>
//                           <span>
//                             Date
//                           </span>

//                           <strong>
//                             {item.date}
//                           </strong>
//                         </div>
//                       )}

//                       {item.location && (
//                         <div className="address-detail">
//                           <span>
//                             Address
//                           </span>

//                           <strong>
//                             {item.location}
//                           </strong>
//                         </div>
//                       )}

//                     </div>
//                   ) : (
//                     <div className="normal-price">
//                       ₹
//                       {formatPrice(
//                         itemTotal
//                       )}
//                     </div>
//                   )}

//                 </div>

//                 {/* RIGHT */}
//                 <div className="cart-card-right">

//                   <div className="item-total">
//                     <span>
//                       Total
//                     </span>

//                     <strong>
//                       ₹
//                       {formatPrice(
//                         itemTotal
//                       )}
//                     </strong>
//                   </div>

//                   <button
//                     className="remove-btn"
//                     onClick={() =>
//                       removeItem(index)
//                     }
//                   >
//                     🗑 Remove
//                   </button>

//                 </div>

//               </div>
//             );
//           })}

//           {/* CONTINUE */}
//           <button
//             className="continue-btn"
//             onClick={continueShopping}
//           >
//             ← Continue Shopping
//           </button>

//         </div>

//         {/* RIGHT SUMMARY */}
//         <aside className="cart-summary">

//           <div className="summary-title">
//             <h2>
//               Order Summary
//             </h2>

//             <span>
//               {cart.length}{" "}
//               {cart.length === 1
//                 ? "item"
//                 : "items"}
//             </span>
//           </div>

//           <div className="summary-row">
//             <span>
//               Items Total
//             </span>

//             <strong>
//               ₹
//               {formatPrice(total)}
//             </strong>
//           </div>

//           <div className="summary-row">
//             <span>
//               Service Charges
//             </span>

//             <strong className="free">
//               FREE
//             </strong>
//           </div>

//           <div className="summary-row">
//             <span>
//               Convenience Fee
//             </span>

//             <strong className="free">
//               FREE
//             </strong>
//           </div>

//           <div className="summary-line"></div>

//           <div className="grand-total">

//             <span>
//               Grand Total
//             </span>

//             <strong>
//               ₹
//               {formatPrice(total)}
//             </strong>

//           </div>

//           <button
//             className="checkout-btn"
//             onClick={proceedToCheckout}
//           >
//             Proceed To Checkout
//             <span>→</span>
//           </button>

//           <div className="secure-box">

//             <div className="secure-icon">
//               🔒
//             </div>

//             <div>
//               <strong>
//                 Secure Checkout
//               </strong>

//               <p>
//                 Your information is safe
//                 and protected.
//               </p>
//             </div>

//           </div>

//           <div className="support-box">

//             <strong>
//               Need Help?
//             </strong>

//             <p>
//               Our team is available to
//               help you with your booking.
//             </p>

//             <button
//               onClick={() =>
//                 navigate("/contact-us")
//               }
//             >
//               Contact Support
//             </button>

//           </div>

//         </aside>

//       </section>

//     </div>
//   );
// };

// export default Cart;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    loadCart();

    const handleStorage = () => {
      loadCart();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const loadCart = () => {
    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(storedCart);
    calculateTotal(storedCart);
  };

  const getItemTotal = (item) => {
    if (item.pricePerHour && item.hours) {
      return (
        Number(item.pricePerHour) *
        Number(item.hours)
      );
    }

    if (item.totalPrice) {
      return Number(item.totalPrice);
    }

    if (item.price) {
      if (typeof item.price === "number") {
        return item.price;
      }

      if (typeof item.price === "string") {
        return (
          parseFloat(
            item.price.replace(/[^\d.]/g, "")
          ) || 0
        );
      }
    }

    return 0;
  };

  const calculateTotal = (items) => {
    const sum = items.reduce(
      (acc, item) => acc + getItemTotal(item),
      0
    );

    setTotal(sum);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter(
      (_, i) => i !== index
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    calculateTotal(updatedCart);
  };

  const clearCart = () => {
    if (cart.length === 0) return;

    const confirmClear = window.confirm(
      "Are you sure you want to clear your cart?"
    );

    if (!confirmClear) return;

    localStorage.removeItem("cart");

    setCart([]);
    setTotal(0);
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    navigate("/checkout");
  };

  const continueShopping = () => {
    navigate("/shop");
  };

  const formatPrice = (price) => {
    return Number(price).toLocaleString("en-IN");
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">

        <div className="cart-empty">

          <div className="cart-empty-icon">
            🛒
          </div>

          <h1>Your Cart is Empty</h1>

          <p>
            You haven't added any products or
            services to your cart yet.
          </p>

          <button
            className="cart-continue-btn"
            onClick={continueShopping}
          >
            ← Continue Shopping
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* HEADER */}

      <section className="cart-top">

        <div>
          <span className="cart-small-title">
            NISS SERVICES
          </span>

          <h1>
            Your Shopping Cart 🛒
          </h1>

          <p>
            Review your selected products and
            services before checkout.
          </p>
        </div>

        <div className="cart-count">
          <strong>{cart.length}</strong>

          <span>
            {cart.length === 1
              ? "Item"
              : "Items"}
          </span>
        </div>

      </section>


      {/* MAIN */}

      <section className="cart-container">

        {/* LEFT */}

        <div className="cart-left">

          <div className="cart-list-header">

            <h2>
              Selected Items
            </h2>

            <button
              className="cart-clear-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>

          </div>


          {cart.map((item, index) => {

            const itemTotal =
              getItemTotal(item);

            return (
              <div
                className="cart-card"
                key={index}
              >

                {/* IMAGE */}

                <div className="cart-image-box">

                  {item.image || item.img ? (

                    <img
                      src={
                        item.image ||
                        item.img
                      }
                      alt={
                        item.name ||
                        item.title ||
                        "Product"
                      }
                    />

                  ) : (

                    <div className="cart-no-image">
                      NISS
                    </div>

                  )}

                </div>


                {/* INFO */}

                <div className="cart-info">

                  <span className="cart-category">

                    {item.category ||
                      item.type ||
                      "Service"}

                  </span>

                  <h3>

                    {item.title ||
                      item.name ||
                      "Selected Service"}

                  </h3>


                  {item.pricePerHour &&
                  item.hours ? (

                    <div className="cart-booking-details">

                      <div>
                        <span>Rate</span>

                        <strong>
                          ₹
                          {formatPrice(
                            item.pricePerHour
                          )}
                          /hr
                        </strong>
                      </div>

                      <div>
                        <span>Duration</span>

                        <strong>
                          {item.hours}{" "}
                          {item.hours === 1
                            ? "Hour"
                            : "Hours"}
                        </strong>
                      </div>

                      {item.date && (
                        <div>
                          <span>Date</span>

                          <strong>
                            {item.date}
                          </strong>
                        </div>
                      )}

                      {item.location && (
                        <div className="cart-address-detail">

                          <span>
                            Address
                          </span>

                          <strong>
                            {item.location}
                          </strong>

                        </div>
                      )}

                    </div>

                  ) : (

                    <div className="cart-normal-price">

                      ₹
                      {formatPrice(
                        itemTotal
                      )}

                    </div>

                  )}

                </div>


                {/* RIGHT */}

                <div className="cart-card-right">

                  <div className="cart-item-total">

                    <span>
                      Total
                    </span>

                    <strong>
                      ₹
                      {formatPrice(
                        itemTotal
                      )}
                    </strong>

                  </div>

                  <button
                    className="cart-remove-btn"
                    onClick={() =>
                      removeItem(index)
                    }
                  >
                    🗑 Remove
                  </button>

                </div>

              </div>
            );

          })}


          <button
            className="cart-continue-btn cart-bottom-continue"
            onClick={continueShopping}
          >
            ← Continue Shopping
          </button>

        </div>


        {/* SUMMARY */}

        <aside className="cart-summary">

          <div className="cart-summary-title">

            <h2>
              Order Summary
            </h2>

            <span>
              {cart.length}{" "}
              {cart.length === 1
                ? "item"
                : "items"}
            </span>

          </div>


          <div className="cart-summary-row">

            <span>
              Items Total
            </span>

            <strong>
              ₹
              {formatPrice(total)}
            </strong>

          </div>


          <div className="cart-summary-row">

            <span>
              Service Charges
            </span>

            <strong className="cart-free">
              FREE
            </strong>

          </div>


          <div className="cart-summary-row">

            <span>
              Convenience Fee
            </span>

            <strong className="cart-free">
              FREE
            </strong>

          </div>


          <div className="cart-summary-line"></div>


          <div className="cart-grand-total">

            <span>
              Grand Total
            </span>

            <strong>
              ₹
              {formatPrice(total)}
            </strong>

          </div>


          <button
            className="cart-checkout-btn"
            onClick={proceedToCheckout}
          >
            Proceed To Checkout
            <span>→</span>
          </button>


          <div className="cart-secure-box">

            <div className="cart-secure-icon">
              🔒
            </div>

            <div>

              <strong>
                Secure Checkout
              </strong>

              <p>
                Your information is safe
                and protected.
              </p>

            </div>

          </div>


          <div className="cart-support-box">

            <strong>
              Need Help?
            </strong>

            <p>
              Our team is available to
              help you with your booking.
            </p>

            <button
              onClick={() =>
                navigate("/contact-us")
              }
            >
              Contact Support
            </button>

          </div>

        </aside>

      </section>

    </div>
  );
};

export default Cart;