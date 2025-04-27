import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ForgotPassword({ handleClose }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        title: "Error!",
        text: "Please enter your email!",
        icon: "error"
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/forgot-password", {
        email
      });

      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success"
      });

      handleClose();  
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to send reset email.",
        icon: "error"
      });
    }
  };

  return (
    <div className="text-center">
      <p>Enter your email to receive a password reset link.</p>
      <form onSubmit={handleSubmit}>
        <input type="email"  className="form-control mb-3" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)}  required />
        <button type="submit" className="btn btn-primary w-100">  Send Reset Link </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
