import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MessageSquare, Send, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { inquiriesService } from '../services/inquiriesService';

export default function InquiryForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      await inquiriesService.create(form);
      setSent(true);
      toast.success('Message sent! We\'ll get back to you soon.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-10"
      >
        <div className="w-14 h-14 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-gold-400" />
        </div>
        <h3 className="font-display text-xl font-semibold text-sand-50 mb-2">Message Sent!</h3>
        <p className="text-sand-50/70 text-sm">We'll reply to <strong className="text-sand-50">{form.email}</strong> within 24 hours.</p>
        <button
          onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
          className="mt-6 px-5 py-2.5 bg-gold-500 text-emerald-950 rounded-xl text-sm font-semibold hover:bg-gold-400 transition-colors uppercase tracking-wide"
        >
          Send Another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-sand-50/80 mb-2">
          <User className="w-4 h-4 text-gold-400" />
          Full Name *
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="Maria Santos"
          className="w-full px-4 py-3 border border-white/20 rounded-xl text-sm input-luxury bg-white/5 text-sand-50 placeholder:text-sand-50/40 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-sand-50/80 mb-2">
            <Mail className="w-4 h-4 text-gold-400" />
            Email *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-white/20 rounded-xl text-sm input-luxury bg-white/5 text-sand-50 placeholder:text-sand-50/40 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-sand-50/80 mb-2">
            <Phone className="w-4 h-4 text-gold-400" />
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="+63 9XX XXX XXXX"
            className="w-full px-4 py-3 border border-white/20 rounded-xl text-sm input-luxury bg-white/5 text-sand-50 placeholder:text-sand-50/40 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-sand-50/80 mb-2">
          <MessageSquare className="w-4 h-4 text-gold-400" />
          Message *
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Tell us about your event, group size, preferred dates, or any questions..."
          className="w-full px-4 py-3 border border-white/20 rounded-xl text-sm input-luxury bg-white/5 text-sand-50 placeholder:text-sand-50/40 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all resize-none"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gold-500 text-emerald-950 font-bold rounded-xl hover:bg-gold-400 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60 uppercase tracking-wide"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
        ) : (
          <><Send className="w-4 h-4" /> Send Message</>
        )}
      </motion.button>
    </form>
  );
}
