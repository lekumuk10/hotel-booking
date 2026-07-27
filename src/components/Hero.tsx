import { useState } from 'react';
import { Calendar, Users, Star, MapPin } from 'lucide-react';
import { hotel } from '../data/hotel';

type Props = {
  onBook: () => void;
};

export default function Hero({ onBook }: Props) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Background images */}
      {hotel.heroImages.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === activeImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt={`Radisson Blu Nairobi ${i + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blu-950/60 via-blu-950/30 to-blu-950/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end pb-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up">
            <div className="mb-4 flex items-center gap-2 text-gold-300">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-widest">
                Upper Hill, Nairobi, Kenya
              </span>
            </div>
            <h1 className="mb-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Radisson Blu Hotel,
              <br />
              Nairobi Upper Hill
            </h1>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(hotel.rating) ? 'fill-gold-400 text-gold-400' : 'text-white/40'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-white/80">
                {hotel.rating} · {hotel.reviews} reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Image dots */}
      <div className="absolute bottom-32 left-1/2 z-10 hidden -translate-x-1/2 gap-2 lg:flex">
        {hotel.heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={`h-2 rounded-full transition-all ${
              i === activeImage ? 'w-8 bg-gold-400' : 'w-2 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>

      {/* Booking widget */}
      <BookingWidget onSubmit={onBook} />
    </section>
  );
}

function BookingWidget({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div
      id="booking"
      className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-blu-950/90 backdrop-blur-lg"
    >
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          <BookingField icon={<Calendar className="h-4 w-4" />} label="Check-in">
            <input type="date" className="booking-input" />
          </BookingField>
          <BookingField icon={<Calendar className="h-4 w-4" />} label="Check-out">
            <input type="date" className="booking-input" />
          </BookingField>
          <BookingField icon={<Users className="h-4 w-4" />} label="Guests">
            <select className="booking-input">
              <option>1 Adult</option>
              <option>2 Adults</option>
              <option>2 Adults, 1 Child</option>
              <option>3 Adults</option>
              <option>4 Adults</option>
            </select>
          </BookingField>
          <BookingField icon={<Users className="h-4 w-4" />} label="Rooms">
            <select className="booking-input">
              <option>1 Room</option>
              <option>2 Rooms</option>
              <option>3 Rooms</option>
            </select>
          </BookingField>
          <button
            type="submit"
            className="flex items-center justify-center rounded-lg bg-gold-400 px-6 py-3 text-sm font-semibold text-blu-950 transition-all hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/30"
          >
            Check Availability
          </button>
        </form>
      </div>
    </div>
  );
}

function BookingField({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-white/70">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
