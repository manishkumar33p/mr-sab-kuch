import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const BuyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBuy = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all details");
      return;
    }

    alert(`Order placed for ${product.name}`);
    navigate("/");
  };

  if (!product) {
    return <h2>No Product Selected</h2>;
  }

  return (
    <div>
      <NavBar />

      <div className="buy-container">
        <div className="buy-product">
          <img src={product.image} alt="" />
          <h2>{product.name}</h2>
          <p>₹ {product.price}</p>
        </div>

        <div className="buy-form">
          <h2>Enter Details</h2>

          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />

          <button onClick={handleBuy}>Buy Now</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuyPage;