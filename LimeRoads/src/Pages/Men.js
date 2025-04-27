import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import "../Styles/Sidebar.css";
import Sidebar from "../components/Sidebar";

const Men = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const mensProducts = response.data.filter(
          (product) => product.category.gender === "Men"
        );
        setProducts(mensProducts);
        setFilteredProducts(mensProducts); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (filteredList) => {
    setFilteredProducts(filteredList);
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ justifyContent: "space-around" }}>
        <div className="col-lg-3 col-md-4 col-sm-12">
          <Sidebar products={products} onFilterChange={handleFilterChange} />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-12">
          <h1 className="men-title text-center my-4">Men's Products</h1>
          <div className="row" style={{ justifyContent: "space-around" }}>
            {filteredProducts.map((product) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={product._id}>
                <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="card h-100">
                    <img src={product.image[0]} className="card-img-top img-fluid" alt={product.title} />
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text text-muted">By {product.brand}</p>
                      <div className="price-section mb-3">
                        <span className="text-success fw-bold"> ₹{product.price}</span>{" "}
                        <span className="text-muted text-decoration-line-through">₹{product.before_disc}</span>{" "}
                        <span className="text-danger"> {product.offer_percent}% off</span>
                      </div>
                      <div className="d-flex justify-content-center gap-3">
                        <FaHeart className="text-danger" style={{ cursor: "pointer" }} onClick={(e) => { e.preventDefault(); alert(`Liked ${product.title}`); }} />
                        <FaWhatsapp className="text-success" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Men;
