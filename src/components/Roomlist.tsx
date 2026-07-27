import { useRooms } from "../hooks/useRooms";

export default function RoomList() {
  const { rooms, loading, error } = useRooms();

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading rooms...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-10">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10">

      <h2 className="text-3xl font-bold mb-8">
        Available Rooms
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {rooms.map((room) => (

          <div
            key={room.id}
            className="border rounded-xl p-6 shadow-lg"
          >

            <h3 className="text-xl font-bold">
              {room.name}
            </h3>

            <p className="mt-3">
              {room.description}
            </p>

            <p className="mt-3">
              Bed:
              <strong> {room.bed_type}</strong>
            </p>

            <p>
              Size:
              <strong> {room.room_size} m²</strong>
            </p>

            <p>
              Adults:
              <strong> {room.max_adults}</strong>
            </p>

            <p>
              Children:
              <strong> {room.max_children}</strong>
            </p>

            <p className="text-2xl font-bold text-blue-600 mt-4">
              KSh {Number(room.base_price).toLocaleString()}
            </p>

            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
              Book Now
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}