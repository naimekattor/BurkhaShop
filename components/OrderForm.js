"use client";
import { useSelectedBurqas } from "@/context/SelectedProductsContext";
import React, { useState } from "react";

const OrderForm = () => {
  const { selectedBurqas, setSelectedBurqas } = useSelectedBurqas();
  const [location, setLocation] = useState("insideDhaka");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const address = e.target.address.value;
    const phone = e.target.phone.value;
    const deliveryArea = e.target.deliveryArea.value;

    const trimmedPhone = phone.trim();

    // Updated regex for Bangladeshi mobile numbers
    const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

    if (!bdPhoneRegex.test(trimmedPhone)) {
      setPhoneError(
        "সঠিক বাংলাদেশি ফোন নাম্বার দিন (যেমন: 017xxxxxxxx বা +88017xxxxxxxx)"
      );
      return;
    }

    setPhoneError("");

    // Proceed with form submission
    console.log("✅ Valid phone number. Proceeding with submission...");

    // order data send to google sheet

    const orderData = {
      name,
      address,
      phone,
      location,
      deliveryArea,
      selectedBurqas,
      totalPrice: selectedBurqas.reduce(
        (total, item) => total + Number(item.finalPrice),
        0
      ),
      deliveryCharge: location === "insideDhaka" ? 60 : 150,
      grandTotal: selectedBurqas.reduce(
        (total, item) => total + Number(item.finalPrice),
        location === "insideDhaka" ? 60 : 150
      ),
      orderTime: new Date().toLocaleString("en-BD", { timeZone: "Asia/Dhaka" }),
    };

    try {
      const response = await fetch(
        "/api/https://script.google.com/macros/s/AKfycbzf37Ef43KmJHE0aiQ5fGBPcQnKQD0ExYdCvUWIu-JWospDzvsvUcs4T4n8o6efd2Pn/exec",
        {
          method: "POST",
          body: JSON.stringify(orderData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (result.result === "success") {
        alert("অর্ডার সফলভাবে গ্রহণ করা হয়েছে!");
        setSelectedBurqas([]); // optional: clear selection
      } else {
        alert("অর্ডার প্রক্রিয়া ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("নেটওয়ার্ক সমস্যার কারণে অর্ডার সাবমিট হয়নি।");
    }
  };

  return (
    <div className="max-w-[500px] mx-auto px-[20px]">
      <form onSubmit={handleSubmit} className="p-2">
        <h2 className="font-bold text-[22px] text-black text-center mb-[20px]">
          অর্ডার ফর্ম
        </h2>
        <div className="mb-4">
          <label htmlFor="name" className="text-[15px] text-[#333333]">
            নাম<span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="আপনার নাম লিখুন"
            required=""
            className="w-full text-[14px] text-gray-700 p-[8px_12px] border border-solid border-gray-300 rounded-[8px]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="text-[15px] text-[#333333]">
            ঠিকানা<span className="required">*</span>
          </label>
          <textarea
            id="address"
            placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
            required=""
            className="w-full text-[14px] text-gray-700 p-[8px_12px] border border-solid border-gray-300 rounded-[8px]"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="text-[15px] text-[#333333]">
            ফোন নাম্বার<span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="আপনার ফোন নাম্বার লিখুন"
            required=""
            className="w-full text-[14px] text-gray-700 p-[8px_12px] border border-solid border-gray-300 rounded-[8px]"
          />
        </div>
        <div className="">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="deliveryArea"
          >
            ডেলিভারি এরিয়া *
          </label>
          <div className="bg-white border border-solid border-gray-300 rounded-[8px] overflow-hidden">
            <div
              className={`py-[20px] px-[14px] ${
                location === "insideDhaka" ? "bg-[#f8f8f8]" : ""
              }`}
            >
              <input
                className="mr-2 leading-tight w-[18px] h-[18px] border border-gray-300 rounded-full peer-checked:bg-green-500"
                type="radio"
                id="insideDhaka"
                name="deliveryArea"
                value="insideDhaka"
                defaultChecked
                onChange={() => setLocation("insideDhaka")}
              />
              <label className="text-gray-700 " htmlFor="insideDhaka">
                ঢাকা সিটির ভিতরে (৬০ টাকা)
              </label>
            </div>
            <div
              className={`flex items-center py-[20px] px-[14px] ${
                location === "outsideDhaka" ? "bg-[#f8f8f8]" : ""
              }`}
            >
              <input
                className="mr-2 leading-tight w-[18px] h-[18px] text-green-500 cursor-pointer focus:ring-green-500"
                type="radio"
                id="outsideDhaka"
                name="deliveryArea"
                value="outsideDhaka"
                onChange={() => setLocation("outsideDhaka")}
              />
              <label className="text-gray-700 " htmlFor="outsideDhaka">
                ঢাকা সিটির বাইরে (১৫০ টাকা)
              </label>
            </div>
          </div>
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            সাইজ *
          </label>
          <div className="bg-white border border-solid border-gray-300 rounded-[8px] overflow-hidden">
            <div className="py-[10px] px-[14px]">
              <input
                className="mr-2 leading-tight"
                type="radio"
                id="size18"
                name="size"
                value="18/18"
              />
              <label className="text-gray-700" htmlFor="size18">
                18/18
              </label>
            </div>
            <div className="py-[10px] px-[14px]">
              <input
                className="mr-2 leading-tight"
                type="radio"
                id="colorGreen"
                name="color"
                value="green"
              />
              <label className="text-gray-700" htmlFor="colorGreen">
                সবুজ (Green)
              </label>
            </div>
          </div>
        </div> */}
        {/* order summary */}
        {/* <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">অর্ডার সামারি</h2>
          <p className="text-gray-700">
            নির্বাচিত পণ্য:{" "}
            {selectedBurqas.length > 0 ? (
              <div>
                {selectedBurqas.map((burqa, index) => (
                  <p key={index}>
                    <span>{burqa.name}</span> - সাইজ: <span>{burqa.size}</span>{" "}
                    - <span>{burqa.hijab}হিজাব</span> -{" "}
                    <span>{burqa.quantity}টি</span> - ৳
                    <span>{burqa.finalPrice}</span>
                  </p>
                ))}
              </div>
            ) : (
              <span className="font-bold">কোনো পণ্য নির্বাচন করা হয়নি</span>
            )}
          </p>
          <p className="text-gray-700">
            মোট মূল্য:{" "}
            <span className="font-bold">
              ৳{" "}
              {selectedBurqas.reduce(
                (total, item) => total + Number(item.finalPrice),
                0
              )}
            </span>
          </p>
          <p className="text-gray-700">
            ডেলিভারি চার্জ:{" "}
            <span className="font-bold">
              ৳{location === "insideDhaka" ? 60 : 150}
            </span>
          </p>
          <p className="text-gray-700">
            সর্বমোট:{" "}
            <span className="font-bold">
              ৳{" "}
              {selectedBurqas.reduce(
                (total, item) => total + Number(item.finalPrice),
                location === "insideDhaka" ? 60 : 150
              )}
            </span>
          </p>
        </div> */}
        <div class="bg-gray-100 border border-solid border-gray-300 rounded-[4px] my-[20px]">
          <div class="text-[15px] text-gray-700 flex items-center bg-gray-200 p-[10px_15px] border-b border-gray-300 gap-[8px]">
            <span className="not-sr-only font-normal text-[inherit] leading-[1] antialiased"></span>
            <i class="ti ti-shopping-cart"></i>
            অর্ডার সামারি
          </div>
          <div class="p-[15] bg-[#ffffff]">
            <div class="flex justify-between text-[14px] text-gray-700 py-[10px] border-b border-gray-200">
              <span>নির্বাচিত দ্রব্য:</span>
            </div>

            <div
              class="text-[12px] text-[#333333] bg-white py-[10px] px-[4px] my-[8px]"
              id="selectedProductDetails"
            >
              {selectedBurqas.length > 0 ? (
                <div>
                  {selectedBurqas.map((burqa, index) => (
                    <div
                      class=" text-[#333333] text-[12px] py-[8px]"
                      key={index}
                    >
                      {burqa.name} - {burqa.quantity}টি - ৳{burqa.finalPrice}
                    </div>
                  ))}
                </div>
              ) : (
                <span className="font-bold">কোনো পণ্য নির্বাচন করা হয়নি</span>
              )}
            </div>
            <div class=" flex justify-between text-[14px] text-[#333333] py-[10px] border-b-[1px] border-[#eeeeee]">
              <span>মোট মূল্য:</span>
              <span class="total-price">
                ৳
                {selectedBurqas.reduce(
                  (total, item) => Number(total) + Number(item.finalPrice),
                  0
                )}
              </span>
            </div>
            <div class=" flex justify-between text-[14px] text-[#333333] py-[10px] border-b-[1px] border-[#eeeeee]">
              <span>ডেলিভারি চার্জ:</span>
              <span class="delivery-charge">
                ৳{location == "insideDhaka" ? 60 : 150}
              </span>
            </div>
            <div class=" flex justify-between text-[16px] text-[#333333] py-[10px] border-t-[2px] border-[#eeeeee] mt-[10px] pt-4 font-medium ">
              <span className="font-[600] text-[16px]">সর্বমোট:</span>
              <span class="font-black text-[18px] text-[#00887b]">
                ৳
                {selectedBurqas.reduce(
                  (total, item) => total + Number(item.finalPrice),
                  location === "insideDhaka" ? 60 : 150
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full p-[10] bg-[#fff3cd] text-center my-4">
          <span className="text-center border-none rounded-[4px] text-[#856404] text-[14px]">
            দয়া করে সকল তথ্য পূরণ করুন
          </span>
        </div>
        <button
          disabled={selectedBurqas.length === 0} // Disable if no items are selected
          className={`p-4 w-full rounded text-[18px] text-white  ${
            selectedBurqas.length > 0
              ? "cursor-pointer bg-[#f44336]"
              : "cursor-not-allowed bg-[#666666]"
          }`}
        >
          অর্ডার কনফার্ম করুন
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
