import React from 'react';
import './Loading.css'; // Import your CSS file

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-icon">
        {/* Add your hobby icons or animations here */}
        {/* For example, you can use Font Awesome icons or CSS animations */}
        <i className="fas fa-bicycle"></i>
        <i className="fas fa-paint-brush"></i>
        <i className="fas fa-music"></i>
        {/* Add more icons or animations as needed */}
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingScreen;
