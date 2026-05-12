import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, ArrowUpRight } from "lucide-react";
import { Logo } from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/10 pt-24 pb-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Logo size="xl" className="brightness-200" />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-light">
              Redefining luxury through the fusion of high-end streetwear, old money aesthetics, and futuristic sportswear.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/40 transition-colors"><Instagram size={20} strokeWidth={1} /></a>
              <a href="#" className="hover:text-white/40 transition-colors"><Twitter size={20} strokeWidth={1} /></a>
              <a href="#" className="hover:text-white/40 transition-colors"><Facebook size={20} strokeWidth={1} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-medium mb-8 text-white/40">Collections</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link to="/shop?category=new" className="hover:text-white/40 transition-colors flex items-center gap-2">New Arrivals <ArrowUpRight size={12} /></Link></li>
              <li><Link to="/shop?category=streetwear" className="hover:text-white/40 transition-colors">Streetwear Elite</Link></li>
              <li><Link to="/shop?category=old-money" className="hover:text-white/40 transition-colors">Old Money Heritage</Link></li>
              <li><Link to="/shop?category=limited" className="hover:text-white/40 transition-colors">Limited Editions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-medium mb-8 text-white/40">Support</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link to="/contact" className="hover:text-white/40 transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-white/40 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/size-guide" className="hover:text-white/40 transition-colors">Size Guide</Link></li>
              <li><Link to="/faq" className="hover:text-white/40 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-medium mb-8 text-white/40">Join the Aura</h4>
            <p className="text-white/60 text-xs mb-6 font-light">Receive exclusive early access to drops and AI-curated style insights.</p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-white/5 border-b border-white/20 py-3 text-xs tracking-widest focus:outline-none focus:border-white transition-colors"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] tracking-widest font-bold">JOIN</button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-8">
          <div className="text-[10px] tracking-[0.2em] font-medium text-white/20 uppercase flex flex-col md:flex-row gap-4 items-center">
            <span>© 2026 RYVA LUXURY. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:block w-[1px] h-3 bg-white/10" />
            <span className="text-white/40">FOURAT JABALLAH / SALIM TOUKEBRI / GHAITH KHALDI</span>
          </div>
          <div className="flex gap-8 text-[10px] tracking-widest text-white/40 uppercase">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span className="text-white">Tunisia (TND $ )</span>
          </div>
        </div>
      </div>

      {/* Massive Background Text */}
      <div className="mt-24 pointer-events-none select-none">
        <h2 className="text-[20vw] leading-[0.8] font-display font-black text-white/[0.02] uppercase whitespace-nowrap -mb-12">
          RULE THE AURA
        </h2>
      </div>
    </footer>
  );
}
