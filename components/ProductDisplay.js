"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, AlertTriangle } from "lucide-react";
import Image from "next/image";

// Star Rating Component
const StarRating = ({ rating, totalStars = 5 }) => {
  return (
    <div style={{ display: "flex" }}>
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          size={20}
          color={index < rating ? "#FFD700" : "#E0E0E0"}
          fill={index < rating ? "#FFD700" : "#E0E0E0"}
        />
      ))}
    </div>
  );
};

// Main Component
const ProductDisplay = ({ product = {}, defaultProductData }) => {
  const productData = {
    ...defaultProductData,
    ...product,
    images:
      product?.images?.length > 0 ? product.images : defaultProductData.images,
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => setSelectedImageIndex(index);
  const handlePrevClick = () =>
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : productData.images.length - 1
    );
  const handleNextClick = () =>
    setSelectedImageIndex((prev) =>
      prev < productData.images.length - 1 ? prev + 1 : 0
    );

  const currentImage = productData.images[selectedImageIndex];

  return (
    <div className="container mx-auto my-5 rounded-lg overflow-hidden">
      {/* Main Product Image */}
      <div className="relative max-w-[500px] mx-auto bg-[#f8f9fa] flex justify-center items-center min-h-[400px]">
        <Image
          width={450}
          height={450}
          src={currentImage}
          alt={productData.title}
          className="max-w-full h-[450px] block object-cover"
        />
        {productData.discount && (
          <div className="absolute top-5 left-5 bg-[#FF6B6B] text-white px-2.5 py-1 rounded text-sm font-bold">
            {productData.discount} ছাড়!
          </div>
        )}
        {productData.price && (
          <div className="absolute top-5 right-5 bg-[#1ABC9C] text-white px-4 py-2 rounded text-base font-bold">
            {productData.price}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex items-center justify-center p-2 bg-white">
        <button
          onClick={handlePrevClick}
          className="p-1"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        {productData.images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Image ${index}`}
            width={62}
            height={62}
            className={`w-[60px] h-[80px] object-cover mx-[5px] cursor-pointer border-2 border-transparent rounded-[4px] ${
              index === selectedImageIndex ? " border-[#007BFF]" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
            unoptimized
          />
        ))}
        <button
          onClick={handleNextClick}
          className="p-1"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Stock Alert */}
      {productData.moreColorsText && (
        <div className="max-w-[500px] mx-auto flex items-center justify-center p-[10px] bg-[#FFF3CD] text-[#856404] text-[14px] border-t border-b border-[#eee]">
          <AlertTriangle size={18} className="mr-[8px]" color="#FFA500" />
          {productData.moreColorsText}
        </div>
      )}

      {/* Review and Order Button */}
      <div className="max-w-[500px] mx-auto text-center bg-white p-[15px]">
        <div className="flex flex-col items-center mb-[10px]">
          <div className="flex items-center">
            <StarRating rating={productData.rating} />
            <span className="text-[12px] text-[#777] ml-[5px] mt-[3px]">
              {productData.reviewCountText}
            </span>
          </div>
        </div>
        <p className="text-[14px] text-[#333] mt-[5px] mb-[15px]">
          {productData.satisfiedCustomersText}
        </p>
        <button className="bg-[#2C3E50] text-white py-[12px] px-[25px] text-[16px] font-bold cursor-pointer rounded-[5px] w-[90%] max-w-[300px] m-[10px] auto">
          {productData.orderButtonText}
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
