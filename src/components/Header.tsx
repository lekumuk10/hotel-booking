import { useEffect, useState } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { hotel, navLinks } from '../data/hotel';

type Props = {
  onBook: () => void;
  onHome: () => void;
};

export default function Header({ onBook, onHome }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-blu-950/95 backdrop-blur-md py-3 shadow-lg shadow-blu-950/20'
          : 'bg-gradient-to-b from-black/50 to-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button onClick={onHome} className="flex items-center gap-2">
          <div className="flex flex-col leading-none">
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              Radisson
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-blu-200">
              Blu
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/90 transition-colors hover:text-gold-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <button className="flex items-center gap-1.5 text-sm text-white/90 transition-colors hover:text-gold-300">
            <Globe className="h-4 w-4" />
            EN
          </button>
          <a
            href={`tel:${hotel.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-1.5 text-sm text-white/90 transition-colors hover:text-gold-300"
          >
            <Phone className="h-4 w-4" />
            {hotel.phone}
          </a>
          <button
            onClick={onBook}
            className="rounded-full bg-gold-400 px-6 py-2.5 text-sm font-semibold text-blu-950 transition-all hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/30"
          >
            Book Now
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="animate-slide-down bg-blu-950/98 backdrop-blur-md lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-3 text-sm font-medium text-white/90 transition-colors hover:text-gold-300"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                onBook();
              }}
              className="mt-4 rounded-full bg-gold-400 px-6 py-3 text-center text-sm font-semibold text-blu-950"
            >
              Book Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
