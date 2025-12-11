import axios from "axios";

const apiRequest = axios.create({
  // baseURL: "http://172.23.23.53:8800/api",
  baseURL: "http://localhost:8800/api",
  withCredentials: true,
});

export default apiRequest;

// import axios from 'axios'

// const getBaseURL = ()=> {
//   const isLocal = window.location.hostname === "localhost"
  
//   return isLocal ? "http://localhost:8800/api" : "http://172.0.0.1:8800/api"
// }

// const apiRequest = axios.create({
//   baseURL: getBaseURL(),
//   withCredentials: true
// })

// export default apiRequest;