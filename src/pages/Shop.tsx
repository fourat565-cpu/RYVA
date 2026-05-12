import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal, Search } from "lucide-react";
import { PRODUCTS } from "../constants/products";
import { Logo } from "../components/ui/Logo";

const CATEGORIES = ["ALL", "STREETWEAR", "OLD MONEY", "SPORTSWEAR", "LIMITED"];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [activeCategory, setActiveCategory] = useState(categoryParam?.toUpperCase() || "ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam.toUpperCase());
    } else {
      setActiveCategory("ALL");
    }
  }, [categoryParam]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "ALL") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat.toLowerCase() });
    }
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === "ALL" || p.category.toUpperCase() === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 min-h-screen px-6 max-w-[1400px] mx-auto pb-24"
    >
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <div className="space-y-4">
          <h1 className="text-7xl font-display tracking-tighter leading-none uppercase">THE <br /> COLLECTION</h1>
          <p className="text-white/40 text-sm tracking-widest font-light uppercase">Discover the intersection of culture and heritage</p>
        </div>
        
        <div className="w-full md:w-96 relative group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH CAPSULE..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-xs tracking-widest focus:outline-none focus:border-white transition-all uppercase"
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-8 mb-16 border-y border-white/5 py-6">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-[10px] tracking-[0.3em] font-bold transition-all whitespace-nowrap ${activeCategory === cat ? "text-white underline underline-offset-8" : "text-white/30 hover:text-white/60"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-6">
           <button className="flex items-center gap-2 text-[10px] tracking-widest font-bold text-white/40 hover:text-white">
             <SlidersHorizontal size={14} /> FILTER
           </button>
           <button className="flex items-center gap-2 text-[10px] tracking-widest font-bold text-white/40 hover:text-white">
             SORT BY: NEWEST
           </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProducts.map((product) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={product.id} 
              className="group cursor-pointer"
            >
              <Link to={`/product/${product.id}`}>
                <div className="aspect-[3/4] bg-white/5 overflow-hidden mb-6 relative">
                  {/* Static */}
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 grayscale opacity-80 group-hover:opacity-0"
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover */}
                  <img 
                    src={product.images[1] || product.images[0]} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Brand Watermark */}
                  <div className="absolute top-4 left-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500 luxury-glass px-3 py-1.5 pt-2 z-10">
                    <Logo size="sm" className="brightness-200" />
                  </div>

                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  
                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <button className="w-full bg-white text-black py-4 text-[10px] font-black tracking-widest uppercase hover:bg-white/90">
                      EXPLORE ARCHIVE
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-display tracking-tighter uppercase mb-1">{product.name}</h3>
                    <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-bold">{product.tagline}</p>
                  </div>
                  <span className="text-xl font-serif">{product.price} TND</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

