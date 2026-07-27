import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { hotel, navLinks } from '../data/hotel';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-blu-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex flex-col leading-none">
              <span className="font-serif text-2xl font-bold text-white">Radisson</span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-blu-300">
                Blu
              </span>
            </div>
            <p className="text-sm leading-relaxed text-blu-300">
              First-class, full-service hospitality in the heart of Nairobi's Upper Hill
              business district.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              Explore
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-blu-300 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-blu-300">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                {hotel.address}
              </li>
              <li>
                <a
                  href={`tel:${hotel.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 transition-colors hover:text-gold-300"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold-400" />
                  {hotel.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${hotel.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-gold-300"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold-400" />
                  {hotel.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social + Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              Stay Connected
            </h4>
            <div className="mb-6 flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blu-800 text-blu-200 transition-all hover:bg-gold-400 hover:text-blu-950"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-lg border border-blu-700 bg-blu-900 px-4 py-2.5 text-sm text-white placeholder-blu-400 focus:border-gold-400 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-gold-400 px-4 py-2.5 text-sm font-semibold text-blu-950 transition-colors hover:bg-gold-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-blu-400">
            © 2026 Radisson Hotel Group. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-blu-400 transition-colors hover:text-gold-300">
              Privacy
            </a>
            <a href="#" className="text-xs text-blu-400 transition-colors hover:text-gold-300">
              Cookie Policy
            </a>
            <a href="#" className="text-xs text-blu-400 transition-colors hover:text-gold-300">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
