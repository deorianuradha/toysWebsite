import { Outlet } from "react-router-dom";
import Footer from "./pages/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import iitg_logo from "../src/assets/IITglogo.png";
import suspol_logo from "../src/assets/suslogo.png";
import Logo from "../src/assets/lgo.png";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./components/language-selector";

const App = () => {
  const {t} = useTranslation()
  return (
    <>

      <header className="bg-purple-30 py-2 shadow-md flex items-center justify-between">
        
        {/* Left Side: Logo and Green Putola Content */}
        <div className="flex items-center ml-[0rem]">
          <img
            src={Logo}
            alt="Green Putola Logo"
            className="h-[7rem] w-auto  bg-white"
          />
          <div className="ml-4 flex flex-col justify-between items-start ">
            <h1
              className="text-lg sm:text-xl md:text-3xl font-bold"
              style={{ fontFamily: '"Nerko One", cursive', color: "green" }}
            >
              {t("Green Putola Kendra")}
            </h1>
            <h3
              className="text-md"
              style={{ fontFamily: '"Nerko One", cursive', color: "green" }}
            >
              {t("Eco friendly Toys Shop")}
            </h3>
            <h3
              className="text-md"
              style={{ fontFamily: '"Nerko One", cursive', color: "green" }}
            >
              {t("Joint Initiative of DST, IIT-G")}
            </h3>
            
          </div>
        </div>
        <div className="mt-[5rem]">
       <LanguageSelector />
        </div>
        
        
        {/* Right Side: IIT Guwahati, CFSP Links, and Logos */}
        <div className="flex items-center mr-[2rem]">
          <div className="text-center text-xl mr-[1rem]" style={{ fontFamily: '"Nerko One"', }}>
            <p className="font-bold">
            An initiative of 
            </p>
            <p>
              <a
                href="https://iitg.ac.in/"
                className="hover:text-yellow-600 text-md font-bold"
              >
                
                {t("Indian Institute of Technology Guwahati")}
              </a>
            </p>
            <p>
              <a
                href="https://www.cfsuspol.com/"
                className="hover:text-yellow-600 text-md font-bold"
              >
                {t("Centre for Sustainable Polymers")}
              </a>

            </p>
            <p className="font-bold">
              powered by DST
            </p>
            
          </div>

          {/* IITG Logo */}
          <img
            src={iitg_logo}
            alt="IITG Logo"
            className="h-[7rem] w-auto rounded-lg bg-white mr-[0.5rem]"
          />

          {/* SusPol Logo */}
          <img
            src={suspol_logo}
            alt="SusPol Logo"
            className="h-[7rem] w-auto rounded-md bg-white"
          />
        </div>
      </header>
      
      <ToastContainer />

      <main className="py-3">
        <Outlet />
      </main>
      <Footer style={{ flexShrink: "0" }} />
    </>
  );
};

export default App;
