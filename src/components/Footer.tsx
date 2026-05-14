import { motion } from "framer-motion";
import { MapPin, Facebook, Phone } from "lucide-react";
import Logo from "./Logo";

const navLinks = ["About", "Amenities", "Gallery", "Reviews"];
const sectionIds = ["#about", "#amenities", "#gallery", "#reviews"];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative overflow-hidden text-sand-50 bg-emerald-950"
    >
      {/* Dark luxury gradient for readability */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/90 to-emerald-950" />
        <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">

          {/* Brand */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="mb-8">
              <Logo className="text-gold-400" />
            </div>

            <p className="text-sand-50/70 font-light leading-relaxed max-w-sm mb-10">
              The Grove by Six Marys is your perfect pause from your busy life, offering warm hospitality, modern comfort, and lush resort spaces in Bacolor, Pampanga.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/TheGrovebySixMarys"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-sand-50/20 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-emerald-950 transition-all duration-500"
              >
                <Facebook strokeWidth={1.5} className="w-5 h-5" />
              </a>

              <a href="tel:+639949368919" className="w-12 h-12 rounded-full border border-sand-50/20 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-emerald-950 transition-all duration-500">
                <Phone strokeWidth={1.5} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
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
                <a
                  href="https://www.facebook.com/TheGrovebySixMarys"
                  className="hover:text-gold-400 transition-colors duration-300"
                >
                  Facebook: The Grove by Six Marys
                </a>
              </li>

              <li>
                <a
                  href="tel:+639949368919"
                  className="hover:text-gold-400 transition-colors duration-300"
                >
                  0994 936 8919
                </a>
              </li>
              <li>
                <a
                  href="tel:+639159451281"
                  className="hover:text-gold-400 transition-colors duration-300"
                >
                  0915 945 1281
                </a>
              </li>

              <li className="pt-4 flex items-start gap-3">
                <MapPin
                  className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <span className="leading-relaxed">
                  Bacolor, Pampanga <br /> Philippines
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-sand-50/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sand-50/40 text-xs tracking-wider uppercase">
            &copy; {new Date().getFullYear()} The Grove by Six Marys. All rights reserved.
          </p>

          <div className="flex gap-6 text-sand-50/40 text-xs tracking-wider uppercase">
            <a href="#" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
