import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart } from "../redux/features/cart/cartSlice";
import { removeFromCart } from "../redux/features/cart/cartSlice";
import Navigation from "./Auth/Navigation";
import { useTranslation } from "react-i18next";

const Cart = () => {
    const {t}= useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
  
    const addToCartHandler = (product, qty) => {
      dispatch(addToCart({ ...product, qty }));
    };
  
    const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
    };
  
    const checkoutHandler = () => {
      navigate("/login?redirect=/shipping");
    };
  
    return (
      <>
      <div>
        <Navigation />
      </div>
        <div className=" flex justify-around items-start flex wrap mx-auto p-[3rem] bg-[#fafaf9]"
         style={{ fontFamily: '"Nerko One",' }}
        >
          {cartItems.length === 0 ? (
            <div>
              {t("Your cart is empty")} <Link to="/shop">{t("Go To Shop")}</Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col w-[80%]">
                <h1 className="text-2xl font-semibold mb-4">{t("Shopping Cart")}</h1>
  
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-enter mb-[1rem] pb-2">
                    <div className="w-[5rem] h-[5rem]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
  
                    <div className="flex-1 ml-4">
                      <Link to={`/product/${item._id}`} className="text-pink-800 font-bold text-xl">
                        {t(item.name)}
                      </Link>
  
                      <div className="mt-2 text-black font-bold">{t(item.brand)}</div>
                      <div className="mt-2 text-black font-bold">
                        ₹ {item.price}
                      </div>
                    </div>
  
                    <div className="w-24">
                      <select
                        className="w-full p-1 border rounded"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
  
                    <div>
                      <button
                        className="text-red-500 mr-[5rem]"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash className="ml-[1rem] mt-[.5rem]" />
                      </button>
                    </div>
                  </div>
                ))}
  
                <div className="mt-8 flex justify-end">
                  <div className="p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">
                      {t("Items")} ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                    </h2>
  
                    <div className="text-2xl font-bold">
                      <h2>Order Total</h2>
                      ₹{" "}
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </div>
  
                    <button
                      className="flex bg-blue-200 mt-4 py-2 px-4 rounded-full text-lg w-full flex justify-center"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                      style={{ fontFamily: '"Nerko One",' }}
                    >
                      {t("Proceed To Checkout")}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  };
  
  export default Cart;