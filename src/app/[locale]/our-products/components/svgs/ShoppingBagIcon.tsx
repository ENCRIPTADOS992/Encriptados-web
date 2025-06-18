import React from "react";

const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <path d="M18 7h-3V6a3 3 0 0 0-6 0v1H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-7-1a1 1 0 0 1 2 0v1h-2V6zm6 13H7V9h2v1.5a1 1 0 0 0 2 0V9h2v1.5a1 1 0 0 0 2 0V9h2v10z" />
  </svg>
);

export default ShoppingBagIcon;
