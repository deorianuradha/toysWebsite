import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import SmallProduct from "./Products/SmallProduct";
// import Category from "../components/CategoryForHome";
import ShopByCat from "../components/ShopByCat";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




const Home = () => {
  const {t} = useTranslation();
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword }); useGetTopProductsQuery();
  
  if (isLoading) {
      return <Loader />;
    }
  
    if (isError) {
      return <h1>ERROR</h1>;
    }
  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 4,
      arrows: true,
      autoplay: false,
      // autoplaySpeed: 3000,
    };
    

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
                    {isError?.data?.message || isError?.error?.message || "An error occurred"}
        </Message>

      ) : (
        <>
        {/* bg-[#cffafe] */}
      <div className=" bg-sky-100 p-4">  
        <div className="mt-4 lg:mt-0 w-full ">
        
          <h2 className="text-center text-xl mt-[2rem] " 
          style={{ fontFamily: '"Nerko One", cursive', fontSize: '30px' }}>
            {t("Shop By Category")}
          </h2>
          <div className="flex justify-center flex-wrap mt-8"
          style={{ fontFamily: '"Nerko One", cursive' }}>
            <ShopByCat />
          </div>
        </div>
        
            <div>
              <h2
                className="text-center text-xl"
                style={{ fontFamily: '"Nerko One", cursive', fontSize: '30px' }}
              >

                {t("Our Products")}
              </h2>
            </div>
            <div className=" container mt-4 w-full flex justify-center items-center">
  <div className=" w-full grid grid-cols-6 gap-1">
    
      {data.products.map((product) => (
        <div key={product._id}>
          <div className="h-full w-full justify-center items-center flex flex-wrap">
            <Product product={product} />
          </div>
        </div>
      ))}
    
  </div>
</div>
        <div className="mt-10 w-full flex flex-col justify-center items-center ">
          <div>
          <h2
            className="text-center text-xl"
            style={{ fontFamily: '"Nerko One", cursive', fontSize: '30px' }}
          >
            {t("Recently Added")}
          </h2>
          </div>
        <div className="mt-8 w-full max-w-screen-xl">
          <div className="shadow-lg">
            <Slider {...settings} className="w-full ">
              {data.products.map((product) => (
                <div key={product._id} className="p-2">
                  <div className="h-60 flex justify-center items-center">
                    <Product product={product} />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        
        
        </div>

          <div className="flex flex-col md:flex-row justify-center h-[5rem]">
            {/* <h1
              className=" mt-4 text-lg lg:text-2xl text-black-400 text-center p-2"
              style={{ fontFamily: '"Roboto", sans-serif' }}
            >
              Our Special Products
            </h1> */}

            <Link
              to="/shop"
              className="bg-pink-300 font-semibold rounded-full text-black py-2 px-6 md:px-10 mt-4 md:mt-8 font-bold"
              style={{ fontFamily: '"Nerko One", cursive' }}
            >
              {t("Shop Now")}
            </Link>
          </div>
        </div>
        
        </>
      )}
    </>
  )};

export default Home;