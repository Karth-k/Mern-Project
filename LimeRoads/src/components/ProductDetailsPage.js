import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Swal from "sweetalert2";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [ratingValue, setRatingValue] = useState(2);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const productData = response.data;
        setProduct(productData);
  
        const similarResponse = await axios.get("http://localhost:5000/api/products");
  
        const filteredProducts = similarResponse.data.filter(item =>
          item.category.type === productData.category.type &&
          item.category.gender === productData.category.gender &&
          item._id.toString() !== productData._id.toString()
        );
  
        setSimilarProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };  
  
    fetchProduct();
  }, [id]);
  const handleAddToCart = () => {
    if (!product) return;
    if(!selectedSize){
      Swal.fire({
        title: "Size Required!",
        text: "Please select a size before adding to cart.",
        icon: "warning",
      });
      return;
    }

    const cartItem = {
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1, 
      selectedSize
    };
  dispatch(addToCart(cartItem));
};

  if (!product) {
    return <p>Loading product details...</p>;
  }
  if (!product) return <div>Loading...</div>;
  return (
    <div className="container mt-4">
      <div className="d-flex">
        <div className="image-section" style={{ flex: 1, padding: "20px", backgroundColor: "white", borderRadius: "8px" }}>
          <img src={product.image[0]} alt={product.title} style={{ width: "300px", height: "400px", objectFit: "fill", display: "block", margin: "0 auto" }} />
          <div className="similar-products mt-4">
            <h4>Similar Products</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "10px" }}>
              {similarProducts.map(similarProduct => (
                <div key={similarProduct._id} style={{ border: "1px solid #ccc", backgroundColor: "white", padding: "10px", borderRadius: "5px", textAlign: "center", cursor: "pointer" }}>
                  <Link to={`/product/${similarProduct._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <img src={similarProduct.image[0]} alt={similarProduct.title} style={{ width: "100%", height: "120px", objectFit: "contain", marginBottom: "10px" }} />
                    <p style={{ fontWeight: "bold" }}>{similarProduct.title}</p>
                    <p>
                      <span style={{ color: "green", fontWeight: "bold" }}>₹{similarProduct.price}</span>{" "}
                      <span style={{ textDecoration: "line-through" }}>₹{similarProduct.before_disc}</span>
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="details-section" style={{ flex: 1, padding: "20px", backgroundColor: "white", borderRadius: "8px", marginLeft: "20px", marginBottom: "20px" }}>
          <h2>{product.title}</h2>
          <p><strong>Brand: {product.brand}</strong></p>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Rating
              name="hover-feedback"
              value={ratingValue}
              precision={0.5}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : ratingValue]}</Box>
          </Box>
          <div> 
            <p><strong>Gender:</strong> {product.category.gender}</p> 
            <p><strong>Type:</strong> {product.category.type}</p> 
            <p><strong>Model:</strong> {product.category.model}</p> 
            </div> 

              <div style={{ margin: "10px 0" }}> 
                      <p style={{ marginBottom: "5px" }}>Select Size:</p> 
                      {product.size.map(size => ( <button  key={size}  onClick={() => setSelectedSize(size)}  
                      style={{  margin: "5px",  padding: "10px 15px",  border: "1px solid #ccc",  borderRadius: "4px",  cursor: "pointer", backgroundColor: selectedSize === size ? "#28a745" : "#fff", color: selectedSize === size ? "#fff" : "#000"  }}> 
                      {size} </button> ))} 
                </div>
          <p><strong>Price:</strong> 
              <span style={{ color: "green" }}>₹{product.price}</span></p>
          <p><span style={{ color: "green", fontWeight: "bold" }}>{product.offer_percent}% OFF</span></p>
          <p><strong>Before Discount:</strong> <span style={{ textDecoration: "line-through" }}>₹{product.before_disc}</span></p>
          <button 
            onClick={handleAddToCart} 
              style={{  marginRight: "10px",  padding: "10px 20px",  backgroundColor: "#28a745",  color: "#fff",  border: "none",  borderRadius: "4px", cursor: "pointer" }}>
              ADD TO CART
            </button>
          <button onClick={() => navigate("/Profile")} style={{ padding: "10px 20px", backgroundColor: "#fff", color: "#28a745", border: "1px solid #28a745", borderRadius: "4px", cursor: "pointer" }}>
            <FaRegHeart />
          </button>
          <h4>Size Chart</h4>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "10px" }}>
            <thead>
              <tr>
                <th>Standard Size</th>
                <th>XS</th>
                <th>S</th>
                <th>M</th>
                <th>L</th>
                <th>XL</th>
                <th>XXL</th>
                <th>XXXL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Waist</td>
                <td>28</td>
                <td>30</td>
                <td>32</td>
                <td>34</td>
                <td>36</td> 
                <td>38</td>
                <td>40</td>
              </tr>
              <tr>
                  <td>Chest</td>
                  <td>34</td>
                  <td>36</td>
                  <td>38</td>
                  <td>40</td>
                  <td>42</td>
                  <td>44</td>
                  <td>46</td>
                </tr>
                <tr>
                  <td>Hip</td>
                  <td>36</td>
                  <td>38</td>
                  <td>40</td>
                  <td>42</td>
                  <td>44</td>
                  <td>46</td>
                  <td>48</td>
                </tr>
            </tbody>
          </table>
          <h4>Delivery & Return</h4>
            <p>Expected delivery time: 3-5 working days.</p>
            <p>Easy returns within 15 days of delivery.</p><br />
            <div> 
            <p><strong>Gender:</strong> {product.category.gender}</p> 
            <p><strong>Type:</strong> {product.category.type}</p> 
            <p><strong>Model:</strong> {product.category.model}</p> 
            </div> 
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;













    // Store in local storage
    // const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // localStorage.setItem("cart", JSON.stringify([...storedCart, cartItem]));
// useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/products/${id}`);
  //       // const productData = response.data.find(item => item.id === parseInt(id));
  //       setProduct(response.data);

  //       const similarResponse = await axios.get("http://localhost:5000/api/products");
  //       const filteredProducts = similarResponse.data.filter(item =>
  //         item.category.type === product.category.type &&
  //         item.category.gender === product.category.gender &&
  //         item._id.toString() !== product._id.toString()
  //     );
  //       setSimilarProducts(filteredProducts);
  //     } catch (error) {
  //       console.error("Error fetching product:", error);  
  //     } 
  //   };
  //   fetchProduct();
  // }, [id]);
