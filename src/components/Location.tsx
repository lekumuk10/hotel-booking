import { MapPin, Phone, Mail, Clock, Car, Plane } from 'lucide-react';
import { hotel } from '../data/hotel';

export default function Location() {
  return (
    <section id="location" className="bg-blu-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Info */}
          <div>
            <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
              Getting Here
            </span>
            <h2 className="mb-6 font-serif text-3xl font-bold text-white sm:text-4xl">
              Location & Contact
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-blu-200">
              Perfectly positioned in Nairobi's Upper Hill business district, the hotel
              is minutes from the CBD, Wilson Airport, and key diplomatic missions.
            </p>

            <div className="space-y-5">
              <InfoRow icon={<MapPin className="h-5 w-5" />} label="Address" value={hotel.address} />
              <InfoRow
                icon={<Phone className="h-5 w-5" />}
                label="Phone"
                value={hotel.phone}
                href={`tel:${hotel.phone.replace(/\s/g, '')}`}
              />
              <InfoRow
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={hotel.email}
                href={`mailto:${hotel.email}`}
              />
              <InfoRow
                icon={<Clock className="h-5 w-5" />}
                label="Check-in / Check-out"
                value={`${hotel.checkIn} / ${hotel.checkOut}`}
              />
              <InfoRow
                icon={<Plane className="h-5 w-5" />}
                label="Jomo Kenyatta Intl Airport"
                value="18 km · approx. 30 min drive"
              />
              <InfoRow
                icon={<Car className="h-5 w-5" />}
                label="Wilson Airport"
                value="5 km · approx. 15 min drive"
              />
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl">
            <iframe
              title="Radisson Blu Nairobi Upper Hill location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=36.808%2C-1.298%2C36.828%2C-1.282&layer=mapnik&marker=-1.29%2C36.818"
              className="h-full min-h-[400px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blu-800 text-gold-300">
        {icon}
      </div>
      <div>
        <span className="block text-xs font-semibold uppercase tracking-wide text-blu-400">
          {label}
        </span>
        <span className="text-white">{value}</span>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}
