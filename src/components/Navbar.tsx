import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Villas", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 150)) {
          current = `#${section}`;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
    setActiveSection(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "nav-scrolled py-2"
            : "bg-gradient-to-b from-black/50 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Desktop Left Links */}
            <div className="hidden lg:flex items-center gap-8 w-1/3">
              {navLinks.slice(0, 2).map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                    isScrolled
                      ? "text-emerald-900 hover:text-gold-500"
                      : "text-white/90 hover:text-gold-300"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1.5 left-0 w-full h-[1px] transform scale-x-0 transition-transform duration-300 origin-left ${isScrolled ? 'bg-gold-500' : 'bg-gold-300'} group-hover:scale-x-100 ${activeSection === link.href ? 'scale-x-100' : ''}`} />
                </button>
              ))}
            </div>

            {/* Logo Center */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex justify-center w-1/3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`transition-all duration-500 ${isScrolled ? 'scale-75 origin-top' : 'scale-100'}`}>
                <Logo isLight={!isScrolled} />
              </div>
            </motion.a>

            {/* Desktop Right Links & CTA */}
            <div className="hidden lg:flex items-center justify-end gap-8 w-1/3">
              {navLinks.slice(2).map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                    isScrolled
                      ? "text-emerald-900 hover:text-gold-500"
                      : "text-white/90 hover:text-gold-300"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1.5 left-0 w-full h-[1px] transform scale-x-0 transition-transform duration-300 origin-left ${isScrolled ? 'bg-gold-500' : 'bg-gold-300'} group-hover:scale-x-100 ${activeSection === link.href ? 'scale-x-100' : ''}`} />
                </button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo("#booking")}
                className={`px-6 py-2.5 text-sm tracking-widest uppercase transition-all duration-300 border ${
                  isScrolled
                    ? "border-emerald-900 text-emerald-900 hover:bg-emerald-900 hover:text-gold-300"
                    : "border-white/50 text-white hover:bg-white hover:text-emerald-900"
                }`}
              >
                Reserve
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center justify-end w-1/3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 transition-colors ${isScrolled ? "text-emerald-900" : "text-white"}`}
              >
                {isOpen ? (
                  <X className="w-8 h-8 font-light" strokeWidth={1} />
                ) : (
                  <Menu className="w-8 h-8 font-light" strokeWidth={1} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-emerald-900/95 backdrop-blur-xl lg:hidden flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-sm px-6">
              <Logo isLight={true} className="mb-8 scale-110" />
              
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollTo(link.href)}
                  className="text-2xl font-display italic text-white/90 hover:text-gold-300 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="pt-8 w-full"
              >
                <button
                  onClick={() => scrollTo("#booking")}
                  className="w-full py-4 border border-gold-400/50 text-gold-300 text-sm tracking-[0.2em] uppercase hover:bg-gold-400 hover:text-emerald-900 transition-all duration-500"
                >
                  Reserve Your Stay
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
