"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className || "w-5 h-5 text-red-500"} // Default styling, can be overridden
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
);

const ProductFeaturesAndOffer = ({ product, defaultProductData }) => {
  const targetDate = new Date(
    product.countdown ? product.countdown : defaultProductData.coundown
  ).getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const total = Math.max(difference, 0);

    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const features = [
    "প্রিমিয়াম তৈরি কাপড়",
    "১০০% ডেলিভারি গ্যারান্টি",
    "লম্বা ৫০,৫২,৫৪,৫৬",
    "বডি ৪২-৫০",
    "পছন্দ না হলে ফেরত দেওয়ার সুযোগ",
  ];

  return (
    <div className="bg-gray-50 p-4 sm:p-6 md:p-8 max-w-[500px] mx-auto font-sans">
      {/* Features Section */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          আমাদের বোরকার বৈশিষ্ট্য
        </h2>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-gray-700">
              <CheckIcon className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Limited Time Offer Section */}
      <div className="border-2 border-red-500 rounded-lg p-4 sm:p-6 text-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          অফারটি সীমিত সময়ের জন্য!
        </h3>
        <div className="flex justify-center space-x-2 sm:space-x-4">
          {/* Days */}
          <div className="bg-red-500 text-white p-3 sm:p-4 rounded-md w-20 sm:w-24 flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold">
              {timeLeft.days}
            </span>
            <span className="text-xs sm:text-sm">দিন</span>
          </div>
          {/* Hours */}
          <div className="bg-red-500 text-white p-3 sm:p-4 rounded-md w-20 sm:w-24 flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold">
              {timeLeft.hours}
            </span>
            <span className="text-xs sm:text-sm">ঘন্টা</span>
          </div>
          {/* Minutes */}
          <div className="bg-red-500 text-white p-3 sm:p-4 rounded-md w-20 sm:w-24 flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold">
              {timeLeft.minutes}
            </span>
            <span className="text-xs sm:text-sm">মিনিট</span>
          </div>
          {/* Seconds */}
          <div className="bg-red-500 text-white p-3 sm:p-4 rounded-md w-20 sm:w-24 flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold">
              {timeLeft.seconds}
            </span>
            <span className="text-xs sm:text-sm">সেকেন্ড</span>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/images/poster.webp"
          alt="poster"
          width={500}
          height={725}
        />
      </div>
    </div>
  );
};

export default ProductFeaturesAndOffer;
