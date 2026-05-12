import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle, RefreshCcw } from "lucide-react";
import { getFashionRecommendation } from "../services/aiService";
import ReactMarkdown from "react-markdown";

const STEPS = [
  { 
    id: "vibe", 
    label: "Desired Aura", 
    options: ["Streetwear", "Old Money", "Sportswear", "Minimalist"] 
  },
  { 
    id: "body", 
    label: "Physical Profile", 
    fields: [
      { key: "height", label: "Height (cm)" },
      { key: "weight", label: "Weight (kg)" },
      { key: "bodyType", label: "Body Type" },
    ] 
  },
  { 
    id: "details", 
    label: "Personal Shades", 
    fields: [
      { key: "skinTone", label: "Skin Tone" },
      { key: "eyeColor", label: "Eye Color" },
      { key: "hairColor", label: "Hair Color" },
    ] 
  },
];

function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const width = bounds.width;
    const height = bounds.height;
    const mouseXPos = event.clientX - bounds.left;
    const mouseYPos = event.clientY - bounds.top;
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function AIStylist() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<any>({
    vibe: "",
    height: "",
    weight: "",
    bodyType: "",
    skinTone: "",
    eyeColor: "",
    hairColor: "",
  });
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const result = await getFashionRecommendation(profile);
    setRecommendation(result);
    setLoading(false);
  };

  const reset = () => {
    setStep(0);
    setRecommendation(null);
    setProfile({
      vibe: "",
      height: "",
      weight: "",
      bodyType: "",
      skinTone: "",
      eyeColor: "",
      hairColor: "",
    });
  };

  const progressPercentage = (step / (STEPS.length - 1)) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 min-h-screen px-6 max-w-4xl mx-auto pb-24"
    >
      <div className="text-center mb-16">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block p-4 rounded-full bg-white/5 mb-6"
        >
          <Sparkles className="text-white w-8 h-8" />
        </motion.div>
        <h1 className="text-7xl font-display tracking-tighter mb-4">AI STYLIST</h1>
        <p className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-bold">Rule your aura with artificial intelligence</p>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {!recommendation ? (
            <motion.div 
              key="form"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="luxury-glass p-8 md:p-16 relative overflow-hidden"
            >
              {loading ? (
                <div className="py-20 text-center space-y-8">
                  <div className="relative w-20 h-20 mx-auto">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-white/5 border-t-white rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-2 border border-white/10 border-b-white rounded-full"
                    />
                  </div>
                  <motion.p 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-white/60 tracking-[0.4em] text-[10px] uppercase font-bold"
                  >
                    Calculating your aura...
                  </motion.p>
                </div>
              ) : (
                <>
                  <div className="relative flex justify-between items-center mb-16">
                    {/* Progress Background Line */}
                    <div className="absolute top-4 left-0 w-full h-[1px] bg-white/5 -z-10" />
                    
                    {/* Animated Progress Line with Gradient and Shimmer */}
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: `${progressPercentage}%`,
                      }}
                      className="absolute top-4 left-0 h-[1px] bg-white overflow-hidden -z-10"
                      transition={{ duration: 0.8, ease: "circOut" }}
                    >
                      <motion.div 
                        animate={{ 
                          x: ["-100%", "100%"],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      />
                    </motion.div>

                    {/* Progress Line Glow Effect */}
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: `${progressPercentage}%` }}
                      className="absolute top-4 left-0 h-[2px] bg-white/20 blur-[2px] -z-20"
                      transition={{ duration: 1.2, ease: "circOut" }}
                    />
                    
                    {STEPS.map((s, i) => (
                      <div key={s.id} className="flex flex-col items-center gap-4">
                        <motion.div 
                          animate={{ 
                            scale: i === step ? 1.25 : 1,
                            backgroundColor: i <= step ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.05)",
                            color: i <= step ? "rgb(0, 0, 0)" : "rgba(255, 255, 255, 0.4)",
                            borderColor: i <= step ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.1)",
                            boxShadow: i === step ? "0 0 20px rgba(255, 255, 255, 0.3)" : "none"
                          }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-500 z-10`}
                        >
                          {i < step ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <CheckCircle size={14} />
                            </motion.div>
                          ) : (
                            <span className="relative z-10">0{i + 1}</span>
                          )}
                          {i === step && (
                            <motion.div 
                              layoutId="activeStepPulse"
                              animate={{ 
                                scale: [1, 1.5],
                                opacity: [0.5, 0]
                              }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                ease: "easeOut" 
                              }}
                              className="absolute inset-0 rounded-full bg-white -z-10"
                            />
                          )}
                        </motion.div>
                        <motion.span 
                          animate={{ 
                            opacity: i <= step ? 1 : 0.3,
                            y: i === step ? 0 : 2
                          }}
                          className={`text-[9px] tracking-widest uppercase font-bold hidden md:block transition-all duration-500 ${i <= step ? "text-white" : "text-white/20"}`}
                        >
                          {s.label}
                        </motion.span>
                      </div>
                    ))}
                  </div>

                  {step === 0 && (
                    <div className="space-y-8">
                      <h2 className="text-3xl font-display tracking-tight">WHICH VIBE RESONATES?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {STEPS[0].options?.map((opt, i) => (
                          <motion.div
                            key={opt}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <button 
                              onClick={() => {
                                setProfile({ ...profile, vibe: opt });
                                handleNext();
                              }}
                              className={`w-full p-8 border transition-all text-left group relative backdrop-blur-sm overflow-hidden ${profile.vibe === opt ? "border-white bg-white text-black" : "border-white/10 hover:border-white/40 bg-white/[0.02]"}`}
                            >
                              <div className="relative z-10 flex items-center justify-between">
                                <span className="text-xl font-display tracking-tighter uppercase">{opt}</span>
                                <ArrowRight className={`w-5 h-5 transition-all duration-300 ${profile.vibe === opt ? "text-black translate-x-0" : "text-white -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step > 0 && (
                    <div className="space-y-12">
                      <h2 className="text-3xl font-display tracking-tight uppercase">{STEPS[step].label}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {STEPS[step].fields?.map((field: any, i: number) => (
                          <motion.div 
                            key={field.key} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="space-y-2"
                          >
                            <label className="text-[10px] tracking-widest text-white/40 uppercase font-bold">{field.label}</label>
                            <input 
                              type="text"
                              value={profile[field.key] || ""}
                              className="w-full bg-white/5 border-b border-white/20 py-3 text-lg focus:outline-none focus:border-white transition-all uppercase placeholder:text-white/10"
                              placeholder="..."
                              onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                            />
                          </motion.div>
                        ))}
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleNext}
                        disabled={STEPS[step].fields?.some((f: any) => !profile[f.key])}
                        className="w-full bg-white text-black py-6 font-black tracking-[0.3em] text-[10px] uppercase hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl"
                      >
                        {step === STEPS.length - 1 ? "ANALYZE AURA" : "CONTINUE"}
                      </motion.button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-8"
            >
              <TiltCard>
                <div className="luxury-glass p-8 md:p-16 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
                    <Sparkles size={120} strokeWidth={0.5} />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-8 text-white/40">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                      <CheckCircle size={14} className="text-white" />
                    </div>
                    <span className="text-[10px] tracking-[0.4em] uppercase font-bold">Analysis Complete</span>
                  </div>
                  
                  <div className="markdown-body prose prose-invert max-w-none prose-h2:text-4xl prose-h2:tracking-tighter prose-h2:uppercase prose-p:text-lg prose-p:text-white/70 prose-p:leading-relaxed">
                    <ReactMarkdown>{recommendation}</ReactMarkdown>
                  </div>
                  
                  <div className="mt-12 flex flex-col md:flex-row gap-4">
                    <button 
                      onClick={reset} 
                      className="flex-1 border border-white/20 py-5 text-[10px] tracking-widest font-black uppercase hover:bg-white/5 flex items-center justify-center gap-3 transition-all"
                    >
                      <RefreshCcw size={14} /> Re-analyze
                    </button>
                    <button className="flex-1 bg-white text-black py-5 text-[10px] tracking-widest font-black uppercase hover:bg-white/90 flex items-center justify-center gap-3 transition-all">
                      Shop Your Look <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

