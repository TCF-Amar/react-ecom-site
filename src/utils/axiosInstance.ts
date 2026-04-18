
import axios from "axios";
import { env } from "../config/env";


export const contentType = {
    applicationJson: "application/json",
    multipartFormData:"multipart/form-data"
}
const axiosInstance = axios.create({
    baseURL: env.baseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;