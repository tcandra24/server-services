import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_END_POINT,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    "Content-Type": "application/json",
  },
});
