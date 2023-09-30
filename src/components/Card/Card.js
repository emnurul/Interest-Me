import React from 'react';
import './Card.css'; // Import your CSS file

const Card = ({ image1, image2, title, description }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <table>
        <tr>
          <td>
          <img src={image1} alt="Image 1" className="card-image" />
          </td>
          <td>
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
