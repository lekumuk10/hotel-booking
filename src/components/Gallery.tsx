import { galleryImages } from '../data/hotel';

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
            Visual Tour
          </span>
          <h2 className="font-serif text-3xl font-bold text-blu-950 sm:text-4xl">
            Hotel Gallery
          </h2>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 lg:grid-cols-4 lg:auto-rows-[240px]">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-xl ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blu-950/0 transition-colors group-hover:bg-blu-950/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
