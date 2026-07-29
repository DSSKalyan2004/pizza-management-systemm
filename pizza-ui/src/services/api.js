import axios from "axios";

const api = axios.create({
    baseURL: "https://pizza-management-systemm-production.up.railway.app"
});

export default api;