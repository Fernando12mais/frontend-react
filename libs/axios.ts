import axios from "axios";

const publicApi = axios.create({ baseURL: "http://localhost:8000" });

const privateApi = axios.create({
  baseURL: "http://localhost:8000",
});

privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { publicApi, privateApi };
