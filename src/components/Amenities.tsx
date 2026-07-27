import { Waves, Dumbbell, Flower2, Wifi, UtensilsCrossed, Users, Car, ConciergeBell } from 'lucide-react';
import { amenities } from '../data/hotel';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves,
  Dumbbell,
  Flower2,
  Wifi,
  UtensilsCrossed,
  Users,
  Car,
  ConciergeBell,
};

export default function Amenities() {
  return (
    <section id="amenities" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
            Hotel Facilities
          </span>
          <h2 className="font-serif text-3xl font-bold text-blu-950 sm:text-4xl">
            Amenities & Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blu-700">
            Everything you need for a seamless stay, from wellness to world-class business
            facilities.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((a) => {
            const Icon = iconMap[a.icon];
            return (
              <div
                key={a.title}
                className="group rounded-2xl border border-blu-100 bg-blu-50 p-6 transition-all hover:border-blu-300 hover:bg-white hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blu-800 transition-colors group-hover:bg-gold-400">
                  {Icon && <Icon className="h-6 w-6 text-white group-hover:text-blu-950" />}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-blu-950">{a.title}</h3>
                <p className="text-sm leading-relaxed text-blu-600">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
