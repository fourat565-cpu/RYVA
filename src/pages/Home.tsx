import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Image as DreiImage } from "@react-three/drei";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { PRODUCTS } from "../constants/products";
import { Logo } from "../components/ui/Logo";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

function ProductCard3D({ url, position, rotationSpeed = 1 }: { url: string; position: [number, number, number]; rotationSpeed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.3 * rotationSpeed;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5 * rotationSpeed) * 0.2;
  });

  return (
    <Float speed={2 * rotationSpeed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <DreiImage 
          url={url} 
          scale={[1.5, 2]} 
          transparent 
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

function Hero3D() {
  const floatingProducts = useMemo(() => PRODUCTS.slice(0, 5), []);
  const mouse = useRef([0, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      ];
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-black via-brand-gray to-brand-black">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <Scene mouse={mouse} floatingProducts={floatingProducts} />
      </Canvas>
    </div>
  );
}

function Scene({ mouse, floatingProducts }: { mouse: any; floatingProducts: any[] }) {
  const { camera } = useThree();

  useFrame((state) => {
    // Smooth camera movements based on mouse
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current[0] * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouse.current[1] * 2, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#C0C0C0" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
      
      {floatingProducts.map((product, i) => {
        const x = (i % 3 - 1) * 3.5;
        const y = (Math.floor(i / 3) - 0.5) * 2;
        const z = Math.sin(i * 1.5) * 2 - 2;
        
        return (
          <ProductCard3D 
            key={product.id}
            url={product.images[0]}
            position={[x, y, z]}
            rotationSpeed={0.5 + Math.random() * 0.5}
          />
        );
      })}

      <mesh position={[0, 0, -5]}>
        <Sphere args={[6, 64, 64]}>
          <MeshDistortMaterial
            color="#080808"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            opacity={0.4}
            transparent
          />
        </Sphere>
      </mesh>
    </>
  );
}

function LookbookGallery() {
  const images = [
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800",
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",
  ];

  return (
    <section className="py-32 overflow-hidden bg-white text-black">
      <div className="max-w-[1400px] mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-5xl font-display tracking-tighter uppercase">The Aura <span className="italic font-serif font-light lowercase">in Motion</span></h2>
      </div>
      
      <div className="flex gap-4 px-6 overflow-x-auto no-scrollbar pb-12 cursor-grab active:cursor-grabbing">
        {images.map((img, i) => (
          <motion.div 
            key={i} 
            className="flex-none w-[300px] md:w-[450px] aspect-[4/5] bg-brand-gray overflow-hidden group"
          >
            <img 
              src={img} 
              alt="Lookbook" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0" 
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center pt-8 border-t border-black/10">
        <p className="text-[10px] tracking-[0.4em] font-black uppercase">Volume 01 / SS26</p>
        <button className="text-[10px] tracking-[0.4em] font-black uppercase flex items-center gap-2">View Archive <ArrowRight size={12} /></button>
      </div>
    </section>
  );
}

function ShowcaseSection() {
  const products = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[4]];
  
  return (
    <section className="py-32 bg-brand-black">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-[10vw] font-display font-black tracking-tighter leading-none uppercase mb-24 text-center">
          The <br /> <span className="italic font-serif font-light lowercase">Signature</span> Pieces
        </h2>
        
        <div className="space-y-64">
          {products.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-16 lg:gap-32`}
            >
              <div className="flex-1 w-full aspect-square relative group">
                 <div className="absolute inset-0 bg-white/[0.02] rounded-full blur-3xl opacity-20" />
                 <motion.div
                   whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }}
                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
                   className="relative z-10 w-full h-full perspective-1000"
                 >
                   <img 
                    src={p.images[0]} 
                    alt={p.name} 
                    className="w-full h-full object-contain grayscale brightness-125 drop-shadow-[0_0_100px_rgba(255,255,255,0.1)]" 
                    referrerPolicy="no-referrer"
                   />
                 </motion.div>
              </div>
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <span className="text-[10px] tracking-[0.5em] font-black uppercase text-white/20">Archive No. 0{i + 1}</span>
                  <h3 className="text-5xl md:text-7xl font-display tracking-tighter uppercase">{p.name}</h3>
                  <p className="text-white/60 text-lg font-light leading-relaxed max-w-md">{p.description}</p>
                </div>
                <ul className="space-y-4">
                  {p.details.slice(0, 3).map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-xs tracking-widest text-white/40 uppercase">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <Link to={`/product/${p.id}`} className="inline-block bg-white text-black px-12 py-5 font-bold tracking-widest text-[10px] uppercase hover:bg-white/90">
                  Acquire Artifact
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <Hero3D />
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10 max-w-4xl flex flex-col items-center"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-8"
          >
            <Logo size="xl" className="brightness-200" />
          </motion.div>

          <span className="text-[10px] tracking-[0.5em] font-medium text-white/40 mb-6 block">ESTABLISHED 2026</span>
          <h1 className="text-[12vw] md:text-[10vw] font-display font-bold leading-[0.8] mb-8 tracking-tighter mix-blend-difference">
            RULE THE <br />
            <span className="italic font-serif font-light lowercase px-4">aura</span>
          </h1>
          <p className="text-white/60 text-sm md:text-lg mb-12 max-w-lg mx-auto font-light leading-relaxed tracking-wide">
            Extreme luxury fusion for the modern visionary. Streetwear meets heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="bg-white text-black px-12 py-5 rounded-none font-bold tracking-[0.2em] text-[10px] hover:bg-white/90 transition-all flex items-center justify-center gap-4">
              COLLECTIONS <ArrowRight size={14} />
            </Link>
            <Link to="/ai-stylist" className="border border-white/20 px-12 py-5 rounded-none font-bold tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-4">
              AI STYLIST <Play size={10} fill="currentColor" />
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
          <span className="text-[8px] tracking-[0.3em] font-medium uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-white/40 relative overflow-hidden">
             <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white" 
             />
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 px-6 bg-brand-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h2 className="text-6xl md:text-8xl tracking-tighter leading-none">ARCHIVE <br /> <span className="italic font-serif font-light lowercase">selections</span></h2>
            <div className="flex flex-col items-end gap-4">
              <p className="text-white/40 text-[10px] tracking-[0.4em] font-black uppercase text-right">Curated for the modern visionary</p>
              <Link to="/shop" className="text-xs tracking-widest border-b border-white/40 pb-1 hover:border-white transition-all uppercase font-medium">Explore All Selections</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[3/4] bg-brand-gray overflow-hidden relative">
                     {/* Static Image */}
                     <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 grayscale group-hover:opacity-0"
                      referrerPolicy="no-referrer"
                     />
                     {/* Hover Image */}
                     <img 
                      src={product.images[1] || product.images[0]} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100"
                      referrerPolicy="no-referrer"
                     />
                     <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 luxury-glass px-2 py-1 pt-1.5 z-10">
                        <Logo size="sm" className="brightness-200" />
                     </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-bold tracking-tight uppercase">{product.name}</h3>
                      <span className="text-xs font-serif italic text-white/40">{product.price} TND</span>
                    </div>
                    <p className="text-[10px] text-white/40 tracking-widest uppercase">{product.category}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ShowcaseSection />
      <LookbookGallery />

      {/* Cinematic Banner */}
      <section className="h-[70vh] relative overflow-hidden flex items-center justify-center text-center px-6">
        <img 
          src="https://images.unsplash.com/photo-1550995694-3f5f4a7b1bd2?q=80&w=1920&h=1080&auto=format&fit=crop" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black" />
        <div className="relative z-10 max-w-2xl px-4">
          <h2 className="text-4xl md:text-7xl tracking-tighter mb-8 leading-none">THE OLD MONEY <br /> <span className="italic font-serif font-light lowercase">Revolution</span></h2>
          <Link to="/shop" className="text-xs tracking-[0.3em] font-bold border border-white px-10 py-4 hover:bg-white hover:text-black transition-all">DISCOVER COLLECTIONS</Link>
        </div>
      </section>
    </motion.div>
  );
}
