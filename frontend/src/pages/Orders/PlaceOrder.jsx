
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import Navigation from "../Auth/Navigation";
import { useTranslation } from "react-i18next";

const PlaceOrder = () => {
  const {t} = useTranslation ();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>

      <Navigation />
      <ProgressSteps step1 step2 step3 />
      
      <div className="container mx-auto mt-8" style={{ fontFamily: '"Nerko One",' }}>
        {cart.cartItems.length === 0 ? (
          <Message>{t("Your cart is empty!")}</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">{t("Image")}</td>
                  <td className="px-1 py-2 text-left">{t("Product")}</td>
                  <td className="px-1 py-2 text-left">{t("Quantity")}</td>
                  <td className="px-1 py-2 text-left">{t("Price")}</td>
                  <td className="px-1 py-2 text-left">{t("Total")}</td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className="p-2">
                      <Link to={`/product/${item.product}`}>{t(item.name)}</Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">{item.price.toFixed(2)}</td>
                    <td className="p-2">
                      ₹ {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8" style={{ fontFamily: '"Nerko One",' }}>
          <h2 className="text-2xl font-semibold mb-5">{t("Order Summary")}</h2>
          <div className="flex justify-between flex-wrap p-10 bg-gray-200 rounded-lg">
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">{t("Items")}:</span> ₹
                {cart.itemsPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">{t("Shipping")}:</span> ₹
                {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold mb-1">{t("Tax")}:</span> ₹
                {cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">{t("Total")}:</span> ₹
                {cart.totalPrice}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-2xl font-semibold mb-4">{t("Shipping")}</h2>
              <p>
                <strong>{t("Address")}:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">{t("Payment Method")}</h2>
              <strong>{t("Method")}:</strong> {t(cart.paymentMethod)}
            </div>
          </div>

          <button
            type="button"
            className="bg-blue-300 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            {t("Place Order")}
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
