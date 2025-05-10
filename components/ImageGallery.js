"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImageGallery({ images = [] }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div>
      <Image
        src={activeImage}
        alt="Main"
        width={300}
        height={300}
        className="rounded border-2 mb-4"
        unoptimized // Allow Base64 images
      />
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`Image ${idx}`}
            width={100}
            height={100}
            className={`cursor-pointer rounded border-2 ${
              img === activeImage ? "border-green-500" : "border-gray-200"
            }`}
            onClick={() => setActiveImage(img)}
            unoptimized // Allow Base64 images
          />
        ))}
      </div>
    </div>
  );
}
