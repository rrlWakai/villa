import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BookingForm from "./BookingForm";
import InquiryForm from "./InquiryForm";

export default function BookingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"booking" | "inquiry">("booking");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      id="booking"
      className="py-24 md:py-40 bg-sky-950 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-5 relative z-10 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-amber-400"></div>

                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/70">
                  Concierge
                </span>
              </div>

              <h2 className="font-display text-5xl md:text-6xl text-white leading-[1.1] mb-8">
                Reserve Your <br />
                <span className="italic text-amber-400 font-light">
                  Beach Escape
                </span>
              </h2>

              <p className="text-white/70 font-light text-lg leading-relaxed mb-12">
                Plan your stay at Villa Dacanay Beach Resort — a peaceful
                beachfront retreat in San Fabian, Pangasinan designed for family
                bonding, barkada trips, and relaxing seaside getaways.
              </p>

              {/* TRUST POINTS */}
              <div className="space-y-0">
                {[
                  "Exclusive beachfront access",
                  "Ideal for family & barkada groups",
                  "Relaxing seaside atmosphere",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-4 border-b border-white/10 py-4 transition-all hover:pl-1.5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 transition-transform group-hover:scale-150" />
                    <span className="text-white/90 font-normal text-sm tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-7 relative">
            <motion.div
              style={{ y: y1 }}
              className="p-1 bg-amber-500/10 shadow-2xl relative z-20"
            >
              <div className="border border-amber-400/20 bg-sky-950/95 relative overflow-hidden p-6 md:p-12">

                {/* subtle texture overlay */}
                <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />

                {/* TABS */}
                <div className="flex border-b border-white/10 mb-8 relative z-10">
                  <button
                    onClick={() => setActiveTab("booking")}
                    className={`flex-1 py-4 text-xs tracking-[0.2em] uppercase transition-all ${
                      activeTab === "booking"
                        ? "text-white font-bold border-b-2 border-amber-400 bg-white/5"
                        : "text-white/70"
                    }`}
                  >
                    Direct Booking
                  </button>

                  <button
                    onClick={() => setActiveTab("inquiry")}
                    className={`flex-1 py-4 text-xs tracking-[0.2em] uppercase transition-all ${
                      activeTab === "inquiry"
                        ? "text-white font-bold border-b-2 border-amber-400 bg-white/5"
                        : "text-white/70"
                    }`}
                  >
                    General Inquiry
                  </button>
                </div>

                {/* FORM */}
                <div className="relative z-10 min-h-[400px]">
                  {activeTab === "booking" ? (
                    <BookingForm />
                  ) : (
                    <InquiryForm />
                  )}
                </div>
              </div>
            </motion.div>

            {/* decorative frame */}
            <div className="absolute -bottom-10 -right-10 w-full h-full border border-white/10 hidden lg:block" />
          </div>

        </div>
      </div>
    </section>
  );
}