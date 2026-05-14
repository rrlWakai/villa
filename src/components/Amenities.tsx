import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Waves,
  BedDouble,
  Trees,
  UtensilsCrossed,
  Users,
  Sparkles,
  CalendarHeart,
  Sun,
} from "lucide-react";

const keyAmenities = [
  {
    icon: Waves,
    name: "Swimming Pool Lounge",
    desc: "A refreshing pool area with comfortable outdoor lounge spaces for all-day relaxation.",
  },
  {
    icon: BedDouble,
    name: "Modern Hotel-Style Rooms",
    desc: "Clean, cozy, and thoughtfully designed rooms for couples, families, and weekend guests.",
  },
  {
    icon: Trees,
    name: "Lush Garden Spaces",
    desc: "Tropical greenery and open-air corners that create a calm and rejuvenating atmosphere.",
  },
  {
    icon: UtensilsCrossed,
    name: "Indoor & Al Fresco Dining",
    desc: "Enjoy restaurant dining with warm ambiance both indoors and under the evening sky.",
  },
  {
    icon: Users,
    name: "Family-Friendly Retreat",
    desc: "A welcoming and versatile staycation destination for couples, families, and groups.",
  },
  {
    icon: Sparkles,
    name: "Warm Evening Ambiance",
    desc: "Soft lighting and premium yet approachable spaces for restful nights and great conversations.",
  },
  {
    icon: CalendarHeart,
    name: "Event & Function Space",
    desc: "Flexible garden and function areas ideal for celebrations and private gatherings.",
  },
  {
    icon: Sun,
    name: "Relaxing Staycation Atmosphere",
    desc: "Every detail is designed to help guests pause, breathe, and recharge away from city stress.",
  },
];

export default function Amenities() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      id="amenities"
      className="py-24 md:py-40 bg-sand-50 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold-400">
                Signature Amenities
              </span>
              <div className="h-[1px] w-12 bg-gold-400"></div>
            </div>

            <h2 className="font-display text-5xl md:text-6xl text-emerald-950 leading-tight">
              Crafted for <br />
              <span className="italic text-gold-400 font-light">
                Modern Tropical Comfort
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-md text-emerald-900/70 font-light text-lg leading-relaxed md:text-right"
          >
            <p>
              The Grove by Six Marys is designed for rest, connection, and
              memorable staycation moments in Bacolor, Pampanga.
            </p>
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center relative">
          
          {/* IMAGE */}
          <div className="lg:col-span-6 relative h-[600px] md:h-[800px]">
            <motion.div
              style={{ y: y1 }}
              className="w-full h-full relative z-10"
            >
              <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay z-10"></div>

              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop"
                alt="The Grove by Six Marys amenities"
                className="w-full h-full object-cover shadow-2xl"
              />
            </motion.div>

            {/* Accent frame */}
            <div className="absolute -top-12 -left-12 w-full h-full border border-gold-400/30 z-0 hidden md:block"></div>
          </div>

          {/* AMENITIES */}
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
                  <div className="w-12 h-12 flex items-center justify-center mb-6 border border-emerald-900/10 text-gold-400 rounded-full group-hover:bg-emerald-950 group-hover:text-gold-400 group-hover:border-emerald-900 transition-all duration-500">
                    <item.icon strokeWidth={1.5} className="w-5 h-5" />
                  </div>

                  <h3 className="font-display text-xl text-emerald-950 mb-2">
                    {item.name}
                  </h3>

                  <p className="text-emerald-900/60 text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
