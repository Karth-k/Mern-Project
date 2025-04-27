import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const syncCartWithBackend = async (cart) => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;

    await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ cart }),
    });

    // if (response.ok) {
    //   localStorage.removeItem("cart");
    // }
  } catch (error) {
    console.error("Failed to sync cart with backend:", error);
  }
};


const fetchCartFromBackend = async (dispatch) => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;

    const response = await fetch("http://localhost:5000/api/show/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    localStorage.setItem("cart", JSON.stringify(data));
    dispatch(setCart(data)); 
  } catch (error) {
    console.error("Failed to fetch cart from backend:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
    addToCart: (state, action) => {
      const authToken = localStorage.getItem("authToken");
      const role = localStorage.getItem("role");

      if (!authToken || role !== "customer") {
        Swal.fire({
          title: "Access Denied!",
          text: "Please log in before adding products.",
          icon: "error",
        });
        return state;
      }

      const { _id, selectedSize, Quantity } = action.payload; 
      const existingProduct = state.find(item => item._id === _id && item.selectedSize === selectedSize);

      if (existingProduct) {
        if (existingProduct.quantity < Quantity) { 
          existingProduct.quantity += 1;
        } else {
          Swal.fire({
            title: "Stock Limit Reached!",
            text: "No more stock available for this product.",
            icon: "warning",
          });
        }
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state));
      syncCartWithBackend(state);

      Swal.fire({
        title: "Added to Cart!",
        text: "Your item has been added successfully.",
        icon: "success",
      });
    },

    removeFromCart: (state, action) => {
      const authToken = localStorage.getItem("authToken");
      const role = localStorage.getItem("role");

      if (!authToken || role !== "customer") {
        Swal.fire({
          title: "Access Denied!",
          text: "Please log in before removing products.",
          icon: "error",
        });
        return state;
      }

      const updatedCart = state.filter(item => item._id !== action.payload);
      
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      syncCartWithBackend(updatedCart);

      Swal.fire({
        title: "Item Removed!",
        text: "The item has been removed from your cart.",
        icon: "success",
      });

      return updatedCart;
    },

    updateQuantity: (state, action) => {
      const authToken = localStorage.getItem("authToken");
      const role = localStorage.getItem("role");

      if (!authToken || role !== "customer") {
        Swal.fire({
          title: "Access Denied!",
          text: "Please log in before updating the quantity.",
          icon: "error",
        });
        return state;
      }

      const { _id, selectedSize, quantity, Quantity } = action.payload; 
      const product = state.find(item => item._id === _id && item.selectedSize === selectedSize);

      if (product) {
        if (quantity <= Quantity) { 
          product.quantity = quantity;
          localStorage.setItem("cart", JSON.stringify(state));
          syncCartWithBackend(state);
    
        
          Swal.fire({
            title: "Quantity Updated!",
            text: "The item quantity has been updated.",
            icon: "success",
          });
    
        } else {
          Swal.fire({
            title: "Stock Limit Exceeded!",
            text: `Only ${Quantity} items available in stock.`,
            icon: "warning",
          });
        }
      }
    },

    clearCart: (state) => {
      localStorage.removeItem("cart");
      syncCartWithBackend([]);
      return [];
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const cartTotal = (state) => state.cart.reduce((total, item) => total + item.quantity, 0);
export { fetchCartFromBackend };
export default cartSlice.reducer;