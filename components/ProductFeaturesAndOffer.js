"use client";
import { useProductContext } from "@/context/ProductContext";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
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

const ProductFeaturesAndOffer = () => {
  const { products, loading } = useProductContext();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Ensure hooks are called unconditionally
  const lastIndex = products.length - 1;
  const product = products[lastIndex] || {};
  const targetDate = product.countdown
    ? new Date(product.countdown).getTime()
    : null;

  const getTimeRemaining = useCallback(() => {
    if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const now = new Date().getTime();
    const difference = targetDate - now;

    const total = Math.max(difference, 0);

    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    return { days, hours, minutes, seconds };
  }, [targetDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [getTimeRemaining]);

  // Handle loading or empty products array
  if (loading) {
    return <p>Loading products...</p>;
  }

  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  const features = [
    "লাক্সারি মৌমোচা জর্জেট ফেব্রিক",
    "ফ্রি সাইজ সবার জন্য পারফেক্ট",
    'সামনে ৫২", পিছনে ৫৬"',
    'নিকাব লেনথ ৩২", ঘের ১৮০"',
    "সম্পূর্ণ শরীয়াহ্ সম্মত খিমার!",
    "গরম লাগবেনা, ইলাস্টিক সিস্টেম হাতা সাথে ম্যাচিং করা লেজ, বাধার ফিতাও আছে!",
  ];

  return (
    <div className="max-w-[500px] mx-auto bg-[#f0f0f0] p-[15px_32px]">
      {/* Features Section */}
      <div className="py-[20px]">
        <h2 class="text-center font-bold text-[24px] text-black mb-[20px]">
          আমাদের খিমারের বৈশিষ্ট্য
        </h2>
        <div className="flex flex-col mb-[20px] gap-[12px]">
          {features.map((list, index) => (
            <div class="flex items-start gap-[10px] mb-[25px]" key={index}>
              <span className="text-[#f44336] text-[20px] ">
                <MdOutlineCheckCircleOutline />
              </span>
              <span className="text-[16px] text-black leading-[1.4]">
                {list}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div class="max-w-[500px] text-center mx-auto mb-[20px] bg-[#f0f0f0] p-[20px]">
        <h2 class="font-bold text-[20px] text-black mb-[10px]">
          যেকোনো প্রয়োজনে কল করুন
        </h2>
        <div class="text-[32px] font-bold text-red-500 mb-[15px]">
          01835481636
        </div>
        <a
          href="tel:01884314771"
          class="inline-flex items-center justify-center text-white font-sans text-[18px] font-bold gap-[8px] bg-red-500 no-underline px-[30px] py-[12px] rounded-[4px] transition duration-300"
        >
          <span>
            <FiPhoneCall />
          </span>
          01884314771
        </a>
      </div>

      {/* Limited Time Offer Section */}
      <div className="text-center mx-auto my-[20px] bg-white p-[20px] border-2 border-solid border-red-500 rounded-[8px]">
        <h3 className="font-bold text-[24px] text-black mb-[15px]">
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
      {/* <div>
        <Image
          src="/images/poster.webp"
          alt="poster"
          width={500}
          height={725}
        />
      </div> */}
    </div>
  );
};

export default ProductFeaturesAndOffer;
