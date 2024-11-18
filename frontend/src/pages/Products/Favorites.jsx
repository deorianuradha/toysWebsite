import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoritesSlice";
import Product from "./Product";
import Navigation from "../Auth/Navigation";

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct);
  
    return (
      <>
      <div>
        <Navigation />
      </div>
      <div className="bg-[#fafaf9]">
  <h1
    className="text-lg font-bold p-2 ml-[3rem]"
    style={{ fontFamily: '"Roboto", sans-serif' }}
  >
    FAVORITE PRODUCTS
  </h1>

  <div className="flex flex-wrap ml-[3rem]">
    {favorites.length > 0 ? (
      favorites.map((product) => (
        <Product key={product._id} product={product} />
      ))
    ) : (
      <p className="text-gray-500 text-center">No favorite products yet.</p>
    )}
  </div>
</div>
      </>
    );
  };
  
  export default Favorites;