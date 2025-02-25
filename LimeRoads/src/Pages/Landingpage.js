import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart, Whatsapp } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Landingpage = ({ gender, type }) => {
  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        const filteredProducts = response.data.filter((product) => {
          if (type === "My Feed") {
            return product.category.gender === gender && product.brand_image;
          }
          return (
            product.category.gender === gender &&
            (!type || product.category.type === type) &&
            product.brand_image
          );
        });
        setProducts(filteredProducts);
        const initialLikes = {};
        filteredProducts.forEach((product) => {
          initialLikes[product.id] = product.likes || 0;
        });
        setLikes(initialLikes);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [gender, type]);

  const handleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: prevLikes[id] + 1,
    }));
  };

  return (
    <div className="container text-center mt-4">
      <div className="row mt-4">
        {products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Link
              to={`/${product.category.gender}/${product.title}/${product.category.type}`}
              style={{ textDecoration: "none", color: "inherit" }} >
              <div
                className="card h-100"
                style={{  position: "relative", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                <img  src={product.brand_image}  className="card-img-top"  alt={product.title}  style={{ objectFit: "fill", height: "300px" }}  />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: "16px" }}>{product.title}</h5>
                </div>
                <div  className="d-flex justify-content-around align-items-center"  style={{ padding: "10px 15px", borderTop: "1px solid #ddd", backgroundColor: "#f9f9f9"}}>
                  <div className="d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleLike(product.id);
                    }}>
                    <Heart color="red" marginRight="5px" size={30} />
                    <span style={{ fontSize: "25px", paddingLeft: "5px" }}>{likes[product.id]}</span>
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <Whatsapp color="green" size={30}/>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landingpage;
