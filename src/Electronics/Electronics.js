
// import React, { useState , useEffect} from 'react';
// import { NavLink } from "react-router-dom";
// import "D:/marv/src/Shop/Shop.css";
// import NavBar from '../Navbar/Navbar';
// import charger1 from "../charger1.jpg";
// import charger2 from "../charger2.jpg";
// import Footer from "../Footer/Footer";
// import charger3 from "../charger3.jpg"
// import charger4 from "../charger4.jpg"
// import charger5 from "../charger5.jpg"
// import charger6 from "../charger6.jpg"
// import charger7 from "../charger7.jpg"
// import charger8 from "../charger8.jpg"
// import charger9 from "../charger9.jpg"
// import charger10 from "../charger10.jpg"
// import charger11 from "../charger11.jpg"
// import charger12 from "../charger12.jpg"
// import charger13 from "../charger13.jpg"
// import charger14 from "../charger14.jpg"

// // other image imports...

// // Sample product data
// const products = [
//   { id: 1, name: "Dell 180 watt ", image: charger1, price: "$499", description: "Original 100% furnished" },
//   { id: 2, name: "Dell type c 90 watt", image: charger2, price: "$799", description: "Original 100% furnished" },
//   { id: 3, name: "HP blue pin 120 watt", image: charger3, price: "$150", description: "Original 100% furnished" },
//     {
//     id: 4,
//     name: "Lenovo usb 90 watt",
//     image: charger4, // All products will use this image
//     price: "$249",
//     description: "Original 100% furnished",
//   },
//   {
//     id: 5,
//     name: "Lenovo usb 65 watt",
//     image: charger5, // All products will use this image
//     price: "$199",
//     description: "Original 100% furnished",
//   },
//   {
//     id: 6,
//     name: "Dell 65 watt small pin",
//     image: charger6, // All products will use this image
//     price: "$349",
//     description: "Original 100% furnished",
//   },
//   {
//     id: 7,
//     name: "Dell c type 65wd",
//     image: charger7, // All products will use this image
//     price: "$1299",
//     description: "Original 100% furnished.",
//   },
//   {
//     id: 8,
//     name: "Power cable",
//     image: charger8, // All products will use this image
//     price: "$399",
//     description: "Original 100% furnished",
//   },
//   {
//     id: 9,
//     name: "Dell 65 watt big pin",
//     image: charger9,  // All products will use this image
//     price: "$120",
//     description: "Original 100% furnished",
//   },
//   {
//     id: 10,
//     name: "HP blue 65 watt",
//     image: charger10, // All products will use this image
//     price: "$299",
//     description: "Original 100% furnished.",
//   },
//   {
//     id: 11,
//     name: "HP blue pin 150 watt",
//     image: charger11, // All products will use this image
//     price: "$499",
//     description: "Original 100% furnished",
//   },
//   {
//     id: 12,
//     name: "Dell 240 watt big pin",
//     image: charger12, // All products will use this image
//     price: "$799",
//     description: "Original 100% furnished",
//   },
//   {
//     id: 13,
//     name: "Lenevo c type 65 watt",
//     image: charger13, // All products will use this image
//     price: "$150",
//     description: "Original 100% furnished",
//   },
//   {
//     id: 14,
//     name: "HP c type 65 watt",
//     image: charger14, // All products will use this image
//     price: "$249",
//     description: "Original 100% furnished",
//   },
 
//   // Add other products...
// ];

// const Electronics = () => {
//   const [cart, setCart] = useState([]);

//   // Load cart from localStorage if any
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//   }, []);

//   // Function to handle adding product to cart
//   const addToCart = (product) => {
//     const updatedCart = [...cart, product];
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save cart in localStorage
//     alert(`${product.name} has been added to the cart!`);
//   };

//   return (
//     <div className="shop-container">
//       <NavBar />
//       <h2 className="shop-heading">Our Electronics Products</h2>
      
//       <div className="product-grid">
//         {products.map((product) => (
//           <div key={product.id} className="product-card">
//             <img src={product.image} alt={product.name} className="product-image" />
//             <h3 className="product-name">{product.name}</h3>
//             <p className="product-price">{product.price}</p>
//             <p className="product-description">{product.description}</p>
//             <NavLink to={`/product/${product.id}`} className="product-link">
//               <button className="view-details-btn">View Details</button>
//             </NavLink>
//             <button 
//               className="view-details-btn1" 
//               onClick={() => addToCart(product)}
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//         <Footer />
//     </div>
//   );
// };

// export default Electronics;

// import React, { useState, useEffect } from 'react';
// import { NavLink } from "react-router-dom";
// import "../Shop/Shop.css";
// import "../Electronics/Electronics.css";
// import NavBar from '../Navbar/Navbar';
// import Footer from "../Footer/Footer";
// import charger1 from "../charger1.jpg";
// import charger2 from "../charger2.jpg";
// import charger3 from "../charger3.jpg";
// import charger4 from "../charger4.jpg";
// import charger5 from "../charger5.jpg";
// import charger6 from "../charger6.jpg";
// import charger7 from "../charger7.jpg";
// import charger8 from "../charger8.jpg";
// import charger9 from "../charger9.jpg";
// import charger10 from "../charger10.jpg";
// import charger11 from "../charger11.jpg";
// import charger12 from "../charger12.jpg";
// import charger13 from "../charger13.jpg";
// import charger14 from "../charger14.jpg";

// // Sample product data
// const products = [
//   { id: 1, name: "Dell 180 watt ", image: charger1, price: "$499", description: "Original 100% furnished" },
//   { id: 2, name: "Dell type c 90 watt", image: charger2, price: "$799", description: "Original 100% furnished" },
//   { id: 3, name: "HP blue pin 120 watt", image: charger3, price: "$150", description: "Original 100% furnished" },
//   { id: 4, name: "Lenovo usb 90 watt", image: charger4, price: "$249", description: "Original 100% furnished" },
//   { id: 5, name: "Lenovo usb 65 watt", image: charger5, price: "$199", description: "Original 100% furnished" },
//   { id: 6, name: "Dell 65 watt small pin", image: charger6, price: "$349", description: "Original 100% furnished" },
//   { id: 7, name: "Dell c type 65wd", image: charger7, price: "$1299", description: "Original 100% furnished." },
//   { id: 8, name: "Power cable", image: charger8, price: "$399", description: "Original 100% furnished" },
//   { id: 9, name: "Dell 65 watt big pin", image: charger9, price: "$120", description: "Original 100% furnished" },
//   { id: 10, name: "HP blue 65 watt", image: charger10, price: "$299", description: "Original 100% furnished." },
//   { id: 11, name: "HP blue pin 150 watt", image: charger11, price: "$499", description: "Original 100% furnished" },
//   { id: 12, name: "Dell 240 watt big pin", image: charger12, price: "$799", description: "Original 100% furnished" },
//   { id: 13, name: "Lenovo c type 65 watt", image: charger13, price: "$150", description: "Original 100% furnished" },
//   { id: 14, name: "HP c type 65 watt", image: charger14, price: "$249", description: "Original 100% furnished" },
// ];

// const Electronics = () => {
//   const [cart, setCart] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(10000); // You can adjust this range as per your need
//   const [filteredProducts, setFilteredProducts] = useState(products);

//   // Load cart from localStorage if any
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//   }, []);

//   // Function to handle adding product to cart
//   const addToCart = (product) => {
//     const updatedCart = [...cart, product];
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save cart in localStorage
//     alert(`${product.name} has been added to the cart!`);
//   };

//   // Function to handle filtering products
//   const filterProducts = () => {
//     const lowercasedSearchQuery = searchQuery.toLowerCase();
//     const filtered = products.filter((product) => {
//       const price = parseInt(product.price.replace('$', '').replace(',', ''));
//       const isWithinPriceRange = price >= minPrice && price <= maxPrice;
//       const matchesSearchQuery = product.name.toLowerCase().includes(lowercasedSearchQuery);

//       return isWithinPriceRange && matchesSearchQuery;
//     });
//     setFilteredProducts(filtered);
//   };

//   // UseEffect to trigger filtering whenever searchQuery or price filter changes
//   useEffect(() => {
//     filterProducts();
//   }, [searchQuery, minPrice, maxPrice]);

//   return (
//     <div className="shop-container">
//       <NavBar />
//       <h2 className="shop-heading">Our Electronics Products</h2>

//       {/* Search bar */}
//       <div className="search-filter-container">
//         <input
//           type="text"
//           placeholder="Search Products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="search-bar"
//         />
        
//         <div className="price-filter">
//           <label>Price Range: </label>
//           <input
//             type="number"
//             placeholder="Min Price"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             className="price-input"
//           />
//           <input
//             type="number"
//             placeholder="Max Price"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             className="price-input"
//           />
//         </div>
//       </div>

//       {/* Display "No products found" message if no products match the filters */}
//       {filteredProducts.length === 0 ? (
//         <p className="no-products-message">Sorry, no products match your search criteria.</p>
//       ) : (
//         <div className="product-grid">
//           {filteredProducts.map((product) => (
//             <div key={product.id} className="product-card">
//               <img src={product.image} alt={product.name} className="product-image" />
//               <h3 className="product-name">{product.name}</h3>
//               <p className="product-price">{product.price}</p>
//               <p className="product-description">{product.description}</p>
//               <NavLink to={`/product/${product.id}`} className="product-link">
//                 <button className="view-details-btn">View Details</button>
//               </NavLink>
//               <button
//                 className="view-details-btn1"
//                 onClick={() => addToCart(product)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default Electronics;



import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

import NavBar from '../Navbar/Navbar';
import Footer from "../Footer/Footer";

import "./Electronics.css";

// Images
import charger1 from "../charger1.jpg";
import charger2 from "../charger2.jpg";
import charger3 from "../charger3.jpg";
import charger4 from "../charger4.jpg";
import charger5 from "../charger5.jpg";
import charger6 from "../charger6.jpg";
import charger7 from "../charger7.jpg";
import charger8 from "../charger8.jpg";
import charger9 from "../charger9.jpg";
import charger10 from "../charger10.jpg";
import charger11 from "../charger11.jpg";
import charger12 from "../charger12.jpg";
import charger13 from "../charger13.jpg";
import charger14 from "../charger14.jpg";
import Marvv96 from '../marvv96.mp4';
import Laptop from '../Laptop.jfif';

// Products
const products = [
  { id: 1, name: "Dell 180W Charger", image: charger1, price: "$499", description: "100% original quality" },
  { id: 2, name: "Dell Type-C 90W", image: charger2, price: "$799", description: "Fast charging support" },
  { id: 3, name: "HP Blue Pin 120W", image: charger3, price: "$150", description: "High durability" },
  { id: 4, name: "Lenovo USB 90W", image: charger4, price: "$249", description: "Stable power output" },
  { id: 5, name: "Lenovo USB 65W", image: charger5, price: "$199", description: "Compact design" },
  { id: 6, name: "Dell 65W Small Pin", image: charger6, price: "$349", description: "Original adapter" },
  { id: 7, name: "Dell Type-C 65W", image: charger7, price: "$1299", description: "Premium build" },
  { id: 8, name: "Power Cable", image: charger8, price: "$399", description: "Durable cable" },
  { id: 9, name: "Dell 65W Big Pin", image: charger9, price: "$120", description: "Budget friendly" },
  { id: 10, name: "HP Blue 65W", image: charger10, price: "$299", description: "Efficient charging" },
  { id: 11, name: "HP Blue Pin 150W", image: charger11, price: "$499", description: "High power output" },
  { id: 12, name: "Dell 240W Big Pin", image: charger12, price: "$799", description: "Gaming laptops support" },
  { id: 13, name: "Lenovo Type-C 65W", image: charger13, price: "$150", description: "Lightweight adapter" },
  { id: 14, name: "HP Type-C 65W", image: charger14, price: "$249", description: "Universal support" },
];

const Electronics = () => {

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [filtered, setFiltered] = useState(products);

  // Load cart
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  // Add to cart
  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    alert(`${product.name} added to cart`);
  };

  // Filter logic
  useEffect(() => {
    const result = products.filter((p) => {
      const price = parseInt(p.price.replace('$', '')) || 0;

      return (
        price >= minPrice &&
        price <= maxPrice &&
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFiltered(result);
  }, [search, minPrice, maxPrice]);

  return (
    <div className="electronics-page">

      {/* NAVBAR */}
      <NavBar />

      {/* HEADER */}
      <div className="electronics-header">
        <section className="laptop-hero">
        
          {/* 🔥 BACKGROUND VIDEO */}
          <video className="fullscreen-video" autoPlay loop muted>
            <source src={Marvv96} type="video/mp4" />
          </video>
        
          {/* DARK OVERLAY */}
          <div className="laptop-overlay-bg"></div>
        
          <div className="laptop-overlay">
        
            {/* LEFT CONTENT */}
            <div className="laptop-left">
        
              <span className="laptop-tag">
                NISS Reused & Modified Laptops
              </span>
        
              <h1>
                Buy Premium
                <span> Reused Laptops</span>
                At Best Price
              </h1>
        
              <p>
                NISS provides high-quality refurbished and modified
                laptops for students, office work, gaming, programming,
                designing and professional use with warranty support
                and affordable pricing.
              </p>
        
              {/* SEARCH BOX */}
              <div className="laptop-search-box">
        
                <select>
                  <option>Gaming Laptop</option>
                  <option>Student Laptop</option>
                  <option>Programming Laptop</option>
                  <option>Office Work Laptop</option>
                  <option>Graphic Design Laptop</option>
                  <option>Video Editing Laptop</option>
                  <option>Business Laptop</option>
                  <option>i5 Laptop</option>
                  <option>i7 Laptop</option>
                  <option>SSD Laptop</option>
                  <option>Touchscreen Laptop</option>
                  <option>Budget Laptop</option>
                </select>
        
                <input
                  type="text"
                  placeholder="Search Reused Laptops..."
                />
        
                <button>Search</button>
        
              </div>
        
              {/* BUTTONS */}
              <div className="laptop-buttons">
        
                <button className="laptop-btn-primary">
                  Buy Laptop
                </button>
        
                <button className="laptop-btn-secondary">
                  Explore Deals
                </button>
        
              </div>
        
            </div>
        
            {/* RIGHT SIDE */}
            <div className="laptop-right">
        
              <div className="laptop-card">
                <img src={Laptop} alt="Reused Laptop" />
              </div>
        
              <div className="laptop-small-cards">
        
                <div className="laptop-small-card">
                  <h3>500+</h3>
                  <p>Laptops Sold</p>
                </div>
        
                <div className="laptop-small-card">
                  <h3>1 Year</h3>
                  <p>Warranty Support</p>
                </div>
        
              </div>
        
            </div>
        
          </div>
        
        </section>
        
        <h1>Electronics Store</h1>
        <p>Best Quality Laptop Chargers & Accessories</p>
      </div>

      {/* FILTER SECTION */}
      <div className="filter-bar">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

      </div>

      {/* PRODUCTS */}
      <div className="product-grid">

        {filtered.length === 0 ? (
          <p className="no-data">No products found</p>
        ) : (
          filtered.map((product) => (
            <div key={product.id} className="product-card">

              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <p className="price">{product.price}</p>

              <p className="desc">{product.description}</p>

              <div className="buttons">

                <NavLink to={`/product/${product.id}`}>
                  <button className="view-btn">
                    View Details
                  </button>
                </NavLink>

                <button
                  className="cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

              </div>

            </div>
          ))
        )}

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default Electronics;