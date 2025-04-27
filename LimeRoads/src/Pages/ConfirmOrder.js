import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../Redux/cartSlice";

const ConfirmOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const session_id = queryParams.get("session_id");

  useEffect(() => {
    if (!session_id) {
      setError("No session ID found."); 
      setLoading(false);
      return;
    }

    const confirmOrder = async () => {
      try {
        
        const { data } = await axios.post("http://localhost:5000/api/orders/confirm-order", 
          { session_id }, 
          { headers: { "Content-Type": "application/json" } }
        );

        
        dispatch(clearCart());

       
        setTimeout(() => navigate("/orders"), 3000);
      } catch (err) {
        setError("Order confirmation failed. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    confirmOrder();
  }, [session_id, dispatch, navigate]);

  return (
    <div className="container mt-5 text-center">
      {loading ? (
        <h4>Confirming your order...</h4>
      ) : error ? (
        <h4 className="text-danger">{error}</h4>
      ) : (
        <h4 className="text-success">Order confirmed successfully! Redirecting...</h4>
      )}
    </div>
  );
};

export default ConfirmOrder;
