import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import "../Styles/SubCategory.css";
import { FaHeart, FaWhatsapp } from "react-icons/fa";
import Sidebar from "./Sidebar";

const SubCategoryPage = () => {
  const { gender, type } = useParams(); 
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const filteredProducts = response.data.filter(
          (product) => product.category.gender.toLowerCase() === gender.toLowerCase() &&  product.category.type.toLowerCase() === type.toLowerCase());
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } };
   fetchProducts();
  }, [gender, type]); 

  return (
    <div className="subcategory-container">
      <div className="row" style={{ justifyContent: "space-around" }}>
        <div className="col-md-3">
          <Sidebar />
        </div>

        <div className="col-md-9">
          <h1 className="subcategory-title text-center my-4">
            {`${gender} - ${type}`}
          </h1>
          <div className="subcategory-product-list">
            {products.length > 0 ? (
              products.map((product) => (
                <div  className="subcategory-card" key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
                  <img  src={product.image[0]}  className="subcategory-card-img-top" alt={product.title}/>
                  <div className="subcategory-card-body">
                    <h5 className="subcategory-card-title">{product.title}</h5>
                    <p className="subcategory-card-text text-muted">By{product.brand}</p>
                    <div className="subcategory-price-section">
                      <span className="text-success fw-bold">₹{product.price}</span>{" "}
                      <span className="text-muted text-decoration-line-through">₹{product.before_disc}</span>{" "}
                      <span className="text-danger">{product.offer_percent}% off</span>
                    </div>
                    <div className="d-flex justify-content-center gap-3">
                      <FaHeart  className="subcategory-heart-icon text-danger"  style={{ cursor: "pointer" }}  onClick={(e) => {  e.stopPropagation();   alert(`Liked ${product.title}`);}}/>
                      <a href={`https://wa.me/?text=Check out this product: ${product.title} for ₹${product.price}`}  target="_blank"  rel="noopener noreferrer" >
                        <FaWhatsapp className="subcategory-whatsapp-icon text-success"/>
                      </a>
                    </div>
                  </div>
                </div>
              ))) :( <p className="text-center">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryPage;
