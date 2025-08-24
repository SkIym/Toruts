import axios from "axios";
import { LoginInfo, SignupInfo, UserInfo, UserData } from "../types/types";
import { API_ROUTES } from "../constants/constants";

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

const logout = async () => {
	const { data } = await axios.post(
		`${API_ROUTES.ACCOUNT.logout}`,
		null,
		{
			withCredentials: true
		})
	return data
}

const checkAuth = async () => {
	const { data } = await axios.get(
		`${API_ROUTES.ACCOUNT.checkauth}`,
		{
			withCredentials: true,
		})
	return data
}

const setUserInfo = async (info: UserInfo) => {
	console.log("info reached") 
	const { data } = await axios.put<UserInfo>(
		`${API_ROUTES.RECORD.update()}`, 
		info, 
		{
			withCredentials: true
		})
	return data
}

const deleteUser = async () => {
	console.log("delete user reached")
	const { data } = await axios.delete(
		`${API_ROUTES.RECORD.delete()}`,
		{
			withCredentials: true
		})
	return data
}

export default {
	signup, login, setUserInfo, deleteUser, logout, checkAuth
}
