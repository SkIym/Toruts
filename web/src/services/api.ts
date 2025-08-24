import axios from "axios";
import { PATH } from "../constants/constants";
import { toast } from "sonner";

const NO_REDIRECT_ROUTES = ["account/login", "account/signup", "account/check-auth"];

const api = axios.create({
	withCredentials: true, // send cookies by default
});

// Add response interceptor
api.interceptors.response.use(
	(response) => response, 
	(error) => {
		const url = error.config?.url || "";
		if (
			error.response?.status === 401 &&
      !NO_REDIRECT_ROUTES.some((route) => url.includes(route))
		) {
			console.warn("Unauthorized, redirecting to login...");
			window.location.replace(PATH.login);
			toast.error("Please login again.")
		}
		return Promise.reject(error);
	}
);

export default api;
