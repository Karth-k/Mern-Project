import React, { useState } from "react";
import axios from "axios";
import "../Styles/Vendor.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Vendor = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    Swal.fire({
      title: "Logged Out!",
      text: "You have been logged out successfully.",
      icon: "success",
    }).then(() => {
      navigate("/Profile", { replace: true });
      window.location.reload();
    });
  };

  const productTypes = [
    "Shirts", "T-Shirts", "Jeans", "Suits", "Scandals", "Watch", "Kurtas",
    "Tops", "Sarees", "Bags", "Shoes", "Frocs", "SuitSet", "Ethnic",
  ];

  const modelTypes = [
    "clothing", "footwear", "accessories", "Casual Wear", "Ethnic Wear",
    "Party Wear", "Traditional Wear", "Accessories", "Shoes"
  ];

  const [formData, setFormData] = useState({
    image: "",
   image_1: "", 
    image_2: "", 
    brand_image: "",
    title: "",
    brand: "",
    price: "",
    before_disc: "",
    offer_percent: "",
    gender: "",
    type: "",
    model: "",
    size: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (e) => {
    setFormData({ ...formData, size: e.target.value.split(",") });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.value.split(",") });
  };

  const handleAdditionalImageChange = (e) => {
    setFormData({ ...formData, image_1: e.target.value.split(",") });
  };

  const handleExtraImageChange = (e) => {
    setFormData({ ...formData, image_2: e.target.value.split(",") });
  };

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      Swal.fire({
        title: "Unauthorized!",
        text: "You must be logged in to add a product.",
        icon: "error",
      });
      return;
    }

    const finalData = {
      image: formData.image,
      image_1:formData.image_1,
      image_2:formData.image_2,
      brand_image: formData.brand_image,
      title: formData.title,
      brand: formData.brand,
      price: Number(formData.price),
      before_disc: Number(formData.before_disc),
      offer_percent: Number(formData.offer_percent),
      category: {
        gender: formData.gender,
        type: formData.type,
        model: formData.model,
      },
      size: formData.size,
      quantity: Number(formData.quantity),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/addProduct",
        finalData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Product added successfully!",
        icon: "success",
      });

      console.log("Product added:", response.data);

      setFormData({
        image: "",
        image_1: "",
        image_2: "",
        brand_image: "",
        title: "",
        brand: "",
        price: "",
        before_disc: "",
        offer_percent: "",
        gender: "",
        type: "",
        model: "",
        size: "",
        quantity: "",
      });
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);

      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to add product",
        icon: "error",
      });
    }
  };

  return (
    <div className="vendor-container">
      <h2 className="vendor-title">Vendor Product Form</h2>
      <form onSubmit={handleSubmit} className="vendor-form">
        <input type="text" name="title" placeholder="Product Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="number" name="before_disc" placeholder="Original Price" value={formData.before_disc} onChange={handleChange} required />
        <input type="number" name="offer_percent" placeholder="Discount %" value={formData.offer_percent} onChange={handleChange} required />

        <div className="gender-selection">
          <label>Gender:</label>
          <label>
            <input type="radio" name="gender" value="Men" checked={formData.gender === "Men"} onChange={handleGenderChange} required /> Men
          </label>
          <label>
            <input type="radio" name="gender" value="Women" checked={formData.gender === "Women"} onChange={handleGenderChange} required /> Women
          </label>
          <label>
            <input type="radio" name="gender" value="Kids" checked={formData.gender === "Kids"} onChange={handleGenderChange} required /> Kids
          </label>
        </div>

        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          {productTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select name="model" value={formData.model} onChange={handleChange} required>
          <option value="">Select Model</option>
          {modelTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input type="text" name="image" placeholder="Main Image " value={formData.image} onChange={handleImageChange} required />
        <input type="text" name="image_1" placeholder="Additional Image " value={formData.image_1} onChange={handleAdditionalImageChange} required/>
        <input type="text" name="image_2" placeholder="Extra Image " value={formData.image_2} onChange={handleExtraImageChange} required/>
        <input type="text" name="brand_image" placeholder="Brand Image URL" value={formData.brand_image} onChange={handleChange} required />
        <input type="text" name="size" placeholder="Sizes (comma-separated: S,M,L,XL)" value={formData.size} onChange={handleSizeChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />

        <button type="submit">Add Product</button>
      </form>
      <button className="btn btn-danger" style={{ marginTop: "10px" }} onClick={handleLogout}> Logout</button>
      <Link to="/vendor-products"> <button className="btn btn-dark" style={{ marginTop: "10px" }}>View My Products</button></Link>
    </div>
  );
};

export default Vendor;
