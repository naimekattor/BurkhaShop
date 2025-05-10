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

    // Convert files to Base64
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
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
      <input
        placeholder="Product Title"
        className="input mb-2"
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
      />
      <input
        placeholder="Price"
        className="input mb-2"
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      <input
        placeholder="Stock"
        className="input mb-2"
        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
      />
      <input
        type="datetime-local"
        className="input mb-2"
        onChange={(e) => setProduct({ ...product, countdown: e.target.value })}
      />
      <input
        type="file"
        multiple
        className="mb-2"
        onChange={handleImageUpload}
      />
      <div className="flex gap-2 flex-wrap mb-4">
        {product.images.map((img, idx) => (
          <Image
            width={80}
            height={80}
            key={idx}
            src={img}
            alt={`Preview ${idx}`}
            className="w-20 h-20 object-cover rounded border"
          />
        ))}
      </div>
      <button
        onClick={saveProduct}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Product
      </button>
    </div>
  );
}
