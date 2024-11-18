import { useGetProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HorizontalProductCarousel = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,  // Number of items visible at once
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full py-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <Slider {...settings} className="w-full">
          {products.map(({            
            image, 
            _id, 
            name }) => (
            <div key={_id} className="p-2">
              <img
                src={image}
                alt={name}
                // className="w-full rounded-lg object-cover h-[37rem] "
                className="w-full rounded-lg object-cover"
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HorizontalProductCarousel;
