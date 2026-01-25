import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-silk-charcoal border-t border-background/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="text-2xl font-serif tracking-[0.3em] text-background">
            SILK<span className="text-gold">4</span>ME
          </a>

          {/* Copyright */}
          <p className="text-sm text-background/70 text-center">
            © 2026 Silk4me. Всі права захищено. Український бренд преміум шовку.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/silk4me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-background/30 flex items-center justify-center text-background/70 hover:text-gold hover:border-gold transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-background/30 flex items-center justify-center text-background/70 hover:text-gold hover:border-gold transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
