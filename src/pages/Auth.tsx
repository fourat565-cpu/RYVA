import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, UserPlus, ArrowRight, Github } from "lucide-react";
import { Logo } from "../components/ui/Logo";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 min-h-screen px-6 flex items-center justify-center pb-24"
    >
      <div className="w-full max-w-md space-y-12">
        <div className="flex justify-center mb-8">
           <Logo size="xl" className="brightness-200" />
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-display tracking-tighter uppercase">
            {isLogin ? "Welcome back" : "Join the Aura"}
          </h1>
          <p className="text-white/40 text-[10px] tracking-[0.4em] font-black uppercase">
            Access your exclusive collection and AI insights
          </p>
        </div>

        <div className="luxury-glass p-10 space-y-8">
           <div className="flex border-b border-white/10 pb-4">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 text-[10px] tracking-[0.3em] font-black uppercase transition-all ${isLogin ? "text-white" : "text-white/20 hover:text-white/40"}`}
              >
                Login
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 text-[10px] tracking-[0.3em] font-black uppercase transition-all ${!isLogin ? "text-white" : "text-white/20 hover:text-white/40"}`}
              >
                Sign Up
              </button>
           </div>

           <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] tracking-widest uppercase font-black text-white/40">Email</label>
                <input type="email" placeholder="YOUR@EMAIL.COM" className="w-full bg-white/5 border-b border-white/10 py-4 focus:outline-none focus:border-white transition-all uppercase text-sm tracking-widest" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] tracking-widest uppercase font-black text-white/40">Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-white/5 border-b border-white/10 py-4 focus:outline-none focus:border-white transition-all text-sm" />
              </div>
              
              <button 
                type="button"
                className="w-full bg-white text-black py-6 flex items-center justify-center gap-4 font-black tracking-[0.4em] text-[10px] uppercase hover:bg-white/90 transition-all"
              >
                {isLogin ? "AUTHENTICATE" : "CREATE ACCOUNT"} <ArrowRight size={14} />
              </button>
           </form>

           <div className="relative text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <span className="relative bg-brand-black px-4 text-[9px] tracking-widest text-white/20 uppercase">Or connect with</span>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <button className="border border-white/10 py-4 flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-[10px] font-bold tracking-widest uppercase grayscale hover:grayscale-0">
                 <img src="https://www.google.com/favicon.ico" alt="" className="w-4 h-4" /> Google
              </button>
              <button className="border border-white/10 py-4 flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-[10px] font-bold tracking-widest uppercase">
                 <Github size={16} /> GitHub
              </button>
           </div>

           {isLogin && (
             <p className="text-center">
               <button className="text-[10px] tracking-widest font-black uppercase text-white/20 hover:text-white transition-colors underline underline-offset-4">Forgot your password?</button>
             </p>
           )}
        </div>
      </div>
    </motion.div>
  );
}

