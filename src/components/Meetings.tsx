import { Maximize } from 'lucide-react';
import { meetingSpaces } from '../data/hotel';

export default function Meetings() {
  return (
    <section id="meetings" className="bg-blu-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
            Radisson Meetings
          </span>
          <h2 className="font-serif text-3xl font-bold text-blu-950 sm:text-4xl">
            Meetings & Events
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blu-700">
            14 state-of-the-art meeting rooms and a 590 m² ballroom, with 1,419 m²
            of total event space designed to inspire.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {meetingSpaces.map((space) => (
            <article
              key={space.name}
              className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={space.image}
                  alt={space.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blu-950/70 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-serif text-xl font-bold text-white">
                  {space.name}
                </h3>
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-2 text-blu-700">
                  <Maximize className="h-5 w-5 text-gold-500" />
                  <span className="text-sm font-medium">{space.area}</span>
                </div>
                <span className="text-sm font-medium text-blu-600">
                  Up to {space.capacity} guests
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#booking"
            className="inline-block rounded-full bg-blu-800 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-blu-700 hover:shadow-lg"
          >
            Enquire About an Event
          </a>
        </div>
      </div>
    </section>
  );
}
