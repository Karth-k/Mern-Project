import React from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-light text-center py-4">
      <p className="mb-3">
        Limeroad is offered in : <Link to="#" className="text-primary">English</Link>
      </p>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <ul className="list-unstyled mb-3 text-center">
              <li><Link to="#" className="text-dark text-decoration-none">About Us</Link></li>
              <li><Link to="#" className="text-dark text-decoration-none">Team</Link></li>
              <li><Link to="#" className="text-dark text-decoration-none">Careers</Link></li>
              <li><Link to="#" className="text-dark text-decoration-none">FAQ</Link></li>
              <li><Link to="#" className="text-dark text-decoration-none">Contact Us</Link></li>
              <li><Link to="#" className="text-dark text-decoration-none">Settings</Link></li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled mb-3 text-center">
              <li><Link to="#" className="text-dark text-decoration-none">Orders</Link></li>
              <li><Link to="#" className="text-dark text-decoration-none">Shopping Cart</Link></li>
              <li><Link to="#" className="text-dark text-decoration-none">Terms of Use</Link></li>
              <li><Link to="#" className="text-dark text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="#" className="text-dark text-decoration-none">Return Policy</Link></li>
              <li><Link to="#" className="text-dark text-decoration-none">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="mb-0">&copy; 2025 limeroad.com</p>
        <p className="mb-0">Designed by Karthik</p>
      </div>
    </footer>
  );
};

export default Footer;
