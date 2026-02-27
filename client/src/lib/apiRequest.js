import axios from "axios";

const getBaseURL = () => {
  const hostname = window.location.hostname;
  // If running locally on any dev machine, use localhost
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:8800/api";
  }
  // On the live server, use the same hostname the browser connected to
  return `http://${hostname}:8800/api`;
};

const apiRequest = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

export default apiRequest;
