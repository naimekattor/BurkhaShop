"use client";
import Image from "next/image";
import { useState } from "react";

export default function AdminPage() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    stock: "",
    countdown: "",
    images: [],
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((base64Images) => {
      setProduct({ ...product, images: [...product.images, ...base64Images] });
    });
  };

  const saveProduct = () => {
    localStorage.setItem("productData", JSON.stringify(product));
    alert("Product saved!");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🛒 Admin Product Panel
      </h2>

      <div className="space-y-4">
        <input
          placeholder="Product Title"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <input
          placeholder="Price"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          placeholder="Stock"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setProduct({ ...product, stock: e.target.value })}
        />
        <input
          type="datetime-local"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setProduct({ ...product, countdown: e.target.value })
          }
        />
        <input
          type="file"
          multiple
          className="w-full text-gray-600"
          onChange={handleImageUpload}
        />
      </div>

      {product.images.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2 text-gray-700">Image Preview</h4>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                width={80}
                height={80}
                alt={`Preview ${idx}`}
                className="w-20 h-20 object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={saveProduct}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200"
      >
        💾 Save Product
      </button>
    </div>
  );
}
