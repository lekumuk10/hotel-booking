import { useState } from 'react';
import { Maximize, BedDouble, Check } from 'lucide-react';
import { rooms } from '../data/hotel';

type Props = {
  onBook: () => void;
};

export default function Rooms({ onBook }: Props) {
  const [activeRoom, setActiveRoom] = useState(0);

  return (
    <section id="rooms" className="bg-blu-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
            Accommodation
          </span>
          <h2 className="font-serif text-3xl font-bold text-blu-950 sm:text-4xl">
            Rooms & Suites
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blu-700">
            271 rooms and suites designed with calm Scandinavian sensibility, premium
            bedding, and every modern comfort.
          </p>
        </div>

        {/* Room selector tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {rooms.map((room, i) => (
            <button
              key={room.name}
              onClick={() => setActiveRoom(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                i === activeRoom
                  ? 'bg-blu-800 text-white shadow-md'
                  : 'bg-white text-blu-700 hover:bg-blu-100'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Active room display */}
        <div className="grid gap-8 overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
          <div className="relative h-72 overflow-hidden lg:h-auto">
            <img
              src={rooms[activeRoom].image}
              alt={rooms[activeRoom].name}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <h3 className="mb-4 font-serif text-2xl font-bold text-blu-950 lg:text-3xl">
              {rooms[activeRoom].name}
            </h3>
            <div className="mb-6 flex gap-6">
              <div className="flex items-center gap-2 text-blu-700">
                <Maximize className="h-5 w-5 text-gold-500" />
                <span className="text-sm font-medium">{rooms[activeRoom].size}</span>
              </div>
              <div className="flex items-center gap-2 text-blu-700">
                <BedDouble className="h-5 w-5 text-gold-500" />
                <span className="text-sm font-medium">{rooms[activeRoom].bed}</span>
              </div>
            </div>
            <ul className="grid gap-3">
              {rooms[activeRoom].features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-blu-800">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={onBook}
              className="mt-8 inline-block w-fit rounded-full bg-gold-400 px-8 py-3 text-sm font-semibold text-blu-950 transition-all hover:bg-gold-300 hover:shadow-lg"
            >
              Reserve This Room
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
