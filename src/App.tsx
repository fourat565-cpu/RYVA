import { createContext, useContext, useState, useEffect } from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useLocation 
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import AIStylist from "./pages/AIStylist";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";

import logoImage from "./assets/images/mnt/data/logo.png";

// Context for global state
const AppContext = createContext<any>(null);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Artificial load for cinematic intro
    const timer = setTimeout(() => setIsLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[100]">
        <div className="relative">
          <img 
            src={logoImage} 
            alt="RYVA" 
            className="w-32 h-auto animate-pulse brightness-200"
          />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/20">
            <div className="h-full bg-white animate-progress w-full transform origin-left"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/ai-stylist" element={<AIStylist />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      
      {/* Premium Floating Concierge */}
      <motion.button 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-16 h-16 luxury-glass rounded-full flex items-center justify-center z-50 group hover:bg-white hover:text-black transition-all"
      >
        <div className="absolute -top-12 right-0 bg-white text-black px-4 py-2 text-[8px] tracking-widest uppercase font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat with Concierge
        </div>
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </motion.button>

      <div className="custom-cursor hidden md:block" id="cursor"></div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  return (
    <AppContext.Provider value={{ cart, setCart, user, setUser }}>
      <Router>
        <AppContent />
      </Router>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
