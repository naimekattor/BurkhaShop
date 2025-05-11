"use client";
import { useEffect, useState } from "react";
import ImageGallery from "../components/ImageGallery";
import ProductDisplay from "@/components/ProductDisplay";
import ProductFeaturesAndOffer from "@/components/ProductFeaturesAndOffer";
import ProductSelection from "@/components/ProductSelection";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";
import { useProductContext } from "@/context/ProductContext";

export default function Home() {
  const { products, loading } = useProductContext();
  // Handle loading or empty products
  if (loading || products.length === 0) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-amber-50 z-50">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-purple-600"></div>
        <p className="text-gray-600 font-medium">Loading, please wait...</p>
      </div>
    );
  }

  return (
    <>
      <ProductDisplay />
      <ProductFeaturesAndOffer />
      <ImageGallery />
      <ProductSelection />
      <OrderForm />
      <Footer />
    </>
  );
}
