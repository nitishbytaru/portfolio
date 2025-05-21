import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full bg-black z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg py-2 border-b border-gray-800" : " py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
        >
          <span className="text-amber-400">Nitish's </span>
          Portfolio
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
