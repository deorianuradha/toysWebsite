import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { saveShippingAddress, savePaymentMethod } from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import { useTranslation } from "react-i18next";

const Shipping = () => {
    const {t}= useTranslation();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
  
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const [address, setAddress] = useState(shippingAddress.address || "");
    const [city, setCity] = useState(shippingAddress.city || "");
    const [postalCode, setPostalCode] = useState(
      shippingAddress.postalCode || ""
    );
    const [country, setCountry] = useState(shippingAddress.country || "");
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const submitHandler = (e) => {
      e.preventDefault();
  
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      dispatch(savePaymentMethod(paymentMethod));
      navigate("/placeorder");
    };
  
    // Payment
    useEffect(() => {
      if (!shippingAddress.address) {
        navigate("/shipping");
      }
    }, [navigate, shippingAddress]);

    return(
        <div className="container mx-auto mt-5 p-[4rem] bg-[#fafaf8] shadow-*"
        style={{ fontFamily: '"Nerko One",' }}>
          <ProgressSteps step1 step2 />
          <div className="mt-[5rem] flex justify-around items-center flex-wrap">
            <form onSubmit={submitHandler} className="w-[40rem]">
              <h1 className="text-2xl font-semibold mb-4">{t("Shipping")}</h1>
              <div className="mb-4">
                <label className="block text-black mb-2"
                style={{ fontFamily: '"Nerko One",' }}>{t("Address")}</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">{t("City")}</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter city"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">{t("Pin Code")}</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter postal code"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">{t("Country")}</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-black">{t("Select Method")}</label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-200"
                      name="paymentMethod"
                      value="PayPal"
                      checked={paymentMethod === "PayPal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
    
                    <span className="ml-2">{t("PayPal or Credit Card")}</span>
                  </label>
                </div>
              </div>
    
              <button
                className="bg-blue-400 text-white py-2 px-4 rounded-full text-lg w-full"
                type="submit"
              >
                {t("Continue")}
              </button>
            </form>
          </div>
        </div>
      );
    };

export default Shipping;

