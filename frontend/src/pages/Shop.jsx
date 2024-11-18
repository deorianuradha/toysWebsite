import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader";
import { setCategories, setChecked, setProducts } from "../redux/features/shop/shopSlice";
import ProductCard from "./Products/ProductCard";
import Navigation from "./Auth/Navigation";
import RangeSlider from "./PriceRangeSlider";


const Shop = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(state => state.shop);
  const location = useLocation();
  
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [sliderValue, setSliderValue] = useState(1000); //use for price slider (1000 means by default 1000 product are showing)

  // Extract category from URL parameters
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio, category });

  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  // useEffect(() => {
  //   if (!checked.length || !radio.length) {
  //     if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
  //       const filteredProducts = filteredProductsQuery.data.filter(product => {
  //         return (
  //           product.price.toString().includes(priceFilter) ||
  //           product.price === parseInt(priceFilter, 10)

  //         );
  //       });

  //       dispatch(setProducts(filteredProducts));
  //     }
  //   }
  // }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);
  useEffect(() => {
    if (filteredProductsQuery.isSuccess) {
      const filteredProducts = filteredProductsQuery.data.filter(product => product.price <= sliderValue);
      dispatch(setProducts(filteredProducts));
    }
  }, [filteredProductsQuery.data, sliderValue, dispatch]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(product => product.brand === brand);
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked.filter(c => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...new Set(
      filteredProductsQuery.data?.map(product => product.brand).filter(brand => brand !== undefined)
    ),
  ];

  const handleSliderChange = (e) => {
    setSliderValue(Number(e.target.value));
  };

  const resetFilters = () => {
    setSliderValue(1000); // Reset to max value
    dispatch(setChecked([]));
    dispatch(setProducts(filteredProductsQuery.data)); // Reset to unfiltered products
  };

  useEffect(() => {
    const Filteringcategory = params.get("category");
    if (Filteringcategory && categories) {
      const Categoryfiltered = categories.find(
        (category) => category.name === Filteringcategory
      );
      // Apply the category filter to checked
      const updatedChecked = [Categoryfiltered?._id];
      dispatch(setChecked(updatedChecked));
    }
  }, [location.search, categories, dispatch]);


  return (
    <>
    <div>
      <Navigation />
    </div>
      <div className=" bg-[#fafaf9]">
      <div className="flex md:flex-row overflow-y-auto" style={{ maxHeight: 'calc(100vh - 22rem)' }}>
      <div className="bg-[#f4f4f5] p-3 mt-2 mb-2 overflow-y-auto w-[30rem]" style={{ maxHeight: '100vh', overflowY: 'auto', overflowX:"hidden" }}>
            <h2 className="h4 text-center py-2 bg-white rounded-full mb-2 mt-[2rem]"
             style={{ fontFamily: '"Nerko One"' }}
            >
              {t("Filter by Categories")}
            </h2>
            <div className="p-5 w-[15rem]">
              {categories?.map(c => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id={`category-${c._id}`}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-[#fef2f2] border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`category-${c._id}`}
                      className="ml-2 text-sm font-medium text-gray dark:text-white"
                      style={{ fontFamily: '"Nerko One"', }}
                    >
                      {t(c.name)}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-white rounded-full mb-2"
             style={{ fontFamily: '"Nerko One"',}}
            >
              {t("Filter by Brands")}
            </h2>
            <div className="p-5">
              {uniqueBrands?.map(brand => (
                <div className="flex items-center mr-4 mb-5" key={brand}>
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-400 bg-[#fef2f2] border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={brand}
                    className="ml-2 text-sm font-medium text-gray dark:text-white"
                    style={{ fontFamily: '"Nerko One"' }}
                  >
                    {t(brand)}
                  </label>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-white rounded-full mb-2"
             style={{ fontFamily: '"Nerko One",',  }}
            >
              {t("Filter by Price")}
            </h2>
            {/* <div className="p-5 w-[15rem]"> */}
              {/* <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              /> */}
              <div className="p-5 w-[15rem]">
              <RangeSlider
                value={sliderValue}
                min={0}

                max={1500}
                onChange={handleSliderChange}
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border my-4 text-white bg-gray-600 hover:bg-gray-500"
                onClick={resetFilters}
                style={{ fontFamily: '"Nerko One",',  }}
              >
                {t("Reset")}
              </button>
            </div>
          </div>

          <div className="mt-[2rem]">
            <h1 className="h3 ml-[0.7rem] mb-2" 
            style={{ fontFamily: '"Nerko One", cursive',  }}
            >{products?.length} {t("Products Available.")}</h1>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products.map(p => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
