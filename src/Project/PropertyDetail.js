import React from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./PropertyDetail.css";

const PropertyDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const property = location.state;

  if (!property) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Property Not Found</h2>

        <button
          onClick={() =>
            navigate("/project")
          }
        >
          Back To Properties
        </button>
      </div>
    );
  }

  return (
    <div className="property-detail">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <img
        src={property.image}
        alt={property.title}
        className="detail-image"
      />

      <div className="detail-content">

        <div className="detail-header">

          <h1>{property.title}</h1>

          <span
            className={
              property.status ===
              "Occupied"
                ? "status occupied"
                : "status available"
            }
          >
            {property.status ||
              "Available"}
          </span>

        </div>

        <h2 className="detail-price">
          ₹ {property.price}
        </h2>

        <div className="detail-info">

          <p>
            <strong>City:</strong>{" "}
            {property.city}
          </p>

          <p>
            <strong>Area:</strong>{" "}
            {property.area || "N/A"}
          </p>

          <p>
            <strong>Type:</strong>{" "}
            {property.type}
          </p>

          <p>
            <strong>Contact:</strong>{" "}
            {property.contact}
          </p>

        </div>

        <div className="description-box">

          <h3>Description</h3>

          <p>
            {property.description ||
              "Premium property available at prime location with excellent connectivity and facilities."}
          </p>

        </div>

        <div className="action-buttons">

          <a
            href={`tel:${property.contact}`}
            className="call-btn"
          >
            📞 Call Now
          </a>

          <a
            href={`https://wa.me/91${property.contact}`}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            WhatsApp
          </a>

        </div>

      </div>

    </div>
  );
};

export default PropertyDetail;