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
    name: "Beachfront Access",
    desc: "Direct access to the calming shores of San Fabian for sunrise walks and seaside relaxation.",
  },
  {
    icon: BedDouble,
    name: "Comfortable Rooms",
    desc: "Clean, cozy, and spacious accommodations built for families, couples, and groups.",
  },
  {
    icon: Trees,
    name: "Natural Coastal Surroundings",
    desc: "A peaceful tropical environment surrounded by sea breeze and greenery.",
  },
  {
    icon: Tv,
    name: "Lounge & Entertainment Area",
    desc: "Shared spaces perfect for bonding, karaoke nights, and group relaxation.",
  },
  {
    icon: Users,
    name: "Family & Barkada Friendly",
    desc: "Designed for gatherings, celebrations, and memorable group stays.",
  },
  {
    icon: Camera,
    name: "Scenic Beach Views",
    desc: "Picture-perfect sunsets and ocean backdrops for unforgettable memories.",
  },
  {
    icon: Coffee,
    name: "Relaxing Chill Spots",
    desc: "Quiet areas where you can unwind, talk, and enjoy the sea breeze.",
  },
  {
    icon: Wind,
    name: "Open Fresh Air Spaces",
    desc: "Enjoy the natural coastal wind and refreshing outdoor atmosphere.",
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
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-500">
                Resort Features
              </span>
              <div className="h-[1px] w-12 bg-amber-400"></div>
            </div>

            <h2 className="font-display text-5xl md:text-6xl text-sky-950 leading-tight">
              Crafted for <br />
              <span className="italic text-amber-500 font-light">
                Coastal Comfort
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-md text-sky-900/70 font-light text-lg leading-relaxed md:text-right"
          >
            <p>
              Villa Dacanay Beach Resort is designed for rest, connection, and
              unforgettable seaside experiences with your loved ones.
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
              <div className="absolute inset-0 bg-sky-900/10 mix-blend-overlay z-10"></div>

              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop"
                alt="Villa Dacanay Beach Resort"
                className="w-full h-full object-cover shadow-2xl"
              />
            </motion.div>

            {/* Accent frame */}
            <div className="absolute -top-12 -left-12 w-full h-full border border-amber-400/30 z-0 hidden md:block"></div>
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
                  <div className="w-12 h-12 flex items-center justify-center mb-6 border border-sky-900/10 text-amber-500 rounded-full group-hover:bg-sky-950 group-hover:text-amber-400 group-hover:border-sky-950 transition-all duration-500">
                    <item.icon strokeWidth={1.5} className="w-5 h-5" />
                  </div>

                  <h3 className="font-display text-xl text-sky-950 mb-2">
                    {item.name}
                  </h3>

                  <p className="text-sky-900/60 text-sm font-light leading-relaxed">
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