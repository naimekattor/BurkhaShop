"use client";
import { useProductContext } from "@/context/ProductContext";
import { useSelectedBurqas } from "@/context/SelectedProductsContext";
import Image from "next/image";
import React, { useState } from "react";

const ProductSelection = () => {
  const { products, loading } = useProductContext(); // Access loading state
  const { selectedBurqas, setSelectedBurqas } = useSelectedBurqas();

  // Handle loading state
  if (loading) {
    return <p>Loading products...</p>;
  }

  // Handle empty products array
  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  // Log the last index of the products array
  const lastIndex = products.length - 1;
  const burqas = [
    {
      id: "nude",
      name: "নুড বোরকা",
      price: products[lastIndex]?.price || 0,
      originalPrice: 900,
      image: products[lastIndex]?.images?.[0] || "",
    },
    {
      id: "black",
      name: "কালো বোরকা",
      price: products[lastIndex]?.price || 0,
      originalPrice: 900,
      image: products[lastIndex]?.images?.[1] || "",
    },
    {
      id: "green",
      name: "জলপাই বোরকা",
      price: products[lastIndex]?.price || 0,
      originalPrice: 900,
      image: products[lastIndex]?.images?.[2] || "",
    },
    {
      id: "maroon",
      name: "মেরুন বোরকা",
      price: products[lastIndex]?.price || 0,
      originalPrice: 900,
      image: products[lastIndex]?.images?.[3] || "",
    },
  ];

  const handleSelect = (id) => {
    const alreadySelected = selectedBurqas.find((item) => item.id === id);

    if (alreadySelected) {
      // 🧹 Deselect the item
      setSelectedBurqas((prev) => prev.filter((item) => item.id !== id));
    } else {
      // ✅ Select the item
      const burqa = burqas.find((b) => b.id === id);
      setSelectedBurqas((prev) => [
        ...prev,
        {
          id: burqa.id,
          name: burqa.name,
          image: burqa.image,
          size: "50",
          hijab: "without",
          quantity: 1,
          basePrice: burqa.price,
          finalPrice: burqa.price,
        },
      ]);
    }
  };

  const handleQuantityChange = (id, action) => {
    setSelectedBurqas((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedQuantity =
            action === "increment"
              ? item.quantity + 1
              : Math.max(item.quantity - 1, 1);

          return {
            ...item,
            quantity: updatedQuantity,
            finalPrice: item.basePrice * updatedQuantity,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-center font-bold text-[24px] my-[60px]">
        পছন্দের পোশাটি সিলেক্ট করুন
      </h1>
      <div>
        {burqas.map((burqa) => {
          const isSelected = selectedBurqas.find(
            (item) => item.id === burqa.id
          );
          const currentData = selectedBurqas.find(
            (item) => item.id === burqa.id
          );

          return (
            <div
              key={burqa.id}
              className={` mb-[30px] relative border border-solid border-gray-300 bg-gray-100 p-[16px] transition duration-300 rounded-[8px] gap-0 ${
                isSelected ? "border-green-500" : "border-gray-300"
              }`}
            >
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="burqa"
                  value={burqa.id}
                  checked={isSelected}
                  onChange={() => handleSelect(burqa.id)}
                  className="appearance-none w-[24px] h-[24px] mr-[12px] mt-[5px] cursor-pointer bg-white border-2 border-solid border-gray-300 transition duration-300 rounded-full checked:bg-[#00897b] checked:border-[#00897b] hover:border-[#00897b] relative before:content-['✔'] before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-white before:opacity-0 checked:before:opacity-100"
                />
                <div className="flex-grow">
                  <div>
                    <h2 className="font-bold text-[20px] text-neutral-800 mb-[4px] break-words">
                      {burqa.name}
                    </h2>
                    <div className="flex items-center">
                      <span className="text-[14px] text-[#383636] mr-[10px] line-through">
                        2580৳
                      </span>
                      <span className="font-bold text-[16px] text-[#00897b]">
                        {currentData?.finalPrice || burqa.price} ৳
                      </span>
                    </div>
                  </div>

                  {isSelected && currentData && (
                    <div className="w-full mt-0 overflow-hidden transition-[max-height] duration-300 ease-out">
                      <div className="flex items-center mt-[10px]">
                        <span className="text-[14px] text-black mr-[10px] mi-w-[60px]">
                          পরিমান:
                        </span>
                        <div className="inline-flex items-center h-[26px] border border-solid border-[#a5a5a5] bg-[#ffffff]">
                          <button
                            className="w-[26px] h-[26px] flex items-center justify-center font-sans text-[16px] text-black cursor-pointer bg-none p-0 m-0 transition-[background-color] duration-200"
                            onClick={() =>
                              handleQuantityChange(burqa.id, "decrement")
                            }
                          >
                            -
                          </button>
                          <span className="w-[32px] h-full flex items-center justify-center font-sans text-[12px] text-black select-none border-l border-r border-gray-400">
                            {currentData?.quantity || 1}
                          </span>
                          <button
                            className="w-[26px] h-[26px] flex items-center justify-center font-sans text-[16px] text-black cursor-pointer bg-none p-0 m-0 transition-[background-color] duration-200"
                            onClick={() =>
                              handleQuantityChange(burqa.id, "increment")
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Image
                  width={64}
                  height={64}
                  src={burqa.image}
                  alt={burqa.name}
                  className="w-16 h-16 ml-4 rounded"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSelection;
