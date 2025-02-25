import React, { useState } from "react";
import Carousel from "../components/Carousel";
import CategorySection from "../components/CategorySection";
import LandingPage from "./Landingpage";


const Home = () => {
  const [gender, setGender] = useState("Women");
  const [type, setType] = useState("My Feed"); 


  return (
  
      <div>
      
      <CategorySection setGender={setGender} setType={setType} />
      <Carousel />
      <LandingPage gender={gender} type={type} />
    </div>
  );
};

export default Home;
