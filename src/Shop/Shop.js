import React, { useState , useEffect} from 'react'; 
import { NavLink } from "react-router-dom";

import "../Electronics/Electronics"
import "../Shop/Shop.css";

import Plumber2 from '../Plumber2.avif';
import Laptop from '../Laptop.jfif';
import Software from '../Software.jfif';
import MarvVideo2 from '../marvv3.mp4';
import Marvv99 from '../marvv99.mp4';

import Marvv96 from '../marvv96.mp4';
import NavBar from '../Navbar/Navbar';

import marv9 from "../marv9.png";
import Footer from "../Footer/Footer";
import marv13 from "../marv13.jpg"
import marv14 from "../marv14.jpg"
import marv16 from "../marv16.jpg"
import marv17 from "../marv17.jpg"
import marv18 from "../marv18.jpg"
import marv19 from "../marv19.jpg"
import marv20 from "../marv20.jpg"
import marv21 from "../marv21.jpg"
import marv22 from "../marv22.jpg"
import marv23 from "../marv23.jpg"
import marv24 from "../marv24.jpg"
import marv25 from "../marv25.jpg"
import marv26 from "../marv26.jpg"
import marv27 from "../marv27.jpg"
import marv28 from "../marv28.jpg"
import marv29 from "../marv29.jpg"
import marv30 from "../marv30.jpg"
import marv31 from "../marv31.jpg"
import marv32 from "../marv32.jpg"

// other image imports...

// Sample product data
const products = [
  { id: 1, name: "Interior Design", image: marv13, price: "499", description: "A stylish modern sofa for your living room." },
  { id: 2, name: "Wall Panel", image: marv14, price: "799", description: "A beautiful wooden dining table set for 6." },
  { id: 3, name: "Wooden Flooring", image: marv9, price: "150", description: "Ergonomic office chair with adjustable height." },
    {
    id: 4,
    name: "Printed Wallpaper",
    image: marv16, // All products will use this image
    price: "249",
    description: "Spacious bookshelf for your books and decor.",
  },
  {
    id: 5,
    name: "False Ceiling Service",
    image: marv17, // All products will use this image
    price: "199",
    description: "Sleek coffee table with glass top and wooden base.",
  },
  {
    id: 6,
    name: "PVC Ceiling Panels",
    image: marv18, // All products will use this image
    price: "349",
    description: "Comfortable recliner chair for your living room.",
  },
  {
    id: 7,
    name: "Vinyl Flooring Service",
    image: marv19, // All products will use this image
    price: "1299",
    description: "Luxury king-size bed frame for a restful sleep.",
  },
  {
    id: 8,
    name: "PVC Wallpaper",
    image: marv20, // All products will use this image
    price: "399",
    description: "Multifunctional storage cabinet for organization.",
  },
  {
    id: 9,
    name: "Design Blinds",
    image: marv21,  // All products will use this image
    price: "120",
    description: "Comfortable dining chair with cushion seat.",
  },
  {
    id: 10,
    name: "Bedroom Interior Design",
    image: marv22, // All products will use this image
    price: "299",
    description: "Sleek TV stand for your entertainment space.",
  },
  {
    id: 11,
    name: "Flooring",
    image: marv23, // All products will use this image
    price: "499",
    description: "A stylish modern sofa for your living room.",
  },
  {
    id: 12,
    name: "Artificial Turf",
    image: marv24, // All products will use this image
    price: "799",
    description: "A beautiful wooden dining table set for 6.",
  },
  {
    id: 13,
    name: "Floor Tiles",
    image: marv25, // All products will use this image
    price: "150",
    description: "Ergonomic office chair with adjustable height.",
  },
  {
    id: 14,
    name: "Roller Vertical Blinds",
    image: marv26, // All products will use this image
    price: "249",
    description: "Spacious bookshelf for your books and decor.",
  },
  {
    id: 15,
    name: "Royal luxury Emulsion",
    image: marv27, // All products will use this image
    price: "199",
    description: "Sleek coffee table with glass top and wooden base.",
  },
  {
    id: 16,
    name: "Wall Painting Service",
    image: marv28, // All products will use this image
    price: "349",
    description: "Comfortable recliner chair for your living room.",
  },
  {
    id: 17,
    name: "PVC Marble Sheet Products",
    image: marv29, // All products will use this image
    price: "1299",
    description: "Luxury king-size bed frame for a restful sleep.",
  },
  {
    id: 18,
    name: "Grid Ceiling Tiles",
    image: marv30, // All products will use this image
    price: "399",
    description: "Multifunctional storage cabinet for organization.",
  },
  {
    id: 19,
    name: "PVC False Ceiling Panels",
    image: marv31, // All products will use this image
    price: "120",
    description: "Comfortable dining chair with cushion seat.",
  },
  {
    id: 20,
    name: "Wooden Small Temple",
    image: marv32, // All products will use this image
    price: "299",
    description: "Sleek TV stand for your entertainment space.",
  },
  // Add other products...
];

const Shop = () => {
  const [cart, setCart] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState(products);

  // Load cart from localStorage if any
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // const handleFilterChange = (type, value) => {
  //   let updatedProducts = products;

  //   if (type === "category" && value) {
  //     updatedProducts = updatedProducts.filter(product => product.category === value);
  //   }

  //   if (type === "price" && value) {
  //     const [min, max] = value.split("-").map(num => parseInt(num));
  //     updatedProducts = updatedProducts.filter(product => {
  //       const productPrice = parseInt(product.price.replace('$', ''));
  //       return productPrice >= min && productPrice <= max;
  //     });
  //   }

  //   setFilteredProducts(updatedProducts);
  // };


  // Function to handle adding product to cart
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save cart in localStorage
    alert(`${product.name} has been added to the cart!`);
  };

  return (
    <div className="shop-container">
      <NavBar />

      {/* ================= HERO INTERIOR SECTION ================= */}

      <section className="interior-hero">

{/* 🔥 BACKGROUND VIDEO */}
<video className="fullscreen-video" autoPlay loop muted>
  <source src={Marvv99} type="video/mp4" />
</video>

{/* DARK OVERLAY */}
<div className="interior-overlay-bg"></div>

<div className="interior-overlay">

  <div className="interior-left">

    <span className="interior-tag">
      Premium Interior Solutions
    </span>

    <h1>
      Transform Your Home With
      <span> Modern Interior Design</span>
    </h1>

    <p>
      NISS provides luxury interior design, false ceiling,
      flooring, wallpaper, blinds, painting and complete
      home decoration services at affordable pricing.
    </p>

    {/* SEARCH BOX */}
    <div className="interior-search-box">

      <select>
        <option>Interior Design</option>
        <option>Wall Panel</option>
        <option>Wooden Flooring</option>
        <option>Printed Wallpaper</option>
        <option>False Ceiling Service</option>
        <option>PVC Ceiling Panels</option>
        <option>Vinyl Flooring Service</option>
        <option>PVC Wallpaper</option>
        <option>Design Blinds</option>
        <option>Bedroom Interior Design</option>
        <option>Flooring</option>
        <option>Artificial Turf</option>
        <option>Floor Tiles</option>
        <option>Roller Vertical Blinds</option>
        <option>Royal Luxury Emulsion</option>
        <option>Wall Painting Service</option>
        <option>PVC Marble Sheet Products</option>
        <option>Grid Ceiling Tiles</option>
        <option>PVC False Ceiling Panels</option>
        <option>Wooden Small Temple</option>
      </select>

      <input
        type="text"
        placeholder="Search Interior Services..."
      />

      <button>Search</button>

    </div>
    {/* BUTTONS */}
<div className="interior-buttons">

<button className="interior-btn-primary">
  Get Started
</button>

<button className="interior-btn-secondary">
  View Projects
</button>

</div>

  </div>

  {/* RIGHT SIDE IMAGES */}
  <div className="interior-right">

    <div className="interior-grid">
      <img src={marv13} alt="" />
      <img src={marv14} alt="" />
      <img src={marv22} alt="" />
      <img src={marv31} alt="" />
    </div>

  </div>
  
</div>

</section>

{/* ================= REUSED LAPTOP HERO SECTION ================= */}

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



{/* ================= SOFTWARE HERO SECTION ================= */}
<div >
<section className="software-hero">

  {/* 🔥 BACKGROUND VIDEO */}
  <video className="fullscreen-video" autoPlay loop muted>
    <source src={MarvVideo2} type="video/mp4" />
  </video>

  {/* DARK OVERLAY */}
  <div className="software-overlay-bg"></div>

  <div className="software-overlay">

    {/* LEFT CONTENT */}
    <div className="software-left">

      <span className="software-tag">
        NISS Software Solutions
      </span>

      <h1>
        Build Smart Digital Products
        With <span>NISS Software</span>
      </h1>

      <p>
        We create websites, mobile apps, CRM systems,
        business software, dashboards, e-commerce platforms,
        and custom digital solutions for startups and companies.
      </p>

      {/* SEARCH BOX */}
      <div className="software-search-box">

        <select>
          <option>Website Development</option>
          <option>Mobile App</option>
          <option>CRM Software</option>
          <option>E-Commerce</option>
          <option>UI/UX Design</option>
        </select>

        <input
          type="text"
          placeholder="Search Software Services..."
        />

        <button><NavLink to="/packages" className="image-link">
  <h4>Explore Packages</h4>
</NavLink></button>

      </div>

      {/* BUTTONS */}
      <div className="software-buttons">

        <button className="software-btn-primary">
          Get Started
        </button>

        <button className="software-btn-secondary">
          View Projects
        </button>

      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="software-right">

      <div className="software-card">
        <img src={Software} alt="Software Service" />
      </div>

      <div className="software-small-cards">

        <div className="small-card">
          <h3>100+</h3>
          <p>Projects Completed</p>
        </div>

        <div className="small-card">
          <h3>50+</h3>
          <p>Happy Clients</p>
        </div>

      </div>

    </div>

  </div>

</section></div>




<section className="plumbing-hero">

  {/* 🔥 BACKGROUND VIDEO */}
  <video className="fullscreen-video" autoPlay loop muted>
    <source src={MarvVideo2} type="video/mp4" />
  </video>

  {/* DARK OVERLAY (for readability) */}
  <div className="plumbing-overlay-bg"></div>

  {/* CONTENT */}
  <div className="plumbing-overlay">

    {/* LEFT CONTENT */}
    <div className="plumbing-left">

      <span className="plumbing-tag">
        NISS Plumbing Services
      </span>

      <h1>
        Fast & Reliable
        <span> Plumbing Solutions</span>
      </h1>

      <p>
        NISS provides expert plumbing services including
        pipe fitting, bathroom installation, leakage repair,
        tap fitting, water tank cleaning, drain repair,
        geyser installation and complete home plumbing solutions.
      </p>

      {/* SEARCH BOX */}
      <div className="plumbing-search-box">

        <select>
          <option>Pipe Leakage Repair</option>
          <option>Bathroom Fitting</option>
          <option>Wash Basin Installation</option>
          <option>Kitchen Plumbing</option>
          <option>Drain Cleaning</option>
          <option>Water Tank Cleaning</option>
          <option>Tap & Mixer Repair</option>
          <option>Toilet Seat Installation</option>
          <option>Geyser Installation</option>
          <option>Water Motor Repair</option>
          <option>Shower Installation</option>
          <option>Pipeline Installation</option>
        </select>

        <input
          type="text"
          placeholder="Search Plumbing Services..."
        />

        <button>Book Service</button>

      </div>

      {/* BUTTONS */}
      <div className="plumbing-buttons">

        <button className="plumbing-btn-primary">
          Book Plumber
        </button>

        <button className="plumbing-btn-secondary">
          Emergency Service
        </button>

      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="plumbing-right">

      <div className="plumbing-card">
        <img src={Plumber2} alt="Plumbing Service" />
      </div>

      <div className="plumbing-small-cards">

        <div className="plumbing-small-card">
          <h3>24/7</h3>
          <p>Emergency Support</p>
        </div>

        <div className="plumbing-small-card">
          <h3>500+</h3>
          <p>Services Completed</p>
        </div>

      </div>

    </div>

  </div>

</section>



{/* ================= PLUMBING HERO SECTION ================= */}


      <h2 className="shop-heading">Our Products</h2>
      {/* <Sidebar onFilterChange={handleFilterChange} /> */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <p className="product-description">{product.description}</p>
            <NavLink to={`/product/${product.id}`} className="product-link">
              <button className="view-details-btn">View Details</button>
            </NavLink>
            <button 
              className="view-details-btn1" 
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
          
        ))}
      </div>
        <Footer />
    </div>
  );
};

export default Shop;

