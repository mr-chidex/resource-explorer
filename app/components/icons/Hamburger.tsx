import React from "react";

const HamburgerIcon = ({ isMobileMenuOpen }: { isMobileMenuOpen: boolean }) => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={
          isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
        }
      />
    </svg>
  );
};

export default HamburgerIcon;
