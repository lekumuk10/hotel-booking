import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getRooms = async () => {
  const { data } = await api.get("/rooms");
  return data.data;
};

export default api;