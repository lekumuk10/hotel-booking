import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getRooms = async () => {
  const { data } = await api.get("/rooms");
  return data.data;
};

export default api;