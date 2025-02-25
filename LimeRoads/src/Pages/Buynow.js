import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Buynow = () => {
  const cart = useSelector((state) => state.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-7">
          <div className="card" style={{ maxHeight: "500px", overflowY: "auto", padding: "10px" }}>
            <div className="card-body">
              <h5 className="card-title">Please Fill Address For Shipping</h5>
              <form>
             
                <div className="mb-2">
                  <label className="form-label">Pincode *</label>
                  <input type="text" className="form-control" placeholder="Enter 6-digit pincode" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Mobile Number *</label>
                  <input type="text" className="form-control" placeholder="Mobile Number" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Full Name *</label>
                  <input type="text" className="form-control" placeholder="Enter full name" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Locality/Area *</label>
                  <input type="text" className="form-control" placeholder="Enter locality/area" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Flat / House No. / Building Name *</label>
                  <input type="text" className="form-control" placeholder="Enter address details" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">City *</label>
                  <input type="text" className="form-control" placeholder="Enter city" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">State *</label>
                  <input type="text" className="form-control" placeholder="Enter state" required />
                </div>

              
                <div className="mb-2">
                  <label className="form-label">Address Type</label>
                  <div className="d-flex gap-3">
                    <div>
                      <input type="radio" name="addressType" value="home" defaultChecked />
                      <label className="ms-1">Home</label>
                    </div>
                    <div>
                      <input type="radio" name="addressType" value="office" />
                      <label className="ms-1">Office</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-3 card" style={{ maxHeight: "250px", overflowY: "auto", padding: "10px" }}>
            <h5>Cart Items ({cart.length})</h5>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div className="d-flex border p-2 mb-2 align-items-center" key={item.id}>
                  <img src={item.image[0]} alt={item.title} className="me-3" style={{ width: "60px", height: "60px" }} />
                  <div>
                    <p className="mb-1">{item.title}</p>
                    <p className="mb-1">Qty: {item.quantity} | Size: {item.selectedSize}</p>
                    <p className="mb-0 fw-bold">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))
            )}
            <Link to="/cart" className="btn btn-outline-primary w-100 mt-2">EDIT CART</Link>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Payment Mode</h5>
              <ul className="list-group">
                <li className="list-group-item">Cash On Delivery</li>
                <li className="list-group-item">ATM / Debit Card</li>
                <li className="list-group-item">Credit Card</li>
                <li className="list-group-item">Net Banking</li>
                <li className="list-group-item">Wallets</li>
              </ul>
            </div>
          </div>


          <div className="card mt-3">
            <div className="card-body text-center">
              <h5 className="card-title">Order Details</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total Price</span>
                  <span>₹{total}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Shipping Charges</span>
                  <span>Free</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Handling Charges</span>
                  <span className="text-success">FREE</span>
                </li>
              </ul>
              <h5 className="text-danger mt-2">Amount Payable: ₹{total}</h5>
              <button className="btn btn-danger w-100 mt-2">Confirm Order ₹{total}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buynow;
