import Image from "next/image";
import React from "react";

const ImageGallery = () => {
  return (
    <div>
      <div class="w-full max-w-[800px] box-border mx-auto my-[26px] px-[20px]">
        <Image
          src="/images/Khimar_Clickbait.webp"
          alt="Featured Khimar"
          width={760}
          height={760}
          className="w-full h-auto"
        />
      </div>
      <div class="w-full max-w-[800px] box-border mx-auto my-[26px] px-[20px]">
        <Image
          src="/images/Customer_Reviews.webp"
          alt="Featured Khimar"
          width={760}
          height={760}
          className="w-full h-auto"
        />
      </div>
      <div class="w-full max-w-[800px] box-border mx-auto my-[26px] px-[20px]">
        <Image
          src="/images/Size_Khimar.webp"
          alt="Featured Khimar"
          width={760}
          height={760}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
