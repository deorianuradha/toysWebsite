import { Link } from "react-router-dom";
import stamp_logo from "../assets/stamp.png";

const Footer = () => {
  return (
    <footer
      className="bg-[#66615e] z-10"
      style={{ position: "static", bottom: 0, width: "100%" }}
    >
      <div
        className="mx-auto w-full max-w-screen-xl"
        style={{ fontFamily: '"Roboto", sans-serif' }}
      >
        <div className="grid grid-cols-6 px-10 py-10">
          <div className="border-r border-gray-300 h-[150px] mx-2 ">
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">
              ABOUT
            </h2>
            <ul className="text-white text-xs">
            <li className="mb-2">
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/AboutUs" className="hover:underline">
                  About us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="ContactUs" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="" className="hover:underline">
                  BiodegradableToys Toy Shop Stories
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-r border-gray-300 h-[150px] mx-2">
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">
              HELP CENTER
            </h2>
            <ul className="text-white text-xs">
              <li className="mb-2">
                <Link to="/Payment" className="hover:underline">
                  Payments
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/ShippingFooter" className="hover:underline">
                  Shipping
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/FAQ" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-r border-gray-300 h-[150px] mx-2">
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">
              CONSUMER POLICY
            </h2>
            <ul className="text-white text-xs">
              <li className="mb-2">
                <Link to="/CancelReturnPolicy" className="hover:underline">
                  Cancellation & Returns
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/TermsofUse" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/Security" className="hover:underline">
                  Security
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/Grievance" className="hover:underline">
                  Grievance Redressal
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-r border-gray-300 h-[150px] mx-2">
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">
              RELATED SITES
            </h2>
            <ul className="text-white text-xs">
              <li className="mb-4">
                <a href="https://iitg.ac.in/" target="_blank" className="hover:underline">
                  Indian Institute of Technology Guwahati
                </a>
              </li>
              <li className="mb-4">
                <a href="https://www.cfsuspol.com/" target="_blank" className="hover:underline">
                  Centre For Sustainable Polymers
                </a>
              </li>
            </ul>
          </div>

          <div className="mx-2 ">
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">
              ADDRESS
            </h2>
            <ul className="text-white text-xs">
              <li>
                Centre for Sustainable Polymers,
              </li>
              <li>
                Technology Complex,
              </li>
              <li>
                Indian Institute of Technology Guwahati,
              </li>
              <li >
                Guwahati - 781039
              </li>
              <li className="mt-2">
              <img
            src={stamp_logo}
            alt="Stamp Logo"
            className="h-[2rem] w-[10rem] w-auto  bg-[#66615e]"
          />
              </li>
            </ul>
          </div>

          {/* Optionally, add content for the 6th column here */}
        </div>
      </div>

      <div className="">
        <div className="px-4 py-3 border-t bg-light-gray dark:bg-dark-black md:flex md:items-center md:justify-between">
          <span className="text-sm text-light-white dark:text-light-white sm:text-center ml-5">
            © 2024{" "}
            <a href="#" className="hover:underline">
              Biodegradable-Toys Toy Shop
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
