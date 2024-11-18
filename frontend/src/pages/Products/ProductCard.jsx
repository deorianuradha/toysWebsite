import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { useTranslation } from "react-i18next";

const ProductCard = ({ p }) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-sm relative bg-[#f4f4f5] rounded-lg shaodw dark:border-gray-700"
    style={{ fontFamily: '"Nerko One"' }}>
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300" 
          style={{ fontFamily: '"Nerko One"' }}
          >
            {t(p?.brand)}
          </span>
          <img
            className="cursor-pointer w-full w-[15rem] h-[15rem] cursor-pointer transition-transform duration-500 transform hover:scale-110"
            src={p.image}
            alt={p.name}
            style={{ objectFit: "fill" }}
          />
        </Link>
        <HeartIcon product={p} />
        

      </section>

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl text-gray" style={{ fontFamily: '"Roboto", sans-serif' }}>
            {t(p?.name)}</h5>

          <p className="text-black font-semibold text-pink-500">
            {p?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>

        <p className="mb-3 font-normal text-gray" style={{ fontFamily: '"Roboto", sans-serif' }}>
          {t(p?.description)?.substring(0, 15)} ...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#94a3b8] rounded-lg hover:bg-[#fca5a5] focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
            
          >
            {t("Details")}
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-full"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
