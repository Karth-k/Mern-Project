import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../Styles/Profile.css"; 

function ResetPassword() {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const updateField = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!passwords.newPassword || !passwords.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Both fields are required!",
        icon: "error",
      });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match!",
        icon: "error",
      });
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/reset-password/${token}`, { 
          newPassword: passwords.newPassword }
      );

      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
      }).then(() => {
        navigate("/Profile"); 
      });
    } catch (error) {
      console.error("Reset password failed:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-card text-center p-4 shadow">
        <div className="avatar-container mb-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Avatar"
            className="avatar-img"
          />
          <h4 className="login-title mt-2">Reset Password</h4>
          <p className="login-subtitle text-muted">Enter a new password</p>
        </div>
        <form onSubmit={handleResetPassword}>
          <div className="form-group mb-4">
            <input
              type="password"
              name="newPassword"
              className="form-control border-0 border-bottom"
              value={passwords.newPassword}
              onChange={updateField}
              placeholder="Enter new password"
              required
            />
            <br />
            <input
              type="password"
              name="confirmPassword"
              className="form-control border-0 border-bottom"
              value={passwords.confirmPassword}
              onChange={updateField}
              placeholder="Confirm new password"
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary w-100 p-2 mb-2">
            RESET PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;