import React, { useState } from "react";
import "../Styles/CategorySection.css";

const CategorySection = ({ setGender, setType }) => {
  const [selectedCategory, setSelectedCategory] = useState("Women"); 

  const categoryData = {
    Women: [
      { label: "My Feed", img: "/Assets/l_feed.jpg", link: "My Feed" },
      { label: "Kurtas", img: "/Assets/l_ethnic.jpg", link: "Kurtas" },
      { label: "Tshirt", img: "/Assets/l_tshirt.jpg", link: "Tshirt" },
      { label: "Shirts", img: "/Assets/l_shirt.jpg", link: "Shirts" },
      { label: "Tops", img: "/Assets/l_tops.jpg", link: "Tops" },
      { label: "Saree", img: "/Assets/l_saree.jpg", link: "Saree" },
      { label: "Bags", img: "/Assets/l_bags.jpg", link: "Bags" },
      { label: "Footwear", img: "/Assets/l_foot.jpg", link: "Footwear" },
    ],
    Men: [
      { label: "My Feed", img: "/Assets/l_feed.jpg", link: "My Feed" },
      { label: "T-Shirts", img: "/Assets/m_tshirt.jpg", link: "T-Shirts" },
      { label: "Shirts", img: "/Assets/m_shirt.jpg", link: "Shirts" },
      { label: "Jeans", img: "/Assets/m_jeans.jpg", link: "Jeans" },
      { label: "Suits", img: "/Assets/m_suits.jpg", link: "Suits" },
      { label: "Formal Shoes", img: "/Assets/m_shoes.jpg", link: "Formal Shoes" },
      { label: "Sandals", img: "/Assets/m_scandals.jpg", link: "Sandals" },
      { label: "Watch", img: "/Assets/m_watch.jpg", link: "Watch" },
    ],
    Kids: [
      { label: "My Feed", img: "/Assets/l_feed.jpg", link: "My Feed" },
      { label: "Frocks", img: "/Assets/k_frock.jpg", link: "Frocks" },
      { label: "T-Shirts", img: "/Assets/k_thsirt.jpg", link: "T-Shirts" },
      { label: "Ethnic Wear", img: "/Assets/k_ethm.jpg", link: "Ethnic Wear" },
      { label: "Twin Sets", img: "/Assets/k_twin.jpg", link: "Twin Sets" },
    ],
  };

  return (
    <div className="container text-center mt-4">
      
      <div className="row category-section">
        {["Women", "Men", "Kids"].map((category) => (
          <div className="col-auto" key={category}>
            <button
              className={`category-item ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => {setSelectedCategory(category); setGender(category);  setType("My Feed");  }}>
              {category}
            </button>
          </div>
        ))}
      </div>

      
      <div className="row mt-4" style={{ justifyContent: "center" }}>
        {categoryData[selectedCategory].map((item, index) => (
          <div className="col-auto text-center" key={index}>
            <button
              className="image-link"
              onClick={() => { setGender(selectedCategory);   setType(item.label);}} >
              <img src={item.img} alt={item.label} className="circle-img" />
              <p className="mt-2">{item.label}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
