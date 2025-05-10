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
        "https://script.google.com/macros/s/AKfycbwk46LESO1ESxwO81NDECMu-o_0_WFasUWyLqFG7NQ0bxYZjVUBjwwhdh4aC8I6Hh8/exec",
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
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">অর্ডার ফর্ম</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            নাম *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="আপনার নাম লিখুন"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            ঠিকানা *
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            ফোন নাম্বার *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            placeholder="আপনার ফোন নাম্বার লিখুন"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="deliveryArea"
          >
            ডেলিভারি এরিয়া *
          </label>
          <div className="flex items-center">
            <input
              className="mr-2 leading-tight"
              type="radio"
              id="insideDhaka"
              name="deliveryArea"
              value="insideDhaka"
              defaultChecked
              onChange={() => setLocation("insideDhaka")}
            />
            <label className="text-gray-700" htmlFor="insideDhaka">
              ঢাকা সিটির ভিতরে (৬০ টাকা)
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="mr-2 leading-tight"
              type="radio"
              id="outsideDhaka"
              name="deliveryArea"
              value="outsideDhaka"
              onChange={() => setLocation("outsideDhaka")}
            />
            <label className="text-gray-700" htmlFor="outsideDhaka">
              ঢাকা সিটির বাইরে (১৫০ টাকা)
            </label>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
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
              ৳{location == "insideDhaka" ? 60 : 150}
            </span>
          </p>
          <p className="text-gray-700">
            সর্বমোট:{" "}
            <span className="font-bold">
              ৳{" "}
              {selectedBurqas.reduce(
                (total, item) => total + Number(item.finalPrice),
                location == "insideDhaka" ? 60 : 150
              )}
            </span>
          </p>
        </div>
        <div className=" w-full p-[10] bg-[#fff3cd] text-center my-4">
          <span className="text-center  border-none rounded-[4px] text-[#856404] text-[14px]">
            দয়া করে সকল তথ্য পূরণ করুন
          </span>
        </div>
        <button
          disabled={selectedBurqas.length > 0 ? false : true}
          className={`p-4 w-full rounded text-[18px] text-white bg-[#f44336] cursor-pointer ${
            selectedBurqas.length > 0 ? "" : " cursor-not-allowed"
          }`}
        >
          অর্ডার কনফার্ম করুন
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
