import React from "react";
import "../Styles/Sidebar.css";

const Sidebar = ({ products = [], onFilterChange }) => {
  const handlePriceFilter = (priceRange) => {
    const filteredProducts = products.filter((product) => {
      if (priceRange === "less500") return product.price < 500;
      if (priceRange === "500to2000") return product.price >= 500 && product.price <= 2000;
      if (priceRange === "more2000") return product.price > 2000;
      return true;
    });
    onFilterChange(filteredProducts);
  };

  const handleDiscountFilter = (discountRange) => {
    const filteredProducts = products.filter((product) => {
      if (discountRange === "more10") return product.offer_percent > 10;
      if (discountRange === "more20") return product.offer_percent > 20;
      if (discountRange === "more40") return product.offer_percent > 40;
      return true;
    });
    onFilterChange(filteredProducts);
  };

  return (
    <div className="sidebar">
      <h2>Filter & Sort</h2>
      <div className="filter-section">
        <p>Price</p>
        <label>
          <input type="radio" name="price" onChange={() => handlePriceFilter("less500")} /> Less than ₹500
        </label>
        <label>
          <input type="radio" name="price" onChange={() => handlePriceFilter("500to2000")} /> ₹500 - ₹2000
        </label>
        <label>
          <input type="radio" name="price" onChange={() => handlePriceFilter("more2000")} /> More than ₹2000
        </label>
      </div>

      <div className="filter-section">
        <p>Discounts</p>
        <label>
          <input type="radio" name="discount" onChange={() => handleDiscountFilter("more10")} /> More than 10%
        </label>
        <label>
          <input type="radio" name="discount" onChange={() => handleDiscountFilter("more20")} /> More than 20%
        </label>
        <label>
          <input type="radio" name="discount" onChange={() => handleDiscountFilter("more40")} /> More than 40%
        </label>
      </div>
    </div>
  );
};

export default Sidebar;