"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerIcon from "../icons/Hamburger";

interface NavLinkProps {
  href: string;
  text: string;
  pathname: string;
  mobile?: boolean;
}

const NavLink = ({ href, text, pathname, mobile = false }: NavLinkProps) => {
  const isActive = pathname === href;
  const activeClass = isActive
    ? "text-slate-700 font-semibold"
    : "text-slate-600 hover:text-slate-700";
  const baseClass = mobile ? "block py-2 text-lg" : "text-sm font-medium";

  return (
    <Link
      href={href}
      className={`${baseClass} ${activeClass} transition-colors`}
    >
      {text}
    </Link>
  );
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-slate-800 tracking-wide"
        >
          RXplorer
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink
            href="/?favorites=true"
            text="Favorites"
            pathname={pathname}
          />
          <NavLink href="/about" text="About" pathname={pathname} />
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-500 hover:text-slate-600 focus:outline-none"
          >
            <HamburgerIcon isMobileMenuOpen={isMobileMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-white border-t border-gray-200`}
      >
        <div className="flex flex-col space-y-2 p-4">
          <NavLink
            href="/?favorites=true"
            text="Favorites"
            pathname={pathname}
            mobile
          />
          <NavLink href="/about" text="About" pathname={pathname} mobile />
        </div>
      </div>
    </nav>
  );
};

export default Header;
