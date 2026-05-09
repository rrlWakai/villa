import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Waves,
  BedDouble,
  Trees,
  Tv,
  Users,
  Camera,
  Coffee,
  Wind,
} from "lucide-react";

const keyAmenities = [
  {
    icon: Waves,
    name: "Private Pool",
    desc: "A relaxing poolside environment exclusively yours.",
  },
  {
    icon: BedDouble,
    name: "Elegant Villa Rooms",
    desc: "Premium accommodations offering intimate comfort.",
  },
  {
    icon: Trees,
    name: "Tropical Garden Spaces",
    desc: "Lush greenery for a peaceful, nature-inspired escape.",
  },
  {
    icon: Tv,
    name: "Lounge & Entertainment",
    desc: "Spaces designed for connection and modern leisure.",
  },
  {
    icon: Users,
    name: "Group-friendly Spaces",
    desc: "Perfectly arranged for family gatherings and celebrations.",
  },
  {
    icon: Camera,
    name: "Scenic Photo Spots",
    desc: "Cinematic lighting and architecture for beautiful memories.",
  },
  {
    icon: Coffee,
    name: "Relaxation Areas",
    desc: "Quiet corners dedicated to reading, resting, and unwinding.",
  },
  {
    icon: Wind,
    name: "Spacious Outdoors",
    desc: "Breathe in the cool climate of Alfonso, Cavite.",
  },
];

export default function Amenities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section id="amenities" className="py-24 md:py-40 bg-sand-50 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold-500">
                Resort Features
              </span>
              <div className="h-[1px] w-12 bg-gold-400"></div>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-emerald-950 leading-tight">
              Curated for <br />
              <span className="italic text-gold-500 font-light">Unwindings</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-emerald-900/70 font-light text-lg leading-relaxed md:text-right"
          >
            <p>Every corner of Villa Jimena is designed to foster connection—with nature, with yourself, and with those you hold dear.</p>
          </motion.div>
        </div>

        {/* Asymmetric Image/List Layout */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center relative">
          
          {/* Left Large Image */}
          <div className="lg:col-span-6 relative h-[600px] md:h-[800px]">
            <motion.div
              style={{ y: y1 }}
              className="w-full h-full relative z-10"
            >
              <div className="absolute inset-0 bg-emerald-900/5 mix-blend-overlay z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1000&q=80&auto=format&fit=crop"
                alt="Resort Amenities"
                className="w-full h-full object-cover shadow-luxury"
              />
            </motion.div>
            
            {/* Background Accent Element */}
            <div className="absolute -top-12 -left-12 w-full h-full border border-gold-400/30 z-0 hidden md:block"></div>
          </div>

          {/* Right Amenities List */}
          <div className="lg:col-span-6 relative z-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
              {keyAmenities.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-6 border border-emerald-900/10 text-gold-500 rounded-full group-hover:bg-emerald-900 group-hover:text-gold-400 group-hover:border-emerald-900 transition-all duration-500">
                    <item.icon strokeWidth={1.5} className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl text-emerald-950 mb-2">{item.name}</h3>
                  <p className="text-emerald-900/60 text-sm font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
