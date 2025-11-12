import React from "react";

interface CarryGoIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const CarryGoIcon: React.FC<CarryGoIconProps> = ({
  size = 32,
  color = "#FFFFFF",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      width={size}
      height={size}
      className={className}
    >
      {/* Outer C shape */}
      <path
        d="M48 20C48 14.4772 43.5228 10 38 10H26C17.1634 10 10 17.1634 10 26V38C10 46.8366 17.1634 54 26 54H38C43.5228 54 48 49.5228 48 44"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arrow inside the C */}
      <path
        d="M36 32H54M46 24L54 32L46 40"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
