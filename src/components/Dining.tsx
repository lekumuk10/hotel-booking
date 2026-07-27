import { Clock } from 'lucide-react';
import { restaurants } from '../data/hotel';

export default function Dining() {
  return (
    <section id="dining" className="bg-blu-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Culinary Journeys
          </span>
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Four Signature Restaurants
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blu-200">
            From generous international buffets to intimate fine dining, every meal is a
            celebration of flavour and craft.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {restaurants.map((r) => (
            <article
              key={r.name}
              className="group relative overflow-hidden rounded-2xl bg-blu-900"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={r.image}
                  alt={r.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blu-950 via-blu-950/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-300">
                    {r.type}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">{r.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4 text-sm leading-relaxed text-blu-200">{r.description}</p>
                <div className="flex items-center gap-2 text-blu-300">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium">{r.hours}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
