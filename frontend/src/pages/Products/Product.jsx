import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { useTranslation } from "react-i18next";

const Product = ({ product }) => {
  const {t} = useTranslation();
  return (
<div className="flex justify-center items-center ml-[20rem]">
      <div className="w-[15rem] p-1 group">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-[12rem] w-[15rem] object-cover rounded-lg "
            
            
          />
          <HeartIcon product={product} />

          {/* Product details container, hidden by default */}
          <div
            className="absolute inset-0 flex flex-col justify-center items-center p-2 text-center
                       bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <Link to={`/product/${product._id}`}>
              <h2
                className="text-lg font-bold"
                style={{ fontFamily: '"Nerko One", cursive' }}
              >
                {t(product.name)}
              </h2>
              <div className="text-white text-xs px-2 py-2">
                {t(product.description)}
              </div>
              <span className="bg-pink-100 text-pink-800 text-xs font-xl px-2 py-1 rounded-full dark:bg-pink-900 dark:text-pink-300">
                ₹{t(product.price)}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Product;