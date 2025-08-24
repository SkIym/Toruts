import api from "./api";
import { LoginInfo, SignupInfo, UserInfo, UserData } from "../types/types";
import { API_ROUTES } from "../constants/constants";

const signup = async (creds: SignupInfo) => {
	console.log("Requesting singup...")
	const { data } = await api.post<UserData>(`${API_ROUTES.ACCOUNT.signup}`, creds)
	console.log("Sign up request received", data)
	return data;
}

const login = async (creds: LoginInfo) => {
	console.log("Requesting login...")
	const { data } = await api.post<UserData>(`${API_ROUTES.ACCOUNT.login}`, creds)
	console.log("Login request received", data)
	return data
}

const logout = async () => {
	const { data } = await api.post(
		`${API_ROUTES.ACCOUNT.logout}`,
		null)
	return data
}

const checkAuth = async () => {
	const { data } = await axios.get(
		`${API_ROUTES.ACCOUNT.checkauth}`)
	return data
}

const setUserInfo = async (info: UserInfo) => {
	console.log("info reached") 
	const { data } = await api.put<UserInfo>(
		`${API_ROUTES.RECORD.update()}`, 
		info)
	return data
}

const deleteUser = async () => {
	console.log("delete user reached")
	const { data } = await api.delete(
		`${API_ROUTES.RECORD.delete()}`)
	return data
}

export default {
	signup, login, setUserInfo, deleteUser, logout, checkAuth
}
