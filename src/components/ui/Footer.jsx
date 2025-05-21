import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-8 border-t-4 border-blue-600">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-lg mb-2">
            Made with <span className="text-amber-400">❤️</span> by Nitish
            Bytaru © {new Date().getFullYear()}
          </p>
          <p className="text-gray-400">
            Full Stack Developer | <span className="text-blue-400">React</span>{" "}
            | <span className="text-amber-400">Node.js</span> |{" "}
            <span className="text-blue-400">Python</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
