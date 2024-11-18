import { Link } from "react-router-dom";
import { useGetNewProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { useTranslation } from "react-i18next";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  
} from "react-icons/fa";

const ProductCarousel = () => {
  const {t} = useTranslation();
  const { data: products, isLoading, error } = useGetNewProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block mt-3">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="w-full sm:w-[100rem] md:w-[100rem] lg:w-[100rem] xl:w-[100rem] block"
        >
          {products.map((product) => (
            <div key={product._id} className="w-auto p-1 group">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[40rem] w-full object-cover rounded-lg "
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
                    <div className="text-white text-sm font-lg px-3 py-3 max-w-sm">
                      {t(product.description)}
                    </div>
                    <span className="bg-pink-100 text-pink-800 text-xs font-xl px-2 py-1 rounded-full dark:bg-pink-900 dark:text-pink-300">
                      ₹{t(product.price)}
                    </span>
                  </Link>
                </div>

                  {/* Overlay card for "Our New Product" */}
                  <div className="absolute top-0 left-1/4 transform -translate-x-1/2 max-w-md p-6 bg-gradient-to-r from-yellow-300 to-yellow-500 text-white rounded-lg shadow-xl flex items-center space-x-4 z-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.366-.446.879-.708 1.418-.74l.157-.005c.527.034 1.053.306 1.408.78l5.588 7.11c.373.474.59 1.07.59 1.688v.146c0 1.288-1.028 2.343-2.303 2.343h-11.17C2.028 14.321 1 13.266 1 11.978v-.146c0-.617.217-1.214.59-1.688l5.588-7.11c.35-.447.877-.72 1.414-.745l.157-.005c.527-.034 1.05.288 1.413.751zM9 11a1 1 0 112-0 1 1 0 01-2 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h1
                      className="text-sm sm:text-md md:text-lg font-semibold"
                      style={{ fontStyle: "italic" }}
                    >
                      {t("Our New Product")}
                    </h1>
                  </div>
                
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;