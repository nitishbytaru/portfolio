import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 px-6 bg-muted dark:bg-muted mt-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <p className="text-lg font-medium gradient-heading animate-pulse-slow">
            Made with ❤️ by Nitish Bytaru © {new Date().getFullYear()}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Full Stack Developer | React | Node.js | Python
          </p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-portfolio-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-portfolio-secondary rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
