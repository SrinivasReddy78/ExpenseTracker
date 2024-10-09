import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL || "http://localhost:3000",
    withCredentials: true,
})



axiosInstance.interceptors.request.use(
    (request) => {
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                console.log("Unauthorized or forbidden. Redirecting to login...");
                window.location.href = '/login';
            } else {
                console.error("Error:", error.response.status, error.response.data);
            }
        } else {
            console.error("Network error:", error.message);
        }
        return Promise.reject(error);
    }

)


export default axiosInstance