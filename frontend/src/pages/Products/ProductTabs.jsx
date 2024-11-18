import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
// import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
// import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import { useTranslation } from "react-i18next";


const ProductTabs = ({
  
    loadingProductReview,
    userInfo,
    submitHandler,
    rating,
    setRating,
    comment,
    setComment,
    product,
  }) => {
    // const { data, isLoading } = useGetTopProductsQuery();
  
    const [activeTab, setActiveTab] = useState(1);
    const {t} = useTranslation();
  
    // if (isLoading) {
    //   return <Loader />;
    // }
  
    const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
    };
  
    return (
      <div className="flex flex-col md:flex-row bg-[#fafaf9]">
        <section className="mr-[5rem]">
          <div
            className={`flex-1 p-4 cursor-pointer text-lg ${
              activeTab === 1 ? "font-bold" : ""
            }`}
            onClick={() => handleTabClick(1)}
          >
            {t("Write Your Review")}
          </div>
          <div
            className={`flex-1 p-4 cursor-pointer text-lg bg-gray-200 ${
              activeTab === 2 ? "font-bold" : ""
            }`}
            onClick={() => handleTabClick(2)}
          >
            {t("All Reviews")}
          </div>
          {/* <div
            className={`flex-1 p-4 cursor-pointer text-lg ${
              activeTab === 3 ? "font-bold" : ""
            }`}
            onClick={() => handleTabClick(3)}
          >
            Related Products
          </div> */}
        </section>
  
        {/* Second Part */}
        <section > 
          {activeTab === 1 && (
            <div className="mt-4">
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div className="my-2">
                    <label htmlFor="rating" className="block text-xl mb-2">
                      {t("Rating")}
                    </label>
  
                    <select
                      id="rating"
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="p-2 border rounded-lg xl:w-[40rem] text-black"
                    >
                      <option value="">{t("Select")}</option>
                      <option value="1">{t("Inferior")}</option>
                      <option value="2">{t("Decent")}</option>
                      <option value="3">{t("Great")}</option>
                      <option value="4">{t("Excellent")}</option>
                      <option value="5">{t("Exceptional")}</option>
                    </select>
                  </div>
  
                  <div className="my-2">
                    <label htmlFor="comment" className="block text-xl mb-2">
                      {t("Comment")}
                    </label>
  
                    <textarea
                      id="comment"
                      rows="3"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="p-2 border rounded-lg xl:w-[40rem] text-black"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loadingProductReview}
                    className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                  >
                    {t("Submit")}
                  </button>
                </form>
              ) : (
                <p>
                  {t("Please")} <Link to="/login">{t("sign in")}</Link>{t(" to write a review")}
                </p>
              )}
            </div>
          )}
        </section>
  
        <section className="bg-gray-200">
          {activeTab === 2 && (
            <>
              <div>{product.reviews.length === 0 && <p>{t("No Reviews")}</p>}</div>
  
              <div>
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                  >
                    <div className="flex justify-between">
                      <strong className="text-[#B0B0B0]">{t("review.name")}</strong>
                      <p className="text-[#B0B0B0]">
                        {review.createdAt.substring(0, 10)}
                      </p>
                    </div>
  
                    <p className="my-4">{review.comment}</p>
                    <Ratings value={review.rating} />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
  
        {/* <section className="bg-gray-200">
          {activeTab === 3 && (
            <section className="ml-[4rem] flex flex-wrap">
              {!data ? (
                <Loader />
              ) : (
                data.map((product) => (
                  <div key={product._id}>
                    <SmallProduct product={product} />
                  </div>
                ))
              )}
            </section>
          )}
        </section> */}
      </div>
    );
  };
  
  export default ProductTabs;