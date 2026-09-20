import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./BookingPage.css";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(data);
  }, []);

  const clearBookings = () => {
    localStorage.removeItem("bookings");
    setBookings([]);
    alert("All bookings cleared!");
  };

  return (
    <div className="bookings-page">

      <NavBar />

      <div className="bookings-header">
        <h1>Tailor Bookings 📋</h1>
        <button onClick={clearBookings} className="clear-btn">
          Clear All
        </button>
      </div>

      {bookings.length === 0 ? (
        <h2 className="empty">No Bookings Found</h2>
      ) : (
        <div className="bookings-grid">

          {bookings.map((item, index) => (
            <div className="booking-card" key={index}>

              <h3>{item.name}</h3>

              <p><b>Phone:</b> {item.phone}</p>
              <p><b>Chest:</b> {item.chest}</p>
              <p><b>Waist:</b> {item.waist}</p>
              <p><b>Shoulder:</b> {item.shoulder}</p>

              <p><b>Pickup:</b> {item.pickup}</p>
              <p><b>Delivery:</b> {item.delivery}</p>

              <p className="time">
                {item.time}
              </p>

            </div>
          ))}

        </div>
      )}

      <Footer />

    </div>
  );
};

export default BookingsPage;