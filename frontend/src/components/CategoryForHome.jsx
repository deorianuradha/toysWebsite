import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

const Category = () => {
  
  const navigate = useNavigate();
  const { data: categories } = useFetchCategoriesQuery();
  

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category.name}`);
    toggleDropdown(); // Close the dropdown after selection
  };

  return (
    <ul className="absolute left-0 mt-2 w-48 bg-black text-white rounded-lg shadow-lg z-10">
      {categories?.map((category) => (
        <li key={category._id} className="px-4 py-2 hover:bg-gray-700">
          <button onClick={() => handleCategoryClick(category)} className="w-full text-left">
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
};



export default Category;
