import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Rooms from './components/Rooms';
import Dining from './components/Dining';
import Amenities from './components/Amenities';
import Meetings from './components/Meetings';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Footer from './components/Footer';
import RoomDisplay from './components/RoomDisplay';

type View = 'home' | 'booking';

export default function App() {
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    const hash = window.location.hash;
    setView(hash === '#room-display' ? 'booking' : 'home');

    const onHashChange = () => {
      setView(window.location.hash === '#room-display' ? 'booking' : 'home');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const goBooking = () => {
    window.location.hash = '#room-display';
    setView('booking');
    window.scrollTo({ top: 0 });
  };

  const goHome = () => {
    window.location.hash = '';
    setView('home');
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onBook={goBooking} onHome={goHome} />
      <main>
        {view === 'booking' ? (
          <RoomDisplay onBack={goHome} />
        ) : (
          <>
            <Hero onBook={goBooking} />
            <Overview onBook={goBooking} />
            <Rooms onBook={goBooking} />
            <Dining />
            <Amenities />
            <Meetings />
            <Gallery />
            <Location />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
