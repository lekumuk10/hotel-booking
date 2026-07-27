import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const createBooking = async (booking: any) => {
  const response = await API.post("/bookings", booking);
  return response.data;
};