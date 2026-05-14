import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop",
    caption: "Golden Staycation Sunrise",
    category: "Resort",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80&auto=format&fit=crop",
    caption: "Calm Ocean Escape",
    category: "Resort",
  },
  {
    id: "3",
    url: "/images/room-master.jpg",
    caption: "Cozy Hotel-Style Room",
    category: "Rooms",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&auto=format&fit=crop",
    caption: "Poolside Relaxation",
    category: "Pool",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&auto=format&fit=crop",
    caption: "Family Bonding Moments",
    category: "Events",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80&auto=format&fit=crop",
    caption: "Weekend Resort Getaway",
    category: "Resort",
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80&auto=format&fit=crop",
    caption: "Elegant Tropical Architecture",
    category: "Outdoor",
  }
];

const categories = ["All", "Resort", "Pool", "Rooms", "Events"];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const filtered =
    activeCategory === "All"
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
        : (lightboxIndex + 1) % total
    );
  };

  return (
    <section
      id="gallery"
      className="py-24 md:py-40 bg-emerald-950 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-16 md:mb-24"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold-400 mb-6">
            The Gallery
          </span>

          <h2 className="font-display text-5xl md:text-7xl text-sand-50 mb-10">
            Moments of <em className="italic text-gold-400 font-light">Paradise</em>
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs tracking-[0.2em] uppercase transition-all relative group ${
                  activeCategory === cat
                    ? "text-gold-400"
                    : "text-sand-50/60 hover:text-gold-300"
                }`}
              >
                {cat}
                <span
                  className={`absolute -bottom-2 left-0 w-full h-[1px] bg-gold-400 transition-transform origin-left duration-300 ${
                    activeCategory === cat
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* GRID */}
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
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden"
                onClick={() => openLightbox(i)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-emerald-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-sand-50 text-sm font-light">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-emerald-950/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-sand-50/60 hover:text-gold-400"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-6 text-sand-50/60 hover:text-gold-400"
              onClick={(e) => {
                e.stopPropagation();
                navigate("prev");
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Next */}
            <button
              className="absolute right-6 text-sand-50/60 hover:text-gold-400"
              onClick={(e) => {
                e.stopPropagation();
                navigate("next");
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-6xl w-full px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].url}
                alt={filtered[lightboxIndex].caption}
                className="w-full max-h-[80vh] object-contain"
              />

              <p className="text-center text-sand-50/70 mt-6 text-sm">
                {filtered[lightboxIndex].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
