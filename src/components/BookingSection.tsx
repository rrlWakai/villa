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
      className="py-24 md:py-40 bg-emerald-950 relative overflow-hidden"
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
                <div className="h-[1px] w-12 bg-gold-400"></div>

                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-sand-50/70">
                  Reservation Desk
                </span>
              </div>

              <h2 className="font-display text-5xl md:text-6xl text-sand-50 leading-[1.1] mb-8">
                Reserve Your <br />
                <span className="italic text-gold-400 font-light">
                  Staycation Escape
                </span>
              </h2>

              <p className="text-sand-50/70 font-light text-lg leading-relaxed mb-12">
                Plan your stay at The Grove by Six Marys in San Juan, Pampanga.
                Enjoy modern comfort, tropical greenery, and a relaxing resort
                atmosphere made for quick but meaningful escapes.
              </p>

              {/* TRUST POINTS */}
              <div className="space-y-0">
                {[
                  "Swimming pool with outdoor lounge area",
                  "Ambient indoor and al fresco dining",
                  "Garden and event/function space",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-4 border-b border-sand-100/10 py-4 transition-all hover:pl-1.5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0 transition-transform group-hover:scale-150" />
                    <span className="text-sand-50/90 font-normal text-sm tracking-wide">
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
              className="p-1 bg-gold-500/10 shadow-2xl relative z-20"
            >
              <div className="border border-gold-400/20 bg-emerald-950/95 relative overflow-hidden p-6 md:p-12">
                {/* subtle texture overlay */}
                <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />

                {/* TABS */}
                <div className="flex border-b border-sand-100/10 mb-8 relative z-10">
                  <button
                    onClick={() => setActiveTab("booking")}
                    className={`flex-1 py-4 text-xs tracking-[0.2em] uppercase transition-all ${
                      activeTab === "booking"
                        ? "text-sand-50 font-bold border-b-2 border-gold-400 bg-sand-50/5"
                        : "text-sand-50/70"
                    }`}
                  >
                    Direct Booking
                  </button>

                  <button
                    onClick={() => setActiveTab("inquiry")}
                    className={`flex-1 py-4 text-xs tracking-[0.2em] uppercase transition-all ${
                      activeTab === "inquiry"
                        ? "text-sand-50 font-bold border-b-2 border-gold-400 bg-sand-50/5"
                        : "text-sand-50/70"
                    }`}
                  >
                    General Inquiry
                  </button>
                </div>

                {/* FORM */}
                <div className="relative z-10 min-h-[400px]">
                  {activeTab === "booking" ? <BookingForm /> : <InquiryForm />}
                </div>
              </div>
            </motion.div>

            {/* decorative frame */}
            <div className="absolute -bottom-10 -right-10 w-full h-full border border-sand-100/10 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
