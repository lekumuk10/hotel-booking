import { hotel, stats } from '../data/hotel';

type Props = {
  onBook: () => void;
};

export default function Overview({ onBook }: Props) {
  return (
    <section id="overview" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
              Welcome
            </span>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blu-950 sm:text-4xl">
              Scandinavian design meets African warmth
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-blu-800">
              {hotel.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#rooms"
                className="rounded-full border border-blu-300 px-6 py-3 text-sm font-semibold text-blu-800 transition-all hover:border-blu-500 hover:bg-blu-50"
              >
                Explore Rooms
              </a>
              <a
                href="#rooms"
                onClick={(e) => { e.preventDefault(); onBook(); }}
                className="rounded-full bg-blu-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blu-700"
              >
                Book a Room
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-blu-100">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group flex flex-col items-center justify-center bg-white p-8 text-center transition-colors hover:bg-blu-50 lg:p-12"
              >
                <span className="mb-2 font-serif text-4xl font-bold text-blu-700 lg:text-5xl">
                  {stat.value}
                </span>
                <span className="text-sm font-medium uppercase tracking-wide text-blu-600">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
