export const hotel = {
  name: 'Radisson Blu Hotel, Nairobi Upper Hill',
  brand: 'Radisson Blu',
  address: 'Elgon Road, Upper Hill, Nairobi, Kenya',
  phone: '+254 709 810 000',
  email: 'reservations.nairobi@radissonblu.com',
  checkIn: '14:00',
  checkOut: '10:00',
  floors: 8,
  rooms: 271,
  rating: 4.5,
  reviews: 456,
  description:
    'Set in the heart of Nairobi\u2019s vibrant Upper Hill business district, the Radisson Blu Hotel, Nairobi Upper Hill combines contemporary Scandinavian design with warm African hospitality. With 271 thoughtfully appointed rooms, four signature dining outlets, a serene outdoor pool, and 14 state-of-the-art meeting rooms, it is the flagship address for business and leisure travellers alike.',
  heroImages: [
    'https://images.pexels.com/photos/14022368/pexels-photo-14022368.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/33881123/pexels-photo-33881123.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/13993979/pexels-photo-13993979.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/20277194/pexels-photo-20277194.jpeg?auto=compress&cs=tinysrgb&w=1920',
  ],
};

export const stats = [
  { label: 'Rooms & Suites', value: '271' },
  { label: 'Restaurants & Bars', value: '4' },
  { label: 'Meeting Rooms', value: '14' },
  { label: 'Floors', value: '8' },
];

export const rooms = [
  {
    name: 'Standard Room',
    size: '33 m²',
    bed: 'King or Twin',
    image:
      'https://images.pexels.com/photos/37542300/pexels-photo-37542300.jpeg?auto=compress&cs=tinysrgb&w=1260',
    features: [
      '33 m\u00b2 of contemporary comfort',
      'Plush king or twin beds',
      'Free high-speed Wi-Fi',
      'Rain shower & premium toiletries',
      'Smart TV with international channels',
      'Work desk with ergonomic chair',
    ],
  },
  {
    name: 'Superior Room',
    size: '38 m²',
    bed: 'King',
    image:
      'https://images.pexels.com/photos/36852544/pexels-photo-36852544.jpeg?auto=compress&cs=tinysrgb&w=1260',
    features: [
      '38 m\u00b2 with city views',
      'King-size bed with luxury linens',
      'Nespresso coffee machine',
      'Lounge seating area',
      'Upgraded bathroom amenities',
      'Complimentary mineral water',
    ],
  },
  {
    name: 'One Bedroom Suite',
    size: '60 m²',
    bed: 'King + Sofa Bed',
    image:
      'https://images.pexels.com/photos/20277194/pexels-photo-20277194.jpeg?auto=compress&cs=tinysrgb&w=1260',
    features: [
      '60 m\u00b2 of expansive living',
      'Separate living and sleeping areas',
      'Guest powder room',
      'Walk-in rain shower & bathtub',
      'Lounge corner sofa bed',
      'Access to Business Class lounge',
    ],
  },
  {
    name: 'Presidential Suite',
    size: '120 m²',
    bed: 'King',
    image:
      'https://images.pexels.com/photos/5793547/pexels-photo-5793547.jpeg?auto=compress&cs=tinysrgb&w=1260',
    features: [
      '120 m\u00b2 of ultimate luxury',
      'Panoramic Upper Hill skyline views',
      'Private dining for eight',
      'Spa-style marble bathroom',
      'Dedicated butler service',
      'Private check-in & airport transfer',
    ],
  },
];

export const restaurants = [
  {
    name: 'Larder Restaurant',
    type: 'International Buffet & \u00c0 la Carte',
    hours: '06:30 \u2013 22:30',
    description:
      'An all-day dining destination serving generous international buffets and live cooking stations, with a focus on fresh, locally sourced Kenyan produce.',
    image:
      'https://images.pexels.com/photos/13993979/pexels-photo-13993979.jpeg?auto=compress&cs=tinysrgb&w=1260',
  },
  {
    name: 'The Chop House',
    type: 'Grill & Steakhouse',
    hours: '18:00 \u2013 23:00',
    description:
      'Nairobi\u2019s premier steakhouse, dry-ageing premium cuts and pairing them with an curated cellar of New and Old World wines.',
    image:
      'https://images.pexels.com/photos/20184675/pexels-photo-20184675.jpeg?auto=compress&cs=tinysrgb&w=1260',
  },
  {
    name: 'Al Fresco',
    type: 'Poolside Bar & Grill',
    hours: '10:00 \u2013 22:00',
    description:
      'A relaxed outdoor setting by the pool, serving light bites, wood-fired pizzas, and signature cocktails under the Nairobi sun.',
    image:
      'https://images.pexels.com/photos/11448497/pexels-photo-11448497.jpeg?auto=compress&cs=tinysrgb&w=1260',
  },
  {
    name: 'Mandhari',
    type: 'Fine Dining',
    hours: '18:00 \u2013 23:00',
    description:
      'An intimate fine-dining room showcasing modern African gastronomy, where seasonal tasting menus celebrate the continent\u2019s boldest flavours.',
    image:
      'https://images.pexels.com/photos/20184675/pexels-photo-20184675.jpeg?auto=compress&cs=tinysrgb&w=1260',
  },
];

export const amenities = [
  { icon: 'Waves', title: 'Outdoor Pool', desc: 'Heated outdoor pool with sun loungers and a lifeguard on site.' },
  { icon: 'Dumbbell', title: '24h Fitness Centre', desc: 'State-of-the-art gym open around the clock for guests.' },
  { icon: 'Flower2', title: 'Spa & Wellness', desc: 'Steam room, sauna, jacuzzi and a full menu of treatments.' },
  { icon: 'Wifi', title: 'Free High-Speed Wi-Fi', desc: 'Complimentary fibre internet throughout the hotel.' },
  { icon: 'UtensilsCrossed', title: '4 Dining Venues', desc: 'From buffets to fine dining, four signature restaurants.' },
  { icon: 'Users', title: '14 Meeting Rooms', desc: '1,419 m\u00b2 of event space including a 590 m\u00b2 ballroom.' },
  { icon: 'Car', title: 'Valet Parking', desc: 'Secure on-site parking with valet service for all guests.' },
  { icon: 'ConciergeBell', title: 'Concierge', desc: 'A dedicated team to curate your Nairobi experience.' },
];

export const meetingSpaces = [
  { name: 'Upper Hill Ballroom', area: '590 m\u00b2', capacity: '500', image:
      'https://images.pexels.com/photos/5511124/pexels-photo-5511124.jpeg?auto=compress&cs=tinysrgb&w=1260' },
  { name: 'Boardroom A', area: '65 m\u00b2', capacity: '24', image:
      'https://images.pexels.com/photos/33827301/pexels-photo-33827301.jpeg?auto=compress&cs=tinysrgb&w=1260' },
  { name: 'Exhibition Hall', area: '150 m\u00b2', capacity: '120', image:
      'https://images.pexels.com/photos/5511124/pexels-photo-5511124.jpeg?auto=compress&cs=tinysrgb&w=1260' },
];

export const galleryImages = [
  { src: 'https://images.pexels.com/photos/34019543/pexels-photo-34019543.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Hotel exterior at dusk', span: 'lg:col-span-2 lg:row-span-2' },
  { src: 'https://images.pexels.com/photos/14022368/pexels-photo-14022368.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Lobby lounge', span: '' },
  { src: 'https://images.pexels.com/photos/33881123/pexels-photo-33881123.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Outdoor pool', span: '' },
  { src: 'https://images.pexels.com/photos/13993979/pexels-photo-13993979.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Larder Restaurant', span: '' },
  { src: 'https://images.pexels.com/photos/20277194/pexels-photo-20277194.jpeg?auto=compress&cs=tinysrgb&w=1260', alt: 'Suite living area', span: 'lg:col-span-2' },
];

export const navLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Dining', href: '#dining' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Meetings', href: '#meetings' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
];

export const roomRates = [
  {
    name: 'Standard Room',
    pricePerNight: 161,
    image:
      'https://images.pexels.com/photos/37542300/pexels-photo-37542300.jpeg?auto=compress&cs=tinysrgb&w=1260',
    description:
      'Contemporary comfort with plush king or twin beds, rain shower, and smart TV. Perfect for the modern traveller.',
    size: '33 m\u00b2',
    bed: 'King or Twin',
    view: 'City view',
    maxGuests: 2,
    ratePlan: 'Flexible Rate',
    cancellation: 'Free cancellation until 48h before check-in',
    breakfast: false,
    features: [
      'Free high-speed Wi-Fi',
      'Rain shower & premium toiletries',
      'Smart TV with international channels',
      'Work desk with ergonomic chair',
    ],
  },
  {
    name: 'Superior Room',
    pricePerNight: 194,
    image:
      'https://images.pexels.com/photos/36852544/pexels-photo-36852544.jpeg?auto=compress&cs=tinysrgb&w=1260',
    description:
      'Elevated city views with a king-size bed, Nespresso machine, and a relaxing lounge seating area.',
    size: '38 m\u00b2',
    bed: 'King',
    view: 'City view',
    maxGuests: 2,
    ratePlan: 'Bed & Breakfast',
    cancellation: 'Free cancellation until 48h before check-in',
    breakfast: true,
    features: [
      'Nespresso coffee machine',
      'Lounge seating area',
      'Upgraded bathroom amenities',
      'Complimentary mineral water',
    ],
  },
  {
    name: 'Premium Room \u2013 Park Facing',
    pricePerNight: 219,
    image:
      'https://images.pexels.com/photos/32895225/pexels-photo-32895225.jpeg?auto=compress&cs=tinysrgb&w=1260',
    description:
      'Wake up to serene park views from this upgraded room with premium bedding and a spacious layout.',
    size: '38 m\u00b2',
    bed: 'King',
    view: 'Park view',
    maxGuests: 2,
    ratePlan: 'Bed & Breakfast',
    cancellation: 'Free cancellation until 48h before check-in',
    breakfast: true,
    features: [
      'Nespresso coffee machine',
      'Premium bedding & linens',
      'Upgraded bathroom with rain shower',
      'Complimentary mineral water',
    ],
  },
  {
    name: 'Executive Room with Lounge Access',
    pricePerNight: 249,
    image:
      'https://images.pexels.com/photos/5860693/pexels-photo-5860693.jpeg?auto=compress&cs=tinysrgb&w=1260',
    description:
      'Business-class comfort with exclusive access to the Executive Lounge, complimentary breakfast, and evening canap\u00e9s.',
    size: '38 m\u00b2',
    bed: 'King or Twin',
    view: 'City view',
    maxGuests: 2,
    ratePlan: 'Executive Rate',
    cancellation: 'Free cancellation until 48h before check-in',
    breakfast: true,
    features: [
      'Executive Lounge access',
      'Complimentary breakfast & evening canap\u00e9s',
      'Nespresso coffee machine',
      'Press & shine service',
    ],
  },
  {
    name: 'Executive Room \u2013 Park Facing, Lounge Access',
    pricePerNight: 279,
    image:
      'https://images.pexels.com/photos/5379175/pexels-photo-5379175.jpeg?auto=compress&cs=tinysrgb&w=1260',
    description:
      'Executive perks with stunning park views, lounge access, and all the extras that make business travel effortless.',
    size: '38 m\u00b2',
    bed: 'King',
    view: 'Park view',
    maxGuests: 2,
    ratePlan: 'Executive Rate',
    cancellation: 'Free cancellation until 48h before check-in',
    breakfast: true,
    features: [
      'Executive Lounge access',
      'Complimentary breakfast & evening canap\u00e9s',
      'Nespresso coffee machine',
      'Press & shine service',
    ],
  },
  {
    name: 'One Bedroom Executive Suite',
    pricePerNight: 340,
    image:
      'https://images.pexels.com/photos/20277194/pexels-photo-20277194.jpeg?auto=compress&cs=tinysrgb&w=1260',
    description:
      'Spacious suite with separate living area, guest powder room, and executive lounge privileges for a refined stay.',
    size: '60 m\u00b2',
    bed: 'King + Sofa Bed',
    view: 'City view',
    maxGuests: 3,
    ratePlan: 'Suite Rate',
    cancellation: 'Free cancellation until 48h before check-in',
    breakfast: true,
    features: [
      'Separate living and sleeping areas',
      'Walk-in rain shower & bathtub',
      'Executive Lounge access',
      'Guest powder room',
    ],
  },
  {
    name: 'Presidential Suite',
    pricePerNight: 850,
    image:
      'https://images.pexels.com/photos/5793547/pexels-photo-5793547.jpeg?auto=compress&cs=tinysrgb&w=1260',
    description:
      'The ultimate address in Nairobi \u2014 120 m\u00b2 of panoramic luxury with private dining, butler service, and spa-style bathroom.',
    size: '120 m\u00b2',
    bed: 'King',
    view: 'Panoramic skyline view',
    maxGuests: 4,
    ratePlan: 'Suite Rate',
    cancellation: 'Free cancellation until 72h before check-in',
    breakfast: true,
    features: [
      'Panoramic Upper Hill skyline views',
      'Private dining for eight',
      'Dedicated butler service',
      'Spa-style marble bathroom',
    ],
  },
];
