import { Droplets } from 'lucide-react';

const footerLinks = [
  { label: 'Live Map', href: '#map' },
  { label: 'Impact', href: '#impact' },
  { label: 'Report a Leak', href: '#report' },
  { label: 'How It Works', href: '#howitworks' },
  { label: 'Ask Plumber', href: '#chat' },
];

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#03045E] border-t border-white/10 pt-16 pb-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="w-5 h-5 text-[#00B4D8]" />
              <span className="font-['Playfair_Display'] font-bold text-xl text-[#00B4D8]">
                FlowFix
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Community-powered water conservation. Built to help Johannesburg plug the leaks and protect our future.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-sm text-white/70 hover:text-[#00B4D8] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Credits */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">About</h4>
            <p className="text-xs text-white/50 leading-relaxed mb-2">
              Built for UJ Civil Engineering Technology final year project. University of Johannesburg, 2025.
            </p>
            <p className="text-xs text-white/40 leading-relaxed">
              Data sources: Johannesburg Water Annual Report, DWS No Drop Report 2023, Water Research Commission (WRC), National Treasury municipal data.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/30">
            &copy; 2025 FlowFix. Open data. Built for Johannesburg. 🇿🇦
          </p>
        </div>
      </div>
    </footer>
  );
}
