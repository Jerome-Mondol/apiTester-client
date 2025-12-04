import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://apitester-server.onrender.com",
    headers: {
        "Content-Type": "application/json",
    }
})

