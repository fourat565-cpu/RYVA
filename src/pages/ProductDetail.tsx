import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Share2, ArrowLeft, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { useApp } from "../App";
import { PRODUCTS } from "../constants/products";
import { Logo } from "../components/ui/Logo";

export default function ProductDetail() {
  const { id } = useParams();
  const { setCart } = useApp();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [activeImage, setActiveImage] = useState(0);

  const addToCart = () => {
    setCart((prev: any) => [...prev, { ...product, selectedSize, image: product.images[0] }]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen"
    >
      <Link to="/shop" className="flex items-center gap-2 text-[10px] tracking-widest font-black uppercase text-white/40 hover:text-white transition-all mb-12">
        <ArrowLeft size={14} /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Images Column */}
        <div className="lg:col-span-1 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible no-scrollbar">
          {product.images.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setActiveImage(i)}
              className={`w-20 aspect-[3/4] flex-shrink-0 border transition-all ${activeImage === i ? "border-white" : "border-white/10 hover:border-white/40"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>

        {/* Hero Image */}
        <div className="lg:col-span-6 relative aspect-[3/4] bg-white/5 overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {/* Brand Watermark */}
          <div className="absolute top-8 left-8 opacity-60 luxury-glass px-4 py-2 pt-2.5 z-10">
            <Logo size="sm" className="brightness-200" />
          </div>

          <div className="absolute top-6 right-6 flex flex-col gap-4 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
             <button className="w-12 h-12 rounded-full luxury-glass flex items-center justify-center hover:bg-white hover:text-black transition-all">
               <Heart size={18} strokeWidth={1.5} />
             </button>
             <button className="w-12 h-12 rounded-full luxury-glass flex items-center justify-center hover:bg-white hover:text-black transition-all">
               <Share2 size={18} strokeWidth={1.5} />
             </button>
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
               <span className="text-[10px] tracking-[0.4em] text-white/40 font-black uppercase">{product.category}</span>
               <span className="text-2xl font-serif">{product.price} TND</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display tracking-tighter uppercase leading-none">{product.name}</h1>
          </div>

          <p className="text-white/60 text-lg font-light leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
               <span className="text-[10px] tracking-widest font-black uppercase">Select Size</span>
               <button className="text-[10px] tracking-widest font-black uppercase text-white/40 underline underline-offset-4">Size Guide</button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 flex-shrink-0 flex items-center justify-center border transition-all text-sm font-bold ${selectedSize === size ? "bg-white text-black border-white" : "border-white/10 hover:border-white/40"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button 
              onClick={addToCart}
              className="flex-1 bg-white text-black py-6 font-black tracking-[0.4em] text-[10px] uppercase hover:bg-white/90 transition-all flex items-center justify-center gap-4"
            >
              <ShoppingBag size={14} /> Add to Cart
            </button>
            <button className="flex-1 border border-white/20 py-6 font-black tracking-[0.4em] text-[10px] uppercase hover:bg-white/5 transition-all">
              Buy Now
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/40">
                <Truck size={14} />
                <span className="text-[9px] tracking-widest uppercase font-bold">Standard Delivery</span>
              </div>
              <p className="text-[10px] text-white/60">Tunis: 1-2 days. Others: 3-5 days.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/40">
                <RefreshCw size={14} />
                <span className="text-[9px] tracking-widest uppercase font-bold">Free Returns</span>
              </div>
              <p className="text-[10px] text-white/60">30-day effortless aura return policy.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

