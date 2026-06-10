import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ProjectDetails from "./pages/ProjectDetails";
import { ThemeProvider } from "./context/ThemeContext";

/* Page transition wrapper — fades in content on route change */
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("animate-fade-in");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("opacity-0");
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("animate-fade-in");
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  return (
    <div
      className={`${transitionStage} transition-opacity duration-200`}
      style={{ animationFillMode: "both" }}
    >
      {children}
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-text transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <PageTransition>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
