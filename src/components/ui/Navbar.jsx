import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Theme handling
  useEffect(() => {
    setIsMounted(true);
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(savedTheme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 glass-effect shadow-lg" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold gradient-heading hover:opacity-80 transition-opacity animate-fade-in-down"
        >
          Nitish's Portfolio
        </Link>

        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm text-portfolio-primary dark:text-portfolio-accent hover:bg-white/30 dark:hover:bg-gray-700/60 transition-all duration-300 shadow-md animate-fade-in-down"
          aria-label={`Toggle ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
