import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    useGetProductDetailsQuery,
    useCreateReviewMutation,
    useGetTopProductsQuery,
} from '../../redux/api/productApiSlice';
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from 'react-icons/fa';
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import SmallProduct from "./SmallProduct";
import { addToFavorites } from "../../redux/features/favorites/favoritesSlice";
import { useTranslation } from "react-i18next";

const ProductDetails = () => {
    const { t, i18n } = useTranslation();
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [mainImage, setMainImage] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]); // State for uploaded images

    const {
      data: product,
      isLoading,
      refetch,
      error,
    } = useGetProductDetailsQuery(productId);
  
    const { userInfo } = useSelector((state) => state.auth);

    const { data: relatedProducts, error: relatedProductsError } = useGetTopProductsQuery();
  
    const [createReview, { isLoading: loadingProductReview }] =
      useCreateReviewMutation();

    moment.locale(i18n.language);
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      try {
        await createReview({
          productId,
          rating,
          comment,
        }).unwrap();
        refetch();
        toast.success("Review created successfully");
      } catch (error) {
        toast.error(error?.data || error.message);
      }
    };
  
    const addToCartHandler = () => {
      dispatch(addToCart({ ...product, qty }));
      navigate("/cart");
    };
    const addToWishlist = () => {
      dispatch(addToFavorites(product)); // Dispatch the product to Redux
      toast.success(`${product.name} added to Wishlist!`);
      
    };

    // Function to handle file upload
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setUploadedImages(imageUrls); // Update state with uploaded images
  };

    return (
      <>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <>
          <div className="bg-[#fafaf9]">
            <div className="flex flex-wrap relative items-start ml-[10rem]">

                         {/* Product Image Gallery */}
                            <div className="flex-none">
                                <img
                                    src={mainImage || product.image}
                                    alt={product.name}
                                    className="w-full rounded-lg shadow-lg xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mb-4 mt-6 curs transition-transform duration-1000 transform hover:scale-110"
                                />
                                
                                
                            </div>

               {/* Product Thumbnails */}
               <div className="grid grid-cols-4 gap-2">
                                {uploadedImages.length > 0 ? (
                                    uploadedImages.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Uploaded view ${index + 1}`}
                                            onClick={() => setMainImage(img)}
                                            className="w-full rounded-lg shadow-sm cursor-pointer hover:scale-105"
                                        />
                                    ))
                                ) : (
                                    product.images && product.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img.url}
                                            alt={`Product view ${index + 1}`}
                                            onClick={() => setMainImage(img.url)}
                                            className="w-full rounded-lg shadow-sm cursor-pointer hover:scale-105"
                                        />
                                    ))
                                )}
                            </div>

                            {/* Upload Images Input */}
                            {/* <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="mt-4"
                            /> */}


              {/* Product Info */}
              <div className="flex flex-col justify-between ml-4 mt-[10rem]">
                <h2 className="text-3xl font-bold mb-2">{t(product.name)}</h2>
                <p className="xl:w-[35rem] lg:w-[30rem] md:w-[30rem] text-black mb-2 text-xl">
                  {t(product.description).substring(0, 1000)}
                </p>
                <p className="text-3xl font-semibold mb-4">₹ {product.price}</p>

                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col">
                    <h1 className="flex items-center mb-3 font-semibold">
                      <FaStore className="mr-2 text-black" /> {t("Brand")}: {t(product.brand)}
                    </h1>
                    {/* <h1 className="flex items-center mb-3 font-semibold">
                      <FaClock className="mr-2 text-black" /> {t("Added")}: {moment(product.createdAt).fromNow()}
                    </h1> */}
                    <h1 className="flex items-center mb-3 font-semibold">
                      <FaStar className="mr-2 text-black" /> {t("Reviews")}: {t(product.numReviews)}
                    </h1>
                    <h1 className="flex items-center mb-3 font-semibold">
                      <FaStar className="mr-2 text-black" /> {t("Ratings")}: {t(rating)}
                    </h1>
                  </div>

                  <div className="flex flex-col">
                    
                    <h1 className="flex items-center mb-3 font-semibold">
                      <FaShoppingCart className="mr-2 text-black" /> {t("Quantity")}: {t(product.quantity)}
                    </h1>
                    <h1 className="flex items-center mb-3 font-semibold">
                      <FaBox className="mr-2 text-black" /> {t("In Stock")}: {t(product.countInStock)}
                    </h1>
                  </div>
                </div>

                {/* Ratings and Add to Cart */}
                <div className="flex justify-between flex-wrap font-semibold mb-4">
                  <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
                  {product.countInStock > 0 && (
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black font-semibold"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Add to Cart Button */}
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="bg-pink-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                  >
                    {t("Add To Cart")}
                  </button>

                  <Link to="/shop" className="flex items-center">
                    <h1 className="bg-pink-600 rounded-lg py-2 px-4 text-white flex items-center justify-center">
                      {t("Go Back")}
                    </h1>
                  </Link>
                  {/* <button
                    onClick={addToWishlist}
                    
                    className="bg-pink-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                  >
                    {t("Wishlist")}
                  </button> */}
                  
                  
                </div>
              </div>

              {/* Related Products and Reviews */}
              <section className="ml-[15rem] mt-[5rem]">
                <h2 className="text-center text-xl" style={{ fontFamily: '"Nerko One", cursive' }}>{t("Related Products")}</h2>
                <section className="ml-[4rem] flex flex-wrap shadow-lg">
                  {!relatedProducts ? (
                    <Loader />
                  ) : relatedProductsError ? (
                    <Message variant="danger">{relatedProductsError.message}</Message>
                  ) : (
                    relatedProducts.map((product) => (
                      <div key={product._id}>
                        <SmallProduct product={product} />
                      </div>
                    ))
                  )}
                </section>

                <div className="mt-8 items-center ml-[6rem]">
                  <ProductTabs
                    loadingProductReview={loadingProductReview}
                    userInfo={userInfo}
                    submitHandler={submitHandler}
                    rating={rating}
                    setRating={setRating}
                    comment={comment}
                    setComment={setComment}
                    product={product}
                  />
                </div>
              </section>
            </div>
          </div>
          </>
        )}
      </>
    );
};

export default ProductDetails;
