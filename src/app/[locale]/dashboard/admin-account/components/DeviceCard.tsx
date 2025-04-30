"use client";
import { ReactNode } from "react";

interface DeviceStatusProps {
  deviceName: string;
  lastAccess: string;
  location: string;
  icon: ReactNode;
  onSignOut: () => void;
}

export default function DeviceCard({
  deviceName = "iPhone 15",
  lastAccess = "2024-09-24 12:41:55",
  location = "Quito, Ecuador",
  icon,
  onSignOut = () => console.log("Sign out clicked"),
}: DeviceStatusProps) {
  return (
    <div className="bg-white border-b rounded-xl sm:rounded-xl sm:shadow-md sm:border-none border-[#E5E7EB] last:border-b-0 p-4 sm:p-6 w-full cursor-pointer">
      <div className="flex items-start sm:items-center sm:flex-col gap-4 sm:gap-y-3">
        <div className="bg-[#F3F9FF] sm:bg-blue-100 p-3 sm:p-4 rounded-lg sm:rounded-full flex-shrink-0">
          {icon}
        </div>
        <div className="flex-grow sm:flex sm:flex-col sm:items-center">
          <h2 className="text-base sm:text-xl font-medium sm:font-bold text-black mb-1 sm:mb-2 sm:text-center">
            {deviceName}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1 sm:text-center">
            Últ. Acceso: {lastAccess}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4 sm:text-center">
            {location}
          </p>
          <button
            onClick={onSignOut}
            className="text-red-500 text-xs sm:text-sm font-medium hover:text-red-600 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
