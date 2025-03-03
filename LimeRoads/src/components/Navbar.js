import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { BiSolidUser  } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";
import '../Styles/Navbar.css';
import { useSelector } from "react-redux";
import { cartTotal } from "../Redux/cartSlice";


const Navbar = () => {
  const { isLoggedIn, logout, role } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [search, setSearch] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); 
  const cartCount = useSelector(cartTotal);

  const handleMouseEnter = (category) => {
    setOpenDropdown(category);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top custom-navbar">
<div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFZ2vfuuJXIZgqN_8SBHWpLeM0QtnX4B0i6g&s" alt="LimeRoad Logo" className="img-fluid navbar-logo" style={{ paddingLeft: "20px" }} />
          </Link>
          <button className="navbar-toggler" type="button" onClick={toggleNavbar} aria-controls="navbarSupportedContent" aria-expanded={isNavbarOpen} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ fontSize: "13.008px", fontFamily: "Roboto, Helvetica, sans-serif", fontWeight: "bold", color: "#2A2A2A", gap: "10px" }}>
              <li className="nav-item mx-4" onMouseEnter={() => handleMouseEnter("women")} onMouseLeave={handleMouseLeave}>
                <Link className="nav-link active" to="/Women">WOMEN</Link>
                {openDropdown === "women" && (
                  <div className="dropdown-menu">
                    <div className="dropdown-category">
                      <div className="dropdown-main">Ethnic</div>
                      <Link to="/women/clothing/Kurtas" className="dropdown-item">Kurtas</Link>
                      <Link to="/women/clothing/Sarees" className="dropdown-item">Sarees</Link>
                    </div>
                    <div className="dropdown-category">
                      <div className="dropdown-main">Western Wear</div>
                      <Link to="/women/clothing/Shirts" className="dropdown-item">Shirts</Link>
                      <Link to="/women/clothing/T-shirts" className="dropdown-item">Tshirts</Link>
                      <Link to="/women/clothing/Tops" className="dropdown-item">Tops</Link>
                    </div>
                    <div className="dropdown-category">
                      <div className="dropdown-main">Footwear</div>
                      <Link to="/women/footwear/Shoes" className="dropdown-item">Sneakers</Link>
                    </div>
                    <div className="dropdown-category">
                      <div className="dropdown-main">Accessories</div>
                      <Link to="/women/accessories/bags" className="dropdown-item">Bags</Link>
                    </div>
                  </div>
                )}
              </li>

              <li className="nav-item mx-4" onMouseEnter={() => handleMouseEnter("men")} onMouseLeave={handleMouseLeave}>
                <Link className="nav-link active" to="/Men">MEN</Link>
                {openDropdown === "men" && (
                  <div className="dropdown-menu">
                    <div className="dropdown-category">
                      <div className="dropdown-main">Clothing</div>
                      <Link to="/men/clothing/Shirts" className="dropdown-item">Shirts</Link>
                      <Link to="/men/clothing/T-shirts" className="dropdown-item">T-Shirts</Link>
                      <Link to="/men/clothing/Jeans" className="dropdown-item">Jeans</Link>
                      <Link to="/men/clothing/Suits" className="dropdown-item">Suits</Link>
                    </div>
                    <div className="dropdown-category">
                      <div className="dropdown-main">Footwear</div>
                      <Link to="/men/footwear/Scandals" className="dropdown-item">Scandals</Link>
                    </div>
                    <div className="dropdown-category">
                      <div className="dropdown-main">Accessories</div>
                      <Link to="/men/accessories/watch" className="dropdown-item">Watch</Link>
                    </div>
                  </div>
                )}
              </li>

              <li className="nav-item mx-4" onMouseEnter={() => handleMouseEnter("kids")} onMouseLeave={handleMouseLeave}>
                <Link className="nav-link active" to="/kids">KIDS</Link>
                {openDropdown === "kids" && (
                  <div className="dropdown-menu">
                    <div className="dropdown-category">
                      <div className="dropdown-main">Clothing</div>
                      <Link to="/kids/clothing/frocs" className="dropdown-item">Frocks</Link>
                      <Link to="/kids/clothing/T-shirt" className="dropdown-item">T shirt</Link>
                    </div>
                    <div className="dropdown-category">
                      <div className="dropdown-main">Ethnic Wear</div>
                      <Link to="/kids/ethnic/SuitSet" className="dropdown-item">Suit Sets</Link>
                      <Link to="/kids/ethnic/ethnic" className="dropdown-item">Ethnic Wear</Link>
                    </div>
                  </div>
                )}
              </li>

              <li className="nav-item mx-4" onMouseEnter={() => handleMouseEnter("home")} onMouseLeave={handleMouseLeave}>
                <Link className="nav-link active" to="/homepr">HOME</Link>
                {openDropdown === "home" && (
                  <div className="dropdown-menu">
                    <div className="dropdown-category">
                      <div className="dropdown-main">Clothing</div>
                      <Link to="/home/Bed/BedSheets" className="dropdown-item">Frocks</Link>
                      <Link to="/kids/clothing/T-shirt" className="dropdown-item">T shirt</Link>
                    </div>
                  </div>
                )}
              </li>

              <li className="nav-item mx-4">
                <Link className="nav-link active" to="/offers" style={{ color: "red" }}>OFFERS</Link>
              </li>
              <li className="nav-item mx-4">
                <Link className="nav-link active" to="/vmart" style={{ color: "red" }}>VMART</Link>
              </li>
            </ul>
          </div>

          <div className="d-flex" style={{ gap: "60px" }}>
            <div style={{ textAlign: "center", textDecoration: "none", color: "#2A2A2A" }} onClick={() => setSearch(true)}>
              <div><IoSearch size={20} /></div>
              <div style={{ fontSize: "12px" }}>SEARCH</div>
            </div>

            <Link to="/Cart" style={{ textAlign: "center", textDecoration: "none", color: "#2A2A2A", position: "relative" }}>
              <div><HiShoppingCart size={20} /></div>
              {cartCount > 0 && <span style={{ position: "absolute", top: "-5px", right: "-10px", backgroundColor: "red", color: "white", borderRadius: "50%", padding: "2px 6px", fontSize: "12px" }}>{cartCount}</span>}
              <div style={{ fontSize: "12px" }}>CART</div>
            </Link>

            <li className="nav-item mx-4" onMouseEnter={() => handleMouseEnter("Profile")} onMouseLeave={handleMouseLeave} style={{ textDecoration: "none" }}>
              <Link to="/Profile" style={{ textAlign: "center", textDecoration: "none", color: "#2A2A2A" }}>
                <div>
                  <BiSolidUser  size={20} />
                </div>
                <div style={{ fontSize: "12px" }}>PROFILE</div>
              </Link>
              {openDropdown === "Profile" && (
                <div className="dropdown-menus">
                  <div className="dropdown-categorys">
                    <p>
                      <strong>WELCOME, {role}</strong>
                      <br />
                      To view account details
                    </p>
                    {isLoggedIn ? (
                      <button
                        onClick={() => logout()}
                        className="dropdown-items"
                        style={{ backgroundColor: "#FF5722", color: "white",  borderRadius: "5px", padding: "10px", textAlign: "center", border: "none", cursor: "pointer" }}>
                        LOGOUT
                      </button>
                    ) : (
                      <Link to="/Profile" className="dropdown-items" style={{ backgroundColor: "#FF5722", color: "white", borderRadius: "5px", padding: "10px", textAlign: "center" }}>
                        LOGIN
                      </Link>
                    )}
                    <hr />
                    <Link to="/orders" className="dropdown-items">ORDERS</Link>
                    <Link to="/return-replacement" className="dropdown-items">RETURN REPLACEMENT</Link>
                    <Link to="/lr-credits" className="dropdown-items">LR CREDITS</Link>
                    <hr />
                    <Link to="/support" className="dropdown-items">CUSTOMER SUPPORT</Link>
                    <Link to="/faq" className="dropdown-items">FAQ & HELP</Link>
                    <hr />
                  </div>
                </div>
              )}
            </li>
          </div>
        </div>
      </nav>

      {search && (
        <div className="search-overlay">
          <div className="search-box">
            <IoSearch className="search-icon-inside" />
            <input type="text" placeholder="What are you looking for..." className="search-input" autoFocus />
          </div>
          <button className="close-btn" onClick={() => setSearch(false)}>✖</button>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default Navbar;  