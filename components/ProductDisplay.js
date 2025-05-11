"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useProductContext } from "@/context/ProductContext";
import { IoFlameOutline } from "react-icons/io5";
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
const ProductDisplay = () => {
  const { products, loading } = useProductContext();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Handle loading or empty products
  if (loading || products.length === 0) {
    return <p>Loading products...</p>;
  }
  console.log(products);

  const lastProductIndx = products.length - 1;
  const productData = products[lastProductIndx];

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
    <div className="max-w-[500px] mx-auto my-5 rounded-lg overflow-hidden">
      {/* Main Product Image */}
      <div className="relative max-w-[500px] mx-auto flex justify-center items-center min-h-[400px]">
        <Image
          width={450}
          height={450}
          src={currentImage}
          alt={productData.title}
          className="max-w-full h-[450px] block object-cover"
        />

        <div className="absolute top-5 left-7 bg-[#f5463d] text-white px-2.5 py-2 rounded-full text-sm font-bold shadow-lg ">
          {productData.discount} ৩০% ছাড়!
        </div>
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
      <div className="flex items-center max-w-[280px] gap-[12px] bg-[#FFF3E0] py-[10px] px-[15px] my-[15px] mx-auto rounded-[4px]">
        <span className=" not-italic font-normal normal-case leading-none antialiased text-[#e65100] text-[18px]">
          <IoFlameOutline />
        </span>
        <div className="flex-1">
          <div className="text-[#e65100] text-[13px] mb-[5px]">
            মাত্র ৩টি খিমার বাকি আছে!
          </div>
          <div className="h-[3px] bg-[#ff6b0033]">
            <div className="w-3/4 h-full bg-[#e65100]"></div>
          </div>
        </div>
      </div>
      <div class="mt-[18px] mr-0 mb-0 text-center">
        <div class="font-serif text-[22px] font-bold text-neutral-900 mb-0">
          প্রিমিয়াম সেমি-লং খিমার
        </div>
        <div class="flex justify-center items-baseline gap-0">
          <span class="text-[18px] text-gray-500 opacity-70 line-through">
            2580৳
          </span>
          <span class="text-[24px] text-[#e65100] font-bold ml-1">
            {productData.price}৳
          </span>
        </div>
      </div>

      <div class="text-center m-1">
        <span class="text-yellow-400 text-[20px] tracking-wide relative inline-block">
          ★★★★★
        </span>
        <span class="text-gray-700 text-[15px] font-medium">(5.0 রিভিউ)</span>
      </div>
      <div class="">
        <div class=""></div>
        <button className="w-full max-w-[200px] text-white text-center font-serif font-bold text-[18px] cursor-pointer block bg-black py-[10px] m-[5px_auto_20px] border-none">
          অর্ডার করুন
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
