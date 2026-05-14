import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";

export default function Hero() {
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollDown = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative h-[100dvh] min-h-[700px] overflow-hidden bg-emerald-950"
      id="hero"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay z-10"></div>

        {/* Readability Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black-950/60 via-black-950/50 to-black-950 z-10"></div>

        <motion.div
          animate={{ scale: [1, 1.05] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="w-full h-full"
        >
          <img
            src="/images/the-grove-hero.png"
            alt="The Grove by Six Marys Boutique Hotel Resort"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Floating particles (mobile optimized) */}
      <div className="hidden sm:block absolute inset-0 z-10 overflow-hidden pointer-events-none opacity-50">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber-200/40"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          {/* Left Content */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-12 bg-gold-400"></div>
              <MapPin className="w-4 h-4 text-gold-400" />
              <span className="text-sand-50/80 text-xs tracking-[0.2em] uppercase font-medium">
                Bacolor, Pampanga, Philippines
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-[6rem] text-sand-50 font-medium leading-[1.05] md:leading-[0.9] tracking-tight text-balance"
            >
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                Experience Modern Comfort
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block italic text-gold-300 mt-2"
              >
                The Grove by Six Marys.
              </motion.span>
            </motion.h1>
          </div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-full md:max-w-sm flex flex-col items-start md:items-end text-left md:text-right"
          >
            <p className="text-sand-50/75 text-sm md:text-base leading-relaxed mb-8 font-light">
              Your perfect pause from your busy life. A warm, modern, and lush
              retreat for couples, families, and weekend escapees from Metro
              Manila and Central Luzon.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToBooking}
                className="w-full sm:w-auto px-8 py-4 bg-gold-400 text-emerald-950 font-medium tracking-[0.1em] uppercase text-xs hover:bg-gold-300 transition-colors text-center"
              >
                Book your stay
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollDown}
                className="w-full sm:w-auto px-8 py-4 border border-sand-100/30 text-sand-50 font-medium tracking-[0.1em] uppercase text-xs hover:bg-sand-50/10 transition-colors text-center"
              >
                Explore the retreat
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0, bottom: -20 }}
        animate={{ opacity: 1, bottom: 40 }}
        transition={{
          delay: 1.5,
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-3 sm:left-6 lg:left-16 text-sand-50/50 hover:text-gold-400 transition-colors flex flex-col items-center gap-4 z-20 group"
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase rotate-180"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>

        <div className="w-[1px] h-12 bg-sand-50/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 w-full h-1/2 bg-gold-400"
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </div>
      </motion.button>
    </section>
  );
}
