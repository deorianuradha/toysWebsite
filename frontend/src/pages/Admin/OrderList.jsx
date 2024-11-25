
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { useTranslation } from "react-i18next";

const OrderList = () => {
  const { t } = useTranslation();
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="p-[5rem] bg-[#dae4c5] mt-[6rem]">
      <h1 className="text-2xl ml-[10rem] font-semibold mb-4">All Orders </h1>
    
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        
        <table className="  w-[80%] p-2 mt-[2rem] mr-[10rem] ml-[10rem]">
          <AdminMenu />

          <thead className="w-full border">
            <tr className="mb-[4rem]">
              <th className="text-left pl-1">{t("Items")}</th>
              <th className="text-left pl-1">{t("ID")}</th>
              <th className="text-left pl-1">{t("USER")}</th>
              <th className="text-left pl-1">{t("DATE")}</th>
              <th className="text-left pl-1">{t("TOTAL")}</th>
              <th className="text-left pl-1">{t("PAID")}</th>
              <th className="text-left pl-1">{t("DELIVERED")}</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <img
                    src={order.orderItems[0].image}
                    alt={order._id}
                    className="w-[5rem] pt-4"
                  />
                </td>
                <td>{order._id}</td>
                <td>{order.user ? order.user.username : "N/A"}</td>
                <td>
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>

                <td>₹ {order.totalPrice}</td>

                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      {t("Completed")}
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      {t("Pending")}
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      {t("Completed")}
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      {t("Pending")}
                    </p>
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>
                    <button className="btn btn-sm btn-light">{t("Details")}</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      )}
    </div>
  );
};

export default OrderList;
