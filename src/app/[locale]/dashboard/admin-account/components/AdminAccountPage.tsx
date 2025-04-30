"use client";
import React from "react";
import DeviceCard from "./DeviceCard";
import WindowsIconSvg from "../svgs/WindowsIconSvg";
import MacOsSvg from "../svgs/MacOsSvg";
import Iphone15Svg from "../svgs/Iphone15Svg";

const AdminAccountPage = () => {
  const devices = [
    {
      icon: <WindowsIconSvg />,
      deviceName: "Chrome (Windows)",
      lastAccess: "2024-09-24 12:41:55",
      location: "Quito, Ecuador",
    },
    {
      icon: <MacOsSvg />,
      deviceName: "Chrome (MacOS)",
      lastAccess: "2024-09-24 12:41:55",
      location: "Quito, Ecuador",
    },
    {
      icon: <Iphone15Svg />,
      deviceName: "Safari (iPhone 15)",
      lastAccess: "2024-09-24 12:41:55",
      location: "Quito, Ecuador",
    },
  ];

  return (
    <div className="">
      <h1 className="text-black font-semibold text-2xl mb-4">
        Mis dispositivos
      </h1>
      <div className="mb-4 xl:w-6/12 w-full">
        <p className="text-[#5D5D5D] mb-4 bg-[#FAFAFA] p-4 rounded-2xl text-center">
          Visualiza los dispositivos que han accedido recientemente con tu ID de
          ingreso
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 w-full  xl:w-8/12">
        {devices.map((device, index) => (
          <DeviceCard
            key={index}
            icon={device.icon}
            deviceName={device.deviceName}
            lastAccess={device.lastAccess}
            location={device.location}
            onSignOut={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminAccountPage;
