import { motion } from "framer-motion";
import { MapPin, Instagram, Facebook } from "lucide-react";
import Logo from "./Logo";

const navLinks = ["About", "Villas", "Amenities", "Gallery", "Reviews"];
const sectionIds = ["#about", "#rooms", "#amenities", "#gallery", "#reviews"];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-emerald-950 text-sand-50 relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-16 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          
          {/* Brand Section */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="mb-8">
              <Logo className="text-gold-400" />
            </div>
            <p className="text-sand-50/60 font-light leading-relaxed max-w-sm mb-10">
              A private luxury sanctuary in Alfonso, Cavite, accessible from Metro Manila. Experience a nature-focused staycation with a cool climate, relaxing ambiance, and peaceful tropical environment.
            </p>
            
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/VillaJimena.PH/?utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-sand-50/20 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-emerald-950 transition-all duration-500"
              >
                <Facebook strokeWidth={1.5} className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-sand-50/20 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-emerald-950 transition-all duration-500"
              >
                <Instagram strokeWidth={1.5} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-8 font-semibold">
              Explore
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link, i) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(sectionIds[i])}
                    className="text-sand-50/70 hover:text-gold-400 font-light transition-colors duration-300"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-8 font-semibold">
              Contact
            </h4>
            <ul className="space-y-4 text-sand-50/70 font-light">
              <li>
                <a href="mailto:concierge@villajimena.com" className="hover:text-gold-400 transition-colors duration-300">
                  concierge@villajimena.com
                </a>
              </li>
              <li>
                <a href="tel:+639000000000" className="hover:text-gold-400 transition-colors duration-300">
                  +63 900 000 0000
                </a>
              </li>
              <li className="pt-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="leading-relaxed">
                  Alfonso, Cavite <br /> Philippines
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-sand-50/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sand-50/40 text-xs tracking-wider uppercase">
            &copy; {new Date().getFullYear()} Villa Jimena Resort. All rights reserved.
          </p>
          <div className="flex gap-6 text-sand-50/40 text-xs tracking-wider uppercase">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
