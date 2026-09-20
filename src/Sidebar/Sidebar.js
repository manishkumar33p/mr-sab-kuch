import React from 'react';
import './Sidebar.css'; // Styling for the sidebar

const Sidebar = ({ onFilterChange }) => {
  const handleCategoryChange = (e) => {
    onFilterChange('category', e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    onFilterChange('price', e.target.value);
  };

  return (
    <div className="sidebar">
      <h3>Filters</h3>

      <div className="filter-category">
        <h4>Category</h4>
        <select onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="Interior Design">Interior Design</option>
          <option value="Flooring">Flooring</option>
          <option value="Wall Panel">Wall Panel</option>
          <option value="Ceiling Panels">Ceiling Panels</option>
          {/* Add other categories as needed */}
        </select>
      </div>

      <div className="filter-price">
        <h4>Price Range</h4>
        <select onChange={handlePriceRangeChange}>
          <option value="">All Prices</option>
          <option value="0-300">$0 - $300</option>
          <option value="300-600">$300 - $600</option>
          <option value="600-1000">$600 - $1000</option>
          <option value="1000-2000">$1000 - $2000</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
