import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, History, Target, Shield } from "lucide-react";

const FOUNDERS = [
  { name: "Salim Toukebri", role: "Creative Director", bio: "Visionary behind the RYVA aura.", image: "https://picsum.photos/seed/salim/400/600?grayscale" },
  { name: "Ghaith Khaldi", role: "Tech Architect", bio: "Pioneering the future of digital luxury.", image: "https://picsum.photos/seed/ghaith/400/600?grayscale" },
  { name: "Fourat Jaballah", role: "Strategy Lead", bio: "Master of heritage and modern fusion.", image: "https://picsum.photos/seed/fourat/400/600?grayscale" },
];

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-black"
    >
      {/* Hero */}
      <section className="pt-60 pb-32 px-6 max-w-[1400px] mx-auto text-center">
        <h1 className="text-[15vw] leading-[0.8] font-display font-black tracking-tighter uppercase mb-12">
          OUR <br /> <span className="italic font-serif font-light lowercase">legacy</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-white/60 font-light leading-relaxed">
          RYVA isn't just a label; it's a movement. We believe in the power of the aura—the invisible energy that defines true presence.
        </p>
      </section>

      {/* Philosophy Grid */}
      <section className="py-32 px-6 border-y border-white/5 bg-brand-gray/30">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <History className="text-white/20" size={32} />
            <h3 className="text-2xl font-display tracking-tight">THE HERITAGE</h3>
            <p className="text-sm text-white/40 leading-relaxed font-light">
              We draw inspiration from Tunisian craftsmanship and high-end European tailoring to create something entirely new.
            </p>
          </div>
          <div className="space-y-6">
            <Target className="text-white/20" size={32} />
            <h3 className="text-2xl font-display tracking-tight">THE VISION</h3>
            <p className="text-sm text-white/40 leading-relaxed font-light">
              To be the global standard for luxury fusion—where the street meets the estate.
            </p>
          </div>
          <div className="space-y-6">
            <Shield className="text-white/20" size={32} />
            <h3 className="text-2xl font-display tracking-tight">THE AURA</h3>
            <p className="text-sm text-white/40 leading-relaxed font-light">
              Every stitch is engineered to amplify the wearer's natural confidence and power.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <h2 className="text-6xl md:text-8xl tracking-tighter leading-none">THE <br /> <span className="italic font-serif font-light lowercase">visionaries</span></h2>
          <p className="text-white/40 text-[10px] tracking-widest uppercase font-bold text-right">Founded in Tunisia / Global Aura</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FOUNDERS.map((founder, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -20 }}
              className="space-y-8 group"
            >
              <div className="aspect-[3/4] bg-white/5 overflow-hidden">
                <img src={founder.image} alt={founder.name} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="text-2xl font-display tracking-tighter uppercase">{founder.name}</h4>
                <p className="text-[10px] tracking-widest font-black uppercase text-white/40 mb-4">{founder.role}</p>
                <p className="text-sm text-white/60 font-light leading-relaxed">{founder.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-60 px-6 text-center border-t border-white/5">
        <h2 className="text-5xl md:text-7xl tracking-tighter mb-12 uppercase">Join our <span className="italic font-serif font-light lowercase">digital archive</span></h2>
        <Link to="/auth" className="inline-block bg-white text-black px-12 py-5 font-black tracking-widest text-[10px] uppercase hover:bg-white/90">
           Create Profile <ArrowUpRight className="inline ml-2" size={14} />
        </Link>
      </section>
    </motion.div>
  );
}

