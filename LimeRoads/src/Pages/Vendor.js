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

  const productTypes = {
    Men: ["Shirts", "T-Shirts", "Jeans", "Suits", "Scandals", "Watch"],
    Women: ["Shirts","T-Shirts","Kurtas", "Tops", "Sarees","Bags","Shoes" ],
    Kids: [ "Frocs", "T-shirt ","SuitSet", "ethnic"]
  };

  const modelTypes = {
    Men: ["clothing", "footwear", "accessories"],
    Women: ["Casual Wear","clothing", "Ethnic Wear", "Party Wear", "Traditional Wear", "Accessories","Footwear"],
    Kids: ["Clothing"]
  };

  const [formData, setFormData] = useState({
    image: null,
   image_1: null, 
    image_2: null,
    brand_image: null,
    title: "",
    brand: "",
    price: "",
    before_disc: "",
    offer_percent: "",
    gender: "",
    type: "",
    model: "",
    size: [],
    Quantity:""
  });


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === "file") {
      setFormData({ ...formData, [name]: files.length > 0 ? files[0] : null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleBrandImageChange = (e) => {
    setFormData({ ...formData, brand_image: e.target.files[0] });
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSizeChange = (e) => {
    const sizesArray = e.target.value.split(",").map(size => size.trim());
    setFormData({ ...formData, size: sizesArray });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleAdditionalImageChange = (e) => {
    setFormData({ ...formData, image_1: e.target.files[0] });
  };

  const handleExtraImageChange = (e) => {
    setFormData({ ...formData, image_2: e.target.files[0] });
  };

  const handleGenderChange = (e) => {
    setFormData({
      ...formData, 
      gender: e.target.value, 
      type: "", 
      model: "" 
    });
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



const formDataToSend = new FormData();
formDataToSend.append("images", formData.image);
formDataToSend.append("images", formData.image_1);
formDataToSend.append("images", formData.image_2);
formDataToSend.append("brand_image", formData.brand_image);
formDataToSend.append("title", formData.title);
formDataToSend.append("brand", formData.brand);
formDataToSend.append("price", formData.price);
formDataToSend.append("before_disc", formData.before_disc);
formDataToSend.append("offer_percent", formData.offer_percent);
formDataToSend.append("category[gender]", formData.gender);
formDataToSend.append("category[type]", formData.type);
formDataToSend.append("category[model]", formData.model);
formDataToSend.append("Quantity", formData.Quantity);

formData.size.forEach((size) => {
  formDataToSend.append("size[]", size);
});


try{
const response = await axios.post("http://localhost:5000/api/addProduct", formDataToSend, {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
}); 

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
        Quantity: "",
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
          {["Men", "Women", "Kids"].map((gender) => (
            <label key={gender}>
              <input type="radio" name="gender" value={gender} checked={formData.gender === gender} onChange={handleGenderChange} required /> {gender}
            </label>
          ))}
        </div>

        {formData.gender && (
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            {productTypes[formData.gender].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        )}

        {formData.gender && (
          <select name="model" value={formData.model} onChange={handleChange} required>
            <option value="">Select Model</option>
            {modelTypes[formData.gender].map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        )}




          <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
          <input type="file" name="image_1" accept="image/*" onChange={handleAdditionalImageChange} required />
          <input type="file" name="image_2" accept="image/*" onChange={handleExtraImageChange} required />

          <input type="file" name="brand_image" accept="image/*" onChange={handleBrandImageChange} required />
              
          <input type="text" name="size" placeholder="Sizes (comma-separated: S,M,L,XL)" value={Array.isArray(formData.size) ? formData.size.join(",") : ""} onChange={handleSizeChange} required />       
          <input type="number" name="Quantity" placeholder="Quantity" value={formData.Quantity} onChange={handleChange} required />

          <button type="submit">Add Product</button>
        </form>
            <button className="btn btn-danger" style={{ marginTop: "10px" }} onClick={handleLogout}> Logout</button>
            <Link to="/vendor-products"> <button className="btn btn-dark" style={{ marginTop: "10px" }}>View My Products</button></Link>
    </div>
  );
};

export default Vendor;
