import axios from "axios";

export default axios.create({
  baseURL: "https://ai-documentor.onrender.com",
  // baseURL: "http://localhost:5001",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
