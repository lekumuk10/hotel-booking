
import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import axios from "axios";
import { paystack } from "../hooks/usePaystack";

import {
  Calendar,
  Users,
  BedDouble,
  Maximize,
  Eye,
  Check,
  ChevronLeft,
  Coffee,
  ShieldCheck,
  Star,
  ArrowRight,
  ArrowLeft,
  Lock,
  CreditCard,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Loader2,
  KeyRound,
} from 'lucide-react';
import { hotel } from "../data/hotel";
import { useRooms } from "../hooks/useRooms";

function todayISO(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(diff / 86_400_000));
}

function formatRange(checkIn: string, checkOut: string): string {
  if (!checkIn || !checkOut) return '';
  const opts: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };
  return `${new Date(checkIn).toLocaleDateString('en-US', opts)} – ${new Date(
    checkOut,
  ).toLocaleDateString('en-US', opts)}`;
}

function formatDateLong(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

type Step = 'search' | 'guest' | 'payment' | 'confirmation';

interface RoomRate {
  id: number;
  name: string;
  pricePerNight: number;
  image: string;
  description: string;
  size: string;
  bed: string;
  view: string;
  maxGuests: number;
  ratePlan: string;
  cancellation: string;
  breakfast: boolean;
  features: string[];
}

interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
}

export default function RoomDisplay({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>('search');
  const [checkIn, setCheckIn] = useState(todayISO(1));
  const [checkOut, setCheckOut] = useState(todayISO(6));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomCount, setRoomCount] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [sort, setSort] = useState<'lowest' | 'highest'>('lowest');
  const [selectedRoom, setSelectedRoom] = useState<RoomRate | null>(null);
  const [guest, setGuest] = useState<GuestDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [payment, setPayment] = useState<PaymentDetails>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
  });
  const [submitting, setSubmitting] = useState(false);
 const [confirmation, setConfirmation] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { rooms, loading, error } = useRooms();

  const nights = useMemo(
    () => nightsBetween(checkIn, checkOut),
    [checkIn, checkOut],
  );
const sortedRooms = useMemo(() => {
  const copy = rooms.map((room) => ({
    id: room.id,
    name: room.name,
    description: room.description,
    pricePerNight: Number(room.base_price),
    image: "/images/default-room.jpg",
    size: `${room.room_size} m²`,
    bed: room.bed_type,
    view: "City View",
    maxGuests: room.max_adults + room.max_children,
    ratePlan: "Flexible Rate",
    cancellation: "Free cancellation",
    breakfast: true,
    features: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Smart TV",
      "Mini Bar",
    ],
  }));

  copy.sort((a, b) =>
    sort === "lowest"
      ? a.pricePerNight - b.pricePerNight
      : b.pricePerNight - a.pricePerNight
  );
  

  return copy;
}, [rooms, sort]);

  const total = selectedRoom
    ? selectedRoom.pricePerNight * nights * roomCount
    : 0;

  const tax = useMemo(() => total * 0.16, [total]);
  const grandTotal = total + tax;

  function handleSelectRoom(room: RoomRate) {
    setSelectedRoom(room);
    setStep('guest');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function validateGuest(): boolean {
    const e: Record<string, string> = {};
    if (!guest.firstName.trim()) e.firstName = 'First name is required';
    if (!guest.lastName.trim()) e.lastName = 'Last name is required';
    if (!guest.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email))
      e.email = 'Enter a valid email address';
    if (!guest.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[+\d\s()-]{7,}$/.test(guest.phone))
      e.phone = 'Enter a valid phone number';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validatePayment(): boolean {
    const e: Record<string, string> = {};
    const digits = payment.cardNumber.replace(/\s/g, '');
    if (!digits) e.cardNumber = 'Card number is required';
    else if (digits.length < 13 || digits.length > 19)
      e.cardNumber = 'Enter a valid card number';
    if (!payment.cardName.trim()) e.cardName = 'Name on card is required';
    if (!payment.expiry.trim()) e.expiry = 'Expiry date is required';
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry))
      e.expiry = 'Format: MM/YY';
    if (!payment.cvc.trim()) e.cvc = 'CVC is required';
    else if (!/^\d{3,4}$/.test(payment.cvc))
      e.cvc = '3 or 4 digits';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleConfirmPayment() {

    if (!validatePayment() || !selectedRoom) return;

    setSubmitting(true);

    try {

        const response = await axios.post(

            "https://hotel-booking-hvwt.onrender.com/api/payments/initialize",

            {

                room_id: selectedRoom.id,
                room_name: selectedRoom.name,

                guest_first_name: guest.firstName,
                guest_last_name: guest.lastName,
                guest_email: guest.email,
                guest_phone: guest.phone,

                check_in: checkIn,
                check_out: checkOut,

                nights,

                adults,
                children,
                rooms: roomCount,

                price_per_night: selectedRoom.pricePerNight,

                subtotal: total,
                tax,
                total: grandTotal

            }

        );

       if (response.data.success) {

    paystack.resumeTransaction({
    accessCode: response.data.access_code,

    onSuccess: async (transaction: any) => {
        try {
            await axios.get(
                `${import.meta.env.VITE_API_URL}/payments/verify/${transaction.reference}`
            );

            alert("Payment Successful!");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Payment verification failed.");
        }
    },

    onCancel: () => {
        alert("Payment Cancelled.");
    }
});

    return;

}

        alert("Unable to initialize payment.");

    } catch (err: any) {

        console.error(err);

        alert(

            err.response?.data?.message ||

            "Unable to connect to Paystack."

        );

    } finally {

        setSubmitting(false);

    }

}

  function startOver() {
    setStep('search');
    setSelectedRoom(null);
    setGuest({ firstName: '', lastName: '', email: '', phone: '' });
    setPayment({ cardNumber: '', cardName: '', expiry: '', cvc: '' });
    setConfirmation(null);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading available rooms...
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen flex items-center justify-center text-red-600">
      {error}
    </div>
  );
}
  return (
    <section id="room-display" className="min-h-screen bg-blu-50 pt-28 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={step === 'search' ? onBack : startOver}
          className="mb-2 flex items-center gap-1.5 text-sm font-medium text-blu-600 transition-colors hover:text-blu-900"
        >
          <ChevronLeft className="h-4 w-4" />
          {step === 'search' ? 'Back to hotel' : 'Start over'}
        </button>

        {/* Stepper */}
        {step !== 'confirmation' && (
          <Stepper step={step} />
        )}

        {/* ---- Step 1: Search & Room selection ---- */}
        {step === 'search' && (
          <>
            <SearchBar
              checkIn={checkIn}
              checkOut={checkOut}
              adults={adults}
              children={children}
              rooms={roomCount}
              showSearch={showSearch}
              onToggleSearch={() => setShowSearch((s) => !s)}
              onCheckIn={setCheckIn}
              onCheckOut={setCheckOut}
              onAdults={setAdults}
              onChildren={setChildren}
              onRooms={setRoomCount}
              onUpdate={() => setShowSearch(false)}
            />

            <div className="py-10">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-blu-950 sm:text-3xl">
                    {hotel.name}
                  </h1>
                  <p className="mt-1 text-sm text-blu-600">
                    {nights > 0
                      ? `${formatRange(checkIn, checkOut)} · ${nights} night${nights !== 1 ? 's' : ''} · ${adults + children} guest${adults + children !== 1 ? 's' : ''} · ${roomCount} room${roomCount !== 1 ? 's' : ''}`
                      : 'Select your dates to see rates'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-blu-600">Sort by</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as 'lowest' | 'highest')}
                    className="rounded-lg border border-blu-200 bg-white px-3 py-2 text-sm text-blu-950 focus:border-gold-400 focus:outline-none"
                  >
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="space-y-5">
                {sortedRooms.map((room) => {
                  const roomTotal = room.pricePerNight * nights * roomCount;
                  return (
                    <article
                      key={room.name}
                      className="group grid overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl lg:grid-cols-[380px_1fr_240px]"
                    >
                      <div className="relative h-60 overflow-hidden lg:h-full">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {room.breakfast && (
                          <span className="absolute left-3 top-3 rounded-full bg-blu-950/80 px-3 py-1 text-xs font-semibold text-gold-300 backdrop-blur-sm">
                            Breakfast included
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col p-5 lg:p-6">
                        <h3 className="font-serif text-xl font-bold text-blu-950">
                          {room.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-blu-600">
                          {room.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-blu-700">
                          <span className="flex items-center gap-1.5">
                            <Maximize className="h-4 w-4 text-gold-500" />
                            {room.size}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <BedDouble className="h-4 w-4 text-gold-500" />
                            {room.bed}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Eye className="h-4 w-4 text-gold-500" />
                            {room.view}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-gold-500" />
                            Up to {room.maxGuests} guests
                          </span>
                        </div>

                        <ul className="mt-4 grid gap-1.5">
                          {room.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs text-blu-700">
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 flex flex-wrap gap-3 text-xs text-blu-600">
                          <span className="flex items-center gap-1.5 rounded-full bg-blu-50 px-3 py-1">
                            <ShieldCheck className="h-3.5 w-3.5 text-blu-500" />
                            {room.cancellation}
                          </span>
                          <span className="rounded-full bg-blu-50 px-3 py-1 font-medium text-blu-600">
                            {room.ratePlan}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between border-t border-blu-100 p-5 lg:border-t-0 lg:border-l">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-serif text-3xl font-bold text-blu-950">
                              ${room.pricePerNight}
                            </span>
                            <span className="text-sm text-blu-500">/ night</span>
                          </div>
                          {nights > 0 && (
                            <p className="mt-1 text-sm text-blu-600">
                              ${roomTotal.toLocaleString()} for {nights} night{nights !== 1 ? 's' : ''}
                              {roomCount > 1 ? ` · ${roomCount} rooms` : ''}
                            </p>
                          )}
                          {room.breakfast && (
                            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-gold-600">
                              <Coffee className="h-3.5 w-3.5" />
                              Breakfast included
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleSelectRoom(room)}
                          className="mt-5 flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-blu-950 transition-all hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/30"
                        >
                          Select Room
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-blu-500">
                <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                  {hotel.rating} · {hotel.reviews} verified reviews
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Best rate guaranteed
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  No booking fees
                </span>
              </div>
            </div>
          </>
        )}

        {/* ---- Step 2: Guest details ---- */}
        {step === 'guest' && selectedRoom && (
          <div className="grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
            <div className="animate-fade-up">
              <h1 className="font-serif text-2xl font-bold text-blu-950 sm:text-3xl">
                Guest Details
              </h1>
              <p className="mt-1 text-sm text-blu-600">
                Tell us who will be staying. This information appears on your confirmation.
              </p>

              <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    icon={<User className="h-4 w-4" />}
                    label="First name"
                    value={guest.firstName}
                    onChange={(v) => setGuest({ ...guest, firstName: v })}
                    error={errors.firstName}
                    placeholder="John"
                  />
                  <InputField
                    icon={<User className="h-4 w-4" />}
                    label="Last name"
                    value={guest.lastName}
                    onChange={(v) => setGuest({ ...guest, lastName: v })}
                    error={errors.lastName}
                    placeholder="Doe"
                  />
                  <InputField
                    icon={<Mail className="h-4 w-4" />}
                    label="Email address"
                    type="email"
                    value={guest.email}
                    onChange={(v) => setGuest({ ...guest, email: v })}
                    error={errors.email}
                    placeholder="john.doe@email.com"
                  />
                  <InputField
                    icon={<Phone className="h-4 w-4" />}
                    label="Phone number"
                    type="tel"
                    value={guest.phone}
                    onChange={(v) => setGuest({ ...guest, phone: v })}
                    error={errors.phone}
                    placeholder="+254 712 345 678"
                  />
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  <button
                    onClick={() => setStep('search')}
                    className="flex items-center justify-center gap-2 rounded-full border border-blu-200 px-6 py-3 text-sm font-semibold text-blu-700 transition-colors hover:bg-blu-100"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to rooms
                  </button>
                  <button
                    onClick={() => {
                      if (validateGuest()) {
                        setStep('payment');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-blu-950 transition-all hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/30"
                  >
                    Continue to payment
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <BookingSummary
              room={selectedRoom}
              checkIn={checkIn}
              checkOut={checkOut}
              nights={nights}
              adults={adults}
              children={children}
              rooms={roomCount}
              total={total}
              tax={tax}
              grandTotal={grandTotal}
            />
          </div>
        )}

        {/* ---- Step 3: Payment ---- */}
        {step === 'payment' && selectedRoom && (
          <div className="grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
            <div className="animate-fade-up">
              <h1 className="font-serif text-2xl font-bold text-blu-950 sm:text-3xl">
                Payment Details
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-blu-600">
                <Lock className="h-3.5 w-3.5" />
                This is a demo — no real payment will be processed.
              </p>

              <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
                {/* Accepted cards */}
                <div className="mb-5 flex items-center gap-2 border-b border-blu-100 pb-4">
                  <CreditCard className="h-5 w-5 text-blu-600" />
                  <span className="text-sm font-medium text-blu-700">We accept</span>
                  <div className="flex gap-2">
                    {['Visa', 'Mastercard', 'Amex'].map((c) => (
                      <span key={c} className="rounded border border-blu-200 bg-blu-50 px-2 py-0.5 text-xs font-semibold text-blu-600">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-5">
                  <InputField
                    icon={<CreditCard className="h-4 w-4" />}
                    label="Card number"
                    value={payment.cardNumber}
                    onChange={(v) => setPayment({ ...payment, cardNumber: formatCardNumber(v) })}
                    error={errors.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    maxLength={23}
                  />
                  <InputField
                    icon={<User className="h-4 w-4" />}
                    label="Name on card"
                    value={payment.cardName}
                    onChange={(v) => setPayment({ ...payment, cardName: v })}
                    error={errors.cardName}
                    placeholder="JOHN DOE"
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InputField
                      label="Expiry date"
                      value={payment.expiry}
                      onChange={(v) => setPayment({ ...payment, expiry: formatExpiry(v) })}
                      error={errors.expiry}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    <InputField
                      icon={<Lock className="h-4 w-4" />}
                      label="CVC"
                      value={payment.cvc}
                      onChange={(v) => setPayment({ ...payment, cvc: v.replace(/\D/g, '').slice(0, 4) })}
                      error={errors.cvc}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                {errors.submit && (
                  <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errors.submit}
                  </p>
                )}

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  <button
                    onClick={() => setStep('guest')}
                    className="flex items-center justify-center gap-2 rounded-full border border-blu-200 px-6 py-3 text-sm font-semibold text-blu-700 transition-colors hover:bg-blu-100"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to guest details
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-blu-950 transition-all hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/30 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing payment…
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Pay ${grandTotal.toLocaleString()} & Confirm
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <BookingSummary
              room={selectedRoom}
              checkIn={checkIn}
              checkOut={checkOut}
              nights={nights}
              adults={adults}
              children={children}
              rooms={roomCount}
              total={total}
              tax={tax}
              grandTotal={grandTotal}
            />
          </div>
        )}

        {/* ---- Step 4: Confirmation ---- */}
        {step === 'confirmation' && confirmation && (
          <div className="flex min-h-[60vh] items-center justify-center py-10">
            <div className="animate-fade-up w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-xl lg:p-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="mt-6 font-serif text-3xl font-bold text-blu-950">
                Booking Confirmed!
              </h1>
              <p className="mt-2 text-sm text-blu-600">
                A confirmation email has been sent to{' '}
                <span className="font-semibold text-blu-800">{confirmation.guest_email}</span>
              </p>

              <div className="mt-8 rounded-xl bg-blu-50 p-6 text-left">
                <div className="flex items-center justify-between border-b border-blu-100 pb-3">
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blu-500">
                    <KeyRound className="h-4 w-4" />
                    Booking Reference
                  </span>
                  <span className="font-mono text-lg font-bold text-blu-950">
                    {confirmation.id}
                  </span>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <ConfirmRow label="Guest" value={`${confirmation.guest_first_name} ${confirmation.guest_last_name}`} />
                  <ConfirmRow label="Room" value={confirmation.room_name} />
                  <ConfirmRow label="Check-in" value={formatDateLong(confirmation.check_in)} />
                  <ConfirmRow label="Check-out" value={formatDateLong(confirmation.check_out)} />
                  <ConfirmRow label="Nights" value={`${confirmation.nights}`} />
                  <ConfirmRow label="Guests" value={`${confirmation.adults + confirmation.children}`} />
                  <ConfirmRow label="Card" value={`•••• ${confirmation.card_last4}`} />
                  <ConfirmRow label="Total Paid" value={`$${confirmation.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={startOver}
                  className="flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-blu-950 transition-all hover:bg-gold-300"
                >
                  Book another stay
                </button>
                <button
                  onClick={onBack}
                  className="flex items-center justify-center gap-2 rounded-full border border-blu-200 px-6 py-3 text-sm font-semibold text-blu-700 transition-colors hover:bg-blu-100"
                >
                  Back to hotel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

/* ---- Stepper ---- */
function Stepper({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: 'search', label: 'Select Room' },
    { key: 'guest', label: 'Guest Details' },
    { key: 'payment', label: 'Payment' },
  ];
  const currentIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="mb-6 flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                i < currentIndex
                  ? 'bg-green-500 text-white'
                  : i === currentIndex
                    ? 'bg-gold-400 text-blu-950'
                    : 'bg-blu-100 text-blu-400'
              }`}
            >
              {i < currentIndex ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={`text-sm font-medium ${
                i <= currentIndex ? 'text-blu-900' : 'text-blu-400'
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-px w-8 sm:w-12 ${i < currentIndex ? 'bg-green-500' : 'bg-blu-100'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ---- Search bar ---- */
function SearchBar({
  checkIn,
  checkOut,
  adults,
  children,
  rooms,
  showSearch,
  onToggleSearch,
  onCheckIn,
  onCheckOut,
  onAdults,
  onChildren,
  onRooms,
  onUpdate,
}: {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  showSearch: boolean;
  onToggleSearch: () => void;
  onCheckIn: (v: string) => void;
  onCheckOut: (v: string) => void;
  onAdults: (v: number) => void;
  onChildren: (v: number) => void;
  onRooms: (v: number) => void;
  onUpdate: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="grid grid-cols-2 gap-px bg-blu-100 sm:grid-cols-5">
        <SummaryCell
          icon={<Calendar className="h-4 w-4" />}
          label="Check-in"
          value={checkIn ? new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Select date'}
          onClick={onToggleSearch}
        />
        <SummaryCell
          icon={<Calendar className="h-4 w-4" />}
          label="Check-out"
          value={checkOut ? new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Select date'}
          onClick={onToggleSearch}
        />
        <SummaryCell
          icon={<Users className="h-4 w-4" />}
          label="Guests"
          value={`${adults} adult${adults !== 1 ? 's' : ''}${children ? `, ${children} child${children !== 1 ? 'ren' : ''}` : ''}`}
          onClick={onToggleSearch}
        />
        <SummaryCell
          icon={<BedDouble className="h-4 w-4" />}
          label="Rooms"
          value={`${rooms} room${rooms !== 1 ? 's' : ''}`}
          onClick={onToggleSearch}
        />
        <button
          onClick={onToggleSearch}
          className="flex items-center justify-center gap-2 bg-gold-400 px-4 py-3 text-sm font-semibold text-blu-950 transition-colors hover:bg-gold-300"
        >
          {showSearch ? 'Close' : 'Modify Search'}
        </button>
      </div>

      {showSearch && (
        <div className="animate-fade-in grid gap-4 border-t border-blu-100 p-5 sm:grid-cols-2 lg:grid-cols-6">
          <Field label="Check-in date">
            <input
              type="date"
              value={checkIn}
              min={todayISO()}
              onChange={(e) => onCheckIn(e.target.value)}
              className="room-search-input"
            />
          </Field>
          <Field label="Check-out date">
            <input
              type="date"
              value={checkOut}
              min={checkIn || todayISO(1)}
              onChange={(e) => onCheckOut(e.target.value)}
              className="room-search-input"
            />
          </Field>
          <Field label="Adults">
            <select value={adults} onChange={(e) => onAdults(Number(e.target.value))} className="room-search-input">
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>{n} Adult{n !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </Field>
          <Field label="Children">
            <select value={children} onChange={(e) => onChildren(Number(e.target.value))} className="room-search-input">
              {[0, 1, 2, 3].map((n) => (
                <option key={n} value={n}>{n} Child{n !== 1 ? 'ren' : ''}</option>
              ))}
            </select>
          </Field>
          <Field label="Rooms">
            <select value={rooms} onChange={(e) => onRooms(Number(e.target.value))} className="room-search-input">
              {[1, 2, 3].map((n) => (
                <option key={n} value={n}>{n} Room{n !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </Field>
          <button
            onClick={onUpdate}
            className="flex items-center justify-center rounded-lg bg-blu-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blu-700"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}

function SummaryCell({
  icon,
  label,
  value,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-0.5 bg-white px-4 py-3 text-left transition-colors hover:bg-blu-50"
    >
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blu-500">
        {icon}
        {label}
      </span>
      <span className="text-sm font-semibold text-blu-950">{value}</span>
    </button>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-wide text-blu-600">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ---- Input field ---- */
function InputField({
  icon,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  maxLength,
}: {
  icon?: ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-wide text-blu-600">
        {label}
      </label>
      <div className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2.5 transition-colors ${error ? 'border-red-300' : 'border-blu-200 focus-within:border-gold-400'}`}>
        {icon && <span className="text-blu-400">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full bg-transparent text-sm text-blu-950 placeholder:text-blu-300 focus:outline-none"
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

/* ---- Booking summary ---- */
function BookingSummary({
  room,
  checkIn,
  checkOut,
  nights,
  adults,
  children,
  rooms,
  total,
  tax,
  grandTotal,
}: {
  room: RoomRate;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  rooms: number;
  total: number;
  tax: number;
  grandTotal: number;
}) {
  return (
    <aside className="h-fit rounded-2xl bg-white p-6 shadow-md lg:sticky lg:top-28">
      <div className="overflow-hidden rounded-xl">
        <img src={room.image} alt={room.name} className="h-40 w-full object-cover" />
      </div>

      <h3 className="mt-4 font-serif text-lg font-bold text-blu-950">{room.name}</h3>
      <p className="mt-1 text-xs text-blu-500">{room.size} · {room.bed} · {room.view}</p>

      <div className="mt-4 space-y-3 border-t border-blu-100 pt-4 text-sm">
        <SummaryRow
          icon={<Calendar className="h-4 w-4 text-blu-400" />}
          label="Check-in"
          value={formatDateLong(checkIn)}
        />
        <SummaryRow
          icon={<Calendar className="h-4 w-4 text-blu-400" />}
          label="Check-out"
          value={formatDateLong(checkOut)}
        />
        <SummaryRow
          icon={<Users className="h-4 w-4 text-blu-400" />}
          label="Guests"
          value={`${adults + children} (${adults} adult${adults !== 1 ? 's' : ''}${children ? `, ${children} child${children !== 1 ? 'ren' : ''}` : ''})`}
        />
        <SummaryRow
          icon={<BedDouble className="h-4 w-4 text-blu-400" />}
          label="Rooms"
          value={`${rooms}`}
        />
      </div>

      <div className="mt-4 space-y-2 border-t border-blu-100 pt-4 text-sm">
        <PriceRow label={`$${room.pricePerNight} × ${nights} night${nights !== 1 ? 's' : ''}${rooms > 1 ? ` × ${rooms} rooms` : ''}`} value={total} />
        <PriceRow label="Taxes & fees (16%)" value={tax} />
      </div>

      <div className="mt-4 flex items-baseline justify-between border-t border-blu-100 pt-4">
        <span className="font-serif text-lg font-bold text-blu-950">Total</span>
        <span className="font-serif text-2xl font-bold text-blu-950">
          ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>

      {room.breakfast && (
        <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-gold-50 px-3 py-2 text-xs font-medium text-gold-700">
          <Coffee className="h-3.5 w-3.5" />
          Breakfast included
        </p>
      )}

      <p className="mt-3 flex items-center gap-1.5 text-xs text-blu-500">
        <ShieldCheck className="h-3.5 w-3.5" />
        Free cancellation until 48h before check-in
      </p>
    </aside>
  );
}

function SummaryRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5">{icon}</span>
      <div className="flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-blu-400">{label}</p>
        <p className="text-sm font-semibold text-blu-800">{value}</p>
      </div>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-blu-600">{label}</span>
      <span className="font-semibold text-blu-900">${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
    </div>
  );
}

function ConfirmRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-blu-400">{label}</p>
      <p className="text-sm font-semibold text-blu-900">{value}</p>
    </div>
  );
}
