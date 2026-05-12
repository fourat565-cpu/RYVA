import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useApp } from "../App";

export default function Cart() {
  const { cart, setCart } = useApp();

  const removeItem = (index: number) => {
    setCart((prev: any) => prev.filter((_: any, i: number) => i !== index));
  };

  const total = cart.reduce((acc: number, item: any) => acc + item.price, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 min-h-screen px-6 max-w-[1400px] mx-auto pb-24"
    >
      <h1 className="text-7xl font-display tracking-tighter uppercase mb-20">Your <span className="italic font-serif font-light lowercase">Cart</span></h1>

      {cart.length === 0 ? (
        <div className="text-center py-32 space-y-8">
           <ShoppingBag size={64} className="mx-auto text-white/10" strokeWidth={1} />
           <p className="text-white/40 tracking-[0.2em] font-light uppercase">Your cart is currently empty.</p>
           <Link to="/shop" className="inline-block bg-white text-black px-12 py-5 font-black tracking-widest text-[10px] uppercase hover:bg-white/90">
             Explore Collections
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-12">
            <AnimatePresence>
              {cart.map((item: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="flex gap-8 group"
                >
                  <div className="w-32 aspect-[3/4] bg-white/5 overflow-hidden flex-shrink-0">
                    <img src={item.image || item.images[0]} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-display tracking-tighter uppercase mb-1">{item.name}</h3>
                        <p className="text-[10px] tracking-widest text-white/40 uppercase font-bold">Size: {item.selectedSize} / Color: Standard</p>
                      </div>
                      <span className="text-xl font-serif">{item.price} TND</span>
                    </div>
                    <button 
                      onClick={() => removeItem(i)}
                      className="flex items-center gap-2 text-white/20 hover:text-white transition-colors text-[10px] tracking-widest font-black uppercase"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-4">
             <div className="luxury-glass p-10 space-y-8 sticky top-32">
                <h3 className="text-xl font-display tracking-tighter uppercase">Summary</h3>
                <div className="space-y-4 text-sm font-light text-white/60">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">{total} TND</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-white">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-4 text-lg">
                    <span className="text-white uppercase tracking-tighter font-display">Total</span>
                    <span className="text-white font-serif">{total} TND</span>
                  </div>
                </div>

                <Link 
                  to="/checkout" 
                  className="w-full bg-white text-black py-6 rounded-none font-black tracking-[0.4em] text-[10px] uppercase hover:bg-white/90 transition-all flex items-center justify-center gap-4"
                >
                  CHECKOUT <ArrowRight size={14} />
                </Link>

                <p className="text-center text-[10px] tracking-[0.2em] font-medium text-white/20 uppercase">
                  Prices are inclusive of VAT
                </p>
             </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

