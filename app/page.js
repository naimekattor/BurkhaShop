"use client";
import { useEffect, useState } from "react";
import ImageGallery from "../components/ImageGallery";
import ProductDisplay from "@/components/ProductDisplay";
import ProductFeaturesAndOffer from "@/components/ProductFeaturesAndOffer";
import ProductSelection from "@/components/ProductSelection";
import OrderForm from "@/components/OrderForm";

export default function Home() {
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState({ name: "", phone: "" });

  useEffect(() => {
    const data = localStorage.getItem("productData");
    if (data) {
      setProduct(JSON.parse(data));
    }
  }, []);

  const submitOrder = async () => {
    const payload = {
      ...order,
      product: product.title,
      price: product.price,
    };

    await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    alert("Order placed!");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      {/* <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-lg mb-2">Price: ৳{product.price}</p>
        <p className="text-md mb-2">Stock: {product.stock}</p>

        <ImageGallery images={product.images} />

        <div className="mt-6 space-y-3">
          <input
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            onChange={(e) => setOrder({ ...order, name: e.target.value })}
          />
          <input
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
            onChange={(e) => setOrder({ ...order, phone: e.target.value })}
          />
          <button
            onClick={submitOrder}
            className="w-full bg-green-600 text-white p-2 rounded"
          >
            Place Order
          </button>
        </div>
      </div> */}
      <ProductDisplay product={product} />
      <ProductFeaturesAndOffer product={product} />
      <ProductSelection product={product} />
      <OrderForm />
    </>
  );
}
