import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useApp } from "../App";

export default function Wishlist() {
  const { wishlist, setWishlist } = useApp();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 min-h-screen px-6 max-w-[1400px] mx-auto pb-24"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="space-y-4">
          <h1 className="text-7xl font-display tracking-tighter uppercase leading-none">Your <br /> <span className="italic font-serif font-light lowercase">wishlist</span></h1>
          <p className="text-white/40 text-[10px] tracking-[0.4em] font-black uppercase">Curating your future collection</p>
        </div>
        <div className="text-right">
           <p className="text-[10px] tracking-widest font-black uppercase text-white/40">{wishlist.length} Items Saved</p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-40 bg-white/5 border border-dashed border-white/10 space-y-8">
           <Heart size={48} className="mx-auto text-white/10" strokeWidth={1} />
           <p className="text-white/40 tracking-[0.2em] font-light uppercase">No treasures found in your aura archive.</p>
           <Link to="/shop" className="inline-block bg-white text-black px-12 py-5 font-black tracking-widest text-[10px] uppercase hover:bg-white/90">
             Discover Pieces
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {wishlist.map((item: any) => (
            <motion.div 
              key={item.id}
              layout
              className="space-y-8 group"
            >
              <div className="aspect-[3/4] bg-white/5 overflow-hidden relative">
                <img src={item.image || item.images[0]} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <button className="absolute top-6 right-6 w-12 h-12 rounded-full luxury-glass flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Heart size={18} fill="currentColor" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                   <h3 className="text-2xl font-display tracking-tighter uppercase group-hover:text-glow transition-all">{item.name}</h3>
                   <p className="text-sm font-serif text-white/60">{item.price} TND</p>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 bg-white text-black py-4 text-[10px] font-black tracking-widest uppercase hover:bg-white/90 flex items-center justify-center gap-3">
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-white/40 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

