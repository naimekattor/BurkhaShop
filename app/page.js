"use client";
import { useEffect, useState } from "react";
import ImageGallery from "../components/ImageGallery";
import ProductDisplay from "@/components/ProductDisplay";
import ProductFeaturesAndOffer from "@/components/ProductFeaturesAndOffer";
import ProductSelection from "@/components/ProductSelection";
import OrderForm from "@/components/OrderForm";

// Default product data (fallback)
const defaultProductData = {
  title: "ডিফল্ট প্রোডাক্ট",
  discount: "২৫%",
  price: "৭৫০ ৳",
  images: [
    "/images/black.webp",
    "/images/jolpai.webp",
    "/images/merun.webp",
    "/images/nude.webp",
  ],
  rating: 4,
  reviewCountText: "(ডিফল্ট রেটিং)",
  satisfiedCustomersText: "১০০০+ কাস্টমার সন্তুষ্ট",
  moreColorsText: "মাত্র কয়েকটি বোরকা বাকি আছে!",
  orderButtonText: "অর্ডার করুন",
  countdown: "2025-12-31T23:59:59",
};

export default function Home() {
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState({ name: "", phone: "" });

  useEffect(() => {
    const data = localStorage.getItem("productData");
    if (data) {
      setProduct(JSON.parse(data));
    } else {
      setProduct(defaultProductData); // Use fallback data if no product data is found
    }
  }, []);

  const submitOrder = async () => {
    const payload = {
      ...order,
      product: product.title,
      price: product.price,
    };

    await fetch(
      "https://script.google.com/macros/s/AKfycbwk46LESO1ESxwO81NDECMu-o_0_WFasUWyLqFG7NQ0bxYZjVUBjwwhdh4aC8I6Hh8/exec",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }
    );

    alert("Order placed!");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <ProductDisplay
        product={product}
        defaultProductData={defaultProductData}
      />
      <ProductFeaturesAndOffer
        product={product}
        defaultProductData={defaultProductData}
      />
      <ProductSelection product={product} />
      <OrderForm />
    </>
  );
}
