import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden h-[80vh] flex items-center justify-center"
    >
      {/* Background Parallax Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: yImage, scale: 1.1 }}
          className="w-full h-[120%] -top-[10%] relative"
        >
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&q=85&auto=format&fit=crop"
            alt="The Grove by Six Marys Resort Sunset"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* DARK GRADIENT FOR READABILITY */}
        <div className="absolute inset-0 bg-emerald-950/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/70" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="block text-gold-400 text-xs tracking-[0.3em] uppercase font-semibold mb-6">
            Your Perfect Pause
          </span>

          <h2 className="font-display text-5xl md:text-7xl font-light text-sand-50 leading-[1.1] mb-8">
            Experience Modern <br />
            <em className="text-gold-400 italic font-light">
              Resort Escape
            </em>
          </h2>

          <p className="text-sand-50/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Limited staycation stays available at The Grove by Six Marys Boutique Hotel Resort.
            Book your private getaway in Bacolor, Pampanga — perfect
            for families, friends, and weekend retreats.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .querySelector("#booking")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-10 py-4 bg-gold-400 text-emerald-950 text-xs tracking-[0.2em] uppercase font-bold hover:bg-gold-300 transition-colors duration-500"
            >
              Book your stay
            </motion.button>

            <motion.a
              href="tel:+639949368919"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-sand-100/30 text-sand-50 text-xs tracking-[0.2em] uppercase hover:bg-sand-50/10 transition-colors duration-500"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
