import axios from "axios";
import jsCookie from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use(
  (config) => {
    const token = jsCookie.get("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!jsCookie.get("token") || !error.response) return Promise.reject(error);
    if (error.response.status === 401) {
      jsCookie.remove("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export { api };
