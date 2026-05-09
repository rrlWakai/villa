import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);

  return (
    <section id="about" className="relative py-32 md:py-48 bg-sand-50 overflow-hidden" ref={containerRef}>
      
      {/* Background Typography */}
      <div className="absolute top-1/4 -left-20 text-[15rem] md:text-[25rem] font-display text-emerald-900/[0.03] whitespace-nowrap pointer-events-none select-none">
        Sanctuary
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Typography & Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold-400">
                  The Experience
                </span>
                <div className="h-[1px] w-16 bg-gold-400"></div>
              </div>

              <h2 className="font-display text-5xl lg:text-6xl text-emerald-900 leading-[1.1] mb-8 text-balance">
                Tropical Serenity Meets 
                <span className="block italic text-gold-500 font-light mt-1">Private Luxury</span>
              </h2>

              <div className="space-y-6 text-emerald-800/70 font-light text-lg leading-relaxed">
                <p>
                  Villa Jimena Resort is a boutique tropical destination crafted for guests seeking privacy, comfort, and immersive relaxation.
                </p>
                <p>
                  Inspired by modern Filipino luxury and nature-driven living, the resort blends elegant villa experiences with warm hospitality and serene surroundings in Alfonso, Cavite.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-12 px-8 py-4 border border-emerald-900 text-emerald-900 text-xs tracking-[0.2em] uppercase hover:bg-emerald-900 hover:text-sand-50 transition-colors duration-500"
              >
                Discover the Resort
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Asymmetrical Image Composition */}
          <div className="lg:col-span-7 relative h-[600px] md:h-[800px] mt-12 lg:mt-0">
            
            {/* Main Image */}
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-0 right-0 w-4/5 md:w-3/4 h-[80%] overflow-hidden"
            >
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-emerald-900/10 z-10 mix-blend-overlay"></div>
                <motion.img
                  style={{ scale }}
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80&auto=format&fit=crop"
                  alt="Villa Jimena Architecture"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Overlapping Image */}
            <motion.div 
              style={{ y: y2 }}
              className="absolute bottom-0 left-0 w-1/2 md:w-2/5 h-1/2 z-20 shadow-2xl"
            >
              <div className="w-full h-full relative">
                <div className="absolute inset-0 border border-white/20 z-10 m-2"></div>
                <img
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&auto=format&fit=crop"
                  alt="Pool Detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Floating Detail Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute top-1/4 -left-4 md:-left-12 bg-white px-8 py-6 shadow-luxury z-30"
            >
              <div className="text-center">
                <span className="block font-display text-4xl text-emerald-900 italic mb-1">01</span>
                <div className="w-6 h-[1px] bg-gold-400 mx-auto mb-2"></div>
                <span className="block text-[9px] tracking-[0.2em] uppercase text-emerald-600">Exclusive</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
