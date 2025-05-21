import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Footer from "./components/ui/Footer";
import Navbar from "./components/ui/Navbar";
import AgroGuide from "./projects/AgroGuide";
import EchoRealm from "./projects/EchoRealm";
import ExpenseTracker from "./projects/ExpenseTracker";
import RecipeHeaven from "./projects/RecipeHeaven";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1e40af",
              color: "#fff",
            },
            success: {
              style: {
                background: "#065f46",
              },
            },
            error: {
              style: {
                background: "#991b1b",
              },
            },
          }}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/agroguide" element={<AgroGuide />} />
            <Route path="/projects/echorealm" element={<EchoRealm />} />
            <Route
              path="/projects/expensetracker"
              element={<ExpenseTracker />}
            />
            <Route path="/projects/recipeheaven" element={<RecipeHeaven />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
