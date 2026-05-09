import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80&auto=format&fit=crop",
    caption: "Cinematic Pool Atmosphere",
    category: "Pool",
  },
  {
    id: "3",
    url: "/images/room-master.jpg",
    caption: "Luxury Villa Interiors",
    category: "Villas",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&auto=format&fit=crop",
    caption: "Warm Sunset Lighting by the Pool",
    category: "Pool",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80&auto=format&fit=crop",
    caption: "Intimate Outdoor Lounge",
    category: "Outdoor",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80&auto=format&fit=crop",
    caption: "Relaxing Resort Mood",
    category: "Pool",
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80&auto=format&fit=crop",
    caption: "Elegant Tropical Architecture",
    category: "Outdoor",
  }
];

const categories = ["All", "Pool", "Outdoor", "Villas"];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const filtered = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = (dir: "prev" | "next") => {
    if (lightboxIndex === null) return;
    const total = filtered.length;
    setLightboxIndex(
      dir === "prev"
        ? (lightboxIndex - 1 + total) % total
        : (lightboxIndex + 1) % total,
    );
  };

  return (
    <section id="gallery" className="py-24 md:py-40 bg-emerald-950 relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16 md:mb-24"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold-400 mb-6 block">
            The Gallery
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-sand-50 mb-10">
            A Glimpse of <em className="italic text-gold-500 font-light">Paradise</em>
          </h2>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 relative group ${
                  activeCategory === cat
                    ? "text-gold-400"
                    : "text-sand-50/60 hover:text-gold-300"
                }`}
              >
                {cat}
                <span className={`absolute -bottom-2 left-0 w-full h-[1px] transform scale-x-0 transition-transform duration-300 origin-left bg-gold-400 group-hover:scale-x-100 ${activeCategory === cat ? 'scale-x-100' : ''}`} />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry grid */}
        <motion.div 
          layout 
          style={{ y: yParallax }}
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filtered.map((image, i) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="break-inside-avoid relative group overflow-hidden cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <div className="relative overflow-hidden shadow-luxury">
                  <div className="absolute inset-0 bg-emerald-900/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-auto object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-end p-6">
                    <p className="text-sand-50 text-sm font-light tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-emerald-950/98 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-sand-50/50 hover:text-gold-400 transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8 font-light" strokeWidth={1} />
            </button>

            <button
              className="absolute left-6 text-sand-50/50 hover:text-gold-400 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigate("prev");
              }}
            >
              <ChevronLeft className="w-10 h-10 font-light" strokeWidth={1} />
            </button>

            <button
              className="absolute right-6 text-sand-50/50 hover:text-gold-400 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigate("next");
              }}
            >
              <ChevronRight className="w-10 h-10 font-light" strokeWidth={1} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-6xl w-full max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].url}
                alt={filtered[lightboxIndex].caption}
                className="w-full h-full max-h-[80vh] object-contain"
              />
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <p className="text-sand-50/80 font-light tracking-wide text-sm">
                  {filtered[lightboxIndex].caption}
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  {filtered.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-[1px] transition-all duration-300 ${idx === lightboxIndex ? 'w-8 bg-gold-400' : 'w-4 bg-sand-50/30'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
