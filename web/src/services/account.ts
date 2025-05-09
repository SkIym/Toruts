import axios from "axios";
import { LoginInfo, SignupInfo, UserInfo, UserData } from "../types/types";
import { API_ROUTES } from "../constants/constants";


let token: string = '';

const setToken = async (newToken: string) => {
	token = `Bearer ${newToken}`;
};

const getConfig = (addtlHeader: Record<string, string> = {}) => {
	return {
		headers: { 
			'Authorization': token,
			...addtlHeader
		}
	};
}

const signup = async (creds: SignupInfo) => {
	console.log("Requesting singup...")
	const { data } = await axios.post<UserData>(`${API_ROUTES.ACCOUNT.signup}`, creds)
	console.log("Sign up request received", data)
	return data;
}

const login = async (creds: LoginInfo) => {
	console.log("Requesting login...")
	const { data } = await axios.post<UserData>(`${API_ROUTES.ACCOUNT.login}`, creds)
	console.log("Login request received", data)
	return data
}

const setUserInfo = async (info: UserInfo) => {
	console.log("info reached") 
	const { data } = await axios.put<UserInfo>(`${API_ROUTES.RECORD.update()}`, info, getConfig())
	return data
}

const deleteUser = async () => {
	console.log("delete user reached")
	const { data } = await axios.delete(`${API_ROUTES.RECORD.delete()}`, getConfig())
	return data
}

export default {
	signup, login, setUserInfo, deleteUser, setToken, getConfig
}
