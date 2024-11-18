import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import children_toys from "../assets/children_toys.png";
import Cartoon from "../assets/action figures_cat.jpg";
import AssamTourism from "../assets/AssamTourism.png";
import Robot from "../assets/robot.jpeg";
// import Action from "../assets/action.jpeg";
import Animal from "../assets/elephant.jpeg";
import Interior from "../assets/cube.jfif";
import Monument from "../assets/tajmahal.png"
import { useTranslation } from "react-i18next";

const categoryImages = {
  
  "Interior Design": Interior,
  "Cartoons & Anime": Cartoon,
  "Assam Tourism": AssamTourism,
  "Children Toys": children_toys,
  // "Action Figures":Action,
  "Animal Toys/Decor":Animal,
  "Action Figures/Robot": Robot,
  "Historical Monuments": Monument



  // Add more categories and corresponding images here
};

const ShopByCat = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const { data: categories } = useFetchCategoriesQuery();
  const [showAll, setShowAll] = useState(false);

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category.name}`);
  };

  const handleViewMoreClick = () => {
    setShowAll(true);
  };

  const handleHideClick = () => {
    setShowAll(false);
  };

  const displayedCategories = showAll ? categories : categories?.slice(0, 5);

  return (
    <div className="container relative p-4">
      <div className="grid grid-cols-5 gap-2 h-auto w-auto text-center items-center">
        {displayedCategories?.map((category) => (
          <div 
            key={category._id} 
            className="bg-stone-50 rounded-lg shadow-lg p-4 w-[18rem]
            cursor-pointer transition-transform duration-500 transform hover:scale-110"
            onClick={() => handleCategoryClick(category)}
          >
            <img
              src={categoryImages[category.name]}
              alt={category.name}
              className="h-28 w-28 object-cover mx-auto rounded-lg
              "
            />
            <h3 className="text-2xl mt-2">{t(category.name)}</h3>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
      {!showAll && categories?.length > 5 && (
        <button
          onClick={handleViewMoreClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg "
        >
          {t("View More")}
        </button>
      )}
      {showAll && (
          <button
            onClick={handleHideClick}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg ml-4 "
          >
            {t("Hide")}
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopByCat;
