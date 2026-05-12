import { motion } from "framer-motion";
import { Package, User, MapPin, Settings, LogOut, ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";
import { useApp } from "../App";

export default function Dashboard() {
  const { user } = useApp();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 min-h-screen px-6 max-w-[1400px] mx-auto pb-24"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="space-y-4">
          <h1 className="text-7xl font-display tracking-tighter uppercase leading-none">Your <br /> Account</h1>
          <p className="text-white/40 text-[10px] tracking-[0.4em] font-black uppercase">Guardian of the RYVA Aura</p>
        </div>
        <button className="flex items-center gap-2 text-[10px] tracking-widest font-black uppercase text-white/40 hover:text-white transition-all">
          <LogOut size={14} /> Terminate Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
           {[
             { name: "Overview", icon: User, active: true },
             { name: "Order History", icon: Package },
             { name: "Saved Addresses", icon: MapPin },
             { name: "Identity Settings", icon: Settings },
           ].map(item => (
             <button 
              key={item.name}
              className={`w-full flex items-center justify-between p-6 border transition-all uppercase tracking-widest text-[10px] font-bold ${item.active ? "bg-white text-black border-white" : "border-white/5 text-white/40 hover:bg-white/5"}`}
             >
               <div className="flex items-center gap-4">
                 <item.icon size={16} strokeWidth={1.5} />
                 {item.name}
               </div>
               <ChevronRight size={12} />
             </button>
           ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="luxury-glass p-8 space-y-6">
                 <h3 className="text-xs tracking-[0.3em] font-black uppercase text-white/40">Profile Archive</h3>
                 <div className="space-y-1">
                    <p className="text-2xl font-display tracking-tighter uppercase">Fourat Jaballah</p>
                    <p className="text-sm text-white/40 font-light">fourat565@gmail.com</p>
                 </div>
                 <button className="text-[10px] tracking-widest font-black uppercase text-white hover:underline underline-offset-4">Modify Detail</button>
              </div>
              <div className="luxury-glass p-8 space-y-6">
                 <h3 className="text-xs tracking-[0.3em] font-black uppercase text-white/40">Loyalty Aura</h3>
                 <div className="space-y-1">
                    <p className="text-4xl font-display tracking-tighter uppercase">Elite</p>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Aura Points: 2,450</p>
                 </div>
                 <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-3/4" />
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <h3 className="text-2xl font-display tracking-tighter uppercase">Recent Acquisitions</h3>
              <div className="space-y-4">
                 {[1].map(order => (
                   <div key={order} className="luxury-glass p-8 flex flex-col md:flex-row justify-between items-center gap-8 group">
                      <div className="flex items-center gap-8">
                         <div className="w-16 h-20 bg-white/5 overflow-hidden">
                            <img src="https://picsum.photos/seed/ryva1/200/300?grayscale" alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                         </div>
                         <div>
                            <p className="text-[10px] tracking-widest font-black uppercase text-white/40">Order #RV-90231</p>
                            <p className="text-xl font-display tracking-tighter uppercase">Sovereign Hoodie, Storm Gray</p>
                            <p className="text-[10px] tracking-widest font-bold uppercase text-white/20 mt-1">Delivered Feb 12, 2026</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8">
                         <div className="text-right flex-1 md:flex-none">
                            <p className="text-[10px] tracking-widest font-black uppercase text-white/40">Total</p>
                            <p className="text-xl font-serif">189 TND</p>
                         </div>
                         <button className="bg-white/5 border border-white/10 p-4 hover:bg-white hover:text-black transition-all">
                            <ArrowRight size={16} />
                         </button>
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-8 border border-dashed border-white/10 text-[10px] tracking-widest font-black uppercase text-white/20 hover:text-white/40 transition-all">
                    View Complete Archive
                 </button>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

