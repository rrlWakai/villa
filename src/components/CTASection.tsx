import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="relative overflow-hidden h-[80vh] flex items-center justify-center">
      {/* Background Parallax Image */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: yImage, scale: 1.1 }} className="w-full h-[120%] -top-[10%] relative">
          <img
            src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=2000&q=85&auto=format&fit=crop"
            alt="Villa Jimena Night"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-emerald-950/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-gold-400 text-xs tracking-[0.3em] uppercase font-semibold mb-6">
            The Time is Now
          </span>

          <h2 className="font-display text-5xl md:text-7xl font-light text-sand-50 leading-[1.1] mb-8">
            Experience the <br />
            <em className="text-gold-500 italic font-light">Extraordinary</em>
          </h2>

          <p className="text-sand-50/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Exclusive dates are limited. Secure your sanctuary and step into a world where luxury meets pristine nature.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-gold-500 text-emerald-950 text-xs tracking-[0.2em] uppercase font-bold hover:bg-gold-400 transition-colors duration-500"
            >
              Reserve Your Dates
            </motion.button>
            <motion.a
              href="mailto:concierge@villajimena.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-sand-50/30 text-sand-50 text-xs tracking-[0.2em] uppercase hover:bg-sand-50/10 transition-colors duration-500"
            >
              Contact Concierge
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
