import axios from "axios";

const axiosInstance =axios.create({
    baseURL: "https://web-store-two-psi.vercel.app/api",
	withCredentials: true, // send cookies to the server
});
export default axiosInstance;