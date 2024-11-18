import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";
import Navigation from "../pages/Auth/Navigation";
import Category from "./CategoryForHome";
import logo_gamusa from "../assets/gamusa.jpg";
import logo_rhino from "../assets/onehorn.png";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./language-selector";
const Header = () => {
  const {t} = useTranslation ();

    const { data, isLoading, error } = useGetTopProductsQuery();
  
    if (isLoading) {
        return <Loader />;
      }
    
      if (error) {
        return <h1>ERROR</h1>;
      }
  
    return (
        <>
            <div className="relative bg-[#e9d5f] h-[8rem] flex flex-col md:flex-row justify-between p-2">
              
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${logo_gamusa})`,
                  backgroundSize: '35rem',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'repeat',
                  opacity: 0.3, // Apply transparency only to the background image
                  zIndex: 20, // Place it behind the text
                }}
              ></div>
              
              <div
                className="absolute z-10 text-md md:text-2xl text-black-400 p-6  font-bold ml-[30rem]"
                style={{ fontFamily: '"Nerko One",', fontStyle:'italic', }}
              >
                <h2>
                  {t("Slogan")}
                </h2>

                <p
                  className="mt-2 md:mt-0 font-bold ml-[40rem]"
                  style={{ fontStyle: 'italic', fontSize: '18px' }}
                >
                  {t("Slogan1")}
                </p>
              </div>
            </div>
            <div className="justify-center">
            {/* Adding the Category section */}
           
            <Navigation />

            </div>
                      
        
          <div className="w-full justify-around bg-[#fecaca] p-4  ">

          <div className="w-full h-auto ml-[8rem] mt-[3rem] justify-around">
          <ProductCarousel />
          

        </div>
        </div>
        </>
      );
    };



        {/* <video
    width="" // Adjust width as needed
    height="50%" // Adjust height as needed
    loop // Optional: loop the video
    muted // Optional: mute the video
    autoPlay //
  >
    <source src="/videos/today.mp4" type="video/mp4"  />
    
  </video> */}
        {/* <div className="mt-[10rem] p-30 lg:mt-0 w-full ">
          <h2
            className="text-center text-lg lg:text-2xl text-black-400 mb-2 rounded-full"
            style={{ fontFamily: '"Nerko One", cursive', fontSize: '30px' }}
          >
            {t("Top Products")}
          </h2>
          <div className="grid grid-cols-2 ml-[2rem] gap-2">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-center">
            
            <Link
              to="/shop"
              className="bg-blue-200 font-semibold rounded-full text-red-500 py-2 px-6 md:px-10 mt-4 md:mt-8"
              style={{ fontFamily: '"Nerko One", cursive' }}
            >
             {t("Shop Now")}
            </Link>
          </div>
        </div> */}
      

          
                

       


    

export default Header;

