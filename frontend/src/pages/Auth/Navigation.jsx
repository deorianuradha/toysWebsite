import { useState } from "react";
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineMenu, AiOutlineClose, AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import Category from "../../components/CategoryForHome";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const {t} = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleCategoryDropdown = () => setCategoryDropdownOpen(!categoryDropdownOpen);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className=" flex items-center h-[3rem] bg-[#e9d5f] text-black p-2 left-[0rem] ">
      <div className="flex items-center space-x-6 ml-auto" 
      style={{ fontFamily: '"Nerko One",cursive'  }}
      
      >
        <Link to="/" className="flex items-center transition-transform transform hover:translate-y-2">
          <AiOutlineHome size={26} />
          <span className="ml-2 hidden lg:block">{t("HOME")}</span>
        </Link>

        {/* <Link to="/shop" className="flex items-center transition-transform transform hover:translate-y-2">
          <AiOutlineShopping size={26} />
          <span className="ml-2 hidden lg:block">SHOP</span>
        </Link> */}

        <div className="relative">
          <button onClick={toggleCategoryDropdown} className="flex items-center transition-transform transform hover:translate-y-2">
            <AiOutlineShopping size={26} />
            <span className="ml-2 hidden lg:block">{t("CATEGORY")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${categoryDropdownOpen ? "transform rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={categoryDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          </button>
          {categoryDropdownOpen && <Category toggleDropdown={toggleCategoryDropdown} />}
        </div>

        <Link to="/cart" className="flex items-center relative transition-transform transform hover:translate-y-2">
          <AiOutlineShoppingCart size={26} />
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-2 px-1 py-0 text-xs text-white bg-pink-500 rounded-full">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
          <span className="ml-2 hidden lg:block">{t("CART")}</span>
        </Link>

        <Link to="/favorite" className="flex relative items-center transition-transform transform hover:translate-y-2">
          <FaHeart size={20} />
          <span className="ml-2 hidden lg:block">{t("FAVORITES")}</span>
          <FavoritesCount />
        </Link>

        {userInfo ? (
          <div className="relative flex items-center">
            <button onClick={toggleDropdown} className="flex items-center text-black focus:outline-none">
              <span>{userInfo.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 top-9 bg-black text-white w-48 rounded-lg shadow-lg z-10">
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-700">
                      {t("Dashboard")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-700">
                      {t("Products")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/categorylist" className="block px-4 py-2 hover:bg-gray-700">
                      {t("Category")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-700">
                      {t("Orders")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-700">
                      {t("Users")}
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">
                  {t("Profile")}
                  </Link>
                </li>
                <li>
                  <Link to="/user-orders" className="block px-4 py-2 hover:bg-gray-700">
                  {t("My Orders")}
                  </Link>
                </li>
                <li>
                  <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-700">
                  {t("Logout")}
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="flex items-center transition-transform transform hover:translate-y-2">
              <AiOutlineLogin size={26} />
              <span className="ml-2 hidden lg:block">{t("LOGIN")}</span>
            </Link>

            <Link to="/register" className="flex items-center transition-transform transform hover:translate-y-2">
              <AiOutlineUserAdd size={26} />
              <span className="ml-2 hidden lg:block">{t("SIGNUP")}</span>
            </Link>
          </div>
        )}
      </div>
      

      <button onClick={toggleMobileMenu} className="lg:hidden ml-4">
        {mobileMenuOpen ? <AiOutlineClose size={26} /> : <AiOutlineMenu size={26} />}
      </button>
    </div>
  );
};

export default Navigation;
