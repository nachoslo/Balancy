import axios from "axios";

const instance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default instance;
