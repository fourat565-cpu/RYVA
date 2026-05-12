import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Twitter } from "lucide-react";

export default function Contact() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 min-h-screen pb-24"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Info Side */}
          <div className="space-y-16">
            <div className="space-y-6">
              <h1 className="text-7xl md:text-[8vw] font-display font-black leading-[0.8] tracking-tighter uppercase">GET IN <br /> <span className="italic font-serif font-light lowercase">touch</span></h1>
              <p className="text-white/60 text-lg font-light leading-relaxed max-w-md">
                Whether you're looking for bespoke styling or have a question about your order, our concierge is here to assist.
              </p>
            </div>

            <div className="space-y-12">
               <div className="flex items-start gap-6">
                  <div className="p-4 bg-white/5 rounded-full"><Mail size={24} strokeWidth={1} /></div>
                  <div>
                    <h4 className="text-[10px] tracking-widest font-black uppercase text-white/40 mb-1">Email</h4>
                    <p className="text-xl font-display tracking-tight text-glow">CONCIERGE@RYVA.LUXURY</p>
                  </div>
               </div>
               <div className="flex items-start gap-6">
                  <div className="p-4 bg-white/5 rounded-full"><Phone size={24} strokeWidth={1} /></div>
                  <div>
                    <h4 className="text-[10px] tracking-widest font-black uppercase text-white/40 mb-1">WhatsApp</h4>
                    <p className="text-xl font-display tracking-tight">+216 22 000 000</p>
                  </div>
               </div>
               <div className="flex items-start gap-6">
                  <div className="p-4 bg-white/5 rounded-full"><MapPin size={24} strokeWidth={1} /></div>
                  <div>
                    <h4 className="text-[10px] tracking-widest font-black uppercase text-white/40 mb-1">Flagship Store</h4>
                    <p className="text-xl font-display tracking-tight">LES BERGES DU LAC II, TUNIS</p>
                  </div>
               </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex gap-12">
               <a href="#" className="flex items-center gap-2 text-[10px] tracking-[0.3em] font-bold hover:text-white/60 transition-all uppercase"><Instagram size={14} /> Instagram</a>
               <a href="#" className="flex items-center gap-2 text-[10px] tracking-[0.3em] font-bold hover:text-white/60 transition-all uppercase"><Twitter size={14} /> Twitter</a>
            </div>
          </div>

          {/* Form Side */}
          <div className="luxury-glass p-8 md:p-16">
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-white/40 uppercase font-bold">Your Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-all uppercase text-sm font-light tracking-widest" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-white/40 uppercase font-bold">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-all uppercase text-sm font-light tracking-widest" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-white/40 uppercase font-bold">Subject</label>
                <select className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-all uppercase text-sm font-light tracking-widest appearance-none">
                  <option className="bg-brand-black">General Inquiry</option>
                  <option className="bg-brand-black">Order Support</option>
                  <option className="bg-brand-black">Bespoke Styling</option>
                  <option className="bg-brand-black">Press & Media</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-white/40 uppercase font-bold">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-all uppercase text-sm font-light tracking-widest resize-none"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-white text-black py-6 flex items-center justify-center gap-4 font-black tracking-[0.4em] text-[10px] uppercase hover:bg-white/90 transition-all">
                SEND MESSAGE <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

