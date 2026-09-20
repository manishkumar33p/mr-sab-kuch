import React, { useState , useEffect} from 'react';
import NavBar from '../Navbar/Navbar';
import "../ProductDetails/ProductDetails.css";

import { useParams } from 'react-router-dom';
import marv13 from "../marv13.jpg"
import marv14 from "../marv14.jpg"
import marv15 from "../marv15.jpg"
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
// Sample products
const products = [

  
  // The same data as before
  {
    id: 1,
    name: "Interior design",
    image: marv13,
    price: "$499",
    description: "A stylish modern sofa for your living room.",
  },
  {
    id: 2,
    name: "Wall Panel",
    image: marv14,
    price: "$799",
    description: "A beautiful wooden dining table set for 6.",
  },
  {
    id: 3,
    name: "Wooden Flooring",
    image: marv15, // All products will use this image
    price: "$150",
    description: "Ergonomic office chair with adjustable height.",
  },
  {
    id: 4,
    name: "Printed Wallpaper",
    image: marv16, // All products will use this image
    price: "$249",
    description: "Spacious bookshelf for your books and decor.",
  },
  {
    id: 5,
    name: "False Ceiling Service",
    image: marv17, // All products will use this image
    price: "$199",
    description: "Sleek coffee table with glass top and wooden base.",
  },
  {
    id: 6,
    name: "PVC Ceiling Panels",
    image: marv18, // All products will use this image
    price: "$349",
    description: "Comfortable recliner chair for your living room.",
  },
  {
    id: 7,
    name: "Vinyl Flooring Service",
    image: marv19, // All products will use this image
    price: "$1299",
    description: "Luxury king-size bed frame for a restful sleep.",
  },
  {
    id: 8,
    name: "PVC Wallpaper",
    image: marv20, // All products will use this image
    price: "$399",
    description: "Multifunctional storage cabinet for organization.",
  },
  {
    id: 9,
    name: "Design Blinds",
    image: marv21,  // All products will use this image
    price: "$120",
    description: "Comfortable dining chair with cushion seat.",
  },
  {
    id: 10,
    name: "Bedroom Interior Design",
    image: marv22, // All products will use this image
    price: "$299",
    description: "Sleek TV stand for your entertainment space.",
  },
  {
    id: 11,
    name: "Flooring",
    image: marv23, // All products will use this image
    price: "$499",
    description: "A stylish modern sofa for your living room.",
  },
  {
    id: 12,
    name: "Artificial Turf",
    image: marv24, // All products will use this image
    price: "$799",
    description: "A beautiful wooden dining table set for 6.",
  },
  {
    id: 13,
    name: "Floor Tiles",
    image: marv25, // All products will use this image
    price: "$150",
    description: "Ergonomic office chair with adjustable height.",
  },
  {
    id: 14,
    name: "Roller Vertical Blinds",
    image: marv26, // All products will use this image
    price: "$249",
    description: "Spacious bookshelf for your books and decor.",
  },
  {
    id: 15,
    name: "Royal luxury Emulsion",
    image: marv27, // All products will use this image
    price: "$199",
    description: "Sleek coffee table with glass top and wooden base.",
  },
  {
    id: 16,
    name: "Wall Painting Service",
    image: marv28, // All products will use this image
    price: "$349",
    description: "Comfortable recliner chair for your living room.",
  },
  {
    id: 17,
    name: "PVC Marble Sheet Products",
    image: marv29, // All products will use this image
    price: "$1299",
    description: "Luxury king-size bed frame for a restful sleep.",
  },
  {
    id: 18,
    name: "Grid Ceiling Tiles",
    image: marv30, // All products will use this image
    price: "$399",
    description: "Multifunctional storage cabinet for organization.",
  },
  {
    id: 19,
    name: "PVC False Ceiling Panels",
    image: marv31, // All products will use this image
    price: "$120",
    description: "Comfortable dining chair with cushion seat.",
  },
  {
    id: 20,
    name: "Wooden Small Temple",
    image: marv32, // All products will use this image
    price: "$299",
    description: "Sleek TV stand for your entertainment space.",
  },
  // Include all the other products here...
];

const ProductDetail = () => {
  const { id } = useParams();
    const [cart, setCart] = useState([]);
  
    // Load cart from localStorage if any
    useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
    }, []);
  const product = products.find((prod) => prod.id === parseInt(id));

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save cart in localStorage
    alert(`${product.name} has been added to the cart!`);
  };

  return (
    <div className="product-detail-container">
     <NavBar />
     <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} className="product-detail-image" />
      <p>{product.description}</p>
      <p className="product-detail-price">{product.price}</p>
      <button 
              className="view-details-btn1" 
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
      </div>
  
    </div>
    
  );
};

export default ProductDetail;
