import React from "react";
// import axios from "axios";
// import { FaHeart, FaWhatsapp } from "react-icons/fa";
// import "../Styles/Home.css";
// import {  useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";

const Homepr = () => {
  // const [products, setProducts] = useState([]);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/products");
  //       const homeProducts = response.data.filter(
  //         (product) => product.category.gender === "home"
  //       );
  //       setProducts(homeProducts);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (<>
  <h1>Home Products</h1>
  </>
//     <div className="home-container">
//       <div className="row" style={{ justifyContent: "space-around" }}>
//         <div className="col-md-3">
//           <Sidebar />
//         </div>
        
//         <div className="col-md-9">
//           <h1 className="home-title text-center my-4">Home Products</h1>
//           <div className="row" style={{justifyContent:"space-around"}}>
//             {products.map((product) => (
//               <div className="home-card-container col-md-4 mb-4"  key={product._id} onClick={() => navigate(`/product/${product._id}`)} style={{ cursor: "pointer" }} >
//                 <div className="home-card h-100">
//                   <img  src={product.image[0]}  className="home-card-img-top" alt={product.title}/>
//                   <div className="home-card-body text-center">
//                     <h5 className="home-card-title">{product.title}</h5>
//                     <p className="home-card-text text-muted">By {product.brand}</p>
//                     <div className="home-price-section mb-3">
//                       <span className="text-success fw-bold">  ₹{product.price}</span>{" "}
//                       <span className="text-muted text-decoration-line-through">₹{product.before_disc}</span>{" "}
//                       <span className="text-danger"> {product.offer_percent}% off  </span>
//                     </div>
//                     <div className="d-flex justify-content-center gap-3"> 
//                       <FaHeart  className="home-heart-icon text-danger" style={{ cursor: "pointer" }} 
//                       onClick={(e) => 
//                         alert(`Liked ${product.title}`)} />
//                        <FaWhatsapp className="home-whatsapp-icon text-success" />
//                     </div>
//                   </div>
//                 </div>
//               </div> ))}
//           </div>
//         </div>
//       </div>
//     </div>
  );
};

export default Homepr;
