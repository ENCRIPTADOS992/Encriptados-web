import React from "react";

interface RegionIconProps {
    size?: number;
    className?: string;
    color?: string;
}

export const RegionIcon: React.FC<RegionIconProps> = ({ size = 24, className = "", color = "#3393F7" }) => {
    return (
        <span
            className={`rounded-full flex items-center justify-center bg-white ${className}`}
            style={{ width: size, height: size }}
        >
            <svg viewBox="0 0 24 24" width={size * 0.8} height={size * 0.8} fill="none">
                <circle cx="12" cy="12" r="10.5" stroke={color} strokeWidth="1.5" />
                <path
                    d="M6.5 10.5l1.2-.6 1 .5v1l1 1 .4 1.4-.3 1.2 1.4.6.5 1 .9.4h1l.4-1v-1l1-1 .5-1 .5-.5 1 .5h1l1-1v-1l-.5-1-.5-.5H17l-.5-1 .4-.9v-1l-1-.5-1 .5-.5 1-1 .5h-1l-1-.5-.5-1-1-.5-1 .5-.5 1-.5.5-.5 1z"
                    fill={color}
                />
            </svg>
        </span>
    );
};
