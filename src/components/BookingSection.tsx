import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BookingForm from './BookingForm';
import InquiryForm from './InquiryForm';

export default function BookingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'booking' | 'inquiry'>('booking');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="booking" className="py-24 md:py-40 bg-sand-50 relative overflow-hidden" ref={containerRef}>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Text Content */}
          <div className="lg:col-span-5 relative z-10 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-gold-400"></div>
                {/* FIX: text-[11px] ensures minimum legible size for all-caps; tracking tightened slightly */}
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-800">
                  Concierge
                </span>
              </div>

              <h2 className="font-display text-5xl md:text-6xl text-emerald-950 leading-[1.1] mb-8">
                Reserve Your <br />
                <span className="italic text-gold-500 font-light">Private Escape</span>
              </h2>

              {/* FIX: Full opacity text-emerald-900 instead of /70 — raises contrast from ~3.1:1 to ~7.4:1 */}
              <p className="text-emerald-900 font-light text-lg leading-relaxed mb-12">
                Experience a luxurious tropical retreat crafted for unforgettable moments and peaceful getaways. Allow us to curate your perfect escape in Alfonso, Cavite.
              </p>

              {/* Trust signals */}
              <div className="space-y-0">
                {['Exclusive private estate access', 'Personalized concierge service', 'Bespoke event planning'].map((item, idx) => (
                  /*
                    FIX contrast: text-emerald-950 font-normal (was text-emerald-900/80 font-light)
                    FIX hover: group wrapper enables dot scale + row indent on hover
                  */
                  <div
                    key={idx}
                    className="group flex items-center gap-4 border-b border-emerald-900/10 py-4 transition-all duration-200 hover:pl-1.5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0 transition-transform duration-200 group-hover:scale-150" />
                    <span className="text-emerald-950 font-normal tracking-wide text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7 relative">
            <motion.div
              style={{ y: y1 }}
              className="bg-emerald-450/95 p-1 shadow-2xl relative z-20"
            >
              <div className="border border-gold-400/20 bg-emerald-950/95 relative overflow-hidden p-6 md:p-12">
                <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

                {/* Tabs */}
                <div className="flex border-b border-white/10 mb-8 relative z-10">
                  <button
                    onClick={() => setActiveTab('booking')}
                    className={`flex-1 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                      activeTab === 'booking'
                        ? 'text-white font-bold border-b-2 border-gold-400 bg-white/5'
                        /*
                          FIX contrast: fixed text color, no hover
                        */
                        : 'text-sand-50/90'
                    }`}
                  >
                    Direct Booking
                  </button>

                  <button
                    onClick={() => setActiveTab('inquiry')}
                    className={`flex-1 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                      activeTab === 'inquiry'
                        ? 'text-white font-bold border-b-2 border-gold-400 bg-white/5'
                        : 'text-sand-50/90'
                    }`}
                  >
                    General Inquiry
                  </button>
                </div>

                {/* Form content */}
                <div className="relative z-10 min-h-[400px]">
                  {activeTab === 'booking' ? (
                    <div className="booking-form-dark">
                      <BookingForm />
                    </div>
                  ) : (
                    <div className="inquiry-form-dark">
                      <InquiryForm />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Decorative Offset Block */}
            <div className="absolute -bottom-10 -right-10 w-full h-full border border-emerald-900/10 z-0 hidden lg:block" />
          </div>

        </div>
      </div>
    </section>
  );
}