
import axios from "axios";


export const contentType = {
    applicationJson: "application/json",
    multipartFormData:"multipart/form-data"
}
const axiosInstance = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;