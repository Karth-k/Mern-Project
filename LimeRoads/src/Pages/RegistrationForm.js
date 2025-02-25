import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "customer",
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    sellerName: "",
    sellerPhoneNumber: "",
    sellerEmail: "",
    sellerPassword: "",
    adminName: "",
    adminPhoneNumber: "",
    adminEmail: "",
    adminPassword:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match!",
        icon: "error"
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/register", formData);
      Swal.fire({
        title: "Good job!",
        text: "Registration successful!",
        icon: "success"
      })
      .then(()=> {
        navigate('/Profile')
      })
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Registration Page</h2>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-white mb-5 w-50 h-80">
      
          <div className="mb-3">
            <label className="form-label d-block">Registering As</label>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="role" id="customer" value="customer" checked={formData.role === "customer"} onChange={handleChange}/>
              <label className="form-check-label" htmlFor="customer">Customer</label>
            </div>
            <div className="form-check">
              <input className="form-check-input"  type="radio" name="role" id="vendor"  value="vendor"checked={formData.role === "vendor"}  onChange={handleChange}/>
              <label className="form-check-label" htmlFor="vendor">Vendor</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="role" id="admin" value="admin" checked={formData.role === "admin"}  onChange={handleChange}/>
              <label className="form-check-label" htmlFor="admin">Admin</label>
            </div>
          </div>

        
          {formData.role === "customer" && (
            <>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input type="tel" className="form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phone number" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required/>
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required/>
              </div>
            </>
          )}

          
          {formData.role === "vendor" && (
            <>
              <div className="mb-3">
                <label htmlFor="sellerName" className="form-label">Seller Name</label>
                <input type="text" className="form-control" id="sellerName" name="sellerName"  value={formData.sellerName} onChange={handleChange} placeholder="Enter seller name"  required/>
              </div>
              <div className="mb-3">
                <label htmlFor="sellerPhoneNumber" className="form-label">Seller Phone Number</label>
                <input type="tel" className="form-control" id="sellerPhoneNumber" name="sellerPhoneNumber" value={formData.sellerPhoneNumber} onChange={handleChange} placeholder="Enter seller phone number" required/>
              </div>
              <div className="mb-3">
                <label htmlFor="sellerEmail" className="form-label">Seller Email</label>
                <input type="email" className="form-control" id="sellerEmail" name="sellerEmail" value={formData.sellerEmail} onChange={handleChange} placeholder="Enter seller email" required  />
              </div>
              <div className="mb-3">
                <label htmlFor="sellerPassword" className="form-label">Seller Password</label>
                <input type="password" className="form-control" id="sellerPassword" name="sellerPassword" value={formData.sellerPassword} onChange={handleChange} placeholder="Enter seller password" required />
              </div>
            </>
          )}


          {formData.role === "admin" && (
            <>
              <div className="mb-3">
                <label htmlFor="adminName" className="form-label">Admin Name</label>
                <input type="text" className="form-control" id="adminName" name="adminName" value={formData.adminName} onChange={handleChange} placeholder="Enter admin name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="adminPhoneNumber" className="form-label">Admin Phone Number</label>
                <input type="tel" className="form-control" id="adminPhoneNumber" name="adminPhoneNumber" value={formData.adminPhoneNumber} onChange={handleChange} placeholder="Enter admin phone number" required />
              </div>
              <div className="mb-3">
                <label htmlFor="adminEmail" className="form-label">Admin Email</label>
                <input type="email" className="form-control" id="adminEmail" name="adminEmail" value={formData.adminEmail} onChange={handleChange} placeholder="Enter admin email"  required />
              </div>
              <div className="mb-3">
                <label htmlFor="adminPassword" className="form-label">Admin Password</label>
                <input type="password" className="form-control" id="adminPassword" name="adminPassword" value={formData.adminPassword} onChange={handleChange} placeholder="Enter admin password" required />
              </div>
            </>
          )}
          
          <button type="submit"   className="btn btn-primary w-100">Register</button>
         
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
