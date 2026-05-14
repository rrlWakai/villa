import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, BedDouble, Bath, Maximize } from "lucide-react";

const rooms = [
  {
    id: "family",
    name: "Family Room",
    tagline: "Perfect for Bonding",
    description:
      "A spacious staycation room designed for families and groups. Enjoy cozy beds, simple comforts, and easy access to the resort — perfect for shared moments and unforgettable stays by the shore.",
    capacity: 6,
    beds: "2 Queen Beds",
    baths: "1 Shared Bathroom",
    size: "40 sqm",
    image: "/images/roomsss.jpg",
  },
  {
    id: "standard",
    name: "Standard Room",
    tagline: "Simple Tropical Comfort",
    description:
      "A clean and comfortable room ideal for couples or small groups. Relax in a peaceful space designed for rest after a full day of resort adventures.",
    capacity: 2,
    beds: "1 Queen Bed",
    baths: "1 Shared Bathroom",
    size: "25 sqm",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "weekend",
    name: "Weekend Room",
    tagline: "For Group Getaways",
    description:
      "Designed for weekend trips and big groups, this room offers multiple beds, wide space, and a laid-back resort vibe perfect for fun and bonding moments.",
    capacity: 8,
    beds: "Multiple Beds (Bunk Setup)",
    baths: "1 Shared Bathroom",
    size: "50 sqm",
    image:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80&auto=format&fit=crop",
  },
];

const RoomSection = ({
  room,
  index,
}: {
  room: (typeof rooms)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative py-24 md:py-32 min-h-[80vh] flex items-center overflow-hidden"
    >
      <div
        className={`max-w-7xl mx-auto w-full px-6 lg:px-12 flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-16 lg:gap-24 relative z-10`}
      >
        {/* TEXT */}
        <div className="w-full md:w-5/12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold-400 font-display italic text-2xl mb-2 block">
              0{index + 1}
            </span>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-900">
                {room.tagline}
              </span>
              <div className="h-[1px] w-12 bg-emerald-900/30"></div>
            </div>

            <h3 className="font-display text-4xl lg:text-5xl text-emerald-950 leading-tight mb-6">
              {room.name}
            </h3>

            <p className="text-emerald-900/70 font-light text-lg leading-relaxed mb-10">
              {room.description}
            </p>

            {/* SPECS */}
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex justify-between border-b border-emerald-900/10 pb-4">
                <div className="flex items-center gap-3 text-emerald-900/80">
                  <BedDouble className="w-4 h-4 text-gold-400" />
                  <span className="text-sm">{room.beds}</span>
                </div>
              </div>

              <div className="flex justify-between border-b border-emerald-900/10 pb-4">
                <div className="flex items-center gap-3 text-emerald-900/80">
                  <Bath className="w-4 h-4 text-gold-400" />
                  <span className="text-sm">{room.baths}</span>
                </div>
              </div>

              <div className="flex justify-between border-b border-emerald-900/10 pb-4">
                <div className="flex items-center gap-3 text-emerald-900/80">
                  <Maximize className="w-4 h-4 text-gold-400" />
                  <span className="text-sm">{room.size}</span>
                </div>
              </div>

              <div className="flex justify-between border-b border-emerald-900/10 pb-4">
                <div className="flex items-center gap-3 text-emerald-900/80">
                  <Users className="w-4 h-4 text-gold-400" />
                  <span className="text-sm">
                    Up to {room.capacity} guests
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-xs tracking-[0.2em] uppercase font-medium text-emerald-950 border border-emerald-900 hover:bg-emerald-950 hover:text-sand-50 transition-colors duration-500"
            >
              View Details
            </motion.button>
          </motion.div>
        </div>

        {/* IMAGE */}
        <div className="w-full md:w-7/12 h-[60vh] md:h-[80vh] relative">
          <div className="w-full h-full overflow-hidden relative shadow-2xl">
            <motion.img
              style={{ y: yImage, scale: 1.1 }}
              src={room.image}
              alt={room.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-emerald-950/10 mix-blend-overlay"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Rooms() {
  return (
    <section id="rooms" className="bg-sand-100 py-24">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold-400 mb-4 block">
            The Accommodations
          </span>

          <h2 className="font-display text-5xl lg:text-6xl text-emerald-950 mb-6">
            Stay in <em className="italic text-gold-400 font-light">Tropical Comfort</em>
          </h2>
        </motion.div>
      </div>

      {/* ROOMS */}
      <div className="flex flex-col gap-12 lg:gap-0">
        {rooms.map((room, i) => (
          <RoomSection key={room.id} room={room} index={i} />
        ))}
      </div>

      {/* BANNER */}
      <div className="max-w-4xl mx-auto px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-emerald-950 px-8 py-16 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>

          <div className="relative z-10">
            <h3 className="font-display text-4xl text-sand-50 mb-4">
              Perfect for <span className="text-gold-400 italic">Couples, Families & Friends Getaways</span>
            </h3>

            <p className="text-sand-50/70 font-light tracking-wide">
              A staycation experience made for bonding, relaxation, and unforgettable memories.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
