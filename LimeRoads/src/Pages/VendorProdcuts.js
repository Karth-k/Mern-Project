import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    navigate("/Profile");
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={() => navigate("/Vendor")}>
          Back
        </button>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2 className="text-center my-4">Your Added Products</h2>

      <div className="container">
        <div className="row">
          {products.length === 0 ? (
            <p className="text-center text-muted">No products added yet.</p>
          ) : (
            products.map((product) => (
              <div className="col-12 mb-4" key={product._id}>
                <div className="p-3 bg-white rounded shadow-sm">
                 
                  <div className="row">
                    <div className="col-3">
                      <img src={product.image[0]} className="img-fluid w-100 rounded" alt="product_img" style={{ height: "300px", objectFit: "fill" }}/>
                    </div>
                    <div className="col-3">
                      <img src={product.image_1} className="img-fluid w-100 rounded" alt="product_img" style={{ height: "300px", objectFit: "fill" }} />
                    </div>
                    <div className="col-3">
                      <img src={product.image_2} className="img-fluid w-100 rounded" alt="product_img" style={{ height: "300px", objectFit: "fill" }} />
                    </div>
                    <div className="col-3">
                      <img src={product.brand_image} className="img-fluid w-100 rounded" alt="product_img" style={{ height: "300px", objectFit: "fill" }} />
                    </div>
                  </div>


                  <div className="text-center mt-2">
                    <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                      <h6>{product.title}</h6>
                      <p className="text-muted" style={{ fontSize: "14px" }}>By {product.brand}</p>
                      <p className="fw-bold text-success" style={{ fontSize: "14px" }}>
                        ₹{product.price} <span className="text-decoration-line-through text-muted">₹{product.before_disc}</span> 
                        <span className="text-danger ms-2">({product.offer_percent}% off)</span>
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProducts;
