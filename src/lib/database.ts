import type { Database } from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

const IDB_NAME = 'hotel-booking-db';
const IDB_STORE = 'sqlite';
const IDB_KEY = 'database';

let dbInstance: Database | null = null;
let initPromise: Promise<Database> | null = null;

function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(IDB_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function loadFromIndexedDB(): Promise<Uint8Array | null> {
  const idb = await openIndexedDB();
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, 'readonly');
    const req = tx.objectStore(IDB_STORE).get(IDB_KEY);
    req.onsuccess = () => resolve((req.result as Uint8Array) ?? null);
    req.onerror = () => reject(req.error);
  });
}

async function saveToIndexedDB(data: Uint8Array): Promise<void> {
  const idb = await openIndexedDB();
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).put(data, IDB_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function initDatabase(): Promise<Database> {
  const initSqlJs = (await import('sql.js')).default;
  const SQL = await initSqlJs({ locateFile: () => sqlWasmUrl });

  const saved = await loadFromIndexedDB();
  const db = saved ? new SQL.Database(saved) : new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      room_name TEXT NOT NULL,
      check_in TEXT NOT NULL,
      check_out TEXT NOT NULL,
      nights INTEGER NOT NULL,
      adults INTEGER NOT NULL,
      children INTEGER NOT NULL,
      rooms INTEGER NOT NULL,
      price_per_night REAL NOT NULL,
      total REAL NOT NULL,
      guest_first_name TEXT NOT NULL,
      guest_last_name TEXT NOT NULL,
      guest_email TEXT NOT NULL,
      guest_phone TEXT NOT NULL,
      card_last4 TEXT NOT NULL,
      card_holder TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed',
      created_at TEXT NOT NULL
    );
  `);

  dbInstance = db;
  await persist();
  return db;
}

async function persist(): Promise<void> {
  if (!dbInstance) return;
  const data = dbInstance.export();
  await saveToIndexedDB(data);
}

export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;
  if (!initPromise) initPromise = initDatabase();
  return initPromise;
}

export async function createBooking(booking: BookingRecord): Promise<BookingRecord> {
  const db = await getDb();
  db.run(
    `INSERT INTO bookings (id, room_name, check_in, check_out, nights, adults, children, rooms, price_per_night, total, guest_first_name, guest_last_name, guest_email, guest_phone, card_last4, card_holder, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      booking.id,
      booking.room_name,
      booking.check_in,
      booking.check_out,
      booking.nights,
      booking.adults,
      booking.children,
      booking.rooms,
      booking.price_per_night,
      booking.total,
      booking.guest_first_name,
      booking.guest_last_name,
      booking.guest_email,
      booking.guest_phone,
      booking.card_last4,
      booking.card_holder,
      booking.status,
      booking.created_at,
    ],
  );
  await persist();
  return booking;
}

export async function getBooking(id: string): Promise<BookingRecord | null> {
  const db = await getDb();
  const result = db.exec('SELECT * FROM bookings WHERE id = ?', [id]);
  if (!result.length) return null;
  const row = result[0];
  const values = row.values[0];
  return mapRow(row.columns, values);
}

export async function getAllBookings(): Promise<BookingRecord[]> {
  const db = await getDb();
  const result = db.exec('SELECT * FROM bookings ORDER BY created_at DESC');
  if (!result.length) return [];
  return result[0].values.map((v) => mapRow(result[0].columns, v));
}

function mapRow(columns: string[], values: unknown[]): BookingRecord {
  const obj: Record<string, unknown> = {};
  columns.forEach((col, i) => {
    obj[col] = values[i];
  });
  return {
    id: obj.id as string,
    room_name: obj.room_name as string,
    check_in: obj.check_in as string,
    check_out: obj.check_out as string,
    nights: obj.nights as number,
    adults: obj.adults as number,
    children: obj.children as number,
    rooms: obj.rooms as number,
    price_per_night: obj.price_per_night as number,
    total: obj.total as number,
    guest_first_name: obj.guest_first_name as string,
    guest_last_name: obj.guest_last_name as string,
    guest_email: obj.guest_email as string,
    guest_phone: obj.guest_phone as string,
    card_last4: obj.card_last4 as string,
    card_holder: obj.card_holder as string,
    status: (obj.status as string) ?? 'confirmed',
    created_at: obj.created_at as string,
  };
}

export interface BookingRecord {
  id: string;
  room_name: string;
  check_in: string;
  check_out: string;
  nights: number;
  adults: number;
  children: number;
  rooms: number;
  price_per_night: number;
  total: number;
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  card_last4: string;
  card_holder: string;
  status: string;
  created_at: string;
}
