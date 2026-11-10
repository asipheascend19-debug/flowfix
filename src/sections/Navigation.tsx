import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Live Map', href: '#map' },
  { label: 'Impact', href: '#impact' },
  { label: 'Report a Leak', href: '#report' },
  { label: 'How It Works', href: '#howitworks' },
  { label: 'Ask Plumber', href: '#chat' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled ? 'bg-[#03045E]/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 group">
          <Droplets className="w-6 h-6 text-[#00B4D8] group-hover:scale-110 transition-transform" />
          <span className="font-['Playfair_Display'] font-bold text-[22px] text-[#00B4D8]">FlowFix</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="relative text-white text-sm font-medium hover:text-[#00B4D8] transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00B4D8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </a>
          ))}
          <a
            href="#report"
            onClick={(e) => handleClick(e, '#report')}
            className="bg-[#00B4D8] text-[#03045E] px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 hover:shadow-[0_0_24px_rgba(0,180,216,0.4)] transition-all duration-300"
          >
            Report Leak
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#03045E]/95 backdrop-blur-xl border-t border-white/10"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-white text-sm font-medium hover:text-[#00B4D8] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
