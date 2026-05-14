import { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  MessageSquare,
  Check,
  Loader2,
  Moon,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";
import { format, addDays, differenceInDays } from "date-fns";
import { reservationsService } from "../services/reservationsService";
import { useAvailability } from "../hooks/useAvailability";

export default function BookingForm() {
  const { isDateBooked, checkAvailability } = useAvailability();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: 2,
    specialRequests: "",
  });

  const nights =
    form.checkIn && form.checkOut
      ? differenceInDays(form.checkOut, form.checkIn)
      : 0;

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!form.checkIn || !form.checkOut) {
      toast.error("Please select your check-in and check-out dates.");
      return;
    }
    if (form.guests < 1) {
      toast.error("Please select at least 1 guest.");
      return;
    }

    setLoading(true);
    try {
      const checkInStr = format(form.checkIn, "yyyy-MM-dd");
      const checkOutStr = format(form.checkOut, "yyyy-MM-dd");

      const available = await checkAvailability(checkInStr, checkOutStr);
      if (!available) {
        toast.error(
          "Sorry, those dates are already booked. Please choose different dates.",
        );
        setLoading(false);
        return;
      }

      await reservationsService.create({
        name: form.name,
        email: form.email,
        phone: form.phone,
        check_in: checkInStr,
        check_out: checkOutStr,
        guests: form.guests,
        special_requests: form.specialRequests,
      });

      setSuccess(true);
      toast.success("Booking request sent! We'll confirm within 24 hours.");
    } catch (err) {
      console.error(err);
      toast.error(
        "Something went wrong. Please try again or contact us via WhatsApp.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-16 px-8"
      >
        <div className="w-20 h-20 bg-gold-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-gold-400" />
        </div>
        <h3 className="font-display text-3xl font-semibold text-sand-50 mb-3">
          Request Received!
        </h3>
        <p className="text-sand-50/80 mb-2">
          Thank you, <strong className="text-sand-50">{form.name}</strong>! Your booking request has been
          submitted.
        </p>
        <p className="text-sand-50/60 text-sm mb-8">
          We'll confirm your reservation via email or phone within 24 hours.
        </p>
        {form.checkIn && form.checkOut && (
          <div className="inline-flex gap-6 bg-sand-50/5 rounded-2xl px-8 py-4 border border-sand-100/20 mb-8">
            <div className="text-center">
              <div className="text-xs text-sand-50/50 uppercase tracking-wide mb-1">
                Check-in
              </div>
              <div className="font-semibold text-sand-50">
                {format(form.checkIn, "MMM d, yyyy")}
              </div>
            </div>
            <div className="w-px bg-sand-50/20" />
            <div className="text-center">
              <div className="text-xs text-sand-50/50 uppercase tracking-wide mb-1">
                Check-out
              </div>
              <div className="font-semibold text-sand-50">
                {format(form.checkOut, "MMM d, yyyy")}
              </div>
            </div>
            <div className="w-px bg-sand-50/20" />
            <div className="text-center">
              <div className="text-xs text-sand-50/50 uppercase tracking-wide mb-1">
                Guests
              </div>
              <div className="font-semibold text-sand-50">{form.guests}</div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            setSuccess(false);
            setStep(1);
            setForm({
              name: "",
              email: "",
              phone: "",
              checkIn: null,
              checkOut: null,
              guests: 2,
              specialRequests: "",
            });
          }}
          className="px-6 py-3 bg-gold-400 text-emerald-950 rounded-xl font-semibold hover:bg-gold-300 transition-colors"
        >
          Make Another Booking
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => step > s && setStep(s)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step === s
                  ? "bg-gold-400 text-emerald-950"
                  : step > s
                    ? "bg-gold-400/20 text-gold-400 cursor-pointer border border-gold-400/30"
                    : "bg-transparent text-sand-50/40 border border-sand-100/30"
              }`}
            >
              {step > s ? <Check className="w-4 h-4" /> : s}
            </button>
            <span
              className={`text-sm font-medium ${step >= s ? "text-sand-50" : "text-sand-50/40"}`}
            >
              {s === 1 ? "Select Dates" : "Your Details"}
            </span>
            {s < 2 && (
              <div
                className={`w-8 h-px mx-2 ${step > s ? "bg-gold-400/50" : "bg-sand-50/20"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Dates & Guests */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Check-in */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-sand-50 mb-2">
                <Calendar className="w-4 h-4 text-gold-400" />
                Check-in Date
              </label>
              <DatePicker
                selected={form.checkIn}
                onChange={(date) =>
                  setForm((f) => ({
                    ...f,
                    checkIn: date,
                    checkOut:
                      f.checkOut && date && f.checkOut <= date
                        ? null
                        : f.checkOut,
                  }))
                }
                minDate={new Date()}
                filterDate={(date) => !isDateBooked(date)}
                placeholderText="Select check-in"
                className="w-full px-4 py-3 border border-sand-100/20 rounded-xl text-sm input-luxury bg-sand-50/5 text-sand-50 placeholder:text-sand-50/50 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                dateFormat="MMMM d, yyyy"
              />
            </div>

            {/* Check-out */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-sand-50 mb-2">
                <Calendar className="w-4 h-4 text-gold-400" />
                Check-out Date
              </label>
              <DatePicker
                selected={form.checkOut}
                onChange={(date) => setForm((f) => ({ ...f, checkOut: date }))}
                minDate={
                  form.checkIn
                    ? addDays(form.checkIn, 1)
                    : addDays(new Date(), 1)
                }
                filterDate={(date) => !isDateBooked(date)}
                placeholderText="Select check-out"
                className="w-full px-4 py-3 border border-sand-100/20 rounded-xl text-sm input-luxury bg-sand-50/5 text-sand-50 placeholder:text-sand-50/50 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all disabled:opacity-50"
                dateFormat="MMMM d, yyyy"
                disabled={!form.checkIn}
              />
            </div>
          </div>

          {/* Nights summary */}
          {nights > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between p-4 bg-sand-50/5 border border-sand-100/20 rounded-xl"
            >
              <span className="text-sand-50 font-medium text-sm flex items-center gap-1">
                <Moon className="w-4 h-4 text-gold-400" /> {nights} night
                {nights > 1 ? "s" : ""}
              </span>
              <span className="text-sand-50/70 text-sm">
                {form.checkIn && format(form.checkIn, "MMM d")} →{" "}
                {form.checkOut && format(form.checkOut, "MMM d, yyyy")}
              </span>
            </motion.div>
          )}

          {/* Guests */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-sand-50 mb-2">
              <Users className="w-4 h-4 text-gold-400" />
              Number of Guests
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))
                }
                className="w-10 h-10 rounded-xl border border-sand-100/20 flex items-center justify-center text-sand-50/70 hover:border-gold-400 hover:text-gold-400 transition-colors font-semibold text-lg bg-sand-50/5"
              >
                −
              </button>
              <span className="font-display text-2xl font-medium text-sand-50 w-8 text-center">
                {form.guests}
              </span>
              <button
                onClick={() =>
                  setForm((f) => ({ ...f, guests: Math.min(20, f.guests + 1) }))
                }
                className="w-10 h-10 rounded-xl border border-sand-100/20 flex items-center justify-center text-sand-50/70 hover:border-gold-400 hover:text-gold-400 transition-colors font-semibold text-lg bg-sand-50/5"
              >
                +
              </button>
              <span className="text-sand-50/60 text-sm">(Max 20 guests)</span>
            </div>
          </div>

          {/* FIX: was `text-sand-50` (invalid Tailwind class — no color output).
              Changed to `text-emerald-950` which is the correct dark contrast
              color against the gold-400 background, matching all other gold
              buttons in this file (e.g. "Make Another Booking", submit button). */}
          <button
            onClick={() => {
              if (!form.checkIn || !form.checkOut) {
                toast.error("Please select both check-in and check-out dates.");
                return;
              }
              setStep(2);
            }}
            className="w-full py-4 bg-gold-400 text-emerald-950 font-semibold rounded-xl hover:bg-gold-300 transition-colors text-sm tracking-wide uppercase"
          >
            Continue to Details →
          </button>
        </motion.div>
      )}

      {/* Step 2: Guest Details */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-sand-50 mb-2">
              <User className="w-4 h-4 text-gold-400" />
              Full Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Maria Santos"
              className="w-full px-4 py-3 border border-sand-100/20 rounded-xl text-sm input-luxury bg-sand-50/5 text-sand-50 placeholder:text-sand-50/50 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-sand-50 mb-2">
                <Mail className="w-4 h-4 text-gold-400" />
                Email *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-sand-100/20 rounded-xl text-sm input-luxury bg-sand-50/5 text-sand-50 placeholder:text-sand-50/50 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-sand-50 mb-2">
                <Phone className="w-4 h-4 text-gold-400" />
                Phone *
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="+63 9XX XXX XXXX"
                className="w-full px-4 py-3 border border-sand-100/20 rounded-xl text-sm input-luxury bg-sand-50/5 text-sand-50 placeholder:text-sand-50/50 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-sand-50 mb-2">
              <MessageSquare className="w-4 h-4 text-gold-400" />
              Special Requests (Optional)
            </label>
            <textarea
              rows={3}
              value={form.specialRequests}
              onChange={(e) =>
                setForm((f) => ({ ...f, specialRequests: e.target.value }))
              }
              placeholder="Any special arrangements, occasion details, dietary needs, etc."
              className="w-full px-4 py-3 border border-sand-100/20 rounded-xl text-sm input-luxury bg-sand-50/5 text-sand-50 placeholder:text-sand-50/50 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all resize-none"
            />
          </div>

          {/* Summary */}
          <div className="p-4 bg-sand-50/5 rounded-xl border border-sand-100/20 text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-sand-50/60">Dates</span>
              <span className="font-medium text-sand-50">
                {form.checkIn && format(form.checkIn, "MMM d")} –{" "}
                {form.checkOut && format(form.checkOut, "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sand-50/60">Duration</span>
              <span className="font-medium text-sand-50">
                {nights} night{nights !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sand-50/60">Guests</span>
              <span className="font-medium text-sand-50">
                {form.guests} guest{form.guests !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-4 border border-sand-100/20 text-sand-50/70 font-semibold rounded-xl hover:bg-sand-50/5 hover:text-sand-50 transition-colors text-sm uppercase tracking-wide"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-[2] py-4 bg-gold-400 text-emerald-950 font-bold rounded-xl hover:bg-gold-300 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60 uppercase tracking-wide"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  Send Booking Request <MapPin className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <p className="text-center text-sand-50/50 text-xs">
            Your booking is a request — we'll confirm availability and send
            rates within 24 hours.
          </p>
        </motion.div>
      )}
    </div>
  );
}