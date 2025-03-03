import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";

import Navbar from "../components/Navbar";
import Profile from "../Pages/Profile";
import Men from "../Pages/Men"
import Women from "../Pages/Women"
import Kids from "../Pages/Kids";
import Homepr from "../Pages/Homepr";
import Cart from "../Pages/Cart";
import ProductDetailsPage from '../components/ProductDetailsPage'
import SubCategoryPage from "../components/SubCategoryPage";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import RelatedProducts from "../Pages/RelatedProducts";
import Buynow from "../Pages/Buynow";
import RegistrationForm from "../Pages/RegistrationForm";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword";
import Vendor from "../Pages/Vendor";
import VendorProdcuts from "../Pages/VendorProdcuts";
import ConfrimOrder from  "../Pages/ConfirmOrder";


const AllRoutes = ()=>{
    return(<div>
     
        <Navbar/>   
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/men" element={<Men/>}></Route>
            <Route path="/women" element={<Women/>}></Route>
            <Route path="/kids" element={<Kids/>}></Route>
            <Route path="/homepr" element={<Homepr/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/:gender/:model/:type" element={<SubCategoryPage />} />
            <Route path="/" element={<CategorySection />} />
            <Route path="/:gender/:model/:type" element={<RelatedProducts />} />
            <Route path="/BuyNow" element={<Buynow />} />
            <Route path="/RegistrationForm" element={<RegistrationForm />} />
            <Route path = "/ForgotPassword" element = {<ForgotPassword/>}></Route>
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path='/Vendor' element={<Vendor/>}></Route>
            <Route path ='/vendor-products' element={<VendorProdcuts/>}></Route>
            <Route path = '/ConfirmOrder' element ={<ConfrimOrder/>}></Route>
        </Routes>
        
        <Footer/>
      
        

        </div>)
}

export default AllRoutes;