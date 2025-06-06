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
        <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-gray-200">
          <Image
            src={image}
            alt={title ?? ""}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <p className="text-sm font-semibold text-gray-900">{price} USD</p>
      </div>
    </div>
  );
};

export default OrderDetails;
