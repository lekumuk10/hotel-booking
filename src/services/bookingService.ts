import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const createBooking = async (booking: any) => {
  const response = await API.post("/bookings", booking);
  return response.data;
};