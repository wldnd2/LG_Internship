import axios from "axios";

const baseURL = "http://13.126.6.1:8080";

const clientApi = axios.create({
  baseURL,
});

export default clientApi;
