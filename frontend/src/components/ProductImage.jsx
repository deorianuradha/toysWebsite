import React, { useState } from "react";

const ProductImage = ({ imgs = [{ ProductImage: "", product: { name: "" } }] }) => {
  const [mainImage, setMainImage] = useState(imgs[0]);

  return (
    <div className="grid grid-four-column">
      {/* Displaying thumbnail images */}
      {Array.isArray(imgs) && imgs.map((currentImage, index) => {
        return (
          <figure key={index}>
            <img
              src={currentImage.product.ProductImage}
              alt={currentImage.product?.name || "Product Image"}
              className="w-full rounded-lg shadow-lg xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mb-4 mt-6 cursor-pointer transition-transform duration-1000 transform hover:scale-50"
              onClick={() => setMainImage(currentImage)}
            />
          </figure>
        );
      })}

      {/* Displaying the main selected image */}
      <div className="main-screen">
        {mainImage && (
          <img
            src={mainImage.product.ProductImage}
            alt={mainImage.product?.name || "Main Product Image"}
            className="w-full rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default ProductImage;
