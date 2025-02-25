import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RelatedProducts = () => {
  const { gender, model, type } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        const filteredProducts = response.data.filter((product) => {
          return (
            product.category.gender === gender && product.title === model &&(type === "all" || product.category.type === type)
          )});
        setProducts(filteredProducts);  })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [gender, model, type]);

  return (
    <div className="container text-center mt-4">
      <h2>Related Products</h2>
      <div className="row mt-4">
        {products.map((product) => (
          <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100"
              style={{
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", }} >
              <img src={product.brand_image} className="card-img-top"  alt={product.title} style={{ objectFit: "cover", height: "300px" }}/>
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "16px" }}>{product.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
