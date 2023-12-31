import React from "react";
import "./Card.css"; // Import your CSS file

const Card = ({ image1, image2, title, secondTitle, description }) => {
  return (
    <div className="card">
      <table>
        <tr>
          <td>
            <h3 className="card-title">{title}</h3>
            <img src={image1} alt="Image 1" className="card-image" />
          </td>
          <td>
            <h3 className="card-title">{secondTitle}</h3>
            <img src={image2} alt="Image 2" className="card-image" />
          </td>
        </tr>
      </table>
      <div className="card-content">
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
