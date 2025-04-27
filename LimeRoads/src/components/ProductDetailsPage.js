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
    const [ratingValue, setRatingValue] = useState(4);
    const [hover, setHover] = useState(-1);

    const [stock, setStock] = useState(0);

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/products/${id}`);
          const productData = response.data;
          console.log("Fetched Product Data:", productData);
          setProduct(productData);
          setStock(productData.Quantity);
    
          const similarResponse = await axios.get("http://localhost:5000/api/products");
    
          const filteredProducts = similarResponse.data.filter(item =>
            item.category?.type === productData.category?.type &&
            item.category?.gender === productData.category?.gender &&
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

      if (stock <= 0) {
        Swal.fire({
          title: "Out of Stock!",
          text: "This product is currently unavailable.",
          icon: "error",
        });
        return;
      }

      

      const cartItem = {
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1, 
        selectedSize,
        Quantity: product.Quantity
      };
    dispatch(addToCart(cartItem));
    setStock(stock - 1);
  };
  

  if (!product) {
    return <p>Loading product details...</p>;
  }
  
  if (!product.category) {
    return <p>Category details missing...</p>;  
  }
    return (
      <div className="container mt-4">
  <div className="row">
    <div className="col-lg-6 col-md-12 mb-4">
      <div className="image-section p-3 bg-white rounded">
        <img
          src={product.image[0]}
          alt={product.title}
          className="img-fluid d-block mx-auto"
          style={{ maxWidth: "100%", height: "auto", objectFit: "fill" }}
        />
        <div className="similar-products mt-4">
          <h4>Similar Products</h4>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {similarProducts.map((similarProduct) => (
              <div
                key={similarProduct._id}
                className="p-2 border bg-white rounded text-center"
                style={{ width: "30%", minWidth: "120px" }}
              >
                <Link
                  to={`/product/${similarProduct._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={similarProduct.image}
                    alt={similarProduct.title}
                    className="img-fluid"
                    style={{ height: "120px", objectFit: "contain", marginBottom: "10px" }}
                  />
                  <p className="fw-bold">{similarProduct.title}</p>
                  <p>
                    <span className="text-success fw-bold">₹{similarProduct.price}</span>{" "}
                    <span className="text-decoration-line-through">₹{similarProduct.before_disc}</span>
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-6 col-md-12">
      <div className="details-section p-3 bg-white rounded">
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
        <div className="my-2">
          <p className="mb-2">Select Size:</p>
          {product.size.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`btn btn-outline-secondary mx-1 ${selectedSize === size ? "btn-success text-white" : ""}`}
            >
              {size}
            </button>
          ))}
        </div>
        <p><strong>Price:</strong> <span className="text-success">₹{product.price}</span></p>
        <p><span className="text-success fw-bold">{product.offer_percent}% OFF</span></p>
        <p><strong>Before Discount:</strong> <span className="text-decoration-line-through">₹{product.before_disc}</span></p>
        <button
  onClick={handleAddToCart}
  className={`btn ${
    stock <= 0 ? "btn-secondary" : "btn-success"
  } me-2`}
  disabled={stock <= 0}
>
  {stock <= 0 ? "Out of Stock" : "ADD TO CART"}
</button>
        <button onClick={() => navigate("/Profile")} className="btn btn-outline-success">
          <FaRegHeart />
        </button>
        <h4 className="mt-3">Size Chart</h4>
<div className="table-responsive">
  <table className="table table-bordered text-center">
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
</div>
        <h4>Delivery & Return</h4>
        <p>Expected delivery time: 3-5 working days.</p>
        <p>Easy returns within 15 days of delivery.</p>
      </div>
    </div>
  </div>
</div>
    )
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
