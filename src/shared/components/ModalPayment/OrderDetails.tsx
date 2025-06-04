// src/shared/components/ModalPayment/OrderDetails.tsx
"use client";

import React from "react";
import Image from "next/image";

interface Props {
  image?: string;
  title?: string;
  price?: string;
}

const OrderDetails: React.FC<Props> = ({ image, title, price }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      {image && (
        <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-gray-700">
          <Image src={image} alt={title} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <div className="flex flex-col">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-primary">{price} USD</p>
      </div>
    </div>
  );
};

export default OrderDetails;
