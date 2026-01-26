import axios from "axios";

const BASEURL = axios.create({
  baseURL: "http://localhost:5005",
  headers: {
    "Content-Type": "application/json",
  },
});

export default BASEURL;
