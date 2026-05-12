import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CreditCard, Truck, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { useApp } from "../App";

export default function Checkout() {
  const { cart } = useApp();
  const [step, setStep] = useState(1);
  const total = cart.reduce((acc: number, item: any) => acc + item.price, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 min-h-screen px-6 max-w-6xl mx-auto pb-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
        {/* Left: Forms */}
        <div className="lg:col-span-7 space-y-16">
          <div className="flex justify-between items-center border-b border-white/10 pb-8">
             <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${step >= 1 ? "bg-white text-black border-white" : "border-white/20 text-white/40"}`}>01</span>
                <span className={`text-[10px] tracking-widest uppercase font-bold ${step >= 1 ? "text-white" : "text-white/40"}`}>Shipping</span>
             </div>
             <div className="w-12 h-[1px] bg-white/10" />
             <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${step >= 2 ? "bg-white text-black border-white" : "border-white/20 text-white/40"}`}>02</span>
                <span className={`text-[10px] tracking-widest uppercase font-bold ${step >= 2 ? "text-white" : "text-white/40"}`}>Payment</span>
             </div>
             <div className="w-12 h-[1px] bg-white/10" />
             <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${step >= 3 ? "bg-white text-black border-white" : "border-white/20 text-white/40"}`}>03</span>
                <span className={`text-[10px] tracking-widest uppercase font-bold ${step >= 3 ? "text-white" : "text-white/40"}`}>Confirm</span>
             </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-8">
                  <h2 className="text-4xl font-display tracking-tighter uppercase">Shipping Details</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[9px] tracking-widest uppercase font-black text-white/40">First Name</label>
                       <input type="text" className="w-full bg-white/5 border-b border-white/20 py-4 focus:outline-none focus:border-white transition-all uppercase text-sm" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] tracking-widest uppercase font-black text-white/40">Last Name</label>
                       <input type="text" className="w-full bg-white/5 border-b border-white/20 py-4 focus:outline-none focus:border-white transition-all uppercase text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] tracking-widest uppercase font-black text-white/40">Address</label>
                    <input type="text" className="w-full bg-white/5 border-b border-white/20 py-4 focus:outline-none focus:border-white transition-all uppercase text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[9px] tracking-widest uppercase font-black text-white/40">City</label>
                       <select className="w-full bg-white/5 border-b border-white/20 py-4 focus:outline-none focus:border-white transition-all uppercase text-sm appearance-none">
                         <option className="bg-brand-black">Tunis</option>
                         <option className="bg-brand-black">Sousse</option>
                         <option className="bg-brand-black">Sfax</option>
                         <option className="bg-brand-black">Bizerte</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] tracking-widest uppercase font-black text-white/40">Phone Number</label>
                       <input type="text" placeholder="+216" className="w-full bg-white/5 border-b border-white/20 py-4 focus:outline-none focus:border-white transition-all uppercase text-sm" />
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-white text-black py-6 font-black tracking-[0.4em] text-[10px] uppercase hover:bg-white/90 flex items-center justify-center gap-4"
                >
                  CONTINUE TO PAYMENT <ArrowRight size={14} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                 <div className="space-y-8">
                  <h2 className="text-4xl font-display tracking-tighter uppercase">Payment Method</h2>
                  <div className="space-y-4">
                    <div className="p-6 border border-white bg-white/5 flex items-center justify-between group cursor-pointer">
                       <div className="flex items-center gap-6">
                         <CreditCard size={24} />
                         <div>
                           <p className="font-bold tracking-tighter">Debit / Credit Card</p>
                           <p className="text-[10px] text-white/40 tracking-widest uppercase">Secured by Stripe</p>
                         </div>
                       </div>
                       <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                         <div className="w-2 h-2 rounded-full bg-white" />
                       </div>
                    </div>
                    <div className="p-6 border border-white/10 flex items-center justify-between opacity-40">
                       <div className="flex items-center gap-6">
                         <Truck size={24} />
                         <div>
                           <p className="font-bold tracking-tighter">Cash on Delivery</p>
                           <p className="text-[10px] text-white/40 tracking-widest uppercase">Available soon</p>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(3)}
                  className="w-full bg-white text-black py-6 font-black tracking-[0.4em] text-[10px] uppercase hover:bg-white/90 flex items-center justify-center gap-4"
                >
                  PREVIEW ORDER <ArrowRight size={14} />
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 space-y-8"
              >
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mx-auto text-white">
                  <CheckCircle size={48} strokeWidth={1} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-5xl font-display tracking-tighter uppercase">READY TO RULE?</h2>
                  <p className="text-white/40 text-sm font-light">Confirm your aura acquisition. Your unique tracking ID will be generated upon completion.</p>
                </div>
                <button className="w-full bg-white text-black py-6 font-black tracking-[0.4em] text-[10px] uppercase hover:bg-white/90">
                  PLACE ORDER ({total} TND)
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5">
           <div className="luxury-glass p-10 space-y-8 sticky top-32">
              <h3 className="text-xl font-display tracking-tighter uppercase border-b border-white/5 pb-6">Your Archives</h3>
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                {cart.map((item: any, i: number) => (
                  <div key={i} className="flex gap-4">
                    <img src={item.image || item.images[0]} alt="" className="w-16 aspect-[3/4] object-cover grayscale" />
                    <div className="flex-1">
                      <h4 className="text-xs font-bold tracking-tight uppercase mb-1">{item.name}</h4>
                      <p className="text-[9px] text-white/40 uppercase tracking-widest">SIZE: {item.selectedSize}</p>
                    </div>
                    <span className="text-[10px] font-serif">{item.price} TND</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-white/5">
                 <div className="flex justify-between text-xs tracking-widest uppercase font-bold text-white/40">
                   <span>Subtotal</span>
                   <span>{total} TND</span>
                 </div>
                 <div className="flex justify-between text-xs tracking-widest uppercase font-bold text-white/40">
                   <span>Shipping</span>
                   <span>FREE</span>
                 </div>
                 <div className="flex justify-between text-xl font-display tracking-tighter uppercase pt-4 border-t border-white/10">
                   <span>Total</span>
                   <span>{total} TND</span>
                 </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/5">
                 <ShieldCheck className="text-white/40" size={16} />
                 <span className="text-[9px] tracking-widest uppercase font-bold text-white/40">Secured with 256-bit encryption</span>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

