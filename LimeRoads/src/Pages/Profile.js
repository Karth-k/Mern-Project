import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "../Styles/Profile.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ForgotPassword from "./ForgotPassword";
import { clearCart } from "../Redux/cartSlice";
import { useDispatch } from "react-redux";
import { fetchCartFromBackend } from "../Redux/cartSlice";


function Profile() {

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const dispatch = useDispatch();


  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [sessionActive, setSessionActive] = useState(false);
  const [role, setrole] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedrole = localStorage.getItem("role");

    if (storedToken && storedrole) {
      setSessionActive(true);
      setrole(storedrole);

      if (storedrole === "vendor") {
        navigate("/Vendor");
      }
    }
  }, [navigate]);

  const updateField = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      Swal.fire({
              title: "Error!",
              text: "Please Enter the Email and Password!",
              icon: "error"
            });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: credentials.email,
        password: credentials.password
      });

      const { authToken, role, message} = response.data;

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("role", role);
      await fetchCartFromBackend(dispatch);

      setSessionActive(true);
      setrole(role);  
      Swal.fire({
        title: "Login Successful!",
        text: message,
        icon: "success"
      }).then(() => {
        if (role === "customer") {
          navigate("/");
          window.location.reload();
        } else if (role === "vendor") {
          navigate("/Vendor");
          window.location.reload();
        } else if (role === "admin") {
          navigate("/");
        } else {
          navigate("/");
        }
      });
    } catch (error) {
      console.log("Login failed:", error);
      alert(error.response?.data?.message || "Unable to log in. Try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    setSessionActive(false);
    setrole("");
    dispatch(clearCart());
    window.location.reload();
  };

  if (sessionActive) {
    return (
      <div className="profile-container text-center">
        <h2>Welcome, {role}!</h2>
        <p>Your profile details will be displayed here.</p>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }
  

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-card text-center p-4 shadow">
        <div className="avatar-container mb-3">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Avatar" className="avatar-img" />
          <h4 className="login-title mt-2">LOG IN</h4>
          <p className="login-subtitle text-muted">Log in to proceed further</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-4">
            <input type="email" id="email" name="email" className="form-control border-0 border-bottom" value={credentials.email} onChange={updateField}placeholder="Enter your Email" required/>
            <br />
            <input type="password" id="password" name="password" className="form-control border-0 border-bottom" value={credentials.password} onChange={updateField} placeholder="Enter your Password"  required />
          </div>
          <button type="submit" className="btn btn-secondary w-100 p-2 mb-2">
            NEXT
          </button>
          <Link to="/RegistrationForm" className="text-decoration-none text-safe pd-10">New User? Register Here </Link>
          <br />
          <button className="btn btn-link text-danger" type="button" onClick={handleShow}>Forgot Password?</button>
        </form>
      </div>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <ForgotPassword handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
