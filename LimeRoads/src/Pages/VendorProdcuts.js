import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/Vendorpr.css";

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("authToken"); 

  useEffect(() => {
    const fetchVendorProducts = async () => {
      try {
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/vendor-products", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Vendor Products:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching vendor products:", error);
      }
    };

    fetchVendorProducts();
  }, [token]);

  return (
    <div className="vendor-con">
      <div className="vendor-row">
        <div className="vendor-col">
          <h1 className="vendor-title">Your Added Products</h1>
          <div className="vendor-products-grid">
            {products.length === 0 ? (
              <p className="vendor-no-products">No products added yet.</p>
            ) : (
              products.map((product) => (
                <div className="vendor-card-wrapper" key={product._id}>
                  <Link to={`/product/${product._id}`} className="vendor-card-link">
                    <div className="vendor-card">
                      <img src={product.image[0]} className="vendor-card-img" alt={product.title} />
                      <div className="vendor-card-body">
                        <h5 className="vendor-card-title">{product.title}</h5>
                        <p className="vendor-card-brand">By {product.brand}</p>
                        <div className="vendor-price-section">
                          <span className="vendor-price">₹{product.price}</span>
                          <span className="vendor-before-price">₹{product.before_disc}</span>
                          <span className="vendor-discount"> {product.offer_percent}% off</span>
                        </div>
                        <div className="vendor-actions">
                          <FaHeart
                            className="vendor-icon-heart"
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Liked ${product.title}`);
                            }}
                          />
                          <FaWhatsapp className="vendor-icon-whatsapp" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProducts;
