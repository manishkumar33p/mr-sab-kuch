// import React from "react";
// import "./PropertyCard.css";
// import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

// const PropertyCard = ({ property }) => {
//   return (
//     <div className="property-card">

//       <div className="verified-badge">
//         Verified
//       </div>

//       <img
//         src={property.image}
//         alt={property.title}
//       />

//       <div className="card-content">

//         <h3>{property.title}</h3>

//         <p className="location">
//           📍 {property.city}
//         </p>

//         <p className="property-type">
//           {property.type}
//         </p>

//         <h2 className="price">
//           ₹ {property.price}
//         </h2>

//         <div className="button-group">

//           <a
//             href={`tel:${
//               property.contact ||
//               "9876543210"
//             }`}
//             className="call-btn"
//           >
//             <FaPhoneAlt />
//             Call
//           </a>

//           <a
//             href={`https://wa.me/91${
//               property.contact ||
//               "9876543210"
//             }`}
//             target="_blank"
//             rel="noreferrer"
//             className="whatsapp-btn"
//           >
//             <FaWhatsapp />
//             WhatsApp
//           </a>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyCard;






import React from "react";
import "./PropertyCard.css";
import {
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div
      className="property-card"
      onClick={() =>
        navigate("/property-detail", {
          state: property,
        })
      }
    >
      <div className="verified-badge">
        Verified
      </div>

      <img
        src={property.image}
        alt={property.title}
      />

      <div className="card-content">

        <h3>{property.title}</h3>

        <p className="location">
          📍 {property.city}
        </p>

        <p className="property-type">
          {property.type}
        </p>

        <h2 className="price">
          ₹ {property.price}
        </h2>

        <div className="button-group">

          <a
            href={`tel:${
              property.contact ||
              "9876543210"
            }`}
            className="call-btn"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <FaPhoneAlt />
            Call
          </a>

          <a
            href={`https://wa.me/91${
              property.contact ||
              "9876543210"
            }`}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <FaWhatsapp />
            WhatsApp
          </a>

        </div>
      </div>
    </div>
  );
};

export default PropertyCard;