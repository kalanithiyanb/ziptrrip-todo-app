import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/todos",
});

export default API;