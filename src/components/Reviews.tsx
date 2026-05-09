import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  {
    id: '1',
    author: 'Andrea & Migz Santos',
    text: "An unforgettable escape. Surrounded by lush greenery, the private villa felt like our own hidden paradise. Every moment spent here was pure magic.",
    occasion: 'Anniversary Getaway',
  },
  {
    id: '2',
    author: 'The Reyes Family',
    text: "We found the perfect intimate retreat. The attention to detail, from the elegant architecture to the warm hospitality, made our stay deeply relaxing and truly luxurious.",
    occasion: 'Family Staycation',
  },
  {
    id: '3',
    author: 'Marco Villanueva',
    text: "A breathtaking sanctuary where time slows down. Waking up to the cool Cavite breeze and unwinding by the pool created memories we will cherish forever.",
    occasion: 'Weekend Retreat',
  },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent(c => (c + 1) % reviews.length);

  return (
    <section id="reviews" className="py-32 md:py-48 bg-sand-100 relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sand-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        
        <div className="flex justify-center items-center gap-4 mb-16">
          <div className="h-[1px] w-12 bg-gold-400"></div>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-800">
            Guest Experiences
          </span>
          <div className="h-[1px] w-12 bg-gold-400"></div>
        </div>

        <div className="relative min-h-[400px] md:min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-full"
            >
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              
              <h3 className="font-display text-3xl md:text-5xl lg:text-6xl text-emerald-950 leading-[1.2] mb-12 text-balance">
                "{reviews[current].text}"
              </h3>

              <div className="flex flex-col items-center">
                <span className="text-sm tracking-widest uppercase text-emerald-900 font-semibold mb-1">
                  {reviews[current].author}
                </span>
                <span className="text-xs tracking-wider uppercase text-emerald-900/50">
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
            className="text-emerald-900/50 hover:text-gold-500 transition-colors p-2"
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
                    ? 'w-12 h-[1px] bg-gold-500' 
                    : 'w-4 h-[1px] bg-emerald-900/20 hover:bg-emerald-900/40'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="text-emerald-900/50 hover:text-gold-500 transition-colors p-2"
          >
            <ChevronRight strokeWidth={1} className="w-10 h-10" />
          </button>
        </div>

      </div>
    </section>
  );
}
