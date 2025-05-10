"use client";
import { useSelectedBurqas } from "@/context/SelectedProductsContext";
import Image from "next/image";
import React, { useState } from "react";

const ProductSelection = ({ product }) => {
  const burqas = [
    {
      id: "nude",
      name: "নুড বোরকা",
      price: product.price,
      originalPrice: 900,
      image: product.images[0],
    },
    {
      id: "black",
      name: "কালো বোরকা",
      price: product.price,
      originalPrice: 900,
      image: product.images[1],
    },
    {
      id: "green",
      name: "জলপাই বোরকা",
      price: product.price,
      originalPrice: 900,
      image: product.images[2],
    },
    {
      id: "maroon",
      name: "মেরুন বোরকা",
      price: product.price,
      originalPrice: 900,
      image: product.images[3],
    },
  ];

  const { selectedBurqas, setSelectedBurqas } = useSelectedBurqas();

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

  console.log(selectedBurqas);

  const handleChange = (id, field, value) => {
    setSelectedBurqas((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = {
            ...item,
            [field]: field === "quantity" ? parseInt(value) || 1 : value,
          };
          const hijabCost = updated.hijab === "with" ? 200 : 0;
          updated.finalPrice = updated.basePrice * updated.quantity + hijabCost;
          return updated;
        }
        return item;
      })
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">পছন্দের পোশাটি সিলেক্ট করুন</h1>

      {burqas.map((burqa) => {
        const isSelected = selectedBurqas.find((item) => item.id === burqa.id);
        const currentData = selectedBurqas.find((item) => item.id === burqa.id);

        return (
          <div
            key={burqa.id}
            className={`border p-4 mb-4 rounded ${
              isSelected ? "border-green-500" : "border-gray-300"
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                name="burqa"
                value={burqa.id}
                checked={isSelected}
                onChange={() => handleSelect(burqa.id)}
                className="mr-2"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{burqa.name}</h2>
                <p className="text-gray-500 line-through">
                  {burqa.originalPrice} ৳
                </p>
                <p className="text-green-500">{burqa.price} ৳</p>

                {isSelected && currentData && (
                  <div className="mt-4">
                    <div className="flex items-center mb-2">
                      <label className="mr-2">সাইজ:</label>
                      <select
                        value={currentData.size}
                        onChange={(e) =>
                          handleChange(burqa.id, "size", e.target.value)
                        }
                        className="border p-2"
                      >
                        <option value="50">50</option>
                        <option value="52">52</option>
                        <option value="54">54</option>
                        <option value="56">56</option>
                      </select>
                    </div>
                    <div className="flex items-center mb-2">
                      <label className="mr-2">হিজাব:</label>
                      <select
                        value={currentData.hijab}
                        onChange={(e) =>
                          handleChange(burqa.id, "hijab", e.target.value)
                        }
                        className="border p-2"
                      >
                        <option value="without">হিজাব ছাড়া</option>
                        <option value="with">হিজাব সহ</option>
                      </select>
                    </div>
                    <div className="flex items-center mb-2">
                      <label className="mr-2">পরিমাণ:</label>
                      <input
                        type="number"
                        value={currentData.quantity}
                        onChange={(e) =>
                          handleChange(burqa.id, "quantity", e.target.value)
                        }
                        className="border p-2 w-16"
                        min="1"
                      />
                    </div>
                    <p className="text-green-600 font-medium mt-2">
                      মোট দাম: {currentData.finalPrice} ৳
                    </p>
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
  );
};

export default ProductSelection;
