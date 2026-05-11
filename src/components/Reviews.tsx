import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    id: "1",
    author: "The Santos Family",
    text:
      "A truly relaxing beachfront escape. The calm waves, fresh sea breeze, and peaceful atmosphere made our family stay unforgettable.",
    occasion: "Family Getaway",
  },
  {
    id: "2",
    author: "Migz & Andrea",
    text:
      "Perfect place for a quick escape from the city. The view, the vibe, and the hospitality made our stay feel so refreshing and special.",
    occasion: "Couple Retreat",
  },
  {
    id: "3",
    author: "The Barkada Squad",
    text:
      "Super fun and memorable! Swimming, bonding, and chilling by the beach all day — definitely one of our best group trips ever.",
    occasion: "Barkada Trip",
  },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <section
      id="reviews"
      className="py-32 md:py-48 bg-sky-950 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        
        {/* Header */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <div className="h-[1px] w-12 bg-amber-400"></div>

          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70">
            Guest Experiences
          </span>

          <div className="h-[1px] w-12 bg-amber-400"></div>
        </div>

        {/* Review Content */}
        <div className="relative min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="absolute w-full"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Text */}
              <h3 className="font-display text-3xl md:text-5xl text-white leading-[1.3] mb-12">
                "{reviews[current].text}"
              </h3>

              {/* Author */}
              <div className="flex flex-col items-center">
                <span className="text-sm tracking-widest uppercase text-white font-semibold mb-1">
                  {reviews[current].author}
                </span>
                <span className="text-xs tracking-wider uppercase text-white/50">
                  {reviews[current].occasion}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-12 mt-16">
          <button
            onClick={prev}
            className="text-white/50 hover:text-amber-400 transition-colors p-2"
          >
            <ChevronLeft strokeWidth={1} className="w-10 h-10" />
          </button>

          <div className="flex gap-3">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-500 ${
                  i === current
                    ? "w-12 h-[1px] bg-amber-400"
                    : "w-4 h-[1px] bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="text-white/50 hover:text-amber-400 transition-colors p-2"
          >
            <ChevronRight strokeWidth={1} className="w-10 h-10" />
          </button>
        </div>
      </div>
    </section>
  );
}