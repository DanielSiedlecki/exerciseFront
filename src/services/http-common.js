import axios from "axios";

const http = axios.create({
  baseURL: "https://localhost:7288",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export { http };
