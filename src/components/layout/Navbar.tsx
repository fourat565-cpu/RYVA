import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Heart, Search, Menu, X, ArrowRight } from "lucide-react";
import { useApp } from "../../App";
import { Logo } from "../ui/Logo";
import { PRODUCTS } from "../../constants/products";

function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] luxury-glass backdrop-blur-2xl px-6 pt-40"
    >
      <button onClick={onClose} className="absolute top-12 right-12 text-white/40 hover:text-white">
        <X size={32} />
      </button>
      
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="relative">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={32} />
          <input 
            autoFocus
            type="text"
            placeholder="SEARCH PRODUCTS, COLLECTIONS, ARCHIVES..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 pb-8 pl-16 text-4xl md:text-6xl font-display uppercase tracking-tighter focus:outline-none focus:border-white transition-all placeholder:text-white/5"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {query && results.length > 0 ? (
            <div className="space-y-6">
              <h4 className="text-[10px] tracking-[0.4em] uppercase font-black text-white/20">Recommendations</h4>
              <div className="space-y-4">
                {results.map(p => (
                  <Link 
                    key={p.id} 
                    to={`/product/${p.id}`} 
                    onClick={onClose}
                    className="flex items-center gap-6 group"
                  >
                    <div className="w-16 h-20 bg-white/5 overflow-hidden">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all" />
                    </div>
                    <div>
                      <h5 className="text-xl font-display tracking-tight uppercase group-hover:italic">{p.name}</h5>
                      <p className="text-[10px] tracking-[0.2em] font-black uppercase text-white/20">{p.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : query ? (
            <div className="flex flex-col items-start gap-4">
              <p className="text-white/40 uppercase tracking-widest text-sm font-light">No artifacts found matching your aura.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <h4 className="text-[10px] tracking-[0.4em] uppercase font-black text-white/20">Trending Vaults</h4>
              <div className="flex flex-col gap-4 text-2xl font-display uppercase tracking-tighter">
                <Link to="/shop?category=streetwear" onClick={onClose} className="hover:italic flex items-center gap-4 group">STREETWEAR <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link>
                <Link to="/shop?category=old-money" onClick={onClose} className="hover:italic flex items-center gap-4 group">OLD MONEY <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link>
                <Link to="/shop?category=limited" onClick={onClose} className="hover:italic flex items-center gap-4 group">LIMITED <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useApp();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "luxury-glass py-4 shadow-xl" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        {/* Left: Collections */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium">
          <Link to="/shop?category=streetwear" className="hover:text-white/60 transition-colors">Streetwear</Link>
          <Link to="/shop?category=old-money" className="hover:text-white/60 transition-colors">Old Money</Link>
          <Link to="/shop?category=sportswear" className="hover:text-white/60 transition-colors">Sportswear</Link>
        </div>

        {/* Center: Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <Logo size="md" className="brightness-200" />
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:block hover:text-white/60 transition-colors"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link to="/ai-stylist" className="hidden xl:block text-[10px] bg-white text-black px-4 py-1.5 rounded-full font-bold hover:bg-white/80 transition-all tracking-wider">AI STYLIST</Link>
          <Link to="/wishlist" className="hover:text-white/60 transition-colors relative">
            <Heart size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/auth" className="hover:text-white/60 transition-colors">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/cart" className="hover:text-white/60 transition-colors relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </Link>
          <button 
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 bg-black z-40 lg:hidden pt-24 px-8"
          >
            <div className="flex flex-col gap-8 text-3xl font-display uppercase tracking-tighter">
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/shop" onClick={() => setIsOpen(false)}>Collections</Link>
              <Link to="/ai-stylist" onClick={() => setIsOpen(false)}>AI Stylist</Link>
              <Link to="/about" onClick={() => setIsOpen(false)}>About RYVA</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
            <div className="absolute bottom-12 left-8 text-white/40 text-sm tracking-widest uppercase">
              Rule the Aura
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        )}
      </AnimatePresence>
    </nav>
  );
}
