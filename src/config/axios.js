import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://hectorapi.azurewebsites.net/api/"
});

export default axiosClient;