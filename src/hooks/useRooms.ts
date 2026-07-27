import { useEffect, useState } from "react";
import { getRooms } from "../services/roomService";
import { Room } from "../types/Room";

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRooms() {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    }

    loadRooms();
  }, []);

  return {
    rooms,
    loading,
    error,
  };
}