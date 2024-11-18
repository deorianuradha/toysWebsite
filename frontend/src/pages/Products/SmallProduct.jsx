import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { useTranslation } from "react-i18next";

const SmallProduct = ({product}) => {
  const {t} = useTranslation();
    return (
      <div className="w-[15rem] p-1 group relative"> {/* Add 'group' and 'relative' classes to the parent div */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-[16rem] w-[15rem] object-cover rounded-lg"
        />
        
        {/* Ensure HeartIcon is above the overlay */}
        <HeartIcon
          product={product}
          className="absolute top-2 right-2 z-30" 
        />

        {/* Product details container, hidden by default */}
        <div
                  className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center
                            bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Link to={`/product/${product._id}`}>
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: '"Nerko One", cursive' }}
                    >
                      {t(product.name)}
                    </h2>
                    <div className="text-white text-xs font-xl px-3 py-3">
                      {t(product.description)}
                    </div>
                    <span className="bg-pink-100 text-pink-800 text-xs font-xl px-2 py-1 rounded-full dark:bg-pink-900 dark:text-pink-300">
                      ₹{t(product.price)}
                    </span>
                  </Link>
                </div>
      </div>
    </div>
  );
};


export default SmallProduct;